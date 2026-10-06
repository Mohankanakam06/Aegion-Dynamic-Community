import { Link } from 'react-router-dom';
import { ArrowUp, Heart, Github, Instagram, Linkedin, MessageSquare, Mail } from 'lucide-react';
import logoNav from '../../assets/images/logo.svg';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--ink)] text-white relative flex-shrink-0 border-t border-[var(--ink-card-subtle)] overflow-hidden">
      {/* Subtle Warm Highlight Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--ember)] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Description (Span 5) */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="inline-block py-0.5 group focus:outline-none" aria-label="Aegion Dynamic Community Home">
              <img
                src={logoNav}
                alt="Aegion Dynamic Community"
                className="h-9 w-auto brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
              Open ecosystem for curious minds, student builders, creators, and technologists in Vizag and Andhra Pradesh. Connecting ambition with real-world shipping.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://discord.gg/aegion"
                target="_blank"
                rel="noreferrer"
                aria-label="Join Discord"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-[var(--ember)] hover:text-white text-white/70 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/aegion.community"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-[var(--ember)] hover:text-white text-white/70 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/aegion-community"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Organization"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-[var(--ember)] hover:text-white text-white/70 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/aegion-dynamic-community"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Page"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-[var(--ember)] hover:text-white text-white/70 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@aegion.dev"
                aria-label="Email Us"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-[var(--ember)] hover:text-white text-white/70 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (Span 3) */}
          <div className="md:col-span-3 lg:col-span-3 lg:col-start-7">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--ember-light)] font-semibold mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors focus:outline-none focus:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors focus:outline-none focus:underline">
                  Manifesto & About
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-white/70 hover:text-white transition-colors focus:outline-none focus:underline">
                  Sprints & Events
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-white/70 hover:text-white transition-colors focus:outline-none focus:underline">
                  Builder Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors focus:outline-none focus:underline">
                  Join & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hub Info (Span 4) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--ember-light)] font-semibold mb-5">
              Ecosystem Hubs
            </h4>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Vizag Innovation Hub & Andhra Pradesh Campus Chapters.
            </p>
            <div className="pt-4 border-t border-white/10">
              <span className="font-mono text-[11px] text-white/40 block mb-1 uppercase tracking-wider">Weekly Sprint Cadence</span>
              <span className="text-xs text-[var(--amber)] font-medium bg-white/5 px-2 py-1.5 rounded-md inline-block">Sundays, 4:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {currentYear} Aegion Dynamic Community. Built with</span>
            <Heart className="w-3 h-3 text-[var(--ember-light)] inline fill-current" />
            <span>by makers.</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-[var(--line-dark)] text-white/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
