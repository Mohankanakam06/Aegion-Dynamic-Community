import { Compass, Terminal } from 'lucide-react';
import { KitBlock, KitRow } from './KitBlock';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Eyebrow } from '../components/brand/Eyebrow';
import { Accent } from '../components/brand/Accent';
import { SectionHeader } from '../components/brand/SectionHeader';
import { Link } from '../components/ui/Link';

/** Kit blocks: A1 Container/Section, A2 Eyebrow, A3 Accent, A4 SectionHeader, A5 Link. */
export function FoundationBlocks() {
  return (
    <>
      <KitBlock
        id="container"
        title="A1 — Container + Section"
        note="Three measures (prose 68ch, content 1120px, wide 1280px), one gutter scale, fluid rhythm 64→128px. Bars below share one left edge — the alignment every page must keep at 1440px."
      >
        <KitRow label="Measures (left edge marker in ember)">
          <div className="relative w-full border-l-2 border-[var(--ember)] pl-4">
            {(['prose', 'content', 'wide'] as const).map((m) => (
              <div key={m} className="mb-3 last:mb-0">
                <Container
                  measure={m}
                  className="!mx-0 rounded-md border border-dashed border-[var(--line-strong)] bg-[var(--cream-soft)] px-3 py-2 font-mono text-[11px] text-[var(--ink-soft)]"
                >
                  {m} — {m === 'prose' ? '68ch' : m === 'content' ? '1120px' : '1280px'}
                </Container>
              </div>
            ))}
          </div>
        </KitRow>
        <KitRow label="Section rhythm + tonal bands">
          <div className="w-full space-y-3">
            <Section rhythm="sm" band="white" className="rounded-md border border-[var(--line)] px-4 font-mono text-[11px] text-[var(--ink-soft)]">
              band=white, rhythm=sm
            </Section>
            <Section rhythm="sm" band="soft" className="rounded-md px-4 font-mono text-[11px] text-[var(--ink-soft)]">
              band=soft (full-bleed tonal)
            </Section>
          </div>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="eyebrow"
        title="A2 — Eyebrow"
        note="Mono caps 12px, +0.08em tracking, text-safe ember. Dot pulses softly (2.4s; static under reduced motion). Never used for emails, handles or sentences."
      >
        <KitRow label="Pill + pulsing dot">
          <Eyebrow variant="pill" dot>
            Visakhapatnam, AP // Weekly Build Circle
          </Eyebrow>
        </KitRow>
        <KitRow label="Pill + icon">
          <Eyebrow variant="pill" icon={Compass}>
            The Origin // Why We Gather
          </Eyebrow>
        </KitRow>
        <KitRow label="Plain / plain + icon">
          <Eyebrow>Flagships & Gatherings</Eyebrow>
          <Eyebrow icon={Terminal}>How We Build // Operating Principles</Eyebrow>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="accent"
        title="A3 — Accent"
        note="The ember word in headings. Bright ember passes 3:1 only at ≥24px (large text); tone=safe (ember-deep) below that. Underline draws once on view (650ms) and survives line wraps."
      >
        <KitRow label="Bright (large text) / safe (small text)">
          <h3 className="text-3xl font-extrabold">
            Where Vizag <Accent>Ships</Accent>
          </h3>
          <p className="text-sm font-semibold">
            Small-size accent uses <Accent tone="safe">tone=safe</Accent> (4.8:1).
          </p>
        </KitRow>
        <KitRow label="Underline draw (scrolls into view once) + wrap survival">
          <h3 className="max-w-[26ch] text-2xl font-extrabold text-balance">
            Built on <Accent underline>Proof of Work</Accent>, shipped every single Saturday
          </h3>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="sectionheader"
        title="A4 — SectionHeader"
        note="Eyebrow + heading with Accent + optional lead + optional right action (drops under the heading on mobile). Heading level via prop; one h1 per page."
      >
        <div className="space-y-10">
          <SectionHeader
            eyebrow="Flagships & Gatherings"
            title={
              <>
                Where Vizag <Accent>Ships</Accent>
              </>
            }
            action={{ href: '/', label: 'View All Events & Sprints' }}
          />
          <div className="border-t border-[var(--line)] pt-10">
            <SectionHeader
              align="center"
              eyebrow="The Origin // Why We Gather"
              eyebrowIcon={Compass}
              title={
                <>
                  How the <Accent>Cadence</Accent> Works
                </>
              }
              lead="Every Saturday from 4:00 PM to 8:15 PM IST."
            />
          </div>
        </div>
      </KitBlock>

      <KitBlock
        id="links"
        title="A5 — Link"
        note="Rule: → navigates inside the site, ↗ leaves it. External links in a new tab get rel=&quot;noopener noreferrer&quot; + an sr-only “(opens in a new tab)”."
      >
        <KitRow label="Inline (in a sentence)">
          <p className="max-w-md text-sm text-[var(--ink-soft)]">
            We gather every weekend in Vizag —{' '}
            <Link href="/about">read the origin story</Link> — no gatekeeping, ever.
          </p>
        </KitRow>
        <KitRow label="Arrow: internal → / external ↗">
          <Link href="/events" variant="arrow">
            View All Events & Sprints
          </Link>
          <Link href="https://github.com/aegion-community" variant="arrow" target="_blank">
            GitHub Organization
          </Link>
        </KitRow>
        <KitRow label="Mono (manifesto style)">
          <Link href="/about" variant="mono">
            Origin Story &amp; Manifesto →
          </Link>
        </KitRow>
      </KitBlock>
    </>
  );
}

export default FoundationBlocks;
