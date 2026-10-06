import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IconButton } from './IconButton';

/**
 * B6 — Dialog (Radix). Enter 200ms (fade + scale .98→1). Focus trap and return,
 * Esc, scroll lock without layout shift (scrollbar-gutter: stable), close
 * IconButton. Becomes a bottom sheet under 640px.
 * Pages lazy-load the views that render this (dossier modal, lightbox).
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-2xl font-bold leading-snug text-[var(--ink)]', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm leading-relaxed text-[var(--ink-soft)]', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Accessible label for the close button (default "Close"). */
  closeLabel?: string;
}

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, closeLabel = 'Close', ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-50 bg-[var(--ink)]/60 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'dialog-content fixed z-50 flex max-h-[85dvh] flex-col overflow-y-auto border border-[var(--line-strong)] bg-[var(--surface)] shadow-2xl',
        // ≥640px: centered dialog (reset the bottom-sheet offsets)
        'sm:bottom-auto sm:right-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[var(--radius-xl)] sm:border-b sm:p-8',
        // <640px: bottom sheet (safe-area-aware bottom padding for the home bar)
        'inset-x-0 bottom-0 rounded-t-[var(--radius-xl)] border-b-0 p-6 pb-[max(2rem,env(safe-area-inset-bottom))]',
        className
      )}
      {...props}
    >
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
));
DialogContent.displayName = 'DialogContent';

export default Dialog;
