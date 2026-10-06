import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

/**
 * A3 — Accent. The ember word inside a heading.
 * tone="bright" (default) passes 3:1 only at ≥24px (large text); use tone="safe"
 * (text-safe ember) at smaller sizes. underline draws once on view (650ms),
 * survives line wraps via box-decoration-break: clone.
 */
export interface AccentProps extends React.HTMLAttributes<HTMLSpanElement> {
  underline?: boolean;
  tone?: 'bright' | 'safe';
}

export function Accent({
  underline = false,
  tone = 'bright',
  className,
  children,
  ...props
}: AccentProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const drawn = underline && (inView || reduceMotion);

  return (
    <span
      ref={ref}
      className={cn(
        tone === 'bright' ? 'text-[var(--ember)]' : 'text-[var(--ember-deep)]',
        underline && 'accent-underline',
        drawn && 'is-drawn',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Accent;
