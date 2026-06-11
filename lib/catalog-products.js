/**
 * catalog-products.js — 合併 K1 自有產品 + MileStrong 代理產品的 catalog 資料。
 *
 * 用途：只給 /catalog 頁面使用。
 * lib/products.js 仍是 K1 自有產品的 single source of truth（供產品詳情頁）。
 *
 * 所有圖片 src 為 site-root 相對路徑。
 * MileStrong 產品 href: null（無詳情頁），K1 產品走 /products/[slug]。
 */

const IMG = "/assets/images";
const MS_IMG = "/assets/images/milestrong-products";

/* ─── 分類 ──────────────────────────────────────────────────────────── */

export const CATALOG_CATEGORIES = [
  { key: "all", label: "All Products", short: "All" },
  // K1 自有產品線（與 lib/products.js 三條產品線一致）
  { key: "crystal-film",     label: "Crystal Film LED Screen",      short: "Crystal Film", group: "k1" },
  { key: "holographic",      label: "Holographic Invisible Screen", short: "Holographic",  group: "k1" },
  { key: "soft-led-display", label: "Soft LED Display",             short: "Soft LED",     group: "k1" },
  // MileStrong 系列
  { key: "control-room",    label: "Control Room Displays",         short: "Control Room",    group: "milestrong" },
  { key: "transparent-led", label: "Transparent LED Screens",       short: "Transparent LED", group: "milestrong" },
  { key: "led-poster",      label: "LED Poster & Signage",          short: "LED Poster",      group: "milestrong" },
  { key: "immersive",       label: "Immersive & Creative Displays", short: "Immersive",       group: "milestrong" },
  { key: "outdoor",         label: "Outdoor LED Displays",          short: "Outdoor",         group: "milestrong" },
  { key: "other",           label: "Other",                         short: "Other",            group: "milestrong" },
];

/* ─── K1 自有 3 條產品線（資料同步自 lib/products.js，不 import 以解耦） ─ */

const K1_PRODUCTS = [
  {
    slug: "crystal-film",
    name: "Crystal Film LED Screen",
    category: "crystal-film",
    brand: "k1",
    pixelPitch: "P6.25 – P20",
    cardImage: `${IMG}/cases/case-coca-cola-experience-p625.jpg`,
    shortDescription:
      "Self-adhesive transparent LED film, 2.5 mm thin with 90%+ transparency — applied straight onto glass, no steel structure.",
    specs: {
      "Pixel Pitch": "6.25 – 20 mm",
      Brightness: "2,000 / 4,000 nits",
      Transparency: "Up to 95%",
      Thickness: "2.5 mm",
      "Refresh Rate": "3,840 Hz",
    },
    href: undefined, // → /products/crystal-film
  },
  {
    slug: "holographic",
    name: "SMD Holographic Invisible Screen",
    category: "holographic",
    brand: "k1",
    pixelPitch: "P2.5 – P10",
    cardImage: `${IMG}/products/holo-render-08.jpg`,
    shortDescription:
      "Borderless holographic mesh under 3 mm thick — up to 93% transparency, 3D playback at 120 fps, bonded straight onto glass.",
    specs: {
      "Pixel Pitch": "2.5 – 10 mm",
      Brightness: "Up to ≥ 5,000 cd/m²",
      Transparency: "Up to 93%",
      "Refresh Rate": "≥ 3,840 Hz",
      Thickness: "< 3 mm",
    },
    href: undefined, // → /products/holographic
  },
  {
    slug: "soft-led-display",
    name: "Soft LED Display",
    category: "soft-led-display",
    brand: "k1",
    pixelPitch: "35″ / 52″ / 70″",
    cardImage: `${IMG}/products/matrix-panel/scenario-coffee-shop.jpg`,
    shortDescription:
      "Plug-and-play flexible LED matrix sign in three sizes — app + remote control, waterproof, 10 W, live in five minutes.",
    specs: {
      Sizes: "35″ / 52″ / 70″",
      Power: "10 W (5 V USB / Type-C)",
      Control: "iPixel Color app + remote",
      "Water Resistance": "Waterproof",
    },
    href: undefined, // → /products/soft-led-display
  },
];

/* ─── MileStrong 13 個產品 ──────────────────────────────────────────── */

