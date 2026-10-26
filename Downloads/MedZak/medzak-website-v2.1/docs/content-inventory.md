# Content inventory

Snapshot of every page, section, nav item, image, form and ticker item on the Medzak site, taken before
the "Calm Clinical Intelligence" redesign. It is the checklist that proves nothing was removed:
`python tools/content_inventory.py --check` compares the live pages against `docs/content-baseline.json`
(every text block, alt/aria text, image, link, form field, iframe and linked anchor).

UX problems found during the audit: see [ux-audit.md](ux-audit.md).
Totals: 10 pages · 554 text blocks · 114 image references · 262 link references.


## Navigation (header, all pages)

- **Home** → `index.html` — panel "Welcome to Medzak", view-all "Go to Home" → `index.html`, footer "Innovating for disease prevention" + CTA "Explore Products"
  - About Medzak → `index.html#about` — Mission, vision & solution / Early, affordable AI diagnostics for clinics and outreach camps.
  - News & Updates → `index.html#news` — Straight from our LinkedIn / Selections, awards and challenge wins — as they happen.
  - Supporters & Funders → `index.html#supporters` — Government & incubator partners / Backed by BIRAC, NIDHI-PRAYAS, MeitY, DSIR and RICH.
- **About Us** → `about-us.html` — panel "About Medzak", view-all "Read our story" → `about-us.html`, footer "Founded in 2018 • Medzak Healthcare Pvt. Ltd." + CTA "Meet the Team"
  - Our Mission → `about-us.html#mission` — Accessible, portable technology / Innovative solutions that enhance well-being through AI & Deeptech.
  - Our Vision → `about-us.html#vision` — Quality care for every community / Remote and underdeveloped areas thriving with quality healthcare.
  - Our Solution → `about-us.html#solution` — Non-invasive, AI-based diagnostics / Portable deep-tech that diagnoses using surface sensing.
  - Our Team → `our-team.html` — The minds behind Medzak / Meet the researchers and engineers building our diagnostics.
- **Our Products** → `our-products.html` — panel "Diagnostic Platforms & Optical Systems", view-all "View all products" → `our-products.html`, footer "Patented optical technology • Clinically validated AI" + CTA "Book a Demo"
  - Meibo-X → `our-products.html#meibox` — AI ocular screening · 10 diseases / 4-in-1 handheld imaging, >92% accuracy, results in under 2 minutes.
  - Metabo-X → `our-products.html#metabo-x` — Personalized metabolomics analysis / Detects metabolic disease risk years before symptoms appear.
  - VuOpt → `our-products.html#vuopt` — High-precision multi-element optics / Up to 40% MTF with 5–10 cm detection and low power draw.
- **Achievements & Media** → `achievements.html` — panel "Recognition & Press", view-all "See everything" → `achievements.html`, footer "12 achievements • 13 media features" + CTA "View Achievements"
  - Achievements → `achievements.html#achievements` — 12 milestones & honours / Startup Maha Rathi, TiE Women Global Pitch, BIRAC WInER and more.
  - Media → `achievements.html#media` — 13 features & posts / How TiE Chandigarh, Invest Punjab and others covered our wins.
  - Supporters & Funders → `achievements.html#supporters` — Government grants & incubators / The government bodies and programmes that fund our research.
- **Gallery** → `gallery-media.html` — panel "Moments & Milestones", view-all "Open the gallery" → `gallery-media.html`, footer "24 photos from Startup Mahakumbh, TiE Chandigarh, SHE 4.0 and more" + CTA "Browse Gallery"
  - Medzak at Startup Mahakumbh → `gallery-media.html` — Startup MahaRathi Challenge / Receiving the Startup Maha Rathi award in New Delhi.
  - TiE Women Global Pitch winners → `gallery-media.html` — Startup & Innovation Conclave / Medzak named winner of the TiE Women Global Pitch Competition.
  - Group photo at an event → `gallery-media.html` — SHE 4.0 Pitch Fest / Presenting Medzak from the podium.
  - Speaking at the SHE 4.0 Pitch Fest → `gallery-media.html` — Pitch session / Walking a seated audience through Medzak’s work.
