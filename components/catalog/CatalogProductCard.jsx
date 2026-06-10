"use client";

/**
 * CatalogProductCard — catalog 頁產品卡片，相容 K1 自有產品與 MileStrong 代理產品。
 *
 * 設計決策：
 * - K1 產品（brand="k1"）：<a> 卡片可點擊，跳轉到 /products/[slug]，badge 藍紫 #4F46B5。
 * - MileStrong 產品（brand="milestrong"）：<div> 卡片不跳轉，badge 深藍灰 #374151，CTA 顯示「Enquire Now」。
 * - 圖片 1:1 square crop，hover 輕微放大。
 * - 規格摘要：顯示最相關的 3 條（優先：Pixel Pitch → Brightness / Contrast → Transparency / Protection）。
 */

import Image from "next/image";

const COLOR = {
  bg:      "#FAF8F5",
  gray:    "#E8E4DF",
  accent:  "#4F46B5",
  text:    "#1A1A1A",
  muted:   "#6B6560",
  white:   "#FFFFFF",
};

// 分類對應的 badge 文字
const CATEGORY_LABEL = {
  "series-t":        "Series T",
  "series-f":        "Series F",
  holographic:       "Holographic",
  "control-room":    "Control Room",
  "transparent-led": "Transparent LED",
  "led-poster":      "LED Poster",
  immersive:         "Immersive",
  outdoor:           "Outdoor",
  other:             "MileStrong",
};

/**
 * 從 specs 物件挑出最多 3 條最有意義的規格顯示在卡片上。
 * 優先順序：Pixel Pitch > Brightness > Contrast > Transparency > Protection > Cabinet Size > 其他
 */
function pickSpecRows(specs = {}) {
  const priority = [
    "Pixel Pitch", "Brightness", "Contrast", "Transparency",
    "Protection", "Cabinet Size", "Refresh Rate", "Connectivity",
    "Display Size", "Control", "Technology", "Type",
  ];
  const rows = [];
  for (const key of priority) {
    if (specs[key] !== undefined) {
      rows.push({ label: key, value: specs[key] });
    }
    if (rows.length >= 3) break;
  }
  // 如果優先清單沒補滿 3 條，補 entries 的前幾條
  if (rows.length < 3) {
    for (const [k, v] of Object.entries(specs)) {
      if (!rows.find((r) => r.label === k)) {
        rows.push({ label: k, value: v });
      }
      if (rows.length >= 3) break;
    }
  }
  return rows;
}

export default function CatalogProductCard({ product }) {
  const { slug, name, category, brand, cardImage, shortDescription, specs } = product;

  // href 決策：undefined → 走 K1 詳情頁；null → 無連結（MileStrong）
  const href =
    product.href !== undefined && product.href !== null
      ? product.href
      : product.href === null
      ? null
      : `/products/${slug}`;

  // K1 有詳情頁時，href 為 undefined → 自動組 /products/slug
  const resolvedHref = product.href === undefined
    ? `/products/${slug}`
    : product.href;

  const isMileStrong = brand === "milestrong";
  const badge = CATEGORY_LABEL[category] || category;
  const badgeColor = isMileStrong ? "#374151" : COLOR.accent;

  const specRows = pickSpecRows(specs);

  // 共用的卡片內容
  const cardInner = (
    <>
      {/* Product image — 1:1 square */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <Image
          src={cardImage}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge — top-left overlay */}
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white"
          style={{ background: badgeColor }}
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

        {/* Specs summary */}
        <ul className="mb-4 space-y-1.5">
          {specRows.map((row) => (
            <SpecRow key={row.label} label={row.label} value={row.value} />
          ))}
        </ul>

        {/* CTA */}
        {isMileStrong ? (
          /* MileStrong — Enquire Now（不帶連結，樣式按鈕） */
          <div
            className="mt-auto flex items-center justify-center rounded-lg border py-2.5 text-sm font-semibold transition-all duration-150 group-hover:bg-[#374151] group-hover:border-[#374151] group-hover:text-white"
            style={{ borderColor: "#374151", color: "#374151" }}
          >
            Enquire Now
          </div>
        ) : (
          /* K1 — View Details */
          <div
            className="mt-auto flex items-center justify-center rounded-lg border py-2.5 text-sm font-semibold transition-all duration-150 group-hover:bg-[#4F46B5] group-hover:border-[#4F46B5] group-hover:text-white"
            style={{ borderColor: COLOR.accent, color: COLOR.accent }}
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
        )}
      </div>
    </>
  );

  // K1 產品 → <a> 卡片可跳轉
  if (!isMileStrong && resolvedHref) {
    return (
      <a
        href={resolvedHref}
        className="group block rounded-xl border bg-white shadow-card transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46B5] focus-visible:ring-offset-2 overflow-hidden"
        style={{ borderColor: COLOR.gray }}
        aria-label={`View details for ${name}`}
      >
        {cardInner}
      </a>
    );
  }

  // MileStrong 產品 → <div> 卡片（不可跳轉，hover 效果保留視覺回饋）
  return (
    <div
      className="group block rounded-xl border bg-white shadow-card transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover overflow-hidden"
      style={{ borderColor: COLOR.gray }}
      aria-label={name}
    >
      {cardInner}
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <li className="flex items-baseline justify-between gap-2 text-xs">
      <span style={{ color: "#6B6560" }}>{label}</span>
      <span className="font-medium text-right" style={{ color: "#1A1A1A" }}>
        {value}
      </span>
    </li>
  );
}
