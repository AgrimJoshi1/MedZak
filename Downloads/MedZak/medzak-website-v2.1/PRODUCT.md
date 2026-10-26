# Product

<!-- impeccable:product-schema 1 -->

> Provenance: the user declined the init interview and supplied a build brief instead. Facts marked
> **[from brief]** come from that brief, **[from site]** from the repo's current copy, **[inferred]** are
> my reading of those two and are open to correction. Nothing here comes from a conversation answer.

## Platform

web

## Users
- **Primary [inferred from brief]:** decision-makers at hospitals, diagnostic labs and outreach / screening
  programmes. The brief calls this "a B2B medtech brand (hospitals, labs, outreach camps)" and says to adapt a
  hospital-patient pattern set to that audience. Their job: understand what the devices do, judge whether the
  evidence is credible, and book a demo.
- **Secondary [inferred from site]:** government funders, incubators and partners (BIRAC, NIDHI-PRAYAS, MeitY,
  DSIR, RICH) checking credibility; prospective hires (applications go by email to director@medzak.co).
- **Not the audience [from brief]:** patients arriving on a hospital-style appointment flow.

## Product Purpose
Medzak Healthcare Pvt. Ltd. (Estd. 2018, New Delhi) builds portable, AI-powered, non-invasive diagnostics for
ocular and metabolic disease, aimed at early detection without the cost of traditional equipment [from site].
The website's job is to turn a credible-but-unfamiliar visit into a demo request (BOOK A DEMO is the one
dominant action [from brief]). Success = demo requests and contact messages reaching `esend.php`
[inferred: the only conversion endpoint on the site].

## Positioning
Meibo-X is a handheld 4-in-1 imaging device (IR, visible, ultrasonic and fluorescence) with AI that screens
10 surface eye diseases in under 2 minutes at >92% imaging accuracy [from site]. Medzak also states
"Patented optical technology • Clinically validated AI" [from site]. The differentiator a neighbour could not
truthfully copy is the combination of in-house patented optics (VuOpt) and the 4-in-1 portable device
[inferred; headline differentiator not confirmed by the user].

## Operating Context
Visitors are evaluating equipment for OPDs, labs and outreach camps. The site is a static marketing site; the
Book-a-Demo and Contact forms POST to `https://medzak.co/esend.php`. Contact is by email
(admin@medzak.co, director@medzak.co) and a New Delhi address [from site].

## Capabilities and Constraints
- **Products [from site]:** Meibo-X (shown as "MeiboX" in much of the copy; the spelling is an open client
  decision), Metabo-X (AI metabolomics from a blood sample; a clinical decision aid, not a replacement for
  diagnosis), VuOpt (multi-element optics: up to 40% MTF, 5-10 cm detection range, low power).
- **Hard rule [from brief]:** nothing that exists today may be removed (pages, nav items, sections, copy,
  stats, images, ticker items, forms, links). Presentation may change; content may not. The repo enforces
  this with `python tools/content_inventory.py --check`.
- **Copy [from site]:** client copy is used verbatim. New sections that need content get a clearly marked
  `[Add real content]` placeholder, listed in the hand-off.
- **No invented claims [from brief]:** no medical claims, numbers, certifications, awards, doctors or
  testimonials beyond what the site already states.
- **Stack [from brief + repo]:** the brief names Next.js 14 + Tailwind but says to adapt to the existing repo;
  the repo is static HTML/CSS/JS with a small Python build (`tools/build.py`). The stack stays static.
- **Absent today, must not be fabricated:** a phone number, WhatsApp number, company social-media URLs, a
  product video, a brochure, certifications or accreditations, testimonials, a newsletter, job listings.
- **Undecided:** Meibo-X vs MeiboX; nav labels vs the original spec; the regulatory / evidence status behind
  ">92% accuracy" and "clinically validated" (published as the site states them, no approval marks implied).

## Brand Commitments
- Medzak logo, with "Med" blue `#4A68BD` and "zak" orange `#F17732` [from site].
- Blue + orange brand DNA, dark mode, and BOOK A DEMO as the single dominant CTA [from brief].
- The build brief pins the design direction "Calm Clinical Intelligence" and a token set (recorded in the
  surface brief and DESIGN.md, not here).

## Evidence on Hand
12 achievements (photos in `assets/images/achievements/`), 13 media features (`assets/images/media/`), 24
gallery photos, 6 supporter logos (BIRAC, WInER, NIDHI-PRAYAS, MeitY, DSIR, RICH), product photography for
Meibo-X, Metabo-X and VuOpt, six LinkedIn-style ticker items, a five-person team. Product facts above are the
only quantitative claims. There is no video, brochure, testimonial, certification or user/impact count.

## Product Principles
1. **Evidence before adjectives.** Every claim on the page traces to existing site copy.
2. **One action.** BOOK A DEMO is the only orange thing in a viewport; everything else supports it.
3. **Built for the clinic, not the patient.** Speak to the person buying and deploying equipment.
4. **Nothing removed, nothing invented.** Reorganise freely; add only labelled placeholders.
5. **Calm, not cold.** Clinical trust through clarity, whitespace and restraint, not stock imagery or hype.

## Accessibility & Inclusion
WCAG 2.2 AA contrast in light and dark, visible focus, skip link, semantic landmarks, labelled forms, 44px touch
targets, `prefers-reduced-motion` respected [from brief].
