import Link from '@/components/Link';
import type { ReactNode } from 'react';
import { HeroRings, PulseLine, RetinaVessels } from './Motifs';

export interface Crumb { label: string; href: string }

/**
 * Inner pages open on the same dark "scan bay" as the Home hero, in a shorter form: breadcrumb, title, one line of
 * intro, and scanner rings around an icon for the page's subject.
 */
export function PageHero({ trail, title, titleId, intro, icon = 'eye', children }: { trail: Crumb[]; title: ReactNode; titleId: string; intro?: ReactNode; icon?: string; children?: ReactNode }) {
  const last = trail[trail.length - 1];
  return (
    <section className="page-hero deep" aria-labelledby={titleId}>
      <RetinaVessels className="page-vessels" />
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              {trail.slice(0, -1).map((c) => (
                <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
              ))}
              <li aria-current="page">{last.label}</li>
            </ol>
          </nav>
          <h1 id={titleId} className="page-title">{title}</h1>
          {intro && <p className="page-intro">{intro}</p>}
          {children}
        </div>
        <HeroRings icon={icon} />
      </div>
      <PulseLine className="page-pulse" />
    </section>
  );
}
