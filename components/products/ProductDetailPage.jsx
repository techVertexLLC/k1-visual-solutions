"use client";

/**
 * ProductDetailPage — the 11-section detail template shared by the three
 * product lines (Redesign Phase 1).
 *
 * Section order mirrors the buyer's path: be impressed (Hero) → understand it
 * (What is it) → confirm the numbers (Stats / Features / Models & Specs /
 * Size & Splicing) → see it in the wild (Applications / Cases) → trust it
 * (Installation / Certifications / FAQ) → act (CTA + cross-sell).
 *
 * Retail products (productType === "retail", i.e. the Soft LED Display) swap
 * "Installation" for "How It Works", gain a "Certifications & Wholesale"
 * section, and carry retail CTAs ("Get Pricing" / "Become a Reseller") —
 * all driven from the data in lib/products.js, not forked markup.
 *
 * Interaction rules from the spec, applied across all three pages:
 *   · spec tables collapse to "label : value" rows — never a horizontally
 *     scrolling table, on any viewport;
 *   · every non-hero video is preload="none" with a poster, playing only
 *     in view (AutoVideo) or on hover/tap (CaseCard);
 *   · a sticky anchor bar under the main nav tracks the current section;
 *   · every section reveals with a ≤500ms fade/slide (Reveal).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/products/ProductCard";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";

const EASE = [0.22, 1, 0.36, 1];

/* Sticky-header clearance: main nav (h-28 = 112px) + anchor bar (~52px). */
const SECTION_SCROLL_MARGIN = "scroll-mt-44";

/* ───────────────────────── tiny inline icon set ─────────────────────────
   Feature cards and scenario chips reference icons by key from the data
   layer. All glyphs share one stroke style so the set reads as a family. */
const ICON_PATHS = {
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16.5l9 5 9-5",
  wave: "M2 12c2.5-5 5-5 7.5 0s5 5 7.5 0 3-4 5-2",
  feather: "M20 4c-5 0-12 3-14 10l-2 6 6-2c7-2 10-9 10-14ZM6 18 18 6",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Zm-3 9 2.5 2.5L16 10",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-15v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  ruler: "M3 17 17 3l4 4L7 21l-4-4Zm5-1 1.5 1.5M11 13l1.5 1.5M14 10l1.5 1.5M17 7l1.5 1.5",
  sparkle: "M12 3v4m0 10v4M3 12h4m10 0h4M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1M6.3 17.7l2.1-2.1m7.2-7.2 2.1-2.1",
  grid: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  plug: "M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V8Zm5 8v5",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 17h4",
  droplet: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z",
};

