import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Spinner } from './Spinner';

/**
 * A6 — Button. Pill, 44px+ touch targets, asChild for router Links.
 * Hover = 1px lift + shadow step + icon nudge 3px; active = scale .98;
 * loading = spinner replaces the icon (same 16px footprint, width locked) + aria-busy.
 *
 * PRIMARY COLOR — pending user decision (Gate A kit shows both candidates):
 * default is candidate 1 (recommended): white on text-safe ember #C4460E (4.96:1, AA).
 * Candidate 2 (ink on bright ember #E85D1A) is shown in /__kit via className override.
 */
const buttonVariants = cva(
  'group/btn inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[translate,scale,box-shadow,background-color,border-color,color] duration-150 ease-[var(--ease-standard)] focus-visible:focus-ring active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--ember-deep)] text-white shadow-xs hover:-translate-y-px hover:bg-[var(--ember-dark)] hover:shadow-md',
        secondary:
          'border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] shadow-xs hover:-translate-y-px hover:bg-[var(--cream-soft)] hover:shadow-sm',
        ghost: 'text-[var(--ink-soft)] hover:bg-[var(--cream-soft)] hover:text-[var(--ink)]',
        inverse: 'border border-white/20 bg-white/10 text-white hover:bg-white/20',
      },
      size: {
        sm: 'min-h-11 gap-1.5 px-5 text-xs [&_svg]:size-4',
        md: 'min-h-12 px-7 text-sm [&_svg]:size-4',
        lg: 'min-h-[52px] px-8 text-sm [&_svg]:size-[18px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element (router Link or <a>). When asChild, pass icons/label yourself. */
  asChild?: boolean;
  /** Spinner replaces the trailing icon; sets aria-busy and disables the control. */
  loading?: boolean;
  /** Trailing icon; nudges 3px on hover. */
  icon?: LucideIcon;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, icon: Icon, disabled, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={asChild ? undefined : disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading ? (
              <Spinner />
            ) : (
              Icon && (
                <Icon
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover/btn:translate-x-[3px]"
                />
              )
            )}
            <span>{children}</span>
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
export default Button;
