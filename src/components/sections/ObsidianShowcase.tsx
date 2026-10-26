'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MotionLink } from '@/components/ui/motion';
import type { GalleryImage } from '@/content/schema';

const FEATURES = [
  { label: 'CRM & Sales', delay: 0 },
  { label: 'Manufacturing', delay: 0.1 },
  { label: 'Inventory', delay: 0.2 },
  { label: 'Accounting', delay: 0.3 },
  { label: 'Built on ERPNext', delay: 0.4 },
];

export default function ObsidianShowcase({ href, image }: { href: string; image?: GalleryImage }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0A0A0C] py-12 md:py-20"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[900px] h-[600px] bg-gradient-to-br from-violet-500/10 via-indigo-500/8 to-purple-600/5 blur-[140px] rounded-full pointer-events-none animate-glow-pulse" />

      <div className="mx-auto max-w-[1400px] px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-violet-400/80 mb-4">
            <span className="w-8 h-[1px] bg-violet-400/40" />
            Flagship Product
            <span className="w-8 h-[1px] bg-violet-400/40" />
          </span>
        </motion.div>

        {/* Asymmetric Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cinematic Image Pane */}
          <Link href={href} aria-label="Obsidian ERP case study" className="lg:col-span-2 block group relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-violet-500/5 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto min-h-[400px]">
            <motion.div
              style={{ scale: imageScale, y: imageY }}
              className="absolute inset-0"
            >
              {image && (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              )}
            </motion.div>
            {/* Subtle inner shadow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-violet-500/10 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Link>

          {/* Context GlassCard Pane */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 30, delay: 0.2 }}
            className="flex flex-col h-full rounded-2xl bg-[#161618] border border-white/[0.06] overflow-hidden group"
          >
            <div className="p-8 lg:p-10 flex flex-col h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="mb-auto">
                <span className="inline-block px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[11px] font-semibold tracking-widest uppercase text-violet-400 mb-6">
                  In Production
                </span>
                
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
                  Obsidian ERP
                </h2>
                
                <p className="text-[15px] leading-[1.6] text-zinc-400 mb-8">
                  Run your entire business from one place. Sales, inventory, manufacturing, 
                  and accounting — connected in a single, unbloated platform.
                </p>
                
                <div className="flex flex-col gap-3 mb-10">
                  {FEATURES.map((feat) => (
                    <div key={feat.label} className="flex items-center gap-3 text-[13px] text-zinc-300 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      {feat.label}
                    </div>
                  ))}
                </div>
              </div>

              <MotionLink
                href={href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-[14px] font-semibold tracking-wide text-black bg-white rounded-xl transition-colors hover:bg-zinc-200"
              >
                Explore Platform
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MotionLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
