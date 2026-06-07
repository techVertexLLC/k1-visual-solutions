# Products Catalog Page — Wireframe Spec

**Project:** K1 Visual Solutions  
**Author:** Cora (PM)  
**Date:** 2026-06-08  
**Status:** Ready for implementation  
**Assignee:** Steve (UI)

---

## 0. Executive Summary

Redesign the Products catalog page from a uniform 3-column grid to a **dynamic masonry layout with a featured-card hero slot**, responsive across three breakpoints. Add hover-reveal spec overlays and a top-mounted filter/sort bar. All changes are CSS/component-level — the data layer (`lib/products.js`) and route structure remain unchanged.

---

## 1. Page Structure (top → bottom)

```
┌─────────────────────────────────────────────┐
│  PageBanner (existing — no changes)         │
├─────────────────────────────────────────────┤
│  Filter Bar                                 │
├─────────────────────────────────────────────┤
│  Product Grid (masonry)                     │
│    ┌──────────────────┐ ┌────────┐          │
│    │  Featured Card    │ │ Card 2 │          │
│    │  (2-col span)     │ ├────────┤          │
│    │                   │ │ Card 3 │          │
│    └──────────────────┘ └────────┘          │
│    ┌────────┐ ┌────────┐ ┌────────┐         │
│    │ Card 4 │ │ Card 5 │ │ Card 6 │         │
│    └────────┘ └────────┘ └────────┘         │
├─────────────────────────────────────────────┤
│  SiteFooter (existing — no changes)         │
└─────────────────────────────────────────────┘
```

---

## 2. Responsive Layout — Three Breakpoints

### 2.1 Mobile (< 768px) — Single Column

```
  ← 16px →┌──────────────────────┐← 16px →
           │  Filter Bar (scroll) │
           ├──────────────────────┤
           │  Card (full width)   │  ← aspect 4:3
           │  16px gap            │
           │  Card               │
           │  16px gap            │
           │  Card               │
           └──────────────────────┘
```

- **Columns:** 1
- **Container:** `px-4` (16px side padding)
- **Gap:** 16px
- **Featured card:** same width as others, but uses **16:9** aspect ratio to differentiate
- **Filter bar:** horizontal scroll, no wrapping

### 2.2 Tablet (768px – 1023px) — 2-Column Asymmetric Masonry

```
  ← 24px →┌──────────────┬───────────┐← 24px →
           │  Featured    │  Card 2   │
           │  (spans 2)   ├───────────┤
           │  16:9        │  Card 3   │
           ├──────────┬───┴───────────┤
           │  Card 4  │    Card 5     │
           └──────────┴───────────────┘
```

- **Columns:** 2, ratio roughly **1.3fr : 1fr** (asymmetric)
- **Container:** `px-6` (24px side padding), `max-w-4xl` (896px)
- **Gap:** 20px
- **Featured card:** spans full 2 columns, 16:9 ratio
- **Regular cards:** 4:3 ratio
- **Masonry:** CSS `grid-template-rows: masonry` (with JS fallback — see §6)

### 2.3 Desktop (≥ 1024px, optimized at 1440px) — 3-Column Masonry + Featured Hero

```
  ← 40px →┌────────────────────────┬────────────┐← 40px →
           │                        │   Card 2   │
           │  Featured Card         │   4:3      │
           │  (spans 2 cols)        ├────────────┤
           │  16:9                  │   Card 3   │
           │                        │   4:3      │
           ├────────────┬───────────┼────────────┤
           │  Card 4    │  Card 5   │  Card 6    │
           │  4:3       │  4:3      │  4:3       │
           └────────────┴───────────┴────────────┘
```

- **Columns:** 3, equal `1fr` width
- **Container:** `px-10` (40px side padding), `max-w-6xl` (1152px)
- **Gap:** 24px (both column-gap and row-gap)
- **Featured card:** `grid-column: span 2`, `grid-row: span 2`, aspect 16:9
- **Regular cards:** 4:3 ratio
- **Max content width:** 1152px centered

### 2.4 Breakpoint Summary Table

