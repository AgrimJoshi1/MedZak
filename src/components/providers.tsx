'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { canTransition, prefersReducedMotion, runTransition } from '@/lib/viewTransition';

export type ModalId = 'bookDemo' | 'callback' | 'palette';
export type Theme = 'light' | 'dark';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  modal: ModalId | null;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}

const THEME_KEY = 'medzak-theme';
const THEME_COLORS: Record<Theme, string> = { light: '#F6FAF9', dark: '#061A21' };

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [modal, setModal] = useState<ModalId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // pick up the theme the inline script chose before first paint, and follow the system until the visitor chooses
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark' || current === 'light') setTheme(current);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let stored: string | null = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch { /* storage blocked */ }
      if (!stored) { const next: Theme = mq.matches ? 'dark' : 'light'; applyTheme(next); setTheme(next); }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked */ }
    const apply = () => { applyTheme(next); flushSync(() => setTheme(next)); };
    const root = document.documentElement;
    // the new theme spreads outwards from the toggle; browsers without view transitions fade the colours instead
    if (!canTransition() && !prefersReducedMotion()) {
      root.classList.add('theme-fade');
      window.setTimeout(() => root.classList.remove('theme-fade'), 400);
    }
    const t = runTransition(apply, 'theme');
    if (t) {
      const box = document.querySelector('.theme-toggle')?.getBoundingClientRect();
      const x = box ? box.left + box.width / 2 : window.innerWidth - 60;
      const y = box ? box.top + box.height / 2 : 40;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      t.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        );
      }, () => {});
    }
  }, [theme]);

  const openModal = useCallback((id: ModalId) => { setMenuOpen(false); setModal(id); }, []);
  const closeModal = useCallback(() => setModal(null), []);

  // #bookDemo / #callback in the address bar open that dialog; Ctrl or Cmd + K toggles the search palette
  useEffect(() => {
    const m = window.location.hash.match(/^#(bookDemo|callback)$/);
    if (m) setModal(m[1] as ModalId);
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMenuOpen(false);
        setModal((cur) => (cur === 'palette' ? null : 'palette'));
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo<AppState>(
    () => ({ theme, toggleTheme, modal, openModal, closeModal, menuOpen, setMenuOpen }),
    [theme, toggleTheme, modal, openModal, closeModal, menuOpen],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
