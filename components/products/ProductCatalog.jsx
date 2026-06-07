"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { COLOR } from "@/components/home/tokens";
import { getAllProducts, CATEGORIES } from "@/lib/products";

/**
 * Product catalog grid with filter tabs. The active filter can be deep-linked
 * via ?series=… (used by the navbar Products dropdown). Three columns on
 * desktop, two on tablet, one on mobile.
 */

const PRODUCTS = getAllProducts();

export default function ProductCatalog() {
  const params = useSearchParams();
  const [active, setActive] = useState("all");

  // Honour a ?series= deep link from the nav dropdown / footer.
  useEffect(() => {
    const series = params.get("series");
    if (series && CATEGORIES.some((c) => c.key === series)) {
      setActive(series);
    }
  }, [params]);

  const filtered =
    active === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active);

  return (
    <section className="py-16 lg:py-24" style={{ background: COLOR.bg }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300"
                style={{
                  borderColor: isActive ? COLOR.accent : COLOR.gray,
                  background: isActive ? COLOR.accent : "transparent",
                  color: isActive ? "#fff" : COLOR.body,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm" style={{ color: COLOR.muted }}>
            No products in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
