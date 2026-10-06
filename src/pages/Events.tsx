import { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Lightbox } from '../components/ui/Lightbox';
import { events, EventItem } from '../data/events';

export function Events() {
  const [filter, setFilter] = useState<'all' | 'build' | 'showcase' | 'meetup'>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredEvents =
    filter === 'all' ? events : events.filter((e) => e.category === filter);

  const openEventModal = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const openLightbox = (images: string[], index: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 overflow-hidden">
      {/* HERO / HEADER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--amber-soft)] border border-[var(--amber-border)] shadow-xs mb-6">
          <Calendar className="w-3.5 h-3.5 text-[var(--ember)]" aria-hidden="true" />
          <span className="font-mono text-[11px] font-bold tracking-widest text-[var(--ember-deep)] uppercase">
            Calendar // Sprints & Demo Days
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Gatherings & <span className="text-[var(--ember)]">Sprints</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
          Weekly terminal sessions, prototype sprints, and demo days across Visakhapatnam. Open to all students, makers, and mentors.
        </p>

        {/* ACCESSIBLE FILTER BUTTONS */}
        <div
          role="tablist"
          aria-label="Event Categories"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8"
        >
          {[
            { label: 'All Gatherings', value: 'all' },
            { label: 'Build Sprints', value: 'build' },
            { label: 'Showcases & Hackathons', value: 'showcase' },
            { label: 'Meetups & Systems', value: 'meetup' },
          ].map((tab) => {
            const isSelected = filter === tab.value;
            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setFilter(tab.value as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-[var(--ember)] text-white shadow-sm'
                    : 'bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--cream-soft)] border border-[var(--line-strong)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* EVENT CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--line-strong)] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full group"
            >
              <div>
                {/* Event Cover Image with Lightbox Trigger */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo gallery for ${event.title}`}
                  className="w-full relative h-56 lg:h-60 overflow-hidden cursor-pointer group/img focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ember)]"
                  onClick={() => openLightbox(event.images, 0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(event.images, 0);
                    }
                  }}
                >
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-white text-xs font-mono flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[var(--amber)]" aria-hidden="true" />
                      <span>View Gallery ({event.images.length} photos)</span>
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-[var(--ink)]/85 backdrop-blur-md text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">
                      {event.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[var(--ink-soft)] mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--ember)] shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-[var(--ink)]">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--ember)] shrink-0" aria-hidden="true" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--ink)] mb-3 leading-snug">
                    {event.title}
                  </h2>

                  <p className="text-[var(--ink-soft)] text-sm leading-relaxed mb-6 line-clamp-3 prose-measure">
                    {event.summary}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    {event.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--ink-soft)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--ember)] shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--ink-soft)] font-medium">
                    <Users className="w-3.5 h-3.5 text-[var(--ink-faint)]" aria-hidden="true" />
                    <span>{event.attendees}</span>
                  </div>

                  <button
                    onClick={() => openEventModal(event)}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--cream-soft)] border border-[var(--line-strong)] hover:border-[var(--ember)] hover:bg-[var(--ember-soft)] text-[var(--ink)] hover:text-[var(--ember-deep)] font-semibold text-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
                  >
                    <span>Full Dossier & Photos</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPTY STATE */}
      {filteredEvents.length === 0 && (
        <div className="max-w-2xl mx-auto mt-12 p-12 text-center bg-[var(--cream-soft)] border border-[var(--line-strong)] rounded-3xl">
          <Calendar className="w-12 h-12 text-[var(--ember)] mx-auto mb-4 opacity-50" aria-hidden="true" />
          <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2">No gatherings found</h3>
          <p className="text-[var(--ink-soft)] text-sm">
            We couldn't find any gatherings matching this category right now. Check back soon or view all gatherings.
          </p>
          <button
            onClick={() => setFilter('all')}
            className="mt-6 inline-flex items-center px-6 py-2.5 rounded-full bg-[var(--ember)] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
          >
            View All Gatherings
          </button>
        </div>
      )}

      {/* EVENT MODAL */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          tag={selectedEvent.tag}
          title={selectedEvent.title}
          description={selectedEvent.description}
          images={selectedEvent.images}
          date={selectedEvent.date}
          location={selectedEvent.location}
          onImageClick={(idx) => openLightbox(selectedEvent.images, idx)}
        />
      )}

      {/* FULLSCREEN LIGHTBOX */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}

export default Events;
