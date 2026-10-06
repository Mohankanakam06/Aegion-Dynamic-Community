import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * A5 — Link. Arrow rule: → navigates inside the site, ↗ leaves it.
 * Internal paths render the router Link; external/mailto/tel render <a>.
 * External http(s) links in a new tab get rel="noopener noreferrer"
 * plus an sr-only "(opens in a new tab)" hint.
 */
type Variant = 'inline' | 'arrow' | 'mono';

const variantClasses: Record<Variant, string> = {
  inline:
    'font-medium text-[var(--ember-deep)] underline decoration-1 underline-offset-[3px] hover:decoration-2',
  arrow:
    'group/link inline-flex items-center gap-1.5 font-semibold text-[var(--ember-deep)] hover:text-[var(--ember-dark)]',
  mono: 'font-mono text-xs font-semibold text-[var(--ink-soft)] hover:text-[var(--ember-deep)]',
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
}

export function Link({ href, variant = 'inline', className, children, ...props }: LinkProps) {
  const { target, rel, ...rest } = props;
  const isInternal = href.startsWith('/');
  const isHttp = /^https?:\/\//.test(href);
  const opensNewTab = isHttp && target === '_blank';

  const classes = cn(
    variantClasses[variant],
    'rounded-sm transition-colors duration-150 focus-visible:focus-ring',
    className
  );

  const arrow =
    variant === 'arrow' ? (
      isHttp ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-150 group-hover/link:translate-x-[3px] group-hover/link:-translate-y-[3px]"
        />
      ) : (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-150 group-hover/link:translate-x-[3px]"
        />
      )
    ) : null;

  const content = (
    <>
      <span>{children}</span>
      {arrow}
      {opensNewTab && <span className="sr-only">(opens in a new tab)</span>}
    </>
  );

  if (isInternal) {
    return (
      <RouterLink to={href} className={classes} {...rest}>
        {content}
      </RouterLink>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={target}
      rel={opensNewTab ? 'noopener noreferrer' : rel}
      {...rest}
    >
      {content}
    </a>
  );
}

export default Link;
