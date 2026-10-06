import React from 'react';
import { cn } from '../../lib/utils';

/**
 * A1 — Container. One gutter scale, three measures.
 * All pages share the same left edge per measure.
 */
type Measure = 'prose' | 'content' | 'wide';

const measureClasses: Record<Measure, string> = {
  prose: 'max-w-[var(--container-prose)]',
  content: 'max-w-[var(--container-content)]',
  wide: 'max-w-[var(--container-wide)]',
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  measure?: Measure;
}

export function Container({ measure = 'content', className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', measureClasses[measure], className)}
      {...props}
    />
  );
}

export default Container;
