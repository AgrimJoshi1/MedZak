import Link from '@/components/Link';
import { AchievementsCarousel, GalleryMasonry } from '@/components/Galleries';
import { Icon } from '@/components/Icon';
import { PageShell } from '@/components/Footer';
import { AboutSection, Facts, Hero, HowItWorks, StartHere, SupportersSection, TaglineBand, Teasers, Ticker, WhoWeServe } from '@/components/HomeSections';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/data/site';
import { ACHIEVEMENTS, GALLERY } from '@/data/tiles';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('home');

// 10.jpeg is the About photo on this page, so the masonry uses other shots
const PREVIEW = ['5.JPG', '2.jpg', '7.JPG', '12.jpg', '4.jpg', '15.jpeg', '18.jpg', '21.jpg', '9.JPG'];
const preview = PREVIEW.map((f) => GALLERY.find((t) => t.src.endsWith(`/${f}`))!);

const organization = {
  '@type': ['Organization', 'MedicalBusiness'],
  '@id': `${SITE.url}/#org`,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/assets/images/logo.png`,
  image: `${SITE.url}/assets/images/gallery/10.jpeg`,
  description: 'Medzak Healthcare delivers medical-grade ocular and metabolomic diagnostics for hospitals, labs and outreach camps — built for early detection.',
  foundingDate: String(SITE.founded),
  email: SITE.email,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.locality, addressRegion: SITE.address.region, postalCode: SITE.address.postalCode, addressCountry: 'IN' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [organization, { '@type': 'WebSite', name: SITE.name, url: `${SITE.url}/`, publisher: { '@id': `${SITE.url}/#org` } }] }} />
      <PageShell hideFooterSupporters>
        <Hero />
        <StartHere />
        <Ticker />
        <HowItWorks />
        <Facts />
        <WhoWeServe />
        <AboutSection />
        <TaglineBand />
        <section className="section section--rule section--wash" id="recognition" aria-labelledby="recognition-title">
          <div className="container"><AchievementsCarousel items={ACHIEVEMENTS} /></div>
        </section>
        <section className="section section--rule" id="gallery-preview" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-head">
              <div>
                <h2 className="section-title" id="gallery-title">Gallery</h2>
                <p className="section-sub" style={{ marginTop: 10 }}>Moments &amp; Milestones</p>
              </div>
              <Link className="link-arrow" href="/gallery-media/">Open the gallery <Icon name="arrow-right" /></Link>
            </div>
            <GalleryMasonry items={preview} mosaic />
          </div>
        </section>
        <SupportersSection />
        <Teasers />
      </PageShell>
    </>
  );
}
