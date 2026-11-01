# Medzak Website Audit — v2.1 vs client content spec

**Audited:** 2026-10-23 · **Project:** `medzak-website-v2.1/` (static HTML/CSS/JS: 8 pages + 2 redirect stubs, `css/style.css`, `js/main.js`)
**Method:** I read every page's source, grepped for naming variants, and checked all `src`/`href` targets with a script. I also served the site locally (`python3 -m http.server`) and drove headless Chrome over CDP at 1440 / 390 / 360 px. That run captured screenshots, computed styles, loaded fonts, horizontal-scroll checks, console errors and tab/modal behaviour. I opened the six reference sites in the same headless browser for the layout comparison.
**No code was changed.**

Legend: ✅ Done · 🟡 Partial · ❌ Missing · ⚠️ Mismatch · ➖ N/A

> Shared chrome: the header/nav (line 29, line 30 on `our-team.html`) and footer are **byte-identical on all 8 pages** (verified by hash). A finding in the nav or footer applies to every page. File references below give `index.html` as the representative.

---

## 0. Product naming

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| N1 | Grep all name variants | ⚠️ | see list below | The only non-canonical display variant is **`MeiboX`** (no hyphen). No `Vucan`, `VucanX`, `Vucan-X`, `Vuopt`, `VuOPT`, `Vu Opt`, `Meibo X`, `Meibo-x`, `MetaboX`, `Metabo X` or `Metabo-x` anywhere in site code. `Vucan-X` appears only in `CHANGELOG.txt:61,68`. |
| N2 | Third product = **VuOpt** everywhere | ✅ | `our-products.html:7,14,49-50,60-62`; nav line 29; footer | VuOpt appears in the tab, panel heading, dropdown, footer, alt text, meta description and slug (`#vuopt`). The only stale mention is `CHANGELOG.txt:61` ("Product names kept as MeiboX / Vucan-X / Metabo-X"), which line 68 supersedes. That is a doc file, not the site. |
| N3 | Meibo-X / Metabo-X spelled consistently | ⚠️ | see list below | **Metabo-X is consistent everywhere.** **Meibo-X is not.** The hyphenated form appears only in the Products mega-menu card (`<h4>Meibo-X`, nav line 29). Every other place uses `MeiboX`. Slugs are also inconsistent: `#meibox` / `tab-meibox` / `panel-meibox` have no hyphen, but `#metabo-x` does. |
| N4 | Product image alt text uses correct name | ⚠️ | `our-products.html:57` | Meibo-X alt = "**MeiboX** portable eye-care diagnostic device". The VuOpt (`:61`) and Metabo-X (`:65`) alts are correct. |

**N1 / N3 hit list: `MeiboX` (display text)**
- Footer "Solutions" column, all 8 pages: `index.html:103`, `about-us.html:77`, `achievements.html:167`, `careers.html:57`, `contact.html:108`, `gallery-media.html:149`, `our-products.html:86`, `our-team.html:60`
- `our-products.html:7` (meta description), `:14` (og:description), `:47` (tab label), `:57` (img alt), `:58` (panel `<h2>`)
- `index.html:82` (Our Solution text, copied verbatim from spec A5, which itself says "MeiboX")
- `README.txt:8`
- Lowercase slug/token hits (not display text): `#meibox` in nav line 29 + footer on all pages, `our-products.html:46,56,57`; CSS tokens `--meibox-bg/-hover/-text` at `css/style.css:44-46,85-87,121-123`. These are **defined but never used** (0 `var(--meibox…)` references).

---