| Token      | Mobile (< 768) | Tablet (768–1023) | Desktop (≥ 1024) |
|------------|-----------------|-------------------|------------------|
| Columns    | 1               | 2 (1.3fr 1fr)     | 3 (1fr × 3)      |
| Gap        | 16px            | 20px              | 24px             |
| Padding    | 16px            | 24px              | 40px             |
| Max-width  | 100%            | 896px             | 1152px           |
| Featured   | 1-col, 16:9     | 2-col span, 16:9  | 2-col + 2-row, 16:9 |
| Regular    | 4:3             | 4:3               | 4:3              |

---

## 3. Featured Card Logic

The **first product in the filtered array** gets the featured treatment. Rules:

1. When filter = "All" → first item in `PRODUCTS` array is featured (currently `smd-holographic-p391`)
2. When a specific series is selected → first product in that filtered set is featured
3. If only 1 product in the filtered set → it renders as a regular card, no featured treatment
4. Featured slot is a prop variant (`variant="featured"`) on `ProductCard`, not a separate component

---

## 4. Product Card — Information Hierarchy

### 4.1 Default State (visible on load)

```
┌──────────────────────────────────┐
│                                  │
│     Product Image                │
│     (aspect-ratio set by card    │
│      type: 4:3 or 16:9)         │
│                                  │
│  [Series Badge]                  │  ← top-left overlay
│                                  │
├──────────────────────────────────┤
│                                  │
│  Product Name            (h3)    │  ← DM Serif, #1A1A1A
│                                  │
│  One-line tagline        (p)     │  ← Inter, #4A4A4A, text-sm
│                                  │
│  ─────── divider ──────────────  │
│  Pixel pitch: P3.91     →       │  ← spec + "View Details" link
│                                  │
└──────────────────────────────────┘
```

**Keep from current implementation:**
- Category badge (top-left pill)
- Product name (h3, serif font)
- `shortDescription` as tagline
- Pixel pitch + "View Details" link in footer

### 4.2 Hover State (expand on hover/focus)

On `hover` (desktop) / `tap` (mobile — see §4.3), a **translucent overlay** slides up from the bottom of the image area, revealing additional specs and a CTA.

```
┌──────────────────────────────────┐
│                                  │
│     Product Image                │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐│
│  │  Overlay (slides up)        ││
│  │                             ││
│  │  Pixel Pitch    3.91 mm     ││  ← key spec row 1
│  │  Brightness     5,500 nits  ││  ← key spec row 2
│  │  Transparency   Up to 75%   ││  ← key spec row 3
│  │                             ││
│  │  ┌─────────────────────┐    ││
│  │  │   View Full Specs →  │    ││  ← CTA button
│  │  └─────────────────────┘    ││
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘│
│  [Series Badge]                  │
├──────────────────────────────────┤
│  Product Name                    │
│  Tagline                         │
│  ─── Pixel pitch   View Details  │
└──────────────────────────────────┘
```

**Overlay specs:**
- Background: `rgba(26, 26, 26, 0.85)` with `backdrop-filter: blur(8px)`
- Enters from: `translateY(100%)` → `translateY(0)`
- Height: covers bottom ~55% of the image area
- Spec labels: `text-[11px] uppercase tracking-[0.14em]`, color `rgba(255,255,255,0.6)`
- Spec values: `text-sm font-medium`, color `#FFFFFF`
- CTA button: outlined, white border, rounded-full, text `"View Full Specs →"`

**Three specs to show (pulled from product data):**

| Product Category | Spec 1       | Spec 2      | Spec 3        |
|------------------|--------------|-------------|---------------|
| Holographic      | Pixel pitch  | Brightness  | Transparency  |
| Series T         | Pixel pitch  | Brightness  | Transparency  |
| Series F         | Pixel pitch  | Brightness  | Transparency  |

All three categories share the same three specs — these are the universal decision-making specs for LED buyers. Pull values from `product.specs` object.

### 4.3 Mobile Touch Behavior

