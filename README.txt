Medzak Healthcare - website package
===================================

Pages
-----
index.html            Home (hero, About Us, news ticker, tagline, supporters)
about-us.html         Redirect to index.html#about (About Us now lives on Home)
our-products.html     Tabbed products: Meibo-X, VuOpt, Metabo-X, Angel-X (deep links #meibox, #vuopt, #metabo-x, #angelx)
achievements.html     Achievements & Media (achievements, divider, media coverage; lightbox)
gallery-media.html    Gallery (24 numbered photos, in order; lightbox grid)
careers.html          Careers
contact.html          Contact Us
our-team.html         Not linked from the menu; marked noindex
why-us.html, our-offerings.html
                      Small redirect pages to index.html#about / our-products.html.
                      Prefer a 301 redirect at your web host if available.

Files
-----
css/style.css         ONE stylesheet (single light theme, monotone blue)
js/main.js            ONE script (menu, modals, lightbox, product tabs, news ticker)
assets/images/        site images
  achievements/       achievement photos (used by achievements.html)
  gallery/            numbered gallery photos 1..22 (+7a, 18a)
  media/              media coverage images 1..13
assets/fonts/         Inter (inter-var.woff2), Red Hat Display (redhatdisplay-var.woff), icomoon, Flaticon.
                      All fonts are served locally - no CDN.

Open index.html in a browser, or upload the folder to your web host as-is.

Theme
-----
One light theme: white backgrounds, a single blue scale (--blue-50 … --blue-800, --ink) and
white cards with soft blue-tinted shadows (--shadow-soft at rest, --shadow-card on hover).
All tokens live in ":root" at the top of css/style.css. --accent (= --blue-600) is the
button/link colour; white text on it is 4.9:1. There is no dark mode.

News ticker (Home)
------------------
The six ticker items are PLACEHOLDERS (the achievement captions, linking to achievements.html).
Replace them with real LinkedIn posts: see the TODO comment above the <ul class="ticker-track"> in index.html.

Forms (Book a Demo + Contact)
-----------------------------
Both post to https://medzak.co/esend.php (Book a Demo modal on every page, contact form on
contact.html). As of 2026-11-01 a plain GET of esend.php answers 301 -> https://medzak.co/esend;
if POSTs are redirected too, browsers resend them as GET and the form data is lost. Before launch,
send one real test enquiry from each form and confirm it arrives. If it doesn't, change the form
action to https://medzak.co/esend (2 places per page: modal + contact form).

Hosting
-------
Plain static files, no build step: upload the folder as-is (any static host, Apache, Vercel, Netlify).
- 404.html: custom "page not found" page (root-relative links, so it works at any URL depth).
  Vercel/Netlify use it automatically; on Apache add  ErrorDocument 404 /404.html  to .htaccess.
- robots.txt + sitemap.xml list the public pages on https://medzak.co (our-team.html is noindex).
- Canonical / og:url tags point at https://medzak.co/<page>.html; if the site goes live on another
  domain, change them (and sitemap.xml, robots.txt).
- Grid images (Achievements, Media, Gallery) use 800px copies in assets/images/thumbs/;
  clicking opens the full-size original. Re-create a thumb when you replace a photo.
- Supporter logos and product images load immediately (not lazily) on purpose: lazy images in the
  sideways-scrolling logo strip and in hidden product tabs showed up blank on phones.
