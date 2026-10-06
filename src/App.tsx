import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig, LazyMotion, domAnimation } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { StickyActionBar } from './components/layout/StickyActionBar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Stories } from './pages/Stories';
import { Contact } from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

/* LazyMotion features: domAnimation now; switch to domMax at Gate C (layoutId
   pills need layout animations). Kept as a static import so Rollup keeps all
   Motion code inside the cached vendor-motion chunk. */
const motionFeatures = domAnimation;

/* Dev-only component kit route — never registered (or bundled) in production. */
const Kit = import.meta.env.DEV ? lazy(() => import('./pages/__kit')) : null;

export function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={motionFeatures}>
        <div className="min-h-svh flex flex-col bg-[var(--cream)] text-[var(--ink)] antialiased font-sans selection:bg-[var(--amber)] selection:text-[var(--ink)]">
          <ScrollToTop />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/contact" element={<Contact />} />
              {Kit && (
                <Route
                  path="/__kit"
                  element={
                    <Suspense fallback={null}>
                      <Kit />
                    </Suspense>
                  }
                />
              )}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <StickyActionBar />
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
