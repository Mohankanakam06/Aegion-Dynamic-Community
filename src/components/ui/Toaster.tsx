import React, { useEffect, useState } from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

/**
 * B4 — Toast (Sonner, skinned to tokens). Bottom-center on mobile,
 * bottom-right on desktop; 4s (errors 6s), pauses on hover, swipe to dismiss.
 * Trigger with `toast.success(...)`, `toast.error(...)` from 'sonner'.
 */
function useIsNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return narrow;
}

export function Toaster() {
  const isNarrow = useIsNarrow();
  return (
    <SonnerToaster
      position={isNarrow ? 'bottom-center' : 'bottom-right'}
      gap={8}
      icons={{
        success: <CheckCircle2 aria-hidden="true" className="size-4 text-[var(--color-success)]" />,
        error: <AlertCircle aria-hidden="true" className="size-4 text-[var(--color-error)]" />,
        info: <Info aria-hidden="true" className="size-4 text-[var(--ember-deep)]" />,
      }}
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            'rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--surface)] text-sm font-medium text-[var(--ink)] shadow-lg',
          title: 'text-sm font-medium',
          description: 'text-xs text-[var(--ink-soft)]',
          success: '[&_[data-icon]]:text-[var(--color-success)]',
          error: '[&_[data-icon]]:text-[var(--color-error)]',
          actionButton: 'bg-[var(--ember-deep)] text-white rounded-full px-3 py-1 text-xs font-semibold',
          cancelButton: 'bg-[var(--cream-soft)] rounded-full px-3 py-1 text-xs font-semibold',
        },
      }}
    />
  );
}

/** Error toasts stay up longer (6s). */
export const TOAST_DURATION = { default: 4000, error: 6000 } as const;

export default Toaster;
