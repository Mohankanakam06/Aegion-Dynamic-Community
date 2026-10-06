import React, { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';
import { isReducedMotion } from '../../lib/motion';

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
  const motionSafe = !isReducedMotion();

  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
              'animate-marquee flex-row': !vertical && motionSafe,
              'animate-marquee-vertical flex-col': vertical && motionSafe,
              'group-hover:[animation-play-state:paused]': pauseOnHover && motionSafe,
              '[animation-direction:reverse]': reverse && motionSafe,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

export default Marquee;
