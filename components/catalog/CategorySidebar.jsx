"use client";

/**
 * CategorySidebar — MileStrong-style tree sidebar for the catalog page.
 *
 * Design decisions:
 * - Warm white card (#FAF8F5 bg, #E8E4DF border) keeps it inside K1 system.
 * - Active state: 3px left-border in brand blue-purple #4F46B5 + text tint.
 * - Subtree always expanded (no extra click needed); purely visual indentation.
 * - Mobile (<md): collapses into a native <select> dropdown at the top of page.
 * - Desktop: fixed-width 280px sticky panel beside the product grid.
 */

import { useState } from "react";

// Design tokens (mirrors home/tokens.js values)
const COLOR = {
  bg: "#FAF8F5",
  gray: "#E8E4DF",
  accent: "#4F46B5",
  text: "#1A1A1A",
  muted: "#6B6560",
  accentLight: "#EEF2FF",
};

// Category tree — maps CATEGORIES keys to their child products.
// Children are display-only labels (click selects the parent category).
const CATEGORY_TREE = [
  {
    key: "holographic",
    label: "Holographic LED",
    children: [
      "SMD Holographic P3.91",
      "SMD Holographic P6.25",
      "SMD Holographic P10.4",
    ],
  },
  {
    key: "series-t",
    label: "Series T — Transparent Poster",
    children: ["Transparent LED Poster Screen"],
  },
  {
    key: "series-f",
    label: "Series F — Flexible Film",
    children: ["Flexible LED Film", "Crystal Film Display"],
  },
];

// Flat options list for the mobile <select> dropdown
const MOBILE_OPTIONS = [
  { key: "all", label: "All Products" },
  { key: "holographic", label: "Holographic LED" },
  { key: "series-t", label: "Series T — Transparent Poster" },
  { key: "series-f", label: "Series F — Flexible Film" },
];

export default function CategorySidebar({ active, onSelect }) {
  const [openGroups, setOpenGroups] = useState(
    // All groups start expanded
    Object.fromEntries(CATEGORY_TREE.map((c) => [c.key, true]))
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
          Filter by Series
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
      <aside
        className="hidden md:block"
        aria-label="Product category filter"
      >
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
            Filter by Series
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

          {/* Category groups */}
          <nav className="space-y-1">
            {CATEGORY_TREE.map((group) => {
              const isActive = active === group.key;
              const isOpen = openGroups[group.key];

              return (
                <div key={group.key}>
                  {/* Parent category row */}
                  <div className="flex items-center gap-1">
                    {/* Expand/collapse toggle */}
                    <button
                      onClick={() => toggleGroup(group.key)}
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-xs transition-colors hover:bg-[#E8E4DF]"
                      style={{ color: COLOR.muted }}
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? "▾" : "▸"}
                    </button>

                    {/* Category name — clickable, selects this category */}
                    <button
                      onClick={() => onSelect(group.key)}
                      className="flex-1 rounded-lg px-2 py-1.5 text-left text-sm font-semibold transition-colors duration-150"
                      style={{
                        color: isActive ? COLOR.accent : COLOR.text,
                        background: isActive ? COLOR.accentLight : "transparent",
                        borderLeft: isActive
                          ? `3px solid ${COLOR.accent}`
                          : "3px solid transparent",
                      }}
                    >
                      {group.label}
                    </button>
                  </div>

                  {/* Sub-items (display only, click selects parent) */}
                  {isOpen && (
                    <ul className="ml-7 mt-1 space-y-0.5">
                      {group.children.map((child) => (
                        <li key={child}>
                          <button
                            onClick={() => onSelect(group.key)}
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
          </nav>
        </div>
      </aside>
    </>
  );
}
