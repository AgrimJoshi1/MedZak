/**
 * Thin wrapper over the View Transitions API. Browsers without it, and visitors who asked for reduced motion,
 * just get the update applied at once: nothing here is needed for the site to work.
 */
interface ViewTransitionHandle { ready: Promise<void>; finished: Promise<void> }
type ViewTransitionDocument = { startViewTransition?: (update: () => void | Promise<void>) => ViewTransitionHandle };

export type TransitionKind = 'page' | 'theme';

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function canTransition(): boolean {
  return typeof document !== 'undefined' && typeof (document as ViewTransitionDocument).startViewTransition === 'function' && !prefersReducedMotion();
}

/**
 * Runs `update` inside a view transition. `kind` is written to `<html data-vt>` for the length of the transition so the
 * CSS can pick the animation. Returns the transition, or null when it ran without one.
 */
export function runTransition(update: () => void | Promise<void>, kind: TransitionKind): ViewTransitionHandle | null {
  if (!canTransition()) {
    void update();
    return null;
  }
  const root = document.documentElement;
  root.setAttribute('data-vt', kind);
  const handle = (document as ViewTransitionDocument).startViewTransition!(update);
  const clear = () => { if (root.getAttribute('data-vt') === kind) root.removeAttribute('data-vt'); };
  handle.finished.then(clear, clear);
  return handle;
}
