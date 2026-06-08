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
  const description = product.shortDescription || product.description?.slice(0, 150);
  return {
    title: `${product.name} — Transparent LED Display | K1`,
    description,
    openGraph: {
      title: `${product.name} — K1 Visual Solutions`,
      description,
      url: `https://k1visual.com/products/${params.slug}`,
      type: "website",
      images: [{ url: product.cardImage, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — K1 Visual Solutions`,
      description,
      images: [product.cardImage],
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug, 3);

  // Product structured data — enables rich product snippets in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.description?.slice(0, 200),
    image: `https://k1visual.com${product.cardImage}`,
    brand: { "@type": "Brand", name: "K1 Visual Solutions" },
    manufacturer: { "@type": "Organization", name: "K1trends Global Inc." },
    category: "LED Display",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "K1trends Global Inc." },
    },
  };

  return (
    <main id="main-content" className="page-enter min-h-screen" style={{ background: "#FAF8F5" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} related={related} />
      <SiteFooter />
    </main>
  );
}
