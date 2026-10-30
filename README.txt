Medzak Healthcare - website package
===================================

Pages
-----
index.html            Home (hero, About Us, news ticker, tagline, supporters)
about-us.html         Redirect to index.html#about (About Us now lives on Home)
our-products.html     Tabbed products: MeiboX, VuOpt, Metabo-X, ANGELX (deep links #meibox, #vuopt, #metabo-x, #angelx)
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

Book-a-demo form
----------------
Posts to https://medzak.co/esend.php. If you host elsewhere, change the form action in the
"bookDemo" modal (it appears once per page).
