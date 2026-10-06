import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '../../lib/utils';
import { isReducedMotion } from '../../lib/motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 30,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.05,
  rootMargin = '50px',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const motionSafe = !isReducedMotion();
  const animatedByWords = animateBy === 'words';

  const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as any });

  useEffect(() => {
    if (isInView || !motionSafe) {
      setInView(true);
    }
  }, [isInView, motionSafe]);

  // Fallback timer so text never remains hidden
  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 250);
    return () => clearTimeout(timer);
  }, []);

  if (!motionSafe) {
    return <p className={className}>{text}</p>;
  }

  const initialY = direction === 'top' ? -12 : 12;

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {elements.map((element, index) => (
        <span
          key={index}
          className={cn('inline-block', animatedByWords ? 'mr-[0.25em]' : '')}
        >
          {element === ' ' ? '\u00A0' : element}
          {animatedByWords && index === elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </p>
  );
};

export default BlurText;
