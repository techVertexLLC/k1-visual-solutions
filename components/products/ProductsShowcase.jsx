import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import { getAllProducts } from "@/lib/products";

/**
 * ProductsShowcase — the /products listing redesign (spec §8).
 *
 * Replaces the old card-wall + series filter with three full-width product
 * cards stacked vertically (one per product line, ~60vh on desktop: visual on
 * one side, name + positioning line + three key figures + CTA on the other),
 * followed by a "Which one do I need?" comparison.
 *
 * The comparison renders twice: a real <table> from md up, and stacked
 * label:value cards below md — no horizontal scrolling on mobile.
 */

const PRODUCTS = getAllProducts();

/* Card visual per line (spec §8): street retail window for Crystal Film,
   the lit/unlit render pair for Holographic, the coffee-shop scene for Soft. */
const CARD_VISUALS = {
  "crystal-film": {
    src: "/assets/images/cases/case-sk-retail-p6.jpg",
    alt: "Street-front retail window running bright content on transparent Crystal Film LED",
  },
  holographic: {
    src: "/assets/images/products/holo-render-08.jpg",
    alt: "Two SMD holographic invisible screens side by side, one lit and one transparent",
  },
  "soft-led-display": {
    src: "/assets/images/products/matrix-panel/scenario-coffee-shop.jpg",
    alt: "Soft LED display sign glowing in a coffee shop window at night",
  },
};

/* "Which one do I need?" rows — values in PRODUCTS array order
   (crystal-film, holographic, soft-led-display). Figures from spec §5.5/6.5/7.5. */
const COMPARE_ROWS = [
  {
    label: "Form factor",
    values: [
      "Project-engineered film, quoted per m²",
      "Project-engineered mesh, quoted per m²",
      "Plug-and-play sign, sold per unit",
    ],
  },
  {
    label: "Pixel pitch / matrix",
    values: ["P6.25 – P20", "P2.5 – P10", "16-dot matrix · 35″ / 52″ / 70″"],
  },
  {
    label: "Transparency",
    values: ["90 – 95%", "70 – 93%", "—"],
  },
  {
    label: "Thickness",
    values: ["2.5 mm", "< 3 mm", "Flexible soft body"],
  },
  {
    label: "Viewing distance",
    values: ["≥ 6 – 20 m", "≥ 2.5 – 10 m", "Close range — storefront passers-by"],
  },
  {
    label: "Typical setting",
    values: [
      "Building facades & large glazing",
      "Premium windows & showrooms",
      "Small-business storefronts",
    ],
  },
  {
    label: "Relative price",
    values: ["$$$", "$$$", "$"],
  },
];

