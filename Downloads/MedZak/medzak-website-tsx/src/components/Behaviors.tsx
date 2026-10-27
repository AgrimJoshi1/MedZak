'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Site-wide behaviours that need no markup of their own:
 *  - [data-reveal] elements fade/slide in once, when they first scroll into view (hidden only when JS is running)
 *  - [data-spot] surfaces get a soft light that follows the pointer (--mx / --my)
 */
export function Behaviors() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('js');
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };
    scan();
    // content that React adds later (tabs, modals) is picked up too
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    // a fast scroll (or a jump to an anchor) can carry the page past an element without it ever crossing the
    // observer's threshold: anything now above the viewport has been passed, so show it instead of leaving it hidden.
    // Checked once scrolling pauses, so the page never does layout reads while it is moving.
    let settle = 0;
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
          if (el.getBoundingClientRect().bottom < 0) { el.classList.add('is-in'); io.unobserve(el); }
        });
      }, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); mo.disconnect(); window.removeEventListener('scroll', onScroll); window.clearTimeout(settle); };
  }, [pathname]);

  // lazy photos fade in as they arrive instead of popping into their frame. Only images that are still loading when
  // this runs are touched (cached ones are already there), and nothing stays hidden: a load, an error or a timeout frees it
  useEffect(() => {
    if (reducedMotion()) return;
    const ready = (img: HTMLImageElement) => {
      if (!img.classList.contains('is-pending')) return;
      img.classList.remove('is-pending');
      img.classList.add('is-ready');
    };
    const onDone = (e: Event) => { if (e.target instanceof HTMLImageElement) ready(e.target); };
    document.addEventListener('load', onDone, true);
    document.addEventListener('error', onDone, true);
    const timers: number[] = [];
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]:not(.is-ready):not(.is-pending)').forEach((img) => {
        if (img.complete) return;
        img.classList.add('is-pending');
        timers.push(window.setTimeout(() => ready(img), 6000));
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
      document.removeEventListener('load', onDone, true);
      document.removeEventListener('error', onDone, true);
    };
  }, [pathname]);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('[data-spot]');
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${Math.round(e.clientX - r.left)}px`);
        el.style.setProperty('--my', `${Math.round(e.clientY - r.top)}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return null;
}

/** A number that counts up the first time it scrolls into view. The final value is in the HTML, so it reads fine without JS. */
export function CountUp({ value, duration = 1300 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !('IntersectionObserver' in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setShown(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  return <span ref={ref} className="countup">{shown}</span>;
}

/**
 * The hero: tracks where the pointer is relative to the instrument plate and publishes it as --ex / --ey (-1..1),
 * so the eye in the illustration looks at the visitor. Until the pointer moves, the eye idles on its own.
 */
export function PointerField({ className, children, ...rest }: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion()) return;
    const art = root.querySelector<HTMLElement>('.plate-art');
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = (art ?? root).getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / 520;
        const dy = (e.clientY - (r.top + r.height / 2)) / 420;
        root.style.setProperty('--ex', Math.max(-1, Math.min(1, dx)).toFixed(3));
        root.style.setProperty('--ey', Math.max(-1, Math.min(1, dy)).toFixed(3));
        root.classList.add('is-live');
      });
    };
    const onLeave = () => { root.classList.remove('is-live'); root.style.removeProperty('--ex'); root.style.removeProperty('--ey'); };
    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    return () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf); };
  }, []);

  return <section ref={ref} className={className} {...rest}>{children}</section>;
}
