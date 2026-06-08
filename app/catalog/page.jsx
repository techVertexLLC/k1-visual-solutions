import { Suspense } from "react";
import PageBanner from "@/components/ui/PageBanner";
import CatalogLayout from "@/components/catalog/CatalogLayout";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/seo";

/**
 * /catalog — MileStrong-style product catalog page.
 *
 * Layout: top PageBanner → two-column body (sidebar + grid) → footer.
 * CatalogLayout is wrapped in Suspense because it calls useSearchParams()
 * (required by Next.js 14 App Router for client components reading URL params).
 */

export const metadata = pageMetadata({
  title: "Product Catalog — Transparent, Holographic & Flexible LED",
  ogTitle: "K1 Product Catalog — Full LED Display Range",
  description:
    "Browse the complete K1 range: SMD Holographic panels (P3.91 / P6.25 / P10.4), Transparent Poster Screens, Flexible LED Film and Crystal Film Displays. Filter by series to find the right solution.",
  path: "/catalog",
  image: "/assets/images/products/smd-p625-new-01.jpg",
  imageAlt: "K1 SMD holographic LED panel detail",
});

export default function CatalogPage() {
  return (
    <main
      id="main-content"
      className="page-enter min-h-screen"
      style={{ background: "#FAF8F5" }}
    >
      {/* ── Top banner with photographic hero ──────────────────────────── */}
      <PageBanner
        eyebrow="Browse Range"
        title="Product Catalog"
        description="Explore the full K1 range of transparent, holographic and flexible LED display systems. Use the filters to find the right solution for your space."
        image="/assets/images/products/smd-p625-new-01.jpg"
        imageAlt="K1 SMD holographic LED panel detail"
        breadcrumb={
          <>
            <a href="/" className="hover:opacity-70">
              Home
            </a>
            <span aria-hidden>/</span>
            <span>Catalog</span>
          </>
        }
      />

      {/* ── Two-column catalog body (sidebar + product grid) ────────────── */}
      {/* Suspense required: CatalogLayout uses useSearchParams() client-side */}
      <Suspense fallback={<div className="py-24" />}>
        <CatalogLayout />
      </Suspense>

      <SiteFooter />
    </main>
  );
}
