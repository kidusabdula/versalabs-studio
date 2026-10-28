'use client';

import { motion, MotionConfig } from 'framer-motion';

// The site's only motion: a section fades up 8px over 300ms the first time it
// scrolls into view. Nothing loops. With reduced motion on, MotionConfig drops
// the movement and leaves a plain fade.
//
// Never wrap the first view of a page (a hero or a page heading) in Reveal: it
// starts transparent, and the first view must paint with the server HTML.

const EASE = [0.2, 0, 0, 1] as const;

export const MotionConfigProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.3, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
