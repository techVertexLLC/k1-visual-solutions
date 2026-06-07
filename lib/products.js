/**
 * Product catalog — single source of truth for K1 Visual Solutions.
 *
 * Consumed by the catalog page (/k1/products), the dynamic detail pages
 * (/k1/products/[slug]) including generateStaticParams, and the home page's
 * featured-products preview. Keeping the data here avoids duplication and keeps
 * the dynamic routes pre-buildable.
 *
 * Image src values intentionally carry the "/k1" basePath prefix — this project
 * runs next/image with images.unoptimized and basePath "/k1", and the rest of
 * the site already addresses assets as "/k1/assets/...".
 *
 * Specs are realistic, indicative figures for transparent / holographic LED
 * display systems; they read as a finished spec sheet without over-claiming.
 */

const IMG = "/k1/assets/images";

/* Filter categories used by the catalog tabs. `all` is synthesised in the UI. */
export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "series-t", label: "Series T — Transparent Poster" },
  { key: "series-f", label: "Series F — Flexible Film" },
  { key: "holographic", label: "Holographic LED" },
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
    cardImage: `${IMG}/products/smd-p391-01.jpg`,
    placeholder: false,
    shortDescription:
      "High-resolution holographic transparent panel for close-viewing retail windows and lobby features.",
    description:
      "Our finest-pitch holographic panel renders crisp video and depth-rich holographic content while keeping the surface see-through. At P3.91 the image holds together at close range, making it ideal for storefront glass, showroom plinths, and lobby features where viewers stand only a metre or two away.",
    gallery: [
      { src: `${IMG}/products/smd-p391-01.jpg`, alt: "SMD Holographic LED P3.91 panel, front view" },
      { src: `${IMG}/products/smd-p391-02.jpg`, alt: "SMD Holographic LED P3.91 panel in a studio setting" },
      { src: `${IMG}/thumbs/product-01.jpg`, alt: "SMD Holographic LED P3.91, angle detail" },
      { src: `${IMG}/thumbs/product-02.jpg`, alt: "SMD Holographic LED P3.91, module detail" },
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
    cardImage: `${IMG}/products/smd-p625-01.jpg`,
    placeholder: false,
    shortDescription:
      "Balanced-pitch holographic panel — brightness and transparency tuned for mid-range architectural spans.",
    description:
      "P6.25 strikes the balance most projects ask for: bright enough to read against daylight, transparent enough to keep a space open, and economical across larger spans. A natural fit for atriums, escalator voids, and feature walls viewed from several metres back.",
    gallery: [
      { src: `${IMG}/products/smd-p625-01.jpg`, alt: "SMD Holographic LED P6.25 panel, front view" },
      { src: `${IMG}/products/smd-p625-02.jpg`, alt: "SMD Holographic LED P6.25 panel, second view" },
      { src: `${IMG}/thumbs/product-03.jpg`, alt: "SMD Holographic LED P6.25, angle detail" },
      { src: `${IMG}/thumbs/product-04.jpg`, alt: "SMD Holographic LED P6.25, module detail" },
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
    cardImage: `${IMG}/products/smd-p104-01.jpg`,
    placeholder: false,
    shortDescription:
      "Maximum-transparency holographic panel for large facades and long-distance viewing.",
    description:
      "At P10.4 the grid all but disappears — up to 90% transparency lets a building keep its daylight and its view while carrying full-motion content after dark. Built for media facades, curtain walls, and large-format spans read from across a street or plaza.",
    gallery: [
      { src: `${IMG}/products/smd-p104-01.jpg`, alt: "SMD Holographic LED P10.4 panel, front view" },
      { src: `${IMG}/products/smd-p104-02.jpg`, alt: "SMD Holographic LED P10.4 panel, second view" },
      { src: `${IMG}/thumbs/product-05.jpg`, alt: "SMD Holographic LED P10.4, angle detail" },
      { src: `${IMG}/thumbs/product-06.jpg`, alt: "SMD Holographic LED P10.4, module detail" },
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
    cardImage: `${IMG}/products/smd-p391-02.jpg`,
    placeholder: false,
    shortDescription:
      "Freestanding see-through poster that turns any window or floor space into a high-clarity display.",
    description:
      "A rigid, freestanding transparent poster screen that drops into a window or floor space and turns it into a high-clarity display — without walling off the light or the view behind it. Slim bezel, plug-and-play controller, and an integrated base make it the simplest way to add motion to a retail or exhibition space.",
    gallery: [
      { src: `${IMG}/products/smd-p391-02.jpg`, alt: "Transparent LED poster screen in a studio space" },
      { src: `${IMG}/thumbs/product-07.jpg`, alt: "Transparent LED poster screen, angle detail" },
      { src: `${IMG}/thumbs/product-08.jpg`, alt: "Transparent LED poster screen, base detail" },
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
    cardImage: null,
    placeholder: true,
    shortDescription:
      "Self-adhesive LED film, millimetres thin, that bends to curved glass and columns and peels into place.",
    description:
      "A self-adhesive LED film just millimetres thin that bends to curved glass and columns, peels into place, and conforms to surfaces a rigid panel never could. Near-invisible when off, it turns existing glazing into a living surface without adding structure or weight.",
    gallery: [],
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
    cardImage: `${IMG}/thumbs/product-04.jpg`,
    placeholder: false,
    shortDescription:
      "Ultra-clear adhesive crystal film with the highest transparency in the flexible range.",
    description:
      "Crystal Film pushes transparency to its limit — an ultra-clear adhesive surface that all but disappears against glass while carrying bright, high-refresh content. Where a space needs the display to vanish and the view to stay pristine, this is the surface to specify.",
    gallery: [
      { src: `${IMG}/thumbs/product-04.jpg`, alt: "Crystal Film Display surface detail" },
      { src: `${IMG}/thumbs/product-05.jpg`, alt: "Crystal Film Display, angle view" },
      { src: `${IMG}/thumbs/product-06.jpg`, alt: "Crystal Film Display, module detail" },
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
