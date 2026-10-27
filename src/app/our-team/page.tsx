import { PageShell } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { TeamGrid } from '@/components/TeamGrid';
import { TEAM } from '@/data/team';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('team');

export default function TeamPage() {
  return (
    <PageShell>
      <PageHero
        trail={[{ label: 'About Us', href: '/about-us/' }, { label: 'Our Team', href: '/our-team/' }]} titleId="team-title" icon="users" title="Our Team"
        intro="The minds behind Medzak. Meet the researchers and engineers building our diagnostics."
      />
      <section className="section section--tight" aria-label="Team members">
        <div className="container"><TeamGrid people={TEAM} /></div>
      </section>
    </PageShell>
  );
}
