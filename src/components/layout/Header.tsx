import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import logoNav from '../../assets/images/logo.svg';
import GooeyNav from '../ui/GooeyNav';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  // Initialize theme from DOM attribute or system
  useEffect(() => {
    const currentTheme = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('aegion_theme', nextTheme);
    } catch (e) {
      // Ignore local storage errors if disabled
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key and body scroll lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
            aria-label="Aegion Dynamic Community Home"
          >
            <img
              src={logoNav}
              alt="Aegion Dynamic Community"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] dark:brightness-110"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <GooeyNav items={navItems.map((item) => ({ label: item.name, href: item.path }))} />
          </div>

          {/* Action Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-[var(--surface)] border border-[var(--line-strong)] text-[var(--ink)] hover:text-[var(--primary)] hover:border-[var(--primary-border)] transition-colors flex items-center justify-center cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[var(--amber)]" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--ink-soft)]" aria-hidden="true" />
              )}
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-semibold tracking-wide shadow-xs hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 active:translate-y-0.5"
            >
              <span>Join Saturday Sprint</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--cream-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] cursor-pointer flex items-center justify-center transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[var(--amber)]" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--ink-soft)]" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--cream-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] cursor-pointer flex items-center justify-center transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop & Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              className="relative bg-[var(--cream)] border-b border-[var(--line-strong)] px-6 pt-5 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center py-1 min-h-[44px]"
                  aria-label="Aegion Dynamic Community"
                >
                  <img src={logoNav} alt="Aegion Dynamic Community" className="h-8 w-auto object-contain dark:brightness-110" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-[var(--ink)] hover:bg-[var(--cream-soft)] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1 pt-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`min-h-[48px] flex items-center px-4 rounded-xl text-base font-display font-semibold transition-colors ${
                        isActive
                          ? 'bg-[var(--ember-soft)] text-[var(--ember-deep)] font-bold'
                          : 'text-[var(--ink)] hover:bg-[var(--cream-soft)]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-[var(--line)]">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-sm font-semibold shadow-xs transition-all"
                  >
                    <span>Join Saturday Sprint</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <p className="font-mono text-[11px] text-[var(--ink-soft)] text-center mt-3">
                    Vizag Innovation Hub // Saturdays 4:00 PM IST
                  </p>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
export default Header;
