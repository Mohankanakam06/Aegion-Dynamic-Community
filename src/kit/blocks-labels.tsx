import { KitBlock } from './KitBlock';
import { Eyebrow } from '../components/brand/Eyebrow';
import type { LabelStyleId } from '../components/brand/label-style';

import scrimAvif from '../assets/images/build-hours/1.jpg?w=480;768&format=avif&as=srcset&imagetools';
import scrimWebp from '../assets/images/build-hours/1.jpg?w=480;768&format=webp&as=srcset&imagetools';
import scrimJpg from '../assets/images/build-hours/1.jpg?w=480;768&format=jpeg&as=srcset&imagetools';
import scrimMeta from '../assets/images/build-hours/1.jpg?w=768&format=jpeg&as=meta&imagetools';

const OPTIONS: { id: LabelStyleId; name: string; spec: string }[] = [
  { id: 'a', name: 'Option A — Dot separator', spec: 'Sans, medium, title case, 13px, +0.01em. Ember pulse dot, "·" between parts.' },
  { id: 'b', name: 'Option B — Split pill', spec: 'Sans, semibold, 13px. Lead in ink, 1px hairline divider (16px), tail in text-safe ember.' },
  { id: 'c', name: 'Option C — Mono refined', spec: 'JetBrains Mono, 12px, +0.04em, thin vertical divider. Check W, M, & and @ below.' },
];

/** Kit block: the three label-style candidates on cream, on a photo scrim, on charcoal. */
export function LabelBlocks() {
  return (
    <KitBlock
      id="labels"
      title="Label style — decision needed (pick A, B or C)"
      note="The “//” separator and the mono-caps-wide-tracking style are removed site-wide. Words stay exactly as they are. Every option is ≥4.5:1 on its own background; the tail drops to a second line at 320px with the divider hidden; the pulse dot stays (static under reduced motion)."
    >
      {OPTIONS.map((opt) => (
        <div key={opt.id} className="mb-10 border-b border-[var(--line)] pb-10 last:mb-0 last:border-0 last:pb-0">
          <p className="mb-1 font-display text-base font-bold">{opt.name}</p>
          <p className="mb-4 text-xs text-[var(--ink-soft)]">{opt.spec}</p>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* On cream */}
            <div className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-5">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">On cream</p>
              <div className="flex flex-col items-start gap-3">
                <Eyebrow styleOption={opt.id} variant="pill" dot lead="Visakhapatnam, AP" tail="Weekly Build Circle" />
                <Eyebrow styleOption={opt.id} lead="How We Build" tail="Operating Principles" />
                <Eyebrow styleOption={opt.id} lead="Flagships & Gatherings" />
              </div>
            </div>

            {/* On photo scrim */}
            <div className="relative overflow-hidden rounded-[var(--radius-md)]">
              <picture>
                <source type="image/avif" srcSet={scrimAvif} sizes="400px" />
                <source type="image/webp" srcSet={scrimWebp} sizes="400px" />
                <img
                  src={scrimMeta.src}
                  width={scrimMeta.width}
                  height={scrimMeta.height}
                  alt="Build Hours session"
                  className="h-44 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/25 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <Eyebrow styleOption={opt.id} tone="dark" dot lead="Sunday Build Session" tail="11:00 AM" />
              </div>
              <p className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.08em] text-white/70">On scrim</p>
            </div>

            {/* On charcoal */}
            <div className="rounded-[var(--radius-md)] bg-[var(--ink)] p-5">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-white/50">On charcoal</p>
              <div className="flex flex-col items-start gap-3">
                <Eyebrow styleOption={opt.id} tone="dark" dot lead="Visakhapatnam, AP" tail="Weekly Build Circle" />
                <Eyebrow styleOption={opt.id} tone="dark" lead="Flagships & Gatherings" />
              </div>
            </div>
          </div>

          {opt.id === 'c' && (
            <p className="font-mono-alt mt-4 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-3 text-xs tracking-[0.04em] text-[var(--ink)]">
              Glyph check — W M &amp; @ : Weekly Meetups &amp; Workshops @ aegion.dev
            </p>
          )}
        </div>
      ))}

      {/* 320px wrap behavior */}
      <div className="mt-2 rounded-[var(--radius-md)] border border-dashed border-[var(--line-strong)] p-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
          320px wrap — tail drops, divider hides
        </p>
        <div className="flex flex-wrap gap-6">
          {OPTIONS.map((opt) => (
            <div key={opt.id} className="w-[320px] rounded border border-[var(--line)] bg-[var(--cream)] p-4">
              <Eyebrow styleOption={opt.id} variant="pill" dot lead="Visakhapatnam, Andhra Pradesh" tail="Weekly Build Circle" />
            </div>
          ))}
        </div>
      </div>
    </KitBlock>
  );
}

export default LabelBlocks;