## 1. Global / all pages

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| G1 | Nav on every page, exact order/labels | ⚠️ | `index.html:29` (all pages) | Present on all 8 pages. **Actual:** Home \| About Us \| Our Products \| **Achievements & Media** \| **Gallery** \| Careers \| **Contact Us** (+ a "BOOK A DEMO" button). **Spec:** …\| **Achievements** \| **Gallery & Media** \| Careers \| **Contact us**. The order is right; three labels differ. `CHANGELOG.txt` Round 3 says the Achievements/Gallery relabel was deliberate, so this needs a client decision. Every tab also opens a mega-dropdown, which the spec doesn't ask for. |
| G2 | Each nav item links to a working page | ✅ | — | All local `href`/`src` targets exist. There are no `#` or empty links. The `our-products.html#meibox/#vuopt/#metabo-x` deep links are resolved by JS (`js/main.js:330-338`), not by element IDs, so without JS they only land at the page top. |
| G3 | Red Hat Display (bold) headings, Inter body | ✅ | `css/style.css:8-9,57-58,140-141` | Both fonts are self-hosted via `@font-face` and applied through `--font-head` / `--font-body`. Headless check: h1 is `"Red Hat Display"` at weight 700, body/p are `Inter`, and `document.fonts.check()` is true for both. Minor: Red Hat Display ships as `.woff`, not `.woff2` (see CHANGELOG G2). |
| G4 | Light-blue theme used consistently | 🟡 | `css/style.css:28,59,436,456` | Light blue (`#cde9f4` → `#eef8fc`) is used only for the **Home hero** and the **tagline band**. Every other page uses grey `#f2f4f5` / warm `#e5e3df` section backgrounds. All CTAs are **orange** (`--orange #f17732`), the ticker is dark navy, and the mission cards are **teal** `#40cbb4`. The light-blue "Watch Demo" button look from the reference is not used anywhere. |
| G5 | Footer: 3 columns + content | ⚠️ | `index.html:97-134` (all pages) | **OK:** footer on every page; 3 columns; "Med" in blue `#4A68BD` and "zak" in orange `#f17732`; Contacts show the address + admin@medzak.co; short orange underline (40×1 px, `css/style.css:356`); bottom bar has the logo on the left and copyright on the right. **Solutions** column (`:103-105`) currently reads **MeiboX, VuOpt, Metabo-X**. Spec text is "Sophisticated Camera Module, MeiboX, Cutting-Edge AI Software", and the product names are the likely intent, but `MeiboX` should be `Meibo-X`. **Medzak** column (`:111-116`) currently reads About Us, Our Products, Achievements & Media, Gallery, Careers, Contact Us. Spec: **Why Us?, Our Offerings, Resources, Our Team, Achievements, Contact Us**. Only "Contact Us" matches. Our Team, Why Us? and Resources are absent (`why-us.html` and `our-offerings.html` exist only as redirect stubs). |
| G6 | Copyright "2018 All Rights Reserved" | ✅ | `index.html:131` | Reads `© 2018 All Rights Reserved` (the © symbol is prepended). |
| G7 | Footer links work; admin@ is `mailto:` | ✅ | `index.html:123` | All footer links resolve; `mailto:admin@medzak.co` is correct. |
| G8 | "Innovating for disease prevention" divider above Company section | 🟡 | `index.html:87`, `css/style.css:456-459`; `index.html:61` | Exists as a centred line with orange rules on both sides, but **only on the Home page**, between "About Us" and "Supporters". It is **not on `about-us.html`** above the "About Medzak" (Company) block. The rules are hidden at ≤575 px. A second copy inside the ticker (`index.html:61`) fakes the rules with underscores (`________Innovating…________`). |
| G9 | Responsive ≤400 px, no horizontal scroll | ✅ | — | Headless at 360 and 390 px: `scrollWidth == clientWidth` on all 8 pages. Elements wider than the viewport are only decorative pattern layers clipped by `overflow:hidden`. Below 1200 px the nav becomes a hamburger with an accordion; tabs stack to one column; the footer drops to one column; the hero stacks. |

---

