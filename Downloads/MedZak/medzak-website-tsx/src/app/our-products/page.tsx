import { PageShell } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ProductTabs } from '@/components/ProductTabs';
import { PRODUCTS } from '@/data/products';
import { SITE } from '@/data/site';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('products');

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': PRODUCTS.map((p) => ({
            '@type': 'Product',
            name: p.name,
            description: p.paragraphs[0],
            image: `${SITE.url}/${p.image.src}`,
            brand: { '@type': 'Brand', name: 'Medzak' },
            manufacturer: { '@id': `${SITE.url}/#org` },
          })),
        }}
      />
      <PageShell>
        <PageHero trail={[{ label: 'Our Products', href: '/our-products/' }]} titleId="prod-title" icon="eye" title="Our Products" intro="Diagnostic Platforms & Optical Systems" />
        <section className="section" aria-label="Products">
          <div className="container"><ProductTabs /></div>
        </section>
      </PageShell>
    </>
  );
}
