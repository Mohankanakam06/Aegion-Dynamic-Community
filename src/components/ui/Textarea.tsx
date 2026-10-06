import React from 'react';
import { cn } from '../../lib/utils';

/**
 * B2 — Textarea. Large radius (not pill), sans 16px. Auto-grows via
 * field-sizing: content (min-height fallback for unsupported browsers).
 * Pair with Field's labelAside for a character counter when maxLength is set.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'field-sizing-content min-h-28 w-full resize-none rounded-[var(--radius-lg)] border bg-[var(--cream)] px-4 py-3 text-base leading-relaxed text-[var(--ink)] transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--ink-muted)] hover:border-[var(--ink-faint)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
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
Textarea.displayName = 'Textarea';

export default Textarea;
