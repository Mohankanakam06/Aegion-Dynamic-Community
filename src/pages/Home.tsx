import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Terminal,
  Users,
  Cpu,
  Rocket,
  Calendar,
  MapPin,
  ArrowUpRight,
  Code2,
  Flame,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Modal } from '../components/ui/Modal';
import { Lightbox } from '../components/ui/Lightbox';
import { AuroraBackground } from '../components/ui/AuroraBackground';
import { BlurText } from '../components/ui/BlurText';
import { MagneticButton } from '../components/ui/MagneticButton';
import { NumberTicker } from '../components/ui/NumberTicker';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { Marquee } from '../components/ui/Marquee';
import { events, EventItem } from '../data/events';
import { testimonials, communityMetrics } from '../data/testimonials';
import buildHeroPhoto from '../assets/images/build-hours/1.jpg';
import proximaHeroPhoto from '../assets/images/proxima/1.jpg';
import communityFeature from '../assets/images/community-feature.jpg';

const universityPartners = [
  'GITAM Deemed University',
  'Andhra University College of Engineering',
  'Gayatri Vidya Parishad (GVPCOE)',
  'Vignan Institute of Information Technology',
  'ANITS Visakhapatnam',
  'Raghu Engineering College',
];

export function Home() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openEventModal = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const openLightbox = (images: string[], index: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 overflow-hidden">
      {/* EDITORIAL HERO */}
      <AuroraBackground className="pt-8 sm:pt-14 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Mission & Core Actions (Span 7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Location & Status Kicker */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--amber-soft)] border border-[var(--amber-border)] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[var(--ember)] animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold tracking-widest text-[var(--ember-deep)] uppercase">
                    Visakhapatnam, AP // Weekly Build Circle
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.05]">
                  Connect. <span className="text-[var(--ember)]">Build.</span> Grow.
                </h1>
                <BlurText
                  text="Open ecosystem for curious minds, student builders, creators, and technologists in Vizag."
                  className="text-base sm:text-xl text-[var(--ink-soft)] font-normal leading-relaxed max-w-2xl"
                  delay={25}
                />
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <MagneticButton strength={0.15}>
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2"
                  >
                    <span>Join Saturday Sprint</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </MagneticButton>
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--surface)] hover:bg-[var(--cream-soft)] border border-[var(--line-strong)] text-[var(--ink)] font-semibold text-sm shadow-xs hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2"
                >
                  <span>Explore Gatherings</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--ink-faint)]" aria-hidden="true" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-mono font-semibold text-[var(--ink-soft)] hover:text-[var(--ember)] transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <span>Origin Story & Manifesto →</span>
                </Link>
              </div>

              {/* Live Session Metadata Bar */}
              <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[var(--ink-soft)] font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--ember)] shrink-0" aria-hidden="true" />
                  <span>Saturdays 4:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--ember)] shrink-0" aria-hidden="true" />
                  <span>Vizag Innovation Hub & Discord</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-[var(--ember)] shrink-0" aria-hidden="true" />
                  <span>100% Free & Open Source</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Photography Spotlight (Span 5) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-3 bg-[var(--surface)] border border-[var(--line-strong)] shadow-lg transition-transform hover:-translate-y-0.5">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="View Aegion Saturday Build Session photo gallery"
                  className="w-full rounded-2xl overflow-hidden relative cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ember)]"
                  onClick={() => openLightbox([buildHeroPhoto, proximaHeroPhoto, communityFeature], 0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox([buildHeroPhoto, proximaHeroPhoto, communityFeature], 0);
                    }
                  }}
                >
                  <img
                    src={buildHeroPhoto}
                    alt="Aegion Saturday Build Session in Vizag"
                    className="w-full h-72 sm:h-84 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/25 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--amber)] font-semibold mb-1">
                      Saturday Build Session // 04:00 PM
                    </span>
                    <h3 className="font-display text-lg font-bold leading-snug">
                      Distraction-Free Collaborative Flow
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">
                      Students & engineers pairing across campus lines.
                    </p>
                  </div>
                </div>

                {/* Floating Proof-of-Work Badge */}
                <div className="absolute -bottom-4 -left-4 bg-[var(--surface)] p-3.5 rounded-2xl border border-[var(--line-strong)] shadow-xl max-w-[210px] hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--ember-soft)] text-[var(--ember)] flex items-center justify-center shrink-0">
                    <Code2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--ink)] block">Proof of Work</span>
                    <span className="text-[11px] text-[var(--ink-soft)] font-mono">35+ Live Repos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* INFINITE ENERGY TICKER */}
      <div className="bg-[var(--surface)] border-b border-[var(--line)] py-3 overflow-hidden">
        <Marquee repeat={5} className="[--duration:32s]">
          {[
            'WEEKEND BUILD SPRINT',
            'OPEN SOURCE ECOSYSTEM',
            'DISTRIBUTED SYSTEMS & AI',
            'HARDWARE & IOT LABS',
            'LIGHTNING DEMO CIRCLES',
            'PEER CODE REVIEWS',
            'VIZAG TECH HORIZON',
          ].map((text, idx) => (
            <div key={idx} className="flex items-center gap-4 mx-3">
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--ink)] uppercase">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ember)]" aria-hidden="true" />
            </div>
          ))}
        </Marquee>
      </div>

      {/* METRICS STRIP: CONCRETE REGIONAL PROOF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {communityMetrics.map((metric, i) => {
            const numericValue = parseInt(metric.value.replace(/[^0-9]/g, '')) || 0;
            const suffix = metric.value.includes('+') ? '+' : '';

            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-[var(--surface)] p-5 sm:p-6 rounded-2xl border border-[var(--line-strong)] shadow-xs hover:border-[var(--ember)]/30 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] mb-1">
                      <NumberTicker value={numericValue} />
                      <span className="font-black text-[var(--ember)]">{suffix}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[var(--ember-deep)] uppercase tracking-wider block mb-1.5">
                      {metric.label}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">{metric.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* BENTO GRID: OPERATING PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mb-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ember-deep)] font-semibold mb-2">
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>How We Build // Operating Principles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--ink)] leading-tight">
              Built on <span className="text-[var(--ember)]">Proof of Work</span>
            </h2>
            <p className="text-[var(--ink-soft)] text-sm sm:text-base mt-3 leading-relaxed">
              Zero slide decks. Real git commits. Live deployments in Visakhapatnam.
            </p>
          </Reveal>
        </div>

        <BentoGrid>
          <BentoCard
            name="Shipping Over Speaking"
            className="md:col-span-2"
            Icon={Terminal}
            tag="01 // CODE FIRST"
            description="We replace speculative presentations with active terminal sessions and live deployments. Real code running in production is the only true currency of a craftsperson."
            cta="Explore Saturday Build Hours"
            href="/events"
          />
          <BentoCard
            name="Radical Peer Access"
            className="md:col-span-1"
            Icon={Users}
            tag="02 // NO GATEKEEPING"
            description="Break down institutional walls. First-year novices pair directly with senior engineers in an ego-free circle."
            cta="Meet Our Mentors"
            href="/about"
          />
          <BentoCard
            name="Cross-Stack Curiosity"
            className="md:col-span-1"
            Icon={Cpu}
            tag="03 // FULL SPECTRUM"
            description="Microcontrollers, sensor meshes, distributed web architectures, AI agents, and custom compilers."
            cta="View Tech Labs"
            href="/events"
          />
          <BentoCard
            name="High-Intensity Hackathons & Proxima"
            className="md:col-span-2"
            Icon={Flame}
            tag="04 // ACCELERATION"
            description="36-hour sprints with hardware labs, cloud compute grants, and venture prototyping right on the Vizag coast."
            cta="Discover Hackathon Proxima"
            href="/events"
          />
        </BentoGrid>
      </section>

      {/* FEATURED GATHERINGS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[var(--cream-soft)] rounded-3xl border border-[var(--line-strong)] my-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ember-deep)] font-semibold block mb-2">
                Flagships & Gatherings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
                Where Vizag <span className="text-[var(--ember)]">Ships</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--ember)] hover:text-[var(--ember-deep)] transition-colors focus-visible:underline"
            >
              <span>View All Events & Sprints</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.08}>
              <div className="bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--line-strong)] shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full group">
                <div>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo gallery for ${event.title}`}
                    className="relative h-48 overflow-hidden cursor-pointer group/img focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ember)]"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-mono">
                        View Photo Gallery ({event.images.length})
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--ink)]/85 backdrop-blur-md text-white font-mono text-[11px] rounded-full uppercase font-medium">
                      {event.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ink-faint)] mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[var(--ember)] shrink-0" aria-hidden="true" />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2 leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-[var(--ink-soft)] text-sm line-clamp-2 leading-relaxed">
                      {event.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--ink-soft)]">{event.attendees}</span>
                    <button
                      onClick={() => openEventModal(event)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ember)] hover:text-[var(--ember-deep)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                    >
                      <span>Full Dossier & Photos</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BUILDER VOICES & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ember-deep)] font-semibold block mb-2">
              Community Voices
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
              Direct from <span className="text-[var(--ember)]">the Builders</span>
            </h2>
          </Reveal>
        </div>

        {/* Builder Voices Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.id}
              className="bg-[var(--surface)] p-6 sm:p-7 rounded-3xl border border-[var(--line-strong)] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <p className="font-sans text-sm text-[var(--ink)] leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3.5 pt-4 border-t border-[var(--line)]">
                <img
                  src={t.avatar}
                  alt={t.author}
                  loading="lazy"
                  decoding="async"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[var(--ember)] shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-xs text-[var(--ink)] truncate">{t.author}</h3>
                  <p className="text-[11px] text-[var(--ember-deep)] font-mono truncate">{t.role}</p>
                  <p className="text-[11px] text-[var(--ink-soft)] truncate">{t.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* University Partners Strip */}
        <div className="mt-12 pt-8 border-t border-[var(--line)]">
          <div className="text-center mb-5">
            <span className="font-mono text-[11px] font-semibold text-[var(--ink-faint)] uppercase tracking-widest">
              Builders Across Regional Campuses
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {universityPartners.map((uni, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--cream-soft)] border border-[var(--line)] text-[var(--ink)]"
              >
                <Award className="w-3.5 h-3.5 text-[var(--ember)] shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold">{uni}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL INVITATION CTA STRIP */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Reveal>
          <div className="bg-[var(--ink)] text-white p-8 sm:p-14 rounded-3xl relative overflow-hidden shadow-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display mb-4 leading-tight text-white">
              Ready to build something <span className="text-[var(--ember-light)]">remarkable?</span>
            </h2>
            <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base mb-8 leading-relaxed">
              Join 350+ student engineers, designers, and innovators in Vizag. No prerequisites, no gatekeeping — just curiosity and drive.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Join Next Saturday Sprint</span>
                <Rocket className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>View Event Calendar</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* MODAL DIALOG */}
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

      {/* FULLSCREEN LIGHTBOX VIEWER */}
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

export default Home;
