import { ContactForm } from '@/components/ContactForm';
import { PageShell } from '@/components/Footer';
import { Icon } from '@/components/Icon';
import { PageHero } from '@/components/PageHero';
import { SITE } from '@/data/site';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('contact');

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.3183518357396!2d77.0615717!3d28.5902249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b215c878847%3A0x21050ef311edad77!2s39-C%2C%20Sector%206%20Dwarka%2C%20Dwarka%2C%20New%20Delhi%2C%20Delhi%2C%20110075!5e0!3m2!1sen!2sin!4v1716374371785!5m2!1sen!2sin';

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero trail={[{ label: 'Contact Us', href: '/contact/' }]} titleId="contact-title" icon="message" title="Contact Us" />

      <section className="section section--tight" aria-label="Contact details">
        <div className="container">
          <div className="contact-list">
            <article className="contact-item" data-reveal data-spot>
              <h2 className="with-icon"><Icon name="map-pin" />Office Location</h2>
              <p>Plot-39C, Sector 6 Dwarka,<br />New Delhi, Delhi 110075</p>
              <a className="link-arrow" href="#map">See the map <Icon name="arrow-right" /></a>
            </article>
            <article className="contact-item" data-reveal data-spot style={{ ['--d' as string]: '90ms' }}>
              <h2 className="with-icon"><Icon name="mail" />Have a question?</h2>
              <p>For inquiries, contact:</p>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            </article>
            <article className="contact-item" data-reveal data-spot style={{ ['--d' as string]: '180ms' }}>
              <h2 className="with-icon"><Icon name="briefcase" />Join us</h2>
              <p>Send your resume to</p>
              <p><a href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a></p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--rule section--wash" aria-labelledby="form-title">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title" id="form-title">Send Us a Message</h2>
              <p className="section-sub" style={{ marginTop: 10, maxWidth: '52ch' }}>Questions about our diagnostics, a demo, a partnership or a career? Fill in the form and our team will get back to you.</p>
            </div>
          </div>
          <div className="contact-split">
            <ContactForm />
            <div className="map-wrap" id="map">
              <iframe title="Map showing Medzak Healthcare, Plot-39C, Sector 6 Dwarka, New Delhi" src={MAP_SRC} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
