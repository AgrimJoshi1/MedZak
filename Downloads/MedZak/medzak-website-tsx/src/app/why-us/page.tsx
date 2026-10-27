import type { Metadata } from 'next';
import { RedirectNotice } from '@/components/RedirectNotice';

export const metadata: Metadata = {
  title: { absolute: 'Why Us | Medzak Healthcare' },
  alternates: { canonical: 'https://medzak.co/about-us/' },
  robots: { index: false, follow: true },
};

export default function WhyUs() {
  return <RedirectNotice to="/about-us/" label="About Us" />;
}
