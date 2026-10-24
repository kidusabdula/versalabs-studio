'use client';

import { motion, MotionConfig, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

const SPRING = { stiffness: 300, damping: 30 };

export const MotionConfigProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig transition={SPRING} reducedMotion="user">{children}</MotionConfig>
);

// A Next link that takes motion props, so an animated call to action stays a
// single <a> instead of a <button> nested inside a link.
export const MotionLink = motion.create(Link);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const FadeIn = ({ children, delay = 0, direction = 'up', className }: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ ...SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const SlideIn = ({ children, delay = 0, direction = 'up', className }: SlideInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ ...SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScaleIn = ({ children, delay = 0, className }: ScaleInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ ...SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer = ({ children, staggerDelay = 0.08, className }: StaggerContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: SPRING }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={SPRING}
    className={className}
  >
    {children}
  </motion.div>
);

export const GlassCard = ({ children, className, hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={SPRING}
    whileHover={hover ? { scale: 1.01 } : {}}
    className={`bg-[#161618] border border-white/[0.06] rounded-xl ${className || ''}`}
  >
    {children}
  </motion.div>
);

export const GlassButton = ({ children, className, variant = 'default' }: { children: React.ReactNode; className?: string; variant?: 'default' | 'primary' }) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: variant === 'primary' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)' }}
    whileTap={{ scale: 0.98 }}
    transition={SPRING}
    className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
      variant === 'primary' 
        ? 'bg-white text-black' 
        : 'bg-white/[0.06] text-white border border-white/[0.08] hover:bg-white/[0.1]'
    } ${className || ''}`}
  >
    {children}
  </motion.button>
);
