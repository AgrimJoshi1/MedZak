import { PageShell } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('terms');

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero trail={[{ label: 'Terms of Use', href: '/terms/' }]} titleId="terms-title" icon="shield-check" title="Terms of Use" intro="[Add real content]" />
      <section className="section section--tight" aria-label="Page content">
        <div className="container container--narrow">
          <p className="legal-note">[Add real content] This page is a placeholder. Replace it with Medzak Healthcare’s published terms of use before launch.</p>
        </div>
      </section>
    </PageShell>
  );
}
