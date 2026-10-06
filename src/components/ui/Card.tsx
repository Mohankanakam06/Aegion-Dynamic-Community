import React, { useCallback, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * A9 — Card. White surface, 1px warm hairline, radius from the scale, layered warm shadow.
 * interactive = the whole card is ONE link (stretched-link pattern, a single tab stop,
 * focus ring on the card via :has(a:focus-visible)), hover lift 2px + shadow step,
 * spotlight (effect #3, fine pointers only), pressed state.
 * Rule: never a bordered card inside a bordered card.
 */
const cardVariants = cva(
  'relative rounded-[var(--radius-lg)] transition-[translate,scale,box-shadow,border-color] duration-200 ease-[var(--ease-standard)]',
  {
    variants: {
      variant: {
        surface: 'border border-[var(--line)] bg-[var(--surface)] shadow-sm',
        soft: 'bg-[var(--cream-soft)]',
        ink: 'bg-[var(--ink)] text-[var(--cream)] shadow-lg',
      },
      interactive: {
        true: 'card-interactive cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:scale-[0.995] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[var(--focus-ring)]',
      },
    },
    defaultVariants: { variant: 'surface' },
  }
);

type CardLinkProps =
  | { href?: undefined; linkLabel?: never }
  | { href: string; /** Accessible name for the stretched link. */ linkLabel: string };

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> &
  CardLinkProps & {
    /** Spotlight hover (effect #3). Defaults to true when interactive. */
    spotlight?: boolean;
  };

export function Card({
  className,
  variant,
  interactive,
  spotlight = true,
  href,
  linkLabel,
  children,
  ...props
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInteractive = interactive ?? Boolean(href);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const stretchedLink = href ? (
    /^https?:\/\//.test(href) ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={linkLabel}
        className="absolute inset-0 z-10 rounded-[inherit]"
      />
    ) : (
      <RouterLink
        to={href}
        aria-label={linkLabel}
        className="absolute inset-0 z-10 rounded-[inherit]"
      />
    )
  ) : null;

  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive: isInteractive ? true : undefined }), className)}
      onPointerMove={isInteractive && spotlight ? handlePointerMove : undefined}
      {...props}
    >
      {stretchedLink}
      {isInteractive && spotlight && <span aria-hidden="true" className="card-spotlight" />}
      {children}
    </div>
  );
}

export { cardVariants };
export default Card;
