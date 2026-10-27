'use client';

import Link from '@/components/Link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { MENU_DEMO, NAV, type NavItem, type NavLink, type NavTab } from '@/data/nav';
import { SITE } from '@/data/site';
import { Icon } from './Icon';
import { ModalLink } from './Modal';
import { useApp, type ModalId } from './providers';

const OPEN_DELAY = 80;
const CLOSE_DELAY = 150;
const DESKTOP_MIN = 1200;

/** Internal links use the router; mailto and absolute URLs are plain anchors; `modal` links open a dialog. */
function NavAnchor({ link, className, role, tabIndex, children, onClick }: {
  link: { href: string; modal?: string };
  className?: string;
  role?: string;
  tabIndex?: number;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (link.modal) return <ModalLink modal={link.modal as ModalId} className={className}>{children}</ModalLink>;
  if (link.href.startsWith('/')) {
    return (
      <Link href={link.href} className={className} role={role} tabIndex={tabIndex} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={link.href} className={className} role={role} tabIndex={tabIndex} onClick={onClick}>
      {children}
    </a>
  );
}

function DropdownItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <li role="none">
      <NavAnchor link={item} className="dd-item" role="menuitem" tabIndex={-1} onClick={onNavigate}>
        <span className="dd-media">
          {item.thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/${item.thumb}`} alt="" width={34} height={34} loading="lazy" decoding="async" />
          ) : (
            <Icon name={item.icon ?? 'layers'} />
          )}
        </span>
        <span className="dd-text">
          <span className="dd-name">{item.label}</span>
          <span className="dd-desc">{item.description}</span>
          {item.detail && <span className="dd-info">{item.detail}</span>}
        </span>
        <Icon name="arrow-right" className="dd-arrow" />
      </NavAnchor>
    </li>
  );
}

function NavTabItem({ tab, current, open, onHover, onLeave, onToggle, onClose, onNavigate }: {
  tab: NavTab;
  current: boolean;
  open: boolean;
  onHover: (id: string) => void;
  onLeave: (id: string) => void;
  onToggle: (id: string, fromKeyboard?: boolean) => void;
  onClose: (id: string, refocus?: boolean) => void;
  onNavigate: () => void;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const items = () => Array.from(liRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
  const panelId = `dd-${tab.id}`;

  const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= DESKTOP_MIN;

  const onTriggerClick = (e: MouseEvent) => {
    if (canHover()) return; // mouse: the tab is a normal link to its page
    e.preventDefault();
    onToggle(tab.id);
  };
  const onTriggerFocus = () => {
    if (canHover() && triggerRef.current?.matches(':focus-visible')) onHover(tab.id);
  };
  const onTriggerKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      onToggle(tab.id, true);
      window.setTimeout(() => { const list = items(); (e.key === 'ArrowDown' ? list[0] : list[list.length - 1])?.focus(); }, 0);
    } else if (e.key === ' ') {
      e.preventDefault();
      onToggle(tab.id);
    } else if (e.key === 'Enter' && !open) {
      e.preventDefault();
      onToggle(tab.id, true);
    }
  };
  const onPanelKey = (e: KeyboardEvent) => {
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    let next = -1;
    if (e.key === 'ArrowDown') next = (i + 1) % list.length;
    else if (e.key === 'ArrowUp') next = (i - 1 + list.length) % list.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = list.length - 1;
    if (next < 0) return;
    e.preventDefault();
    list[next].focus();
  };

  return (
    <li
      ref={liRef}
      className={`nav-item${current ? ' is-current' : ''}${open ? ' is-open' : ''}`}
      onMouseEnter={() => canHover() && onHover(tab.id)}
      onMouseLeave={() => canHover() && onLeave(tab.id)}
      onKeyDown={(e) => { if (e.key === 'Escape' && open) { e.preventDefault(); onClose(tab.id, true); triggerRef.current?.focus(); } }}
      onBlur={(e) => {
        if (!canHover()) return;
        const next = e.relatedTarget as Node | null;
        if (next && liRef.current?.contains(next)) return;
        if (liRef.current?.matches(':hover')) return;
        onClose(tab.id);
      }}
    >
      <Link
        ref={triggerRef}
        href={tab.href}
        className="nav-link"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={current ? 'page' : undefined}
        onClick={(e) => { onTriggerClick(e); if (!e.defaultPrevented) onNavigate(); }}
        onFocus={onTriggerFocus}
        onKeyDown={onTriggerKey}
      >
        {tab.label}
        <Icon name="chevron-down" className="nav-caret" />
      </Link>
      <div className="dd-panel" id={panelId} onKeyDown={onPanelKey}>
        <div className="dd-head">
          <span className="dd-title">{tab.title}</span>
          <NavAnchor link={tab.viewAll} className="dd-viewall" onClick={onNavigate}>{tab.viewAll.label} &rarr;</NavAnchor>
        </div>
        <ul className="dd-list" role="menu" aria-label={tab.label}>
          {tab.items.map((item) => <DropdownItem key={item.label} item={item} onNavigate={onNavigate} />)}
        </ul>
        <div className="dd-foot">
          <span className="dd-note">{tab.footer.note}</span>
          <NavAnchor link={tab.footer.cta as NavLink} className="btn btn--primary btn--sm" onClick={onNavigate}>{tab.footer.cta.label}</NavAnchor>
        </div>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme, openModal, menuOpen, setMenuOpen } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<Record<string, number>>({});

  const clearTimer = (id: string) => { window.clearTimeout(timers.current[id]); };
  const anyOpen = openId !== null;

  const onHover = useCallback((id: string) => {
    clearTimer(id);
    timers.current[id] = window.setTimeout(() => setOpenId(id), anyOpen ? 0 : OPEN_DELAY);
  }, [anyOpen]);
  const onLeave = useCallback((id: string) => {
    clearTimer(id);
    timers.current[id] = window.setTimeout(() => setOpenId((cur) => (cur === id ? null : cur)), CLOSE_DELAY);
  }, []);
  const onToggle = useCallback((id: string, forceOpen?: boolean) => {
    clearTimer(id);
    setOpenId((cur) => (forceOpen ? id : cur === id ? null : id));
  }, []);
  const onClose = useCallback((id: string) => { clearTimer(id); setOpenId((cur) => (cur === id ? null : cur)); }, []);
  const onNavigate = useCallback(() => { setOpenId(null); setMenuOpen(false); }, [setMenuOpen]);

  // route change: close menus
  useEffect(() => { setOpenId(null); setMenuOpen(false); }, [pathname, setMenuOpen]);

  // click outside closes the open menu
  useEffect(() => {
    const onDoc = (e: Event) => {
      if (!(e.target as HTMLElement).closest('.nav-item')) setOpenId(null);
      if (menuOpen && !(e.target as HTMLElement).closest('.site-header, [data-open-menu]')) setMenuOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [menuOpen, setMenuOpen]);

  // the mobile menu is full screen: stop the page behind it from scrolling; Escape closes it
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    if (!menuOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll'); };
  }, [menuOpen, setMenuOpen]);

  // width change (not height: mobile address bars resize while scrolling)
  useEffect(() => {
    let w = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === w) return;
      w = window.innerWidth;
      setOpenId(null);
      if (w >= DESKTOP_MIN) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setMenuOpen]);

  // compact header after 8px of scroll + reading progress line (written straight to the DOM: no re-render per scroll)
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 8);
      progressRef.current?.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const isCurrent = (tab: NavTab) => tab.pages.includes(pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`);

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="utility-bar">
        <div className="container utility-inner">
          <ul className="utility-list">
            <li><Link href="/contact/#map"><Icon name="map-pin" />{SITE.address.short}</Link></li>
            <li><a href={`mailto:${SITE.email}`}><Icon name="mail" />{SITE.email}</a></li>
          </ul>
          <ul className="utility-list">
            <li><ModalLink modal="callback"><Icon name="phone" />Request a Call Back</ModalLink></li>
            <li><Link href="/careers/"><Icon name="briefcase" />Careers</Link></li>
            <li><button type="button" onClick={() => openModal('palette')}><Icon name="search" />Search <kbd>Ctrl&nbsp;K</kbd></button></li>
          </ul>
        </div>
      </div>

      <div className="container header-bar">
        <Link className="logo" href="/" aria-label="Medzak Healthcare — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/logo.png" srcSet="/assets/images/thumbs/logo-320.png 320w, /assets/images/logo.png 800w" sizes="150px" alt="Medzak Healthcare Pvt. Ltd." width={800} height={197} />
        </Link>

        <nav className={`main-menu${menuOpen ? ' is-open' : ''}`} id="site-menu" aria-label="Main">
          <ul className="nav-list">
            {NAV.map((tab) => (
              <NavTabItem
                key={tab.id} tab={tab} current={isCurrent(tab)} open={openId === tab.id}
                onHover={onHover} onLeave={onLeave} onToggle={onToggle} onClose={onClose} onNavigate={onNavigate}
              />
            ))}
            <li className="nav-demo">
              <ModalLink modal="bookDemo" className="btn btn--primary btn--block">{MENU_DEMO.label}</ModalLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button type="button" className="search-btn icon-btn" aria-label="Search the site" title="Search (Ctrl+K)" onClick={() => openModal('palette')}>
            <Icon name="search" />
          </button>
          <button
            type="button" className="theme-toggle icon-btn" onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} aria-pressed={theme === 'dark'} title="Toggle light / dark theme"
          >
            <Icon name="moon" className="i-moon" />
            <Icon name="sun" className="i-sun" />
          </button>
          <ModalLink modal="bookDemo" className="btn btn--primary btn--sm header-cta">BOOK A DEMO</ModalLink>
          <button
            type="button" className="nav-toggle icon-btn" aria-expanded={menuOpen} aria-controls="site-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name="menu" className="i-menu" />
            <Icon name="x" className="i-close" />
          </button>
        </div>
      </div>
      <div className="header-progress" aria-hidden="true"><span ref={progressRef} /></div>
    </header>
  );
}
