import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import logoMark from '../../assets/images/logo.svg';

/**
 * A10 — Photo. <picture> AVIF → WebP → JPEG with srcset/sizes, explicit
 * width/height (zero CLS), lazy + async decoding by default.
 * `priority` is for the hero image only (eager, high fetch priority, preloaded).
 * `cover` crops into a parent-sized slot with per-image object-position so
 * faces are never cropped. Image-error fallback tile shows the logo mark.
 */
export interface PhotoProps {
  src: string;
  /** Required by the type. Describe the photo for screen readers. */
  alt: string;
  /** Intrinsic dimensions of the fallback `src` (required, reserves geometry). */
  width: number;
  height: number;
  avifSrcSet?: string;
  webpSrcSet?: string;
  /** JPEG fallback srcset (also what the browser preloads when priority). */
  srcSet?: string;
  sizes?: string;
  priority?: boolean;
  /** Crop into the wrapper's box (parent controls height/aspect via className). */
  cover?: boolean;
  objectPosition?: string;
  className?: string;
}

export function Photo({
  src,
  alt,
  width,
  height,
  avifSrcSet,
  webpSrcSet,
  srcSet,
  sizes,
  priority = false,
  cover = false,
  objectPosition = '50% 50%',
  className,
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex items-center justify-center overflow-hidden rounded-[var(--radius-lg)] bg-[var(--cream-subtle)] shadow-[inset_0_0_0_1px_var(--line)]',
          className
        )}
      >
        <img src={logoMark} alt="" aria-hidden="true" className="w-16 opacity-40" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--cream-subtle)] shadow-[inset_0_0_0_1px_var(--line)]',
        className
      )}
    >
      {priority && (
        <link rel="preload" as="image" href={src} imageSrcSet={srcSet} imageSizes={sizes} />
      )}
      <picture>
        {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
        {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          style={{ objectPosition }}
          className={cn(
            'block',
            cover ? 'absolute inset-0 h-full w-full object-cover' : 'h-auto w-full'
          )}
        />
      </picture>
    </div>
  );
}

export default Photo;
