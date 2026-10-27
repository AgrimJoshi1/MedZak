import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { Behaviors } from '@/components/Behaviors';
import { ConsentNotice, FloatCallback, QuickBar, ScrollTop } from '@/components/FloatingUI';
import { IconSprite } from '@/components/Icon';
import { Modals } from '@/components/Modals';
import { PageTransitions } from '@/components/PageTransitions';
import { AppProvider } from '@/components/providers';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE } from '@/data/site';

import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/header.css';
import '../styles/sections.css';
import '../styles/components.css';
import '../styles/pages.css';
import '../styles/enhance.css';
import '../styles/smooth.css';

/** Atkinson Hyperlegible Next: designed by the Braille Institute for maximum legibility. Self-hosted, no CDN. */
const atkinson = localFont({
  src: [
    { path: '../fonts/atkinson-hyperlegible-next-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/atkinson-hyperlegible-next-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/atkinson-hyperlegible-next-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/atkinson-hyperlegible-next-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/atkinson-hyperlegible-next-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/atkinson-hyperlegible-next-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-atkinson',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  icons: { icon: '/assets/images/favicon.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F6FAF9',
  colorScheme: 'light dark',
};

/** Runs before first paint so the page never flashes the wrong theme. */
const THEME_SCRIPT = `(function(d){d.classList.add('js');var s;try{s=localStorage.getItem('medzak-theme')}catch(e){}d.setAttribute('data-theme',s==='dark'||s==='light'?s:(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))})(document.documentElement)`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={atkinson.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <IconSprite />
        <a className="skip-link" href="#main">Skip to content</a>
        <AppProvider>
          <PageTransitions>
            <SiteHeader />
            {children}
            <Modals />
            <QuickBar />
            <FloatCallback />
            <ScrollTop />
            <ConsentNotice />
            <Behaviors />
          </PageTransitions>
        </AppProvider>
      </body>
    </html>
  );
}