- No hover on mobile — the overlay specs are **not shown** on mobile
- Instead, the card footer area (below divider) shows the pixel pitch inline (already exists)
- Tapping anywhere on the card navigates directly to the product detail page
- Rationale: on mobile, screen real estate is limited; the detail page already shows full specs

### 4.4 Featured Card Variant Differences

| Attribute        | Regular Card | Featured Card        |
|------------------|-------------|----------------------|
| Image aspect     | 4:3         | 16:9                 |
| Grid span (desk) | 1 col       | 2 col + 2 row        |
| Name font size   | text-xl     | text-2xl lg:text-3xl |
| Tagline          | 1 line      | up to 2 lines        |
| Hover overlay    | same        | same (scales with image area) |

---

## 5. Filter / Sort Bar

### 5.1 Current State

The existing filter uses inline pill buttons (`<button>` with `role="tab"`) placed directly inside the grid section. Categories: All, Series T, Series F, Holographic.

### 5.2 New Design: Sticky Filter Bar

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [All] [Series T] [Series F] [Holographic]     Sort: ▼     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Behavior & Position:**
- **Location:** between `PageBanner` and the product grid
- **Sticky:** `position: sticky; top: 0; z-index: 30` — sticks to top on scroll
- **Background:** `#FAF8F5` with `backdrop-filter: blur(12px)` and `border-bottom: 1px solid #E8E4DF`
- **Container:** same `max-w-6xl` as the grid, centered
- **Layout:** `display: flex; justify-content: space-between; align-items: center`

**Left side — Filter pills (keep existing behavior, restyle):**
- Active pill: `background: #4F46B5; color: #fff; border-color: #4F46B5`
- Inactive pill: `background: transparent; color: #4A4A4A; border: 1px solid #E8E4DF`
- Hover: `border-color: #4F46B5; color: #4F46B5`
- Pill sizing: `px-4 py-1.5 text-sm font-medium rounded-full`
- Gap between pills: 8px
- On mobile (< 768px): horizontally scrollable with `overflow-x: auto`, hide scrollbar

**Right side — Sort dropdown (NEW):**
- Default label: `"Sort by"` with down chevron icon
- Options:
  - **Default** (array order — editorial ranking)
  - **Pixel pitch: fine → coarse** (ascending numeric)
  - **Pixel pitch: coarse → fine** (descending numeric)
- Implementation: `<select>` styled as a minimal dropdown, or a custom dropdown component
- Styling: `text-sm`, `color: #4A4A4A`, underlined or with subtle border
- On mobile: full-width below the filter pills (stacks vertically)

### 5.3 Filter Bar — Mobile Layout

```
┌──────────────────────────────────┐
│  ← [All] [T] [F] [Holo] →       │  ← horizontal scroll
├──────────────────────────────────┤
│  Sort by: Default           ▼    │  ← full-width dropdown
└──────────────────────────────────┘
```

- Filter and sort stack vertically
- Filter pills use abbreviated labels on mobile: `"All"`, `"T"`, `"F"`, `"Holo"`
- Total bar height: ~96px on mobile, ~56px on desktop

### 5.4 Result Count

Below the filter bar, left-aligned:

```
Showing 6 products
```

- `text-xs`, `color: #6B655C` (muted)
- Updates dynamically on filter/sort change
- Margin: `mt-4 mb-0` (sits tight above the grid)

---

## 6. Visual Specifications — Design Tokens

### 6.1 Card Tokens

| Token                   | Value                                           |
|-------------------------|-------------------------------------------------|
| `card-radius`           | `16px` (`rounded-2xl`) — keep existing           |
| `card-border`           | `1px solid #E8E4DF`                              |
| `card-bg`               | `#FFFFFF`                                         |
| `card-shadow-rest`      | `none`                                            |
| `card-shadow-hover`     | `0 14px 36px -14px rgba(26,26,26,0.22)` — keep   |
| `card-padding`          | `24px` (`p-6`) body area, `28px` (`p-7`) on sm+   |
| `card-image-ratio`      | `4:3` (regular), `16:9` (featured)                |
| `card-image-radius`     | inherits from card (top corners only)             |

