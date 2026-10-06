/**
 * LABEL STYLE — single switch for every "//"-style label on the site
 * (Eyebrow A2, Badge A7, media caption labels). Change request 2026-10-06:
 * the words stay exactly as they are; only the separator and label styling change.
 *
 * The user picks A | B | C from /__kit#labels. After the pick, this constant is
 * final and the styleOption demo prop is removed from the kit.
 */
export type LabelStyleId = 'a' | 'b' | 'c';

export const LABEL_STYLE: LabelStyleId = 'a'; // ← user decision pending

export interface LabelStyleConfig {
  /** Text classes shared by lead and tail (font, size, weight, tracking, case). */
  text: string;
  /** Option B renders the tail in ember (deep on light surfaces, light on dark). */
  twoTone: boolean;
  /** Separator rendered by the component between lead and tail. */
  separator: 'middot' | 'divider' | 'hairline';
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
  /** C — Mono refined: JetBrains Mono, 12px, +0.04em, thin vertical divider. */
  c: {
    text: 'font-mono-alt text-xs font-medium tracking-[0.04em]',
    twoTone: false,
    separator: 'hairline',
  },
};
