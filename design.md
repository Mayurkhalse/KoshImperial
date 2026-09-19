# Kosh Imperial — Design System

**Visual Language, Color Application & Section-Level Design Specification**

---

## 1. Design Philosophy

Kosh Imperial should read as **quiet luxury with a conscience** — closer to an heirloom leather goods house than a "green" startup. Sustainability is communicated through material honesty and craft detail, never through loud iconography or slogans. Every design decision should ask: *does this feel premium first, sustainable second?*

Principles:
- Generous white space over dense layouts
- Serif display type for emotion, clean sans for clarity
- Photography does the talking — UI chrome stays minimal
- Earth tones only — no bright greens, no "eco" clichés (no leaf-covered gradients, no neon)

---

## 2. Color System

### 2.1 Brand Palette (source)

| Name | Hex | Swatch |
|---|---|---|
| Evergreen | `#253929` | ■ deep forest green |
| Milkglass | `#F7F6E4` | ■ warm off-white |
| Driftwood | `#D4C4A8` | ■ warm beige/tan |
| Mahogany | `#774D31` | ■ warm brown |

### 2.2 Extended Tokens (derived for practical UI use)

Since 4 colors alone aren't enough for hover states, disabled states, and dark-section text hierarchy, extend each into a tint/shade scale:

| Token | Hex | Derived from | Use case |
|---|---|---|---|
| `evergreen-900` | `#162019` | Evergreen shade | Deepest backgrounds, footer base |
| `evergreen-700` | `#253929` | Evergreen (base) | Primary buttons, nav, headings on light bg |
| `evergreen-500` | `#3A5647` | Evergreen tint | Hover states, secondary dark surfaces |
| `evergreen-200` | `#AFC2B4` | Evergreen tint (light) | Italic accent text on dark sections |
| `milkglass-100` | `#FFFFFF` | pure white | Cards on top of Milkglass bg for lift |
| `milkglass-base` | `#F7F6E4` | Milkglass (base) | Page background (light sections) |
| `milkglass-300` | `#EDE9D8` | Milkglass shade | Alternate section bg, input backgrounds |
| `driftwood-300` | `#E8DCC8` | Driftwood tint | Subtle dividers, disabled buttons |
| `driftwood-base` | `#D4C4A8` | Driftwood (base) | Borders, tags, secondary surfaces |
| `driftwood-600` | `#B39F7E` | Driftwood shade | Muted captions on light bg |
| `mahogany-base` | `#774D31` | Mahogany (base) | CTAs (secondary), links, accent icons |
| `mahogany-700` | `#5A3A24` | Mahogany shade | Hover state for mahogany elements |
| `mahogany-300` | `#9C6B47` | Mahogany tint | Hover state on evergreen buttons |

### 2.3 Functional/System Colors

| Purpose | Hex | Notes |
|---|---|---|
| Body text (light bg) | `#2B2B26` | Near-black warm charcoal, not pure black — stays on-brand |
| Body text (dark bg) | `#EDE9D8` (Milkglass-300) | Softer than pure white for comfort |
| Muted/secondary text | `#6B6355` | Warm gray-brown |
| Success | `#4C6B4F` | Muted olive-green, harmonizes with palette |
| Error | `#8C4A3A` | Muted terracotta-red, not clinical red |
| Warning | `#B08A3E` | Muted gold |
| Border (default) | `#D4C4A8` @ 60% opacity | Driftwood, soft dividers |

### 2.4 Color-to-Component Mapping

