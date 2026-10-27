import { PageShell } from '@/components/Footer';
import { GalleryMasonry } from '@/components/Galleries';
import { PageHero } from '@/components/PageHero';
import { GALLERY } from '@/data/tiles';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('gallery');

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHero trail={[{ label: 'Gallery', href: '/gallery-media/' }]} titleId="gm-title" icon="image" title="Gallery" intro="Moments & Milestones" />
      <section className="section section--tight" aria-label="Photo gallery">
        <div className="container"><GalleryMasonry items={GALLERY} wide /></div>
      </section>
    </PageShell>
  );
}
