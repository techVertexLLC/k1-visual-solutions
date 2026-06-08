"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import ProductGallery from "./ProductGallery";
import ProductCard from "./ProductCard";
import { CheckIcon } from "@/components/ui/icons";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import { CATEGORY_LABEL } from "@/lib/products";

/**
 * Product detail body. Information hierarchy is deliberately value-first:
 * the scene-based value proposition leads, then three key benefits, then the
 * quote CTA, with the full specification table tucked into a collapsible block
 * further down — so a visitor reads "why this fits my space" before any numbers.
 * Server-safe data is passed in as props from the (static) route.
 */
export default function ProductDetail({ product, related }) {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Three lead benefits drawn from the full feature list — shown as an
  // at-a-glance icon row beneath the value proposition.
  const keyBenefits = product.features.slice(0, 3);

  // The H1 carries the product name; for products whose name doesn't already
  // say so, we append a quiet "Transparent LED Display" descriptor line — an
  // accurate, keyword-bearing subtitle that reads naturally within the heading.
  const showTypeSuffix = !/transparent/i.test(product.name);

  return (
    <div style={{ background: COLOR.bg }}>
      {/* Overview: gallery + value-first summary */}
      <section className="py-16 md:py-24" aria-label={`${product.name} overview`}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ color: COLOR.muted }}
          >
            <a href="/" className="hover:opacity-70">Home</a>
            <span aria-hidden>/</span>
            <a href="/products" className="hover:opacity-70">Products</a>
            <span aria-hidden>/</span>
            <span style={{ color: COLOR.body }}>{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ProductGallery images={product.gallery} name={product.name} />
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col justify-center">
              <article>
                <span
                  className="inline-block w-fit rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
                  style={{ background: COLOR.gray, color: COLOR.accent }}
                >
                  {CATEGORY_LABEL[product.category]}
                </span>
                <h1
                  className="mt-5 text-3xl leading-tight md:text-5xl"
                  style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                >
                  {product.name}
                  {showTypeSuffix && (
                    <span
                      className="mt-2 block text-lg font-normal md:text-xl"
                      style={{ color: COLOR.muted }}
                    >
                      Transparent LED Display
                    </span>
                  )}
                </h1>

                {/* Value proposition — the first thing a visitor reads */}
                <p
                  className="mt-6 text-lg leading-relaxed"
                  style={{ color: COLOR.body }}
                >
                  {product.valueProposition || product.description}
                </p>

                {/* Key benefits — three at-a-glance highlights */}
                <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                  {keyBenefits.map((b) => (
                    <li
                      key={b}
                      className="flex flex-col gap-2 rounded-xl p-4"
                      style={{ background: "#fff", border: `1px solid ${COLOR.gray}` }}
                    >
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full p-1"
                        style={{ background: COLOR.gray, color: COLOR.accent }}
                        aria-hidden
                      >
                        <CheckIcon />
                      </span>
                      <span className="text-[13px] leading-snug" style={{ color: COLOR.body }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                    style={{ background: COLOR.accent }}
                  >
                    Request a Quote
                  </a>
                  <a
                    href="/products"
                    className="group inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: COLOR.ink, color: COLOR.ink }}
                  >
                    All products
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Detail: description, collapsible specs + features */}
      <section
        className="py-16 md:py-24"
        style={{ background: COLOR.gray }}
        aria-label={`${product.name} specifications and features`}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-10">
          {/* Description + collapsible specs */}
          <Reveal>
            <article>
              <h2
                className="text-2xl leading-snug md:text-4xl"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                Overview
              </h2>
              <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
                {product.description}
              </p>
            </article>

            {/* Full specifications — collapsible so the numbers sit below the story */}
            <details className="group mt-8" open>
              <summary
                className="flex cursor-pointer list-none items-center justify-between rounded-xl px-5 py-4 text-sm font-medium"
                style={{ background: "#fff", border: `1px solid #D4CFC8`, color: COLOR.ink }}
              >
                Full specifications
                <span
                  className="transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                  style={{ color: COLOR.muted }}
                >
                  ▾
                </span>
              </summary>
              <dl
                className="mt-3 overflow-hidden rounded-2xl"
                style={{ border: `1px solid #D4CFC8`, background: "#fff" }}
              >
                {Object.entries(product.specs).map(([label, value], i) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 px-5 py-3.5"
                    style={{
                      borderTop: i === 0 ? "none" : `1px solid ${COLOR.gray}`,
                    }}
                  >
                    <dt className="text-sm" style={{ color: COLOR.muted }}>
                      {label}
                    </dt>
                    <dd className="text-right text-sm font-medium" style={{ color: COLOR.ink }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          </Reveal>

          {/* Features */}
          <Reveal delay={0.1}>
            <h2
              className="text-2xl leading-snug md:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Features &amp; advantages
            </h2>
            <ul className="mt-6 space-y-4">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full p-0.5"
                    style={{ background: "#fff", color: COLOR.accent, border: `1px solid #D4CFC8` }}
                  >
                    <CheckIcon />
                  </span>
                  <span className="text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Application scenarios */}
      {product.applications?.length > 0 && (
        <section
          className="py-16 md:py-24"
          style={{ background: COLOR.bg }}
          aria-label={`Where the ${product.name} works`}
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal className="max-w-2xl">
              <h2
                className="text-2xl leading-snug md:text-4xl"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                Where it works
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: COLOR.body }}>
                Environments this transparent LED display is built for.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {product.applications.map((app, i) => (
                <Reveal key={app.label} delay={i * 0.08}>
                  <div
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                    style={{ border: `1px solid ${COLOR.gray}` }}
                  >
                    <Image
                      src={app.src}
                      alt={`${product.name} — ${app.label}`}
                      fill
                      loading="lazy"
                      quality={74}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm"
                        style={{ background: `${COLOR.bg}e6`, color: COLOR.ink }}
                      >
                        {app.label}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {related?.length > 0 && (
        <section
          className="py-16 md:py-24"
          style={{ background: COLOR.gray }}
          aria-label="Related products"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal className="max-w-2xl">
              <h2
                className="text-2xl leading-snug md:text-4xl"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                Related products
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="px-6 py-16 md:py-24 lg:px-10"
        style={{ background: COLOR.bg }}
        aria-label="Request a quote"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div
              className="overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-12"
              style={{ background: COLOR.gray }}
            >
              <h2
                className="mx-auto max-w-2xl text-3xl leading-tight md:text-4xl"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                Interested in the {product.name}?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed" style={{ color: COLOR.body }}>
                Tell us about your space and we'll come back with a tailored spec
                and an indicative price.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                  style={{ background: COLOR.accent }}
                >
                  Request a Quote
                </a>
                <a
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: COLOR.ink, color: COLOR.ink }}
                >
                  Explore More Products
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky mobile CTA — appears after scrolling past hero */}
      {showSticky && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 px-5 py-4 shadow-2xl md:hidden"
          style={{ background: "#fff", borderTop: "1px solid " + COLOR.gray }}
        >
          <span className="truncate text-sm font-medium" style={{ color: COLOR.ink }}>
            {product.name}
          </span>
          <a
            href="/contact"
            className="flex-none rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: COLOR.accent }}
          >
            Request a Quote
          </a>
        </div>
      )}
    </div>
  );
}
