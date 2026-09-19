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

---

## 3. Typography

### 3.1 Font Pairing
- **Display/Serif** — *Fraunces* (or Playfair Display as fallback): used for all H1–H3 headings and the signature italic accent phrases ("...that can return.", "...Better for the planet.")
- **Body/Sans** — *Inter* or *Manrope*: body copy, UI labels, buttons, forms, nav

---

## 4. Spacing & Layout Grid
- Base unit: 8px
- Container max-width: 1440px, with 24px side gutters (mobile: 16px)
- Section vertical padding: 96px desktop / 56px mobile
- Grid: 12-column, 24px gutter (desktop); stacked single column (mobile)
