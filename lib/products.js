/**
 * Product catalog — single source of truth for K1 Visual Solutions.
 *
 * Consumed by the catalog page (/products), the dynamic detail pages
 * (/products/[slug]) including generateStaticParams, and the home page's
 * featured-products preview. Keeping the data here avoids duplication and keeps
 * the dynamic routes pre-buildable.
 *
 * Image src values are site-root relative — this project
 * runs next/image with images.unoptimized, and the rest of
 * the site already addresses assets as "/assets/...".
 *
 * Specs are realistic, indicative figures for transparent / holographic LED
 * display systems; they read as a finished spec sheet without over-claiming.
 */

const IMG = "/assets/images";

/* Filter categories used by the catalog tabs. `all` is synthesised in the UI.
   `label` is the long descriptive form (nav dropdown); `short` is the compact
   pill label shown on the catalog filter tabs. */
export const CATEGORIES = [
  { key: "all", label: "All", short: "All" },
  { key: "series-t", label: "Series T — Transparent Poster", short: "Series T" },
  { key: "series-f", label: "Series F — Flexible Film", short: "Series F" },
  { key: "holographic", label: "Holographic LED", short: "Holographic" },
];

/* Short labels for chips / badges, keyed by category. */
export const CATEGORY_LABEL = {
  "series-t": "Series T",
  "series-f": "Series F",
  holographic: "Holographic",
};

