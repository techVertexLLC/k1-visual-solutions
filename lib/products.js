/**
 * Product catalog — single source of truth for K1 Visual Solutions.
 *
 * Redesign Phase 1: the catalog is exactly three product lines, each with the
 * full data set behind the 11-section detail page template
 * (components/products/ProductDetailPage.jsx):
 *
 *   crystal-film      Crystal Film LED Screen        (project product, per-m²)
 *   holographic       SMD Holographic Invisible Screen (project product, per-m²)
 *   soft-led-display  Soft LED Display                (retail product, per-unit)
 *
 * Consumed by the catalog page (/products), the dynamic detail pages
 * (/products/[slug]) including generateStaticParams, sitemap.xml, and the home
 * page's featured-products preview.
 *
 * Back-compat: `category`, `cardImage`, `pixelPitch`, `shortDescription`,
 * `gallery`, and the flat `specs` map are kept on every product because
 * ProductCard / ProductCatalog / lib/structured-data.js read them.
 *
 * Image/video src values are site-root relative — this project runs next/image
 * with images.unoptimized and addresses all assets as "/assets/...".
 *
 * Spec figures are transcribed verbatim from docs/redesign-spec.txt
 * (§5.5 crystal film, §6.5 holographic, §7.5 soft LED) — do not round or
 * "normalise" them; the two product lines legitimately differ (e.g. 160° vs
 * 140° viewing angle).
 */

const IMG = "/assets/images";
const VID = "/assets/videos";
const DOCS = "/assets/docs";
const MATRIX = `${IMG}/products/matrix-panel`;

/* Filter categories used by the catalog tabs and the navbar dropdown. `all` is
   synthesised in the UI. `label` is the long descriptive form; `short` is the
   compact pill label shown on the catalog filter tabs. */
export const CATEGORIES = [
  { key: "all", label: "All Products", short: "All" },
  { key: "crystal-film", label: "Crystal Film LED Screen", short: "Crystal Film" },
  { key: "holographic", label: "Holographic Invisible Screen", short: "Holographic" },
  { key: "soft-led-display", label: "Soft LED Display", short: "Soft LED" },
];

/* Short labels for chips / badges, keyed by category. */
export const CATEGORY_LABEL = {
  "crystal-film": "Crystal Film",
  holographic: "Holographic",
  "soft-led-display": "Soft LED",
};

