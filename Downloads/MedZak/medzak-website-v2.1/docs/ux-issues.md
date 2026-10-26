# UX issues: status after the redesign

The full audit (before the redesign) is [ux-audit.md](ux-audit.md); this file tracks each finding to its outcome.
✅ resolved · ◐ partly resolved (the rest needs client content or a decision) · ⏳ open

| # | Finding | Status | What changed |
|---|---|---|---|
| V1 | Home never shows the products | ✅ | Product tabs (MeiboX / Metabo-X / VuOpt), "How MeiboX works" timeline and impact numbers on Home |
| V2 | Duplicate logo; "Watch More" plays nothing; no Book a Demo in the hero | ◐ | BOOK A DEMO is the hero's primary action; the logo card stays (required by the brief); Watch More still links to Our Products because no video exists |
| V3 | Every section uses the same grey centred title + orange rule | ✅ | New section header system (title + subtitle, left or centred), varied section backgrounds |
| V4 | Dated full-opacity PNG decorations | ✅ | PNG layers deleted; ECG / molecule SVG motifs at 4–6% |
| V5 | Ticker padded with underscores; items are placeholders | ◐ | Underscores gone, two-row ticker; items still link to achievements.html until real LinkedIn post URLs are supplied |
| V6 | Products hidden behind tabs, inconsistent panels, flat beige CTA | ◐ | Uniform feature panels with features and chips, card-style tabs; Metabo-X still uses its logo graphic (no product photo exists) |
| V7 | Careers page looks unfinished | ◐ | Breadcrumb hero + card + CTA band; still one card because no job listings exist |
| V8 | Plain footer, no CTA or trust signal | ✅ | CTA band (Book a Demo + Call Back), "Backed by" strip, medical disclaimer, advisory notice, privacy/terms |
| V9 | Supporter logos become white boxes in dark mode | ✅ | Logo wall on deliberate white tiles (greyscale, colour on hover); footer strip blends per theme |
| V10 | A section that only shows the logo again | ✅ | Replaced by a closing brand block on About (logo + tagline + founding line) |
| A1 | White on orange 2.83:1 | ✅ | Navy text on orange, 6.1:1 |
| A2 | Body text below 4.5:1 | ✅ | New tokens; axe-core: 0 contrast violations, light and dark |
| A3 | Orange used as text colour | ✅ | Text uses the darker orange ink (AA); bright orange only fills the CTA |
| A4 | Placeholders as labels in the demo form | ✅ | Visible labels, inline errors tied with aria-describedby, required marks |
| A5 | Generic gallery alt text / captions | ⏳ | Kept verbatim; real captions need the client (which event each photo shows) |
| A6 | Two icon fonts for five glyphs | ✅ | One SVG sprite; icon fonts deleted |
| A7 | Continuous motion | ✅ | Ticker pauses on hover/focus; all motion off under prefers-reduced-motion |
| M1 | Mobile hero: no visible primary action | ✅ | BOOK A DEMO in the first phone viewport + bottom quick-action bar |
| M2 | Centred multi-line About copy | ✅ | Left-aligned reading column |
| M3 | Long single-column mobile footer | ✅ | Two-column footer grid on phones |
| P1 | 12.3 MB of assets, no srcset | ✅ | 480 / 800 px copies through srcset (`tools/make_thumbs.ps1`); originals kept for the lightbox |
| P2 | Render-blocking script | ✅ | `defer` + inline theme guard |
| P3 | Icon fonts; full Inter; no preload | ◐ | Icon fonts removed, fonts preloaded, Inter on font-display:optional; Inter is still the full 317 KB file (no font subsetter was available) |
| P4 | No structured data; og:image outside the package | ◐ | JSON-LD added; og:image still points at `https://medzak.co/images/Medzak-banner.jpg` (unchanged, not in this package) |
| P5 | No 404 page; meta-refresh redirects | ◐ | 404.html added; `htaccess.example` shows 301s and the 404 mapping (not active until the host applies it) |
