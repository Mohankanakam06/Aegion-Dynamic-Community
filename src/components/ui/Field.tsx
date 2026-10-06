import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * B1 — Field. Wiring: htmlFor/id, aria-describedby (hint + error), aria-invalid.
 * required = ember asterisk (aria-hidden) + `required` on the control.
 * The control is passed as `control` and gets id/aria props injected.
 */
export interface FieldProps {
  label: string;
  control: React.ReactElement;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Extra content rendered in the label row's right slot (e.g. a counter). */
  labelAside?: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  control,
  hint,
  error,
  required = false,
  labelAside,
  className,
}: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const controlWithProps = React.cloneElement(control as React.ReactElement<Record<string, unknown>>, {
    id,
    required: required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  });

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--ink)]"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-[var(--ember-deep)]">
              *
            </span>
          )}
        </label>
        {labelAside}
      </div>
      {controlWithProps}
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[13px] leading-relaxed text-[var(--ink-faint)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-error)]">
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Field;
