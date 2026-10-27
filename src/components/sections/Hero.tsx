'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useSyncExternalStore } from 'react';
import { MotionLink } from '@/components/ui/motion';

const SPRING = { stiffness: 300, damping: 30 };

// The container only orchestrates the stagger. It must not fade: the heading
// and subtitle inside it are the LCP, and an opacity-0 parent hides them until
// hydration.
const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

// The heading and subtitle are the LCP candidates (the subtitle on phones):
// they only slide, so they paint on the first frame instead of waiting for
// hydration to fade them in.
const headingLine = {
  hidden: { y: 24 },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // False during SSR and hydration, true afterwards, so the scroll-linked
  // styles below never cause a hydration mismatch.
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center overflow-hidden isolate" style={{ minHeight: '100svh' }}>
      
      {/* Parallax Background Glow */}
      <motion.div 
        style={{ y: hasMounted ? bgY : 0, scale: hasMounted ? glowScale : 1, opacity: hasMounted ? glowOpacity : 1 }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <div className="w-[120vw] max-w-[900px] h-[600px] bg-white/[0.03] blur-[140px] rounded-full" />
      </motion.div>

      {/* Floating Geometric Accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute top-[20%] left-[8%] w-20 h-20 border border-white/[0.04] rounded-lg rotate-12"
        />
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
          className="absolute top-[30%] right-[10%] w-16 h-16 border border-white/[0.03] rounded-full"
        />
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' as const, delay: 2 }}
          className="absolute bottom-[25%] left-[15%] w-12 h-12 border border-white/[0.04] rotate-45"
        />
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.5 }}
          className="absolute bottom-[30%] right-[12%] w-24 h-24 border border-white/[0.03] rounded-2xl -rotate-6"
        />
      </motion.div>

      <motion.div 
        style={{ y: hasMounted ? contentY : 0 }}
        className="relative z-10 flex flex-col items-center w-full max-w-5xl"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="flex flex-col items-center w-full"
        >
          {/* Announcer Badge */}
          <motion.div variants={slideUp} className="mb-8">
            <motion.div 
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.2)' }}
              transition={SPRING}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-[#ffffff05] backdrop-blur-md px-4 py-1.5 text-[13px] font-medium text-zinc-300 shadow-2xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
               <span>Design, Build, Launch</span>
            </motion.div>
          </motion.div>

          {/* Huge Heading — staggered word reveal */}
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <motion.span variants={headingLine} className="block text-white">
              From a Business Problem
            </motion.span>
            <motion.span variants={headingLine} className="block bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              To Working Platform
            </motion.span>
          </h1>

          {/* Description — slides up with the heading */}
          <motion.p variants={headingLine} className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-zinc-400">
            Bring us the business problem. We shape the product, design the experience, build the system, and help launch software your team can actually use.
          </motion.p>

          {/* Action Buttons — stagger */}
          <motion.div variants={slideInRight} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MotionLink
              href="/work"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-black transition-colors"
            >
              See What We Build
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </MotionLink>
            <MotionLink
              href="/contact"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="flex h-11 items-center rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-md px-6 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08]"
            >
              Start a Project
            </MotionLink>
          </motion.div>

          {/* Glassmorphic Stats Grid — scale in */}
          <motion.div 
            variants={scaleIn}
            className="mt-24 grid w-full max-w-4xl grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0C]/40 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)]"
          >
            {[
              { val: 'Design', label: 'Product and interface design' },
              { val: 'Build', label: 'Web, mobile and ERP engineering' },
              { val: 'Launch', label: 'Deployment and handover' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500"
              >
                <div className="text-[40px] font-semibold tracking-tighter text-white drop-shadow-md mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stat.val}
                </div>
                <div className="text-[12px] font-medium text-zinc-400 tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator: in the flow, so it never lands on the stats when
          the hero is taller than the screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-10 mt-10 mb-8"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-500 backdrop-blur-md transition-colors hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
