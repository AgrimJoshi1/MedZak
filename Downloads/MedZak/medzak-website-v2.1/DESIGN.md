---
name: Medzak Healthcare
description: Calm Clinical Intelligence. A pale-sky, deep-navy medtech site where the eye scan is the only thing that moves and one orange pill asks for the demo.
colors:
  navy-ink: "#0B1F3A"
  navy-deep: "#071528"
  navy-raised: "#11294B"
  clinical-blue: "#2F6DB5"
  clinical-blue-600: "#245A9A"
  clinical-blue-700: "#1B467A"
  sky-tint: "#E8F3FB"
  health-teal: "#14B8A6"
  teal-ink: "#0F766E"
  mint: "#E6FAF6"
  demo-orange: "#F47B30"
  demo-orange-hover: "#EC6A1E"
  orange-ink: "#C2410C"
  orange-tint: "#FFF1E8"
  brand-med-blue: "#4A68BD"
  brand-zak-orange: "#F17732"
  sky-canvas: "#F4F9FD"
  surface: "#FFFFFF"
  surface-sunk: "#EEF4FA"
  ink-secondary: "#2E405A"
  ink-tertiary: "#55667D"
  danger: "#D93025"
  night-canvas: "#07121F"
  night-surface: "#0C1A2B"
  night-surface-raised: "#10233A"
  night-ink: "#EAF2FB"
typography:
  display:
    fontFamily: "Red Hat Display, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 1.3rem + 3vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Red Hat Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.45rem + 1.5vw, 2.75rem)"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Red Hat Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.12rem + 0.45vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Inter, Inter Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, Inter Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, Inter Fallback, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "0.005em"
rounded:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  pill: "999px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-8: "48px"
  s-9: "64px"
  s-10: "80px"
  s-12: "128px"
components:
  button-primary:
    backgroundColor: "{colors.demo-orange}"
    textColor: "{colors.navy-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  button-primary-hover:
    backgroundColor: "{colors.demo-orange-hover}"
    textColor: "{colors.navy-ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.pill}"
    height: "48px"
  button-on-navy:
    backgroundColor: "rgba(255,255,255,.08)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    height: "48px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    height: "30px"
    padding: "4px 12px"
  chip-teal:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.pill}"
  badge:
    backgroundColor: "{colors.sky-tint}"
    textColor: "{colors.clinical-blue-700}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.xl}"
    padding: "32px"
  card-glass:
    backgroundColor: "rgba(255,255,255,.72)"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.xl}"
  icon-chip:
    backgroundColor: "{colors.sky-tint}"
    textColor: "{colors.clinical-blue-600}"
    rounded: "14px"
    size: "48px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "12px 14px"
  tablist:
    backgroundColor: "{colors.sky-tint}"
    rounded: "{rounded.pill}"
    padding: "6px"
  stats-band:
    backgroundColor: "{colors.navy-deep}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
  utility-bar:
    backgroundColor: "{colors.navy-deep}"
    textColor: "#9FB3CC"
    height: "38px"
---

# Design System: Medzak Healthcare

## Overview

**Creative North Star: "Calm Clinical Intelligence"**

A medtech site that proves the device before it sells it. The page is a pale-sky field with deep-navy ink, hairline-bordered 24px cards and generous section spacing. The one thing that moves continuously is the scan ring sweeping the iris in the hero; everything else holds still until it is scrolled to or touched. Clinical trust comes from clarity, whitespace and restraint, not stock imagery or hype.

The audience is a hospital, lab or outreach-programme buyer weighing evidence, so the system leads with measured facts (stat chips, stat band, checklists) and keeps decoration to faint ECG and molecule line motifs at 4-6% opacity. Teal marks "measured / positive" things; blue carries structure and links; a single orange pill carries the one action, BOOK A DEMO. Dark mode is a deep-navy night, never black, with the same hierarchy re-tuned for contrast.

The build departs from the brief in one honest way: the brief named Plus Jakarta Sans / Sora, but the shipped faces are the self-hosted Red Hat Display and Inter.

**Key Characteristics:**
- Pale-sky canvas, navy ink, clinical blue structure, teal for measured marks, one orange for action.
- Pill buttons and chips; 24px cards with a hairline border and a soft navy-tinted shadow.
- Glass (translucent + blur) only on the scrolled header, hero stat chips and floating UI.
- One continuous motion (the scan ring); all else is reveal-on-scroll and state response, off under reduced motion.
- Every text/background pair is AA in both themes; 44px touch targets on touch screens.

## Colors

