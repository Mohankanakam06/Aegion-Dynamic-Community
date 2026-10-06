import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import { Button } from '../ui/Button';
import { EASE_STANDARD } from '../../lib/motion';

/**
 * M3 — Sticky bottom action bar (PROPOSAL — rendered in the kit for review).
 * Slim bar with the primary CTA. Appears after the hero leaves the screen;
 * hides when the footer is in view, on the Connect page, and while the
 * keyboard is open. IntersectionObserver only (no scroll listeners).
 * Safe-area aware; the page gets matching bottom padding via
 * `body:has(.sticky-action-bar) main` so it never covers content.
 */
export interface StickyActionBarProps {
  /** Kit/demo: render regardless of observers. */
  forceVisible?: boolean;
}

export function StickyActionBar({ forceVisible = false }: StickyActionBarProps) {
  const location = useLocation();
  const [heroGone, setHeroGone] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const isConnect = location.pathname === '/contact';

  useEffect(() => {
    if (isConnect) return;
    const hero = document.querySelector('main section');
    const footer = document.querySelector('footer');
    if (!hero || !footer) return;

    const heroObserver = new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting), {
      threshold: 0,
    });
    const footerObserver = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0 }
    );
    heroObserver.observe(hero);
    footerObserver.observe(footer);
    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
    };
  }, [location.pathname, isConnect]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setKeyboardOpen(vv.height < window.innerHeight - 150);
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);

  const visible = forceVisible || (!isConnect && heroGone && !footerInView && !keyboardOpen);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.2, ease: EASE_STANDARD }}
          className="sticky-action-bar fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--cream)]/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md"
        >
          <div className="mx-auto max-w-md">
            <Button asChild size="lg" className="w-full">
              <Link to="/contact">Join Sunday Sprint</Link>
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default StickyActionBar;