### 6.2 Grid Tokens

| Token                   | Mobile    | Tablet    | Desktop   |
|-------------------------|-----------|-----------|-----------|
| `grid-columns`          | `1`       | `1.3fr 1fr` | `repeat(3, 1fr)` |
| `grid-gap`              | `16px`    | `20px`    | `24px`    |
| `grid-padding-x`        | `16px`    | `24px`    | `40px`    |
| `grid-max-width`        | `100%`    | `896px`   | `1152px`  |

### 6.3 Hover Animation Tokens

| Token                     | Value                                    |
|---------------------------|------------------------------------------|
| `card-lift-duration`       | `300ms`                                  |
| `card-lift-easing`         | `cubic-bezier(0.22, 1, 0.36, 1)`        |
| `card-lift-distance`       | `-4px` (`-translate-y-1`)                |
| `image-scale-duration`     | `300ms`                                  |
| `image-scale-easing`       | `ease-out`                               |
| `image-scale-factor`       | `1.03`                                   |
| `overlay-enter-duration`   | `350ms`                                  |
| `overlay-enter-easing`     | `cubic-bezier(0.22, 1, 0.36, 1)`        |
| `overlay-enter-transform`  | `translateY(100%)` → `translateY(0)`     |
| `overlay-exit-duration`    | `250ms`                                  |
| `overlay-exit-easing`      | `ease-in`                                |
| `grid-layout-duration`     | `400ms` (Framer Motion layout animation) |
| `grid-layout-easing`       | `[0.22, 1, 0.36, 1]`                    |

### 6.4 Typography in Cards

| Element         | Font                       | Size            | Color   | Weight |
|-----------------|----------------------------|-----------------|---------|--------|
| Category badge  | Inter                      | 10px uppercase  | #4F46B5 | 500    |
| Product name    | DM Serif Display           | text-xl (20px)  | #1A1A1A | 400    |
| Featured name   | DM Serif Display           | text-2xl–3xl    | #1A1A1A | 400    |
| Tagline         | Inter                      | text-sm (14px)  | #4A4A4A | 400    |
| Spec label      | Inter                      | 10px uppercase  | #6B655C | 500    |
| Spec value      | Inter                      | text-sm (14px)  | #1A1A1A | 500    |
| Overlay label   | Inter                      | 11px uppercase  | rgba(255,255,255,0.6) | 500 |
| Overlay value   | Inter                      | text-sm (14px)  | #FFFFFF | 500    |

---

## 7. Masonry Implementation Notes

CSS native masonry (`grid-template-rows: masonry`) is only supported in Firefox (behind flag) as of mid-2026. Steve should implement as follows:

1. **Primary:** Use CSS Grid with explicit `grid-row: span N` on the featured card. This achieves the asymmetric layout without true masonry. For the standard cards, equal-height rows are acceptable — the visual effect is close enough.

2. **Enhancement (optional):** If true masonry is desired for variable-height cards, use a lightweight JS approach:
   - Option A: CSS Columns (`column-count`) — simple but loses left-to-right order
   - Option B: Framer Motion `layout` prop (already in use) + manual column assignment
   - **Recommendation:** Stick with CSS Grid + explicit spans. The cards have controlled content (fixed image ratios, 1-line tagline), so heights are predictable. True masonry adds complexity without visual payoff here.

---

## 8. Animation & Transition Inventory

| Trigger                 | Animation                                          | Duration | Easing                          |
|-------------------------|----------------------------------------------------|----------|---------------------------------|
| Card hover              | `translateY(-4px)` + shadow ramp-up                 | 300ms    | `cubic-bezier(0.22,1,0.36,1)`  |
| Card hover (image)      | `scale(1.03)`                                       | 300ms    | `ease-out`                      |
| Hover overlay enter     | `translateY(100%)` → `translateY(0)`                 | 350ms    | `cubic-bezier(0.22,1,0.36,1)`  |
| Hover overlay exit      | `translateY(0)` → `translateY(100%)`                 | 250ms    | `ease-in`                       |
| Filter change (grid)    | Framer Motion layout + fade (`opacity 0→1, y 18→0`) | 400ms    | `[0.22, 1, 0.36, 1]`           |
| Card exit (filter)      | `opacity 1→0, scale 1→0.97`                         | 400ms    | same                            |
| Sticky bar dock         | `backdrop-filter: blur(12px)` on scroll              | instant  | CSS transition on border-bottom |

