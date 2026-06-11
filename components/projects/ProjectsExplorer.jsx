"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import {
  PROJECTS,
  INDUSTRIES,
  REGIONS,
  PRODUCT_TYPES,
  INDUSTRY_LABEL,
  REGION_LABEL,
  PRODUCT_TYPE_LABEL,
} from "@/lib/projects";

/**
 * Projects explorer — the interactive body of /projects: a sticky faceted
 * filter bar (industry × product × region), the stagger-revealed project grid,
 * and a video lightbox.
 *
 * Filter state lives in the URL (?industry=…&product=…&region=…) so any view
 * is shareable. The page is statically rendered with the full, unfiltered grid
 * in the HTML (best for SEO); the URL is read once after hydration and written
 * back with history.replaceState — deliberately not useSearchParams, which
 * would bail the whole grid out of the static render. Values are
 * comma-separated multi-select: OR within a group, AND across groups.
 */

const FILTER_GROUPS = [
  { param: "industry", label: "Industry", options: INDUSTRIES },
  { param: "product", label: "Product Type", options: PRODUCT_TYPES },
  { param: "region", label: "Region", options: REGIONS },
];

const EMPTY_FILTERS = { industry: [], product: [], region: [] };

// Flagship installs lead the grid; the curated source order holds within tiers.
const SORTED_PROJECTS = [...PROJECTS].sort(
  (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
);

/* Read ?industry=…&product=…&region=… into {param: [values]}, dropping any
   value that isn't a known facet (hand-edited URLs stay harmless). */
function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const filters = {};
  for (const group of FILTER_GROUPS) {
    const allowed = new Set(group.options.map((o) => o.value));
    filters[group.param] = (params.get(group.param) || "")
      .split(",")
      .filter((v) => allowed.has(v));
  }
  return filters;
}

/* Mirror the current selection into the address bar without a navigation —
   replaceState keeps the back button pointing at the previous page, not a
   trail of chip clicks. */
function writeFiltersToUrl(filters) {
  const params = new URLSearchParams(window.location.search);
  for (const group of FILTER_GROUPS) {
    const values = filters[group.param];
    if (values.length > 0) params.set(group.param, values.join(","));
    else params.delete(group.param);
  }
  const qs = params.toString();
  window.history.replaceState(
    null,
    "",
    qs ? `${window.location.pathname}?${qs}` : window.location.pathname
  );
}

