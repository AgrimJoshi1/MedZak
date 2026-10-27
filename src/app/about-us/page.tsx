import Link from '@/components/Link';
import { Icon } from '@/components/Icon';
import { PageShell } from '@/components/Footer';
import { Milestones } from '@/components/Milestones';
import { PageHero } from '@/components/PageHero';
import { Photo } from '@/components/Photo';
import { SITE } from '@/data/site';
import { TEAM } from '@/data/team';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('about');

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        trail={[{ label: 'About Us', href: '/about-us/' }]} titleId="about-title" icon="users" title="About Medzak"
        intro="Founded in 2018, Medzak Healthcare started with a mission to close the gap between the world’s growing burden of eye and metabolic disease and the diagnostic tools available to detect it early — before it becomes expensive, invasive, or irreversible."
      />

      <section className="section" aria-label="Mission, vision and solution">
        <div className="container split split--even" style={{ alignItems: 'start' }}>
          <div className="about-visual about-visual--tall" data-reveal>
            <figure className="about-photo about-photo--tall">
              <Photo src="assets/images/gallery/7.JPG" alt="Medzak presentation on ocular diagnosis as a public-health challenge in developing countries" sizes="(min-width: 1000px) 560px, calc(100vw - 36px)" priority />
            </figure>
          </div>
          <ul className="mvp mvp--stack">
            <li className="mvp-item mvp-item--lead" id="mission" data-reveal data-spot>
              <h2 className="with-icon"><Icon name="target" />Our Mission</h2>
              <p>Our mission is to create innovative solutions that enhance human well-being through accessible, user-friendly, portable technologies. We are committed to developing sustainable products that foster health and accessibility through AI &amp; Deeptech solutions.</p>
            </li>
            <li className="mvp-item" id="vision" data-reveal data-spot style={{ ['--d' as string]: '90ms' }}>
              <h2 className="with-icon"><Icon name="eye" />Our Vision</h2>
              <p>We envision a future where innovative solutions empower communities in remote and underdeveloped areas to thrive with quality healthcare technology.</p>
            </li>
            <li className="mvp-item" id="solution" data-reveal data-spot style={{ ['--d' as string]: '180ms' }}>
              <h2 className="with-icon"><Icon name="lightbulb" />Our Solution</h2>
              <p>Portable AI-based advanced deep tech solutions to non-invasively diagnose using surface sensing for various medical applications.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--rule section--wash" aria-labelledby="timeline-title">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title" id="timeline-title" data-reveal="mask">Recognition by year</h2>
              <p className="section-sub" style={{ marginTop: 10 }}>Awards and selections from the Achievements page, in the order they happened.</p>
            </div>
            <Link className="link-arrow" href="/achievements/">All achievements <Icon name="arrow-right" /></Link>
          </div>
          <Milestones />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="about-team-title">
        <div className="container team-teaser">
          <div className="team-teaser__copy">
            <h2 id="about-team-title" className="section-title" data-reveal="mask">Our Team</h2>
            <p className="muted measure">The minds behind Medzak. Meet the researchers and engineers building our diagnostics.</p>
            <div className="teaser-actions">
              <Link className="btn btn--secondary" href="/our-team/">Meet the Team <Icon name="arrow-right" /></Link>
              <Link className="btn btn--ghost" href="/our-products/">Explore Products <Icon name="arrow-right" /></Link>
            </div>
          </div>
          <ul className="avatar-stack" aria-label="Team members">
            {TEAM.map((p, i) => (
              <li key={p.name} style={{ ['--i' as string]: i }} data-reveal>
                <Photo src={p.src} alt={p.alt} sizes="120px" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--rule section--tight" aria-label="Medzak Healthcare">
        <div className="container brand-close">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/logo.png" srcSet="/assets/images/thumbs/logo-320.png 320w, /assets/images/logo.png 800w" sizes="240px" alt="Medzak Healthcare Pvt. Ltd." width={800} height={197} loading="lazy" decoding="async" />
          <p className="muted">{SITE.tagline}</p>
          <span className="chip"><Icon name="shield-check" />Founded in {SITE.founded} &bull; {SITE.legalName}</span>
        </div>
      </section>
    </PageShell>
  );
}
