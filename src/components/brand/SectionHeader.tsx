import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Eyebrow } from './Eyebrow';
import { Link } from '../ui/Link';

/**
 * A4 — SectionHeader. Eyebrow + heading (with Accent) + optional lead
 * + optional right-aligned action (drops under the heading on mobile).
 * Set the heading level via `as`; one h1 per page.
 */
export interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowTail?: string;
  eyebrowIcon?: LucideIcon;
  eyebrowDot?: boolean;
  eyebrowVariant?: 'pill' | 'plain';
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: { href: string; label: string };
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowTail,
  eyebrowIcon,
  eyebrowDot,
  eyebrowVariant,
  title,
  lead,
  action,
  as: Heading = 'h2',
  align = 'left',
  className,
}: SectionHeaderProps) {
  const headerText = (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <Eyebrow
          variant={eyebrowVariant ?? (align === 'center' ? 'pill' : 'plain')}
          icon={eyebrowIcon}
          dot={eyebrowDot}
          lead={eyebrow}
          tail={eyebrowTail}
          className="mb-3"
        />
      )}
      <Heading className="text-balance">{title}</Heading>
      {lead && (
        <p className="mt-3 text-base leading-relaxed text-pretty text-[var(--ink-soft)] sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );

  if (align === 'center') {
    return (
      <div className={cn('flex flex-col items-center gap-5', className)}>
        {headerText}
        {action && (
          <Link href={action.href} variant="arrow">
            {action.label}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      {headerText}
      {action && (
        <div className="shrink-0">
          <Link href={action.href} variant="arrow">
            {action.label}
          </Link>
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
