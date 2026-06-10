import { CONTACT } from "@/lib/demo";

export const metadata = {
  title: "K1 Visual Solutions — Transparent LED Specs & Comparison | Variant B",
  description: `Information-dense, spec-driven B2B overview of ${CONTACT.brand}' transparent LED product lines — comparison tables, certifications, and FAQs.`,
};

/**
 * Variant B — "Milestrong Style" layout wrapper.
 * Root layout supplies <html>/<body>; this nested layout scopes the variant
 * and sets the structured, slightly lighter B2B canvas.
 */
export default function VariantBLayout({ children }) {
  return (
    <div className="min-h-screen bg-ink-800 text-white selection:bg-brand-purple/30">
      {children}
    </div>
  );
}
