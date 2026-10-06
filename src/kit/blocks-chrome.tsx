import { KitBlock, KitRow } from './KitBlock';
import { MobileNav } from '../components/layout/MobileNav';
import { StickyActionBar } from '../components/layout/StickyActionBar';

/** Kit blocks: Gate M chrome (M2 mobile nav FINAL, M3 sticky bar proposal). */
export function ChromeBlocks() {
  return (
    <>
      <KitBlock
        id="mobilenav"
        title="M2 — Mobile navigation (FINAL: bottom sheet)"
        note="Wordmark, 5 display-type links (48px rows, ember marker on the active route, 40ms stagger), “Join Sunday Sprint” pinned in the thumb zone, Vizag Innovation Hub line under it. Focus trap, Esc, scroll lock without layout shift, closes on navigation, inert background, swipe-down to close (handle/header, or the list at its very top — swipes inside a scrolled list scroll the list). Max height 90dvh; the list scrolls while the CTA stays pinned."
      >
        <KitRow label="Tap the menu button (best felt at 375px)">
          <div data-shot="nav-bottom" className="[&_button]:flex">
            <MobileNav id="mobile-nav-bottom" />
          </div>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="stickybar"
        title="M3 — Sticky bottom action bar (PROPOSAL — pick to wire)"
        note="The bar is live at the bottom of this viewport right now (forced for review). Behavior once wired: appears after the hero leaves the screen; hides when the footer is in view, on the Connect page, and while the keyboard is open. IntersectionObserver only — no scroll listeners. Safe-area aware; pages get matching bottom padding so it never covers content."
      >
        <p className="text-sm text-[var(--ink-soft)]">
          Look at the bottom edge of your screen — slim bar, one thumb-sized primary action, hairline top border, 95% cream + backdrop blur.
        </p>
        <StickyActionBar forceVisible />
      </KitBlock>
    </>
  );
}

export default ChromeBlocks;
