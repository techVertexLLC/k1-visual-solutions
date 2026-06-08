"use client";

import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/products/ProductCard";
import { COLOR, FONT } from "./tokens";
import { getAllProducts } from "@/lib/products";

/**
 * Featured products preview for the home page — three representative products,
 * one per technology, linking through to their detail pages and the full
 * catalog. Reuses the shared ProductCard.
 */

const FEATURED_SLUGS = [
  "transparent-poster-screen",
  "smd-holographic-p391",
  "flexible-led-film",
];

const FEATURED = getAllProducts().filter((p) => FEATURED_SLUGS.includes(p.slug));

export default function FeaturedProducts() {
  return (
    <section
      id="products"
      className="scroll-mt-24 py-24 lg:py-32"
      style={{ background: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: COLOR.muted }}
            >
              <span style={{ color: COLOR.accent }}>01</span>
              <span aria-hidden className="h-px w-8" style={{ background: "#D4CFC8" }} />
              <span>Featured Products</span>
            </div>
            <h2
              className="mt-6 text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              A display for every surface
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
              A look across the range — from a freestanding transparent poster to
              fine-pitch holographic panels and self-adhesive film.
            </p>
          </div>

          <a
            href="/products"
            className="group inline-flex flex-none items-center gap-2 text-sm font-medium"
            style={{ color: COLOR.accent }}
          >
            View all products
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-3">
          {FEATURED.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
