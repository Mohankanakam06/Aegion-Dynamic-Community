import React from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = '',
  onClick
}: TiltCardProps) {
  return (
    <div className={`tilt-card-container ${className}`} onClick={onClick}>
      <div className="tilt-card h-full w-full rounded-2xl">
        {children}
      </div>
    </div>
  );
}
