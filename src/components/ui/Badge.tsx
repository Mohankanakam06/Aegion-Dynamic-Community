import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { LABEL_STYLE, LABEL_STYLES } from '../brand/label-style';

/**
 * A7 — Badge. Typography follows the site-wide LABEL_STYLE switch
 * (label-style.ts); every variant is ≥4.5:1 on its own background.
 * onPhoto = ink at 80% + backdrop-blur-sm + cream text: readable on any photo.
 */
const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-full', {
  variants: {
    variant: {
      outline: 'border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)]',
      soft: 'bg-[var(--ember-soft)] text-[var(--ember-deep)]',
      ink: 'bg-[var(--ink)] text-[var(--cream)]',
      onPhoto: 'bg-[var(--ink)]/80 text-[var(--cream)] backdrop-blur-sm',
      status: 'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)]',
    },
    size: {
      sm: 'px-2.5 py-1',
      md: 'px-3 py-1.5',
    },
  },
  defaultVariants: { variant: 'outline', size: 'sm' },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Status dot (static; the pulsing dot belongs to Eyebrow). */
  dot?: boolean;
}

export function Badge({ className, variant, size, dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size }),
        LABEL_STYLES[LABEL_STYLE].text,
        size === 'sm' && 'text-[11px]',
        className
      )}
      {...props}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-[var(--ember)]" />}
      <span>{children}</span>
    </span>
  );
}

export { badgeVariants };
export default Badge;
