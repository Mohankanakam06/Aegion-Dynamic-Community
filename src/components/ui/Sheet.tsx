import React, { useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IconButton } from './IconButton';

/**
 * M2-final — Sheet (Radix Dialog, bottom sheet). Slides up 200ms. Focus trap and
 * return, Esc, scroll lock without layout shift, close IconButton, drag handle.
 * Swipe-to-close (touch only): starts from the drag handle / header area, or
 * anywhere when the content is scrolled to the very top; a swipe down inside a
 * scrollable list always scrolls the list instead. Max height 90dvh.
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
  /** Called when the user swipe-dismisses past the 80px threshold. */
  onSwipeClose?: () => void;
}

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, closeLabel = 'Close', onSwipeClose, ...props }, ref) => {
  const drag = useRef({ active: false, start: 0, delta: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' || !onSwipeClose) return;
    // A scrollable list owns the gesture unless it is at the very top.
    const scrollable = (e.target as HTMLElement).closest('[data-sheet-scroll]');
    if (scrollable && scrollable.scrollTop > 0) return;
    drag.current = { active: true, start: e.clientY, delta: 0 };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!drag.current.active) return;
    const delta = Math.max(0, e.clientY - drag.current.start);
    drag.current.delta = delta;
    e.currentTarget.style.transition = 'none';
    e.currentTarget.style.transform = `translateY(${delta}px)`;
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
          'sheet-content-bottom fixed inset-x-0 bottom-0 top-auto z-50 flex max-h-[90dvh] w-full flex-col overflow-y-auto rounded-t-[var(--radius-xl)] border-t border-[var(--line-strong)] bg-[var(--cream)] p-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl',
          className
        )}
        {...props}
      >
        <div aria-hidden="true" className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-[var(--line-strong)]" />
        {children}
        <DialogPrimitive.Close asChild>
          <IconButton
            icon={X}
            aria-label={closeLabel}
            variant="ghost"
            className="absolute right-4 top-3"
          />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
SheetContent.displayName = 'SheetContent';

export default Sheet;