- **Careers** → `careers.html` — panel "Build the future of diagnostics", view-all "Careers" → `careers.html`, footer "Send your resume to director@medzak.co" + CTA "Apply by Email"
  - Join Us → `mailto:director@medzak.co?subject=Career%20at%20Medzak` — Send us your resume / Write to director@medzak.co and tell us how you’d like to contribute.
  - Meet the Team → `our-team.html` — Who you’ll work with / Get to know the people behind Medzak’s AI diagnostics.
  - Our Mission → `about-us.html#mission` — Why we do this / Accessible, portable healthcare technology powered by AI & Deeptech.
- **Contact Us** → `contact.html` — panel "We’d love to hear from you", view-all "Contact page" → `contact.html`, footer "Plot-39C, Sector 6 Dwarka, New Delhi 110075" + CTA "Book a Demo"
  - Send a Message → `contact.html#contact-form` — Use our contact form / Questions about partnerships or demos? Drop us a note.
  - Visit Our Office → `contact.html#map` — Dwarka, New Delhi / Plot-39C, Sector 6 Dwarka, New Delhi, Delhi 110075.
  - Email Us → `mailto:admin@medzak.co` — admin@medzak.co / For general enquiries our team replies by email.
- Header actions: theme toggle (light/dark), "BOOK A DEMO" (opens Book-a-Demo modal), hamburger below 1200px

## index.html

- Title: Medzak Healthcare | AI-Powered Diagnostic Innovations for Early Detection
- `description`: Medzak Healthcare delivers medical-grade ocular and metabolomic diagnostics for hospitals, labs and outreach camps — built for early detection.
- `canonical`: https://medzak.co/
- `og:title`: Medzak Healthcare | AI-Powered Diagnostic Innovations for Early Detection
- `og:description`: Medzak Healthcare delivers medical-grade ocular and metabolomic diagnostics for hospitals, labs and outreach camps — built for early detection.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` hero — "AI-Powered Diagnostic Innovations for Early Detection, Made Simple"
1. `section` news — "Latest from LinkedIn"
1. `section` about — "About Us"
1. `section` supporters — "Supporters and Funders"
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"

**News ticker items (6)**

1. Selected for the RICH-AID Program Start-up Cohort
1. Selected as one of the Top 14 finalists Falling Walls Lab India 2019
1. Shortlisted in Digital Health Start-ups Cohort 2
1. Medzak receives Women Entrepreneur Research Award (WInER Awards Season 3) from BIRAC India-TiE
1. Women in Technology Ignite, India MATLAB Expo 2020
1. Medzak, one of the Top 3 innovators, at the MedTech Challenge’2019 for the innovation.

**Forms**

- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Images (10, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |
| `assets/images/hero-eye.jpg` | Close-up of a human eye with a glowing digital scanning overlay |
| `assets/images/metabo-x.jpg` | Blood sample tube with magnified metabolite molecules and a spectrum readout beside a lab analyser |
| `assets/images/gallery/10.jpeg` | Medzak presenting at the Punjab Investor Circle |
| `assets/images/supporter-birac.jpg` | BIRAC — Biotechnology Ignition Grant (BIG) Scheme |
| `assets/images/supporter-winer.jpg` | BIRAC WInER Award — Women in Entrepreneurial Research |
| `assets/images/supporter-nidhi-prayas.jpg` | NIDHI-PRAYAS — Department of Science & Technology, Government of India |
| `assets/images/supporter-meity.jpg` | MeitY Startup Hub — Ministry of Electronics & Information Technology |
| `assets/images/supporter-dsir.jpg` | DSIR — Department of Scientific and Industrial Research |
| `assets/images/supporter-rich.jpg` | RICH — Research and Innovation Circle of Hyderabad |

Text blocks captured: 76 · links: 26 · ids: 18

## about-us.html

- Title: About Us | Medzak Healthcare
- `description`: Founded in 2018, Medzak Healthcare builds portable, AI-based, non-invasive diagnostic technology for eye and metabolic health.
- `canonical`: https://medzak.co/about-us/
- `og:title`: About Us | Medzak Healthcare
- `og:description`: Founded in 2018, Medzak Healthcare builds portable, AI-based, non-invasive diagnostic technology for eye and metabolic health.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` about-section — "About Medzak"
1. `section` Mission, vision and solution
1. `section` logo-band
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"

