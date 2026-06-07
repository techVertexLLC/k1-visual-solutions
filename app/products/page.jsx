import { Suspense } from "react";
import PageBanner from "@/components/ui/PageBanner";
import ProductCatalog from "@/components/products/ProductCatalog";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Products — Transparent, Holographic & Flexible LED",
  description:
    "Browse the K1 range of transparent LED poster screens, SMD holographic panels, and self-adhesive flexible LED film. Filter by series and view full specifications.",
};

/**
 * Product catalog page. Photographic banner, then the filterable product grid.
 * The catalog is wrapped in Suspense because it reads ?series= via
 * useSearchParams for deep-linked filters.
 */
export default function ProductsPage() {
  return (
    <main className="min-h-screen" style={{ background: "#FAF8F5" }}>
      <PageBanner
        eyebrow="The Range"
        title="Transparent, holographic & flexible LED"
        description="A complete range of see-through display systems — engineered to disappear into architecture and reappear as motion, colour, and presence. Filter by series to find the right surface."
        image="/k1/assets/images/products/smd-p625-01.jpg"
        imageAlt="K1 SMD holographic LED panel detail"
        breadcrumb={
          <>
            <a href="/k1/" className="hover:opacity-70">Home</a>
            <span aria-hidden>/</span>
            <span>Products</span>
          </>
        }
      />

      <Suspense fallback={<div className="py-24" />}>
        <ProductCatalog />
      </Suspense>

      <SiteFooter />
    </main>
  );
}
