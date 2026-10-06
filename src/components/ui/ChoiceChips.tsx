import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * B3 — ChoiceChips (the "I AM A…" group). Radix RadioGroup: labelled group,
 * roving tabindex + arrow keys, required + error state. Chips 44px+ tall, pill.
 * Checked = ember-tint fill + ember border + check icon fading in (width reserved,
 * no shift). Wraps cleanly at 320px.
 */
export interface ChoiceChipOption {
  value: string;
  label: string;
}

export interface ChoiceChipsProps {
  options: ChoiceChipOption[];
  value: string;
  onValueChange: (value: string) => void;
  'aria-label': string;
  name?: string;
  required?: boolean;
  error?: boolean;
  className?: string;
}

export function ChoiceChips({
  options,
  value,
  onValueChange,
  'aria-label': ariaLabel,
  name,
  required = false,
  error = false,
  className,
}: ChoiceChipsProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid grid-cols-2 gap-2 sm:grid-cols-4', className)}
      aria-label={ariaLabel}
      name={name}
      required={required}
      value={value}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            'group/chip inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-[background-color,border-color,color] duration-150 focus-visible:focus-ring',
            'border-[var(--line-strong)] bg-[var(--cream)] text-[var(--ink-soft)] hover:border-[var(--ember-deep)]/50 hover:text-[var(--ink)]',
            'data-[state=checked]:border-[var(--ember-deep)] data-[state=checked]:bg-[var(--ember-soft)] data-[state=checked]:font-semibold data-[state=checked]:text-[var(--ink)]',
            error && 'border-[var(--color-error)]'
          )}
        >
          <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
            <Check className="size-4 text-[var(--ember-deep)] opacity-0 transition-opacity duration-150 group-data-[state=checked]/chip:opacity-100" />
          </span>
          <span>{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}

export default ChoiceChips;
