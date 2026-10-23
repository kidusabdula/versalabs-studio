'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, GlassCard } from '@/components/ui/motion';

export default function BlogClient() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-lg text-center">
        <FadeIn>
          <GlassCard className="p-12">
            {/* Animated pulse indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/40" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-violet-500" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Coming Soon</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">
              Blog
            </h1>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              We&apos;re preparing articles about software architecture, AI development, and building products in the Ethiopian tech ecosystem. Stay tuned.
            </p>

            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white hover:bg-white/[0.1] transition-colors"
              >
                Back to Home
              </motion.div>
            </Link>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
