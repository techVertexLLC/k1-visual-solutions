"use client";

/**
 * CategorySidebar — 兩層樹狀側欄（K1 Products / MileStrong），含 mobile select。
 *
 * 設計決策：
 * - 暖白卡片（#FAF8F5 bg, #E8E4DF border）與 K1 設計系統一致。
 * - 分組 header（小灰字 uppercase）區隔 K1 自有系列與 MileStrong 代理產品。
 * - Active 狀態：3px 左邊框品牌藍紫 #4F46B5 + 底色淡藍。
 * - 子項目永遠展開；可點擊 ▾/▸ 折疊個別群組。
 * - Mobile (<md)：收折為原生 <select> 下拉。
 */

import { useState } from "react";

const COLOR = {
  bg: "#FAF8F5",
  gray: "#E8E4DF",
  accent: "#4F46B5",
  text: "#1A1A1A",
  muted: "#6B6560",
  accentLight: "#EEF2FF",
};

// 兩層樹狀結構：group → items → children
const CATEGORY_TREE = [
  {
    groupLabel: "K1 Products",
    items: [
      {
        key: "crystal-film",
        label: "Crystal Film LED Screen",
        children: ["P6.25", "P8", "P10", "P15", "P20"],
      },
      {
        key: "holographic",
        label: "Holographic Invisible Screen",
        children: ["P2.5", "P3.91", "P6.25", "P10"],
      },
      {
        key: "soft-led-display",
        label: "Soft LED Display",
        children: ["M — 35″", "L — 52″", "XL — 70″"],
      },
    ],
  },
  {
    groupLabel: "MileStrong",
    items: [
      {
        key: "control-room",
        label: "Control Room Displays",
        children: ["Control Room Display"],
      },
      {
        key: "transparent-led",
        label: "Transparent LED Screens",
        children: ["LED See Through Screen", "Transparent LED Poster (STP)"],
      },
      {
        key: "led-poster",
        label: "LED Poster & Signage",
        children: ["MSC Folding Poster", "Three-Fold Poster", "Front Desk LED", "Interactive Signage"],
      },
      {
        key: "immersive",
        label: "Immersive & Creative",
        children: ["P2.5 Immersive Screen", "Magic Cube LED", "Special Shape LED"],
      },
      {
        key: "outdoor",
        label: "Outdoor LED Displays",
        children: ["Perimeter LED", "SL Series Outdoor LED"],
      },
      {
        key: "other",
        label: "Other",
        children: ["General LED Display"],
      },
    ],
  },
];

// Mobile <select> 的扁平選項
const MOBILE_OPTIONS = [
  { key: "all",              label: "All Products" },
  // K1
  { key: "crystal-film",     label: "K1 — Crystal Film LED Screen" },
  { key: "holographic",      label: "K1 — Holographic Invisible Screen" },
  { key: "soft-led-display", label: "K1 — Soft LED Display" },
  // MileStrong
  { key: "control-room",    label: "MileStrong — Control Room" },
  { key: "transparent-led", label: "MileStrong — Transparent LED" },
  { key: "led-poster",      label: "MileStrong — LED Poster & Signage" },
  { key: "immersive",       label: "MileStrong — Immersive & Creative" },
  { key: "outdoor",         label: "MileStrong — Outdoor LED" },
  { key: "other",           label: "MileStrong — Other" },
];

export default function CategorySidebar({ active, onSelect }) {
  // 所有 item key 初始為展開狀態
  const allKeys = CATEGORY_TREE.flatMap((g) => g.items.map((i) => i.key));
  const [openGroups, setOpenGroups] = useState(
    Object.fromEntries(allKeys.map((k) => [k, true]))
  );

  function toggleGroup(key) {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      {/* ─── Mobile: native select dropdown ──────────────────────────────── */}
      <div className="mb-6 md:hidden">
        <label
          htmlFor="catalog-category-select"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: COLOR.muted }}
        >
          Filter by Category
        </label>
        <select
          id="catalog-category-select"
          value={active}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full appearance-none rounded-lg border px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46B5] focus:ring-offset-1"
          style={{
            background: COLOR.bg,
            borderColor: COLOR.gray,
            color: COLOR.text,
          }}
        >
          {MOBILE_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ─── Desktop: tree sidebar ────────────────────────────────────────── */}
      <aside className="hidden md:block" aria-label="Product category filter">
        <div
          className="sticky top-24 rounded-xl border p-5"
          style={{
            background: COLOR.bg,
            borderColor: COLOR.gray,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <p
            className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: COLOR.muted }}
          >
            Filter by Category
          </p>

          {/* All Products */}
          <button
            onClick={() => onSelect("all")}
            className="mb-2 flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors duration-150"
            style={{
              color: active === "all" ? COLOR.accent : COLOR.text,
              background: active === "all" ? COLOR.accentLight : "transparent",
              borderLeft: active === "all"
                ? `3px solid ${COLOR.accent}`
                : "3px solid transparent",
            }}
          >
            All Products
          </button>

          {/* Divider */}
          <div className="my-3" style={{ borderTop: `1px solid ${COLOR.gray}` }} />

          {/* Grouped category tree */}
          <nav className="space-y-4">
            {CATEGORY_TREE.map((group) => (
              <div key={group.groupLabel}>
                {/* Group section header */}
                <p
                  className="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: COLOR.muted }}
                >
                  {group.groupLabel}
                </p>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = active === item.key;
                    const isOpen = openGroups[item.key];

                    return (
                      <div key={item.key}>
                        {/* Category row */}
                        <div className="flex items-center gap-1">
                          {/* Expand/collapse toggle */}
                          <button
                            onClick={() => toggleGroup(item.key)}
                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-xs transition-colors hover:bg-[#E8E4DF]"
                            style={{ color: COLOR.muted }}
                            aria-expanded={isOpen}
                            aria-controls={`catalog-group-${item.key}`}
                            aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                          >
                            <span aria-hidden="true">{isOpen ? "▾" : "▸"}</span>
                          </button>

                          {/* Category name — selects this category */}
                          <button
                            onClick={() => onSelect(item.key)}
                            className="flex-1 rounded-lg px-2 py-1.5 text-left text-sm font-semibold transition-colors duration-150"
                            style={{
                              color: isActive ? COLOR.accent : COLOR.text,
                              background: isActive ? COLOR.accentLight : "transparent",
                              borderLeft: isActive
                                ? `3px solid ${COLOR.accent}`
                                : "3px solid transparent",
                            }}
                          >
                            {item.label}
                          </button>
                        </div>

                        {/* Sub-items (display only; clicking selects parent) */}
                        {isOpen && (
                          <ul
                            id={`catalog-group-${item.key}`}
                            className="ml-7 mt-1 space-y-0.5"
                          >
                            {item.children.map((child) => (
                              <li key={child}>
                                <button
                                  onClick={() => onSelect(item.key)}
                                  className="w-full rounded px-2 py-1 text-left text-xs transition-colors duration-150 hover:text-[#4F46B5]"
                                  style={{ color: COLOR.muted }}
                                >
                                  {child}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
