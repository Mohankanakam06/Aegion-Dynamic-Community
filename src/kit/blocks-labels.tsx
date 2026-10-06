import { KitBlock, KitRow } from './KitBlock';
import { Eyebrow } from '../components/brand/Eyebrow';
import { NumberTag } from '../components/brand/NumberTag';

import scrimAvif from '../assets/images/build-hours/1.jpg?w=480;768&format=avif&as=srcset&imagetools';
import scrimWebp from '../assets/images/build-hours/1.jpg?w=480;768&format=webp&as=srcset&imagetools';
import scrimJpg from '../assets/images/build-hours/1.jpg?w=480;768&format=jpeg&as=srcset&imagetools';
import scrimMeta from '../assets/images/build-hours/1.jpg?w=768&format=jpeg&as=meta&imagetools';

/**
 * Kit block: the FINAL label styles (user decision 2026-10-06) +
 * the NumberTag demo awaiting approval before migration.
 */
export function LabelBlocks() {
  return (
    <>
      <KitBlock
        id="labels"
        title="Labels — final: B for hero pills, A for everything else"
        note="The “//” separator and mono-caps-wide-tracking are gone site-wide; words, days and times are untouched. Hero pills use the split pill (lead ink, 16px hairline, tail text-safe ember); captions, section labels, chips and the drawer line use the dot separator (sans medium 13px title case). Pulse dot stays (static under reduced motion); wraps cleanly at 320px."
      >
        <KitRow label="Hero pills — option B (all five page heroes)">
          <Eyebrow variant="pill" dot lead="Visakhapatnam, AP" tail="Weekly Build Circle" />
          <Eyebrow variant="pill" dot lead="The Origin" tail="Why We Gather" />
          <Eyebrow variant="pill" dot lead="Get Involved" tail="Pull Up a Chair" />
        </KitRow>
        <KitRow label="Section labels + drawer line — option A">
          <Eyebrow lead="How We Build" tail="Operating Principles" />
          <Eyebrow lead="Vizag Innovation Hub" tail="Sundays 11:00 AM IST" />
          <Eyebrow lead="Flagships & Gatherings" />
        </KitRow>
        <KitRow label="Media captions — option A on scrim">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[var(--radius-md)]">
            <picture>
              <source type="image/avif" srcSet={scrimAvif} sizes="576px" />
              <source type="image/webp" srcSet={scrimWebp} sizes="576px" />
              <img
                src={scrimMeta.src}
                width={scrimMeta.width}
                height={scrimMeta.height}
                alt="Build Hours session"
                className="h-40 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/25 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <Eyebrow tone="dark" dot lead="Sunday Build Session" tail="11:00 AM" />
            </div>
          </div>
        </KitRow>
        <KitRow label="Milestone chip — option A, title case (casing is styling; spelling untouched)">
          <div className="rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--cream-soft)] px-4 py-3">
            <Eyebrow lead="Milestone Achieved" tail="500+ Git Commits across 35 student repos" />
          </div>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="numbertag"
        title="NumberTag — approval needed before migration"
        note="Replaces “01 // CODE FIRST” and “PHASE // 01”. Number in text-safe ember, label in ink, Option-A typography, no separator. Principle tags stay number-first; cadence cards keep the original word order (Phase 01)."
      >
        <KitRow label="Principle tags — number first (Home bento)">
          <div className="flex flex-wrap gap-3">
            <div className="rounded-full border border-[var(--line)] bg-[var(--cream-soft)] px-3 py-1">
              <NumberTag num="01" label="Code First" />
            </div>
            <div className="rounded-full border border-[var(--line)] bg-[var(--cream-soft)] px-3 py-1">
              <NumberTag num="02" label="No Gatekeeping" />
            </div>
            <div className="rounded-full border border-[var(--line)] bg-[var(--cream-soft)] px-3 py-1">
              <NumberTag num="03" label="Full Spectrum" />
            </div>
            <div className="rounded-full border border-[var(--line)] bg-[var(--cream-soft)] px-3 py-1">
              <NumberTag num="04" label="Acceleration" />
            </div>
          </div>
        </KitRow>
        <KitRow label="Cadence cards — original word order (About)">
          <div className="flex flex-wrap gap-3">
            <NumberTag order="label-first" label="Phase" num="01" />
            <NumberTag order="label-first" label="Phase" num="02" />
            <NumberTag order="label-first" label="Phase" num="03" />
            <NumberTag order="label-first" label="Phase" num="04" />
          </div>
        </KitRow>
        <KitRow label="In context — bento card chrome + cadence card chrome">
          <div className="w-64 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--ember-soft)] text-[var(--ember-deep)]">
                ⌘
              </span>
              <NumberTag num="01" label="Code First" />
            </div>
            <p className="font-display text-base font-bold">Shipping Over Speaking</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Bento card chrome preview.</p>
          </div>
          <div className="w-64 rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <NumberTag order="label-first" label="Phase" num="01" />
              <span className="rounded-md bg-[var(--cream-soft)] px-2 py-0.5 font-sans text-[11px] font-medium text-[var(--ink-faint)]">
                11:00 AM
              </span>
            </div>
            <p className="font-display text-base font-bold">Prompt &amp; Match</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Cadence card chrome preview.</p>
          </div>
        </KitRow>
      </KitBlock>
    </>
  );
}

export default LabelBlocks;
