import { cn } from '../../lib/utils';
import { LABEL_STYLES, LABEL_STYLE_TEXT } from './label-style';

/**
 * NumberTag — replaces "01 // LABEL" and "LABEL // 01" tags.
 * Number in text-safe ember, label in ink, no separator glyph.
 * order="num-first"  → 01 Code First   (principle/bento tags)
 * order="label-first" → Phase 01       (About cadence cards; original word order)
 */
export interface NumberTagProps {
  num: string;
  label: string;
  order?: 'num-first' | 'label-first';
  className?: string;
}

export function NumberTag({ num, label, order = 'num-first', className }: NumberTagProps) {
  const numEl = <span className="font-semibold text-[var(--ember-deep)]">{num}</span>;
  const labelEl = <span className="text-[var(--ink)]">{label}</span>;

  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1.5',
        LABEL_STYLES[LABEL_STYLE_TEXT].text,
        className
      )}
    >
      {order === 'num-first' ? (
        <>
          {numEl}
          {labelEl}
        </>
      ) : (
        <>
          {labelEl}
          {numEl}
        </>
      )}
    </span>
  );
}

export default NumberTag;
