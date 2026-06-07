import { notFound } from "next/navigation";
import ProductDetail from "@/components/products/ProductDetail";
import SiteFooter from "@/components/SiteFooter";
import { getAllProducts, getProduct, getRelatedProducts } from "@/lib/products";

/** Pre-build every product page at build time. */
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — Transparent LED Display | K1`,
    description: product.shortDescription || product.description?.slice(0, 150),
    openGraph: {
      title: `${product.name} — K1 Visual Solutions`,
      description: product.shortDescription || product.description?.slice(0, 150),
      url: `https://k1visualsolutions.com/k1/products/${params.slug}`,
      type: "website",
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug, 3);

  return (
    <main className="min-h-screen" style={{ background: "#FAF8F5" }}>
      <ProductDetail product={product} related={related} />
      <SiteFooter />
    </main>
  );
}
