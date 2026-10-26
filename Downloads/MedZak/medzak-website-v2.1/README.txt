Medzak Healthcare - website package ("Calm Clinical Intelligence" redesign)
=========================================================================

Static site: plain HTML, one stylesheet, one script. No framework and no build step on the
server; the Python tools below only help while editing.

Pages
-----
index.html            Home: hero (scan ring + stat chips), two-row LinkedIn ticker (#news), quick actions,
                      product tabs (#products), how MeiboX works, impact numbers, who we serve,
                      About Us (#about), achievements carousel, gallery, supporters (#supporters), teasers
about-us.html         About Medzak: mission / vision / solution (#mission, #vision, #solution), team link
our-products.html     Tabbed products MeiboX | Metabo-X | VuOpt (deep links #meibox, #metabo-x, #vuopt)
achievements.html     Achievements (#achievements), Media (#media), Supporters & Funders (#supporters); lightbox
gallery-media.html    Gallery: 24 photos, masonry + lightbox (arrow keys, Esc)
careers.html          Careers
contact.html          Contact Us: details, "Send Us a Message" form (#contact-form), map (#map)
our-team.html         Our Team (not in the menu; noindex) with Varsha Singh's bio dialog
404.html              Error page (noindex). Point your server's 404 to it (see htaccess.example).
privacy.html, terms.html
                      PLACEHOLDERS marked [Add real content] (noindex). Replace before launch.
why-us.html, our-offerings.html
                      Small redirect pages to about-us.html / our-products.html. Prefer a 301 at the host.
design-system.html    Reference page: tokens, contrast table, every component (noindex).
robots.txt, sitemap.xml   Crawl files (sitemap lists the 7 indexable pages by their canonical URLs).

Upload ONLY the public files
----------------------------
Upload: *.html, robots.txt, sitemap.xml, css/, js/, assets/.
Do NOT upload (development only): tools/, docs/, .impeccable/, PRODUCT.md, DESIGN.md, CLAUDE.md,
WEBSITE_AUDIT.md, CHANGELOG.txt, README.txt, tree.txt, htaccess.example, .gitignore.

Global features (every page)
----------------------------
- Utility bar (desktop): address, email, Request a Call Back, Careers, Search. Collapses on scroll.
- Glass header that shrinks on scroll with a reading-progress line; one compact dropdown per tab.
- Search palette: Ctrl+K (Cmd+K on Mac) or the search icon. Its index is generated from tools/nav-data.json.
- Book a Demo and Request a Call Back dialogs (both POST to https://medzak.co/esend.php).
- Phones: full-screen menu + bottom quick-action bar (Call back, Email, Book demo, Menu).
  Tablets/desktop: a "Call back" tab on the right edge and a back-to-top button.
- Footer: Book-a-demo band, links, "Backed by" logos, medical disclaimer, advisory notice, privacy/terms.
- A one-time storage notice (the site stores only the theme choice; the Contact map is Google Maps).

Forms
-----
All forms (Book a Demo, Request a Call Back, Contact) validate inline and use a honeypot.
- On medzak.co itself (same origin as esend.php) the form is sent in the page and a success panel
  replaces it. CHECK: esend.php must return an HTTP error status when sending fails, otherwise the
  success panel would show anyway.
- Anywhere else (local preview, another domain) it is a normal POST to esend.php.
- Call back adds "[Call back request] Interested in: ..." to userComments; email is optional there.
If you host elsewhere, change the form actions in tools/partials/modals.html and contact.html.

Editing
-------
css/style.css         ONE stylesheet. Tokens at the top (":root" = light, ":root[data-theme=dark]" and the
                      prefers-color-scheme block = dark). Section 8 = page sections.
js/main.js            ONE script (theme, menu, dropdowns, dialogs, palette, forms, lightbox, tabs, carousel,
                      ticker, reveals, count-up, parallax). No dependencies.
tools/nav-data.json   The header menu (tabs, dropdown items) and the search index. Edit this, never the
                      menu HTML in the pages.
tools/partials/       head, icons (SVG sprite), header, footer, modals: shared by every page.
tools/build.py        python tools/build.py          fills the shared regions <!-- @name --> ... <!-- /@name -->
                      python tools/build.py --check  exit 1 if a page is out of date
tools/content_inventory.py --check
                      proves nothing was removed compared with docs/content-baseline.json (before the redesign).
tools/make_thumbs.ps1 (Windows) writes the smaller image copies in assets/images/thumbs/ used by srcset.
                      Run it after adding photos:  powershell -ExecutionPolicy Bypass -File tools\make_thumbs.ps1
                      Then add the copies to the new <img> as srcset/sizes (see any tile in gallery-media.html).
Preview: python -m http.server 8000 in this folder, then open http://localhost:8000/

Fonts and images
----------------
assets/fonts/         Inter (body, font-display:optional with a metric-matched fallback) and Red Hat Display
                      (headings). Self-hosted, no CDN.
assets/images/thumbs/ 480 / 800 px copies (and a 320 px logo) generated from the originals; the originals stay
                      as the src and are what the lightbox opens.

Placeholders to replace (nothing was invented)
---------------------------------------------
- privacy.html, terms.html: real policy text ([Add real content]).
- Ticker: the six items are existing achievement captions linking to achievements.html; replace with real
  LinkedIn post URLs when available.
- No phone / WhatsApp number or company social links exist, so none are shown. Add them to the utility bar
  and quick-action bar (tools/partials/header.html, modals.html) once they exist.
- "Watch More" links to Our Products; there is no product video yet.
- Advisory notice wording in the footer ("Medzak never asks for bank details, passwords or payments ...")
  needs the client's approval.
