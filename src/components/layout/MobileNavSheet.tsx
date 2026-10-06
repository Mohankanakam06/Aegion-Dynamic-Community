import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../ui/Sheet';
import { Button } from '../ui/Button';
import { Eyebrow } from '../brand/Eyebrow';
import { CTA_JOIN_LABEL } from '../../lib/copy';
import logoNav from '../../assets/images/logo.svg';

/**
 * M2 — MobileNav sheet body (LAZY-LOADED — Radix Dialog lives in its own
 * chunk so the initial bundle stays lean; loaded on first menu tap).
 */
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Gatherings', path: '/events' },
  { name: 'Stories', path: '/stories' },
  { name: 'Connect', path: '/contact' },
];

export default function MobileNavSheet({
  id,
  open,
  onOpenChange,
}: {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const location = useLocation();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent id={id} onSwipeClose={() => onOpenChange(false)} aria-describedby={`${id}-desc`}>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription id={`${id}-desc`} className="sr-only">
          Site navigation
        </SheetDescription>

        <div className="flex shrink-0 items-center border-b border-[var(--line)] pb-4">
          <img src={logoNav} alt="Aegion Dynamic Community" className="h-8 w-auto object-contain" width="130" height="32" />
        </div>

        {/* Scrollable region: swipes here scroll the list; sheet-close starts at
            the handle/header or when this region is scrolled to the very top. */}
        <nav aria-label="Mobile navigation" data-sheet-scroll className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pt-4">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                style={{ '--i': i } as React.CSSProperties}
                className={cn(
                  'nav-link-in flex min-h-12 shrink-0 items-center rounded-xl px-4 font-display text-xl font-semibold transition-colors duration-150 focus-visible:focus-ring',
                  isActive ? 'text-[var(--ember-deep)]' : 'text-[var(--ink)] hover:bg-[var(--cream-soft)]'
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'mr-3 h-5 w-1 shrink-0 rounded-full',
                    isActive ? 'bg-[var(--ember)]' : 'bg-transparent'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto shrink-0 pt-6">
          <Button asChild size="lg" className="w-full">
            <Link to="/contact">{CTA_JOIN_LABEL}</Link>
          </Button>
          <div className="mt-4 flex justify-center pb-1">
            <Eyebrow lead="Vizag Innovation Hub" tail="Sundays 11:00 AM IST" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
