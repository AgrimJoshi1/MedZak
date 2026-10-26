---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["about-us.html","our-products.html","achievements.html","gallery-media.html","contact.html","our-team.html"]
---

# Surface brief: Home (index.html) and the pages that inherit its system

## Scope and mode
Persuade. Home is the lead surface; about-us, our-products, achievements, gallery-media, contact and our-team
inherit the same system as slimmer "inner page" surfaces (slim hero + breadcrumb, section rhythm, closing CTA).
Build path: code-led (no image generation in this harness; HTML is the composition).

## Audience, job, action, proof, constraints
- Audience: hospital / lab / outreach-programme decision-makers (inferred). Secondary: funders, hires.
- Job: understand the device, judge the evidence, book a demo.
- Action: BOOK A DEMO (modal -> esend.php). Secondary: Request a call back (same endpoint), Contact.
- Proof on hand: >92% imaging accuracy, 10 diseases, under 2 minutes, 4-in-1 imaging, up to 40% MTF,
  5-10 cm range, Estd. 2018, 12 achievements, 13 media features, 24 photos, 6 supporter logos.
- Constraints: nothing removed (inventory check = 0 missing), nothing invented, copy verbatim, static
  HTML/CSS/JS, light + dark, WCAG 2.2 AA, reduced motion respected.

## Direction (brief-pinned, no roll): "Calm Clinical Intelligence"
Tokens, fonts and primitives already live in `css/style.css`; this brief does not restate them.

## Direction contract

THESIS: A medtech site that proves the device before it sells it. The eye scan itself (a ring that sweeps the
iris, three measured facts pinned to it) is the single thing that moves; everything else is calm. It refuses
the category default: stock-doctor hero, a grid of identical icon cards, and a testimonial carousel.

OWN-WORLD: Pale-sky canvas (#F4F9FD to #E8F3FB), deep navy ink (#0B1F3A), clinical blue (#2F6DB5) for
structure, health teal (#14B8A6) only for "measured / positive" marks, and one orange (#F47B30) reserved for
BOOK A DEMO with navy text. 24px hairline-bordered cards, teal-dot eyebrows, glass only on the header and
floating chips, ECG and molecule line motifs at 4-6%. Dark mode is deep navy (#07121F), not black.
Recognisable with the words removed: a sky field, one orange pill, a scanning ring.

STORY: A lab or hospital lead sees a device scanning an eye, reads three measured facts, sees three products
side by side, trusts the funders and the awards, and books a demo without hunting for how.

FIRST VIEWPORT: 1440x900. Utility bar (email, address, call-back) over a glass header. Below it a split:
left 55% opens with the display H1 (gradient on "Early Detection"), then the lead paragraph, BOOK A DEMO
(orange) beside Watch More (outlined, play disc), and a trust row: the Medzak logo + "Estd. 2018" chip,
"Patented optical technology", "Clinically validated AI". Right 45%: the eye image in a large rounded mask
with the animated scan ring; three glass readings (">92% imaging accuracy", "10 major surface eye diseases",
"< 2 min to results") pinned to the ring by teal leaders; the lab image as an overlapping card. On phones the
eye scan follows the H1 so it is in the first viewport. Primary action: BOOK A DEMO (left column; the quick
bar on phones).

FORM: "Calm Clinical Intelligence", pinned by the user's brief. No concept-seed roll was run: new-work.md
lets a user- or brief-pinned direction beat the roll, and the world already existed in code (Phases 1-2).
seed: none (direction pinned by the user's brief; no roll run)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions
- Meibo-X vs MeiboX spelling; whether Watch More should open a video (none exists); phone / WhatsApp / social
  URLs (none exist, so the utility bar and mobile quick-action bar use email, call-back and demo only).