A cool clinical palette: sky-white surfaces, navy ink, blue for structure, teal for evidence, a single warm orange for the ask.

### Primary
- **Demo Orange** (#F47B30; #F7924F in dark): the only orange fill. BOOK A DEMO, the primary action in forms and bands, the mobile quick-bar primary slot, and the focus ring. Text on it is always navy (#0B1F3A, 6.1:1); white on it fails (about 2.7:1).
- **Clinical Blue** (#2F6DB5, 600 #245A9A, 700 #1B467A): structure and links (links use 600), tab and hover tints, the start of the gradient hairline and progress bar.
- **Navy Ink** (#0B1F3A): headings, primary text, text on orange, and the base of the navy bands.

### Secondary
- **Health Teal** (#14B8A6; text-safe Teal Ink #0F766E, tint Mint #E6FAF6): reserved for "measured / positive" marks: the scan ring, check icons, founding-year chip, success state, teal ends of gradients.

### Neutral
- **Sky Canvas** (#F4F9FD): page background. **Surface** (#FFFFFF) for cards; **Sky Tint** (#E8F3FB) for tab rails and icon-chip washes; **Surface Sunk** (#EEF4FA) for image wells and notices.
- **Ink Secondary** (#2E405A) body text; **Ink Tertiary** (#55667D) captions and descriptors.
- **Navy Deep** (#071528) and **Navy Raised** (#11294B): the utility bar, stats band, CTA band and footer-adjacent navy blocks.
- **Hairlines**: navy at 9% (borders) and 17% (inputs, stronger dividers).
- **Night Canvas** (#07121F), **Night Surface** (#0C1A2B), **Night Raised** (#10233A), **Night Ink** (#EAF2FB): the dark theme. Accent tokens lighten (blue #6EA8F0, orange #F7924F, teal #2DD4BF).
- **Brand wordmark colors** (Med #4A68BD, zak #F17732) appear only in the wordmark treatment; the orange-ink variant (#C2410C) is used when that orange is text.

### Named Rules
**The One Orange Rule.** Orange fills belong to BOOK A DEMO and the primary action of a surface. Orange as text or hover accent uses the darker Orange Ink, never the fill color, and never competes with a primary button in the same viewport.
**The Teal Means Measured Rule.** Teal marks only things the product measures or confirms. It is not a second decorative accent.
**The Navy-On-Orange Rule.** Anything sitting on the orange fill uses navy text. White text on orange is not allowed.
**The Not-Black Rule.** Dark mode is #07121F-based. Pure black is never a surface or text color.

## Typography

**Display Font:** Red Hat Display (self-hosted variable, with system sans fallbacks)
**Body Font:** Inter (self-hosted variable, font-display: optional, with a metric-matched "Inter Fallback" so there is no layout shift)

**Character:** Red Hat Display is confident and slightly geometric for headings, set tight with negative tracking; Inter is a neutral reading face for copy, labels and controls.

### Hierarchy
- **Display** (800, clamp 2.4rem to 3.75rem, 1.05, -0.04em): the Home H1 only.
- **Headline / H1 page title** (800, clamp 2.25rem to 3.5rem, -0.035em): inner-page titles. **H2 section titles** (750, clamp 1.875rem to 2.75rem, -0.03em).
- **Title** (700, clamp 1.25rem to 1.5rem, -0.02em): card, step, serve-row and mvp-row headings. Smaller titles run 15-19px at 650-700.
- **Lead** (400, clamp 1.0625rem to 1.25rem, 1.6): hero and section intros, capped at 60ch.
- **Body** (400, 1rem, 1.6): paragraphs, 60ch measure; secondary copy 14-15px in Ink Tertiary.
- **Label** (650, 15px buttons, 13-14.5px nav and chips): buttons and nav. Small caps-style labels (dropdown titles, footer widget titles, badges) are 11-12px, 700, uppercase, +0.08 to +0.12em tracking.
- **Stat value** (800, clamp 2.25rem to 3.25rem, tabular numerals): numbers in stat blocks and the stats band.

### Named Rules
**The Tight Display Rule.** Red Hat Display headings always carry negative letter-spacing (-0.02em to -0.04em); Inter text never does.
**The Gradient Once Rule.** Gradient text (blue to teal) appears once: "Early Detection" in the Home H1.

## Layout

A single 1200px container with a fluid gutter (16 to 32px). Sections use a fluid vertical rhythm (60 to 104px) and alternate between sky canvas, white surface and a sky gradient; navy bands (stats, CTA) provide the contrast beats. The spacing scale is 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128.

Home reads as: ticker, hero split (55/45, copy left, eye scan right), quick-action strip, product tabs with a feature panel, four-step timeline, navy stats band, serve list, about split with checklist and mission/vision/solution rows, achievements carousel, gallery masonry, teasers, supporters logo wall, CTA band, footer. Inner pages share a breadcrumb plus slim page hero. Grids are auto-fit with a minimum card width (230, 300, 420px); splits stack below 992px; the footer is four columns from 900px.

Navigation: seven tabs plus BOOK A DEMO in one line from 1200px; below that a full-screen drawer with an accordion. Under 768px a four-slot quick bar (call back, email, book demo, menu) is fixed to the bottom. Hero order on phones puts the eye scan right after the H1.

## Elevation & Depth

A hybrid: hairline borders and tonal surfaces do most of the work at rest, and soft layered shadows appear on lift. Light-mode shadows are navy-tinted; dark-mode and overlay shadows are neutral black. Glass is a sanctioned depth device only on the scrolled header, hero stat chips, glass cards, small floating chips on photos and the mobile quick bar.

### Shadow Vocabulary
- **Rest** (`0 1px 2px rgba(11,31,58,.05), 0 2px 8px rgba(11,31,58,.04)`): cards, secondary buttons.
- **Raised** (`0 2px 4px rgba(11,31,58,.04), 0 12px 32px rgba(11,31,58,.08)`): glass cards, product feature panel, stat chips.
- **Lifted** (`0 6px 12px rgba(11,31,58,.06), 0 28px 64px rgba(11,31,58,.14)`): hover on interactive cards, hero photos.
- **CTA** (`0 8px 22px rgba(0,0,0,.14)`, hover `0 12px 28px rgba(0,0,0,.20)`): the orange button only.
- **Overlay** (`0 6px 12px rgba(0,0,0,.10), 0 28px 64px rgba(0,0,0,.28)`): modals over the scrim.
- **Header** (`0 8px 28px rgba(11,31,58,.07)`) once scrolled. Dark mode swaps each to black at higher opacity.

### Named Rules
**The Soft Lift Rule.** Shadows are diffuse and blurred (two layers, large radius). Hard offset or zero-blur shadows are not used.
**The Glass Is Rare Rule.** Backdrop blur is reserved for the scrolled header and floating UI; content cards sit on solid surfaces.

## Shapes

Soft, rounded and pill-forward. Buttons, chips, badges, tablists and tab indicators are full pills (999px). Cards and modals are 24px; product feature and photo frames 28px; hero eye mask 36px; fields 12px; dropdown panels 16px; icon chips 10-18px by size; checkboxes 7px. Images inside cards take the card's inner radius (16-24px). Circles are used for icon buttons, timeline markers and the scan ring. Borders are always 1px hairlines; accent edges appear as a gradient hairline (blue, teal, orange) on hover for glow cards and as a 2-3px gradient underline for active tabs.

## Components

### Buttons
- **Shape:** full pill, 48px tall (40 small, 56 large), 22px side padding, Inter 650 at 15px.
- **Primary:** Demo Orange fill, navy text, CTA shadow; hover darkens to #EC6A1E and lifts 1px; an arrow icon nudges 4px right.
- **Secondary:** white surface, navy text, 1px strong hairline; hover shifts text and border to blue. **Ghost:** transparent, blue-tint wash on hover. **On-navy:** 8% white fill with a 22% white border for navy bands.
- **Focus:** 2px orange outline, 3px offset on every focusable control. Disabled: 55% opacity.
- "Watch More" carries a small round play disc inside the pill.

### Chips and Badges
Chips are 30px pills, white with a hairline border, in teal, blue or orange tints for status. Badges are 11px uppercase tinted pills (award category). The brand chip pairs the logo with the founding year divided by a hairline.

### Cards / Containers
24px radius, white surface, 1px hairline, Rest shadow, 20-32px fluid padding. Variants: flat (no shadow), interactive (lifts 4px with Lifted shadow on hover and focus), glow (gradient hairline fades in), glass (translucent with blur). Award cards, tile cards and team cards use the same recipe with a 4:3 or 5:4 media area on top and zoom on hover.

### Icon chips, stats
Icon chips are rounded squares with a sky-to-mint wash and a blue line icon (Lucide-style 1.8-2px strokes, SVG only). Stat blocks are Red Hat Display numerals over a muted label; stat chips are glass pills with an icon chip. The stats band is a navy panel with a faint ECG line and white-on-navy numerals with teal units.

### Section header and page hero
Section header: title (H2) then a lead-sized muted subhead, left-aligned or centered, 760px max. Head-row pairs it with a right-aligned action. Inner pages open with a breadcrumb (chevron separators, current page in navy 600) above the page title and a measured intro.

### Tabs
Pill rail on sky tint with a white sliding indicator (shadow plus hairline) that glides under the selected tab. The cards variant (Our Products) is a hairline-underlined grid of tabs with descriptors and a 3px orange-to-blue underline indicator. The panel it reveals is the product feature card: photo left, copy, checklist, chips and actions right.

### Timeline steps, serve list, mission rows
Four circular numbered markers joined by a line that draws on scroll (blue to teal). Serve list and mission/vision/solution rows are single hairline-separated panels or lists (name with icon chip, description, text link), not stacked cards.

### Carousel, tiles, logo wall
Award carousel is a snap-scrolling row of award cards with arrow buttons. Masonry and tile grids use 20px radius images with a glass zoom button; clicks open the lightbox. The logo wall is greyscale, multiplied, with color on hover; reversed to screen blend in dark mode.

### Inputs / Fields
Visible labels above 48px fields, 12px radius, white surface, strong hairline. Hover shifts the border to blue; focus adds a blue border and a 4px blue-tint ring; errors use the red border, a 4px red ring and an inline message. Checkboxes are custom 22px with a teal check. A honeypot field and an inline form status line accompany each form; a success panel replaces the form on completion.

### Navigation
Header: glass bar that shrinks from 72 to 62px after 8px of scroll with a 2px blue-teal-orange progress hairline, a navy utility bar above it from 1200px that collapses on scroll. Tabs are 14.5px pills; the active or hovered tab shows an orange-to-blue underline. Dropdown panels are 340px, 16px radius, white, with a notch aligned to the tab; each item is an icon chip, name, one-line descriptor, optional two-line detail and an arrow that nudges on hover. On mobile the panel becomes an accordion inside a full-screen drawer. Right-hand panels open leftward.

### Modals, palette, floating UI
Demo and call-back modals: 24px dialog on a blurred navy scrim, 40px close button, labelled fields. The search palette (Ctrl/Cmd+K) is a 640px dialog with a 60px input, group labels and a keyboard-hint footer. Floating UI: scroll-to-top button, a vertical navy call-back tab on the right edge from 768px, a consent notice card bottom-left, and the mobile quick bar. Footer notices are tinted rounded rows with an icon.

### Footer
A navy CTA band card (28px radius, gradient and ECG line, orange primary beside an on-navy secondary) sits above a four-column footer with tagline, link lists, contact info, greyscale supporter strip, notices and legal links.

## Do's and Don'ts

### Do:
- **Do** keep BOOK A DEMO as the single orange fill in a viewport, with navy text (#0B1F3A on #F47B30).
- **Do** use teal only for measured or positive marks, and Orange Ink / Teal Ink (never the fills) when the color is text.
- **Do** use Red Hat Display with negative tracking for headings and Inter for everything else.
- **Do** build cards at 24px radius with a 1px hairline and the Rest shadow; lift on hover with the Lifted shadow.
- **Do** let the scan ring be the only continuous motion in the first viewport; add other motion as reveal or state response only.
- **Do** honor `prefers-reduced-motion` (animations and transitions collapse, reveals show immediately) and keep focus visible (2px orange, 3px offset).
- **Do** keep dark mode on #07121F-based surfaces with neutral black shadows, and verify AA in both themes.
- **Do** use hairline-separated rows or lists instead of a grid of identical cards when content is a list.

### Don't:
- **Don't** put white text on the orange fill, or use orange fills for anything but primary actions.
- **Don't** use gradient text anywhere except the Home H1 "Early Detection".
- **Don't** apply backdrop blur to content cards; glass is for the scrolled header and floating UI.
- **Don't** use pure black for dark-mode surfaces or text.
- **Don't** use hard offset shadows or tinted navy shadows on dark surfaces.
- **Don't** reintroduce a stock-doctor hero, an identical icon-card grid, or a testimonial carousel; none exists in the evidence.
- **Don't** add more than faint (4-6%) ECG or molecule line motifs as ornament.

<!-- Not canonized: the stylesheet still defines an uppercase teal-dot "eyebrow" kicker (.eyebrow, used only on design-system.html, not on shipped pages) and an unused tooltip primitive; neither is a system rule for new surfaces. -->
