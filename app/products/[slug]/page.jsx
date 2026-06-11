import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/products/ProductDetailPage";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

/** Pre-build every product page at build time — exactly the three lines:
    crystal-film, holographic, soft-led-display. */
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found", robots: { index: false } };

  // product.seo.title already carries the "| K1 Visual Solutions" brand suffix,
  // so it bypasses the layout's "%s | …" template via `absolute`. The shared
  // helper still supplies canonical URL + complete openGraph/twitter blocks.
  return pageMetadata({
    title: { absolute: product.seo.title },
    ogTitle: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
    image: product.hero?.poster || product.cardImage,
    imageAlt: `${product.name} — K1 Visual Solutions`,
  });
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug, 2);

  // Product schema (gallery, spec table, seller) plus a BreadcrumbList
  // mirroring the visible Home / Products / <name> trail — both built from the
  // structured-data helpers so company identity follows demo mode.
  const structuredData = [
    productJsonLd(product),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.name },
    ]),
  ];

  return (
    <main id="main-content" className="page-enter min-h-screen" style={{ background: "#FAF8F5" }}>
      <JsonLd data={structuredData} />
      <ProductDetailPage product={product} related={related} />
      <SiteFooter />
    </main>
  );
}
