import React from 'react';
import { cn } from '../../lib/utils';

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill = 'var(--ember)' }: SpotlightProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -z-10 h-72 w-72 rounded-full opacity-20 blur-3xl transition-opacity',
        className
      )}
      style={{
        background: `radial-gradient(circle, ${fill} 0%, transparent 70%)`,
      }}
    />
  );
};

export default Spotlight;
