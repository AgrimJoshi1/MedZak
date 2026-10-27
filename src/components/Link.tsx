'use client';

import NextLink from 'next/link';
import { forwardRef, type ComponentProps, type MouseEvent } from 'react';
import { prefersReducedMotion } from '@/lib/viewTransition';
import { useNavigate } from './PageTransitions';

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * Where a plain left click on this link should go with a page transition, or null to leave it to the router
 * (modified clicks, new tabs, downloads, other sites, and #hash links on the same page, which scroll smoothly by CSS).
 * 'top' = the link points at the page we are already on.
 */
function interceptTarget(e: MouseEvent<HTMLAnchorElement>): string | 'top' | null {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = e.currentTarget;
  if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return null;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) {
    return !url.hash && !window.location.hash && url.search === window.location.search ? 'top' : null;
  }
  return url.pathname + url.search + url.hash;
}

/** next/link with the site's page transition: the same props, the same prefetching, a softer arrival. */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ onClick, ...props }, ref) {
  const navigate = useNavigate();
  return (
    <NextLink
      ref={ref}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || typeof props.href !== 'string') return;
        const target = interceptTarget(e);
        if (!target) return;
        e.preventDefault();
        if (target === 'top') window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        else navigate(target, props.replace);
      }}
    />
  );
});

export default Link;
