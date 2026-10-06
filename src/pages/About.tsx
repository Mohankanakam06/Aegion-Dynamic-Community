import { Link } from 'react-router-dom';
import {
  Terminal,
  Flame,
  Compass,
  Heart,
  ArrowRight,
  Quote,
  Clock,
  CheckCircle2,
  Users2,
  Calendar,
} from 'lucide-react';
import { Timeline } from '../components/ui/Timeline';
import communityFeature from '../assets/images/community-feature.jpg';
import buildPhoto1 from '../assets/images/build-hours/1.jpg';
import buildPhoto3 from '../assets/images/build-hours/3.jpg';
import proximaPhoto1 from '../assets/images/proxima/1.jpg';
import proximaPhoto2 from '../assets/images/proxima/2.jpg';

export function About() {
  const values = [
    {
      num: '01',
      icon: Terminal,
      title: 'Code is the Universal Language',
      desc: 'We judge engineering by working software deployed, not credentials or resumes. Real git commits, running services, and live user feedback form our true foundation.',
    },
    {
      num: '02',
      icon: Flame,
      title: 'Relentless Curiosity',
      desc: 'Whether tinkering with low-level microcontrollers, training transformer models, or designing bespoke interaction design, curiosity is our primary fuel.',
    },
    {
      num: '03',
      icon: Compass,
      title: 'Decentralized Community',
      desc: 'No corporate hierarchies. Aegion belongs to every student builder and mentor who shows up to write code, review PRs, and host open workshops across Vizag.',
    },
    {
      num: '04',
      icon: Heart,
      title: 'Radical Empathy & Mentorship',
      desc: 'Senior peers actively lift junior builders. We believe that explaining a complex concept to a first-year peer is the ultimate test of true craft mastery.',
    },
  ];

  const buildCycle = [
    {
      step: '01',
      time: '4:00 PM',
      title: 'Prompt & Match',
      desc: 'Builders arrive on Sunday at 4 PM IST, share what they are working on, and pair up across college and skill boundaries.',
    },
    {
      step: '02',
      time: '4:30 PM',
      title: 'Deep Focus Sprint',
      desc: 'Three uninterrupted hours of deep-work coding, architecture design, debugging sessions, and hardware prototyping.',
    },
    {
      step: '03',
      time: '7:30 PM',
      title: 'Ship & Commit',
      desc: 'Every session targets pushing a commit, opening a pull request, or spinning up a live URL. No theoretical presentations.',
    },
    {
      step: '04',
      time: '7:45 PM',
      title: 'Lightning Demos',
      desc: '3-minute unfiltered demos with peer code review, constructive critique, and collaborative troubleshooting.',
    },
  ];

  const timelineData = [
    {
      title: 'Jan 2026',
      content: (
        <div>
          <p className="text-[var(--ink)] text-sm md:text-base font-normal mb-4 leading-relaxed">
            <strong className="font-semibold text-[var(--ember-deep)]">The Genesis Sprint:</strong> Eight student builders from GITAM and Andhra University met in a quiet cafe in MVP Colony, frustrated by theory-heavy lectures. They brought laptops, ordered chai, and shipped three open-source CLI utilities before sunset.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={buildPhoto1}
              alt="First Aegion Build Session in MVP Colony"
              loading="lazy"
              decoding="async"
              className="rounded-xl object-cover h-32 md:h-44 lg:h-52 w-full shadow-xs border border-[var(--line)]"
            />
            <img
              src={buildPhoto3}
              alt="Pair Programming in Vizag"
              loading="lazy"
              decoding="async"
              className="rounded-xl object-cover h-32 md:h-44 lg:h-52 w-full shadow-xs border border-[var(--line)]"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Apr 2026',
      content: (
        <div>
          <p className="text-[var(--ink)] text-sm md:text-base font-normal mb-4 leading-relaxed">
            <strong className="font-semibold text-[var(--ember-deep)]">Weekly Sunday Build Cadence:</strong> Transitioned from informal meetups to structured, open-door Sunday build circles at the Vizag Innovation Hub. Weekly attendance surpassed 40 active builders pushing real production repositories.
          </p>
          <div className="p-4 rounded-xl bg-[var(--cream-soft)] border border-[var(--line-strong)] mb-4">
            <span className="font-mono text-xs text-[var(--ink-soft)] block font-semibold">
              MILESTONE ACHIEVED // 500+ Git Commits across 35 student repos
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Jul 2026',
      content: (
        <div>
          <p className="text-[var(--ink)] text-sm md:text-base font-normal mb-4 leading-relaxed">
            <strong className="font-semibold text-[var(--ember-deep)]">Hackathon Proxima 1.0:</strong> Aegion's first multi-college 36-hour sprint. 120 developers, designers, and hardware makers converged on the Vizag coast, building IoT emergency networks, local AI agents, and accessible ed-tech tools.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={proximaPhoto1}
              alt="Hackathon Proxima Sprints"
              loading="lazy"
              decoding="async"
              className="rounded-xl object-cover h-32 md:h-44 lg:h-52 w-full shadow-xs border border-[var(--line)]"
            />
            <img
              src={proximaPhoto2}
              alt="Hackathon Proxima Demos"
              loading="lazy"
              decoding="async"
              className="rounded-xl object-cover h-32 md:h-44 lg:h-52 w-full shadow-xs border border-[var(--line)]"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Oct 2026',
      content: (
        <div>
          <p className="text-[var(--ink)] text-sm md:text-base font-normal mb-4 leading-relaxed">
            <strong className="font-semibold text-[var(--ember-deep)]">The 350+ Builder Collective:</strong> Now active across 6 engineering colleges in the Vizag region (AU, GITAM, GVP, Vignan, ANITS, Raghu). Fostering peer code reviews, open-source grants, and direct industry mentorship.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-[var(--ember-soft)] text-[var(--ember-deep)] font-mono text-xs font-semibold">
              350+ Active Builders
            </span>
            <span className="px-3 py-1 rounded-full bg-[var(--amber-soft)] text-[var(--ember-dark)] font-mono text-xs font-semibold">
              24 Sprints
            </span>
            <span className="px-3 py-1 rounded-full bg-[var(--cream-soft)] text-[var(--ink)] border border-[var(--line-strong)] font-mono text-xs font-semibold">
              100% Free & Open Source
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 overflow-hidden">
      {/* MANIFESTO HERO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--amber-soft)] border border-[var(--amber-border)] shadow-xs mb-6">
          <Compass className="w-3.5 h-3.5 text-[var(--ember)]" aria-hidden="true" />
          <span className="font-mono text-[11px] font-bold tracking-widest text-[var(--ember-deep)] uppercase">
            The Origin // Why We Gather
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink)] mb-6 sm:mb-8 leading-tight">
          Why Aegion <span className="text-[var(--ember)]">Exists</span>
        </h1>

        <p className="font-display text-xl sm:text-2xl lg:text-3xl text-[var(--ink-soft)] leading-relaxed max-w-3xl mx-auto">
          "Building an un-gatekept software culture in Vizag — where curious minds meet to write code, review PRs, and ship together."
        </p>
      </section>

      {/* STORY ESSAY SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24">
        <div className="bg-[var(--surface)] p-8 sm:p-14 rounded-3xl border border-[var(--line-strong)] shadow-sm space-y-6 text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
          <div className="inline-block font-mono text-xs uppercase tracking-widest text-[var(--ember-deep)] font-bold mb-1">
            Origins & Vision
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] leading-snug">
            Bridging Raw Ambition and Production Realities
          </h2>
          <p>
            Across colleges and universities in Visakhapatnam—from GITAM and Andhra University College of Engineering to Gayatri Vidya Parishad (GVP) and Vignan—thousands of brilliant engineering and design minds study every day. Yet traditional academic curricula rarely give students the exhilarating reality of shipping production software alongside peers.
          </p>
          <p>
            Aegion Dynamic Community was created to change that equation. We gather developers, hardware tinkerers, UI designers, and open-source contributors into collaborative build sprints where theoretical knowledge transforms immediately into deployed code.
          </p>

          <div className="p-8 rounded-2xl bg-[var(--cream-soft)] border border-[var(--line-strong)] my-8 relative">
            <Quote className="w-8 h-8 text-[var(--ember)]/30 mb-3" aria-hidden="true" />
            <p className="font-sans text-[var(--ink)] text-lg sm:text-xl leading-relaxed">
              "Our metric of success is simple: how many students ship their first open-source PR, deploy their first web application, and feel the thrill of building things people use."
            </p>
          </div>

          <p>
            Every weekend, we organize focused build hours, code teardowns, and architecture discussions in Vizag. No gatekeeping, no pedigree requirements—just genuine curiosity and the drive to craft extraordinary things.
          </p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="mb-24">
        <Timeline data={timelineData} />
      </section>

      {/* THE HOW IT WORKS: CADENCE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ember-deep)] font-semibold block mb-2">
            The Architecture of a Build
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
            How the <span className="text-[var(--ember)]">Cadence</span> Works
          </h2>
          <p className="text-[var(--ink-soft)] text-sm sm:text-base mt-2">
            Every Sunday from 4:00 PM to 8:15 PM IST.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {buildCycle.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--line-strong)] shadow-xs flex flex-col justify-between h-full hover:shadow-sm transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[var(--ember)]">
                    PHASE // {item.step}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--ink-faint)] bg-[var(--cream-soft)] px-2 py-0.5 rounded-md">
                    {item.time}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO ESSAY STRIP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--line-strong)] shadow-lg group">
          <img
            src={communityFeature}
            alt="Aegion Community Members in Vizag"
            loading="lazy"
            decoding="async"
            className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent flex items-end p-8 sm:p-12 text-white">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--amber)] block mb-2 font-semibold">
                COMMUNITY GATHERING // VIZAG
              </span>
              <p className="font-display text-xl sm:text-3xl font-extrabold max-w-2xl leading-snug">
                Building together across institutions, disciplines, and backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR CORE VALUES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ember-deep)] font-semibold block mb-2">
            Our Bedrock
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
            Guiding <span className="text-[var(--ember)]">Principles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--line-strong)] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--ember-soft)] text-[var(--ember)] flex items-center justify-center">
                    <v.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-[var(--ink-faint)] font-bold tracking-widest">
                    {v.num}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[var(--ink)] text-white p-10 sm:p-14 rounded-3xl shadow-xl">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight text-white">
            Want to get involved in <span className="text-[var(--ember-light)]">Vizag?</span>
          </h2>
          <p className="text-white/80 max-w-lg mx-auto text-sm sm:text-base mb-8 leading-relaxed prose-measure">
            We welcome student builders, mentors, and local tech partners who want to contribute their craft and support the next generation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white font-semibold transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/events"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Browse Gatherings</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
