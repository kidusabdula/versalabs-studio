'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CARD, CONTAINER, DISPLAY, LEAD } from '@/components/ui/styles';
import { Send, CheckCircle, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
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

// Form fields sit recessed on the card, on the page background.
const INPUT =
  'w-full rounded-lg border border-border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-zinc-500 transition-colors focus:border-border-hover focus:outline-none aria-[invalid=true]:border-red-400/60';
const LABEL = 'mb-2 block text-[14px] font-medium text-foreground';
const INFO_TITLE = 'text-[15px] font-semibold text-foreground';
const INFO_LINK = 'text-[14px] text-zinc-400 transition-colors hover:text-foreground';

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
      <p id={`${field}-error`} className="mt-2 text-sm text-red-300">{fieldErrors[field]}</p>
    ) : null;

  if (status === 'success') {
    return (
      <div className={`${CONTAINER} flex min-h-[70svh] items-center justify-center py-16 md:py-28`}>
        <div className={`${CARD} max-w-2xl p-10 text-center md:p-12`}>
          <CheckCircle className="mx-auto mb-6 h-14 w-14 text-emerald-400" aria-hidden="true" />
          <h1 ref={successHeading} tabIndex={-1} className="mb-4 text-[30px] font-semibold tracking-[-0.02em] text-foreground">
            Message Received!
          </h1>
          <p className="mb-8 text-[16px] leading-[1.6] text-zinc-400">
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
    <div className={`${CONTAINER} pt-14 pb-16 md:pt-20 md:pb-28`}>
      {/* Header: no entrance fade, so the heading and intro (the LCP) paint
          with the server HTML instead of after hydration. */}
      <div className="mb-12 max-w-2xl md:mb-16">
        <h1 className={DISPLAY}>Let&apos;s Talk.</h1>
        <p className={`${LEAD} mt-6`}>Tell us about your project and we&apos;ll get back to you with a plan.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* Left: the form (3 columns) */}
        <div className={`${CARD} p-6 md:p-8 lg:col-span-3`}>
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
                <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-[14px] text-red-200">
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
            <p className="text-center text-[13px] text-zinc-400">
              We use your details to reply to you. See our{' '}
              <Link href="/privacy" className="text-zinc-300 underline underline-offset-4 hover:text-foreground">privacy notice</Link>.
            </p>
          </form>
        </div>

        {/* Right: how to reach us (2 columns) */}
        <div className="lg:col-span-2">
          <ul className="flex flex-col gap-4 lg:sticky lg:top-24">
            <li className={`${CARD} flex items-start gap-4 p-6`}>
              <ContactIcon icon={Mail} />
              <div>
                <h2 className={INFO_TITLE}>Email</h2>
                <a href="mailto:contact@versalabs-studio.com" className={INFO_LINK}>
                  contact@versalabs-studio.com
                </a>
              </div>
            </li>
            <li className={`${CARD} flex items-start gap-4 p-6`}>
              <ContactIcon icon={MapPin} />
              <div>
                <h2 className={INFO_TITLE}>Location</h2>
                <p className="text-[14px] text-zinc-400">Addis Ababa, Ethiopia</p>
              </div>
            </li>
            <li className={`${CARD} flex items-start gap-4 p-6`}>
              <ContactIcon icon={Clock} />
              <div>
                <h2 className={INFO_TITLE}>Replies</h2>
                <p className="text-[14px] text-zinc-400">By email, from the team directly</p>
              </div>
            </li>
            <li className={`${CARD} flex items-start gap-4 p-6`}>
              <ContactIcon icon={MessageCircle} />
              <div>
                <h2 className={INFO_TITLE}>Quick Connect</h2>
                <div className="mt-1 flex flex-col gap-1">
                  <a href="https://t.me/kidusabdula" target="_blank" rel="noopener noreferrer" className={`${INFO_LINK} inline-block py-0.5`}>
                    Telegram →
                  </a>
                  <a href="https://linkedin.com/company/versalabs-studio" target="_blank" rel="noopener noreferrer" className={`${INFO_LINK} inline-block py-0.5`}>
                    LinkedIn →
                  </a>
                </div>
              </div>
            </li>
            <li>
              <Link href="/services" className={`${CARD} group block p-6 transition-colors hover:border-border-hover`}>
                <p className="text-[14px] text-zinc-400 transition-colors group-hover:text-zinc-300">
                  Not sure what you need? <span className="font-medium text-foreground">Browse our services →</span>
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContactIcon({ icon: Icon }: { icon: typeof Mail }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated">
      <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
    </span>
  );
}
