'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CARD, CONTAINER, DISPLAY, EYEBROW, INLINE_LINK, INPUT, LEAD } from '@/components/ui/styles';
import { Send, CheckCircle, ArrowRight } from 'lucide-react';
import { BUDGETS, HONEYPOT_FIELD, PROJECT_TYPES } from '@/lib/contact-schema';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  enterprise: '',
  projectType: '',
  budget: '',
  scope: '',
  referral: '',
  [HONEYPOT_FIELD]: '',
};

type FormField = keyof typeof EMPTY_FORM;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const LABEL = 'mb-2 block text-[14px] font-medium text-foreground';
const INFO_TERM = 'font-mono text-[12px] uppercase tracking-[0.14em] text-fg-3';
const INFO_LINK = 'text-[15px] text-fg-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground';

const FALLBACK_ERROR = "We couldn't send your message. Please try again, or email us at contact@versalabs-studio.com.";

// What a product or client page sends the visitor here for
// (/contact?topic=<slug>&interest=demo|notify|similar), or which service a
// /services link asked about (/contact?service=erp). It only starts the
// message for them; they can change it, and the server sees ordinary fields.
export interface ContactTopic {
  title: string;
  projectType: keyof typeof PROJECT_TYPES;
}

function openingLine(interest: string, title: string): string | undefined {
  if (interest === 'demo') return `I'd like a demo of ${title}.`;
  if (interest === 'notify') return `Please let me know when ${title} is available.`;
  if (interest === 'similar') return `I'm interested in something similar to ${title}.`;
  return undefined;
}

