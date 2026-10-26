# UX audit (Phase 0, before the redesign)

Site audited: this repository's static site (8 pages + 2 redirect stubs), served locally and captured
at 1440 / 768 / 390 px in headless Chrome — screenshots in [screenshots/before/](screenshots/before/).
Content checklist: [content-inventory.md](content-inventory.md). Earlier spec audit: `../WEBSITE_AUDIT.md`.

Severity: **H** = hurts trust/conversion or fails WCAG AA · **M** = noticeably weak · **L** = polish.

## Visual hierarchy & brand

| # | Sev | Where | Problem |
|---|---|---|---|
| V1 | H | Home | The homepage never presents the products (Meibo-X / Metabo-X / VuOpt): after the hero it goes ticker → About → tagline → supporters. The core offer and its proof points (">92% imaging accuracy", "10 major surface eye diseases in under 2 minutes") only exist on Our Products. |
| V2 | H | Home hero | The logo appears twice (header + a white logo card in the hero). The only hero CTA is "Watch More" with a play icon, but it links to Our Products — there is no video. No "Book a Demo" in the hero. |
| V3 | M | All pages | Every section uses the same template header: centred grey (`#666`) title + short orange rule. Weak contrast between levels, nothing guides the eye, reads as a theme template. |
| V4 | M | All pages | Decorative PNG layers (hex grid, brush strokes, dot fields) at full opacity look dated and add ~400 KB; they compete with content. |
| V5 | M | Home ticker | Banner text is padded with literal underscores (`____Innovating for disease prevention____`); all six items are placeholders linking to `achievements.html`, not to LinkedIn posts. |
| V6 | M | Our Products | One product visible at a time behind tabs; the other two are invisible until clicked. Metabo-X's image is a logo, not a product shot, so the three panels look inconsistent. CTA band below is a flat beige (`#e5e3df`) block. |
| V7 | M | Careers | Page is one small "JOIN US" card in a large empty section — looks unfinished. |
| V8 | M | Footer | Plain 3-column link list + repeated logo; no CTA, no trust signal, no visual end to the page. |
| V9 | L | Supporters | Logos are JPGs on white; in dark mode they become bright white boxes. Cards are large for what they hold. |
| V10 | L | About Us | A full section exists only to show the logo again (`.logo-band`). |

## Contrast & accessibility (WCAG 2.2 AA)

| # | Sev | Where | Problem |
|---|---|---|---|
| A1 | H | All CTAs | White text on brand orange `#f17732` = **2.83:1** (needs 4.5:1; even large-text 3:1 fails). Affects BOOK A DEMO, Request a Demo, form submits. |
| A2 | H | Body copy | Body text `#777` on white = **4.48:1**, on `--sec-alt #f2f4f5` = **4.06:1**, on hero `#cde9f4` = **3.53:1** — all below 4.5:1. |
| A3 | H | Links / hover | Orange used as text (hover names, links) = 2.83:1 on white. |
| A4 | M | Book-a-Demo modal | Inputs use placeholders as labels (no visible labels); "Company name" is `required` but has no asterisk; errors are not tied to fields. |
| A5 | M | Gallery | All 24 photos have generic alt text ("Medzak gallery photo N") and captions ("Gallery N"). |
| A6 | L | Contact / Careers / Team | Icons come from two icon fonts (icomoon, Flaticon) — invisible if the font fails, and unlabeled. |
| A7 | L | Motion | Ticker and pattern animations run continuously; only the ticker pauses on hover. |

Good already: skip link, landmarks (`header/nav/main/footer`), keyboard-operable nav dropdowns,
focus-visible ring, dark mode, `prefers-reduced-motion` respected for the menus.

## Mobile (390 px)

| # | Sev | Problem |
|---|---|---|
| M1 | M | Hero stacks the duplicate logo, headline, copy, then two full-width images (≈ 1.5 screens) before any section change; no primary CTA visible on first screen besides the header icon buttons (BOOK A DEMO is hidden below 1200 px until the menu is opened). |
| M2 | M | About copy is centred over 6+ lines — hard to read. |
| M3 | L | Footer becomes a long single column of 3 headings + 12 lines. |

## Performance & SEO

| # | Sev | Problem |
|---|---|---|
| P1 | H | `assets/` = **12.3 MB** in 88 files. Largest images: `media/10.jpg` 817 KB, `gallery/3.jpg` 569 KB, `gallery/6.JPG` 504 KB, `gallery/1.png` 349 KB (PNG photo). No responsive `srcset`; gallery thumbnails load full-size originals. |
| P2 | M | `js/main.js` is loaded render-blocking in `<head>` (needed only for the theme flash guard). |
| P3 | M | Two icon fonts (icomoon, Flaticon) are downloaded for 5 glyphs. Inter is the full 317 KB variable font; fonts are not preloaded. |
| P4 | M | No structured data (Organization / MedicalBusiness); `og:image` points to `https://medzak.co/images/Medzak-banner.jpg`, which is not part of this package. |
| P5 | L | No 404 page; redirect stubs rely on meta refresh. |

## Content facts that constrain the redesign

- No video exists anywhere on the site ("Watch More" → `our-products.html`).
- No certifications, testimonials, newsletter, job listings or company social-media URLs exist.
  The only social link is Dr. Varsha Singh's LinkedIn (team bio).
- Quantitative claims that exist (and may be reused): **>92% imaging accuracy**, **10 major surface eye
  diseases**, **under 2 minutes** (MeiboX); **up to 40% MTF**, **5–10 cm detection range** (VuOpt);
  **Founded / Estd. 2018**; 12 achievements, 13 media features, 24 gallery photos, 6 supporters.
- Forms post to `https://medzak.co/esend.php` (Book-a-Demo: `userName, userEmail, userPhone, userCompany,
  userComments`; Contact: same + `userSubject, userMessage`, honeypot `website`).
