import { Terminal, Code2 } from 'lucide-react';
import { KitBlock, KitRow } from './KitBlock';
import { Badge } from '../components/ui/Badge';
import { IconTile } from '../components/ui/IconTile';
import { Card } from '../components/ui/Card';
import { Photo } from '../components/ui/Photo';

import badgeAvif from '../assets/images/build-hours/1.jpg?w=480;768&format=avif&as=srcset&imagetools';
import badgeWebp from '../assets/images/build-hours/1.jpg?w=480;768&format=webp&as=srcset&imagetools';
import badgeJpg from '../assets/images/build-hours/1.jpg?w=480;768&format=jpeg&as=srcset&imagetools';
import badgeMeta from '../assets/images/build-hours/1.jpg?w=768&format=jpeg&as=meta&imagetools';

import heroAvif from '../assets/images/proxima/2.jpg?w=480;768;1200;1920&format=avif&as=srcset&imagetools';
import heroWebp from '../assets/images/proxima/2.jpg?w=480;768;1200;1920&format=webp&as=srcset&imagetools';
import heroJpg from '../assets/images/proxima/2.jpg?w=480;768;1200;1920&format=jpeg&as=srcset&imagetools';
import heroMeta from '../assets/images/proxima/2.jpg?w=1200&format=jpeg&as=meta&imagetools';

/** Kit blocks: A7 Badge, A8 IconTile, A9 Card, A10 Photo. */
export function CardBlocks() {
  return (
    <>
      <KitBlock
        id="badge"
        title="A7 — Badge"
        note="Mono caps 11–12px, every variant ≥4.5:1 on its own background. onPhoto = ink 80% + backdrop-blur-sm + cream mono: readable on ANY photo (replaces today's faint badges)."
      >
        <KitRow label="Variants">
          <Badge variant="outline">Outline</Badge>
          <Badge variant="soft">Soft ember</Badge>
          <Badge variant="ink">Ink</Badge>
          <Badge variant="status" dot>
            Ongoing
          </Badge>
        </KitRow>
        <KitRow label="onPhoto over a real photo">
          <div className="w-full max-w-md">
            <div className="relative">
              <Photo
                cover
                className="aspect-[3/2]"
                src={badgeMeta.src}
                width={badgeMeta.width}
                height={badgeMeta.height}
                avifSrcSet={badgeAvif}
                webpSrcSet={badgeWebp}
                srcSet={badgeJpg}
                sizes="(max-width: 768px) 100vw, 448px"
                alt="Aegion Saturday Build Session in Vizag"
              />
              <Badge variant="onPhoto" className="absolute left-3 top-3 z-10">
                Weekly Cohort
              </Badge>
            </div>
          </div>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="icontile"
        title="A8 — IconTile"
        note="Ember-tint tile (8–12%), fills with text-safe ember on hover. Sizes sm/md/lg on the 16/18/20/24 icon scale; round or rounded-square. Used by channels, stat chips, empty states."
      >
        <KitRow label="Sizes + shapes (hover to fill)">
          <IconTile icon={Terminal} size="sm" />
          <IconTile icon={Terminal} size="md" />
          <IconTile icon={Terminal} size="lg" />
          <IconTile icon={Code2} size="md" shape="round" />
        </KitRow>
      </KitBlock>

      <KitBlock
        id="card"
        title="A9 — Card"
        note="surface / soft / ink. interactive = whole card is ONE stretched link (single tab stop, focus ring via :has(a:focus-visible)), hover lift 2px + shadow step + spotlight (effect #3, fine pointers only), pressed .995. Never a bordered card inside a bordered card."
      >
        <KitRow label="Variants">
          <Card className="w-56 p-5">
            <p className="font-display text-base font-bold">Surface</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">White, hairline, warm shadow.</p>
          </Card>
          <Card variant="soft" className="w-56 p-5">
            <p className="font-display text-base font-bold">Soft</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">Flat tonal, no border.</p>
          </Card>
          <Card variant="ink" className="w-56 p-5">
            <p className="font-display text-base font-bold">Ink</p>
            <p className="mt-1 text-xs text-white/70">Charcoal surface.</p>
          </Card>
        </KitRow>
        <KitRow label="Interactive (one tab stop; hover for lift + spotlight; Tab for ring)">
          <Card
            data-shot="card-interactive"
            href="/"
            linkLabel="Demo interactive card, goes to home"
            className="w-full max-w-sm p-5"
          >
            <IconTile icon={Code2} size="md" className="mb-4" />
            <p className="font-display text-base font-bold">Interactive card</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">
              The whole card is a single link. Move the pointer to see the spotlight;
              press Tab to see the focus ring land on the card.
            </p>
          </Card>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="photo"
        title="A10 — Photo"
        note="AVIF → WebP → JPEG srcset/sizes, explicit width/height (zero CLS), lazy + async by default, priority only for the hero (eager + high fetch priority + preload). 1px inset border, per-image object-position, error fallback tile with the logo mark."
      >
        <KitRow label="Cover (3:2 slot, object-position kept off faces)">
          <Photo
            cover
            className="aspect-[3/2] w-full max-w-xl"
            src={heroMeta.src}
            width={heroMeta.width}
            height={heroMeta.height}
            avifSrcSet={heroAvif}
            webpSrcSet={heroWebp}
            srcSet={heroJpg}
            sizes="(max-width: 768px) 100vw, 576px"
            objectPosition="50% 35%"
            alt="Hackathon Proxima sprint floor in Vizag"
          />
        </KitRow>
        <KitRow label="Natural ratio (h-auto) / error fallback tile">
          <Photo
            className="w-64"
            src={badgeMeta.src}
            width={badgeMeta.width}
            height={badgeMeta.height}
            avifSrcSet={badgeAvif}
            webpSrcSet={badgeWebp}
            srcSet={badgeJpg}
            sizes="256px"
            alt="Builders pairing at Build Hours"
          />
          <Photo
            className="aspect-[3/2] w-64"
            cover
            src="/__kit-intentionally-broken.jpg"
            width={768}
            height={512}
            alt="Broken image demo — fallback tile"
          />
        </KitRow>
      </KitBlock>
    </>
  );
}

export default CardBlocks;
