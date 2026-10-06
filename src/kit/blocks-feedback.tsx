import { useState } from 'react';
import { toast } from 'sonner';
import { Calendar, Copy, Info, ArrowRight } from 'lucide-react';
import { KitBlock, KitRow } from './KitBlock';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { Badge } from '../components/ui/Badge';
import { Tooltip } from '../components/ui/Tooltip';
import { Skeleton } from '../components/ui/Skeleton';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../components/ui/Dialog';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '../components/ui/Sheet';
import { Link } from '../components/ui/Link';
import { TOAST_DURATION } from '../components/ui/Toaster';

/** Kit blocks: B4 Toast, B5 Tooltip/Skeleton/Spinner/EmptyState, B6 Dialog/Sheet. */
export function FeedbackBlocks() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <KitBlock
        id="toast"
        title="B4 — Toast (Sonner, token-skinned)"
        note="Bottom-center on mobile, bottom-right on desktop; 4s (errors 6s), pauses on hover, swipe to dismiss. Used for “email copied” and form results."
      >
        <KitRow label="Trigger live toasts">
          <Button variant="secondary" size="sm" icon={Copy} onClick={() => toast.success('Email copied to clipboard.')}>
            Success (copy email)
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast.error('Message failed to send. Try again.', { duration: TOAST_DURATION.error })}
          >
            Error (6s)
          </Button>
          <Button variant="ghost" size="sm" icon={Info} onClick={() => toast.info('New gathering announced this Sunday.')}>
            Info
          </Button>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="feedback-primitives"
        title="B5 — Tooltip / Skeleton / Spinner / EmptyState"
        note="Tooltip: icon-only desktop controls, 400ms delay, Esc dismisses, never essential info. Skeleton mirrors real geometry (static under reduced motion). Spinner is currentColor. EmptyState = IconTile + title + one line + optional action."
      >
        <KitRow label="Tooltip (hover the copy button)">
          <Tooltip content="Copy email address">
            <IconButton data-shot="tooltip-btn" icon={Copy} variant="outline" aria-label="Copy email address" />
          </Tooltip>
        </KitRow>
        <KitRow label="Skeleton — mirrors a card's geometry exactly">
          <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
            <Skeleton shape="block" className="mb-4 aspect-[3/2] w-full" />
            <Skeleton className="mb-2 w-1/3" />
            <Skeleton className="mb-2 w-2/3" />
            <Skeleton className="w-1/2" />
            <div className="mt-4 flex items-center gap-2 border-t border-[var(--line)] pt-4">
              <Skeleton shape="circle" className="size-8" />
              <Skeleton className="w-24" />
            </div>
          </div>
        </KitRow>
        <KitRow label="Spinner (currentColor)">
          <span className="inline-flex items-center gap-2 text-[var(--ember-deep)]">
            <Spinner /> <span className="text-sm font-medium">Loading…</span>
          </span>
        </KitRow>
        <KitRow label="EmptyState">
          <div className="w-full max-w-2xl">
            <EmptyState
              icon={Calendar}
              title="No gatherings found"
              description="We couldn't find any gatherings matching this category right now. Check back soon or view all gatherings."
              action={{ label: 'View All Gatherings', onClick: () => {} }}
            />
          </div>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="dialog"
        title="B6 — Dialog + Sheet"
        note="Radix, lazy-loaded by pages. Enter 200ms (fade + scale .98→1; sheet slides). Focus trap and return, Esc, scroll lock without layout shift (scrollbar-gutter: stable), close IconButton. Dialog becomes a bottom sheet under 640px — resize to see."
      >
        <KitRow label="Dialog (bottom sheet < 640px)">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button data-shot="dialog-open" variant="secondary" icon={ArrowRight}>
                Open event dossier
              </Button>
            </DialogTrigger>
            <DialogContent data-shot="dialog-content" aria-describedby="kit-dialog-desc">
              <Badge variant="soft" className="mb-3 w-fit">Weekly Cohort</Badge>
              <DialogTitle className="mb-2 pr-8">Aegion Build Hours</DialogTitle>
              <DialogDescription id="kit-dialog-desc" className="mb-4">
                Focused, distraction-free co-working &amp; shipping sessions for passionate student technologists.
              </DialogDescription>
              <div className="rounded-[var(--radius-md)] bg-[var(--cream-soft)] p-4 text-sm text-[var(--ink-soft)]">
                Focus is trapped here until Esc or close; it returns to the trigger afterwards.
              </div>
            </DialogContent>
          </Dialog>
        </KitRow>
        <KitRow label="Sheet (mobile navigation pattern)">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button data-shot="sheet-open" variant="secondary" icon={ArrowRight}>
                Open sheet
              </Button>
            </SheetTrigger>
            <SheetContent data-shot="sheet-content" aria-describedby="kit-sheet-desc">
              <SheetTitle className="mb-6 pr-8">Menu</SheetTitle>
              <p id="kit-sheet-desc" className="sr-only">
                Site navigation
              </p>
              <nav className="flex flex-col gap-1">
                {['Home', 'About', 'Gatherings', 'Stories', 'Connect'].map((item) => (
                  <span key={item} className="rounded-xl px-4 py-3 font-display text-lg font-semibold text-[var(--ink)]">
                    {item}
                  </span>
                ))}
              </nav>
              <div className="mt-auto pt-6">
                <Button className="w-full">Join Sunday Sprint</Button>
                <div className="mt-4">
                  <Link href="/contact" variant="mono">
                    Vizag Innovation Hub · Sundays 11:00 AM IST
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </KitRow>
      </KitBlock>
    </>
  );
}

export default FeedbackBlocks;