export default function ContactClient({ topics = {} }: { topics?: Record<string, ContactTopic> }) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Start the message from the link that brought the visitor here, once, after
  // the server-rendered form is on screen.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service') ?? '';
    if (Object.hasOwn(PROJECT_TYPES, service)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable in the browser
      setFormData((current) => (current.projectType ? current : { ...current, projectType: service }));
      return;
    }
    const topic = topics[params.get('topic') ?? ''];
    const line = topic && openingLine(params.get('interest') ?? '', topic.title);
    if (!topic || !line) return;
    setFormData((current) =>
      current.scope ? current : { ...current, scope: `${line} `, projectType: current.projectType || topic.projectType },
    );
  }, [topics]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormField, string>>>({});
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'success') successHeading.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setFieldErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(EMPTY_FORM);
        return;
      }

      const data = await response.json().catch(() => ({}));
      setFieldErrors(data.fields ?? {});
      setErrorMessage(response.status === 429 || response.status === 400 ? data.error ?? FALLBACK_ERROR : FALLBACK_ERROR);
      setStatus('error');
    } catch {
      setErrorMessage(FALLBACK_ERROR);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Wires a field to its server-side error message, when there is one.
  const describe = (field: FormField) =>
    fieldErrors[field] ? { 'aria-invalid': true, 'aria-describedby': `${field}-error` } : {};

  const fieldError = (field: FormField) =>
    fieldErrors[field] ? (
      <p id={`${field}-error`} className="mt-2 text-[14px] text-err">{fieldErrors[field]}</p>
    ) : null;

  if (status === 'success') {
    return (
      <div className={`${CONTAINER} flex min-h-[70svh] items-center justify-center py-16 md:py-28`}>
        <div className={`${CARD} max-w-2xl p-10 text-center md:p-12`}>
          <CheckCircle className="mx-auto mb-6 h-12 w-12 text-ok" aria-hidden="true" />
          <h1 ref={successHeading} tabIndex={-1} className="mb-4 font-display text-[32px] font-semibold tracking-[-0.03em] text-foreground">
            Message Received
          </h1>
          <p className="mb-8 text-[16px] leading-[1.6] text-fg-3">
            Thank you for reaching out. We&apos;ll review your project details and reply by email.
          </p>
          <button type="button" onClick={() => setStatus('idle')} className={BUTTON_SECONDARY}>
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <div className={`${CONTAINER} pt-12 pb-16 md:pt-20 md:pb-28`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: the heading and how to reach us. No entrance fade, so the heading and intro (the LCP) paint with
            the server HTML instead of after hydration. */}
        <div className="lg:col-span-5">
          <span className={EYEBROW}>Contact</span>
          <h1 className={`${DISPLAY} mt-5`}>Let&apos;s Talk</h1>
          <p className={`${LEAD} mt-6`}>
            Ask for a demo of a product, or tell us about your project. We&apos;ll reply by email with how we would
            approach it.
          </p>
          <dl className="mt-10 border-t border-line">
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
              <dt className={INFO_TERM}>Email</dt>
              <dd>
                <a href="mailto:contact@versalabs-studio.com" className={INFO_LINK}>
                  contact@versalabs-studio.com
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
              <dt className={INFO_TERM}>Location</dt>
              <dd className="text-[15px] text-fg-2">Addis Ababa, Ethiopia</dd>
            </div>
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
              <dt className={INFO_TERM}>Replies</dt>
              <dd className="text-[15px] text-fg-2">By email, from the team directly</dd>
            </div>
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-line py-4">
              <dt className={INFO_TERM}>Elsewhere</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1">
                <a href="https://t.me/kidusabdula" target="_blank" rel="noopener noreferrer" className={INFO_LINK}>
                  Telegram<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href="https://linkedin.com/company/versalabs-studio" target="_blank" rel="noopener noreferrer" className={INFO_LINK}>
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
          <Link
            href="/services"
            className="group mt-8 inline-flex items-center gap-2 text-[15px] text-fg-3 transition-colors hover:text-foreground"
          >
            Not sure what you need? <span className="font-medium text-foreground">Browse our services</span>
            <ArrowRight className="h-4 w-4 text-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Right: the form */}
        <div className={`${CARD} p-6 md:p-8 lg:col-span-7`}>
          <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={LABEL}>Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  maxLength={100} autoComplete="name" {...describe('name')}
                  className={INPUT}
                  placeholder="Your full name" />
                {fieldError('name')}
              </div>
              <div>
                <label htmlFor="email" className={LABEL}>Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                  maxLength={254} autoComplete="email" {...describe('email')}
                  className={INPUT}
                  placeholder="your@email.com" />
                {fieldError('email')}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className={LABEL}>Phone</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                  maxLength={40} autoComplete="tel" {...describe('phone')}
                  className={INPUT}
                  placeholder="+251 ..." />
                {fieldError('phone')}
              </div>
              <div>
                <label htmlFor="enterprise" className={LABEL}>Company</label>
                <input type="text" id="enterprise" name="enterprise" value={formData.enterprise} onChange={handleChange}
                  maxLength={120} autoComplete="organization" {...describe('enterprise')}
                  className={INPUT}
                  placeholder="Your company name" />
                {fieldError('enterprise')}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="projectType" className={LABEL}>Project Type</label>
                <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}
                  {...describe('projectType')}
                  className={INPUT}>
                  <option value="" className="bg-background">Select type</option>
                  {Object.entries(PROJECT_TYPES).map(([value, text]) => (
                    <option key={value} value={value} className="bg-background">{text}</option>
                  ))}
                </select>
                {fieldError('projectType')}
              </div>
              <div>
                <label htmlFor="budget" className={LABEL}>Budget Range</label>
                <select id="budget" name="budget" value={formData.budget} onChange={handleChange}
                  {...describe('budget')}
                  className={INPUT}>
                  <option value="" className="bg-background">Select budget</option>
                  {Object.entries(BUDGETS).map(([value, text]) => (
                    <option key={value} value={value} className="bg-background">{text}</option>
                  ))}
                </select>
                {fieldError('budget')}
              </div>
            </div>

            <div>
              <label htmlFor="scope" className={LABEL}>Project Description *</label>
              <textarea id="scope" name="scope" value={formData.scope} onChange={handleChange} required rows={4}
                minLength={10} maxLength={5000} {...describe('scope')}
                className={`${INPUT} resize-none`}
                placeholder="Tell us about what you need built..." />
              {fieldError('scope')}
            </div>

            <div>
              <label htmlFor="referral" className={LABEL}>How did you hear about us?</label>
              <input type="text" id="referral" name="referral" value={formData.referral} onChange={handleChange}
                maxLength={200} {...describe('referral')}
                className={INPUT}
                placeholder="Referral, Google, social media..." />
              {fieldError('referral')}
            </div>

            {/* Honeypot: hidden from people and screen readers, filled in by bots. */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
              <input type="text" id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} value={formData[HONEYPOT_FIELD]}
                onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </div>

            <div role="alert">
              {status === 'error' && errorMessage && (
                <p className="rounded-lg border border-err-line bg-err-bg px-4 py-3 text-[14px] text-err">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${BUTTON_PRIMARY} w-full disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <p className="text-center text-[13px] text-fg-3">
              We use your details to reply to you. See our{' '}
              <Link href="/privacy" className={INLINE_LINK}>privacy notice</Link>.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

