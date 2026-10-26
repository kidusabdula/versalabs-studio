'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="px-6 py-32 border-t border-white/[0.04] relative overflow-hidden">
      {/* Animated gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[700px] h-[400px] bg-gradient-to-br from-violet-500/8 via-white/[0.03] to-indigo-500/8 blur-[120px] rounded-full pointer-events-none animate-glow-pulse" />

      <div className="mx-auto max-w-3xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Let&apos;s build something great together. Tell us about your project and we&apos;ll show you what&apos;s possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center h-12 px-8 rounded-full bg-white text-black text-[15px] font-semibold transition-colors hover:bg-zinc-200"
              >
                Start a Project
              </motion.div>
            </Link>
            <Link href="/work">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center h-12 px-8 rounded-full border border-white/[0.1] bg-white/[0.03] text-white text-[15px] font-medium transition-colors hover:bg-white/[0.08]"
              >
                Explore Our Work
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
