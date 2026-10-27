import { PageShell } from '@/components/Footer';
import { RecordGrid } from '@/components/Galleries';
import { SupportersSection } from '@/components/HomeSections';
import { PageHero } from '@/components/PageHero';
import { ACHIEVEMENTS, MEDIA } from '@/data/tiles';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('achievements');

export default function AchievementsPage() {
  return (
    <PageShell hideFooterSupporters>
      <PageHero trail={[{ label: 'Achievements & Media', href: '/achievements/' }]} titleId="ach-title" icon="award" title="Achievements & Media" intro="Recognition & Press">
        <ul className="chip-row jump-links" aria-label="On this page">
          <li><a className="chip" href="#achievements">Achievements</a></li>
          <li><a className="chip" href="#media">Media</a></li>
          <li><a className="chip" href="#supporters">Supporters & Funders</a></li>
        </ul>
      </PageHero>

      <section className="section section--tight" aria-labelledby="achievements">
        <div className="container">
          <h2 className="block-title" id="achievements">Achievements</h2>
          <RecordGrid items={ACHIEVEMENTS} filterByYear />
        </div>
      </section>

      <section className="section section--rule section--tight" aria-labelledby="media">
        <div className="container">
          <h2 className="block-title" id="media">Media</h2>
          <RecordGrid items={MEDIA} />
        </div>
      </section>

      <SupportersSection sub="Government grants & incubators" />
    </PageShell>
  );
}
