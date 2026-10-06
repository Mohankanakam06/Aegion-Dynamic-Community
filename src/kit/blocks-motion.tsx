import { ArrowRight, ArrowUp, Github } from 'lucide-react';
import { KitBlock, KitRow } from './KitBlock';
import { Reveal } from '../components/motion/Reveal';
import { Stagger, StaggerItem } from '../components/motion/Stagger';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

/** Kit blocks: motion primitives + the Surfaces block (components on charcoal). */
export function MotionBlocks() {
  return (
    <>
      <KitBlock
        id="motion"
        title="Motion — Reveal + Stagger"
        note="Opacity + translateY (16–24px, 450ms, once, when in view), one shared easing token. Reduced motion = instant/opacity-only. No blur reveals. Scroll these into view to see them."
      >
        <KitRow label="Reveal (quiet, once)">
          <Reveal>
            <Card className="w-56 p-5">
              <p className="font-display text-base font-bold">I revealed once</p>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">20px rise, 450ms.</p>
            </Card>
          </Reveal>
        </KitRow>
        <KitRow label="Stagger (60ms children)">
          <Stagger className="flex flex-wrap gap-4">
            {['One', 'Two', 'Three', 'Four'].map((n) => (
              <StaggerItem key={n}>
                <Card variant="soft" className="w-32 p-4 text-center font-mono text-xs font-semibold">
                  {n}
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="surfaces"
        title="Surfaces — components on charcoal"
        note="Footer + CTABand contexts (the only intentional charcoal surfaces). Focus ring here is 2px cream + 2px offset (focus-ring-cream)."
        onCharcoal
      >
        <KitRow label="Button inverse + primary on charcoal">
          <Button data-shot="btn-inverse" variant="inverse" icon={ArrowRight}>
            View Event Calendar
          </Button>
          <Button icon={ArrowRight} className="focus-visible:focus-ring-cream">
            Join Next Sunday Sprint
          </Button>
        </KitRow>
        <KitRow label="IconButton inverse / Badge ink + onPhoto">
          <IconButton icon={Github} variant="inverse" aria-label="GitHub Organization" />
          <IconButton icon={ArrowUp} variant="inverse" aria-label="Scroll back to top" />
          <Badge variant="ink">Ink</Badge>
          <Badge variant="onPhoto">On Photo</Badge>
        </KitRow>
        <KitRow label="Card ink">
          <Card variant="ink" className="w-full max-w-sm p-5">
            <p className="font-display text-base font-bold">Charcoal card</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              Used by the CTABand family. Cream text, hairline-free, warm shadow.
            </p>
          </Card>
        </KitRow>
      </KitBlock>
    </>
  );
}

export default MotionBlocks;
