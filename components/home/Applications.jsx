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

/* Each environment a K1 display has been imagined into. KeyShot renders, one
   label and one calm line of copy per scene. */
const APPLICATIONS = [
  {
    src: "/k1/assets/images/applications/app-cafe.jpg",
    label: "Hospitality",
    description: "See-through screens that warm a café without crowding it.",
    alt: "Transparent LED display in a bright café interior",
  },
  {
    src: "/k1/assets/images/applications/app-architecture.jpg",
    label: "Architecture",
    description: "Media facades that let daylight and the building through.",
    alt: "Architectural glass facade with an integrated LED display",
  },
  {
    src: "/k1/assets/images/applications/app-retail.jpg",
    label: "Retail",
    description: "Storewide motion that never walls off the merchandise.",
    alt: "Retail store interior with a transparent LED display",
  },
  {
    src: "/k1/assets/images/applications/app-lobby.jpg",
    label: "Corporate",
    description: "A composed welcome across a lobby's glazing.",
    alt: "Hotel and office lobby with a transparent LED display",
  },
  {
    src: "/k1/assets/images/applications/app-shadow.jpg",
    label: "Entertainment",
    description: "Silhouette and depth, played out through clear glass.",
    alt: "Silhouette effect seen through a transparent LED display",
  },
  {
    src: "/k1/assets/images/applications/app-signage.jpg",
    label: "Digital Signage",
    description: "Wayfinding and messaging that read at a glance.",
    alt: "Digital signage application on a transparent LED display",
  },
  {
    src: "/k1/assets/images/applications/app-storefront.jpg",
    label: "Storefront",
    description: "Window content that pulls the street in, day or night.",
    alt: "Storefront window with a transparent LED display",
  },
  {
    src: "/k1/assets/images/applications/app-product-display.jpg",
    label: "Product Display",
    description: "Hero products framed in light, not hidden behind it.",
    alt: "Product showcase lit by a transparent LED display",
  },
];

function ApplicationCard({ item, delay = 0 }) {
  return (
    <FadeUp delay={delay}>
      <article
        className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
        style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          quality={76}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Resting state: warm-white label chip at the foot, no dark scrim. */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
            style={{ background: `${COLOR.bg}e6`, color: COLOR.ink }}
          >
            {item.label}
          </span>
        </div>

        {/* Hover state: a warm-white overlay carrying label + description. */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(0deg, ${COLOR.bg}f2 0%, ${COLOR.bg}cc 38%, ${COLOR.bg}00 78%)`,
          }}
        >
          <span
            className="text-[11px] font-medium uppercase tracking-[0.24em]"
            style={{ color: COLOR.accent }}
          >
            {item.label}
          </span>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: COLOR.ink }}
          >
            {item.description}
          </p>
        </div>
      </article>
    </FadeUp>
  );
}

export default function Applications() {
  return (
    <section
      id="applications"
      className="scroll-mt-20 py-24 lg:py-32"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <FadeUp className="max-w-2xl">
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>02</span>
            <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
            <span>Applications</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Where vision meets space
          </h2>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: COLOR.body }}
          >
            From café windows to building facades, the same transparent surface
            reads differently in every room it enters. A few of the spaces K1
            displays are made for.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-2 gap-5 md:mt-20 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {APPLICATIONS.map((item, i) => (
            <ApplicationCard
              key={item.label}
              item={item}
              delay={(i % 4) * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
