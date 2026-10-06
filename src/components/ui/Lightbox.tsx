import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  title?: string;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  title
}: LightboxProps) {
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    } else {
      onIndexChange(images.length - 1);
    }
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      onIndexChange(0);
    }
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full max-w-6xl text-white/90 py-2">
        <div className="flex items-center space-x-3">
          {title && <span className="font-display text-base sm:text-lg text-white font-medium">{title}</span>}
          <span className="font-mono text-xs px-3 py-1 bg-white/10 rounded-full border border-white/15 text-white/90">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex items-center justify-center w-full max-w-5xl flex-1 my-3">
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 md:-left-12 z-10 p-3 rounded-full bg-black/60 hover:bg-[var(--ember)] border border-white/20 text-white transition-all transform hover:scale-105 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="relative max-h-[72vh] max-w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/40">
          <img
            src={images[currentIndex]}
            alt={`Gallery photograph ${currentIndex + 1}`}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-2xl transition-all duration-200"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 md:-right-12 z-10 p-3 rounded-full bg-black/60 hover:bg-[var(--ember)] border border-white/20 text-white transition-all transform hover:scale-105 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center space-x-2.5 overflow-x-auto max-w-xl py-2 px-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onIndexChange(idx)}
              aria-label={`View photograph ${idx + 1}`}
              className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-[var(--ember)] scale-105 shadow-md'
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
