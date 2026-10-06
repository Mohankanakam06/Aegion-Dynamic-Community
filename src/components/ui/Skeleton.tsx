import React from 'react';
import { cn } from '../../lib/utils';

/**
 * B5 — Skeleton. Token-tuned shimmer (static under reduced motion).
 * Every skeleton mirrors its real card's geometry exactly — zero CLS.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** line = text row, circle = avatar/icon, block = card/media rectangle */
  shape?: 'line' | 'circle' | 'block';
}

export function Skeleton({ shape = 'line', className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'skeleton-shimmer',
        shape === 'line' && 'h-3.5 rounded-md',
        shape === 'circle' && 'rounded-full',
        shape === 'block' && 'rounded-[var(--radius-lg)]',
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
