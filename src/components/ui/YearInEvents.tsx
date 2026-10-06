import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../../lib/motion';
import { cn } from '../../lib/utils';
import build1 from '../../assets/images/build-hours/1.jpg';
import build3 from '../../assets/images/build-hours/3.jpg';
import proxima2 from '../../assets/images/proxima/2.jpg';
import build6 from '../../assets/images/build-hours/6.jpg';
import proxima6 from '../../assets/images/proxima/6.jpg';

gsap.registerPlugin(ScrollTrigger);

const storyPanels = [
  { img: build1, caption: 'First Lines of Code', date: 'Jan 2026' },
  { img: proxima2, caption: 'Proxima Release 1', date: 'Mar 2026' },
  { img: build3, caption: 'IoT & Web Symbiosis', date: 'Jun 2026' },
  { img: build6, caption: 'Scale-out Testing', date: 'Aug 2026' },
  { img: proxima6, caption: 'Community Launch', date: 'Oct 2026' },
];

export const YearInEvents: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;
    if (!containerRef.current || !trackRef.current) return;

    const sections = gsap.utils.toArray('.story-panel') as HTMLElement[];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, // Smooth scrub
        end: () => `+=${trackRef.current?.offsetWidth || 2000}`,
      },
    });

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-[var(--surface-dark)] text-[var(--cream)] overflow-hidden hidden md:flex flex-col justify-center"
    >
      <div className="absolute top-12 left-12 md:left-20 z-10">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-[var(--amber)]">
          The Journey Through Glass
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-inverse-muted)] mt-2">
          Scroll to explore the visual history of Aegion // 2026
        </p>
      </div>

      <div ref={trackRef} className="flex h-[60vh] md:h-[70vh] mt-16 w-[400vw] lg:w-[300vw]">
        {storyPanels.map((panel, idx) => (
          <div
            key={idx}
            className={cn(
              'story-panel w-screen h-full flex items-center justify-center relative p-8 md:p-24',
              isReducedMotion() ? 'w-full mb-12 flex-none' : 'flex-none'
            )}
          >
            <div className="relative w-full max-w-4xl h-full rounded-2xl overflow-hidden border border-[var(--line-dark)] shadow-2xl">
              <img
                src={panel.img}
                alt={panel.caption}
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/40 to-transparent w-full">
                <span className="font-mono text-sm text-[var(--ember)] font-bold block mb-2">{panel.date}</span>
                <h3 className="font-display text-3xl md:text-4xl font-extrabold">{panel.caption}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YearInEvents;
