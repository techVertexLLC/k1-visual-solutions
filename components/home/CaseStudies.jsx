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

const CASES = [
  {
    src: "/assets/images/cases/changchun-01.jpg",
    location: "Changchun · China",
    title: "Changchun Tech Park",
    description:
      "A transparent media facade wrapping the campus atrium — daylight passes through, motion graphics read clearly after dark.",
    alt: "Changchun Tech Park transparent LED media facade at dusk",
  },
  {
    src: "/assets/images/cases/changchun-02.jpg",
    location: "Changchun · China",
    title: "Changchun Tech Park — Atrium",
    description:
      "See-through poster screens line the interior concourse, layering live content over the glazing without blocking the view.",
    alt: "Interior atrium of Changchun Tech Park with transparent LED screens",
  },
  {
    src: "/assets/images/cases/mashan-01.jpg",
    location: "Mashan · China",
    title: "Mashan Resort",
    description:
      "Curved flexible film follows the resort's organic architecture, turning a sculpted wall into a calm, ambient light surface.",
    alt: "Mashan Resort curved flexible LED film installation",
  },
];

function CaseCard({ item, delay = 0 }) {
  return (
    <FadeUp delay={delay}>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
        style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            quality={78}
            sizes="(max-width: 768px) 100vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-7">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.24em]"
            style={{ color: COLOR.muted }}
          >
            {item.location}
          </span>
          <h3
            className="mt-3 text-2xl leading-snug"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            {item.title}
          </h3>
          <p
            className="mt-4 text-[15px] leading-relaxed"
            style={{ color: COLOR.body }}
          >
            {item.description}
          </p>
        </div>
      </article>
    </FadeUp>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="cases"
      className="scroll-mt-20 py-24 lg:py-32"
      style={{ background: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <FadeUp className="max-w-2xl">
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>02</span>
            <span aria-hidden className="h-px w-8" style={{ background: COLOR.muted }} />
            <span>Case Studies</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Light, set into real places
          </h2>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: COLOR.body }}
          >
            From a campus media facade to a resort's curved interior — a look at
            where K1 transparent and flexible displays are already at work.
          </p>
        </FadeUp>

        <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
          {CASES.map((item, i) => (
            <CaseCard key={item.title} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