| Component | Background | Text | Border/Accent | Hover State |
|---|---|---|---|---|
| **Navbar (top)** | Milkglass | Evergreen | — | Links → Mahogany underline |
| **Announcement bar** | Evergreen | Milkglass | — | — |
| **Hero section** | Milkglass / photo | Eyebrow: Mahogany (uppercase, tracked) · H1: Evergreen serif · Italic accent word: Mahogany | — | CTA hover below |
| **Primary Button** | Evergreen | Milkglass | none | bg → Mahogany-base |
| **Secondary Button** | Transparent | Evergreen | 1px Evergreen | bg → Driftwood-300 |
| **Ghost/Text Link** | — | Mahogany | underline on hover | color → Mahogany-700 |
| **Trust badge pills** (hero overlay) | Milkglass @ 90% opacity, blurred | Evergreen | — | — |
| **Product Card** | Milkglass-100 (white lift) | Name: Evergreen · Price: Mahogany | 1px Driftwood-300 | shadow lift + image zoom 1.03x |
| **Product Tag/Badge** ("Biodegradable", "Vegan") | Driftwood-300 | Evergreen | — | — |
| **Dark feature section** (e.g. "Made with attention to detail") | Evergreen-700 | Heading: Milkglass · Italic accent: Evergreen-200 · Body: Driftwood-base | — | CTA: bg Milkglass, text Evergreen → hover bg Driftwood |
| **Footer** | Evergreen-900 | Headings: Milkglass · Links: Driftwood-base | divider: Evergreen-500 | Links → Milkglass on hover |
| **Forms (input fields)** | Milkglass-300 | Evergreen (label), Charcoal (input text) | 1px Driftwood-base → focus: 2px Mahogany | — |
| **Cart Drawer** | Milkglass-100 | Evergreen | Driftwood-300 dividers between items | Remove icon → Mahogany on hover |
| **Checkout Stepper** | Milkglass | Inactive: Driftwood-600 · Active: Evergreen · Complete: Mahogany | line: Driftwood-base | — |
| **Impact counters** (stat blocks) | Evergreen or Milkglass alt | Number: large serif Mahogany or Milkglass (on dark) · Label: Driftwood/charcoal | — | count-up animation on scroll |
| **FAQ Accordion** | Milkglass | Question: Evergreen (semibold) · Answer: charcoal | Driftwood-300 divider lines | Chevron rotates, row bg → Milkglass-300 |
| **Toast/Notification** | Milkglass-100 | Evergreen | left border 3px Mahogany (info) / success green / error terracotta | — |
| **Admin Sidebar** | Evergreen-900 | Milkglass (inactive) | Active item: Mahogany-base bg, Milkglass text | — |
| **Admin Data Table** | White | Header row bg: Driftwood-300, text Evergreen · Row text: charcoal | Driftwood-300 row dividers | Row hover: Milkglass-300 |
| **Admin Buttons (Save/Publish)** | Evergreen | Milkglass | — | hover Mahogany |
| **Admin Buttons (Destructive)** | Transparent | Error (#8C4A3A) | 1px error | bg error @ 10% |

---

## 3. Typography

### 3.1 Font Pairing
- **Display/Serif** — *Fraunces* (or Playfair Display as fallback): used for all H1–H3 headings and the signature italic accent phrases ("...that can return.", "...Better for the planet.")
- **Body/Sans** — *Inter* or *Manrope*: body copy, UI labels, buttons, forms, nav

### 3.2 Type Scale (desktop / mobile)

| Style | Font | Size (desktop) | Size (mobile) | Weight | Usage |
|---|---|---|---|---|---|
| Eyebrow label | Inter | 13px, uppercase, tracked +0.1em | 12px | 600 | "KOSH IMPERIAL — LUXURY ECO-CRAFT" |
| H1 | Fraunces | 64px | 36px | 400, italic for accent word | Hero headline |
| H2 | Fraunces | 44px | 28px | 400 | Section titles |
| H3 | Fraunces | 28px | 22px | 400 | Card/subsection titles |
| Body Large | Inter | 18px | 16px | 400 | Intro paragraphs |
| Body | Inter | 16px | 15px | 400 | Standard copy |
| Caption | Inter | 13px | 12px | 500 | Meta text, prices, tags |
| Button label | Inter | 15px | 14px | 600 | All buttons |

### 3.3 Rules
- Italic serif is reserved **only** for the emotional "accent" phrase within a heading — never overused
- Uppercase tracked labels always in Mahogany or Evergreen, never on Driftwood (contrast risk)
- Line height: 1.15 for display type, 1.6 for body copy

---

## 4. Spacing & Layout Grid

- **Base unit**: 8px
- **Container max-width**: 1440px, with 24px side gutters (mobile: 16px)
- **Section vertical padding**: 96px desktop / 56px mobile
- **Grid**: 12-column, 24px gutter (desktop); stacked single column (mobile)

### Breakpoints (Tailwind defaults extended)
| Name | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1440px |

---

## 5. Section-by-Section Design Spec

### Hero
- Split layout: text block left (Milkglass bg), product photography right (natural light, on stone/organic surface — matches existing reference shots)
- Eyebrow (Mahogany) → H1 in Evergreen with one italicized Mahogany accent phrase → supporting paragraph (charcoal, body-large) → Primary Button (Evergreen bg)
- Floating trust badge pills bottom-right of image, Milkglass translucent bg, small leaf/sprout icon in Evergreen

### Our Story
- Two-column alternating layout (image/text, text/image) as content scrolls
- Founder note styled as a pull-quote: large italic serif in Evergreen on Milkglass-300 bg, thin Driftwood rule above/below

### Sustainability & Materials
- Dark section (Evergreen-700 bg) for emphasis and contrast against the mostly-light site
- Material callouts as icon + short label cards (IconTextCard), icons in thin-line style, Milkglass stroke
- Process timeline (seed → material → craft → product) as a horizontal stepper on desktop, vertical on mobile, connecting line in Driftwood

### Product Collection
- Warm neutral section bg (Driftwood-300 or Mahogany-based warm brown per existing "Fresh collection" reference) with white product cards for contrast and lift
- 4-column grid desktop → 2-column tablet → 1-column mobile carousel
- "View all collection" link top-right in Milkglass/Evergreen depending on section bg

### Why Choose Kosh Imperial
- Icon-led 3-4 column feature grid on Milkglass bg: Sustainable Materials / Thoughtful Design / Handcrafted with Care / Built to Last (matches existing footer strip icons)
- Icons in Evergreen, labels in charcoal, thin Driftwood divider above section

### Impact & Environmental Commitment
- Full-width dark (Evergreen-900) band with 3 animated stat counters (e.g., trees planted, kg waste diverted, wallets biodegraded) in large serif Milkglass numerals, Driftwood labels beneath

### FAQs
- Simple accordion list on Milkglass bg, max-width 780px centered, Driftwood divider lines between questions

### Contact
- Split layout: simple form (name/email/message) left on Milkglass-300 card, brand contact details + social + map/illustration right on Milkglass bg

### Footer
- Evergreen-900 bg, 4-column layout (Brand/Explore/Care/Newsletter) matching existing reference screenshot structure, Milkglass headings, Driftwood links, newsletter input with Milkglass-300 field and Mahogany submit arrow

---

## 6. Iconography

- Style: **thin-line (1.5px stroke), rounded joins**, no filled icons except small accent dots
- Icon set themes: leaf, sprout, heart/care, shield (durability), stitch/needle (craft), recycle
- Icon color always matches the text color of its section (Evergreen on light, Milkglass/Driftwood on dark) — never a separate "green" accent color, to avoid the generic eco-brand look

---

## 7. Motion & Interaction

- **Scroll reveals**: fade-up (16px translate, 400ms ease-out) on section entry, staggered 80ms per child element
- **Product card hover**: image scale 1.0 → 1.03 (500ms ease), card shadow soft-lift
- **Buttons**: background color transition 200ms ease, no scale/bounce (keeps it premium, not playful)
- **Impact counters**: count from 0 → target value once in viewport, 1.2s ease-out
- **Page transitions**: subtle 150ms fade between routes (Framer Motion `AnimatePresence`)
- Avoid parallax overuse — one subtle hero parallax layer max, respecting `prefers-reduced-motion`

---

## 8. Accessibility Notes

- Evergreen (`#253929`) on Milkglass (`#F7F6E4`) → contrast ratio ~11.8:1 — passes AAA for body text
- Milkglass text on Evergreen-700 bg → same ratio, safe for dark sections
- Mahogany (`#774D31`) on Milkglass → ~6.2:1 — passes AA for normal text, use for links/CTAs confidently
- Avoid Driftwood-base text directly on Milkglass background (low contrast, ~1.6:1) — Driftwood should only be used for borders/backgrounds, never as body text on light bg
- All interactive elements maintain a visible focus ring (2px Mahogany, 2px offset)

---

## 9. Imagery Direction

- Natural light, soft shadows, organic textures (stone, leaves, driftwood) as styling props — consistent with the uploaded reference shots
- Product shots: macro detail crops (stitching, grain) interspersed with full-product shots
- Human element: hands-at-work craftsmanship photography (as in reference) to reinforce "handmade" over "manufactured"
- Avoid stock-photo green landscapes, recycling symbols, or literal "earth" imagery — let material and craft imagery carry the sustainability message
