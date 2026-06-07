"use client";

/**
 * CatalogProductCard — product card for the MileStrong-style catalog page.
 *
 * Design decisions:
 * - Square image aspect ratio (1:1) for a clean, uniform grid.
 * - White card surface to contrast against the warm #FAF8F5 page background.
 * - Hover: slight upward translate + shadow depth — subtle premium feel.
 * - Series badge (filled accent pill) anchors the category identity.
 * - Three spec lines (pixel pitch / brightness / transparency) — the key
 *   decision metrics for a B2B buyer scanning at speed.
 * - View Details is a full-width outlined button that lifts on hover.
 */

import Image from "next/image";

const COLOR = {
  bg: "#FAF8F5",
  gray: "#E8E4DF",
  accent: "#4F46B5",
  text: "#1A1A1A",
  muted: "#6B6560",
  white: "#FFFFFF",
};

const CATEGORY_LABEL = {
  "series-t": "Series T",
  "series-f": "Series F",
  holographic: "Holographic",
};

export default function CatalogProductCard({ product }) {
  const { slug, name, category, pixelPitch, cardImage, shortDescription, specs } =
    product;

  const badge = CATEGORY_LABEL[category] || category;
  const href = `/k1/products/${slug}`;

  return (
    <a
      href={href}
      className="group block rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46B5] focus-visible:ring-offset-2 overflow-hidden"
      style={{ borderColor: COLOR.gray }}
      aria-label={`View details for ${name}`}
    >
      {/* Product image — 1:1 square */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <Image
          src={cardImage}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Series badge — top-left overlay */}
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white"
          style={{ background: COLOR.accent }}
        >
          {badge}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Product name */}
        <h3
          className="mb-2 text-[17px] leading-snug transition-colors duration-150 group-hover:text-[#4F46B5]"
          style={{
            fontFamily: "var(--font-dmserif, 'DM Serif Display', serif)",
            color: COLOR.text,
          }}
        >
          {name}
        </h3>

        {/* Specs summary — three key lines for B2B scanning */}
        <ul className="mb-4 space-y-1.5">
          <SpecRow label="Pixel Pitch" value={pixelPitch} />
          {specs?.Brightness && (
            <SpecRow label="Brightness" value={specs.Brightness} />
          )}
          {specs?.Transparency && (
            <SpecRow label="Transparency" value={specs.Transparency} />
          )}
        </ul>

        {/* View Details CTA — full-width outline button */}
        <div
          className="mt-auto flex items-center justify-center rounded-lg border py-2.5 text-sm font-semibold transition-all duration-150 group-hover:bg-[#4F46B5] group-hover:border-[#4F46B5] group-hover:text-white"
          style={{
            borderColor: COLOR.accent,
            color: COLOR.accent,
          }}
        >
          View Details
          <svg
            className="ml-2 h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function SpecRow({ label, value }) {
  return (
    <li className="flex items-baseline justify-between gap-2 text-xs">
      <span style={{ color: "#6B6560" }}>{label}</span>
      <span className="font-medium" style={{ color: "#1A1A1A" }}>
        {value}
      </span>
    </li>
  );
}
