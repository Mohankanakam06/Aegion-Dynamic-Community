import { MessageSquare, Quote, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/brand/Eyebrow';
import { NumberTicker } from '../components/ui/NumberTicker';
import { Marquee } from '../components/ui/Marquee';
import { testimonials, communityMetrics } from '../data/testimonials';
import communityFeature from '../assets/images/community-feature.jpg';

export function Stories() {
  return (
    <div className="pt-24 sm:pt-28 pb-20 overflow-hidden">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Eyebrow variant="pill" icon={MessageSquare} lead="Dispatches" tail="Notes from the Floor" className="mb-6" />

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Voices of the <span className="text-[var(--ember)]">Movement</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
          What happens when student engineers and mentors start shipping real software together in Vizag.
        </p>
      </section>

      {/* METRICS ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-18">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {communityMetrics.map((metric, i) => {
            const numericValue = parseInt(metric.value.replace(/[^0-9]/g, '')) || 0;
            const suffix = metric.value.includes('+') ? '+' : '';

            return (
              <div
                key={i}
                className="bg-[var(--surface)] p-5 sm:p-6 rounded-2xl border border-[var(--line-strong)] shadow-xs hover:shadow-sm transition-shadow"
              >
                <div className="flex items-baseline font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] mb-1">
                  <NumberTicker value={numericValue} />
                  <span className="text-[var(--ember)] font-black">{suffix}</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[var(--ember-deep)] uppercase tracking-wider block mb-1">
                  {metric.label}
                </span>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">{metric.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* BUILDER TESTIMONIAL CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-18">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[var(--surface)] p-8 sm:p-10 rounded-3xl border border-[var(--line-strong)] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full group"
            >
              <div className="mb-8">
                <Quote className="w-9 h-9 text-[var(--amber)] mb-4 opacity-80 group-hover:text-[var(--ember)] transition-colors" aria-hidden="true" />
                <p className="font-display text-lg sm:text-xl text-[var(--ink)] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-[var(--line)]">
                <img
                  src={t.avatar}
                  alt={t.author}
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--ember)] shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-[var(--ink)] truncate">{t.author}</h3>
                  <p className="text-xs text-[var(--ember-deep)] font-mono font-semibold truncate">{t.role}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)] mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[var(--ink-faint)] shrink-0" aria-hidden="true" />
                    <span className="truncate">{t.organization}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE HIGHLIGHTS */}
      <div className="my-14 bg-[var(--surface)] border-y border-[var(--line)] py-3 overflow-hidden">
        <Marquee repeat={5} className="[--duration:28s]">
          {[
            '35+ PRODUCTION REPOS',
            '350+ STUDENT BUILDERS',
            'VIZAG INNOVATION ECOSYSTEM',
            'CROSS-CAMPUS COLLABORATION',
            'HARDWARE & IOT SESSIONS',
            'ZERO GATEKEEPING',
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

      {/* PHOTO ESSAY ESSENTIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--line-strong)] shadow-xl group">
          <img
            src={communityFeature}
            alt="Community Gatherings in Vizag"
            loading="lazy"
            decoding="async"
            className="w-full h-96 sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/50 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
            <Eyebrow tone="dark" lead="Collective Spirit" tail="Vizag Chapters" className="mb-2" />
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold max-w-2xl mb-4 leading-snug">
              "Here, the distance between having an idea and shipping it is measured in hours, not semesters."
            </h2>
            <p className="text-white/85 text-sm max-w-xl leading-relaxed">
              A community where first-year undergraduates and seasoned engineers write code, design schemas, and build systems side-by-side.
            </p>
          </div>
        </div>
      </section>

      {/* SHARE YOUR STORY CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[var(--surface)] p-10 sm:p-14 rounded-3xl border border-[var(--line-strong)] shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[var(--ember-soft)] text-[var(--ember)] flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-3">
            Have a project story from Aegion?
          </h2>
          <p className="text-[var(--ink-soft)] max-w-md mx-auto text-sm sm:text-base mb-8 leading-relaxed">
            Whether you launched an open-source tool, won a coastal hackathon, or found your co-founder at our sprint in Vizag, we want to celebrate your journey.
          </p>
          <Link
            to="/contact"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2"
          >
            <span>Share Your Story</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Stories;