export const PRODUCTS = [
  /* ───────────────────────────── Product ① ─────────────────────────────
     Crystal Film LED Screen — self-adhesive flexible transparent film.
     Project product: sold per m², engineered per facade.                  */
  {
    slug: "crystal-film",
    name: "Crystal Film LED Screen",
    chineseName: "晶膜LED貼膜屏",
    tagline:
      "Self-adhesive transparent LED film — 2.5 mm thin, 90%+ transparency. Stick it on glass and the window becomes a media wall.",
    subtitle: "Transparent by day. A screen by night.",
    productType: "project",
    category: "crystal-film",
    pixelPitch: "P6.25 – P20",
    cardImage: `${IMG}/cases/case-coca-cola-experience-p625.jpg`,
    shortDescription:
      "Self-adhesive transparent LED film, 2.5 mm thin with 90%+ transparency — no steel structure, applied straight onto glass.",
    description:
      "Crystal Film is a self-adhesive flexible transparent LED display: driver-integrated Mini LED beads encapsulated in a 2.5 mm film that bonds directly onto glass. Over 90% transparency keeps the glazing clear by day; powered on, the facade or window becomes a high-brightness media surface.",

    hero: {
      video: `${VID}/case-beijing.mp4`,
      poster: `${IMG}/cases/case-beijing-daxing-airport-p625.jpg`,
      stats: [
        { value: "≥90%", label: "Transparency" },
        { value: "2.5mm", label: "Thickness" },
        { value: "1.3kg", label: "Per Module" },
      ],
    },

    whatIsIt: {
      text: "Crystal Film is a self-adhesive, flexible transparent LED display: driver-integrated Mini LED beads are encapsulated in a transparent film just 2.5 mm thick. A proprietary adhesive-potting process gives the film its own bond — it applies straight onto glass with no steel structure and no drilling, and plays the moment power and signal are connected. With transparency above 90%, the screen is close to invisible when off and never blocks daylight; lit up, a glass facade or shop window turns into a high-brightness media wall. Patented invisible-grid circuitry with in-bead driver ICs delivers industry-leading clarity, and a 6 cm minimum bend diameter lets the film follow columns, arcs, and shaped glazing.",
      image: `${IMG}/scenes/scene-cafe-storefront.jpg`,
      scenarios: ["Storefront", "Glass Facade", "Mall", "Showroom", "Airport", "Exhibition"],
    },

    statsBar: [
      { value: "≥90%", label: "Transparency" },
      { value: "2.5mm", label: "Screen Thickness" },
      { value: "5kg/m²", label: "Weight" },
      { value: "3,840Hz", label: "Refresh Rate" },
      { value: "100,000h", label: "LED Lifespan" },
      { value: "Ø6cm", label: "Min Bend Diameter" },
    ],

    features: [
      {
        icon: "eye",
        title: "High Transparency",
        description:
          "90–95% transparency depending on pitch. Patented invisible-grid circuits with in-bead driver ICs keep daylight and sightlines unobstructed — from behind, you look straight through the screen.",
        media: { type: "image", src: `${IMG}/cases/case-uzbekistan-mall-p8.jpg` },
      },
      {
        icon: "layers",
        title: "Stick & Play — No Steel Structure",
        description:
          "The proprietary adhesive-potted film carries its own bond and sticks straight onto glass, strengthening over time. Connect power and it plays — no frame, no drilling, far less install time and cost.",
        media: { type: "image", src: `${IMG}/applications/app-storefront.jpg` },
      },
      {
        icon: "wave",
        title: "Flexible & Bendable",
        description:
          "A minimum bend diameter of just 6 cm lets the film wrap cylinders, arcs, and irregular glazing that rigid panels can never follow.",
        media: {
          type: "video",
          src: `${VID}/case-immersive-tunnel.mp4`,
          poster: `${IMG}/cases/case-immersive-tunnel-01.jpg`,
        },
      },
      {
        icon: "feather",
        title: "Ultra-Thin & Light",
        description:
          "2.5 mm thin and about 5 kg/m² — near-zero load on the curtain wall, with modules light enough to ship and handle by hand.",
        media: { type: "image", src: `${IMG}/scenes/scene-flexible-film.jpg` },
      },
      {
        icon: "shield",
        title: "Reliable by Design",
        description:
          "Bi-directional drive hands over to a backup signal path on any single-point fault, failed beads stay dark instead of flickering, and true 16-bit grayscale keeps gradients smooth.",
        media: null,
      },
      {
        icon: "sun",
        title: "Weather & Flame Resistant",
        description:
          "UV-stable for 5–10 years without yellowing, V1 flame-retardant rating, and a -20 ~ 55 °C operating window for glazed semi-outdoor use.",
        media: null,
      },
    ],

    models: [
      {
        id: "p625",
        name: "P6.25",
        image: `${IMG}/cases/case-xian-saga-mall-p625.jpg`,
        specs: {
          "Pixel Pitch": "6.25 × 6.25 mm",
          "Module Size": "1000 × 400 mm",
          "Module Resolution": "160 × 64 (10,240 dots)",
          "Pixel Density": "25,600 dots/m²",
          Transparency: "90%",
          "LED Bead": "REE1515",
          "Viewing Distance": "≥ 6 m",
        },
      },
      {
        id: "p8",
        name: "P8",
        image: `${IMG}/cases/case-overseas-conference-window-p8.jpg`,
        specs: {
          "Pixel Pitch": "8 × 8 mm",
          "Module Size": "1000 × 400 mm",
          "Module Resolution": "125 × 50 (6,250 dots)",
          "Pixel Density": "15,625 dots/m²",
          Transparency: "92%",
          "LED Bead": "REE1515",
          "Viewing Distance": "≥ 8 m",
        },
      },
      {
        id: "p10",
        name: "P10",
        image: `${IMG}/cases/case-maoming-service-area-p625.jpg`,
        specs: {
          "Pixel Pitch": "10 × 10 mm",
          "Module Size": "1000 × 400 mm",
          "Module Resolution": "100 × 40 (4,000 dots)",
          "Pixel Density": "10,000 dots/m²",
          Transparency: "94%",
          "LED Bead": "REE1515",
          "Viewing Distance": "≥ 10 m",
        },
      },
      {
        id: "p15",
        name: "P15",
        image: `${IMG}/scenes/scene-architecture-facade.jpg`,
        specs: {
          "Pixel Pitch": "15 × 15 mm",
          "Module Size": "990 × 390 mm",
          "Module Resolution": "66 × 26 (1,716 dots)",
          "Pixel Density": "4,356 dots/m²",
          Transparency: "94%",
          "LED Bead": "REE2022",
          "Viewing Distance": "≥ 15 m",
        },
      },
      {
        id: "p20",
        name: "P20",
        image: `${IMG}/scenes/scene-corporate-facade.jpg`,
        specs: {
          "Pixel Pitch": "20 × 20 mm",
          "Module Size": "1000 × 400 mm",
          "Module Resolution": "50 × 20 (1,000 dots)",
          "Pixel Density": "2,500 dots/m²",
          Transparency: "95%",
          "LED Bead": "REE2022",
          "Viewing Distance": "≥ 20 m",
        },
      },
    ],

    sharedSpecs: {
      Brightness: "2,000 / 4,000 nits (two grades)",
      "Screen Thickness": "2.5 mm",
      "Module Weight": "1.3 kg (≈ 5 kg/m²)",
      "Peak Power": "600 W/m²",
      "Average Power": "200 W/m²",
      "Refresh Rate": "3,840 Hz",
      Grayscale: "16-bit",
      "Viewing Angle": "160°",
      "Drive Method": "Static",
      "Control System": "Nova / Colorlight",
      "Input Voltage": "AC 110–240 V, 50/60 Hz",
      "Pixel Configuration": "R1G1B1",
      Lifespan: "100,000 h",
      "Operating Environment": "-20 ~ 55 °C, 10–90% RH",
    },

    choosingGuide:
      "Rule of thumb: the pitch number ≈ the closest comfortable viewing distance in metres. Choose P6.25 for shop windows and close-range retail; P8 or P10 for street-front glazing read at mid distance; P15 or P20 for building facades viewed from across a street or plaza — the wider pitches are also more transparent and draw less power. P5 and P6 pitches are available as engineering customisations for specific projects.",

    splicing: {
      variant: "module",
      moduleSize: "1000 × 400 mm",
      w: 1000,
      h: 400,
      thickness: "2.5 mm",
      description:
        "Standard 1000 × 400 mm modules tile edge-to-edge in both directions — stack rows and columns into any screen size, with flat ribbon jumpers carrying signal between modules. Modules can also be cut to match the glazing's mullion grid, so the screen follows the facade rather than the other way round.",
    },

    applications: [
      { src: `${IMG}/scenes/scene-architecture-facade.jpg`, label: "Architectural Facade", alt: "Curved glass facade carrying full-colour LED content at night" },
      { src: `${IMG}/cases/case-changan-showroom-p625.jpg`, label: "Glass Pavilion", alt: "Glass showroom pavilion with transparent LED film on the glazing" },
      { src: `${IMG}/cases/case-immersive-tunnel-02.jpg`, label: "Curved & Irregular", alt: "Curved immersive tunnel lined with flexible transparent LED film" },
      { src: `${IMG}/cases/case-japan-storefront-p625.jpg`, label: "Street-front Glazing", alt: "Street-front glass storefront in Japan playing content on Crystal Film LED" },
      { src: `${IMG}/cases/case-sk-retail-p6.jpg`, label: "Retail Window", alt: "Retail window display running bright LED content on transparent film" },
      { src: `${IMG}/applications/app-retail.jpg`, label: "Mall Interior", alt: "Shopping mall interior glazing carrying transparent LED content" },
      { src: `${IMG}/scenes/scene-restaurant-hospitality.jpg`, label: "Hospitality & F&B", alt: "Restaurant glazing with a see-through LED display promotion" },
      { src: `${IMG}/applications/app-lobby.jpg`, label: "Corporate", alt: "Corporate lobby glass panels with transparent LED display" },
      { src: `${IMG}/applications/app-architecture.jpg`, label: "Media Facade", alt: "Full building media facade carrying large-scale LED imagery" },
    ],

    installation: {
      title: "Installation",
      steps: [
        {
          number: 1,
          title: "Clean & Align",
          description:
            "Clean the glass surface thoroughly and set out the screen position with an infrared level.",
        },
        {
          number: 2,
          title: "Peel & Stick",
          description:
            "Peel the release liner — the film's own adhesive bonds it to the glass. Press it flat with a silicone roller, working top to bottom.",
        },
        {
          number: 3,
          title: "Tile & Seam",
          description:
            "For multi-module walls, align the LED rows and columns across modules and roller-press the seams flush.",
        },
        {
          number: 4,
          title: "Connect & Play",
          description:
            "Connect power and signal (Nova or Colorlight control system), power on, and commission the display.",
        },
      ],
      video: null,
      guides: [],
      tagline: "No steel structure — stick, connect, play.",
    },

    cases: [
      {
        title: "Beijing Daxing International Airport",
        model: "P6.25",
        location: "Beijing, China",
        video: `${VID}/case-beijing.mp4`,
        poster: `${IMG}/cases/case-beijing-daxing-airport-p625.jpg`,
        featured: true,
      },
      {
        title: "Coca-Cola Experience Center",
        model: "P6.25",
        location: "China",
        video: `${VID}/case-cocacola.mp4`,
        poster: `${IMG}/cases/case-coca-cola-experience-p625.jpg`,
        featured: false,
      },
      {
        title: "Galaxy Macau Resort",
        model: "P6",
        location: "Macau",
        video: `${VID}/case-macau.mp4`,
        poster: `${IMG}/cases/macau-casino-01.jpg`,
        featured: false,
      },
      {
        title: "Changchun Optoelectronics Park",
        model: null,
        location: "Changchun, China",
        video: `${VID}/case-changchun.mp4`,
        poster: `${IMG}/cases/changchun-01.jpg`,
        featured: false,
      },
      {
        title: "Wanda Plaza — Postal Savings Bank",
        model: null,
        location: "Hefei, China",
        video: `${VID}/case-hefei-bank.mp4`,
        poster: `${IMG}/cases/case-hefei-postal-bank-01.jpg`,
        featured: false,
      },
      {
        title: "Maoming Expressway Service Area",
        model: "P6.25",
        location: "Maoming, China",
        video: `${VID}/case-maomin.mp4`,
        poster: `${IMG}/cases/case-maoming-service-area-p625.jpg`,
        featured: false,
      },
    ],

    faq: [
      {
        q: "Can you see the screen when it's off?",
        a: "Transparency is 90%+ — from about three metres away the film is close to invisible, and it doesn't reduce interior daylight.",
      },
      {
        q: "Do I need a steel structure or drilling?",
        a: "No. The film is self-adhesive and bonds straight onto the glass; only the small power box needs a simple fixing.",
      },
      {
        q: "How much power does it draw?",
        a: "Average 200 W/m², with a 600 W/m² peak (full white at maximum brightness). Typical video content runs far below peak.",
      },
      {
        q: "Can it be applied to curved glass?",
        a: "Yes — the minimum bend diameter is 6 cm, so it follows columns, arcs, and shaped glazing.",
      },
      {
        q: "What happens if something fails?",
        a: "A single-point fault is bypassed automatically so the screen never goes dark, and individual LED beads can be repaired on site.",
      },
      {
        q: "How do I publish content?",
        a: "Through Nova or Colorlight control systems, in synchronous or asynchronous mode — publish from a PC or a phone.",
      },
      {
        q: "Can it be used outdoors?",
        a: "The film mounts on the inside of the glass and displays out through it (semi-outdoor). The material is UV-stable for 5–10 years.",
      },
      {
        q: "What's the minimum order?",
        a: "Projects are quoted individually — there is no fixed MOQ. Send us the glazing dimensions and we'll spec it.",
      },
    ],

    cta: {
      primary: { label: "Request a Quote", href: "/contact?product=Crystal+Film+LED+Screen" },
      secondary: { label: "View Full Specs", href: "#models" },
    },

    seo: {
      title: "Crystal Film LED Screen — Self-Adhesive Transparent LED Film | K1 Visual Solutions",
      description:
        "Self-adhesive transparent LED film with 90%+ transparency, just 2.5 mm thin — no steel structure, applied straight onto glass. P6.25–P20 pitches, proven in airports, retail windows, and media facades.",
    },

    /* Back-compat gallery (old detail page, JSON-LD, OG fallbacks). */
    gallery: [
      { src: `${IMG}/cases/case-beijing-daxing-airport-p625.jpg`, alt: "Crystal Film LED Screen across the glazing of Beijing Daxing International Airport" },
      { src: `${IMG}/cases/case-coca-cola-experience-p625.jpg`, alt: "Crystal Film LED Screen at the Coca-Cola experience center" },
      { src: `${IMG}/scenes/scene-cafe-storefront.jpg`, alt: "Transparent Crystal Film LED on a daytime cafe storefront" },
      { src: `${IMG}/cases/case-japan-storefront-p625.jpg`, alt: "Street-front glazing in Japan carrying Crystal Film LED content" },
      { src: `${IMG}/scenes/scene-flexible-film.jpg`, alt: "Flexible Crystal Film LED bent into a curve" },
    ],

    /* Back-compat flat specs (ProductCard overlay, JSON-LD additionalProperty). */
    specs: {
      "Pixel pitch": "P6.25 – P20",
      Brightness: "2,000 / 4,000 nits",
      Transparency: "Up to 95%",
      Thickness: "2.5 mm",
      Weight: "≈ 5 kg/m²",
      "Refresh rate": "3,840 Hz",
      "Viewing angle": "160°",
      Lifespan: "100,000 h",
    },
  },

  /* ───────────────────────────── Product ② ─────────────────────────────
     SMD Holographic Invisible Screen — high-density borderless mesh PCB.
     Project product: sold per m², close-viewing premium installs.        */
  {
    slug: "holographic",
    name: "SMD Holographic Invisible Screen",
    chineseName: "SMD全息LED貼膜屏",
    tagline:
      "A high-density holographic invisible screen under 3 mm thick — borderless hollow-mesh PCB that all but disappears on glass, and floats imagery when lit.",
    subtitle: "Invisible on the glass. Unmissable when it plays.",
    productType: "project",
    category: "holographic",
    pixelPitch: "P2.5 – P10",
    cardImage: `${IMG}/products/holo-render-08.jpg`,
    shortDescription:
      "Borderless holographic invisible screen under 3 mm thick — up to 93% transparency, 3D playback at 120 fps, bonded straight onto glass.",
    description:
      "The SMD Holographic Invisible Screen is built on a hollow mesh-pattern PCB with a fully borderless structure, under 3 mm thick. Bonded onto glass it reads as one surface with the glazing — near-invisible off, a floating holographic image on.",

    hero: {
      video: `${VID}/case-xinpai.mp4`,
      poster: `${IMG}/cases/case-xian-xinpai-01.jpg`,
      stats: [
        { value: "93%", label: "Max Transparency" },
        { value: "<3mm", label: "Thickness" },
        { value: "P2.5", label: "Finest Pitch" },
      ],
    },

    whatIsIt: {
      text: "The SMD Holographic Invisible Screen is built on a hollow, mesh-pattern circuit PCB with a fully borderless structure. At under 3 mm thick it can be bent, cut to size, and bonded onto transparent glass until screen and glazing read as a single surface. Proprietary driver ICs and tight process control keep perceived transparency above 80% across the range — up to 93% on P10. High pixel density renders fine detail at close range, with 60 fps playback and high-refresh 3D at 120 fps, so content appears to float on the glass. A natural fit for premium shop windows, glass curtain walls, showrooms, cultural venues, and auto dealerships.",
      image: `${IMG}/products/holo-render-02.jpg`,
      scenarios: ["Retail Window", "Showroom", "Airport", "Auto Dealership", "Glass Facade", "Culture & Tourism"],
    },

    statsBar: [
      { value: "<3mm", label: "Screen Thickness" },
      { value: "93%", label: "Max Transparency" },
      { value: "≥3,840Hz", label: "Refresh Rate" },
      { value: "4,000:1", label: "Contrast Ratio" },
      { value: "120fps", label: "3D Playback" },
      { value: "100,000h", label: "Chip Lifespan" },
    ],

    features: [
      {
        icon: "ruler",
        title: "Under 3 mm Thin",
        description:
          "The screen body measures less than 3 mm — bonded to glass it reads as part of the glazing itself. Next to a coin, the panel edge almost disappears.",
        media: { type: "image", src: `${IMG}/products/holographic-coin-comparison-01.jpg` },
      },
      {
        icon: "feather",
        title: "Light to Handle",
        description:
          "From just 1.2 kg per module, panels carry to site and onto the glass without lifting gear — faster installs, lower cost.",
        media: { type: "image", src: `${IMG}/products/holo-render-11.jpg` },
      },
      {
        icon: "wave",
        title: "Bend & Cut to Fit",
        description:
          "Modules curve against inner arcs and trim to size, following shaped and irregular glazing without custom tooling.",
        media: { type: "image", src: `${IMG}/products/holo-detail-bend.jpg` },
      },
      {
        icon: "eye",
        title: "Near-Invisible Off",
        description:
          "The hollow mesh circuit preserves the architecture and its daylight — when the content stops, the screen all but vanishes from the glass.",
        media: { type: "image", src: `${IMG}/products/holo-render-08.jpg` },
      },
      {
        icon: "sparkle",
        title: "High-Fidelity Image",
        description:
          "Up to 160,000 dots/m² on P2.5, 4,000:1 contrast, colour temperature tunable from 2,000–9,500 K, and 3D playback at 120 fps.",
        media: { type: "image", src: `${IMG}/products/smd-holo-content-flame.jpg` },
      },
      {
        icon: "grid",
        title: "Modular, Endless Splicing",
        description:
          "Standard modules butt-join vertically and extend horizontally without limit — one continuous image across the full glass line.",
        media: { type: "image", src: `${IMG}/products/holo-render-23.jpg` },
      },
    ],

    models: [
      {
        id: "p25",
        name: "P2.5",
        image: `${IMG}/products/holo-render-13.jpg`,
        specs: {
          "Pixel Pitch": "2.5 × 2.5 mm",
          "Pixel Density": "160,000 dots/m²",
          Transparency: "70%",
          Brightness: "≥ 1,800 cd/m²",
          "Module Width": "125 mm",
          "Module Length": "1035 / 1235 mm",
          "Module Resolution": "50 × 400 / 50 × 480",
          "Peak Power": "800 W/m²",
          "Average Power": "350 W/m²",
          "Viewing Distance": "≥ 2.5 m",
        },
      },
      {
        id: "p391",
        name: "P3.91",
        image: `${IMG}/products/smd-p391-product-01.jpg`,
        specs: {
          "Pixel Pitch": "3.91 × 3.91 mm",
          "Pixel Density": "65,536 dots/m²",
          Transparency: "80%",
          Brightness: "≥ 3,000 cd/m²",
          "Module Width": "250 mm",
          "Module Length": "1035 / 1235 / 1535 mm",
          "Module Resolution": "64 × 256 / 64 × 307 / 64 × 384",
          "Peak Power": "1,000 W/m²",
          "Average Power": "370 W/m²",
          "Viewing Distance": "≥ 4 m",
        },
      },
      {
        id: "p625",
        name: "P6.25",
        image: `${IMG}/products/smd-p625-product-01.jpg`,
        specs: {
          "Pixel Pitch": "6.25 × 6.25 mm",
          "Pixel Density": "25,600 dots/m²",
          Transparency: "90%",
          Brightness: "≥ 5,000 cd/m²",
          "Module Width": "250 mm",
          "Module Length": "1235 / 1535 mm",
          "Module Resolution": "40 × 192 / 40 × 240",
          "Peak Power": "1,000 W/m²",
          "Average Power": "370 W/m²",
          "Viewing Distance": "≥ 6 m",
        },
      },
      {
        id: "p10",
        name: "P10",
        image: `${IMG}/products/smd-p104-product-01.jpg`,
        specs: {
          "Pixel Pitch": "10 × 10 mm",
          "Pixel Density": "10,000 dots/m²",
          Transparency: "93%",
          Brightness: "≥ 5,000 cd/m²",
          "Module Width": "250 mm",
          "Module Length": "1035 / 1535 mm",
          "Module Resolution": "25 × 100 / 25 × 150",
          "Peak Power": "1,000 W/m²",
          "Average Power": "370 W/m²",
          "Viewing Distance": "≥ 10 m",
        },
      },
    ],

    sharedSpecs: {
      "Viewing Angle": "140° (horizontal / vertical)",
      "Contrast Ratio": "Up to 4,000:1",
      "Refresh Rate": "≥ 3,840 Hz",
      "Frame Rate": "60 fps (high-refresh 3D at 120 fps)",
      "Color Temperature": "2,000–9,500 K adjustable",
      "Ingress Protection": "IP20",
      "Input Voltage": "AC 110–240 V, 50/60 Hz",
      MTBF: "≥ 10,000 h",
      "LED Chip Lifespan": "100,000 h",
      "Operating Environment": "-10 ~ 60 °C, 10–90% RH non-condensing",
      Installation: "Glass-bonded / suspended / inner-arc — supports cutting & bending",
      Customisation: "Brightness and dimensions made to order",
    },

    /* Factory-measured consumption — shown as a credibility card next to specs. */
    powerNote:
      "Real-world power: factory tests measured P6.25 at just 180–300 W/m² and P3.91 at 200–280 W/m² playing video content across brightness levels — far below the white-field peak figures above.",

    choosingGuide:
      "The pitch number ≈ the closest clear viewing distance in metres. P2.5 and P3.91 suit eye-level shop windows and showroom pieces viewed from 2–4 m; P6.25 is the all-rounder for storefronts and exhibition walls; P10 trades density for the highest transparency (93%) on large glass spans. Beyond tiled modules, ready-made formats are available: P2.5 / P3.91 indoor hanging posters (758 × 1323 mm and 1008 × 1623 mm) and P3.91 floor-standing or suspended ad players (1008 × 2449 mm up to 2008 × 2948 mm).",

    splicing: {
      variant: "module",
      moduleSize: "1230 × 250 mm",
      w: 1230,
      h: 250,
      thickness: "< 3 mm",
      description:
        "Standard modules are 250 mm wide (125 mm on P2.5) in lengths from 1035 to 1535 mm. They butt-join top-to-bottom and extend left-to-right without limit, and panels can be cut to size or curved against inner arcs — the screen follows the glass exactly.",
    },

    applications: [
      { src: `${IMG}/scenes/scene-holo-render-01.jpg`, label: "Retail Window", alt: "Holographic invisible screen floating content in a retail window" },
      { src: `${IMG}/scenes/scene-holo-render-02.jpg`, label: "Airport Hall", alt: "Holographic LED screen carrying information in an airport hall" },
      { src: `${IMG}/scenes/scene-holo-render-03.jpg`, label: "Auto Showroom", alt: "Auto showroom glazing with 3D holographic vehicle content" },
      { src: `${IMG}/scenes/scene-holo-render-04.jpg`, label: "Glass Facade", alt: "Building glass facade with holographic LED display" },
      { src: `${IMG}/scenes/scene-holo-render-05.jpg`, label: "Exhibition & Events", alt: "Exhibition space with holographic invisible screens" },
      { src: `${IMG}/scenes/scene-holo-render-06.jpg`, label: "Brand Showroom", alt: "Brand showroom featuring a floating holographic display" },
      { src: `${IMG}/scenes/scene-holo-render-07.jpg`, label: "Luxury Retail", alt: "Luxury retail interior with holographic LED glass display" },
      { src: `${IMG}/scenes/scene-holo-render-08.jpg`, label: "Hotel & Hospitality", alt: "Hotel interior glazing with holographic content" },
      { src: `${IMG}/scenes/scene-holo-render-09.jpg`, label: "Culture & Tourism", alt: "Cultural venue with large holographic invisible screen" },
    ],

    installation: {
      title: "Installation",
      methods: [
        {
          name: "Front Facing",
          steps: [
            {
              number: 1,
              title: "Unpack with Care",
              description:
                "Open the vacuum bag and remove the screen body carefully — never press on the lamp beads.",
            },
            {
              number: 2,
              title: "Fit the Bracket",
              description:
                "Lock the fixing bracket onto the power box with a Phillips screwdriver.",
            },
            {
              number: 3,
              title: "Position & Stick",
              description:
                "Confirm the position of the first sheet, tear off the facing of the double-sided adhesive tape, and stick the sheet onto the glass.",
            },
            {
              number: 4,
              title: "Roller-Press Flat",
              description:
                "Stick the front of the screen onto the glass and roll one side with a silicone roller until it sits stable and flush.",
            },
            {
              number: 5,
              title: "Secure the Power Box",
              description:
                "Screw the power-box bracket to the existing structure on site.",
            },
            {
              number: 6,
              title: "Connect & Debug",
              description:
                "Open the power box, connect the network cable and power cord, power on, and commission the screen.",
            },
          ],
        },
        {
          name: "Back Sticker",
          steps: [
            {
              number: 1,
              title: "Unpack with Care",
              description:
                "Open the vacuum bag and remove the screen body carefully — never press on the lamp beads.",
            },
            {
              number: 2,
              title: "Fit the Bracket",
              description:
                "Lock the fixing bracket onto the power box with a Phillips screwdriver.",
            },
            {
              number: 3,
              title: "Position & Stick",
              description:
                "Confirm the position of the first sheet, tear off the double-sided tape, and stick the sheet onto the glass from behind.",
            },
            {
              number: 4,
              title: "Secure the Power Box",
              description:
                "Screw the power-box bracket to the existing structure on site.",
            },
            {
              number: 5,
              title: "Connect & Debug",
              description:
                "Open the power box, connect the network cable and power cord, power on, and commission the screen.",
            },
          ],
        },
      ],
      steps: null,
      video: null,
      guides: [
        { label: "Front-facing installation guide", href: `${DOCS}/holo-install-guide-front-facing.jpg` },
        { label: "Back-sticker installation guide", href: `${DOCS}/holo-install-guide-back-sticker.jpg` },
        { label: "Product manual (PDF)", href: `${DOCS}/holographic-invisible-screen-manual.pdf` },
      ],
      tagline: "Glass-bonded, suspended, or inner-arc — no steel structure, no drilling.",
    },

    cases: [
      {
        title: "Xinpai Semiconductor Showroom",
        model: "P6.25",
        location: "Xi'an, China",
        video: `${VID}/case-xinpai.mp4`,
        poster: `${IMG}/cases/case-xian-xinpai-01.jpg`,
        featured: true,
      },
      {
        title: "Estée Lauder Flagship",
        model: null,
        location: "Shanghai, China",
        video: `${VID}/case-estee-lauder.mp4`,
        poster: `${IMG}/cases/case-shanghai-estee-lauder-01.jpg`,
        featured: false,
      },
      {
        title: "Baiyun Airport — Dream Blue Pavilion",
        model: "P6.25",
        location: "Guangzhou, China",
        video: `${VID}/case-baiyun-airport.mp4`,
        poster: `${IMG}/cases/case-guangzhou-baiyun-airport-01.jpg`,
        featured: false,
      },
      {
        title: "Las Vegas Sun Casino",
        model: null,
        location: "Cambodia",
        video: `${VID}/case-cambodia-casino.mp4`,
        poster: `${IMG}/cases/case-cambodia-lasvegas-sun-01.jpg`,
        featured: false,
      },
      {
        title: "Zhongguangshi Media Center",
        model: "P6.25",
        location: "Nanning, China",
        video: `${VID}/case-nanning.mp4`,
        poster: `${IMG}/cases/case-nanning-zhongguangshi-01.jpg`,
        featured: false,
      },
      {
        title: "Mashan Resort — Indoor Holographic",
        model: null,
        location: "Mashan, China",
        video: null,
        poster: `${IMG}/cases/mashan-01.jpg`,
        featured: false,
      },
    ],

    faq: [
      {
        q: "Can you see the screen when it's off?",
        a: "Perceived transparency runs 70–93% depending on pitch — on the wider pitches the mesh all but disappears from a few metres away, and interior daylight is unaffected.",
      },
      {
        q: "Holographic or Crystal Film — which one do I need?",
        a: "Viewed close (2–6 m), or when you want fine, 3D-capable imagery: Holographic — its pitches run down to P2.5 with 120 fps 3D. Large-format, budget-led, or viewed from far away: Crystal Film — bigger modules, higher transparency per dollar, simpler self-adhesive install.",
      },
      {
        q: "Does it support 3D content?",
        a: "Yes — high-refresh 3D playback at 120 fps, alongside standard 60 fps video.",
      },
      {
        q: "Can a failed LED be repaired?",
        a: "Yes. Lamp beads are repairable at single-point level on site, so a fault never means replacing a panel.",
      },
      {
        q: "How is it powered?",
        a: "AC 110–240 V, 50/60 Hz into a slim power box at the foot of the screen; the box also carries the network signal connection.",
      },
      {
        q: "How do I publish content?",
        a: "Standard LED control systems with synchronous or asynchronous publishing — manage content from a PC or phone, including scheduled playlists.",
      },
      {
        q: "Can it be used outdoors?",
        a: "The screen is rated IP20 and mounts on the indoor side of the glass, displaying out through the glazing — full weather exposure isn't required or recommended.",
      },
      {
        q: "What's the minimum order and lead time?",
        a: "Projects are quoted individually with no fixed MOQ. Standard modules ship fast; cut-to-size and custom-brightness panels are made to order.",
      },
    ],

    cta: {
      primary: { label: "Request a Quote", href: "/contact?product=Holographic+Invisible+Screen" },
      secondary: { label: "Download Spec Sheet", href: `${DOCS}/holographic-invisible-screen-manual.pdf` },
    },

    seo: {
      title: "SMD Holographic Invisible LED Screen — P2.5 to P10 | K1 Visual Solutions",
      description:
        "Borderless holographic invisible LED screen under 3 mm thick — up to 93% transparency, 3D playback at 120 fps, bonded straight onto glass. P2.5–P10 for premium windows, showrooms, and facades.",
    },

    gallery: [
      { src: `${IMG}/products/holo-render-02.jpg`, alt: "SMD Holographic Invisible Screen — borderless mesh panel with power box, studio render" },
      { src: `${IMG}/products/holo-render-08.jpg`, alt: "Two holographic invisible screens, one lit and one off, showing the transparency contrast" },
      { src: `${IMG}/products/holographic-coin-comparison-01.jpg`, alt: "Holographic screen edge compared with a coin for scale" },
      { src: `${IMG}/products/smd-p625-product-01.jpg`, alt: "SMD Holographic P6.25 panel, three-quarter studio view" },
      { src: `${IMG}/products/smd-holo-content-flame.jpg`, alt: "Holographic screen rendering high-contrast flame content" },
      { src: `${IMG}/products/holo-detail-bend.jpg`, alt: "Holographic screen module flexed into a curve" },
    ],

    specs: {
      "Pixel pitch": "P2.5 – P10",
      Brightness: "Up to ≥ 5,000 cd/m²",
      Transparency: "Up to 93%",
      Thickness: "< 3 mm",
      "Refresh rate": "≥ 3,840 Hz",
      "Contrast ratio": "4,000:1",
      "Viewing angle": "140°",
      Lifespan: "100,000 h",
    },
  },

  /* ───────────────────────────── Product ③ ─────────────────────────────
     Soft LED Display — plug-and-play flexible LED matrix sign.
     Retail product: sold per unit to merchants and resellers.            */
  {
    slug: "soft-led-display",
    name: "Soft LED Display",
    chineseName: "軟性LED字幕屏",
    subName: "Flexible LED Matrix Sign",
    tagline:
      "A plug-and-play flexible LED sign — peel, stick, edit from your phone, and your storefront is live in five minutes.",
    subtitle: "Your storefront sign just learned to move.",
    productType: "retail",
    category: "soft-led-display",
    pixelPitch: "35″ / 52″ / 70″",
    cardImage: `${MATRIX}/scenario-coffee-shop.jpg`,
    shortDescription:
      "Plug-and-play flexible LED matrix sign in three sizes — app + remote control, waterproof, 10 W, live in five minutes.",
    description:
      "The Soft LED Display is a bendable LED matrix sign that conforms to window glass, walls, and curved surfaces. USB-powered at just 10 W, controlled over Bluetooth from the iPixel Color app or the bundled remote — unbox, stick, pair, and play.",

    hero: {
      video: `${VID}/matrix-panel-demo-01.mp4`,
      poster: `${MATRIX}/scenario-coffee-shop.jpg`,
      stats: [
        { value: "3", label: "Sizes — 35″/52″/70″" },
        { value: "10W", label: "Power Draw" },
        { value: "5min", label: "Setup Time" },
      ],
    },

    whatIsIt: {
      text: "The Soft LED Display is a bendable, flexible LED matrix sign: a 16-dot-high LED grid encapsulated in a soft body that conforms to window glass, walls, even curved surfaces. It runs on 5 V USB or Type-C power and draws just 10 W — about as much as a light bulb. Pair it over Bluetooth with the iPixel Color app (iOS / Android) or use the bundled remote to publish scrolling text in any language, DIY pixel art, animations, clocks, and music-reactive effects from a built-in template library. The waterproof build works in windows, door fronts, indoors and out. And there's no installation work at all — unbox, stick, pair, and you're playing in five minutes.",
      image: `${MATRIX}/matrix-panel-52-product.jpg`,
      scenarios: ["Coffee Shop", "Restaurant & Bar", "Smoke & Vape", "Salon & Barber", "Grocery & Liquor", "Home & Studio"],
    },

    statsBar: [
      { value: "3", label: "Sizes" },
      { value: "10W", label: "Power Draw" },
      { value: "5V", label: "USB / Type-C Power" },
      { value: "16×192", label: "Max LED Matrix" },
      { value: "3,072", label: "LEDs (XL 70″)" },
      { value: "0", label: "Installation Works" },
    ],

    features: [
      {
        icon: "plug",
        title: "Plug & Play",
        description:
          "USB or Type-C at 5 V — no wiring, no installer. Stick it up, plug it in, and it's running.",
        media: {
          type: "video",
          src: `${VID}/matrix-panel-demo-02.mp4`,
          poster: `${MATRIX}/matrix-panel-35-cafe.jpg`,
        },
      },
      {
        icon: "phone",
        title: "App + Remote, Dual Control",
        description:
          "Pair over Bluetooth with the iPixel Color app for text, pixel art, animations, clocks, music rhythm, and playlists — or flip presets from the bundled remote.",
        media: { type: "image", src: `${MATRIX}/matrix-panel-remote-control.jpg` },
      },
      {
        icon: "wave",
        title: "Flexible & Bendable",
        description:
          "The soft body curves around glass, walls, and corners — and rolls up for transport between venues.",
        media: { type: "image", src: `${MATRIX}/matrix-panel-70-product.jpg` },
      },
      {
        icon: "droplet",
        title: "Waterproof",
        description:
          "A sealed, waterproof build runs in storefront windows, door fronts, and under awnings — indoors and out.",
        media: null,
      },
      {
        icon: "bolt",
        title: "10 W Ultra-Low Power",
        description:
          "Scrolls all day, every day, for the energy budget of a single light bulb.",
        media: null,
      },
      {
        icon: "globe",
        title: "Multi-Language & Templates",
        description:
          "Type in any language with emoji support, or pick from the built-in gallery — promos change as fast as you can type them.",
        media: { type: "image", src: `${MATRIX}/matrix-panel-35-retail.jpg` },
      },
    ],

    models: [
      {
        id: "m35",
        name: "M — 35″",
        image: `${MATRIX}/matrix-panel-35-storefront.jpg`,
        specs: {
          Model: "HRP-1696PLUS (16×96 Plus)",
          "Matrix Resolution": "16 × 96",
          "LED Count": "1,536",
          "Screen Size": "89.8 × 19.2 cm (35.35″ × 7.56″)",
          "Power Supply": "5V 2A",
          "Power Consumption": "10 W",
        },
      },
      {
        id: "l52",
        name: "L — 52″",
        image: `${MATRIX}/matrix-panel-52-product.jpg`,
        specs: {
          Model: "HRP-128 (16×144)",
          "Matrix Resolution": "16 × 144",
          "LED Count": "2,304",
          "Screen Size": "133 × 19.2 cm (52.36″ × 7.56″)",
          "Power Supply": "5V 4A",
          "Power Consumption": "10 W",
        },
      },
      {
        id: "xl70",
        name: "XL — 70″",
        image: `${MATRIX}/matrix-panel-70-product.jpg`,
        specs: {
          Model: "HRP-16192 (16×192)",
          "Matrix Resolution": "16 × 192",
          "LED Count": "3,072",
          "Screen Size": "176.2 × 19.2 cm (69.37″ × 7.56″)",
          "Power Supply": "5V 4A",
          "Power Consumption": "10 W",
        },
      },
    ],

    sharedSpecs: {
      Control: "iPixel Color app (Bluetooth) + IR remote",
      Cables: "USB & Type-C included",
      "Water Resistance": "Waterproof — indoor & outdoor windows",
      Installation: "None — stick or hang, plug in",
      "Content Modes": "Multi-language text, DIY pixel art, animations, clock, music rhythm",
      Power: "5 V USB / Type-C, 10 W",
    },

    choosingGuide:
      "Pick M 35″ for a single door front or behind the register; L 52″ for a standard shop window; XL 70″ for wide frontages — or run several panels side by side (multi-display setups are common in smoke shops and bars).",

    splicing: {
      variant: "sizes",
      title: "Choose Your Size",
      moduleSize: "All sizes 19.2 cm tall",
      thickness: "Flexible body",
      sizes: [
        { name: "M", inches: 35.35, label: "35″ — 89.8 × 19.2 cm" },
        { name: "L", inches: 52.36, label: "52″ — 133 × 19.2 cm" },
        { name: "XL", inches: 69.37, label: "70″ — 176.2 × 19.2 cm" },
      ],
      description:
        "All three sizes share the same 19.2 cm height and 16-dot matrix — only the length changes. Wider frontage? Run multiple panels side by side from the same app.",
    },

    applications: [
      { src: `${MATRIX}/scenario-coffee-shop.jpg`, label: "Coffee Shop", alt: "Soft LED display sign glowing in a coffee shop window" },
      { src: `${MATRIX}/scenario-bakery.jpg`, label: "Bakery", alt: "Bakery storefront with a scrolling LED matrix sign" },
      { src: `${MATRIX}/scenario-burger-shop.jpg`, label: "Burger Shop", alt: "Burger shop window with a bright LED message sign" },
      { src: `${MATRIX}/scenario-smoke-shop.jpg`, label: "Smoke Shop", alt: "Smoke shop storefront with a flexible LED sign" },
      { src: `${MATRIX}/scenario-smoke-shop-2.jpg`, label: "Smoke Shop", alt: "Smoke shop interior with multiple LED matrix displays" },
      { src: `${MATRIX}/scenario-vape-shop.jpg`, label: "Vape Shop", alt: "Vape shop window with an animated LED sign" },
      { src: `${MATRIX}/scenario-vape-shop-2.jpg`, label: "Vape Shop", alt: "Vape shop storefront with a scrolling LED display" },
      { src: `${MATRIX}/scenario-vape-lounge.jpg`, label: "Vape Lounge", alt: "Vape lounge with an LED matrix sign in the window" },
      { src: `${MATRIX}/scenario-home-decor.jpg`, label: "Home & Decor", alt: "Home studio wall with a decorative pixel LED display" },
      { src: `${MATRIX}/scenario-bar-lounge.jpg`, label: "Bar & Lounge", alt: "Bar lounge with an animated LED matrix sign" },
    ],

    installation: {
      title: "How It Works",
      steps: [
        {
          number: 1,
          title: "Stick It",
          description:
            "Unbox and stick or hang the soft panel on your window or wall — no tools needed.",
        },
        {
          number: 2,
          title: "Pair It",
          description:
            "Power it over USB and pair with the iPixel Color app over Bluetooth — scan the QR code on the box to download.",
        },
        {
          number: 3,
          title: "Play It",
          description:
            "Type your message or pick a template and it's live on the screen — flip presets anytime from the remote.",
        },
      ],
      video: `${VID}/matrix-panel-demo-03.mp4`,
      guides: [],
      tagline: "Unbox to live in five minutes — no tools, no installer.",
    },

    appControl: {
      app: "iPixel Color",
      platforms: "iOS & Android",
      connection: "Bluetooth",
      remoteImage: `${MATRIX}/matrix-panel-remote-control.jpg`,
      description:
        "Everything on the screen is edited from your phone: the iPixel Color app pairs over Bluetooth and publishes instantly. The bundled IR remote flips between saved presets, timers, and brightness without opening the app.",
      features: [
        "Scrolling text in any language, with emoji",
        "DIY pixel-art editor",
        "Animation & template gallery",
        "Clock and countdown modes",
        "Music-reactive rhythm mode",
        "Program lists & scheduling",
      ],
    },

    certifications: [
      { name: "FCC ID", region: "United States", file: `${DOCS}/soft-cert-fcc.pdf` },
      { name: "CE-RED", region: "European Union", file: `${DOCS}/soft-cert-ce-red.pdf` },
      { name: "UKCA", region: "United Kingdom", file: `${DOCS}/soft-cert-ukca.pdf` },
      { name: "UL / BCTC Test Report", region: "North America", file: `${DOCS}/soft-cert-ul-bctc.pdf` },
    ],

    wholesale: {
      note: "Stocked for North American distribution — carton-quantity pricing for resellers and regional distributors.",
      cartons: [
        { model: "M — 35″", units: "18 units / carton", carton: "17 × 14 × 14″", weight: "40 lb" },
        { model: "L — 52″", units: "12 units / carton", carton: "17 × 16 × 11″", weight: "40 lb" },
        { model: "XL — 70″", units: "8 units / carton", carton: "—", weight: "—" },
      ],
      cta: { label: "Become a Reseller", href: "/contact?product=Soft+LED+Display" },
    },

    cases: [
      {
        title: "Storefront Window Loop",
        model: "XL 70″",
        location: null,
        video: `${VID}/matrix-panel-demo-01.mp4`,
        poster: `${MATRIX}/scenario-smoke-shop.jpg`,
        featured: true,
      },
      {
        title: "Bar & Lounge Promos",
        model: "L 52″",
        location: null,
        video: `${VID}/matrix-panel-demo-02.mp4`,
        poster: `${MATRIX}/scenario-bar-lounge.jpg`,
        featured: false,
      },
      {
        title: "Pixel Art & Animations",
        model: "M 35″",
        location: null,
        video: `${VID}/matrix-panel-demo-03.mp4`,
        poster: `${MATRIX}/scenario-vape-shop.jpg`,
        featured: false,
      },
    ],

    faq: [
      {
        q: "Do I need an installer?",
        a: "No. It's USB-powered and sticks or hangs in place — most owners are live within five minutes of opening the box.",
      },
      {
        q: "How do I change what it says?",
        a: "Pair the iPixel Color app over Bluetooth and edit from your phone, or flip between saved presets with the included remote.",
      },
      {
        q: "Can it go outside?",
        a: "The build is waterproof and suits door fronts and the outside of windows — avoid prolonged direct sun and heavy rain exposure where you can.",
      },
      {
        q: "Which languages does it support?",
        a: "The app accepts multi-language text input, plus emoji and symbols.",
      },
      {
        q: "How much power does it draw?",
        a: "10 W — about the same as one energy-saving light bulb, even scrolling all day.",
      },
      {
        q: "Is it certified?",
        a: "Yes — FCC (US), CE-RED (EU), UKCA (UK), and a UL/BCTC test report. All four certificates are downloadable as PDFs on this page.",
      },
      {
        q: "I want to wholesale or distribute — what's the deal?",
        a: "Use the Become a Reseller button and tell us your region. Carton quantities: 18 × 35″, 12 × 52″, or 8 × 70″ per box, with distributor pricing per carton.",
      },
    ],

    cta: {
      primary: { label: "Get Pricing", href: "/contact?product=Soft+LED+Display" },
      secondary: { label: "Become a Reseller", href: "/contact?product=Soft+LED+Display" },
    },

    seo: {
      title: "Soft LED Display — Flexible Programmable LED Sign, 35″/52″/70″ | K1 Visual Solutions",
      description:
        "Plug-and-play flexible LED sign in 35″, 52″, and 70″ — app + remote control over Bluetooth, waterproof, 10 W, FCC/CE/UKCA certified. Built for storefronts, windows, and small-business signage.",
    },

    gallery: [
      { src: `${MATRIX}/scenario-coffee-shop.jpg`, alt: "Soft LED display sign in a coffee shop window at night" },
      { src: `${MATRIX}/matrix-panel-52-product.jpg`, alt: "Soft LED Display 52-inch flexed into a curve with app, remote, and power supply" },
      { src: `${MATRIX}/matrix-panel-70-product.jpg`, alt: "Soft LED Display 70-inch curved panel with control accessories" },
      { src: `${MATRIX}/matrix-panel-35-storefront.jpg`, alt: "35-inch Soft LED Display running an OPEN sign in a cafe window" },
      { src: `${MATRIX}/matrix-panel-remote-control.jpg`, alt: "Bundled IR remote control for the Soft LED Display" },
    ],

    specs: {
      Sizes: "35″ / 52″ / 70″",
      "Pixel pitch": "16-dot LED matrix",
      "Matrix resolution": "16 × 96 – 16 × 192",
      Power: "10 W (5 V USB / Type-C)",
      Control: "iPixel Color app + remote",
      "Water resistance": "Waterproof",
      Certifications: "FCC / CE-RED / UKCA / UL-BCTC",
    },
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
 * the product itself. Returns up to `count`. With one product per category
 * this resolves to "the other two lines" — exactly the cross-sell the detail
 * page wants.
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
