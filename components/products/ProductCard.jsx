"use client";

/**
 * ProductCard
 * Shared product card — used on the catalog grid and the home featured preview.
 * Photograph (or illustrated stand-in) above; category chip, name, brief, key
 * spec, and a "View Details" link through to the product's detail page.
 *
 * Hover reveal: on mouse-enter, the pixel pitch value slides up from a resting
 * position and the "View Details" link shifts into full prominence. Uses Framer
 * Motion so the animation is declarative and respects prefers-reduced-motion.
 * The card itself lifts on hover via pure CSS (no JS needed for the shadow).
 */

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FilmPlaceholder from "@/components/ui/FilmPlaceholder";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import { CATEGORY_LABEL } from "@/lib/products";

export default function ProductCard({ product }) {
  const href = `/k1/products/${product.slug}`;
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  // When reduced motion is preferred, treat everything as "always hovered"
  // (all spec text at full visibility, no movement).
  const active = shouldReduce ? true : hovered;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_36px_-14px_rgba(26,26,26,0.22)]"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={href} className="relative block aspect-[4/3] overflow-hidden">
        {product.cardImage ? (
          <Image
            src={product.cardImage}
            alt={`${product.name} — ${CATEGORY_LABEL[product.category]} display`}
            fill
            loading="lazy"
            quality={78}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <FilmPlaceholder />
        )}
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm"
          style={{ background: `${COLOR.bg}e6`, color: COLOR.accent }}
        >
          {CATEGORY_LABEL[product.category]}
        </span>
      </a>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3
          className="text-xl leading-snug"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          <a href={href} className="transition-opacity hover:opacity-70">
            {product.name}
          </a>
        </h3>
        <p
          className="mt-3 flex-1 text-sm leading-relaxed"
          style={{ color: COLOR.body }}
        >
          {product.shortDescription}
        </p>

        {/* Spec + CTA row — animated on hover */}
        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{ borderColor: COLOR.gray }}
        >
          {/* Pixel pitch: label fades up, value slides in from below */}
          <div style={{ overflow: "hidden" }}>
            <motion.span
              className="block text-[10px] uppercase tracking-[0.16em]"
              style={{ color: COLOR.muted }}
              animate={active ? { opacity: 1 } : { opacity: 0.55 }}
              transition={{ duration: shouldReduce ? 0 : 0.25 }}
            >
              Pixel pitch
            </motion.span>
            <motion.span
              className="block text-sm font-medium"
              style={{ color: COLOR.ink, willChange: "transform, opacity" }}
              animate={
                active
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.6, y: shouldReduce ? 0 : 6 }
              }
              transition={
                shouldReduce ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
              }
            >
              {product.pixelPitch}
            </motion.span>
          </div>

          {/* View Details: slides left → right into full opacity */}
          <motion.a
            href={href}
            className="group/btn inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: COLOR.accent, willChange: "transform, opacity" }}
            animate={
              active
                ? { opacity: 1, x: 0 }
                : { opacity: 0.65, x: shouldReduce ? 0 : -4 }
            }
            transition={
              shouldReduce ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
            }
          >
            View Details
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </motion.a>
        </div>
      </div>
    </article>
  );
}
