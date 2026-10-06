import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center bg-[var(--cream)] overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Subtle, refined paper grid & warm ember ambient wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft atmospheric radial glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(232,93,26,0.08)_0%,rgba(242,201,165,0.04)_45%,transparent_70%)] blur-2xl" />

        {/* Delicate structural hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(24, 20, 17, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(24, 20, 17, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default AuroraBackground;
