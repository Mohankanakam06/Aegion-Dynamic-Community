import React from 'react';
import { cn } from '../lib/utils';

/** Kit section frame. `onCharcoal` renders the Surfaces (dark-component) block. */
export function KitBlock({
  id,
  title,
  note,
  onCharcoal = false,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  onCharcoal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-36 rounded-[var(--radius-lg)] border p-6 sm:p-8',
        onCharcoal
          ? 'border-transparent bg-[var(--ink)] text-[var(--cream)]'
          : 'border-[var(--line)] bg-[var(--surface)]'
      )}
    >
      <header className="mb-6 border-b pb-4" style={{ borderColor: onCharcoal ? 'rgba(255,255,255,0.12)' : 'var(--line)' }}>
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {note && (
          <p className={cn('mt-1 max-w-3xl text-sm leading-relaxed', onCharcoal ? 'text-white/70' : 'text-[var(--ink-soft)]')}>
            {note}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}

/** Labeled row inside a KitBlock. */
export function KitRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] opacity-60">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default KitBlock;
