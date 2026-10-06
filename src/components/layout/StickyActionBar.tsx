import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'motion/react';
import { Button } from '../ui/Button';
import { EASE_STANDARD } from '../../lib/motion';
import { CTA_JOIN_LABEL } from '../../lib/copy';

/**
 * M3 — Sticky bottom action bar (APPROVED). Slim (≤64px incl. padding),
 * safe-area aware, one thumb-sized primary action (label shared with the
 * header CTA via lib/copy). Appears after the hero leaves the screen with a
 * 48px hysteresis band (no flicker at the edge); hides while the footer or a
 * final CTA band ([data-cta-band]) is in view, on the Connect page, while any
 * dialog/sheet/lightbox is open, and while the keyboard is open.
 * IntersectionObserver + MutationObserver only — no scroll listeners.
 * Enter/exit: 16px fade/slide, 200ms; reduced motion = opacity only.
 * Toasts are lifted above the bar via the sonner offset override in globals.
 */
export interface StickyActionBarProps {
  /** Kit/demo: render regardless of observers. */
  forceVisible?: boolean;
}

export function StickyActionBar({ forceVisible = false }: StickyActionBarProps) {
  const location = useLocation();
  const [heroGone, setHeroGone] = useState(false);
  const [heroBack, setHeroBack] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const eligible = useRef(false);

  const isConnect = location.pathname === '/contact';

  // Hero edge with hysteresis: show only when the hero is ≥48px past the top,
  // hide only once it is visible again — a 48px dead band prevents flicker.
  useEffect(() => {
    if (isConnect) return;
    const hero = document.querySelector('[data-hero]');
    if (!hero) return;
    const goneObs = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting), {
      rootMargin: '48px 0px 0px 0px',
      threshold: 0,
    });
    const backObs = new IntersectionObserver(([e]) => setHeroBack(e.isIntersecting), {
      threshold: 0,
    });
    goneObs.observe(hero);
    backObs.observe(hero);
    return () => {
      goneObs.disconnect();
      backObs.disconnect();
    };
  }, [location.pathname, isConnect]);

  // Footer + final CTA band block the bar
  useEffect(() => {
    if (isConnect) return;
    const targets = [...document.querySelectorAll('footer, [data-cta-band]')];
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) => setBlocked(entries.some((e) => e.isIntersecting)),
      { threshold: 0 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [location.pathname, isConnect]);

  // Any open dialog / sheet / lightbox blocks the bar
  useEffect(() => {
    const check = () => setOverlayOpen(Boolean(document.querySelector('[role="dialog"]')));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // Keyboard open blocks the bar
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setKeyboardOpen(vv.height < window.innerHeight - 150);
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);

  // Hysteresis: inside the dead band, keep the previous state
  if (heroBack) eligible.current = false;
  else if (heroGone) eligible.current = true;

  const visible =
    forceVisible ||
    (!isConnect && eligible.current && !blocked && !overlayOpen && !keyboardOpen);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_STANDARD }}
          className="sticky-action-bar fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--cream)]/95 px-4 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] backdrop-blur-md"
        >
          <div className="mx-auto max-w-md">
            <Button asChild size="md" className="w-full">
              <Link to="/contact">{CTA_JOIN_LABEL}</Link>
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default StickyActionBar;
