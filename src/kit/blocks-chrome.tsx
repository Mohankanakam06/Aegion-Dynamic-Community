import { KitBlock, KitRow } from './KitBlock';
import { MobileNav } from '../components/layout/MobileNav';

/** Kit blocks: Gate M chrome (M2 mobile nav variants). */
export function ChromeBlocks() {
  return (
    <KitBlock
      id="mobilenav"
      title="M2 — Mobile navigation: pick the sheet style"
      note="Same content in both: wordmark, 5 display-type links (48px rows, ember marker on the active route, 40ms stagger), “Join Sunday Sprint” pinned in the thumb zone, Vizag Innovation Hub line under it. Focus trap, Esc, scroll lock without layout shift, closes on navigation, inert background, swipe-to-close. Tap each menu button (on a 375px viewport it feels best) and pick one — the other is deleted."
    >
      <KitRow label="Option 1 — bottom sheet (thumb-native, drag handle, swipe down to close)">
        <div data-shot="nav-bottom" className="[&_button]:flex">
          <MobileNav variant="bottom" id="mobile-nav-bottom" />
        </div>
        <span className="text-xs text-[var(--ink-soft)]">← tap the menu button</span>
      </KitRow>
      <KitRow label="Option 2 — right drawer (classic, swipe right to close)">
        <div data-shot="nav-right" className="[&_button]:flex">
          <MobileNav variant="right" id="mobile-nav-right" />
        </div>
        <span className="text-xs text-[var(--ink-soft)]">← tap the menu button</span>
      </KitRow>
    </KitBlock>
  );
}

export default ChromeBlocks;
