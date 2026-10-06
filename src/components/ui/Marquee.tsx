import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { isReducedMotion } from '../../lib/motion';

/**
 * C3/M5 — Marquee. Pure-CSS translateX loop (~40s desktop, ~60s under 640px),
 * will-change only while running. Edge fades via mask-image. Pauses when
 * off-screen (IntersectionObserver), when the tab is hidden (visibilitychange),
 * on hover (hover-capable pointers only) and on focus-within. Duplicated
 * tracks are aria-hidden. Reduced motion = static wrapped row, no animation.
 */
export interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const motionSafe = !isReducedMotion();
  const animated = motionSafe && onScreen && tabVisible;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      {...props}
      ref={rootRef}
      className={cn(
        'marquee-fade group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
          'flex-wrap': !motionSafe,
        },
        className
      )}
    >
      {Array(motionSafe ? repeat : 1)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0 ? true : undefined}
            className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
              'animate-marquee flex-row': !vertical && motionSafe,
              'animate-marquee-vertical flex-col': vertical && motionSafe,
              'marquee-paused': !animated,
              'group-hover:[animation-play-state:paused]': pauseOnHover && motionSafe,
              'group-focus-within:[animation-play-state:paused]': pauseOnHover && motionSafe,
              '[animation-direction:reverse]': reverse && motionSafe,
              'flex-wrap': !motionSafe,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

export default Marquee;
