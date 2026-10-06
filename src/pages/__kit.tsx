import { useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { Badge } from '../components/ui/Badge';
import { Toaster } from '../components/ui/Toaster';
import { LabelBlocks } from '../kit/blocks-labels';
import { FoundationBlocks } from '../kit/blocks-foundations';
import { ButtonBlocks } from '../kit/blocks-buttons';
import { CardBlocks } from '../kit/blocks-cards';
import { MotionBlocks } from '../kit/blocks-motion';
import { FormBlocks } from '../kit/blocks-forms';
import { FeedbackBlocks } from '../kit/blocks-feedback';
import { ChromeBlocks } from '../kit/blocks-chrome';

const INDEX = [
  { id: 'labels', label: '⚑ Labels' },
  { id: 'numbertag', label: '⚑ NumberTag' },
  { id: 'mobilenav', label: '⚑ MobileNav' },
  { id: 'stickybar', label: '⚑ StickyBar' },
  { id: 'container', label: 'Container' },
  { id: 'eyebrow', label: 'Eyebrow' },
  { id: 'tokens-semantic', label: '⚑ Semantics' },
  { id: 'field', label: 'Field' },
  { id: 'input', label: 'Input' },
  { id: 'choicechips', label: 'ChoiceChips' },
  { id: 'toast', label: 'Toast' },
  { id: 'feedback-primitives', label: 'Feedback' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'accent', label: 'Accent' },
  { id: 'sectionheader', label: 'SectionHeader' },
  { id: 'links', label: 'Link' },
  { id: 'buttons', label: 'Button' },
  { id: 'iconbutton', label: 'IconButton' },
  { id: 'badge', label: 'Badge' },
  { id: 'icontile', label: 'IconTile' },
  { id: 'card', label: 'Card' },
  { id: 'photo', label: 'Photo' },
  { id: 'motion', label: 'Motion' },
  { id: 'surfaces', label: 'Surfaces' },
];

/**
 * Dev-only component kit (Gate review surface). Registered only when
 * import.meta.env.DEV — never in the production build or sitemap.
 */
export default function KitPage() {
  useEffect(() => {
    document.title = 'Aegion Component Kit (dev only)';
  }, []);

  return (
    <div className="pb-32 pt-24 sm:pt-28">
      <meta name="robots" content="noindex" />
      <Container measure="wide">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <Badge variant="soft">Dev only</Badge>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
              Gate review surface
            </span>
          </div>
          <h1>Aegion Component Kit</h1>
          <p className="mt-2 max-w-2xl text-[var(--ink-soft)]">
            Every variant, size and state on cream — plus a Surfaces block on charcoal.
            Hover, focus and active states are captured with Playwright per gate.
          </p>
        </header>
      </Container>

      {/* Sticky mini-index */}
      <div className="sticky top-[72px] z-30 border-y border-[var(--line)] bg-[var(--cream)]/90 backdrop-blur-md">
        <Container measure="wide" className="flex gap-1 overflow-x-auto py-2.5">
          {INDEX.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)] transition-colors hover:bg-[var(--cream-soft)] hover:text-[var(--ink)] focus-visible:focus-ring"
            >
              {item.label}
            </a>
          ))}
        </Container>
      </div>

      <Container measure="wide" className="mt-10 space-y-10">
        <LabelBlocks />
        <ChromeBlocks />
        <FoundationBlocks />
        <ButtonBlocks />
        <CardBlocks />
        <MotionBlocks />
        <FormBlocks />
        <FeedbackBlocks />
      </Container>
      <Toaster />
    </div>
  );
}