function ProductRow({ product, index }) {
  const visual = CARD_VISUALS[product.slug] || { src: product.cardImage, alt: product.name };
  const stats = product.hero?.stats || [];
  const flipped = index % 2 === 1;

  return (
    <Reveal>
      <article
        className="grid overflow-hidden rounded-3xl shadow-card transition-shadow duration-300 hover:shadow-card-hover lg:min-h-[60vh] lg:grid-cols-2"
        style={{ background: "#fff", border: `1px solid ${COLOR.gray}` }}
      >
        {/* Visual — links straight to the detail page */}
        <a
          href={`/products/${product.slug}`}
          className={`group relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-full ${
            flipped ? "lg:order-2" : ""
          }`}
          aria-label={`View ${product.name}`}
        >
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
            quality={82}
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
          />
        </a>

        {/* Copy */}
        <div className={`flex flex-col justify-center p-8 md:p-12 lg:p-14 ${flipped ? "lg:order-1" : ""}`}>
          <span
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: COLOR.accent }}
          >
            {product.productType === "retail"
              ? "Retail product · Plug & play"
              : "Project solution · Engineered per project"}
          </span>

          <h2
            className="mt-4 text-3xl leading-tight md:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            {product.name}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: COLOR.body }}>
            {product.tagline}
          </p>

          {/* Three key figures */}
          {stats.length > 0 && (
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt
                    className="order-2 mt-1 text-[11px] font-medium uppercase tracking-[0.12em]"
                    style={{ color: COLOR.muted }}
                  >
                    {s.label}
                  </dt>
                  <dd
                    className="text-xl font-medium md:text-2xl"
                    style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`/products/${product.slug}`}
              className="btn-lift btn-glow inline-flex items-center gap-2 rounded-full bg-[#4F46B5] px-6 py-3 text-sm font-medium text-white hover:bg-[#5A50C7]"
            >
              View Product
              <span aria-hidden>→</span>
            </a>
            <a
              href={product.cta?.primary?.href || "/contact"}
              className="btn-lift inline-flex items-center rounded-full border border-[#E8E4DF] px-6 py-3 text-sm font-medium text-[#1A1A1A] hover:border-[#4F46B5] hover:bg-[#4F46B5]/[0.05] hover:text-[#4F46B5]"
            >
              {product.cta?.primary?.label || "Request a Quote"}
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* Comparison — desktop table (md+). */
function CompareTable() {
  return (
    <div
      className="hidden overflow-hidden rounded-2xl md:block"
      style={{ background: "#fff", border: `1px solid ${COLOR.gray}` }}
    >
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Key specification differences between the three K1 product lines
        </caption>
        <thead>
          <tr style={{ background: COLOR.gray }}>
            <th scope="col" className="w-[18%] px-6 py-5" />
            {PRODUCTS.map((p) => (
              <th key={p.slug} scope="col" className="px-6 py-5 align-bottom">
                <a
                  href={`/products/${p.slug}`}
                  className="text-lg leading-snug hover:underline"
                  style={{ fontFamily: FONT.serif, color: COLOR.ink, fontWeight: 400 }}
                >
                  {p.name}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row) => (
            <tr key={row.label} className="border-t" style={{ borderColor: COLOR.gray }}>
              <th
                scope="row"
                className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: COLOR.muted }}
              >
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td
                  key={PRODUCTS[i].slug}
                  className="px-6 py-4 text-[15px] leading-relaxed"
                  style={{ color: COLOR.body }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t" style={{ borderColor: COLOR.gray }}>
            <td className="px-6 py-5" />
            {PRODUCTS.map((p) => (
              <td key={p.slug} className="px-6 py-5">
                <a
                  href={`/products/${p.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  style={{ color: COLOR.accent }}
                >
                  View Product <span aria-hidden>→</span>
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* Comparison — mobile: one stacked card per product, label:value rows.
   No table, no horizontal scrolling (spec §4 interaction rule ①). */
function CompareCards() {
  return (
    <div className="space-y-5 md:hidden">
      {PRODUCTS.map((p, i) => (
        <section
          key={p.slug}
          className="overflow-hidden rounded-2xl"
          style={{ background: "#fff", border: `1px solid ${COLOR.gray}` }}
          aria-label={`${p.name} key specs`}
        >
          <h3
            className="px-5 py-4 text-lg"
            style={{ fontFamily: FONT.serif, color: COLOR.ink, background: COLOR.gray }}
          >
            {p.name}
          </h3>
          <dl>
            {COMPARE_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[40%_1fr] gap-3 border-t px-5 py-3"
                style={{ borderColor: COLOR.gray }}
              >
                <dt
                  className="text-[11px] font-medium uppercase leading-relaxed tracking-[0.1em]"
                  style={{ color: COLOR.muted }}
                >
                  {row.label}
                </dt>
                <dd className="text-sm leading-relaxed" style={{ color: COLOR.body }}>
                  {row.values[i]}
                </dd>
              </div>
            ))}
          </dl>
          <div className="border-t px-5 py-4" style={{ borderColor: COLOR.gray }}>
            <a
              href={`/products/${p.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: COLOR.accent }}
            >
              View Product <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function ProductsShowcase() {
  return (
    <>
      {/* Three full-width product cards */}
      <section aria-label="Product range" style={{ background: COLOR.bg }}>
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-16 md:space-y-14 md:py-20 lg:px-10">
          {PRODUCTS.map((product, i) => (
            <ProductRow key={product.slug} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Which one do I need? */}
      <section
        id="compare"
        aria-label="Product comparison"
        className="scroll-mt-32 py-16 md:py-24"
        style={{ background: COLOR.gray }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: COLOR.accent }}
            >
              Compare the range
            </span>
            <h2
              className="mt-4 text-2xl leading-tight md:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Which one do I need?
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
              Crystal Film and Holographic are engineered glass-bonded systems —
              choose by viewing distance and pixel density. The Soft LED Display
              is a finished product: unbox it, stick it up, and it plays. Here is
              how the three lines sit side by side.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <CompareTable />
            <CompareCards />
          </Reveal>

          <Reveal className="mt-10">
            <p className="text-sm leading-relaxed" style={{ color: COLOR.muted }}>
              Still unsure? Send us your glazing dimensions and viewing distance —{" "}
              <a href="/contact" className="underline underline-offset-2" style={{ color: COLOR.accent }}>
                we'll spec the right system
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
