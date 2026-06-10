"use client";

/**
 * ProductCard — Masonry-ready product card with hover overlay
 *
 * Design decisions:
 * - variant="featured" → 16:9 image + larger typography (spec §4.4)
 * - variant="regular"  → 4:3 image + text-xl name
 * - Hover overlay: translucent glass panel slides up from bottom (spec §4.2)
 *   Only shown on md+ breakpoints; mobile taps navigate directly (spec §4.3)
 * - prefers-reduced-motion: disables translateY/scale, keeps opacity (spec §9)
 * - :focus-within on card triggers overlay for keyboard accessibility (spec §9)
 */

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FilmPlaceholder from "@/components/ui/FilmPlaceholder";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import { CATEGORY_LABEL } from "@/lib/products";

// Animation timing tokens (spec §6.3)
const EASE_SPRING = [0.22, 1, 0.36, 1];
const OVERLAY_ENTER = { duration: 0.35, ease: EASE_SPRING };
const OVERLAY_EXIT  = { duration: 0.25, ease: "easeIn" };
const CARD_LIFT     = { duration: 0.3,  ease: EASE_SPRING };

export default function ProductCard({ product, variant = "regular" }) {
  const href = `/products/${product.slug}`;
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();
  const isFeatured = variant === "featured";

  // Overlay visible when hovered (or always when reduced motion — just opacity)
  const overlayVisible = hovered;

  // Spec overlay values pulled from product.specs (spec §10)
  const overlaySpecs = [
    { label: "Pixel pitch",  value: product.specs?.["Pixel pitch"]  ?? product.pixelPitch },
    { label: "Brightness",   value: product.specs?.["Brightness"]   ?? "—" },
    { label: "Transparency", value: product.specs?.["Transparency"] ?? "—" },
  ];

  return (
    <article
      className={[
        "group flex h-full flex-col overflow-hidden rounded-2xl shadow-card",
        // Card lift on hover — disabled when reduced motion prefers no movement
        shouldReduce
          ? "transition-shadow duration-300"
          : "transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-1",
        "hover:shadow-card-hover",
      ].join(" ")}
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // :focus-within triggers overlay for keyboard users (spec §9, AC#10)
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        // Only close if focus left the card entirely
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      {/* ── Image area with overlay ── */}
      <a
        href={href}
        className={[
          "relative block overflow-hidden",
          isFeatured ? "aspect-video" : "aspect-[4/3]", // spec §6.1
        ].join(" ")}
        tabIndex={-1} // card article is the focus target; link inside for click
        aria-hidden="true"
      >
        {product.cardImage ? (
          <Image
            src={product.cardImage}
            alt={`${product.name} — ${CATEGORY_LABEL[product.category]} display`}
            fill
            loading="lazy"
            quality={78}
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            placeholder="blur"
            blurDataURL={BLUR}
            className={[
              "object-cover",
              // Image zoom runs a beat slower than the card lift — the
              // two speeds layered together is what reads as depth.
              shouldReduce
                ? "transition-opacity duration-300"
                : "transition-transform duration-500 ease-premium group-hover:scale-105",
            ].join(" ")}
          />
        ) : (
          <FilmPlaceholder />
        )}

        {/* Category badge — top-left pill */}
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm"
          style={{ background: `${COLOR.bg}e6`, color: COLOR.accent }}
        >
          {CATEGORY_LABEL[product.category]}
        </span>

        {/* ── Hover Overlay — desktop only (spec §4.2, §4.3) ── */}
        {/* Hidden on mobile via "hidden md:flex"; slides up from bottom */}
        <div
          className="absolute inset-x-0 bottom-0 hidden md:flex flex-col justify-end"
          style={{
            // Overlay covers ~55% of image height (spec §4.2)
            height: "55%",
            background: "rgba(26,26,26,0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            // Slide animation via CSS transform + transition (avoids hydration mismatch)
            transform: overlayVisible
              ? "translateY(0)"
              : shouldReduce
              ? "translateY(0)"  // no motion: just opacity
              : "translateY(100%)",
            opacity: overlayVisible ? 1 : shouldReduce ? 0 : 1,
            transition: overlayVisible
              ? `transform ${OVERLAY_ENTER.duration}s cubic-bezier(${EASE_SPRING.join(",")}), opacity ${OVERLAY_ENTER.duration}s ease`
              : `transform ${OVERLAY_EXIT.duration}s ${OVERLAY_EXIT.ease}, opacity ${OVERLAY_EXIT.duration}s ease`,
            // Reduced motion: only opacity transition
            ...(shouldReduce && {
              transform: "translateY(0)",
              opacity: overlayVisible ? 1 : 0,
              transition: `opacity 0.3s ease`,
            }),
          }}
          aria-hidden={!overlayVisible}
        >
          <div className="flex flex-col gap-3 p-5">
            {/* Three spec rows (spec §4.2) */}
            {overlaySpecs.map(({ label, value }) => (
              <div key={label} className="flex items-baseline justify-between">
                <span
                  className="text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {label}
                </span>
                <span className="text-sm font-medium text-white">{value}</span>
              </div>
            ))}

            {/* CTA button (spec §4.2) */}
            <a
              href={href}
              className="mt-1 inline-flex items-center justify-center rounded-full border border-white px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[#1A1A1A]"
            >
              View Full Specs →
            </a>
          </div>
        </div>
      </a>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3
          className={
            isFeatured
              ? "text-2xl lg:text-3xl leading-snug"
              : "text-xl leading-snug"
          }
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          <a href={href} className="transition-opacity hover:opacity-70">
            {product.name}
          </a>
        </h3>

        <p
          className={[
            "mt-3 flex-1 text-sm leading-relaxed",
            isFeatured ? "line-clamp-2" : "line-clamp-1",
          ].join(" ")}
          style={{ color: COLOR.body }}
        >
          {product.shortDescription}
        </p>

        {/* Spec + CTA footer row */}
        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{ borderColor: COLOR.gray }}
        >
          {/* Pixel pitch */}
          <div>
            <span
              className="block text-[10px] uppercase tracking-[0.16em]"
              style={{ color: COLOR.muted }}
            >
              Pixel pitch
            </span>
            <span
              className="block text-sm font-medium"
              style={{ color: COLOR.ink }}
            >
              {product.pixelPitch}
            </span>
          </div>

          {/* View Details link */}
          <a
            href={href}
            className="group/btn inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: COLOR.accent }}
          >
            View Details
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
