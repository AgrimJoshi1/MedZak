import Link from '@/components/Link';
import { PageShell } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { ModalLink } from '@/components/Modal';
import { RetinaVessels } from '@/components/Motifs';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('notFound');

export default function NotFound() {
  return (
    <PageShell>
      <section className="page-hero deep" aria-labelledby="nf-title">
        <RetinaVessels className="page-vessels" />
        <div className="container">
          <p className="error-code" aria-hidden="true">404</p>
          <h1 id="nf-title" className="page-title">Page not found</h1>
          <p className="page-intro">The page you are looking for does not exist or may have moved. Try one of these instead.</p>
          <div className="error-actions">
            <Link href="/" className="btn btn--primary btn--lg"><Icon name="home" />Go to Home</Link>
            <Link href="/our-products/" className="btn btn--secondary btn--lg">Our Products <Icon name="arrow-right" /></Link>
            <Link href="/contact/" className="btn btn--ghost btn--lg">Contact Us</Link>
            <ModalLink modal="palette" className="btn btn--ghost btn--lg"><Icon name="search" />Search the site</ModalLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
