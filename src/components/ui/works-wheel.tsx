import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Lightbox } from './Lightbox';

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
  tag?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<'section'>, 'children'> {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
  scrollDriven?: boolean;
  headerBadge?: string;
  headerTitle?: string;
  headerSubtitle?: string;
}

export function WorksWheel({
  items,
  label = "Aegion '26",
  action = 'Explore Gathering',
  headerBadge = 'Visual Archives // 2026 Sprints',
  headerTitle = 'The Journey Through Glass // 2026',
  headerSubtitle = 'Explore pivotal engineering sprints, hardware sessions, and demo days across Vizag.',
  className,
  ...props
}: WorksWheelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = items.map((item) => item.image);

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const next = prev > 0 ? prev - 1 : items.length - 1;
      scrollToItem(next);
      return next;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const next = prev < items.length - 1 ? prev + 1 : 0;
      scrollToItem(next);
      return next;
    });
  };

  const scrollToItem = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const openLightboxAt = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section
      className={cn(
        'py-16 sm:py-20 bg-[var(--surface)] border-y border-[var(--line)] my-12 overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--amber-soft)] border border-[var(--amber-border)] text-[var(--ember-deep)] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              <span>{headerBadge}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] tracking-tight">
              {headerTitle}
            </h2>
            <p className="text-[var(--ink-soft)] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {headerSubtitle}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--ink-soft)] mr-2 hidden sm:inline">
              <span className="font-bold text-[var(--ember)]">{activeIndex + 1}</span> / {items.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous sprint moment"
              className="min-w-[40px] min-h-[40px] p-2 rounded-full border border-[var(--line-strong)] bg-[var(--cream)] hover:bg-[var(--line)] text-[var(--ink)] transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next sprint moment"
              className="min-w-[40px] min-h-[40px] p-2 rounded-full border border-[var(--line-strong)] bg-[var(--cream)] hover:bg-[var(--line)] text-[var(--ink)] transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  'flex-shrink-0 w-[290px] sm:w-[360px] snap-center rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer group bg-[var(--cream-soft)]',
                  isCurrent
                    ? 'border-[var(--ember)] shadow-md ring-1 ring-[var(--ember)]/20'
                    : 'border-[var(--line)] hover:border-[var(--line-strong)] hover:shadow-xs'
                )}
              >
                {/* Photo with Overlay */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Tag Pill */}
                  {item.tag && (
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[var(--ink)]/80 backdrop-blur-md text-white font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                      {item.tag}
                    </span>
                  )}

                  {/* Zoom Lightbox Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightboxAt(idx);
                    }}
                    aria-label={`View enlarged photo of ${item.title}`}
                    className="absolute top-3.5 right-3.5 min-w-[36px] min-h-[36px] p-2 rounded-full bg-black/60 hover:bg-[var(--ember)] text-white transition-colors cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <span className="font-mono text-[10px] text-[var(--amber)] uppercase tracking-widest block mb-0.5">
                      {label} // #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-lg font-bold line-clamp-1 text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-[var(--surface)] border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs text-[var(--ink-soft)] font-mono">
                    Session moment
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightboxAt(idx);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ember)] hover:text-[var(--ember-deep)] transition-colors cursor-pointer"
                  >
                    <span>Enlarge photo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Indicator Track */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                scrollToItem(i);
              }}
              aria-label={`Go to sprint milestone ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                i === activeIndex
                  ? 'w-8 bg-[var(--ember)]'
                  : 'w-2 bg-[var(--line-strong)] hover:bg-[var(--ember)]/40'
              )}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        title={items[lightboxIndex]?.title}
      />
    </section>
  );
}

export default WorksWheel;
