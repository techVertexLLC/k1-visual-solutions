import { CONTACT } from "@/lib/demo";

export const metadata = {
  title: "K1 Visual Solutions — Cinematic Transparent LED | Variant A",
  description: `A cinematic, product-photography-centric showcase of ${CONTACT.brand}' transparent and flexible LED displays. Minimal, dark, and immersive.`,
  // Internal design variant — kept out of the index (also blocked in robots.txt).
  robots: { index: false, follow: false },
};

/**
 * Variant A — "Reefilm Style" layout wrapper.
 * Root layout already provides <html>/<body>; this nested layout simply scopes
 * the variant and gives it a deep cinematic backdrop.
 */
export default function VariantALayout({ children }) {
  return (
    <div className="min-h-screen bg-ink-900 text-white selection:bg-electric-cyan/30">
      {children}
    </div>
  );
}
