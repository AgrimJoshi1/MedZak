import Link from '@/components/Link';
import { SITE, SUPPORTERS, TICKER } from '@/data/site';
import { PointerField } from './Behaviors';
import { EyePlate } from './EyePlate';
import { Icon } from './Icon';
import { Instruments } from './Instruments';
import { ModalityViewer } from './ModalityViewer';
import { ModalLink } from './Modal';
import { PulseLine, RetinaVessels } from './Motifs';
import { Photo } from './Photo';
import { TickerToggle } from './TickerToggle';

/* ------------------------------------------------------------------ hero */
/** A dark "scan bay": the instrument is lit, the page around it is quiet. The eye follows the pointer (PointerField). */
export function Hero() {
  return (
    <PointerField className="hero deep" aria-labelledby="hero-title">
      <RetinaVessels className="hero-vessels" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">AI-Powered Diagnostic Innovations for Early Detection, Made Simple</h1>
          <p className="hero-lead">
            Medzak Healthcare delivers medical-grade ocular and metabolomic diagnostics for hospitals, labs, and outreach camps. Patented, clinically validated technology built for early detection — without the high cost of traditional equipment.
          </p>
          <div className="hero-actions">
            <ModalLink modal="bookDemo" className="btn btn--primary btn--lg">BOOK A DEMO <Icon name="arrow-right" /></ModalLink>
            <Link href="/our-products/" className="btn btn--on-deep btn--lg"><span className="play"><Icon name="play" /></span>Watch More</Link>
          </div>
          <ul className="chip-row hero-trust">
            <li className="chip brand-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/logo.png" srcSet="/assets/images/thumbs/logo-320.png 320w, /assets/images/logo.png 800w" sizes="68px" alt="Medzak Healthcare Pvt. Ltd." width={800} height={197} />
              <span className="rule" aria-hidden="true" />
              <span className="estd">Estd. {SITE.founded}</span>
            </li>
            <li className="chip"><Icon name="shield-check" />Patented optical technology</li>
            <li className="chip"><Icon name="check-circle" />Clinically validated AI</li>
          </ul>
        </div>
        <EyePlate />
      </div>
      <PulseLine className="hero-pulse" />
    </PointerField>
  );
}

/* ---------------------------------------------------------------- ticker */
function LinkedInMark() {
  return (
    <svg className="li-icon" aria-hidden="true" focusable="false"><use href="#i-linkedin-brand" /></svg>
  );
}

export function Ticker() {
  const set = (copy: 'a' | 'b') => (
    <>
      {copy === 'a' && <span className="ticker-tag">{SITE.tagline}</span>}
      {TICKER.map((text) => (
        <div className="ticker-item" key={`${copy}-${text}`}>
          <Link href="/achievements/" tabIndex={copy === 'b' ? -1 : undefined}><LinkedInMark />{text}</Link>
        </div>
      ))}
    </>
  );
  return (
    <section className="ticker" id="news" aria-label="Medzak latest LinkedIn updates and announcements">
      <h2 className="sr-only">Latest from LinkedIn</h2>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {set('a')}
          <div style={{ display: 'contents' }} aria-hidden="true">{set('b')}</div>
        </div>
      </div>
      <TickerToggle />
    </section>
  );
}

/* ------------------------------------------------------------ action dock */
const START = [
  { title: 'Book a Demo', desc: 'Get a firsthand experience of the technology', modal: 'bookDemo' as const, icon: 'calendar' },
  { title: 'Request a Call Back', desc: 'Leave your details and we will get in touch', modal: 'callback' as const, icon: 'phone' },
  { title: 'Explore Products', desc: 'MeiboX, Metabo-X and VuOpt', href: '/our-products/', icon: 'eye' },
  { title: 'Contact Us', desc: 'Questions about partnerships or demos?', href: '/contact/', icon: 'message' },
];

