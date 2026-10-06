import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

const MobileNavSheet = lazy(() => import('./MobileNavSheet'));

/**
 * M2 — MobileNav (FINAL: bottom sheet). 44px menu button; the sheet body is
 * lazy-loaded on first tap (Radix Dialog stays out of the initial bundle) and
 * stays mounted afterwards so exit animations and reopening are smooth.
 * Focus returns to the menu button on close (skipped after navigation).
 */
export interface MobileNavProps {
  /** aria-controls target / sheet id (unique per instance). */
  id?: string;
}

export function MobileNav({ id = 'mobile-nav' }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const navigatedAway = useRef(false);
  const prevPath = useRef(location.pathname);

  // Close on navigation (and mark it so focus is NOT sent back to the button)
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      navigatedAway.current = true;
      setOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (open) setTouched(true);
  }, [open]);

  // Return focus to the menu button after a non-navigation close
  useEffect(() => {
    if (wasOpen.current && !open) {
      if (navigatedAway.current) {
        navigatedAway.current = false;
      } else {
        buttonRef.current?.focus();
      }
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={buttonRef}
        icon={Menu}
        variant="outline"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
        className="md:hidden"
      />
      {touched && (
        <Suspense fallback={null}>
          <MobileNavSheet id={id} open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  );
}

export default MobileNav;
