import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LABEL_STYLE, LABEL_STYLES, type LabelStyleId } from './label-style';

/**
 * A2 — Eyebrow (v2). Takes the label as separate `lead` + `tail` props and
 * renders the separator itself — UI strings never contain "//" again.
 * Style comes from the single LABEL_STYLE switch (label-style.ts).
 * Dot pulses softly (2.4s; static under reduced motion). Wraps cleanly at
 * 320px: the tail may drop to a second line and the divider hides there.
 * Never use for emails, handles or sentences.
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  lead: React.ReactNode;
  tail?: React.ReactNode;
  variant?: 'pill' | 'plain';
  /** light = on cream/white; dark = on photo scrims and charcoal. */
  tone?: 'light' | 'dark';
  dot?: boolean;
  icon?: LucideIcon;
  /** Kit-only: forces one of the three candidate styles for comparison. */
  styleOption?: LabelStyleId;
}

function LabelSeparator({
  kind,
  tone,
}: {
  kind: 'middot' | 'divider' | 'hairline';
  tone: 'light' | 'dark';
}) {
  if (kind === 'middot') {
    return (
      <span aria-hidden="true" className="mx-1.5 select-none opacity-50 max-[359px]:hidden">
        ·
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'mx-2 w-px shrink-0 select-none self-center max-[359px]:hidden',
        kind === 'divider' ? 'h-4' : 'h-3',
        tone === 'dark' ? 'bg-white/30' : 'bg-[var(--line-strong)]'
      )}
    />
  );
}

export function Eyebrow({
  lead,
  tail,
  variant = 'plain',
  tone = 'light',
  dot = false,
  icon: Icon,
  styleOption,
  className,
  ...props
}: EyebrowProps) {
  const cfg = LABEL_STYLES[styleOption ?? LABEL_STYLE];
  const leadTone = tone === 'dark' ? 'text-[var(--cream)]' : 'text-[var(--ink)]';
  const tailTone = cfg.twoTone
    ? tone === 'dark'
      ? 'text-[var(--ember-light)]'
      : 'text-[var(--ember-deep)]'
    : leadTone;

  return (
    <span
      className={cn(
        'inline-flex max-w-full flex-wrap items-center gap-y-0.5',
        cfg.text,
        variant === 'pill' &&
          (tone === 'dark'
            ? 'rounded-full border border-white/20 bg-[var(--ink)]/60 px-3.5 py-1.5 backdrop-blur-sm'
            : 'rounded-full border border-[var(--amber-border)] bg-[var(--amber-soft)] px-3.5 py-1.5 shadow-xs'),
        className
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="mr-2 size-2 shrink-0 rounded-full bg-[var(--ember)] motion-safe:animate-pulse-soft"
        />
      )}
      {Icon && <Icon aria-hidden="true" className="mr-2 size-4 shrink-0 text-[var(--ember)]" />}
      <span className={leadTone}>{lead}</span>
      {tail && <LabelSeparator kind={cfg.separator} tone={tone} />}
      {tail && <span className={tailTone}>{tail}</span>}
    </span>
  );
}

export default Eyebrow;