---

## 9. Accessibility Requirements

- Filter pills: maintain `role="tablist"` / `role="tab"` / `aria-selected` (already exists)
- Sort dropdown: `aria-label="Sort products"`
- Product cards: keep `<article>` wrapper, `<h3>` for product name
- Hover overlay: content must be accessible via keyboard focus (`:focus-within` triggers overlay)
- Image alt text: keep existing pattern from `ProductCard` (`{product.name} — {category} display`)
- Result count: use `aria-live="polite"` so screen readers announce filter changes
- Reduced motion: wrap all animations in `@media (prefers-reduced-motion: reduce)` — disable translateY, scale, overlay slide; keep opacity transitions only

---

## 10. Data Contract — No Changes

Steve does **not** need to modify `lib/products.js`. All data needed for the new layout already exists:

| UI Element        | Data Source                          |
|-------------------|--------------------------------------|
| Product image     | `product.cardImage`                  |
| Category badge    | `CATEGORY_LABEL[product.category]`   |
| Product name      | `product.name`                       |
| Tagline           | `product.shortDescription`           |
| Pixel pitch       | `product.pixelPitch` (card footer)   |
| Overlay: pitch    | `product.specs["Pixel pitch"]`       |
| Overlay: bright.  | `product.specs["Brightness"]`        |
| Overlay: transp.  | `product.specs["Transparency"]`      |
| Sort by pitch     | Parse numeric from `product.pixelPitch` |

---

## 11. Files to Modify

| File                                          | Change                                              |
|-----------------------------------------------|-----------------------------------------------------|
| `components/products/ProductCard.jsx`         | Add `variant` prop, hover overlay, featured sizing   |
| `components/products/ProductCatalog.jsx`      | Masonry grid, featured logic, sort state, sticky bar |
| `components/home/tokens.js`                   | Add card/grid/animation tokens (optional — can inline) |

No new files required unless Steve prefers to extract the filter bar into its own component (recommended but at his discretion).

---

## 12. Out of Scope

- Product detail page (`/products/[slug]`) — not part of this spec
- Adding new products to the catalog data
- Search functionality (text search) — future iteration
- Price display — K1 is B2B, pricing is by-request
- Pagination / infinite scroll — only 6 products currently; revisit if catalog exceeds 12

---

## 13. Acceptance Criteria

| #  | Criterion                                                        | Pass Condition                           |
|----|------------------------------------------------------------------|------------------------------------------|
| 1  | Mobile (< 768px): single-column layout                           | All cards stack, 16px gap, no overflow   |
| 2  | Tablet (768–1023px): 2-col asymmetric grid with featured span    | Featured card spans 2 cols at 16:9       |
| 3  | Desktop (≥ 1024px): 3-col grid with featured 2×2 hero            | Featured spans 2 cols + 2 rows           |
| 4  | Hover overlay shows 3 specs + CTA on desktop                     | Specs match product.specs data           |
| 5  | Filter pills work with deep-link `?series=` support              | Existing behavior preserved              |
| 6  | Sort dropdown orders by pixel pitch                               | Numeric sort, not string sort            |
| 7  | Sticky filter bar docks on scroll                                 | Stays visible, blur backdrop active      |
| 8  | Result count updates on filter change                             | `aria-live="polite"` announces change    |
| 9  | `prefers-reduced-motion` disables motion                          | Only opacity transitions remain          |
| 10 | Keyboard: overlay accessible via `:focus-within`                  | Tab into card triggers overlay           |
| 11 | No regressions on product detail page links                       | All `/products/[slug]` routes work       |
| 12 | Lighthouse perf ≥ 90 on mobile                                    | Lazy images, no layout shift from grid   |