## 2. Home

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| H1 | Logo rounded on light-blue background | ✅ | `index.html:44`, `css/style.css:439` | The logo sits in a white pill (`border-radius:28px`) on the light-blue hero gradient. |
| H2 | "Estd. 2018" | ✅ | `index.html:45` | |
| H3 | Headline exact | ✅ | `index.html:47` | Exact match. |
| H4 | Sub-text exact | ✅ | `index.html:48` | Exact match, including the " — " em-dash. |
| H5 | Two hero images | ✅ | `index.html:52-53`; `assets/images/hero-eye.jpg`, `metabo-x.jpg` | Both exist and render: (a) blue eye with a scan overlay; (b) blood tube → molecules → spectrum chart + analyser. |
| H6 | CTA: outline, white border/text, play icon, light blue | ✅ | `index.html:49`; `css/style.css` `.btn-sky`, tokens `--sky`/`--sky-deep` | **Fixed 2026-10-23.** White 2 px border, white 600-weight text and play triangle on a light-blue pill (`#1c7cb8`, with a thin outer ring so the white border reads against the pale hero). Hover darkens the fill to `#166a9e`; keyboard focus shows the site's orange ring. **Deviation:** the light blue is the button's fill, not just the hero behind it. White text on the hero background is 1.27:1 (unreadable); on `#1c7cb8` it is 4.54:1 (passes AA). Label kept as the spec's **"Watch More"**; the reference image says "Watch Demo" (client to confirm, tied to H7). |
| H7 | CTA does something | 🟡 | `index.html:49` | It is a plain link to `our-products.html`. No video, modal or demo opens, so the play icon and "Watch" label promise something that doesn't happen. |
| H8 | LinkedIn news ticker (ref W4 hanuai.com) | 🟡 | `index.html:58-63`; `js/main.js:341-355`; `css/style.css:589-603` | **Exists** directly under the hero. **Auto-scrolls** as a CSS marquee (~62 s loop), pauses on hover/focus, and stays static under reduced motion. **Content:** 6 **hard-coded placeholder** items (achievement captions) that all link to `achievements.html`. They are not real LinkedIn posts, there are no post URLs, and nothing is fetched. `README.txt` mentions a TODO comment above `<ul class="ticker-track">`, but there is no such comment and the element is a `<div>`. **Reference match: Loose.** The visual style is close (dark band, LinkedIn icons, continuous scroll), but hanuai's items are real linked posts. |

---

## 3. About Us

