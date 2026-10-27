'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Icon } from './Icon';

export interface LightboxItem { src: string; caption: string }

/**
 * Full-size image viewer: arrow keys move between images, Escape closes, Tab stays on its three buttons,
 * and focus returns to the thumbnail that opened it.
 */
export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const open = index !== null;
  const ref = useRef<HTMLDivElement>(null);
  const step = useCallback((d: number) => { if (index !== null) onIndex((index + d + items.length) % items.length); }, [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('no-scroll');
    const el = ref.current;
    el?.querySelector<HTMLElement>('.lb-close')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab' && el) {
        const buttons = Array.from(el.querySelectorAll<HTMLElement>('button'));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll'); opener?.focus?.(); };
  }, [open, onClose, step]);

  // the picture stays in place while the viewer fades out, instead of vanishing under the fading backdrop
  const latest = useRef<LightboxItem | null>(null);
  if (index !== null) latest.current = items[index];
  const current = latest.current;
  return (
    <div ref={ref} className={`lb${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Image viewer" aria-hidden={!open}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button type="button" className="lb-close" aria-label="Close" onClick={onClose}><Icon name="x" /></button>
      <button type="button" className="lb-prev" aria-label="Previous image" onClick={() => step(-1)}><Icon name="chevron-left" /></button>
      {current && (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={current.src} src={`/${current.src}`} alt={current.caption} />
      )}
      <p className="lb-caption" aria-live="polite">{current?.caption}</p>
      <button type="button" className="lb-next" aria-label="Next image" onClick={() => step(1)}><Icon name="chevron-right" /></button>
    </div>
  );
}
