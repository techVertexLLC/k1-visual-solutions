/**
 * Design tokens for the K1 Visual Solutions home page (G2).
 *
 * Locked to the G1 moodboard direction: warm white canvas, warm-gray structure,
 * and the brand blue-purple held back to ≤5% of any surface. No gradients-as-
 * decoration, no glow, no sci-fi. Clean, refined, effortless — Aesop / Apple /
 * Dieter Rams.
 */

export const COLOR = {
  bg: "#FAF8F5", // warm white — primary surface (~80%)
  gray: "#E8E4DF", // warm gray — cards, dividers, secondary surfaces (~15%)
  accent: "#4F46B5", // brand blue-purple — used sparingly (≤5%)
  ink: "#1A1A1A", // primary text (headings)
  body: "#4A4A4A", // secondary text (body)
  muted: "#6B655C", // quiet labels / captions
};

// Font stacks mapped to the CSS variables loaded in app/layout.jsx.
export const FONT = {
  serif: "var(--font-dmserif), Georgia, serif",
  sans: "var(--font-inter), system-ui, sans-serif",
};

// A 20×12 warm-gray SVG, base64-encoded, used as the blur placeholder for the
// large product photographs while the optimized WebP/AVIF streams in.
export const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMiI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEyIiBmaWxsPSIjRThFNERGIi8+PC9zdmc+";
