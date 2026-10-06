import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * A8 — IconTile. Ember-tint tile, fills with text-safe ember on hover
 * (its own hover or an interactive parent's group hover). 16/18/20/24 icon scale.
 */
const iconTileVariants = cva(
  'inline-flex shrink-0 items-center justify-center bg-[var(--ember-soft)] text-[var(--ember-deep)] transition-colors duration-150 hover:bg-[var(--ember-deep)] hover:text-white group-hover:bg-[var(--ember-deep)] group-hover:text-white',
  {
    variants: {
      size: {
        sm: 'size-10 [&_svg]:size-[18px]',
        md: 'size-12 [&_svg]:size-5',
        lg: 'size-14 [&_svg]:size-6',
      },
      shape: {
        square: 'rounded-xl',
        round: 'rounded-full',
      },
    },
    compoundVariants: [
      { size: 'lg', shape: 'square', class: 'rounded-2xl' },
    ],
    defaultVariants: { size: 'md', shape: 'square' },
  }
);

export interface IconTileProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconTileVariants> {
  icon: LucideIcon;
}

export function IconTile({ className, size, shape, icon: Icon, ...props }: IconTileProps) {
  return (
    <span className={cn(iconTileVariants({ size, shape }), className)} {...props}>
      <Icon aria-hidden="true" />
    </span>
  );
}

export { iconTileVariants };
export default IconTile;
