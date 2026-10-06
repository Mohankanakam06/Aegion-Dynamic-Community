import { Variants, Transition } from 'motion/react';

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/* ==========================================================================
   GATE A — SHARED MOTION TOKENS (one easing, one indicator spring)
   ========================================================================== */
export const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  micro: 0.16,
  reveal: 0.45,
} as const;

/** Spring for sliding indicators (nav pills, filter pills) — tune by eye. */
export const SPRING_INDICATOR: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
};

export const springTransition: Transition = {
  type: 'spring',
  damping: 25,
  stiffness: 200,
};

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1.0],
};

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerFastVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};
