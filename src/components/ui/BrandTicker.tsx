import React from 'react';

interface BrandTickerProps {
  items: string[];
  className?: string;
}

export function BrandTicker({ items, className = '' }: BrandTickerProps) {
  // Duplicate array 3 times for a seamless continuous loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden py-3.5 border-y border-[var(--line)] bg-[var(--cream-soft)] ${className}`}>
      <div className="flex animate-ticker whitespace-nowrap" aria-hidden="true">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center mx-6 text-xs sm:text-sm font-mono font-medium tracking-wider text-[var(--ink-soft)] uppercase select-none"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--ember)] mr-3 opacity-90" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
