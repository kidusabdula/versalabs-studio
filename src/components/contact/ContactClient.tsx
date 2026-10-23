'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, GlassCard } from '@/components/ui/motion';
import { Send, CheckCircle, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enterprise: '',
    projectType: '',
    budget: '',
    scope: '',
    referral: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', enterprise: '', projectType: '', budget: '', scope: '', referral: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen px-6 py-24 flex items-center justify-center">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <GlassCard className="p-12">
              <CheckCircle className="mx-auto h-16 w-16 text-emerald-400 mb-6" />
              <h1 className="text-3xl font-bold mb-4 text-white">Message Received!</h1>
              <p className="text-zinc-400 mb-6">
                Thank you for reaching out. We&apos;ll review your project details and respond within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
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
              Tell us about your project and we&apos;ll get back to you within 24 hours with a plan.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* LEFT: Form (3 cols) */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none"
                      placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none"
                      placeholder="+251 ..." />
                  </div>
                  <div>
                    <label htmlFor="enterprise" className="block text-sm font-medium mb-2 text-white">Company</label>
                    <input type="text" id="enterprise" name="enterprise" value={formData.enterprise} onChange={handleChange}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none"
                      placeholder="Your company name" />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium mb-2 text-white">Project Type</label>
                    <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white transition-colors focus:border-white/[0.15] focus:outline-none">
                      <option value="" className="bg-[#0D0D0F]">Select type</option>
                      <option value="erp" className="bg-[#0D0D0F]">ERP / Business Platform</option>
                      <option value="ecommerce" className="bg-[#0D0D0F]">E-Commerce / Online Store</option>
                      <option value="ai" className="bg-[#0D0D0F]">AI / Security System</option>
                      <option value="mobile" className="bg-[#0D0D0F]">Mobile Application</option>
                      <option value="website" className="bg-[#0D0D0F]">Corporate Website</option>
                      <option value="custom" className="bg-[#0D0D0F]">Custom / Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2 text-white">Budget Range</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white transition-colors focus:border-white/[0.15] focus:outline-none">
                      <option value="" className="bg-[#0D0D0F]">Select budget</option>
                      <option value="0-5k" className="bg-[#0D0D0F]">$0 - $5,000 / 0 - 600,000 ETB</option>
                      <option value="5k-15k" className="bg-[#0D0D0F]">$5,000 - $15,000 / 600,000 - 1.8M ETB</option>
                      <option value="15k-50k" className="bg-[#0D0D0F]">$15,000 - $50,000 / 1.8M - 6.0M ETB</option>
                      <option value="50k+" className="bg-[#0D0D0F]">$50,000+ / 6.0M+ ETB</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="scope" className="block text-sm font-medium mb-2 text-white">Project Description *</label>
                  <textarea id="scope" name="scope" value={formData.scope} onChange={handleChange} required rows={4}
                    className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none resize-none"
                    placeholder="Tell us about what you need built..." />
                </div>

                <div>
                  <label htmlFor="referral" className="block text-sm font-medium mb-2 text-white">How did you hear about us?</label>
                  <input type="text" id="referral" name="referral" value={formData.referral} onChange={handleChange}
                    className="w-full rounded-lg border border-white/[0.08] bg-[#1C1C1F] px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-white/[0.15] focus:outline-none"
                    placeholder="Referral, Google, social media..." />
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
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </FadeIn>

          {/* RIGHT: Contact Info (2 cols) */}
          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="flex flex-col gap-6 sticky top-32">
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Email</h3>
                    <a href="mailto:contact@versalabs-studio.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                      contact@versalabs-studio.com
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Location</h3>
                    <p className="text-sm text-zinc-400">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Response Time</h3>
                    <p className="text-sm text-zinc-400">Within 24 hours</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Quick Connect</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <a href="https://t.me/kidusabdula" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        Telegram →
                      </a>
                      <a href="https://linkedin.com/company/versalabs-studio" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">
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
