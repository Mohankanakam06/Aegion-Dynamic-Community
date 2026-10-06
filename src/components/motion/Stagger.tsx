import React from 'react';
import { m, type Variants } from 'motion/react';
import { EASE_STANDARD, DURATION } from '../../lib/motion';

/**
 * Motion — Stagger. Quiet container/item stagger on scroll into view (once).
 * Items fade + rise 16px, 450ms, one shared easing token.
 */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_STANDARD },
  },
};

export interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  return (
    <m.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}

export default Stagger;