function Icon({ name, className = "h-5 w-5" }) {
  const d = ICON_PATHS[name] || ICON_PATHS.sparkle;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

/* ─────────────────────────── shared primitives ─────────────────────────── */

/** Numbered eyebrow + serif title, matching the home-page section headers. */
function SectionHeading({ index, eyebrow, title, description, align = "left" }) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] ${
          centered ? "justify-center" : ""
        }`}
        style={{ color: COLOR.muted }}
      >
        <span style={{ color: COLOR.accent }}>{index}</span>
        <span aria-hidden className="h-px w-8" style={{ background: "#D4CFC8" }} />
        <span>{eyebrow}</span>
      </div>
      <h2
        className="mt-5 text-2xl leading-tight md:text-4xl"
        style={{ fontFamily: FONT.serif, color: COLOR.ink }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed" style={{ color: COLOR.body }}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/**
 * Lazy autoplaying loop — preload="none" + poster; plays only while in the
 * viewport, pauses (and never loads) otherwise. Muted + playsInline so mobile
 * Safari treats it as a background texture, not media playback.
 */
function AutoVideo({ src, poster, className = "" }) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldReduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldReduce]);

  // Reduced motion: show the poster, skip motion entirely.
  if (shouldReduce && poster) {
    return (
      <img src={poster} alt="" className={className} loading="lazy" aria-hidden />
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      aria-hidden
    />
  );
}

/**
 * Count-up stat. Parses "≥90%", "2.5mm", "100,000h", "4,000:1", "16×192" into
 * prefix / number / suffix and rolls the number in on first viewport entry.
 * Values with no leading number (or reduced motion) render statically.
 */
function CountUp({ value, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();
  const [progress, setProgress] = useState(0); // 0 → 1

  const parsed = useMemo(() => {
    const m = String(value).match(/^([^0-9]*)([\d,]*\.?\d+)(.*)$/);
    if (!m) return null;
    const num = parseFloat(m[2].replace(/,/g, ""));
    if (Number.isNaN(num)) return null;
    return {
      prefix: m[1],
      num,
      suffix: m[3],
      decimals: m[2].includes(".") ? m[2].split(".")[1].length : 0,
      grouped: m[2].includes(","),
    };
  }, [value]);

  useEffect(() => {
    if (!parsed || !inView || shouldReduce) return;
    let raf;
    const t0 = performance.now();
    const DURATION = 1100;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / DURATION);
      setProgress(1 - Math.pow(1 - p, 3)); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, shouldReduce]);

  if (!parsed) {
    return (
      <span ref={ref} className={className} style={style}>
        {value}
      </span>
    );
  }

  const current = shouldReduce ? parsed.num : parsed.num * progress;
  const fixed = current.toFixed(parsed.decimals);
  let text = fixed;
  if (parsed.grouped) {
    const [int, dec] = fixed.split(".");
    text = Number(int).toLocaleString("en-US") + (dec ? `.${dec}` : "");
  }

  return (
    <span ref={ref} className={className} style={style}>
      {parsed.prefix}
      {text}
      {parsed.suffix}
    </span>
  );
}

/**
 * Spec map → "label : value" rows. One definition per row with a hairline
 * divider; two columns on sm+. This is the only spec rendering primitive —
 * nothing on the page ever scrolls horizontally.
 */
function SpecRows({ specs, columns = 2 }) {
  return (
    <dl
      className={`grid grid-cols-1 gap-x-10 ${
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {Object.entries(specs).map(([label, val]) => (
        <div
          key={label}
          className="flex items-baseline justify-between gap-6 border-b py-3"
          style={{ borderColor: COLOR.gray }}
        >
          <dt
            className="flex-none text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: COLOR.muted }}
          >
            {label}
          </dt>
          <dd
            className="text-right text-sm font-medium leading-snug"
            style={{ color: COLOR.ink }}
          >
            {val}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ───────────────────────────── 1 · Hero ───────────────────────────── */

function HeroSection({ product }) {
  const { hero, name, tagline, subtitle, cta } = product;
  const shouldReduce = useReducedMotion();

  return (
    <section
      aria-label={`${name} overview`}
      className="relative flex h-[78vh] max-h-[860px] min-h-[560px] items-end overflow-hidden"
      style={{ background: COLOR.ink }}
    >
      {/* Background media — hero is the one video allowed to autoload. */}
      {hero.video && !shouldReduce ? (
        <video
          src={hero.video}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      ) : (
        <Image
          src={hero.poster}
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover"
          aria-hidden
        />
      )}

      {/* Legibility scrim — strongest at the caption, clear at the top. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(16,15,18,0.82) 0%, rgba(16,15,18,0.38) 45%, rgba(16,15,18,0.18) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 sm:pb-16 lg:px-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70"
        >
          <a href="/" className="transition-opacity hover:opacity-70">Home</a>
          <span aria-hidden>/</span>
          <a href="/products" className="transition-opacity hover:opacity-70">Products</a>
          <span aria-hidden>/</span>
          <span className="text-white/95">{name}</span>
        </motion.nav>

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        >
          <h1
            className="max-w-3xl text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: FONT.serif }}
          >
            {name}
          </h1>
          {subtitle ? (
            <p
              className="mt-3 text-xl text-white/90 md:text-2xl"
              style={{ fontFamily: FONT.serif }}
            >
              {subtitle}
            </p>
          ) : null}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            {tagline}
          </p>

          {/* Key-number badges */}
          <div className="mt-7 flex flex-wrap gap-3">
            {hero.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <span className="text-sm font-semibold text-white sm:text-base">
                  {s.value}
                </span>
                <span className="ml-2 text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={cta.primary.href}
              className="btn-lift btn-glow rounded-full bg-[#4F46B5] px-6 py-3 text-sm font-medium text-white hover:bg-[#5A50C7]"
            >
              {cta.primary.label}
            </a>
            <a
              href={cta.secondary.href}
              target={cta.secondary.href.endsWith(".pdf") ? "_blank" : undefined}
              rel={cta.secondary.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              className="btn-lift rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {cta.secondary.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── sticky anchor navigation ─────────────────────── */

function AnchorNav({ sections, ctaHref, ctaLabel }) {
  const [active, setActive] = useState("");

  // Scroll-spy: the active section is the last one whose top has crossed the
  // header line. A plain scroll listener beats IO here because sections vary
  // hugely in height.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const PROBE = 200; // px below viewport top ≈ just under both bars
        let current = "";
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= PROBE) current = s.id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  return (
    <div
      className="sticky top-28 z-40 border-b"
      style={{
        background: `${COLOR.bg}f0`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: COLOR.gray,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 lg:px-10">
        <nav
          aria-label="Page sections"
          className="flex gap-1 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="relative flex-none px-3 py-3.5 text-[13px] font-medium transition-colors duration-200"
                style={{ color: isActive ? COLOR.accent : COLOR.body }}
              >
                {s.label}
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-0 h-0.5 rounded-full transition-opacity duration-200"
                  style={{ background: COLOR.accent, opacity: isActive ? 1 : 0 }}
                />
              </a>
            );
          })}
        </nav>
        <a
          href={ctaHref}
          className="hidden flex-none rounded-full bg-[#4F46B5] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#5A50C7] md:inline-block"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────── 2 · What is it ─────────────────────────── */

function WhatIsIt({ product, index }) {
  const { whatIsIt, name } = product;
  return (
    <section
      id="what"
      aria-label={`What is the ${name}`}
      className={`${SECTION_SCROLL_MARGIN} py-16 md:py-24`}
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              index={index}
              eyebrow="What is it"
              title={`What is the ${name}?`}
            />
            <Reveal delay={0.08}>
              <p
                className="mt-6 text-base leading-relaxed md:text-lg md:leading-relaxed"
                style={{ color: COLOR.body }}
              >
                {whatIsIt.text}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
              style={{ borderColor: COLOR.gray }}
            >
              <Image
                src={whatIsIt.image}
                alt={`${name} — product overview`}
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Scenario quick-look chips */}
        <Reveal delay={0.16} className="mt-10">
          <ul className="flex flex-wrap gap-2.5" aria-label="Typical scenarios">
            {whatIsIt.scenarios.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium"
                style={{ borderColor: COLOR.gray, color: COLOR.body }}
              >
                <span style={{ color: COLOR.accent }}>
                  <Icon name="sparkle" className="h-3.5 w-3.5" />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 3 · Stats bar ─────────────────────────── */

function StatsBar({ stats }) {
  return (
    <section
      aria-label="Key figures"
      className="border-y bg-white py-12 md:py-16"
      style={{ borderColor: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <CountUp
                  value={s.value}
                  className="block text-2xl sm:text-3xl"
                  style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                />
                <span
                  className="mt-2 block text-[10px] font-medium uppercase tracking-[0.16em] sm:text-[11px]"
                  style={{ color: COLOR.muted }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 4 · Core features ─────────────────────────── */

function Features({ product, index }) {
  return (
    <section
      aria-label="Core features"
      className="py-16 md:py-24"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          index={index}
          eyebrow="Core Features"
          title="Why teams specify it"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.07}>
              <article
                className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white"
                style={{ borderColor: COLOR.gray }}
              >
                {f.media ? (
                  <div className="relative aspect-video overflow-hidden">
                    {f.media.type === "video" ? (
                      <AutoVideo
                        src={f.media.src}
                        poster={f.media.poster}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={f.media.src}
                        alt={f.title}
                        fill
                        loading="lazy"
                        quality={75}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={BLUR}
                        className="object-cover"
                      />
                    )}
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: COLOR.gray, color: COLOR.accent }}
                  >
                    <Icon name={f.icon} />
                  </span>
                  <h3
                    className="mt-4 text-lg leading-snug"
                    style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: COLOR.body }}
                  >
                    {f.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5 · Models & specs ───────────────────────── */

function ModelsSpecs({ product, index }) {
  const { models, sharedSpecs, choosingGuide, powerNote } = product;
  const [activeId, setActiveId] = useState(models[0]?.id);
  const activeModel = models.find((m) => m.id === activeId) || models[0];

  // Comparison-table row order follows the first model's spec keys.
  const compareKeys = useMemo(
    () => (models[0] ? Object.keys(models[0].specs) : []),
    [models]
  );

  return (
    <section
      id="models"
      aria-label="Models and specifications"
      className={`${SECTION_SCROLL_MARGIN} py-16 md:py-24`}
      style={{ background: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          index={index}
          eyebrow="Models & Specs"
          title="Find the right model"
          description="Switch between models for the full specification, or compare the whole range side by side below."
        />

        {/* Model tabs */}
        <Reveal delay={0.08} className="mt-10">
          <div
            role="tablist"
            aria-label="Product models"
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {models.map((m) => {
              const isActive = m.id === activeId;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(m.id)}
                  className="flex-none whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-95"
                  style={{
                    borderColor: isActive ? COLOR.accent : "#D4CFC8",
                    background: isActive ? COLOR.accent : "#fff",
                    color: isActive ? "#fff" : COLOR.body,
                  }}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active model: image + spec rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-6 overflow-hidden rounded-2xl border bg-white"
            style={{ borderColor: "#DDD8D2" }}
          >
            <div className="grid lg:grid-cols-5">
              <div className="relative aspect-[4/3] lg:col-span-2 lg:aspect-auto lg:min-h-[320px]">
                <Image
                  src={activeModel.image}
                  alt={`${product.name} ${activeModel.name}`}
                  fill
                  loading="lazy"
                  quality={78}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 lg:col-span-3">
                <h3
                  className="text-xl"
                  style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                >
                  {activeModel.name}
                </h3>
                <div className="mt-4">
                  <SpecRows specs={activeModel.specs} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Full-range comparison — real table on lg+, stacked cards below. */}
        {models.length > 1 ? (
          <Reveal delay={0.1} className="mt-12">
            <h3
              className="text-xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Compare the range
            </h3>

            <div
              className="mt-5 hidden overflow-hidden rounded-2xl border bg-white lg:block"
              style={{ borderColor: "#DDD8D2" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: COLOR.bg }}>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.14em]"
                      style={{ color: COLOR.muted }}
                    >
                      Specification
                    </th>
                    {models.map((m) => (
                      <th
                        key={m.id}
                        scope="col"
                        className="px-5 py-3.5 text-left font-semibold"
                        style={{ color: COLOR.ink }}
                      >
                        {m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareKeys.map((key, ri) => (
                    <tr
                      key={key}
                      className="border-t"
                      style={{
                        borderColor: COLOR.gray,
                        background: ri % 2 ? `${COLOR.bg}80` : "#fff",
                      }}
                    >
                      <th
                        scope="row"
                        className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em]"
                        style={{ color: COLOR.muted }}
                      >
                        {key}
                      </th>
                      {models.map((m) => (
                        <td
                          key={m.id}
                          className="px-5 py-3 align-top"
                          style={{ color: COLOR.body }}
                        >
                          {m.specs[key] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / tablet: one card per model — no sideways scrolling. */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:hidden">
              {models.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl border bg-white p-5"
                  style={{ borderColor: "#DDD8D2" }}
                >
                  <h4
                    className="text-lg"
                    style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                  >
                    {m.name}
                  </h4>
                  <dl className="mt-3">
                    {compareKeys.map((key) => (
                      <div
                        key={key}
                        className="flex items-baseline justify-between gap-4 border-b py-2.5 last:border-b-0"
                        style={{ borderColor: COLOR.gray }}
                      >
                        <dt
                          className="flex-none text-[10px] font-medium uppercase tracking-[0.12em]"
                          style={{ color: COLOR.muted }}
                        >
                          {key}
                        </dt>
                        <dd
                          className="text-right text-[13px] font-medium leading-snug"
                          style={{ color: COLOR.ink }}
                        >
                          {m.specs[key] ?? "—"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        {/* Shared platform specs */}
        <Reveal delay={0.12} className="mt-12">
          <div
            className="rounded-2xl border bg-white p-6 sm:p-8"
            style={{ borderColor: "#DDD8D2" }}
          >
            <h3
              className="text-xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Shared across every model
            </h3>
            <div className="mt-4">
              <SpecRows specs={sharedSpecs} columns={3} />
            </div>
            {powerNote ? (
              <p
                className="mt-6 rounded-xl px-5 py-4 text-sm leading-relaxed"
                style={{ background: COLOR.bg, color: COLOR.body }}
              >
                <span className="font-semibold" style={{ color: COLOR.accent }}>
                  Measured, not modelled —{" "}
                </span>
                {powerNote}
              </p>
            ) : null}
          </div>
        </Reveal>

        {/* How to choose */}
        {choosingGuide ? (
          <Reveal delay={0.14} className="mt-8">
            <div
              className="rounded-2xl border-l-4 bg-white p-6 sm:p-8"
              style={{ borderColor: COLOR.accent }}
            >
              <h3
                className="text-xl"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                How to choose
              </h3>
              <p
                className="mt-3 text-base leading-relaxed"
                style={{ color: COLOR.body }}
              >
                {choosingGuide}
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ─────────────────────── 6 · Size & splicing (SVG) ─────────────────────── */

function ModuleDiagram({ splicing }) {
  // Module drawn to proportion inside a fixed stage; ghost modules show the
  // splice directions.
  const stage = { w: 560, h: 330 };
  const scale = Math.min(300 / splicing.w, 150 / splicing.h);
  const mw = splicing.w * scale;
  const mh = splicing.h * scale;
  const x = (stage.w - mw) / 2 - 60;
  const y = (stage.h - mh) / 2 - 30;

  const dim = { stroke: "#A39C92", strokeWidth: 1 };
  const label = {
    fill: COLOR.muted,
    fontSize: 11,
    fontFamily: "var(--font-inter), system-ui, sans-serif",
  };

  return (
    <svg
      viewBox={`0 0 ${stage.w} ${stage.h}`}
      role="img"
      aria-label={`Module dimension diagram — ${splicing.moduleSize}, splicing in both directions`}
      className="h-auto w-full"
    >
      {/* ghost neighbours: right + below */}
      <rect x={x + mw + 14} y={y} width={mw * 0.55} height={mh} rx="6" fill="none" stroke="#D4CFC8" strokeDasharray="5 5" />
      <rect x={x} y={y + mh + 14} width={mw} height={mh * 0.55} rx="6" fill="none" stroke="#D4CFC8" strokeDasharray="5 5" />

      {/* main module */}
      <rect x={x} y={y} width={mw} height={mh} rx="6" fill="#fff" stroke={COLOR.accent} strokeWidth="1.5" />
      {/* LED dot texture */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 12 }).map((__, c) => (
          <circle
            key={`${r}-${c}`}
            cx={x + (mw / 13) * (c + 1)}
            cy={y + (mh / 6) * (r + 1)}
            r="1.6"
            fill="#C9C4F0"
          />
        ))
      )}

      {/* width dimension */}
      <line x1={x} y1={y - 16} x2={x + mw} y2={y - 16} {...dim} />
      <line x1={x} y1={y - 21} x2={x} y2={y - 11} {...dim} />
      <line x1={x + mw} y1={y - 21} x2={x + mw} y2={y - 11} {...dim} />
      <text x={x + mw / 2} y={y - 26} textAnchor="middle" {...label}>
        {splicing.moduleSize}
      </text>

      {/* thickness tag */}
      <text x={x + mw / 2} y={y + mh / 2 + 4} textAnchor="middle" {...label} fill={COLOR.body} fontSize="13" fontWeight="600">
        {splicing.thickness} thin
      </text>

      {/* splice arrows */}
      <g stroke={COLOR.accent} strokeWidth="1.5" fill="none">
        <path d={`M ${x + mw + 2} ${y + mh / 2} h 26 m -8 -6 l 8 6 l -8 6`} />
        <path d={`M ${x + mw / 2} ${y + mh + 2} v 26 m -6 -8 l 6 8 l 6 -8`} />
      </g>
      <text x={x + mw + 44} y={y + mh / 2 + 4} {...label}>
        extend
      </text>
      <text x={x + mw / 2 + 10} y={y + mh + 26} {...label}>
        stack
      </text>
    </svg>
  );
}

function SizesDiagram({ splicing }) {
  // Length comparison for the retail product — three bars to scale.
  const max = Math.max(...splicing.sizes.map((s) => s.inches));
  const stage = { w: 560, h: 250 };
  const barH = 38;
  const gap = 34;

  return (
    <svg
      viewBox={`0 0 ${stage.w} ${stage.h}`}
      role="img"
      aria-label="Size comparison of the three available lengths"
      className="h-auto w-full"
    >
      {splicing.sizes.map((s, i) => {
        const w = (s.inches / max) * (stage.w - 130);
        const y = 24 + i * (barH + gap);
        return (
          <g key={s.name}>
            <rect x="70" y={y} width={w} height={barH} rx="8" fill="#fff" stroke={COLOR.accent} strokeWidth="1.5" />
            {Array.from({ length: Math.round(w / 14) }).map((_, c) => (
              <circle key={c} cx={78 + c * 14} cy={y + barH / 2} r="1.8" fill="#C9C4F0" />
            ))}
            <text
              x="56"
              y={y + barH / 2 + 5}
              textAnchor="end"
              fontSize="15"
              fontWeight="700"
              fill={COLOR.ink}
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {s.name}
            </text>
            <text
              x="70"
              y={y + barH + 16}
              fontSize="11"
              fill={COLOR.muted}
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SizeSplicing({ product, index }) {
  const { splicing } = product;
  const isSizes = splicing.variant === "sizes";

  return (
    <section
      id="splicing"
      aria-label={isSizes ? "Choose your size" : "Size and splicing"}
      className={`${SECTION_SCROLL_MARGIN} border-y bg-white py-16 md:py-24`}
      style={{ borderColor: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              index={index}
              eyebrow={isSizes ? "Sizing" : "Size & Splicing"}
              title={isSizes ? splicing.title : "One module, any wall"}
              description={splicing.description}
            />
            {!isSizes ? (
              <Reveal delay={0.1}>
                <p
                  className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                  style={{ borderColor: COLOR.gray, color: COLOR.body }}
                >
                  <Icon name="ruler" className="h-4 w-4" />
                  Cut-to-size and custom layouts available per project
                </p>
              </Reveal>
            ) : null}
          </div>
          <Reveal delay={0.12}>
            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{ borderColor: COLOR.gray, background: COLOR.bg }}
            >
              {isSizes ? (
                <SizesDiagram splicing={splicing} />
              ) : (
                <ModuleDiagram splicing={splicing} />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── 7 · Applications gallery + lightbox ──────────────────── */

function ApplicationsGallery({ product, index }) {
  const { applications } = product;
  const [lightbox, setLightbox] = useState(null); // index | null

  // Lock body scroll + Escape/arrow keys while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % applications.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + applications.length) % applications.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, applications.length]);

  // Gentle masonry rhythm: vary aspect by position.
  const aspectFor = (i) => (i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/3]");

  return (
    <section
      id="applications"
      aria-label="Applications gallery"
      className={`${SECTION_SCROLL_MARGIN} py-16 md:py-24`}
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          index={index}
          eyebrow="Applications"
          title="Where it earns its keep"
          description="Tap any scene to take a closer look."
        />

        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {applications.map((app, i) => (
            <Reveal
              key={`${app.src}-${i}`}
              delay={(i % 3) * 0.06}
              className="break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Enlarge: ${app.label}`}
                className={`group relative block w-full overflow-hidden rounded-xl border text-left ${aspectFor(i)}`}
                style={{ borderColor: COLOR.gray }}
              >
                <Image
                  src={app.src}
                  alt={app.alt || app.label}
                  fill
                  loading="lazy"
                  quality={72}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-20"
                  style={{ background: "linear-gradient(to top, rgba(16,15,18,0.65), transparent)" }}
                />
                <span className="absolute bottom-3 left-3.5 text-[13px] font-medium text-white">
                  {app.label}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={applications[lightbox].label}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            style={{ background: "rgba(16,15,18,0.9)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative h-full max-h-[82vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={applications[lightbox].src}
                alt={applications[lightbox].alt || applications[lightbox].label}
                fill
                quality={85}
                sizes="100vw"
                className="object-contain"
              />
              <p className="absolute -bottom-9 left-0 right-0 text-center text-sm text-white/85">
                {applications[lightbox].label}
                <span className="mx-2 text-white/40">·</span>
                <span className="text-white/60">
                  {lightbox + 1} / {applications.length}
                </span>
              </p>
            </motion.div>

            {/* controls */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i - 1 + applications.length) % applications.length);
              }}
              className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 sm:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i + 1) % applications.length);
              }}
              className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 sm:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────── 8 · Installation ─────────────────────────── */

function StepCard({ step, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        className="h-full rounded-2xl border bg-white p-6"
        style={{ borderColor: "#DDD8D2" }}
      >
        <span
          className="text-4xl leading-none"
          style={{ fontFamily: FONT.serif, color: COLOR.accent }}
        >
          {String(step.number).padStart(2, "0")}
        </span>
        <h3
          className="mt-4 text-lg leading-snug"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: COLOR.body }}>
          {step.description}
        </p>
      </div>
    </Reveal>
  );
}

function Installation({ product, index }) {
  const { installation, appControl } = product;
  const methods = installation.methods || null;
  const [methodIdx, setMethodIdx] = useState(0);
  const steps = methods ? methods[methodIdx].steps : installation.steps;
  const cols =
    steps.length <= 3
      ? "sm:grid-cols-3"
      : steps.length === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="installation"
      aria-label={installation.title}
      className={`${SECTION_SCROLL_MARGIN} py-16 md:py-24`}
      style={{ background: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          index={index}
          eyebrow={installation.title}
          title={installation.tagline}
        />

        {/* Method tabs (front-facing / back-sticker) */}
        {methods ? (
          <Reveal delay={0.06} className="mt-8">
            <div role="tablist" aria-label="Installation methods" className="flex gap-2">
              {methods.map((m, i) => {
                const isActive = i === methodIdx;
                return (
                  <button
                    key={m.name}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setMethodIdx(i)}
                    className="rounded-full border px-5 py-2 text-sm font-medium transition-[color,background-color,border-color] duration-200"
                    style={{
                      borderColor: isActive ? COLOR.accent : "#D4CFC8",
                      background: isActive ? COLOR.accent : "#fff",
                      color: isActive ? "#fff" : COLOR.body,
                    }}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <div className={`mt-10 grid gap-5 ${cols}`}>
          {steps.map((s, i) => (
            <StepCard key={`${methodIdx}-${s.number}`} step={s} delay={i * 0.06} />
          ))}
        </div>

        {/* Demo video */}
        {installation.video ? (
          <Reveal delay={0.1} className="mt-10">
            <div
              className="relative aspect-video overflow-hidden rounded-2xl border"
              style={{ borderColor: "#DDD8D2" }}
            >
              <AutoVideo
                src={installation.video}
                poster={product.hero.poster}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        {/* App-control panel — retail product only */}
        {appControl ? (
          <Reveal delay={0.1} className="mt-10">
            <div
              className="overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: "#DDD8D2" }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-6 sm:p-8">
                  <div
                    className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em]"
                    style={{ color: COLOR.muted }}
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    App Control — {appControl.app} · {appControl.platforms} · {appControl.connection}
                  </div>
                  <h3
                    className="mt-4 text-xl"
                    style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                  >
                    Control it from your phone
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: COLOR.body }}>
                    {appControl.description}
                  </p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {appControl.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: COLOR.body }}>
                        <span className="mt-0.5 flex-none" style={{ color: COLOR.accent }}>
                          <Icon name="sparkle" className="h-3.5 w-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative min-h-[260px]">
                  <Image
                    src={appControl.remoteImage}
                    alt={`${appControl.app} app and bundled remote control`}
                    fill
                    loading="lazy"
                    quality={78}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* Downloadable guides */}
        {installation.guides?.length ? (
          <Reveal delay={0.12} className="mt-10">
            <div className="flex flex-wrap gap-3">
              {installation.guides.map((g) => (
                <a
                  key={g.href}
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lift inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-sm font-medium"
                  style={{ borderColor: "#D4CFC8", color: COLOR.ink }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {g.label}
                </a>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ──────────────── 8b · Certifications & wholesale (retail) ──────────────── */

function CertificationsWholesale({ product, index }) {
  const { certifications, wholesale } = product;
  return (
    <section
      id="certifications"
      aria-label="Certifications and wholesale"
      className={`${SECTION_SCROLL_MARGIN} border-y bg-white py-16 md:py-24`}
      style={{ borderColor: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          index={index}
          eyebrow="Certifications & Wholesale"
          title="Certified, boxed, and ready to distribute"
          description={wholesale.note}
        />

        {/* Certification badges */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <a
                href={c.file}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift flex h-full flex-col rounded-2xl border p-6"
                style={{ borderColor: COLOR.gray, background: COLOR.bg }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "#fff", color: COLOR.accent }}
                >
                  <Icon name="shield" />
                </span>
                <span
                  className="mt-4 text-lg leading-snug"
                  style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                >
                  {c.name}
                </span>
                <span className="mt-1 text-xs" style={{ color: COLOR.muted }}>
                  {c.region}
                </span>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: COLOR.accent }}
                >
                  Download PDF
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Carton / distributor table — stacked rows, mobile-safe. */}
        <Reveal delay={0.1} className="mt-10">
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ borderColor: COLOR.gray, background: COLOR.bg }}
          >
            <h3 className="text-xl" style={{ fontFamily: FONT.serif, color: COLOR.ink }}>
              Distributor pack data
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {wholesale.cartons.map((row) => (
                <div
                  key={row.model}
                  className="rounded-xl border bg-white p-5"
                  style={{ borderColor: COLOR.gray }}
                >
                  <span className="block text-base font-semibold" style={{ color: COLOR.ink }}>
                    {row.model}
                  </span>
                  <dl className="mt-3 space-y-2 text-sm" style={{ color: COLOR.body }}>
                    <div className="flex justify-between gap-3">
                      <dt style={{ color: COLOR.muted }}>Per carton</dt>
                      <dd className="font-medium text-right">{row.units}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt style={{ color: COLOR.muted }}>Carton size</dt>
                      <dd className="font-medium text-right">{row.carton}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt style={{ color: COLOR.muted }}>Weight</dt>
                      <dd className="font-medium text-right">{row.weight}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <a
              href={wholesale.cta.href}
              className="btn-lift btn-glow mt-6 inline-block rounded-full bg-[#4F46B5] px-6 py-3 text-sm font-medium text-white hover:bg-[#5A50C7]"
            >
              {wholesale.cta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 9 · Case studies ─────────────────────────── */

function CaseCard({ caseStudy, large = false }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(caseStudy.video);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    setPlaying(true);
  };
  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  const meta = [caseStudy.model, caseStudy.location].filter(Boolean).join(" · ");

  return (
    <figure className="group">
      <div
        className={`relative overflow-hidden rounded-2xl border ${
          large ? "aspect-video md:aspect-[21/9]" : "aspect-video"
        }`}
        style={{ borderColor: COLOR.gray, background: "#fff", cursor: hasVideo ? "pointer" : "default" }}
        onMouseEnter={hasVideo ? play : undefined}
        onMouseLeave={hasVideo ? pause : undefined}
        onClick={hasVideo ? (playing ? pause : play) : undefined}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            src={caseStudy.video}
            poster={caseStudy.poster}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
            aria-label={`${caseStudy.title} project video`}
          />
        ) : (
          <Image
            src={caseStudy.poster}
            alt={caseStudy.title}
            fill
            loading="lazy"
            quality={75}
            sizes={large ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.03]"
          />
        )}

        {/* Play hint — fades once the loop is running. */}
        {hasVideo ? (
          <span
            aria-hidden
            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm transition-opacity duration-300"
            style={{
              background: "rgba(16,15,18,0.55)",
              opacity: playing ? 0 : 1,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        ) : null}

        {caseStudy.featured ? (
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm"
            style={{ background: `${COLOR.bg}e6`, color: COLOR.accent }}
          >
            Flagship Project
          </span>
        ) : null}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span
          className={large ? "text-lg font-medium" : "text-[15px] font-medium"}
          style={{ color: COLOR.ink }}
        >
          {caseStudy.title}
        </span>
        {meta ? (
          <span className="text-[13px]" style={{ color: COLOR.muted }}>
            {meta}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

function CaseStudies({ product, index }) {
  const { cases } = product;
  const featured = cases.find((c) => c.featured) || cases[0];
  const rest = cases.filter((c) => c !== featured);

  return (
    <section
      id="cases"
      aria-label="Case studies"
      className={`${SECTION_SCROLL_MARGIN} py-16 md:py-24`}
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          index={index}
          eyebrow="Case Studies"
          title="Real installs, rolling"
          description="Hover (or tap) any project to play it."
        />

        <Reveal className="mt-12">
          <CaseCard caseStudy={featured} large />
        </Reveal>

        {rest.length ? (
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.07}>
                <CaseCard caseStudy={c} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ─────────────────────────────── 10 · FAQ ─────────────────────────────── */

function FaqItem({ item, open, onToggle, id }) {
  return (
    <div className="border-b" style={{ borderColor: COLOR.gray }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className="flex min-h-[48px] w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span
          className="text-base sm:text-lg"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          {item.q}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          className={`flex-none transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: COLOR.accent }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-sm leading-relaxed sm:text-base" style={{ color: COLOR.body }}>
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FAQ({ product, index }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className={`${SECTION_SCROLL_MARGIN} border-y bg-white py-16 md:py-24`}
      style={{ borderColor: COLOR.gray }}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-0">
        <SectionHeading
          index={index}
          eyebrow="FAQ"
          title="Questions, answered"
          align="center"
        />
        <Reveal delay={0.08} className="mt-10">
          <div className="border-t" style={{ borderColor: COLOR.gray }}>
            {product.faq.map((item, i) => (
              <FaqItem
                key={item.q}
                id={`faq-${i}`}
                item={item}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── 11 · CTA + related ───────────────────────── */

function CTASection({ product, related, index }) {
  const isRetail = product.productType === "retail";
  return (
    <section
      id="cta"
      aria-label="Get a quote and related products"
      className={`${SECTION_SCROLL_MARGIN} py-16 md:py-24`}
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Quote band */}
        <Reveal>
          <div
            className="rounded-3xl px-6 py-12 text-center sm:px-12 md:py-16"
            style={{ background: COLOR.ink }}
          >
            <h2
              className="mx-auto max-w-2xl text-2xl leading-tight text-white md:text-4xl"
              style={{ fontFamily: FONT.serif }}
            >
              {isRetail
                ? "Stock it, sell it, or light up your own storefront"
                : `Let's spec the ${product.name} for your space`}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              {isRetail
                ? "Unit pricing, carton pricing, or a reseller agreement — tell us what you're after and we'll come back within 24 hours."
                : "Send the glazing dimensions and viewing distance — we'll come back with the right pitch, a clear spec, and an indicative price within 24 hours."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={product.cta.primary.href}
                className="btn-lift btn-glow rounded-full bg-[#4F46B5] px-7 py-3 text-sm font-medium text-white hover:bg-[#5A50C7]"
              >
                {product.cta.primary.label}
              </a>
              <a
                href={product.cta.secondary.href}
                target={product.cta.secondary.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={product.cta.secondary.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                className="btn-lift rounded-full border border-white/40 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {product.cta.secondary.label}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cross-sell */}
        {related?.length ? (
          <div className="mt-16 md:mt-20">
            <SectionHeading
              index={index}
              eyebrow="Related Products"
              title="Also in the range"
            />
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {related.slice(0, 2).map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ─────────────────────────────── template ─────────────────────────────── */

export default function ProductDetailPage({ product, related }) {
  const isRetail = product.productType === "retail";

  const anchorSections = [
    { id: "what", label: "What it is" },
    { id: "models", label: "Specs" },
    { id: "applications", label: "Applications" },
    { id: "installation", label: isRetail ? "How it works" : "Installation" },
    { id: "cases", label: "Cases" },
    { id: "faq", label: "FAQ" },
  ];

  // Section eyebrows number themselves in render order, so the retail page's
  // extra section never leaves a gap in the sequence.
  let counter = 0;
  const num = () => String(++counter).padStart(2, "0");

  return (
    <div style={{ background: COLOR.bg }}>
      <HeroSection product={product} />
      <AnchorNav
        sections={anchorSections}
        ctaHref={product.cta.primary.href}
        ctaLabel={product.cta.primary.label}
      />
      <WhatIsIt product={product} index={num()} />
      <StatsBar stats={product.statsBar} />
      <Features product={product} index={num()} />
      <ModelsSpecs product={product} index={num()} />
      <SizeSplicing product={product} index={num()} />
      <ApplicationsGallery product={product} index={num()} />
      <Installation product={product} index={num()} />
      {product.certifications ? (
        <CertificationsWholesale product={product} index={num()} />
      ) : null}
      <CaseStudies product={product} index={num()} />
      <FAQ product={product} index={num()} />
      <CTASection product={product} related={related} index={num()} />
    </div>
  );
}
