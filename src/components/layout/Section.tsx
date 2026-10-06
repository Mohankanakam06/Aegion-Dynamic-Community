import React from 'react';
import { cn } from '../../lib/utils';

/**
 * A1 — Section. Fluid vertical rhythm (64→128px) + optional full-bleed tonal band.
 * Compose: <Section band="soft"><Container measure="content">…</Container></Section>
 */
type Rhythm = 'sm' | 'md' | 'lg';
type Band = 'none' | 'soft' | 'white';

const rhythmClasses: Record<Rhythm, string> = {
  sm: 'py-[var(--section-sm)]',
  md: 'py-[var(--section-md)]',
  lg: 'py-[var(--section-lg)]',
};

const bandClasses: Record<Band, string> = {
  none: '',
  soft: 'bg-[var(--cream-soft)]',
  white: 'bg-[var(--surface)]',
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  rhythm?: Rhythm;
  band?: Band;
}

export function Section({ rhythm = 'md', band = 'none', className, ...props }: SectionProps) {
  return (
    <section
      className={cn(rhythmClasses[rhythm], bandClasses[band], className)}
      {...props}
    />
  );
}

export default Section;
