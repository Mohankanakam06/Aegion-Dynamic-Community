import { ArrowRight, ArrowUpRight, Menu, Copy, ArrowUp } from 'lucide-react';
import { KitBlock, KitRow } from './KitBlock';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';

/**
 * Kit blocks: A6 Button (+IconButton) with the two primary-color candidates.
 * Playwright captures hover/focus/active via [data-shot].
 */
export function ButtonBlocks() {
  return (
    <>
      <KitBlock
        id="buttons"
        title="A6 — Button"
        note="Pill, 44px+ touch targets, asChild for router Links. Hover = 1px lift + shadow step + icon nudge; active = scale .98; loading = spinner replaces icon (width locked) + aria-busy. States below: hover/focus/active are captured with Playwright; disabled/loading render statically."
      >
        <KitRow label="PRIMARY COLOR — decision needed (both measured AA)">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border-2 border-[var(--ember-deep)] bg-[var(--cream)] p-5">
              <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--ember-deep)]">
                Candidate 1 — recommended
              </p>
              <p className="mb-4 text-xs text-[var(--ink-soft)]">
                White on deeper ember #C4460E — 4.96:1 (AA ✓)
              </p>
              <Button data-shot="btn-primary" icon={ArrowRight}>
                Join Saturday Sprint
              </Button>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-5">
              <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                Candidate 2
              </p>
              <p className="mb-4 text-xs text-[var(--ink-soft)]">
                Ink on bright ember #E85D1A — 5.24:1 (AA ✓)
              </p>
              <Button
                icon={ArrowRight}
                className="bg-[var(--ember)] text-[var(--ink)] hover:bg-[var(--ember-light)]"
              >
                Join Saturday Sprint
              </Button>
            </div>
          </div>
        </KitRow>
        <KitRow label="Variants × sizes">
          <Button data-shot="btn-secondary" variant="secondary" icon={ArrowUpRight} size="md">
            Explore Gatherings
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="primary" size="sm" icon={ArrowRight}>
            Small
          </Button>
          <Button variant="primary" size="lg" icon={ArrowRight}>
            Large
          </Button>
        </KitRow>
        <KitRow label="Loading (spinner replaces icon, width locked) / disabled">
          <Button loading icon={ArrowRight}>
            Transmit Message
          </Button>
          <Button disabled icon={ArrowRight}>
            Disabled
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </KitRow>
        <KitRow label="asChild (renders a router Link)">
          <Button asChild icon={ArrowRight} size="md">
            <a href="#buttons">asChild anchor demo</a>
          </Button>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="iconbutton"
        title="A6 — IconButton"
        note="aria-label required by the type. 44px (sm) and 48px (md) targets. Tooltip support arrives at Gate B (hover-capable devices only)."
      >
        <KitRow label="Outline / ghost / sizes">
          <IconButton data-shot="iconbtn" icon={Menu} variant="outline" aria-label="Open navigation menu" />
          <IconButton icon={Copy} variant="ghost" aria-label="Copy email address" />
          <IconButton icon={ArrowUp} variant="outline" size="md" aria-label="Scroll back to top" />
          <IconButton icon={Menu} variant="outline" aria-label="Disabled demo" disabled />
        </KitRow>
      </KitBlock>
    </>
  );
}

export default ButtonBlocks;
