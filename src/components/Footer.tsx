import Link from '@/components/Link';
import type { ReactNode } from 'react';
import { SITE, SUPPORTERS } from '@/data/site';
import { Brand } from './RichText';
import { Icon } from './Icon';
import { ModalLink } from './Modal';
import { RetinaVessels } from './Motifs';
import { Photo } from './Photo';

export function CtaBand() {
  return (
    <section className="cta-band deep" aria-labelledby="cta-title">
      <RetinaVessels className="band-vessels" />
      <div className="container cta-inner">
        <div>
          <h2 id="cta-title">Are you interested in effective and affordable ocular care?</h2>
          <p>We will be happy to offer you a firsthand experience of the technology</p>
        </div>
        <div className="cta-actions">
          <ModalLink modal="bookDemo" className="btn btn--primary btn--lg">BOOK A DEMO <Icon name="arrow-right" /></ModalLink>
          <ModalLink modal="callback" className="btn btn--on-deep btn--lg"><Icon name="phone" />Request a Call Back</ModalLink>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ hideSupporters = false }: { hideSupporters?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="footer-logo" href="/" aria-label="Medzak Healthcare — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/logo.png" srcSet="/assets/images/thumbs/logo-320.png 320w, /assets/images/logo.png 800w" sizes="150px" alt="Medzak Healthcare Pvt. Ltd." width={800} height={197} loading="lazy" decoding="async" />
            </Link>
            <p className="footer-tagline">{SITE.tagline}</p>
            <span className="chip"><Icon name="shield-check" />Estd. {SITE.founded}</span>
          </div>
          <div>
            <h2 className="widget-title">Solutions</h2>
            <ul className="links-list">
              <li><Link href="/our-products/#meibox">MeiboX</Link></li>
              <li><Link href="/our-products/#vuopt">VuOpt</Link></li>
              <li><Link href="/our-products/#metabo-x">Metabo-X</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="widget-title"><Brand /></h2>
            <ul className="links-list">
              <li><Link href="/about-us/">About Us</Link></li>
              <li><Link href="/our-products/">Our Products</Link></li>
              <li><Link href="/achievements/">Achievements &amp; Media</Link></li>
              <li><Link href="/gallery-media/">Gallery</Link></li>
              <li><Link href="/careers/">Careers</Link></li>
              <li><Link href="/contact/">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="widget-title">Contacts</h2>
            <ul className="info">
              <li><Icon name="map-pin" /><address>{SITE.address.lines[0]}<br />{SITE.address.lines[1]}</address></li>
              <li><Icon name="mail" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="phone" /><ModalLink modal="callback">Request a Call Back</ModalLink></li>
            </ul>
          </div>
        </div>

        {!hideSupporters && <SupportersStrip />}

        <div className="footer-notices">
          <p className="notice"><Icon name="info" /><span><strong>Medical disclaimer.</strong> The information on this website is for general information only and is not a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of a qualified health professional with any question about a medical condition.</span></p>
          <p className="notice"><Icon name="alert" /><span><strong>Advisory.</strong> Medzak never asks for bank details, passwords or payments by phone, email or message. If you receive such a request, please report it to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</span></p>
        </div>

        <div className="footer-bottom">
          <div className="copyright-text"><p>&copy; {SITE.founded} All Rights Reserved</p></div>
          <ul className="footer-legal">
            <li><Link href="/privacy/">Privacy Policy</Link></li>
            <li><Link href="/terms/">Terms of Use</Link></li>
          </ul>
          <a className="footer-top" href="#main">Back to top <Icon name="chevron-up" /></a>
        </div>
      </div>
    </footer>
  );
}

function SupportersStrip() {
  return (
    <div className="footer-trust" aria-label="Supporters and funders">
      <span className="footer-trust-label">Backed by</span>
      <ul className="footer-logos">
        {SUPPORTERS.map((s) => (
          <li key={s.key}>
            <picture>
              <source srcSet={`/assets/images/thumbs/supporter-${s.key}-mark.jpg`} />
              <Photo src={`assets/images/supporter-${s.key}.jpg`} alt={s.alt} />
            </picture>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Wraps a page's content: the <main> landmark, the closing call to action and the footer. */
export function PageShell({ children, hideFooterSupporters = false }: { children: ReactNode; hideFooterSupporters?: boolean }) {
  return (
    <>
      <main id="main">{children}</main>
      <CtaBand />
      <SiteFooter hideSupporters={hideFooterSupporters} />
    </>
  );
}
