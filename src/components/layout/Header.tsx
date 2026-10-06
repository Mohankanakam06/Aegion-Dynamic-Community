import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logoNav from '../../assets/images/logo.svg';
import GooeyNav from '../ui/GooeyNav';
import { MobileNav } from './MobileNav';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Gatherings', path: '/events' },
  { name: 'Stories', path: '/stories' },
  { name: 'Connect', path: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 pt-safe transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--surface-glass)] backdrop-blur-md shadow-xs border-b border-[var(--line)] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center group py-1 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] rounded-lg"
            aria-label="Aegion Dynamic Community, home"
          >
            <img
              src={logoNav}
              alt="Aegion Dynamic Community"
              width="160"
              height="40"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <GooeyNav items={navItems.map((item) => ({ label: item.name, href: item.path }))} />
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-full bg-[var(--ember-deep)] hover:bg-[var(--ember-dark)] text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember-deep)] focus-visible:ring-offset-2 active:translate-y-0.5"
            >
              <span>Join Sunday Sprint</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile navigation (bottom sheet, M2-final) */}
          <MobileNav />
        </div>
      </header>
    </>
  );
}

export default Header;
