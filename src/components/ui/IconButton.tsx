import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * A6 — IconButton. 44px+ touch targets; `aria-label` is required by the type.
 * Tooltip support arrives with Gate B (Tooltip, hover-capable devices only).
 */
const iconButtonVariants = cva(
  'inline-flex shrink-0 select-none items-center justify-center rounded-full transition-[translate,scale,background-color,border-color,color,box-shadow] duration-150 ease-[var(--ease-standard)] focus-visible:focus-ring active:scale-95 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        outline:
          'border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-soft)] shadow-xs hover:bg-[var(--cream-soft)] hover:text-[var(--ink)]',
        ghost: 'text-[var(--ink-soft)] hover:bg-[var(--cream-soft)] hover:text-[var(--ink)]',
        inverse: 'bg-white/5 text-white/70 hover:bg-[var(--ember-deep)] hover:text-white',
      },
      size: {
        sm: 'size-11 [&_svg]:size-[18px]',
        md: 'size-12 [&_svg]:size-5',
      },
    },
    defaultVariants: { variant: 'ghost', size: 'sm' },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  'aria-label': string;
  icon: LucideIcon;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon: Icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        <Icon aria-hidden="true" />
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';

export { iconButtonVariants };
export default IconButton;