**Forms**

- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Images (2, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |
| `assets/images/gallery/7.JPG` | Medzak presentation on ocular diagnosis as a public-health challenge in developing countries |

Text blocks captured: 65 · links: 26 · ids: 16

## our-products.html

- Title: Our Products | Medzak Healthcare
- `description`: Explore MeiboX (4-in-1 AI ocular diagnostics), VuOpt (close-range imaging optics) and Metabo-X (AI-powered metabolomics analysis) from Medzak Healthcare.
- `canonical`: https://medzak.co/our-products/
- `og:title`: Our Products | Medzak Healthcare
- `og:description`: Explore MeiboX (4-in-1 AI ocular diagnostics), VuOpt (close-range imaging optics) and Metabo-X (AI-powered metabolomics analysis) from Medzak Healthcare.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` service-section — "Our Products"
1. `section` bookDemoHm — "Are you interested in effective and affordable ocular care?"
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"

**Forms**

- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Images (4, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |
| `assets/images/offering-meibox.jpg` | MeiboX portable eye-care diagnostic device |
| `assets/images/offering-lens.jpg` | Cross-section render of the VuOpt multi-element lens system |
| `assets/images/metabo-x-product.jpg` | Metabo-X logo: a green medical cross with a molecular structure |

Text blocks captured: 70 · links: 26 · ids: 21

## achievements.html

- Title: Achievements & Media | Medzak Healthcare
- `description`: Awards, recognition and media coverage for Medzak Healthcare, including the BIRAC WInER Award, Falling Walls Lab India 2019 and the MedTech Challenge 2019.
- `canonical`: https://medzak.co/achievements/
- `og:title`: Achievements & Media | Medzak Healthcare
- `og:description`: Awards, recognition and media coverage for Medzak Healthcare, including the BIRAC WInER Award, Falling Walls Lab India 2019 and the MedTech Challenge 2019.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` gallery-section — "Achievements & Media"
1. `section` supporters — "Supporters and Funders"
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"

**Forms**

- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Images (32, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |
| `assets/images/achievements/2026_She_4_0.jpg` | 2026 She Cohort 4.0 — achievement |
| `assets/images/achievements/TiE_2025.jpg` | TiE 2025 — achievement |
| `assets/images/achievements/SM_2024.jpg` | SM 2024 — achievement |
| `assets/images/achievements/BT_2020.jpg` | BT 2020 — achievement |
| `assets/images/achievements/Falling_Walls_Lab_2019.jpg` | Falling Walls 2019 — achievement |
| `assets/images/achievements/BIRAC_Tie_2020.jpg` | BIRAC_TiE 2020 — achievement |
| `assets/images/achievements/Mtalab_2020.jpg` | Matlab 2020 — achievement |
| `assets/images/achievements/IITM_2020.jpg` | IITM 2020 — achievement |
| `assets/images/achievements/FAOBMB_2019.jpg` | FAOBMB 2019 — achievement |
| `assets/images/achievements/MedTech_2019.jpg` | MedTech 2019 — achievement |
| `assets/images/achievements/THub_2017.jpg` | Thub 2017 — achievement |
| `assets/images/achievements/BRICS_2017.jpg` | BRICS 2017 — achievement |
| `assets/images/media/1.jpg` | TiE Chandigarh LinkedIn post announcing the TiE Women 2025 Chandigarh Chapter winners |
| `assets/images/media/2.jpg` | Invest Punjab LinkedIn post on Medzak Healthcare winning the TiE Women Global Pitch Competition 2025 |
| `assets/images/media/3.jpg` | Amar Ujala (Chandigarh) news article, 23 January 2026, on Dr. Varsha Singh’s portable eye-diagnostic device |
| `assets/images/media/4.jpg` | Startup Punjab Newsletter, April 2026, featuring the TiE Startup & Innovation Conclave |
| `assets/images/media/5.jpg` | RICH-AID Program First Startup Cohort announcement featuring Medzak Healthcare |
| `assets/images/media/6.jpg` | RICH-AID page on rich.telangana.gov.in listing the first startup cohort |
| `assets/images/media/7.jpg` | DERBI Foundation post announcing the EMERGE Cohort 2 digital health startups, including Medzak |
| `assets/images/media/8.jpg` | News coverage of the Intel and DST Innovate for Digital India Challenge 2.0 top 10 finalists |
| `assets/images/media/9.jpg` | DWIH New Delhi page on Falling Walls Lab India 2019 |
| `assets/images/media/10.jpg` | Business Standard coverage of Dr. Varsha Singh representing India at the BRICS Young Scientist Conclave, China |
| `assets/images/media/11.jpg` | Startups at SMVDU-TBIC, including Medzak Healthcare |
| `assets/images/media/12.jpg` | Business Standard article: Dr. Varsha Singh, Chitkara University, represents India at the second BRICS Young Scientist Conclave |
| `assets/images/media/13.jpg` | DBT-BIRAC post on the BIOTECH WInER Award, 23 March 2020 |
| `assets/images/supporter-birac.jpg` | BIRAC — Biotechnology Ignition Grant (BIG) Scheme |
| `assets/images/supporter-winer.jpg` | BIRAC WInER Award — Women in Entrepreneurial Research |
| `assets/images/supporter-nidhi-prayas.jpg` | NIDHI-PRAYAS — Department of Science & Technology, Government of India |
| `assets/images/supporter-meity.jpg` | MeitY Startup Hub — Ministry of Electronics & Information Technology |
| `assets/images/supporter-dsir.jpg` | DSIR — Department of Scientific and Industrial Research |
| `assets/images/supporter-rich.jpg` | RICH — Research and Innovation Circle of Hyderabad |

Text blocks captured: 72 · links: 51 · ids: 17

## gallery-media.html

- Title: Gallery | Medzak Healthcare
- `description`: Photo gallery of Medzak Healthcare: events, team, outreach and technology.
- `canonical`: https://medzak.co/gallery-media/
- `og:title`: Gallery | Medzak Healthcare
- `og:description`: Photo gallery of Medzak Healthcare: events, team, outreach and technology.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` gallery-section — "Gallery"
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"

**Forms**

- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Images (25, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |
| `assets/images/gallery/1.png` | Medzak gallery photo 1 |
| `assets/images/gallery/2.jpg` | Medzak gallery photo 2 |
| `assets/images/gallery/3.jpg` | Medzak gallery photo 3 |
| `assets/images/gallery/4.jpg` | Medzak gallery photo 4 |
| `assets/images/gallery/5.JPG` | Medzak gallery photo 5 |
| `assets/images/gallery/6.JPG` | Medzak gallery photo 6 |
| `assets/images/gallery/7.JPG` | Medzak gallery photo 7 |
| `assets/images/gallery/7a.JPG` | Medzak gallery photo 7a |
| `assets/images/gallery/8.JPG` | Medzak gallery photo 8 |
| `assets/images/gallery/9.JPG` | Medzak gallery photo 9 |
| `assets/images/gallery/10.jpeg` | Medzak gallery photo 10 |
| `assets/images/gallery/11.jpg` | Medzak gallery photo 11 |
| `assets/images/gallery/12.jpg` | Medzak gallery photo 12 |
| `assets/images/gallery/13.jpg` | Medzak gallery photo 13 |
| `assets/images/gallery/14.jpeg` | Medzak gallery photo 14 |
| `assets/images/gallery/15.jpeg` | Medzak gallery photo 15 |
| `assets/images/gallery/16.jpg` | Medzak gallery photo 16 |
| `assets/images/gallery/17.jpg` | Medzak gallery photo 17 |
| `assets/images/gallery/18.jpg` | Medzak gallery photo 18 |
| `assets/images/gallery/18a.jpg` | Medzak gallery photo 18a |
| `assets/images/gallery/19.jpg` | Medzak gallery photo 19 |
| `assets/images/gallery/20.jpg` | Medzak gallery photo 20 |
| `assets/images/gallery/21.jpg` | Medzak gallery photo 21 |
| `assets/images/gallery/22.jpg` | Medzak gallery photo 22 |

Text blocks captured: 57 · links: 50 · ids: 13

## careers.html

- Title: Careers | Medzak Healthcare
- `description`: Join Medzak Healthcare. Send your resume to director@medzak.co.
- `canonical`: https://medzak.co/careers/
- `og:title`: Careers | Medzak Healthcare
- `og:description`: Join Medzak Healthcare. Send your resume to director@medzak.co.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` careers-section — "Careers"
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"

**Forms**

- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Images (1, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |

Text blocks captured: 60 · links: 27 · ids: 13

## contact.html

- Title: Contact Us | Medzak Healthcare
- `description`: Contact Medzak Healthcare: Plot-39C, Sector 6 Dwarka, New Delhi 110075. Email admin@medzak.co, or send your resume to director@medzak.co.
- `canonical`: https://medzak.co/contact/
- `og:title`: Contact Us | Medzak Healthcare
- `og:description`: Contact Medzak Healthcare: Plot-39C, Sector 6 Dwarka, New Delhi 110075. Email admin@medzak.co, or send your resume to director@medzak.co.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` contact-info-section — "Contact Us"
1. `section` contact-form-section — "Send Us a Message"
1. `section` bookDemoHm — "Are you interested in effective and affordable ocular care?"
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"

**Forms**

- `contactForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text`, `userSubject:select`, `userMessage:textarea*`, `userComments:hidden`, `website:text`
- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Embeds**

- `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.3183518357396!2d77.0615717!3d28…`

**Images (1, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |

Text blocks captured: 81 · links: 27 · ids: 25

## our-team.html

- Title: Our Team | Medzak Healthcare
- `description`: Meet the Medzak Healthcare team: researchers and engineers in medicine, electronics, embedded systems and AI building accessible eye-care diagnostics.
- `robots`: noindex
- `canonical`: https://medzak.co/our-team/
- `og:title`: Our Team | Medzak Healthcare
- `og:description`: Meet the Medzak Healthcare team: researchers and engineers in medicine, electronics, embedded systems and AI building accessible eye-care diagnostics.
- `og:image`: https://medzak.co/images/Medzak-banner.jpg

**Sections (in order)**

1. `section` service-section — "Our Team"
1. `footer` main-footer — "Solutions"
1. `div` bookDemo — "Book Your Demo Now...!"
1. `div` varshaSingh

**Forms**

- `demoForm` POST `https://medzak.co/esend.php` — fields: `userName:text*`, `userEmail:email*`, `userPhone:tel*`, `userCompany:text*`, `userComments:textarea*`

**Images (7, excluding nav thumbnails)**

| src | alt |
|---|---|
| `assets/images/logo.png` | Medzak Healthcare Pvt. Ltd. |
| `assets/images/team-varsha-singh.jpg` | Varsha Singh, Founder Director & CEO |
| `assets/images/team-samarpit-chauhan.jpg` | Samarpit Chauhan, Legal Advisor-Patents and Trademarks |
| `assets/images/team-ramjit-vishwakarma.jpg` | Ramjit Vishwakarma, Hardware Designer & Embedded Systems Expert |
| `assets/images/team-itqan-mohammad.jpg` | Itqan Mohammad, Software Designer & AI Expert |
| `assets/images/team-sandeep-kumar.jpg` | Sandeep Kumar, Management Lead |
| `assets/images/team-varsha-singh.jpg` | Varsha Singh |

Text blocks captured: 69 · links: 27 · ids: 15

## why-us.html

- Title: Page moved | Medzak Healthcare
- `robots`: noindex
- `canonical`: https://medzak.co/about-us/

**Sections (in order)**


Text blocks captured: 2 · links: 1 · ids: 0

## our-offerings.html

- Title: Page moved | Medzak Healthcare
- `robots`: noindex
- `canonical`: https://medzak.co/our-products/

**Sections (in order)**


Text blocks captured: 2 · links: 1 · ids: 0

