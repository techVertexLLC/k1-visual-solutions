import { notFound } from "next/navigation";
import ProductDetail from "@/components/products/ProductDetail";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

/** Pre-build every product page at build time. */
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found", robots: { index: false } };

  const description =
    product.shortDescription || product.description?.slice(0, 155);
  const heroImage = product.gallery?.[0]?.src || product.cardImage;

  // Reuse the shared SEO helper so the detail page gets the same canonical URL,
  // siteName, locale, and complete openGraph/twitter blocks as every other page.
  return pageMetadata({
    title: `${product.name} — Transparent LED Display`,
    ogTitle: `${product.name} — K1 Visual Solutions`,
    description,
    path: `/products/${product.slug}`,
    image: heroImage,
    imageAlt: product.gallery?.[0]?.alt || product.name,
  });
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug, 3);

  // Product schema (rich snippets: image gallery, spec table, seller) plus a
  // BreadcrumbList mirroring the visible Home / Products / <name> trail. Both
  // build from the structured-data helpers so company identity follows demo mode.
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
      <ProductDetail product={product} related={related} />
      <SiteFooter />
    </main>
  );
}
