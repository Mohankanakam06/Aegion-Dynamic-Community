import React, { useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IconButton } from './IconButton';

/**
 * B6/M2 — Sheet (Radix Dialog, drawer variant). Slides in 200ms. Focus trap and
 * return, Esc, scroll lock without layout shift, close IconButton.
 * side="right": right drawer. side="bottom": bottom sheet with drag handle.
 * Swipe-to-close (touch only): swipe right (right drawer) or down (bottom sheet)
 * past 80px; the sheet follows the finger and snaps back under the threshold.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-xl font-bold text-[var(--ink)]', className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm leading-relaxed text-[var(--ink-soft)]', className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  closeLabel?: string;
  /** right = right drawer (mobile nav default); bottom = bottom sheet with handle. */
  side?: 'right' | 'bottom';
  /** Called when the user swipe-dismisses past the threshold. */
  onSwipeClose?: () => void;
}

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, closeLabel = 'Close', side = 'right', onSwipeClose, ...props }, ref) => {
  const drag = useRef({ active: false, start: 0, delta: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' || !onSwipeClose) return;
    if (side === 'bottom' && e.currentTarget.scrollTop > 0) return;
    drag.current = { active: true, start: side === 'bottom' ? e.clientY : e.clientX, delta: 0 };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!drag.current.active) return;
    const pos = side === 'bottom' ? e.clientY : e.clientX;
    const delta = Math.max(0, pos - drag.current.start);
    drag.current.delta = delta;
    e.currentTarget.style.transition = 'none';
    e.currentTarget.style.transform =
      side === 'bottom' ? `translateY(${delta}px)` : `translateX(${delta}px)`;
  };
  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    if (!drag.current.active) return;
    const { delta } = drag.current;
    drag.current = { active: false, start: 0, delta: 0 };
    e.currentTarget.style.transition = '';
    e.currentTarget.style.transform = '';
    if (delta > 80) onSwipeClose?.();
  };

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[var(--ink)]/60 backdrop-blur-sm" />
      <DialogPrimitive.Content
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          'fixed z-50 flex flex-col overflow-y-auto bg-[var(--cream)] shadow-2xl',
          side === 'right' &&
            'sheet-content inset-y-0 right-0 w-full max-w-sm border-l border-[var(--line-strong)] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pr-[max(1.5rem,env(safe-area-inset-right))]',
          side === 'bottom' &&
            'sheet-content-bottom inset-x-0 bottom-0 top-auto max-h-[92dvh] w-full rounded-t-[var(--radius-xl)] border-t border-[var(--line-strong)] p-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]',
          className
        )}
        {...props}
      >
        {side === 'bottom' && (
          <div aria-hidden="true" className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-[var(--line-strong)]" />
        )}
        {children}
        <DialogPrimitive.Close asChild>
          <IconButton
            icon={X}
            aria-label={closeLabel}
            variant="ghost"
            className="absolute right-4 top-4"
          />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
SheetContent.displayName = 'SheetContent';

export default Sheet;
