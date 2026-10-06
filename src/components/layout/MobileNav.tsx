import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from '../ui/Sheet';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import { Eyebrow } from '../brand/Eyebrow';
import logoNav from '../../assets/images/logo.svg';

/**
 * M2 — MobileNav. Menu button (44px) opens a full-height Sheet: large
 * display-type links (44px+ rows, ember marker on the active route, 40ms
 * stagger), "Join Sunday Sprint" CTA pinned in the thumb zone, the Vizag
 * Innovation Hub line under it. Focus trap, Esc, scroll lock without layout
 * shift, closes on navigation, inert background, swipe-to-close.
 * variant: bottom sheet vs right drawer — user picks from the kit render.
 */
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Gatherings', path: '/events' },
  { name: 'Stories', path: '/stories' },
  { name: 'Connect', path: '/contact' },
];

export interface MobileNavProps {
  variant?: 'bottom' | 'right';
  /** aria-controls target / sheet id (unique per instance). */
  id?: string;
}

export function MobileNav({ variant = 'bottom', id = 'mobile-nav' }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton
          icon={Menu}
          variant="outline"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls={id}
          className="md:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side={variant}
        id={id}
        onSwipeClose={() => setOpen(false)}
        aria-describedby={`${id}-desc`}
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription id={`${id}-desc`} className="sr-only">
          Site navigation
        </SheetDescription>

        <div className="flex items-center border-b border-[var(--line)] pb-4">
          <img src={logoNav} alt="Aegion Dynamic Community" className="h-8 w-auto object-contain" width="130" height="32" />
        </div>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 pt-4">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                style={{ '--i': i } as React.CSSProperties}
                className={cn(
                  'nav-link-in flex min-h-12 items-center rounded-xl px-4 font-display text-xl font-semibold transition-colors duration-150 focus-visible:focus-ring',
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

        <div className="mt-auto pt-6">
          <Button asChild size="lg" className="w-full">
            <Link to="/contact">Join Sunday Sprint</Link>
          </Button>
          <div className="mt-4 flex justify-center pb-1">
            <Eyebrow lead="Vizag Innovation Hub" tail="Sundays 11:00 AM IST" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
