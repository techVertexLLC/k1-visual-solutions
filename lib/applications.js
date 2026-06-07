/**
 * Application / solution scenarios — shared by the home page preview (top 4)
 * and the full Solutions page. Each entry is a real KeyShot render with a label
 * and one calm line of copy. Image src values carry the "/k1" basePath.
 */

const IMG = "/k1/assets/images/applications";

export const APPLICATIONS = [
  {
    src: `${IMG}/app-retail.jpg`,
    label: "Retail",
    description: "Storewide motion that never walls off the merchandise.",
    detail:
      "Transparent surfaces let a brand run full-motion campaigns across windows and interior glass while shoppers still see the product and the store beyond. Light stays in, sightlines stay open.",
    alt: "Retail store interior with a transparent LED display",
  },
  {
    src: `${IMG}/app-architecture.jpg`,
    label: "Architecture",
    description: "Media facades that let daylight and the building through.",
    detail:
      "Up to 90% transparency turns a curtain wall into a media facade without darkening the interior — daylight passes through by day, content reads clearly after dark.",
    alt: "Architectural glass facade with an integrated LED display",
  },
  {
    src: `${IMG}/app-storefront.jpg`,
    label: "Storefront",
    description: "Window content that pulls the street in, day or night.",
    detail:
      "High-brightness panels mount to existing glazing and stay legible against daylight, turning a shopfront window into an always-on canvas without blocking the display behind it.",
    alt: "Storefront window with a transparent LED display",
  },
  {
    src: `${IMG}/app-cafe.jpg`,
    label: "Hospitality",
    description: "See-through screens that warm a café without crowding it.",
    detail:
      "A transparent display adds ambience and messaging to a café, bar, or hotel without the bulk and glare of a conventional screen — it reads as part of the architecture.",
    alt: "Transparent LED display in a bright café interior",
  },
  {
    src: `${IMG}/app-lobby.jpg`,
    label: "Corporate",
    description: "A composed welcome across a lobby's glazing.",
    detail:
      "Lobby and atrium glazing becomes a calm, branded welcome surface — wayfinding, news, and identity carried on glass that still feels open and light.",
    alt: "Hotel and office lobby with a transparent LED display",
  },
  {
    src: `${IMG}/app-shadow.jpg`,
    label: "Entertainment",
    description: "Silhouette and depth, played out through clear glass.",
    detail:
      "Holographic and transparent surfaces give stages, attractions, and venues a sense of depth and silhouette that floats in mid-air — spectacle without a solid wall of screen.",
    alt: "Silhouette effect seen through a transparent LED display",
  },
  {
    src: `${IMG}/app-signage.jpg`,
    label: "Digital Signage",
    description: "Wayfinding and messaging that read at a glance.",
    detail:
      "Transparent signage carries schedules, directions, and messaging in transit hubs, malls, and campuses while keeping the space behind it visible and open.",
    alt: "Digital signage application on a transparent LED display",
  },
  {
    src: `${IMG}/app-product-display.jpg`,
    label: "Product Display",
    description: "Hero products framed in light, not hidden behind it.",
    detail:
      "A transparent screen wraps a display case or plinth so the product stays the hero — content frames the merchandise in motion and light instead of hiding it.",
    alt: "Product showcase lit by a transparent LED display",
  },
];
