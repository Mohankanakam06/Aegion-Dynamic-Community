import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
  tag?: string;
  onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta = 'Explore',
  tag,
  onClick,
}) => {
  const isInteractive = Boolean(href || onClick);

  const cardContent = (
    <>
      {/* Background Media / Subtle Ambient Accent */}
      {background && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {background}
        </div>
      )}

      {/* Top Tag & Icon */}
      <div className="z-10 flex items-center justify-between p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--cream)] border border-[var(--line-strong)] text-[var(--ember)] transition-transform duration-300 group-hover:scale-105 shadow-xs">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        {tag && (
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-[var(--cream-soft)] border border-[var(--line)] text-[var(--ink-soft)]">
            {tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col gap-2 p-6 transition-all duration-300">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] leading-snug">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-[var(--ink-soft)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA Footer */}
      {cta && (
        <div className="z-10 flex w-full items-center p-6 pt-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-[var(--ember)] group-hover:text-[var(--ember-deep)] transition-all group-hover:translate-x-0.5">
            <span>{cta}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      )}
    </>
  );

  const baseClasses = cn(
    'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl',
    'bg-[var(--surface)] border border-[var(--line-strong)] shadow-xs transition-all duration-300',
    'hover:shadow-md hover:border-[var(--amber-border)]',
    isInteractive ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2' : '',
    className
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={baseClasses}>
          {cardContent}
        </a>
      );
    }
    return (
      <Link to={href} className={baseClasses}>
        {cardContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={baseClasses}
      >
        {cardContent}
      </div>
    );
  }

  return <div className={baseClasses}>{cardContent}</div>;
};

export default BentoGrid;
