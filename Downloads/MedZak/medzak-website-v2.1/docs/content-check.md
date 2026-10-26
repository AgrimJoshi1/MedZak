# Content check: "nothing removed" (2026-10-26)

The checklist is [content-inventory.md](content-inventory.md), snapshotted from the pages **before** the redesign
into `content-baseline.json`. `python tools/content_inventory.py --check` walks every item of that snapshot
against the redesigned pages: every text block, alt / aria text, image, link, form field, iframe and linked anchor.

Result after phases 0–6:

```
0 missing, 0 notes
```

Pages checked: index, about-us, our-products, achievements, gallery-media, careers, contact, our-team,
why-us, our-offerings (all 10 pages of the baseline).

What moved rather than disappeared:
- The page-level "Are you interested in effective and affordable ocular care?" sections on Our Products and
  Contact now live in the shared CTA band above every footer (same text, same `#cta-title` id).
- The About page's logo-only band became a closing brand block (same logo image and alt text).
- "Innovating for disease prevention" (ticker banner) is the first ticker item and the Home tagline band,
  without the underscore padding.
- Our Team: roles are labels under each name instead of `<h4>` headings (same text).

Re-run after any edit: `python tools/content_inventory.py --check` (exit 1 lists anything missing).
