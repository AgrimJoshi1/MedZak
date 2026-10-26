# CLAUDE.md — Medzak website (v2.1)

Project memory for Claude Code. **Standing instruction from the user: after every task, update the "Work log" below (and any other affected section) so this file always reflects everything done so far.**

## Project overview
- Static marketing site for Medzak Healthcare (no build step, no package.json, no linter).
- Pages: `index.html`, `about-us.html`, `our-products.html`, `achievements.html` (Achievements & Media), `gallery-media.html` (Gallery), `careers.html`, `contact.html`, `our-team.html` (not in menu, noindex). `why-us.html` / `our-offerings.html` are redirect stubs.
- One stylesheet `css/style.css` (light + dark themes, tokens at top), one script `js/main.js` (theme, menu, modals, lightbox, product tabs, ticker, contact form validation).
- Fonts self-hosted: Inter (`inter-var.woff2`), Red Hat Display (`redhatdisplay-var.woff`, deviation: no WOFF2 encoder available).
- Header/nav and footer are byte-identical on all 8 pages — any nav/footer change must be applied to every page.
- Preview locally: `python3 -m http.server` in this folder.
- Git note: the repo root is `/Users/agrimjoshi` (home dir), not this folder; be careful what gets staged. Remote `origin` = `https://github.com/AgrimJoshi1/MedZak.git`, branch `main`. The site lives under `Downloads/MedZak/medzak-website-v2.1/` in that repo; the home-dir working tree has lots of unrelated/private untracked files (`.ssh`, `.aws`, …) and unrelated staged/unstaged changes under `code/`, so don't `git add -A` or pull/rebase there — commit/push from a clean clone instead.

## Key docs in this folder
- `CHANGELOG.txt` — version/round history (v2.1, spec v1.0 status, Rounds 2–3).
- `README.txt` — package/file structure, theme, ticker and Book-a-Demo form notes.
- `WEBSITE_AUDIT.md` — audit (2026-10-23) of site vs client content spec, with IDs (G1, H6, A6, N3 …) and a "Top 10 to fix" list.
- `tree.txt` — folder listing.

## Conventions / decisions
- Product names: **MeiboX** (currently; audit recommends **Meibo-X**), **VuOpt** (renamed from Vucan-X), **Metabo-X**. Slugs `#meibox`, `#vuopt`, `#metabo-x`.
- Nav order: Home | About Us | Our Products | Achievements & Media | Gallery | Careers | Contact Us (+ BOOK A DEMO). Labels were changed deliberately in Round 3; confirm with client before reverting to spec labels.
- Footer: "© 2018 All Rights Reserved"; "Med" blue `#4A68BD`, "zak" orange `#f17732`.
- Book-a-demo and contact forms POST to `https://medzak.co/esend.php`.
- Exact client copy is used verbatim (spec-approved normalisations only) — don't reword content without asking.

## Work log (newest last)
### Initial build (spec v1.0) — done
Nav on all pages, fonts, footer, new CSS tokens, Home (H1–H7), About (A1–A5), Products (P1–P6), Gallery, Careers, Contact, ticker, tabs, README, asset cleanup, metadata. See `CHANGELOG.txt`.

### Round 2 — audit against WEBSITE_CONTENT.docx — done
Copy verified line by line; Metabo-X product image added (watermark cropped); Vision/Solution icons → eye/lightbulb; "Watch More" gets play icon; gallery gets Metabo-X image.

### Round 3 — done
Nav/footer renamed to "Achievements & Media" and "Gallery"; achievements page = 12 achievements + divider + 13 media images; gallery = 24 numbered photos; Vucan-X → VuOpt everywhere; images resized/converted.

### v2.1 (Navigation, tiles, contact form, ticker) — done
Hover mega-dropdowns on all 7 tabs (keyboard, touch, mobile accordion; hamburger below 1200px); uniform 4:3 tiles for Achievements/Media/Gallery with lightbox; Contact "Send Us a Message" form; LinkedIn motion bar under hero; new anchors (`#mission/#vision/#solution`, `#news/#supporters`, `#contact-form/#map`).

### Audit + fixes (2026-10-23) — done
- `WEBSITE_AUDIT.md` produced (65 checks: 37 done, 10 partial, 16 mismatch, 2 N/A). No code changed by the audit itself.
- H6 fixed: hero CTA restyled (`.btn-sky`, white 2px border/text/play icon on `#1c7cb8` pill, AA contrast).
- A6 fixed: new shared `.mvp` Mission/Vision/Solution component on Home and About (photo left, card right; stacks ≤991px); old `.pricing-block` CSS removed.

### 2026-10-26 — CLAUDE.md created
Created this file to keep a running record of all work. No site code changed.

### 2026-10-26 — Pushed site to GitHub (`main`) — done
Pushed all 105 files of this folder (no site code changed) to `origin/main` on `AgrimJoshi1/MedZak`. Preflight: no `.DS_Store`, no secrets, 12 MB total. `origin/main` was 1 commit ahead (`2ef7466` "Delete code directory", touches only `code/`), so the push was done from a fresh clone of `origin/main` with this folder copied in at `Downloads/MedZak/medzak-website-v2.1/` (same path as the home-dir repo), leaving the home-dir repo's index/working tree untouched. The home-dir `main` is therefore still behind `origin/main` and still has this folder staged.

## Open items (from audit; update as they get resolved)
1. Meibo-X vs MeiboX naming (footer, products tab/h2/alt/meta, Home Solution text); decide slug.
2. Nav labels vs spec ("Achievements", "Gallery & Media", "Contact us") — needs client decision.
3. Footer "Medzak" column per spec (Why Us?, Our Offerings, Resources, Our Team, Achievements, Contact Us); confirm Solutions column.
4. H7: "Watch More" CTA only links to Our Products (no video/demo); label vs "Watch Demo".
5. P13: add VuOpt subtitle "High-precision multi-element optics".
6. Exact-text punctuation (P6, P10, P14, A1, C2).
7. A7: add SELCO Foundation, C-CAMP, Govt. Medical College logos; greyscale strip/marquee; also on About Us.
8. H8: replace 6 placeholder ticker items with real LinkedIn posts/URLs (README TODO comment is missing).
9. A2: icon colour pink/grey instead of teal (one-line change to `--mvp-accent`).
10. C6/G8: Mission/Vision placement and "Innovating for disease prevention" divider above Company block on About Us; align Products mega-menu (P1).
11. Misc: Ramjit Vishwakarma placeholder photo; unused `--meibox-*` tokens; stale `#sagarJuneja` modal hash in `js/main.js`; generic gallery alts; `SHE_Innovates_4_0.png` unused; favicon only 60×60.
