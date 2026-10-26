'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, GlassCard } from '@/components/ui/motion';
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

const FALLBACK_ERROR = "We couldn't send your message. Please try again, or email us at contact@versalabs-studio.com.";

export default function ContactClient() {
  const [formData, setFormData] = useState(EMPTY_FORM);
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
      <div className="min-h-screen px-6 py-24 flex items-center justify-center">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <GlassCard className="p-12">
              <CheckCircle className="mx-auto h-16 w-16 text-emerald-400 mb-6" aria-hidden="true" />
              <h1 ref={successHeading} tabIndex={-1} className="text-3xl font-bold mb-4 text-white">Message Received!</h1>
              <p className="text-zinc-400 mb-6">
                Thank you for reaching out. We&apos;ll review your project details and reply by email.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white hover:bg-white/[0.1] transition-colors"
              >
                Submit Another Request
              </button>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <div className="min-h-screen px-6 pt-40 pb-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <FadeIn>
          <div className="mb-16 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">
              Let&apos;s Talk.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Tell us about your project and we&apos;ll get back to you with a plan.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* LEFT: Form (3 cols) */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      maxLength={100} autoComplete="name" {...describe('name')}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none aria-[invalid=true]:border-red-400/60"
                      placeholder="Your full name" />
                    {fieldError('name')}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      maxLength={254} autoComplete="email" {...describe('email')}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none aria-[invalid=true]:border-red-400/60"
                      placeholder="your@email.com" />
                    {fieldError('email')}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      maxLength={40} autoComplete="tel" {...describe('phone')}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none aria-[invalid=true]:border-red-400/60"
                      placeholder="+251 ..." />
                    {fieldError('phone')}
                  </div>
                  <div>
                    <label htmlFor="enterprise" className="block text-sm font-medium mb-2 text-white">Company</label>
                    <input type="text" id="enterprise" name="enterprise" value={formData.enterprise} onChange={handleChange}
                      maxLength={120} autoComplete="organization" {...describe('enterprise')}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none aria-[invalid=true]:border-red-400/60"
                      placeholder="Your company name" />
                    {fieldError('enterprise')}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium mb-2 text-white">Project Type</label>
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}
                      {...describe('projectType')}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white transition-colors focus:border-white/[0.15] focus:outline-none aria-[invalid=true]:border-red-400/60">
                      <option value="" className="bg-[#0D0D0F]">Select type</option>
                      {Object.entries(PROJECT_TYPES).map(([value, label]) => (
                        <option key={value} value={value} className="bg-[#0D0D0F]">{label}</option>
                      ))}
                    </select>
                    {fieldError('projectType')}
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2 text-white">Budget Range</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange}
                      {...describe('budget')}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white transition-colors focus:border-white/[0.15] focus:outline-none aria-[invalid=true]:border-red-400/60">
                      <option value="" className="bg-[#0D0D0F]">Select budget</option>
                      {Object.entries(BUDGETS).map(([value, label]) => (
                        <option key={value} value={value} className="bg-[#0D0D0F]">{label}</option>
                      ))}
                    </select>
                    {fieldError('budget')}
                  </div>
                </div>

                <div>
                  <label htmlFor="scope" className="block text-sm font-medium mb-2 text-white">Project Description *</label>
                  <textarea id="scope" name="scope" value={formData.scope} onChange={handleChange} required rows={4}
                    minLength={10} maxLength={5000} {...describe('scope')}
                    className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none resize-none aria-[invalid=true]:border-red-400/60"
                    placeholder="Tell us about what you need built..." />
                  {fieldError('scope')}
                </div>

                <div>
                  <label htmlFor="referral" className="block text-sm font-medium mb-2 text-white">How did you hear about us?</label>
                  <input type="text" id="referral" name="referral" value={formData.referral} onChange={handleChange}
                    maxLength={200} {...describe('referral')}
                    className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none aria-[invalid=true]:border-red-400/60"
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
                    <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {errorMessage}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-white text-black text-[15px] font-semibold transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </motion.button>
                <p className="text-center text-xs text-zinc-500">
                  We use your details only to reply to you. See our{' '}
                  <Link href="/privacy" className="text-zinc-300 underline underline-offset-4 hover:text-white">privacy notice</Link>.
                </p>
              </form>
            </GlassCard>
          </FadeIn>

          {/* RIGHT: Contact Info (2 cols) */}
          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="flex flex-col gap-6 sticky top-32">
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-sm">Email</h2>
                    <a href="mailto:contact@versalabs-studio.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                      contact@versalabs-studio.com
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-sm">Location</h2>
                    <p className="text-sm text-zinc-400">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <Clock className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-sm">Replies</h2>
                    <p className="text-sm text-zinc-400">By email, from the team directly</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-sm">Quick Connect</h2>
                    <div className="flex flex-col gap-1 mt-1">
                      <a href="https://t.me/kidusabdula" target="_blank" rel="noopener noreferrer" className="inline-block py-0.5 text-sm text-zinc-400 hover:text-white transition-colors">
                        Telegram →
                      </a>
                      <a href="https://linkedin.com/company/versalabs-studio" target="_blank" rel="noopener noreferrer" className="inline-block py-0.5 text-sm text-zinc-400 hover:text-white transition-colors">
                        LinkedIn →
                      </a>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Services Quick Link */}
              <Link href="/services" className="block">
                <GlassCard className="p-6 hover:border-white/[0.12] transition-colors group">
                  <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    Not sure what you need? <span className="text-white font-medium">Browse our services →</span>
                  </p>
                </GlassCard>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
