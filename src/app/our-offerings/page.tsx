import type { Metadata } from 'next';
import { RedirectNotice } from '@/components/RedirectNotice';

export const metadata: Metadata = {
  title: { absolute: 'Our Offerings | Medzak Healthcare' },
  alternates: { canonical: 'https://medzak.co/our-products/' },
  robots: { index: false, follow: true },
};

export default function OurOfferings() {
  return <RedirectNotice to="/our-products/" label="Our Products" />;
}