The spec's "About Us" texts (A1, A3–A5) live in the **Home page `#about` section**. `about-us.html` carries the **Company** texts (C2–C5). See C6.

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| A1 | Intro text exact | ⚠️ | `index.html:69` (also `about-us.html:43`) | Actual: "Founded in 2018**,** Medzak… detect it early **— before** it becomes…". Spec A1: "Founded in 2018 Medzak…" (**no comma**) "…early**- before**…". The text matches the C2 punctuation more closely than A1's. |
| A2 | 3 blocks w/ icons; pink/grey line icons | ⚠️ | `index.html:70-86`, `about-us.html:50-66`; `css/style.css` (`.mvp` → `--mvp-accent`) | Since A6, the three blocks are stacked inside the ophtha-style card rather than "in a row", because the two spec items conflict. Target, eye and lightbulb icons ✅. Icons are bare **teal** line icons, not pink/grey; this is now a one-line change to `--mvp-accent`. |
| A3 | Our Mission text | ✅ | `index.html:74` | Exact. |
| A4 | Our Vision text | ✅ | `index.html:78` | Exact. |
| A5 | Our Solution text | ✅ | `index.html:82` | Exact match to spec, including "MeiboX". The spelling is tracked under N3. |
| A6 | Layout ref W1 (ophtha "Mission, Vision & Purpose") | ✅ | `index.html:70-86`, `about-us.html:50-66`; `css/style.css` `.mvp*` | **Fixed 2026-10-23.** New shared `.mvp` component on both pages: large rounded photo on the left (24 px radius, bottom gradient; `gallery/7.JPG` on About, `gallery/10.jpeg` on Home) and a rounded card on the right with Mission and Vision, plus Solution in a tinted inner box (ophtha's "Purpose" treatment). It stacks on ≤991 px. **Refined:** the photo is the only lifted element; the card is flat with a hairline border; icons are bare line icons (no tinted tiles); the photo gradient was removed; one reveal for the block instead of two staggered ones. Text and the `#mission/#vision/#solution` anchors are unchanged. The old `.pricing-block` CSS was removed. **Reference match: Close.** |
| A7 | Partners & Supporters greyscale logo strip | 🟡 | `index.html:89-95`, `achievements.html:153+`; `assets/images/supporter-*.jpg` | The section exists, titled "**Supporters and Funders**". It is a **static 3×2 grid of full-colour cards**, not a greyscale strip or marquee. Logos present: BIRAC BIG, BIRAC WInER, NIDHI-PRAYAS, MeitY Startup Hub, DSIR, RICH. **Missing from both page and assets: SELCO Foundation, C-CAMP, Govt. Medical College seal.** The section is not on `about-us.html` at all. |

---

## 4. Company section ("About Medzak")

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| C1 | Heading "Company:" / "About Medzak" | ✅ | `about-us.html:42` | `<h1>About Medzak</h1>`; there is no "Company:" label. |
| C2 | Intro text | ⚠️ | `about-us.html:43` | Actual "…early **— before** it becomes…" vs spec "…early**-before** it becomes…". The rest is exact. |
| C3 | Our mission (italic label) | ✅ | `about-us.html:53-54` | Text is exact. The label is a non-italic card heading "Our Mission" (style only). |
| C4 | Our vision | ✅ | `about-us.html:58` | Exact. |
| C5 | Our solution | ✅ | `about-us.html:62` | Exact. |
| C6 | Two M/V/S versions: where used | 🟡 | `index.html:65-85` vs `about-us.html:40-65` | They are **not merged and both exist**, but on different pages. The **About-Us version** (A1, A3–A5) is on **Home `#about`** under the heading "About Us". The **Company version** (C2–C5) is on **`about-us.html`** under "About Medzak". So the "About Us" nav tab shows the Company texts, and the "About Us" texts appear only on Home. The About-Us mega-menu cards (nav line 29) paraphrase the Company version. |

---

## 5. Our Products

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| P1 | Products mega-menu, janitri "For Hospitals" style (ref W6) | ⚠️ | nav line 29 (`#dd-products`) | The mega-menu exists, with each product name in bold and a one-line subtitle under it. **Subtitles differ from the spec:** "Advanced 4-in-1 handheld device", "Personalized risk prediction", "Close-range imaging lens". **Order differs:** Meibo-X, Metabo-X, VuOpt, while the tabs run Meibo-X, VuOpt, Metabo-X. Each card also adds an icon, badge, paragraph and spec pills, and there's a footer CTA. **Reference match: Loose.** This version is heavier than janitri's simple name + subtitle list. |
| P2 | Three tabs with exact subtitles | ⚠️ | `our-products.html:46-54` | All three subtitles are **exact** ✅. The first tab's label is **"MeiboX"** (`:47`) instead of Meibo-X. |
| P3 | Product hero layout (image left; name, subtitle, desc, solid CTA right) | ✅ | `our-products.html:56-67`; `css/style.css:468` | Image on the left with copy on the right (45/55 grid), big `<h2>` name, subtitle, paragraph and a solid orange CTA. It stacks on mobile. **Reference match: Close.** Exception: the VuOpt panel has no subtitle (P13). |
| P4 | Tab switching / active state / deep links | ✅ | `js/main.js:302-339` | Verified headless: clicking switches the panel; the active tab gets a white background, shadow and orange bottom border; the URL hash updates; `#meibox`, `#vuopt` and `#metabo-x` deep links open the right tab; arrow, Home and End keys work. |
| P5 | Meibo-X heading + subtitle | ⚠️ | `our-products.html:58` | Heading is **"MeiboX"**; subtitle exact ✅. |
| P6 | Meibo-X description exact | ⚠️ | `our-products.html:58` | Actual "…>92% imaging accuracy **— no** specialist…" vs spec "…accuracy**- no** specialist…". The rest is exact. |
| P7 | "Request a Demo" CTA works | ✅ | `our-products.html:58`; modal `:120-138` | Opens the Book-a-Demo modal (verified). The form POSTs to `https://medzak.co/esend.php`. That endpoint answers (HTTP 301 on GET); I did not submit a test. |
| P8 | Image: black/white pen-shaped handheld | ✅ | `assets/images/offering-meibox.jpg` | A black handheld with a silver band ✅. Low resolution (706×402) and visibly soft at large sizes. |
| P9 | Metabo-X heading + subtitle | ✅ | `our-products.html:66` | Exact. |
| P10 | Metabo-X description exact | ⚠️ | `our-products.html:66` | Actual "…therapy recommendations **— built** as…" vs spec "…recommendations**- built** as…". The rest is exact. |
| P11 | "Talk to Our Team" CTA works | ✅ | `our-products.html:66` | Links to `contact.html`. It could point at `contact.html#contact-form` to land on the form. |
| P12 | Image: green cross + molecule + "Metabo-X"; no DeeVid watermark | ✅ | `assets/images/metabo-x-product.jpg` | Correct image; **no watermark** (cropped off per CHANGELOG). |
| P13 | VuOpt heading + subtitle | 🟡 | `our-products.html:62` | Heading "VuOpt" ✅. The **subtitle "High-precision multi-element optics" is missing from the panel**: there is no `<p class="lead">`, unlike the other two panels. It appears only on the tab button. |
| P14 | VuOpt description | ⚠️ | `our-products.html:62` | Wording is exact apart from **"5–10 cm"**, which has a space (spec: "5–10cm"). The copy is also **split into two `<p>`s** after "detection range.", where the spec has one paragraph. |
| P15 | "Learn More" goes somewhere real | ✅ | `our-products.html:62` | Links to `contact.html`. It is real but generic: there's no VuOpt detail page. |
| P16 | Image: cut-away 3D lens render | ✅ | `assets/images/offering-lens.jpg` | Correct cut-away metal lens assembly. |

---

## 6. Achievements

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| AC1 | Exists; reachable from nav + footer | ✅ | `achievements.html`; nav line 29; footer `:113` | Labelled "Achievements & Media" in both places (see G1). |
| AC2 | Current content | ✅ | `achievements.html:43-170` | **12 achievements**, each with an image and caption (2026 She Cohort 4.0, TiE 2025, SM 2024, BT 2020, Falling Walls 2019, BIRAC_TiE 2020, Matlab 2020, IITM 2020, FAOBMB 2019, MedTech 2019, Thub 2017, BRICS 2017). Then a divider, **13 Media items** (LinkedIn posts and press clippings), and the Supporters grid. All open in a lightbox. Some card titles look like file names: "BIRAC_TiE 2020" has an underscore, and "SM 2024", "BT 2020", "Thub 2017" and "Matlab 2020" are abbreviations or odd casing. |

---

## 7. Gallery & Media

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| GM1 | Page exists; reachable from nav | ⚠️ | `gallery-media.html`; nav line 29 | Reachable, but labelled **"Gallery"**, with page `<h1>` "Gallery" (`:43`). Spec says "Gallery & Media". The Media items were moved to `achievements.html`. |
| GM2 | Layout (refs W2 ophtha #achievements, W5 hanuai /gallery) | 🟡 | `gallery-media.html:44+`; `css/style.css:606-621` | **Current layout:** a uniform grid (3 columns, 2 at ≤991 px, 1 at ≤575 px) of equal 4:3 rounded photo tiles, cover-cropped, with a hover zoom icon and a **lightbox** (prev/next, keyboard, Esc). No masonry, no carousel. **vs hanuai/gallery: Close** (hanuai is a 4-column grid of rounded photos with no captions). **vs ophtha #achievements: Loose** (ophtha uses cards with year pill, title and blurb; our *Achievements* page is closer to that). |
| GM3 | Real vs placeholder media | ✅ | `assets/images/gallery/*` | **24 real event photos** (1–22, 7a, 18a). Alt text is generic ("Medzak gallery photo N") and lightbox captions are "Gallery N", so they carry no descriptive text. |

---

## 8. Careers

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| CR1 | Page exists; reachable; current content | ✅ | `careers.html:39-50` | Reachable from nav and footer. Content is a single card, "Join us — Send your resume to director@medzak.co" (`mailto:`). There are no openings or form. |

---

## 9. Contact us

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| CT1 | "For inquiries, contact:" + admin@ mailto | ✅ | `contact.html:48` | Exact, with a `mailto:` link. |
| CT2 | Layout ref W3 + form behaviour | 🟡 | `contact.html:40-93`; `js/main.js:185-230` | **The form exists**: name, email, phone, organisation, subject select and message, with inline JS validation and a honeypot. **On submit** it does a normal full-page POST to `https://medzak.co/esend.php`, a real server endpoint (reachable; not test-submitted). The visitor is navigated away to whatever that script returns, and there's no in-page success state. It is not console.log-only. **Layout vs ophtha #contact: Loose.** Ophtha puts info cards + map on the left and the form card on the right, all in one row. Ours has a row of 3 centred info cards first, then the form on the left and the map on the right. The Google Maps iframe (`:90`) did not render within the headless capture window, so I could not verify it visually. |
| CT3 | Address shown | ✅ | `contact.html:46` | "Plot-39C, Sector 6 Dwarka,<br>New Delhi, Delhi 110075" ✅ |

---

## 10. General quality

| ID | Item | Status | File(s) | Notes |
|----|------|--------|---------|-------|
| Q1 | Build | ➖ | — | There's no `package.json` or build step; it's a plain static site. Substitute checks: no duplicate IDs, exactly one `<h1>` per content page, no `<img>` without `alt`, and **no console errors or exceptions** on any page at any width (headless). |
| Q2 | Lint | ➖ | — | No linter is configured. |
| Q3 | Leftover placeholder text | 🟡 | see notes | No lorem ipsum, TODO, FIXME or "coming soon" text. **Placeholders found:** (1) the 6 ticker items (`index.html:61`), which `README.txt` admits are placeholders; (2) `README.txt` points to a TODO comment in `index.html` that doesn't exist; (3) `our-team.html:48`: **Ramjit Vishwakarma's photo is a grey silhouette placeholder** (`team-ramjit-vishwakarma.jpg`); (4) `js/main.js:143,165` handles a `#sagarJuneja` modal hash with no matching modal; (5) generic gallery alts and captions ("Medzak gallery photo N", "Gallery N"); (6) file-name-style achievement titles (AC2); (7) unused CSS tokens `--meibox-*`. |
| Q4 | Missing images / broken internal links | ✅ | — | Every referenced local image, CSS `url()` and internal link resolves, and there are no unused assets. External `og:image` `https://medzak.co/images/Medzak-banner.jpg` returns 200. Canonical/og URLs use `medzak.co/<page>/` paths, which assume server rewrites from `*.html`. |
| Q5 | `<title>` + meta description per page, correct names | ⚠️ | `our-products.html:7,14` | Every page has a unique `<title>`, meta description and og tags. The Products description says "Explore **MeiboX**…". Titles don't include product names (e.g. "Our Products \| Medzak Healthcare"). The redirect stubs have no description (noindex, acceptable). |
| Q6 | Favicon = Medzak "M" | ✅ | `assets/images/favicon.png` | Blue "M" mark ✅. Only 60×60 PNG, with no larger sizes or apple-touch-icon. |

---

## Reference-site match summary

| Item | Reference | Match |
|------|-----------|-------|
| A6 | W1 ophtha.health #features (Mission/Vision/Purpose) | **Close** (fixed) |
| H8 | W4 hanuai.com news line | **Loose** (style close, content placeholder) |
| P1 | W6 janitri.in "For Hospitals" mega-menu | **Loose** |
| P3 | W6 janitri.in product hero | **Close** |
| GM2 | W2 ophtha #achievements / W5 hanuai /gallery | **Loose** (ophtha) / **Close** (hanuai) |
| CT2 | W3 ophtha.health #contact | **Loose** |

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Done | 37 |
| 🟡 Partial | 10 |
| ❌ Missing | 0 |
| ⚠️ Mismatch | 16 |
| ➖ N/A | 2 |
| **Total** | **65** |

### Top 10 to fix first
1. **Meibo-X naming** (N1/N3/N4/P2/P5/Q5): replace `MeiboX` with `Meibo-X` in the footer on all 8 pages, the products tab, `<h2>`, alt and meta, and the Home Solution text. Decide whether the slug becomes `#meibo-x`.
2. **Nav labels** (G1/GM1): "Achievements", "Gallery & Media", "Contact us". The current labels were changed on purpose in Round 3, so confirm with the client first.
3. **Footer Medzak column** (G5): spec wants Why Us?, Our Offerings, Resources, Our Team, Achievements, Contact Us. Also confirm what the Solutions column should say.
4. ~~**Hero CTA style** (H6)~~ ✅ fixed. Still open: H7 (the button only links to Our Products; no video or demo) and the "Watch More" vs "Watch Demo" label.
5. **VuOpt panel subtitle missing** (P13): add "High-precision multi-element optics" under the heading.
6. **Exact-text punctuation** (P6, P10, P14, A1, C2): the spec's "- " was turned into " — " in 4 places; also "5–10 cm" vs "5–10cm", the comma in A1, and the VuOpt paragraph split.
7. **Partners & Supporters** (A7): add the SELCO Foundation, C-CAMP and Govt. Medical College logos, and make it a greyscale strip or marquee. It also needs to appear on About Us.
8. **LinkedIn ticker** (H8): replace the 6 placeholder items with real posts and URLs.
9. ~~**About Us layout** (A6)~~ ✅ fixed. Still open: pink/grey icons instead of teal (A2).
10. **Mission/Vision placement + tagline** (C6/G8): decide which text set goes where on `about-us.html`, and put the "Innovating for disease prevention" divider above the Company block. Also align the Products mega-menu subtitles and order with P2 (P1).
