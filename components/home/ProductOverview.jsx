"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COLOR, FONT, BLUR } from "./tokens";

/* Fade-in-up as the element scrolls into view. Once only, no repeat flicker. */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* A quiet spec row — label left, value right, hairline divider between. */
function Spec({ label, value }) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 border-t py-3 first:border-t-0 first:pt-0"
      style={{ borderColor: COLOR.gray }}
    >
      <dt
        className="text-[11px] uppercase tracking-[0.16em]"
        style={{ color: COLOR.muted }}
      >
        {label}
      </dt>
      <dd
        className="text-right text-sm font-medium"
        style={{ color: COLOR.ink }}
      >
        {value}
      </dd>
    </div>
  );
}

/* Smooth scroll to an in-page section. */
const scrollTo = (id) => (e) => {
  e.preventDefault();
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* Tertiary, text-only action carrying the lone accent — links through to the
   quote form (S3: every "Learn More" is now a real, clickable anchor). */
function LearnMore() {
  return (
    <a
      href="#contact"
      onClick={scrollTo("contact")}
      className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide"
      style={{ color: COLOR.accent }}
    >
      Learn More
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/* Shared card chrome: hairline border, soft radius, a millimetre of lift. */
function Card({ children, delay = 0 }) {
  return (
    <FadeUp delay={delay}>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
        style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
      >
        {children}
      </article>
    </FadeUp>
  );
}

function CardBody({ series, title, description, specs }) {
  return (
    <div className="flex flex-1 flex-col p-7 sm:p-8">
      <span
        className="text-[11px] font-medium uppercase tracking-[0.24em]"
        style={{ color: COLOR.muted }}
      >
        {series}
      </span>
      <h3
        className="mt-3 text-2xl leading-snug"
        style={{ fontFamily: FONT.serif, color: COLOR.ink }}
      >
        {title}
      </h3>
      <p
        className="mt-4 text-[15px] leading-relaxed"
        style={{ color: COLOR.body }}
      >
        {description}
      </p>

      <dl className="mt-7">
        {specs.map((s) => (
          <Spec key={s.label} label={s.label} value={s.value} />
        ))}
      </dl>

      <div
        className="mt-7 flex items-center border-t pt-5"
        style={{ borderColor: COLOR.gray }}
      >
        <LearnMore />
      </div>
    </div>
  );
}

/* Series F has no photograph yet — an elegant single-weight line drawing of a
   flexible LED film standing in until product photography is shot. Warm gray
   field, no gradient, no glow. */
function FilmSilhouette() {
  return (
    <div
      className="flex aspect-[4/3] items-center justify-center"
      style={{ background: COLOR.gray }}
    >
      <svg
        viewBox="0 0 240 180"
        className="h-auto w-3/4"
        fill="none"
        role="img"
        aria-label="Illustration of a thin, flexible LED film curving gently"
      >
        {/* the two long edges of a gently flexing sheet */}
        <path
          d="M26 66 C 78 30 162 118 214 76"
          stroke={COLOR.muted}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M26 96 C 78 60 162 148 214 106"
          stroke={COLOR.muted}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* end caps, to read as a thin film with depth */}
        <path d="M26 66 L 26 96" stroke={COLOR.muted} strokeWidth="1.25" strokeLinecap="round" />
        <path d="M214 76 L 214 106" stroke={COLOR.muted} strokeWidth="1.25" strokeLinecap="round" />
        {/* faint cross-ribs hinting at a roll of flexible film */}
        {[
          { x: 68, top: 62 },
          { x: 110, top: 56 },
          { x: 152, top: 64 },
        ].map(({ x, top }) => (
          <path
            key={x}
            d={`M${x} ${top} q 0 16 0 30`}
            stroke={COLOR.muted}
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeLinecap="round"
          />
        ))}
        {/* a sparse LED dot-matrix wash across the sheet */}
        <g fill={COLOR.muted} fillOpacity="0.5">
          {Array.from({ length: 5 }).flatMap((_, r) =>
            Array.from({ length: 10 }).map((__, c) => (
              <circle
                key={`${r}-${c}`}
                cx={40 + c * 17}
                cy={74 + r * 7 + Math.sin((c / 10) * Math.PI) * -22}
                r="0.9"
              />
            ))
          )}
        </g>
      </svg>
    </div>
  );
}

/* Detail shots — different pitches, angles, and finishes of the transparent
   poster screen. A quiet, horizontally scrollable strip beneath the two cards.
   Leads with two full product photographs, then the 800px angle thumbnails. */
const GALLERY = [
  {
    src: "/assets/images/products/smd-p625-new-02.jpg",
    alt: "K1 P6.25 transparent LED poster screen, detail",
  },
  {
    src: "/assets/images/products/smd-p104-new-02.jpg",
    alt: "K1 P10.4 transparent LED poster screen, detail",
  },
  ...Array.from({ length: 8 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `/assets/images/thumbs/product-${n}.jpg`,
      alt: `K1 transparent LED panel, angle ${i + 1}`,
    };
  }),
];

function ProductGallery() {
  return (
    <FadeUp className="mt-12 md:mt-16">
      <div
        className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em]"
        style={{ color: COLOR.muted }}
      >
        <span>Detail &amp; finish — every angle</span>
        <span aria-hidden className="h-px flex-1" style={{ background: COLOR.gray }} />
      </div>
      <div
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 lg:-mx-10 lg:px-10"
        style={{ scrollbarWidth: "thin" }}
      >
        {GALLERY.map((item) => (
          <div
            key={item.src}
            className="group relative aspect-square w-36 flex-none snap-start overflow-hidden rounded-xl sm:w-40"
            style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              quality={70}
              sizes="160px"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </div>
        ))}
      </div>
    </FadeUp>
  );
}

export default function ProductOverview() {
  return (
    <section
      id="products"
      className="scroll-mt-20 py-24 lg:py-32"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Section header */}
        <FadeUp className="max-w-2xl">
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>01</span>
            <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
            <span>Our Technology</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Two ways to bring light into glass
          </h2>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: COLOR.body }}
          >
            A rigid transparent poster screen and a self-adhesive flexible film —
            engineered to disappear into architecture and reappear as motion,
            colour, and presence.
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
          {/* Series T — Transparent Poster Screen (real photography) */}
          <Card>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/images/products/smd-p391-new-01.jpg"
                alt="K1 Series T transparent poster screen, freestanding in a studio"
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <CardBody
              series="Series T"
              title="Transparent Poster Screen"
              description="A freestanding, see-through LED poster that turns any window or floor space into a high-clarity display — without walling off the light or the view behind it."
              specs={[
                { label: "Pixel pitch", value: "P3.91 · P6.25 · P10.4" },
                { label: "Transparency", value: "Up to 90%" },
                { label: "Brightness", value: "4,500 nits" },
              ]}
            />
          </Card>

          {/* Series F — Flexible LED Film (illustrated placeholder) */}
          <Card delay={0.1}>
            <FilmSilhouette />
            <CardBody
              series="Series F"
              title="Flexible LED Film"
              description="A self-adhesive LED film just millimetres thin that bends to curved glass and columns, peels into place, and conforms to surfaces a rigid panel never could."
              specs={[
                { label: "Pixel pitch", value: "P2.5 – P6 (indicative)" },
                { label: "Transparency", value: "Up to 85%" },
                { label: "Thickness · bend", value: "~4 mm · 6 cm radius" },
              ]}
            />
          </Card>
        </div>

        {/* Product thumbnail gallery */}
        <ProductGallery />
      </div>
    </section>
  );
}
