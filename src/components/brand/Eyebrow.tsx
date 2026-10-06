import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * A2 — Eyebrow. Mono caps 12px, +0.08em tracking, text-safe ember.
 * Pill = hairline capsule; dot pulses softly (2.4s, static under reduced motion).
 * Never use for emails, handles or sentences.
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'pill' | 'plain';
  icon?: LucideIcon;
  dot?: boolean;
}

export function Eyebrow({
  variant = 'plain',
  icon: Icon,
  dot = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[var(--ember-deep)]',
        variant === 'pill' &&
          'rounded-full border border-[var(--amber-border)] bg-[var(--amber-soft)] px-3.5 py-1.5 shadow-xs',
        className
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-[var(--ember)] motion-safe:animate-pulse-soft"
        />
      )}
      {Icon && <Icon aria-hidden="true" className="size-4 text-[var(--ember)]" />}
      <span>{children}</span>
    </span>
  );
}

export default Eyebrow;
