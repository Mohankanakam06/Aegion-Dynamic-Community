import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GooeyNav.css';

export interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  particleCount?: number;
  animationTime?: number;
  timeVariance?: number;
  colors?: string[];
}

export const GooeyNav: React.FC<GooeyNavProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const [pillStyle, setPillStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const activeIndex = items.findIndex((item) => item.href === location.pathname);

  // Position the sliding active pill
  const updatePillPosition = useCallback(() => {
    if (!containerRef.current || !navListRef.current) return;

    if (activeIndex === -1) {
      setPillStyle((prev) => ({ ...prev, visible: false }));
      return;
    }

    const listItems = navListRef.current.querySelectorAll('li');
    const targetLi = listItems[activeIndex];

    if (targetLi) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = targetLi.getBoundingClientRect();

      setPillStyle({
        left: targetRect.left - containerRect.left,
        top: targetRect.top - containerRect.top,
        width: targetRect.width,
        height: targetRect.height,
        visible: true,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    updatePillPosition();

    // Re-check on next frame to ensure font rendering has settled
    const rafId = requestAnimationFrame(updatePillPosition);

    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        updatePillPosition();
      });
      resizeObserver.observe(containerRef.current);
      return () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
      };
    }
    return () => cancelAnimationFrame(rafId);
  }, [updatePillPosition]);

  const handleItemClick = (e: React.MouseEvent, index: number, href: string) => {
    e.preventDefault();
    if (activeIndex === index) return;
    navigate(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(e as any, index, href);
    }
  };

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      {/* Sliding Active Pill Layer */}
      <div className="gooey-effect-canvas" aria-hidden="true">
        <div
          ref={pillRef}
          className={`gooey-active-pill ${pillStyle.visible ? 'visible' : ''}`}
          style={{
            left: `${pillStyle.left}px`,
            top: `${pillStyle.top}px`,
            width: `${pillStyle.width}px`,
            height: `${pillStyle.height}px`,
          }}
        />
      </div>

      {/* Navigation List */}
      <nav aria-label="Main Navigation">
        <ul ref={navListRef}>
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li key={item.href} className={isActive ? 'active' : ''}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleItemClick(e, index, item.href)}
                  onKeyDown={(e) => handleKeyDown(e, index, item.href)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;
