'use client';

import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Icon } from './Icon';
import { useApp, type ModalId } from './providers';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

interface ModalShellProps {
  id?: string;
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

/**
 * An accessible dialog: focus moves in when it opens and returns to the opener when it closes,
 * Tab is kept inside, Escape and a click on the backdrop close it, and the page behind stops scrolling.
 * It stays in the DOM when closed (hidden by CSS) so its text is part of the page.
 */
export function ModalShell({ id, open, onClose, labelledBy, className, children }: ModalShellProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    if (!el) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('no-scroll');
    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => !n.closest('[hidden]') && n.getAttribute('tabindex') !== '-1');
    const timer = window.setTimeout(() => {
      (el.querySelector<HTMLElement>('[data-autofocus]') ?? focusables()[0])?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
      opener?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id={id}
      className={`modal${className ? ` ${className}` : ''}${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

export function ModalCloseButton({ onClick, label = 'Close' }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" className="modal-close" aria-label={label} onClick={onClick}>
      <Icon name="x" />
    </button>
  );
}

type AnchorRest = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>;

/** A link that opens a dialog (keeps a real #hash href for no-script visitors and for the content record). */
export function ModalLink({ modal, className, children, ...rest }: { modal: ModalId; className?: string; children: ReactNode } & AnchorRest) {
  const { openModal } = useApp();
  return (
    <a
      href={`#${modal}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openModal(modal);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
