import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

/**
 * B5 — Tooltip. For icon-only desktop controls only; 400ms delay, Esc dismisses
 * (Radix), never carries essential info.
 */
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className="z-50 max-w-[240px] rounded-md bg-[var(--ink)] px-2.5 py-1.5 text-xs font-medium leading-snug text-[var(--cream)] shadow-md"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[var(--ink)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export default Tooltip;
