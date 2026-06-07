"use client";

/**
 * CatalogLayout — two-column layout: CategorySidebar (left) + product grid (right).
 *
 * Layout strategy:
 * - Desktop: CSS grid [280px 1fr] with gap-8; sidebar sticks via `sticky top-24`.
 * - Mobile: sidebar collapses to a top <select> (rendered inside CategorySidebar).
 * - URL ?category=xxx is read on mount and on navigation; updating the filter
 *   pushes a new entry to the URL via history.pushState (no full reload).
 * - AnimatePresence + motion.div on each card gives a subtle fade-in when the
 *   filter changes — keeps the interaction feeling snappy without heavy animation.
 *
 * Wrapped in Suspense at the page level (required for useSearchParams in App Router).
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CategorySidebar from "./CategorySidebar";
import CatalogProductCard from "./CatalogProductCard";
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES } from "@/lib/catalog-products";

const COLOR = {
  bg: "#FAF8F5",
  gray: "#E8E4DF",
  muted: "#6B6560",
  accent: "#4F46B5",
  text: "#1A1A1A",
};

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function CatalogLayout() {
  const params = useSearchParams();
  const [active, setActive] = useState("all");

  // Honour ?category= deep link (mirrors the existing /products ?series= pattern)
  useEffect(() => {
    const cat = params.get("category");
    const validKeys = CATALOG_CATEGORIES.map((c) => c.key);
    if (cat && validKeys.includes(cat)) {
      setActive(cat);
    }
  }, [params]);

  // Push filter change into URL without full-page reload
  function handleSelect(key) {
    setActive(key);
    const url = new URL(window.location.href);
    if (key === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", key);
    }
    window.history.pushState({}, "", url.toString());
  }

  // Filter products by active category
  const filtered =
    active === "all"
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter((p) => p.category === active);

  return (
    <section
      className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-10 lg:py-16"
      style={{ background: COLOR.bg }}
    >
      {/* Two-column layout: sidebar left, grid right */}
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Left: CategorySidebar (also renders mobile dropdown) */}
        <CategorySidebar active={active} onSelect={handleSelect} />

        {/* Right: product grid */}
        <div>
          {/* Result count */}
          <div className="mb-6 flex items-center justify-between">
            <p
              className="text-sm"
              style={{ color: COLOR.muted }}
              aria-live="polite"
              aria-atomic="true"
            >
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {active !== "all" && (
                <> in{" "}
                  <span className="font-semibold" style={{ color: COLOR.accent }}>
                    {CATALOG_CATEGORIES.find((c) => c.key === active)?.label || active}
                  </span>
                </>
              )}
            </p>

            {/* Clear filter */}
            {active !== "all" && (
              <button
                onClick={() => handleSelect("all")}
                className="text-xs underline-offset-2 hover:underline"
                style={{ color: COLOR.muted }}
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center text-sm"
                style={{ color: COLOR.muted }}
              >
                No products found in this category.
              </motion.p>
            ) : (
              <motion.div
                key={active}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    variants={cardVariants}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.05,
                    }}
                  >
                    <CatalogProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