export const PRODUCTS = [
  {
    slug: "smd-holographic-p391",
    name: "SMD Holographic LED P3.91",
    category: "holographic",
    pixelPitch: "P3.91",
    cardImage: `${IMG}/products/smd-p391-new-01.jpg`,
    placeholder: false,
    shortDescription:
      "High-resolution holographic transparent panel for close-viewing retail windows and lobby features.",
    description:
      "Our finest-pitch holographic panel renders crisp video and depth-rich holographic content while keeping the surface see-through. At P3.91 the image holds together at close range, making it ideal for storefront glass, showroom plinths, and lobby features where viewers stand only a metre or two away.",
    gallery: [
      { src: `${IMG}/products/smd-p391-new-01.jpg`, alt: "SMD Holographic LED P3.91 panel, front view" },
      { src: `${IMG}/products/smd-p391-new-02.jpg`, alt: "SMD Holographic LED P3.91 panel, full-height studio view" },
      { src: `${IMG}/products/smd-holo-content-floral.jpg`, alt: "SMD Holographic LED P3.91 rendering depth-rich floral content" },
      { src: `${IMG}/products/smd-holo-content-flame.jpg`, alt: "SMD Holographic LED P3.91 with high-contrast motion content" },
    ],
    specs: {
      "Pixel pitch": "3.91 mm",
      Brightness: "5,500 nits",
      Transparency: "Up to 75%",
      "Refresh rate": "3,840 Hz",
      "Cabinet size": "500 × 1000 mm",
      Weight: "≈ 12 kg / panel",
      "Drive method": "Common cathode, SMD",
      "Lifespan": "100,000 hrs",
    },
    features: [
      "Fine 3.91 mm pitch for crisp close-range viewing",
      "High-contrast holographic depth effect on clear glass",
      "Front and rear maintenance with magnetic modules",
      "Lightweight cabinet for fast curtain-wall mounting",
      "Wide-angle 160° viewing with stable colour",
    ],
    applications: [
      { src: `${IMG}/applications/app-retail.jpg`, label: "Retail windows" },
      { src: `${IMG}/applications/app-lobby.jpg`, label: "Lobbies" },
      { src: `${IMG}/applications/app-product-display.jpg`, label: "Product display" },
    ],
  },
  {
    slug: "smd-holographic-p625",
    name: "SMD Holographic LED P6.25",
    category: "holographic",
    pixelPitch: "P6.25",
    cardImage: `${IMG}/products/smd-p625-new-01.jpg`,
    placeholder: false,
    shortDescription:
      "Balanced-pitch holographic panel — brightness and transparency tuned for mid-range architectural spans.",
    description:
      "P6.25 strikes the balance most projects ask for: bright enough to read against daylight, transparent enough to keep a space open, and economical across larger spans. A natural fit for atriums, escalator voids, and feature walls viewed from several metres back.",
    gallery: [
      { src: `${IMG}/products/smd-p625-new-01.jpg`, alt: "SMD Holographic LED P6.25 curved panel, front view" },
      { src: `${IMG}/products/smd-p625-new-02.jpg`, alt: "SMD Holographic LED P6.25 panel, angled studio view" },
      { src: `${IMG}/products/smd-holo-content-pair.jpg`, alt: "Two SMD Holographic LED P6.25 panels in a studio setting" },
      { src: `${IMG}/products/smd-holo-render-tall.jpg`, alt: "SMD Holographic LED P6.25 full-height panel render" },
    ],
    specs: {
      "Pixel pitch": "6.25 mm",
      Brightness: "6,000 nits",
      Transparency: "Up to 80%",
      "Refresh rate": "3,840 Hz",
      "Cabinet size": "500 × 1000 mm",
      Weight: "≈ 10.5 kg / panel",
      "Drive method": "Common cathode, SMD",
      "Lifespan": "100,000 hrs",
    },
    features: [
      "Optimised 6.25 mm pitch for mid-range viewing",
      "6,000-nit output reads clearly in daylit interiors",
      "Up to 80% transparency keeps sightlines open",
      "Cost-efficient across large architectural spans",
      "Seamless cabinet-to-cabinet alignment",
    ],
    applications: [
      { src: `${IMG}/applications/app-architecture.jpg`, label: "Architecture" },
      { src: `${IMG}/applications/app-lobby.jpg`, label: "Atriums" },
      { src: `${IMG}/applications/app-signage.jpg`, label: "Digital signage" },
    ],
  },
  {
    slug: "smd-holographic-p104",
    name: "SMD Holographic LED P10.4",
    category: "holographic",
    pixelPitch: "P10.4",
    cardImage: `${IMG}/products/smd-p104-new-01.jpg`,
    placeholder: false,
    shortDescription:
      "Maximum-transparency holographic panel for large facades and long-distance viewing.",
    description:
      "At P10.4 the grid all but disappears — up to 90% transparency lets a building keep its daylight and its view while carrying full-motion content after dark. Built for media facades, curtain walls, and large-format spans read from across a street or plaza.",
    gallery: [
      { src: `${IMG}/products/smd-p104-new-01.jpg`, alt: "SMD Holographic LED P10.4 panel, front view" },
      { src: `${IMG}/products/smd-p104-new-02.jpg`, alt: "SMD Holographic LED P10.4 panel, full-height view" },
      { src: `${IMG}/products/smd-p104-new-03.jpg`, alt: "SMD Holographic LED P10.4 panel, angled detail" },
      { src: `${IMG}/products/smd-p104-new-04.jpg`, alt: "SMD Holographic LED P10.4 wide panel, side profile" },
    ],
    specs: {
      "Pixel pitch": "10.4 mm",
      Brightness: "6,500 nits",
      Transparency: "Up to 90%",
      "Refresh rate": "1,920 Hz",
      "Cabinet size": "500 × 1000 mm",
      Weight: "≈ 9 kg / panel",
      "Drive method": "Common cathode, SMD",
      "Lifespan": "100,000 hrs",
    },
    features: [
      "Up to 90% transparency — the grid nearly vanishes",
      "6,500-nit output holds up against direct sun",
      "Lightest cabinet in the range for tall facades",
      "Long-distance legibility for plaza-scale viewing",
      "Low power draw per square metre",
    ],
    applications: [
      { src: `${IMG}/applications/app-architecture.jpg`, label: "Media facades" },
      { src: `${IMG}/applications/app-storefront.jpg`, label: "Storefronts" },
      { src: `${IMG}/applications/app-shadow.jpg`, label: "Entertainment" },
    ],
  },
  {
    slug: "transparent-poster-screen",
    name: "Transparent LED Poster Screen",
    category: "series-t",
    pixelPitch: "P2.5 / P3.91",
    cardImage: `${IMG}/scenes/scene-panel-05.jpg`,
    placeholder: false,
    shortDescription:
      "Freestanding see-through poster that turns any window or floor space into a high-clarity display.",
    description:
      "A rigid, freestanding transparent poster screen that drops into a window or floor space and turns it into a high-clarity display — without walling off the light or the view behind it. Slim bezel, plug-and-play controller, and an integrated base make it the simplest way to add motion to a retail or exhibition space.",
    gallery: [
      { src: `${IMG}/scenes/scene-panel-05.jpg`, alt: "Two transparent LED poster screens with freestanding bases displaying vibrant graphics" },
      { src: `${IMG}/scenes/scene-panel-07.jpg`, alt: "Transparent LED poster screen with freestanding base displaying floral design" },
      { src: `${IMG}/scenes/scene-panel-03.jpg`, alt: "Two transparent LED poster screens side by side, one illuminated with colorful streaks" },
      { src: `${IMG}/applications/app-storefront.jpg`, alt: "Transparent LED poster screen running content across a retail storefront window" },
      { src: `${IMG}/applications/app-retail.jpg`, alt: "Transparent LED poster screen in a retail window, merchandise visible behind" },
      { src: `${IMG}/renders/render-arch.jpg`, alt: "Transparent LED poster screen integrated into an architectural interior setting" },
    ],
    specs: {
      "Pixel pitch": "2.5 / 3.91 mm",
      Brightness: "4,500 nits",
      Transparency: "Up to 70%",
      "Refresh rate": "3,840 Hz",
      "Panel size": "640 × 1920 mm",
      Weight: "≈ 38 kg (with base)",
      Installation: "Freestanding / floor-mounted",
      "Lifespan": "100,000 hrs",
    },
    features: [
      "Freestanding design — no construction required",
      "Plug-and-play controller and content loader",
      "See-through surface keeps the view behind it",
      "Slim profile suits windows and showrooms",
      "Tileable into larger transparent walls",
    ],
    applications: [
      { src: `${IMG}/applications/app-storefront.jpg`, label: "Storefronts" },
      { src: `${IMG}/applications/app-retail.jpg`, label: "Retail" },
      { src: `${IMG}/applications/app-cafe.jpg`, label: "Hospitality" },
    ],
  },
  {
    slug: "flexible-led-film",
    name: "Flexible LED Film",
    category: "series-f",
    pixelPitch: "P2.5 – P6",
    cardImage: `${IMG}/scenes/scene-flexible-film.jpg`,
    placeholder: false,
    shortDescription:
      "Self-adhesive LED film, millimetres thin, that bends to curved glass and columns and peels into place.",
    description:
      "A self-adhesive LED film just millimetres thin that bends to curved glass and columns, peels into place, and conforms to surfaces a rigid panel never could. Near-invisible when off, it turns existing glazing into a living surface without adding structure or weight.",
    gallery: [
      { src: `${IMG}/scenes/scene-flexible-film.jpg`, alt: "Flexible LED film curved into an organic wave, carrying full-colour content" },
      { src: `${IMG}/applications/app-cafe.jpg`, alt: "Flexible LED film applied to curved café storefront glazing" },
      { src: `${IMG}/renders/render-cafe.jpg`, alt: "Flexible LED film wrapping a curved interior surface in a café render" },
      { src: `${IMG}/applications/app-event.jpg`, alt: "Flexible LED film wrapping columns and curved displays at an exhibition booth" },
    ],
    specs: {
      "Pixel pitch": "2.5 – 6 mm",
      Brightness: "4,000 nits",
      Transparency: "Up to 85%",
      Thickness: "≈ 4 mm",
      "Bend radius": "≥ 6 cm",
      Weight: "≈ 3.5 kg / m²",
      Installation: "Self-adhesive, applied to glass",
      "Lifespan": "100,000 hrs",
    },
    features: [
      "Just ~4 mm thin and self-adhesive",
      "Bends to a 6 cm radius for curved glass and columns",
      "Near-invisible when powered off",
      "Applies directly to existing glazing — no frame",
      "Lightweight; adds almost no load to the structure",
    ],
    applications: [
      { src: `${IMG}/applications/app-architecture.jpg`, label: "Curved facades" },
      { src: `${IMG}/applications/app-lobby.jpg`, label: "Columns & lobbies" },
      { src: `${IMG}/applications/app-cafe.jpg`, label: "Hospitality" },
    ],
  },
  {
    slug: "crystal-film-display",
    name: "Crystal Film Display",
    category: "series-f",
    pixelPitch: "P3.91",
    cardImage: `${IMG}/scenes/scene-cafe-storefront.jpg`,
    placeholder: false,
    shortDescription:
      "Ultra-clear adhesive crystal film with the highest transparency in the flexible range.",
    description:
      "Crystal Film pushes transparency to its limit — an ultra-clear adhesive surface that all but disappears against glass while carrying bright, high-refresh content. Where a space needs the display to vanish and the view to stay pristine, this is the surface to specify.",
    gallery: [
      { src: `${IMG}/scenes/scene-cafe-storefront.jpg`, alt: "Crystal Film Display applied to café storefront glass, showing content while maintaining transparency" },
      { src: `${IMG}/applications/app-lobby.jpg`, alt: "Crystal Film Display on lobby glass panels creating an immersive transparent display" },
      { src: `${IMG}/renders/render-cafe.jpg`, alt: "Crystal Film Display rendered on café glazing, view kept pristine behind" },
    ],
    specs: {
      "Pixel pitch": "3.91 mm",
      Brightness: "4,200 nits",
      Transparency: "Up to 88%",
      Thickness: "≈ 4 mm",
      "Bend radius": "≥ 8 cm",
      Weight: "≈ 3.5 kg / m²",
      Installation: "Self-adhesive, applied to glass",
      "Lifespan": "100,000 hrs",
    },
    features: [
      "Highest transparency in the flexible range",
      "Ultra-clear surface nearly vanishes on glass",
      "High-refresh output for clean on-camera capture",
      "Self-adhesive application, no structure required",
      "Even brightness across the full surface",
    ],
    applications: [
      { src: `${IMG}/applications/app-storefront.jpg`, label: "Storefronts" },
      { src: `${IMG}/applications/app-product-display.jpg`, label: "Product display" },
      { src: `${IMG}/applications/app-signage.jpg`, label: "Signage" },
    ],
  },
];

/** All products. */
export function getAllProducts() {
  return PRODUCTS;
}

/** Look up a single product by slug. */
export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

/**
 * Related products for a detail page: same category first, then others, never
 * the product itself. Returns up to `count`.
 */
export function getRelatedProducts(slug, count = 3) {
  const current = getProduct(slug);
  if (!current) return [];
  const sameCat = PRODUCTS.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = PRODUCTS.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );
  return [...sameCat, ...others].slice(0, count);
}
