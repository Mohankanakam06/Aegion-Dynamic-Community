import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IconTile } from './IconTile';
import { Button } from './Button';

/**
 * B5 — EmptyState. IconTile + title + one line + optional action.
 */
export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-[var(--cream-soft)] px-6 py-12 text-center',
        className
      )}
    >
      <IconTile icon={icon} size="lg" className="mb-4" />
      <h3 className="font-display text-xl font-bold text-[var(--ink)]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-soft)]">{description}</p>
      {action && (
        <Button variant="secondary" size="sm" className="mt-6" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
