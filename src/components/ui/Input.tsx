import React from 'react';
import { cn } from '../../lib/utils';

/**
 * B2 — Input. 48px tall, pill (rounded-full), sans 16px (stops iOS zoom), never mono.
 * Focus = 2px ember ring via box-shadow (no layout shift) + border change.
 * Autofill colors fixed globally. Set autocomplete/inputmode/enterkeyhint at the call site.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-12 w-full rounded-full border bg-[var(--cream)] px-4 text-base text-[var(--ink)] transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--ink-muted)] hover:border-[var(--ink-faint)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
          error
            ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_2px_var(--color-error)]'
            : 'border-[var(--line-strong)] focus:border-[var(--ember-deep)] focus:shadow-[0_0_0_2px_var(--ember-deep)]',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;
