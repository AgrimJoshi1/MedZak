'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { runTransition } from '@/lib/viewTransition';

/** How long a page may take to arrive before the cross-fade stops waiting for it. */
const VIEW_WAIT = 1500;
/** The progress bar gives up after this long, whatever happens. */
const BAR_WAIT = 10000;

type Navigate = (href: string, replace?: boolean) => void;
const NavigateContext = createContext<Navigate>(() => {});

/** Routes to `href` with the page transition. Falls back to a plain `router.push` outside the provider. */
export function useNavigate(): Navigate {
  return useContext(NavigateContext);
}

interface Pending { release: () => void }

/**
 * Page transitions for client-side navigation:
 *  - browsers with View Transitions cross-fade from the old page to the new one;
 *  - a thin progress bar runs from the click until the new page is on screen, so a slow page never looks stuck.
 * `<Link>` (components/Link.tsx) and the search palette call `navigate`.
 */
export function PageTransitions({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<Pending | null>(null);

  // the new route has rendered: let the browser capture it and finish the bar
  useLayoutEffect(() => {
    const p = pending.current;
    pending.current = null;
    p?.release();
  }, [pathname]);

  const navigate = useCallback<Navigate>((href, replace = false) => {
    const root = document.documentElement;
    // the same page (a #hash on it, say): nothing to wait for, and the router scrolls there smoothly
    if (new URL(href, window.location.href).pathname === window.location.pathname) {
      if (replace) router.replace(href); else router.push(href);
      return;
    }
    pending.current?.release();

    let resolveView: (() => void) | undefined;
    const timers: number[] = [];
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      timers.forEach((t) => window.clearTimeout(t));
      resolveView?.();
      root.removeAttribute('data-navigating');
      root.setAttribute('data-nav-done', '');
      window.setTimeout(() => root.removeAttribute('data-nav-done'), 700);
    };
    pending.current = { release };
    root.removeAttribute('data-nav-done');
    root.setAttribute('data-navigating', '');
    timers.push(window.setTimeout(release, BAR_WAIT));

    const go = () => { if (replace) router.replace(href); else router.push(href); };
    // without view transitions this just calls the update, i.e. a plain push
    runTransition(
      () => new Promise<void>((resolve) => {
        resolveView = resolve;
        timers.push(window.setTimeout(resolve, VIEW_WAIT));
        go();
      }),
      'page',
    );
  }, [router]);

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
      <div className="route-bar" aria-hidden="true" />
    </NavigateContext.Provider>
  );
}

let hydrated = false;

/**
 * Wraps every page (app/template.tsx re-mounts it on each navigation). When the browser cannot cross-fade, or the
 * visitor went Back or Forward, the new page fades in instead. The first load never animates.
 */
export function PageEnter({ children }: { children: ReactNode }) {
  const [enter] = useState(() => hydrated && !document.documentElement.hasAttribute('data-vt'));
  useEffect(() => { hydrated = true; }, []);
  return <div className={enter ? 'page-enter' : undefined}>{children}</div>;
}
