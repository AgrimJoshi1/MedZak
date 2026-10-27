import type { Metadata } from 'next';
import { PAGES } from '@/data/pages';
import { SITE } from '@/data/site';

/** Next.js metadata for a page, from src/data/pages.ts (identical to the previous site's <head> values). */
export function pageMetadata(key: keyof typeof PAGES): Metadata {
  const p = PAGES[key];
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: p.canonical ? { canonical: p.canonical } : undefined,
    robots: p.noindex ? { index: false, follow: true } : undefined,
    openGraph: p.canonical
      ? { type: 'website', siteName: SITE.name, title: p.title, description: p.description, url: p.canonical, images: [SITE.ogImage] }
      : undefined,
  };
}
