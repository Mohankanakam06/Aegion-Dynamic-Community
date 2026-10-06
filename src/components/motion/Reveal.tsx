import React from 'react';
import { m } from 'motion/react';
import { EASE_STANDARD, DURATION } from '../../lib/motion';

/**
 * Motion — Reveal. Opacity + translateY (16–24px, 450ms, once, when in view).
 * Under reduced motion MotionConfig strips the transform; opacity-only.
 * No blur reveals (too heavy on budget phones).
 */
export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds (legacy-compatible with the old ui/Reveal API). */
  delay?: number;
  /** Travel distance in px; keep within 16–24. */
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: DURATION.reveal, ease: EASE_STANDARD, delay }}
    >
      {children}
    </m.div>
  );
}

export default Reveal;
