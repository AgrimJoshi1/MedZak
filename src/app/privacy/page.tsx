import { PageShell } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('privacy');

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero trail={[{ label: 'Privacy Policy', href: '/privacy/' }]} titleId="privacy-title" icon="shield-check" title="Privacy Policy" intro="[Add real content]" />
      <section className="section section--tight" aria-label="Page content">
        <div className="container container--narrow">
          <p className="legal-note">[Add real content] This page is a placeholder. Replace it with Medzak Healthcare’s published privacy policy before launch.</p>
        </div>
      </section>
    </PageShell>
  );
}
