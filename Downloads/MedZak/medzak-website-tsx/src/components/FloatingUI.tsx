'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/data/site';
import { Icon } from './Icon';
import { ModalLink } from './Modal';
import { useApp } from './providers';

/** Phones: four actions pinned to the bottom edge. */
export function QuickBar() {
  const { openModal, menuOpen, setMenuOpen } = useApp();
  return (
    <nav className="quickbar" aria-label="Quick actions">
      <button type="button" onClick={() => openModal('callback')}><Icon name="phone" /><span>Call back</span></button>
      <a href={`mailto:${SITE.email}`}><Icon name="mail" /><span>Email</span></a>
      <button type="button" className="is-primary" onClick={() => openModal('bookDemo')}><Icon name="calendar" /><span>Book demo</span></button>
      <button type="button" data-open-menu onClick={() => setMenuOpen(!menuOpen)}><Icon name="menu" /><span>Menu</span></button>
    </nav>
  );
}

/** Tablet and up: the call back tab on the right edge. */
export function FloatCallback() {
  return (
    <aside aria-label="Quick contact">
      <ModalLink modal="callback" className="float-callback"><Icon name="phone" /><span>Call back</span></ModalLink>
    </aside>
  );
}

export function ScrollTop() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button" className={`scroll-top${shown ? ' is-shown' : ''}`} aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
    >
      <Icon name="chevron-up" />
    </button>
  );
}

/** One-time notice about what the site stores on the device. */
export function ConsentNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem('medzak-consent') === '1'; } catch { /* storage blocked */ }
    setVisible(!seen);
  }, []);
  if (!visible) return null;
  return (
    <div className="consent" role="region" aria-label="Cookie notice">
      <p>We store your light or dark theme preference on your device. The map on the Contact page is provided by Google Maps, which may set its own cookies.</p>
      <button
        type="button" className="btn btn--primary btn--sm"
        onClick={() => { try { localStorage.setItem('medzak-consent', '1'); } catch { /* storage blocked */ } setVisible(false); }}
      >
        Got it
      </button>
    </div>
  );
}