const MILESTRONG_PRODUCTS = [
  /* Control Room Displays */
  {
    slug: "ms-control-room-display",
    name: "Control Room Display",
    category: "control-room",
    brand: "milestrong",
    pixelPitch: "P0.9 / P1.2 / P1.5 / P1.8 / P2.5",
    cardImage: `${MS_IMG}/control-room-display18076502793.png`,
    shortDescription:
      "Fine-pitch indoor LED for 24/7 control room operation — ultra-smooth refresh and high contrast.",
    specs: {
      "Pixel Pitch":   "P0.9–P2.5",
      Contrast:        "7,000:1",
      "Refresh Rate":  "3,840 Hz",
      "Module Size":   "300×168.75 mm",
      "Cabinet Size":  "600×337.5×78 mm",
    },
    href: null,
  },

  /* Transparent LED Screens */
  {
    slug: "ms-led-see-through-screen",
    name: "LED See Through Screen",
    category: "transparent-led",
    brand: "milestrong",
    pixelPitch: "P8 / P10 / P12 / P16 / P20 / P30 / P40 / P50",
    cardImage: `${MS_IMG}/led-see-through-screen23050120820.png`,
    shortDescription:
      "High-transparency LED mesh for storefronts and architectural glazing — up to 98% see-through.",
    specs: {
      "Pixel Pitch":   "P8–P50",
      Transparency:    "70%–98%",
      Contrast:        "5,000:1",
    },
    href: null,
  },
  {
    slug: "ms-transparent-led-poster-stp",
    name: "Transparent LED Poster Screen (STP Series)",
    category: "transparent-led",
    brand: "milestrong",
    pixelPitch: "2.8 / 5.6 / 9.7 / 13.7 / 17.3 / 39 mm",
    cardImage: `${MS_IMG}/transparent-led-poster-screen-display-stp0779a.jpg`,
    shortDescription:
      "Freestanding transparent poster with wireless control — plug-and-play for retail and exhibitions.",
    specs: {
      "Pixel Pitch":    "2.8–39 mm",
      "Display Size":   "1000×2000×54 mm",
      Control:          "Wireless",
    },
    href: null,
  },

  /* LED Poster & Signage */
  {
    slug: "ms-msc-folding-poster",
    name: "MSC Folding Series LED Poster Screen",
    category: "led-poster",
    brand: "milestrong",
    pixelPitch: "P1.25 / P1.53 / P1.86 / P2.5",
    cardImage: `${MS_IMG}/msc-folding-series-led-poster-screen5b040.jpg`,
    shortDescription:
      "Foldable LED poster with USB/WiFi/LAN/4G — portable high-resolution digital signage.",
    specs: {
      "Pixel Pitch":    "P1.25–P2.5",
      "Display Size":   "640×1920 mm",
      Connectivity:     "USB / WiFi / LAN / 4G",
    },
    href: null,
  },
  {
    slug: "ms-three-fold-poster",
    name: "Three-Fold LED Poster Display",
    category: "led-poster",
    brand: "milestrong",
    pixelPitch: "P1.25 / P1.53 / P1.86 / P2.5",
    cardImage: `${MS_IMG}/three-fold-led-poster-displayee76f.jpg`,
    shortDescription:
      "Triple-panel fold-out LED poster — unfolds to 1280×2070 mm, folds compact for transport.",
    specs: {
      "Pixel Pitch":    "P1.25–P2.5",
      "Unfolded Size":  "1280×2070×50 mm",
      "Folded Size":    "640×2070×110 mm",
    },
    href: null,
  },
  {
    slug: "ms-front-desk-led",
    name: "Front Desk LED Display Screen",
    category: "led-poster",
    brand: "milestrong",
    pixelPitch: "P1.86 / P2.5",
    cardImage: `${MS_IMG}/front-desk-led-display-screen569e4.jpg`,
    shortDescription:
      "Counter-top GOB LED display for reception desks and retail points — sleek and durable.",
    specs: {
      "Pixel Pitch":    "P1.86 / P2.5",
      "Overall Size":   "1065×585×1100 mm",
      Technology:       "GOB",
    },
    href: null,
  },
  {
    slug: "ms-interactive-digital-signage",
    name: "Interactive Digital Signage Display",
    category: "led-poster",
    brand: "milestrong",
    pixelPitch: "Custom",
    cardImage: `${MS_IMG}/interactive-digital-signage-display23310728142.png`,
    shortDescription:
      "Touch-enabled interactive LED billboard for engaging in-store and public space experiences.",
    specs: {
      Type:             "Interactive Billboard",
      "Use Case":       "Retail / Public Space",
    },
    href: null,
  },

  /* Immersive & Creative Displays */
  {
    slug: "ms-p25-immersive-screen",
    name: "P2.5 Immersive LED Screen",
    category: "immersive",
    brand: "milestrong",
    pixelPitch: "P2.5",
    cardImage: `${MS_IMG}/p2-5-immersive-led-screen04433011-442b-4597-8348-c6c38df9146f.jpg`,
    shortDescription:
      "High-brightness P2.5 immersive LED wall with wide viewing angles and excellent colour accuracy.",
    specs: {
      "Pixel Pitch":    "P2.5",
      Brightness:       "High",
      "Viewing Angle":  "Wide",
    },
    href: null,
  },
  {
    slug: "ms-magic-cube-led",
    name: "Magic Cube LED Display",
    category: "immersive",
    brand: "milestrong",
    pixelPitch: "Custom",
    cardImage: `${MS_IMG}/magic-cube-led-display-screen-for-storefronts48af6.jpg`,
    shortDescription:
      "360° cube LED display with mobile WiFi remote — customisable for storefronts and events.",
    specs: {
      "Viewing Angle":  "360°",
      Control:          "Mobile WiFi Remote",
      Shape:            "Customisable Cube",
    },
    href: null,
  },
  {
    slug: "ms-special-shape-led",
    name: "Special Shape LED Screen",
    category: "immersive",
    brand: "milestrong",
    pixelPitch: "Custom",
    cardImage: `${MS_IMG}/special-shape-led-screen24128489368.png`,
    shortDescription:
      "Custom-shaped LED panels (fan, arc, and more) with IP65 rating for indoor/outdoor installations.",
    specs: {
      Shape:            "Fan / Arc / Custom",
      Protection:       "IP65",
      Brightness:       "High",
    },
    href: null,
  },

  /* Outdoor LED Displays */
  {
    slug: "ms-outdoor-perimeter-led",
    name: "Outdoor Perimeter LED Display",
    category: "outdoor",
    brand: "milestrong",
    pixelPitch: "P4.16 / P5 / P6.25 / P8 / P10",
    cardImage: `${MS_IMG}/outdoor-perimeter-led-display25174242557.png`,
    shortDescription:
      "Sports-grade perimeter LED with 6,500 nit brightness — vivid in full sun around pitches and arenas.",
    specs: {
      "Pixel Pitch":    "P4.16–P10",
      Brightness:       "6,500 nits",
      "Panel Size":     "800×900 / 800×1200 mm",
    },
    href: null,
  },
  {
    slug: "ms-outdoor-led-sl",
    name: "Outdoor LED Display Screen (SL Series)",
    category: "outdoor",
    brand: "milestrong",
    pixelPitch: "P2.976 / P3.91 / P4.16 / P6.25 / P7.81 / P10.42",
    cardImage: `${MS_IMG}/outdoor-led-display-screen-sl-series2dd39.jpg`,
    shortDescription:
      "IP65 outdoor LED in the SL Series — fine pitch down to P2.976 for high-density outdoor viewing.",
    specs: {
      "Pixel Pitch":    "P2.976–P10.42",
      "Module Size":    "500×250 mm",
      Protection:       "IP65",
    },
    href: null,
  },

  /* Other */
  {
    slug: "ms-general-product",
    name: "General LED Display",
    category: "other",
    brand: "milestrong",
    pixelPitch: "Custom",
    cardImage: `${MS_IMG}/20251229100515a35fd.png`,
    shortDescription:
      "Versatile LED display solution — contact us for specifications and custom configurations.",
    specs: {
      Type: "Custom Configuration",
    },
    href: null,
  },
];

/* ─── 合併輸出 ──────────────────────────────────────────────────────── */

export const CATALOG_PRODUCTS = [...K1_PRODUCTS, ...MILESTRONG_PRODUCTS];