/** Four ways in, lifted over the bottom edge of the hero. The first (BOOK A DEMO) is the loudest. */
export function StartHere() {
  return (
    <section className="dock" aria-label="Quick actions">
      <div className="container">
        <ul className="dock-list">
          {START.map((s, i) => {
            const body = (
              <>
                <span className="dock-icon"><Icon name={s.icon} /></span>
                <span className="dock-text"><span className="dock-title">{s.title}</span><span className="dock-desc">{s.desc}</span></span>
                <Icon name="arrow-right" className="dock-arrow" />
              </>
            );
            const cls = `dock-item${i === 0 ? ' dock-item--primary' : ''}`;
            return (
              <li key={s.title} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
                {s.modal ? <ModalLink modal={s.modal} className={cls}>{body}</ModalLink> : <Link href={s.href!} className={cls}>{body}</Link>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ how it works */
const STEPS = [
  { title: 'Capture', text: 'A portable, handheld device combines IR, visible, ultrasonic, and fluorescence imaging in one system.' },
  { title: 'Analyze', text: 'AI-guided diagnosis reads the imaging.' },
  { title: 'Detect', text: 'Detects 10 major surface eye diseases in under 2 minutes.' },
  { title: 'Reach', text: 'No specialist equipment or long OPD queues required. Built for hospitals, labs, and outreach camps.' },
];

export function HowItWorks() {
  return (
    <section className="section section--white" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title" id="how-title" data-reveal="mask">How MeiboX works</h2>
            <p className="section-sub" style={{ marginTop: 10 }}>From capture to detection in under 2 minutes, with no specialist equipment.</p>
          </div>
        </div>
        <div className="how-grid">
          <ModalityViewer />
          <ol className="stepper">
            {STEPS.map((s, i) => (
              <li className="stepper-item" key={s.title} data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="stepper-n">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- facts band */
export function Facts() {
  return <Instruments />;
}

/* ----------------------------------------------------------- who we serve */
const SERVE = [
  { name: 'Hospitals', text: 'Hospital-grade screening for OPDs, with no specialist equipment or long OPD queues required.', link: { label: 'MeiboX', href: '/our-products/#meibox' }, img: { src: 'assets/images/hero-eye.jpg', alt: 'Close-up of a human eye with a glowing digital scanning overlay' }, icon: 'building' },
  { name: 'Labs', text: 'Metabo-X analyzes disease-linked metabolites from a simple blood sample.', link: { label: 'Metabo-X', href: '/our-products/#metabo-x' }, img: { src: 'assets/images/metabo-x.jpg', alt: 'Blood sample tube with magnified metabolite molecules and a spectrum readout beside a lab analyser' }, icon: 'flask' },
  { name: 'Outreach camps', text: 'Portable, affordable screening that reaches outreach camps and underserved communities.', link: { label: 'MeiboX', href: '/our-products/#meibox' }, img: { src: 'assets/images/gallery/9.JPG', alt: 'Medzak presenting to a seated audience' }, icon: 'users' },
];

export function WhoWeServe() {
  return (
    <section className="section section--rule" id="who-we-serve" aria-labelledby="serve-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title" id="serve-title" data-reveal="mask">Who we serve</h2>
            <p className="section-sub" style={{ marginTop: 10 }}>Medical-grade ocular and metabolomic diagnostics for hospitals, labs, and outreach camps.</p>
          </div>
        </div>
        <ul className="serve-grid">
          {SERVE.map((s, i) => (
            <li className="serve-card" key={s.name} data-spot data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
              <div className="serve-photo duo"><Photo src={s.img.src} alt={s.img.alt} sizes="(min-width: 1000px) 400px, (min-width: 640px) 50vw, calc(100vw - 36px)" /></div>
              <div className="serve-body">
                <h3 className="serve-name with-icon"><Icon name={s.icon} />{s.name}</h3>
                <p>{s.text}</p>
                <Link className="link-arrow" href={s.link.href}>{s.link.label} <Icon name="arrow-right" /></Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ about */
export function AboutSection() {
  return (
    <section id="about" className="section section--rule section--white" aria-labelledby="about-title">
      <div className="container">
        <div className="split split--even">
          <div className="about-copy">
            <h2 className="section-title" id="about-title" data-reveal="mask">About Us</h2>
            <p className="about-lead">
              Founded in {SITE.founded}, Medzak Healthcare started with a mission to close the gap between the world’s growing burden of eye and metabolic disease and the diagnostic tools available to detect it early — before it becomes expensive, invasive, or irreversible.
            </p>
            <h3 className="check-title">Why Medzak</h3>
            <ul className="check-list">
              {['Patented optical technology', 'Clinically validated AI', 'Portable, non-invasive diagnostics using surface sensing', 'Built for hospitals, labs, and outreach camps'].map((t) => (
                <li key={t}><Icon name="check" /><span>{t}</span></li>
              ))}
            </ul>
            <Link className="link-arrow" href="/about-us/" style={{ marginTop: 26 }}>Read our story <Icon name="arrow-right" /></Link>
          </div>
          <div className="about-visual" data-reveal>
            <figure className="about-photo">
              <Photo src="assets/images/gallery/10.jpeg" alt="Medzak presenting at the Punjab Investor Circle" sizes="(min-width: 1000px) 560px, calc(100vw - 36px)" />
              <figcaption>Founded in {SITE.founded} &bull; Medzak Healthcare Pvt. Ltd.</figcaption>
            </figure>
          </div>
        </div>
        <ul className="mvp">
          <li className="mvp-item mvp-item--lead" data-reveal data-spot>
            <h3 className="with-icon"><Icon name="target" />Our Mission</h3>
            <p>To build portable, affordable, AI-powered diagnostic devices for ocular and metabolic health, that bring hospital-grade screening to OPDs, outreach camps, and underserved communities.</p>
          </li>
          <li className="mvp-item" data-reveal data-spot style={{ ['--d' as string]: '90ms' }}>
            <h3 className="with-icon"><Icon name="eye" />Our Vision</h3>
            <p>To see a world where no patient loses their sight, or their health, to a disease that could have been caught early.</p>
          </li>
          <li className="mvp-item" data-reveal data-spot style={{ ['--d' as string]: '180ms' }}>
            <h3 className="with-icon"><Icon name="lightbulb" />Our Solution</h3>
            <p>Across two platforms, MeiboX for ocular diagnostics and Metabo-X for metabolic risk prediction, we combine imaging, AI, and clinical validation into devices that are fast, low-cost, and built for real-world care.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function TaglineBand() {
  return (
    <div className="tagline-band">
      <PulseLine className="tagline-pulse" />
      <div className="container"><p className="tagline" data-reveal="mask">{SITE.tagline}</p></div>
    </div>
  );
}

/* ------------------------------------------------------------- supporters */
export function SupportersSection({ title = 'Supporters and Funders', sub }: { title?: string; sub?: string }) {
  return (
    <section id="supporters" className="section section--rule section--white" aria-labelledby="supporters-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title" id="supporters-title" data-reveal="mask">{title}</h2>
            {sub && <p className="section-sub" style={{ marginTop: 10 }}>{sub}</p>}
          </div>
        </div>
        <ul className="logo-wall">
          {SUPPORTERS.map((s) => (
            <li key={s.key} data-spot>
              <picture>
                <source srcSet={`/assets/images/thumbs/supporter-${s.key}-mark.jpg`} />
                <Photo src={`assets/images/supporter-${s.key}.jpg`} alt={s.alt} />
              </picture>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- teasers */
export function Teasers() {
  return (
    <section className="section section--tight" aria-labelledby="teasers-title">
      <h2 id="teasers-title" className="sr-only">Careers and contact</h2>
      <div className="container">
        <div className="teaser-grid">
          <article className="teaser teaser--wash" data-reveal data-spot>
            <h3 className="with-icon"><Icon name="briefcase" />Build the future of diagnostics</h3>
            <p className="muted">Write to us and tell us how you’d like to contribute. Send your resume to</p>
            <div className="teaser-actions">
              <a className="btn btn--secondary" href={`mailto:${SITE.careersEmail}`}><Icon name="mail" />{SITE.careersEmail}</a>
              <Link className="btn btn--ghost" href="/careers/">Careers <Icon name="arrow-right" /></Link>
            </div>
          </article>
          <article className="teaser teaser--deep deep" data-reveal data-spot style={{ ['--d' as string]: '90ms' }}>
            <h3 className="with-icon"><Icon name="message" />We’d love to hear from you</h3>
            <p>Questions about partnerships or demos? Drop us a note.</p>
            <div className="teaser-actions">
              <Link className="btn btn--on-deep" href="/contact/#contact-form"><Icon name="send" />Send a Message</Link>
              <Link className="btn btn--ghost-on-deep" href="/contact/">Contact page <Icon name="arrow-right" /></Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
