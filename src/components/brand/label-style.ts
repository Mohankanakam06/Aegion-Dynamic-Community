/**
 * LABEL STYLE — final (user decision 2026-10-06):
 * hero eyebrow pills → B (split pill); everything else → A (dot separator).
 * Eyebrow picks by variant; Badge and media caption labels use TEXT.
 * Option C (mono) was rejected — JetBrains Mono is removed.
 */
export type LabelStyleId = 'a' | 'b';

export const LABEL_STYLE_PILL: LabelStyleId = 'b';
export const LABEL_STYLE_TEXT: LabelStyleId = 'a';

export interface LabelStyleConfig {
  /** Text classes shared by lead and tail (font, size, weight, tracking, case). */
  text: string;
  /** Option B renders the tail in ember (deep on light surfaces, light on dark). */
  twoTone: boolean;
  /** Separator rendered by the component between lead and tail. */
  separator: 'middot' | 'divider';
}

export const LABEL_STYLES: Record<LabelStyleId, LabelStyleConfig> = {
  /** A — Dot separator: sans, medium, title case, 13px, +0.01em, ember dot before text. */
  a: {
    text: 'font-sans text-[13px] font-medium tracking-[0.01em]',
    twoTone: false,
    separator: 'middot',
  },
  /** B — Split pill: lead in ink, 1px hairline divider (16px), tail in text-safe ember. */
  b: {
    text: 'font-sans text-[13px] font-semibold tracking-[0.01em]',
    twoTone: true,
    separator: 'divider',
  },
};