function FilterChip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-none cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
        active
          ? "border-[#4F46B5] bg-[#4F46B5] text-white"
          : "bg-white text-[#4A4A4A] hover:border-[#4F46B5] hover:text-[#1A1A1A]"
      }`}
      style={active ? undefined : { borderColor: "#D4CFC8" }}
    >
      {label}
    </button>
  );
}

function FilterGroupRow({ group, selected, onToggle, onClear }) {
  return (
    <div className="flex items-start gap-3 md:gap-4">
      <span
        className="w-16 flex-none pt-2 text-[10px] font-medium uppercase leading-tight tracking-[0.16em] md:w-20"
        style={{ color: COLOR.muted }}
      >
        {group.label}
      </span>
      {/* One rail per group: horizontal scroll on mobile, wrapping on desktop */}
      <div className="no-scrollbar -mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 py-1 md:flex-wrap md:overflow-visible">
        <FilterChip active={selected.length === 0} label="All" onClick={onClear} />
        {group.options.map((option) => (
          <FilterChip
            key={option.value}
            active={selected.includes(option.value)}
            label={option.label}
            onClick={() => onToggle(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const boxRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Mount the <video> only once the card nears the viewport, so the grid never
  // pulls the ~40 clips it isn't showing (same pattern as CaseStudiesPreview).
  useEffect(() => {
    if (!project.video || !boxRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, [project.video]);

  const play = () => {
    if (!project.video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const pause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <article
      id={project.id}
      onMouseEnter={play}
      onMouseLeave={pause}
      className="hover-lift group relative flex h-full scroll-mt-72 flex-col overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      {/* One full-card hit target — keeps the markup valid (no block content
          inside a button) while the visible text stays in the article below. */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`View project: ${project.title}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46B5]"
      />

      <div ref={boxRef} className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.poster}
          alt={`${project.title} — ${project.productName} installation`}
          fill
          loading="lazy"
          quality={78}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        {project.video && videoReady && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        )}
        {project.video && (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: playing ? 0 : 1 }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-transform duration-300 ease-premium group-hover:scale-110"
              style={{ background: "rgba(20,17,14,0.55)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff" aria-hidden>
                <path d="M4.5 2.8v10.4c0 .62.67.99 1.19.66l8.16-5.2a.78.78 0 0 0 0-1.32L5.69 2.14a.78.78 0 0 0-1.19.66z" />
              </svg>
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.22em]"
          style={{ color: COLOR.muted }}
        >
          {project.location || REGION_LABEL[project.region]}
        </span>
        <h3
          className="mt-2 text-xl leading-snug"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          {project.title}
        </h3>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-medium"
            style={{ background: COLOR.gray, color: COLOR.accent }}
          >
            {PRODUCT_TYPE_LABEL[project.product]}
            {project.model ? ` · ${project.model}` : ""}
          </span>
          <span
            className="rounded-full border px-3 py-1 text-[11px] font-medium"
            style={{ borderColor: "#D4CFC8", color: COLOR.body }}
          >
            {INDUSTRY_LABEL[project.industry]}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectLightbox({ project, onClose }) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef(null);

  // Escape closes; body scroll locks; focus moves to the close control.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(20,17,14,0.72)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl"
        style={{ background: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ background: "rgba(20,17,14,0.6)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* 16:9 stage with letterboxing — clips vary slightly in ratio, and a
            controls bar over object-cover would hide the content edges. */}
        <div className="relative aspect-video w-full" style={{ background: "#14110E" }}>
          {project.video ? (
            <video
              key={project.id}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.poster}
              className="absolute inset-0 h-full w-full object-contain"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={project.poster}
              alt={`${project.title} — ${project.productName} installation`}
              fill
              quality={85}
              sizes="(max-width: 768px) 100vw, 768px"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          )}
        </div>

        <div className="p-6 md:p-8">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.22em]"
            style={{ color: COLOR.muted }}
          >
            {project.location || REGION_LABEL[project.region]}
          </span>
          <h2
            className="mt-2 text-2xl leading-snug md:text-3xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            {project.title}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-medium"
              style={{ background: COLOR.gray, color: COLOR.accent }}
            >
              {PRODUCT_TYPE_LABEL[project.product]}
              {project.model ? ` · ${project.model}` : ""}
            </span>
            <span
              className="rounded-full border px-3 py-1 text-[11px] font-medium"
              style={{ borderColor: "#D4CFC8", color: COLOR.body }}
            >
              {INDUSTRY_LABEL[project.industry]}
            </span>
            <span
              className="rounded-full border px-3 py-1 text-[11px] font-medium"
              style={{ borderColor: "#D4CFC8", color: COLOR.body }}
            >
              {REGION_LABEL[project.region]}
            </span>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
            {project.description}
          </p>
          <a
            href="/contact"
            className="btn-lift mt-7 inline-flex items-center gap-2 rounded-full border border-[#1A1A1A] px-6 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
          >
            Discuss a similar project
            <span aria-hidden>→</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsExplorer() {
  const reduceMotion = useReducedMotion();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  // Hydrate the selection from a shared URL once on mount — the server HTML
  // always carries the full grid, so there is nothing to read before this.
  useEffect(() => {
    setFilters(readFiltersFromUrl());
  }, []);

  const apply = (next) => {
    setFilters(next);
    writeFiltersToUrl(next);
  };

  const toggle = (param, value) => {
    const current = filters[param];
    apply({
      ...filters,
      [param]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  };

  const clearGroup = (param) => apply({ ...filters, [param]: [] });
  const clearAll = () => apply(EMPTY_FILTERS);

  const activeCount = FILTER_GROUPS.reduce(
    (n, g) => n + filters[g.param].length,
    0
  );

  // OR within a group, AND across groups; an empty group means "all".
  const filtered = useMemo(
    () =>
      SORTED_PROJECTS.filter((project) =>
        FILTER_GROUPS.every((group) => {
          const selected = filters[group.param];
          return selected.length === 0 || selected.includes(project[group.param]);
        })
      ),
    [filters]
  );

  const filterRows = (
    <div className="space-y-1 md:space-y-1.5">
      {FILTER_GROUPS.map((group) => (
        <FilterGroupRow
          key={group.param}
          group={group}
          selected={filters[group.param]}
          onToggle={(value) => toggle(group.param, value)}
          onClear={() => clearGroup(group.param)}
        />
      ))}
    </div>
  );

  const countLabel = (
    <p aria-live="polite" className="text-xs" style={{ color: COLOR.muted }}>
      Showing <span className="font-semibold" style={{ color: COLOR.ink }}>{filtered.length}</span> of{" "}
      {PROJECTS.length} projects
    </p>
  );

  const clearAllButton = activeCount > 0 && (
    <button
      type="button"
      onClick={clearAll}
      className="cursor-pointer text-xs font-medium underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
      style={{ color: COLOR.accent }}
    >
      Clear all
    </button>
  );

  return (
    <>
      {/* ── Sticky filter bar — rides just below the h-28 navbar ── */}
      <div
        className="sticky top-28 z-30 border-b backdrop-blur-md"
        style={{ background: "rgba(250,248,245,0.94)", borderColor: COLOR.gray }}
      >
        <div className="mx-auto max-w-6xl px-6 py-3 lg:px-10">
          {/* Mobile: collapsed summary row — filters expand on demand */}
          <div className="flex min-h-[44px] items-center justify-between gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="project-filters-mobile"
              className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium"
              style={{ color: COLOR.ink }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters
              {activeCount > 0 && (
                <span className="rounded-full bg-[#4F46B5] px-2 py-0.5 text-[11px] font-semibold text-white">
                  {activeCount}
                </span>
              )}
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden
                className={`transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {countLabel}
          </div>

          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                id="project-filters-mobile"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden md:hidden"
              >
                <div className="pb-2 pt-3">
                  {filterRows}
                  {activeCount > 0 && (
                    <div className="mt-2 flex justify-end">{clearAllButton}</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop: the three chip rails always visible + count row */}
          <div className="hidden md:block">
            {filterRows}
            <div
              className="mt-2.5 flex items-center justify-between border-t pt-2.5"
              style={{ borderColor: COLOR.gray }}
            >
              {countLabel}
              {clearAllButton}
            </div>
          </div>
        </div>
      </div>

      {/* ── Project grid ── */}
      <section
        aria-label="Project gallery"
        className="mx-auto max-w-6xl px-6 py-12 lg:px-10 md:py-16"
      >
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center md:py-24">
            <div
              aria-hidden
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: COLOR.gray, color: COLOR.muted }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35M8 11h6" />
              </svg>
            </div>
            <h2
              className="mt-6 text-2xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              No projects match your filters
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
              Try widening the selection — or reset and browse all{" "}
              {PROJECTS.length} installations.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="btn-lift mt-8 inline-flex cursor-pointer items-center rounded-full border border-[#1A1A1A] px-6 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 0.08} className="h-full">
                <ProjectCard
                  project={project}
                  onOpen={() => setActiveProject(project)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectLightbox
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
