import { PageShell } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { Photo } from '@/components/Photo';
import { SITE } from '@/data/site';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('careers');

const WHY = ['Patented optical technology', 'Clinically validated AI', 'Portable, non-invasive diagnostics using surface sensing', 'Built for hospitals, labs, and outreach camps'];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero trail={[{ label: 'Careers', href: '/careers/' }]} titleId="car-title" icon="briefcase" title="Careers" intro="Build the future of diagnostics" />

      <section className="section section--tight" aria-label="Join us">
        <div className="container">
          <div className="join-grid">
            <div className="join-main" data-reveal>
              <h2 className="section-title">Join us</h2>
              <p className="join-lead">Send your resume to</p>
              <p><a className="btn btn--primary btn--lg" href={`mailto:${SITE.careersEmail}`}><Icon name="mail" />{SITE.careersEmail}</a></p>
            </div>
            <div className="join-why deep" data-reveal data-spot style={{ ['--d' as string]: '90ms' }}>
              <h3>Why Medzak</h3>
              <ul className="check-list">
                {WHY.map((t) => <li key={t}><Icon name="check" /><span>{t}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight section--rule" aria-label="Life at Medzak">
        <div className="container">
          <ul className="photo-strip">
            <li data-reveal><Photo src="assets/images/gallery/5.JPG" alt="Medzak team on stage at an award ceremony" sizes="(min-width: 900px) 40vw, 90vw" /></li>
            <li data-reveal style={{ ['--d' as string]: '90ms' }}><Photo src="assets/images/gallery/21.jpg" alt="Medzak at a National Startup Day event" sizes="(min-width: 900px) 30vw, 90vw" /></li>
            <li data-reveal style={{ ['--d' as string]: '180ms' }}><Photo src="assets/images/gallery/18.jpg" alt="Medzak founder in conversation at an event" sizes="(min-width: 900px) 30vw, 90vw" /></li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
