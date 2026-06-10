"use client";

/**
 * ProductCatalog — Masonry-style product grid with sticky filter bar
 *
 * Layout strategy (spec §2, §6.2, §7):
 * - Uses a CSS class "k1-masonry-grid" with injected <style> for responsive
 *   grid-template-columns (Tailwind cannot express "1.3fr 1fr" natively).
 * - Featured card (first item when 2+ results) gets class "k1-featured-slot"
 *   which applies col-span-2 on md+ and col-span-2 + row-span-2 on lg+.
 * - Framer Motion wraps individual cards for filter/sort transitions.
 * - Sticky filter bar at top; sort dropdown with numeric pitch parsing.
 * - Result count with aria-live for screen reader announcements.
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { COLOR } from "@/components/home/tokens";
import { getAllProducts, CATEGORIES } from "@/lib/products";

const PRODUCTS = getAllProducts();

/**
 * Parse numeric pitch from strings like "P3.91", "P6.25", "P2.5 / P3.91"
 * Takes the first numeric value found. Spec §5.2 AC#6: numeric sort, not string.
 */
function parsePitch(pitchStr) {
  const match = String(pitchStr).match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// Injected CSS for responsive masonry grid + featured card spans
// Avoids Tailwind arbitrary-value limitations for fractional grid columns
const GRID_STYLES = `
  .k1-masonry-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media (min-width: 768px) {
    .k1-masonry-grid {
      grid-template-columns: 1.3fr 1fr;
      gap: 20px;
    }
    .k1-masonry-grid .k1-featured-slot {
      grid-column: span 2;
    }
  }
  @media (min-width: 1024px) {
    .k1-masonry-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .k1-masonry-grid .k1-featured-slot {
      grid-column: span 2;
      grid-row: span 2;
    }
  }
  /* Hide filter pill scrollbar on mobile */
  .k1-filter-pills::-webkit-scrollbar { display: none; }
  .k1-filter-pills { scrollbar-width: none; }
`;

export default function ProductCatalog() {
  const params = useSearchParams();
  const [active, setActive] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  // Track hovered pill for styling (avoids Tailwind peer complexity)
  const [hoveredPill, setHoveredPill] = useState(null);

  // Honour ?series= deep link (spec §5 AC#5)
  useEffect(() => {
    const series = params.get("series");
    if (series && CATEGORIES.some((c) => c.key === series)) {
      setActive(series);
    }
  }, [params]);

  // Filter by category
  const filtered =
    active === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active);

  // Sort by pixel pitch (spec §5.2 AC#6 — numeric sort)
  const sorted = (() => {
    if (sortOrder === "pitch-asc") {
      return [...filtered].sort(
        (a, b) => parsePitch(a.pixelPitch) - parsePitch(b.pixelPitch)
      );
    }
    if (sortOrder === "pitch-desc") {
      return [...filtered].sort(
        (a, b) => parsePitch(b.pixelPitch) - parsePitch(a.pixelPitch)
      );
    }
    return filtered; // "default" = editorial array order
  })();

  // Featured = first item when there are 2+ products (spec §3)
  const hasFeatured = sorted.length >= 2;

  const productCount = sorted.length;
  const countLabel = `Showing ${productCount} ${productCount === 1 ? "product" : "products"}`;

  return (
    <section aria-label="Product range" style={{ background: COLOR.bg }}>
      {/* Inject responsive grid CSS */}
      <style dangerouslySetInnerHTML={{ __html: GRID_STYLES }} />

      {/* ── Sticky Filter Bar (spec §5.2) ── */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{
          // Slightly translucent warm white to let blur show through
          background: `${COLOR.bg}f0`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: COLOR.gray,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-10">
          {/*
            Desktop: single row flex-row (filter pills left, sort right)
            Mobile: stacked flex-col (pills first, then sort below) — spec §5.3
          */}
          <div className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:gap-0">

            {/* Filter pills — horizontally scrollable on mobile (spec §5.2) */}
            <div
              className="k1-filter-pills flex gap-2 overflow-x-auto"
              role="tablist"
              aria-label="Filter products by series"
            >
              {CATEGORIES.map((cat) => {
                const isActive = active === cat.key;
                const isHovered = hoveredPill === cat.key;
                return (
                  <button
                    key={cat.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(cat.key)}
                    onMouseEnter={() => setHoveredPill(cat.key)}
                    onMouseLeave={() => setHoveredPill(null)}
                    className="flex-none whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-95"
                    style={{
                      borderColor:
                        isActive || isHovered ? COLOR.accent : COLOR.gray,
                      background: isActive ? COLOR.accent : "transparent",
                      color: isActive
                        ? "#fff"
                        : isHovered
                        ? COLOR.accent
                        : COLOR.body,
                    }}
                  >
                    {cat.short}
                  </button>
                );
              })}
            </div>

            {/* Sort dropdown (spec §5.2 AC#6) */}
            <div className="flex-none">
              <select
                aria-label="Sort products"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="cursor-pointer rounded-lg border border-[#E8E4DF] bg-white px-3 py-1.5 text-sm transition-[border-color,box-shadow] duration-200 focus:border-[#4F46B5] focus:ring-[3px] focus:ring-[#4F46B5]/10"
                style={{ color: COLOR.body }}
              >
                <option value="default">Sort by</option>
                <option value="pitch-asc">Pixel pitch: fine → coarse</option>
                <option value="pitch-desc">Pixel pitch: coarse → fine</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid section ── */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-5 md:px-6 lg:px-10 lg:pb-24">

        {/* Result count with aria-live (spec §5.4 AC#8) */}
        <p
          className="mb-4 text-xs"
          style={{ color: COLOR.muted }}
          aria-live="polite"
          aria-atomic="true"
        >
          {countLabel}
        </p>

        {/*
          Masonry grid — CSS Grid with explicit spans (spec §7):
          - k1-masonry-grid: responsive column definition (injected CSS above)
          - k1-featured-slot: col/row span on the first card (md+ and lg+)
          - Framer Motion AnimatePresence for filter/sort transitions (spec §8)
        */}
        <div className="k1-masonry-grid">
          <AnimatePresence mode="popLayout">
            {sorted.map((product, index) => {
              const isFeatured = hasFeatured && index === 0;
              return (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={isFeatured ? "k1-featured-slot" : ""}
                >
                  <ProductCard
                    product={product}
                    variant={isFeatured ? "featured" : "regular"}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {sorted.length === 0 && (
          <p className="mt-12 text-center text-sm" style={{ color: COLOR.muted }}>
            No products in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
