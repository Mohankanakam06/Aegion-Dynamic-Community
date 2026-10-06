import React, { useEffect, useCallback } from 'react';
import { X, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tag: string;
  title: string;
  description: string;
  images: string[];
  onImageClick?: (index: number) => void;
  date?: string;
  location?: string;
}

export function Modal({
  isOpen,
  onClose,
  tag,
  title,
  description,
  images,
  onImageClick,
  date,
  location
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--ink)]/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[var(--surface)] p-6 sm:p-8 rounded-3xl border border-[var(--line-strong)] shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--amber-soft)] border border-[var(--amber-border)] text-[var(--ember-deep)] font-mono text-xs font-semibold uppercase tracking-wider">
            {tag}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 -mr-2 -mt-2 text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--cream-soft)] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 id="modal-title" className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--ink)] mb-4 leading-snug">
          {title}
        </h2>

        {(date || location) && (
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--ink-soft)] mb-5 pb-4 border-b border-[var(--line)]">
            {date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--ember)]" />
                <span>{date}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--ember)]" />
                <span>{location}</span>
              </div>
            )}
          </div>
        )}

        <p className="text-[var(--ink-soft)] text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
          {description}
        </p>

        {images && images.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-faint)] font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[var(--ember)]" />
                <span>Event Photo Gallery ({images.length})</span>
              </span>
              <span className="text-[11px] text-[var(--ink-muted)] font-mono">Click to enlarge</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => onImageClick?.(i)}
                  className="relative h-28 sm:h-32 rounded-xl overflow-hidden cursor-pointer group border border-[var(--line)]"
                >
                  <img
                    src={img}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[var(--ink)]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-mono font-medium bg-[var(--ink)]/80 px-2 py-1 rounded">
                      Enlarge
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
