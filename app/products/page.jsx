import PageBanner from "@/components/ui/PageBanner";
import ProductsShowcase from "@/components/products/ProductsShowcase";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Products — Transparent, Holographic & Flexible LED",
  ogTitle: "K1 Products — Transparent, Holographic & Flexible LED",
  description:
    "Three product lines — Crystal Film LED Screen, SMD Holographic Invisible Screen, and the plug-and-play Soft LED Display. Compare key specs side by side and find the right transparent LED for your project.",
  path: "/products",
  image: "/assets/images/products/smd-p625-new-01.jpg",
  imageAlt: "K1 SMD holographic LED panel detail",
});

/**
 * Product overview page (redesign spec §8): three full-width product cards —
 * one per line, each leading to its detail page — followed by the
 * "Which one do I need?" comparison. The old series filter wall is gone.
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
        description="A complete range of see-through display systems — engineered to disappear into architecture and reappear as motion, colour, and presence. Three product lines, from architectural film to plug-and-play signs."
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

      <ProductsShowcase />

      <SiteFooter />
    </main>
  );
}
