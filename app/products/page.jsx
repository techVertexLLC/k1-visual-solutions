import { Suspense } from "react";
import PageBanner from "@/components/ui/PageBanner";
import ProductCatalog from "@/components/products/ProductCatalog";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Products — Transparent, Holographic & Flexible LED",
  ogTitle: "K1 Products — Transparent, Holographic & Flexible LED",
  description:
    "Browse the K1 range of transparent LED poster screens, SMD holographic panels, and self-adhesive flexible LED film. Filter by series and view full specifications.",
  path: "/products",
  image: "/assets/images/products/smd-p625-new-01.jpg",
  imageAlt: "K1 SMD holographic LED panel detail",
});

/**
 * Product catalog page. Photographic banner, then the filterable product grid.
 * The catalog is wrapped in Suspense because it reads ?series= via
 * useSearchParams for deep-linked filters.
 */
export default function ProductsPage() {
  return (
    <main id="main-content" className="page-enter min-h-screen" style={{ background: "#FAF8F5" }}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products" },
        ])}
      />
      <PageBanner
        eyebrow="The Range"
        title="Transparent, holographic & flexible LED displays"
        description="A complete range of see-through display systems — engineered to disappear into architecture and reappear as motion, colour, and presence. Filter by series to find the right surface."
        image="/assets/images/products/smd-p625-new-01.jpg"
        imageAlt="K1 SMD holographic LED panel detail"
        breadcrumb={
          <>
            <a href="/" className="hover:opacity-70">Home</a>
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
