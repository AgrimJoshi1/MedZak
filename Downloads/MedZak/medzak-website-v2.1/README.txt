Medzak Healthcare - website package
===================================

Pages
-----
index.html            Home (hero, About Us, news ticker, tagline, supporters)
about-us.html         About Medzak
our-products.html     Tabbed products: MeiboX, VuOpt, Metabo-X (deep links #meibox, #vuopt, #metabo-x)
achievements.html     Achievements & Media (achievements, divider, media coverage; lightbox)
gallery-media.html    Gallery (24 numbered photos, in order; lightbox grid)
careers.html          Careers
contact.html          Contact Us
our-team.html         Not linked from the menu; marked noindex
why-us.html, our-offerings.html
                      Small redirect pages to about-us.html / our-products.html.
                      Prefer a 301 redirect at your web host if available.

Files
-----
css/style.css         ONE stylesheet (light + dark themes)
js/main.js            ONE script (theme, menu, modals, lightbox, product tabs, news ticker)
assets/images/        site images
  achievements/       achievement photos (used by achievements.html)
  gallery/            numbered gallery photos 1..22 (+7a, 18a)
  media/              media coverage images 1..13
assets/fonts/         Inter (inter-var.woff2), Red Hat Display (redhatdisplay-var.woff), icomoon, Flaticon.
                      All fonts are served locally - no CDN.

Open index.html in a browser, or upload the folder to your web host as-is.

Theme
-----
Follows the visitor's system setting; the sun/moon button overrides it and the choice is remembered.
Colours and the new font/hero/ticker/tab tokens live at the top of css/style.css
(":root" = light, ":root[data-theme=dark]" = dark).

News ticker (Home)
------------------
The six ticker items are PLACEHOLDERS (the achievement captions, linking to achievements.html).
Replace them with real LinkedIn posts: see the TODO comment above the <ul class="ticker-track"> in index.html.

Book-a-demo form
----------------
Posts to https://medzak.co/esend.php. If you host elsewhere, change the form action in the
"bookDemo" modal (it appears once per page).
