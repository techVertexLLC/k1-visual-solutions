"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import FilmPlaceholder from "@/components/ui/FilmPlaceholder";
import { TransparencyIcon, PosterIcon, FlexIcon } from "@/components/ui/icons";
import { COLOR, FONT, BLUR } from "./tokens";

/**
 * "Our Technology" — the content-rich heart of the home page. Three display
 * technologies explained with a real photograph (or an illustrated stand-in),
 * a short diagram-style icon, and a concise note on how each one works and
 * where it fits. Alternating editorial rows on a warm-white canvas.
 */

const TECHS = [
  {
    n: "01",
    Icon: TransparencyIcon,
    label: "Transparent LED",
    title: "See-through screens that keep the view",
    body: "A grid of fine LEDs mounted on slim conductors leaves most of the surface clear, so daylight and sightlines pass straight through. Powered off, the panel reads as glass; powered on, it carries full-motion content without walling off the space behind it. Ideal for storefront windows, atriums, and curtain walls.",
    points: ["Up to 90% transparency", "4,500–6,500 nits brightness", "Front & rear maintenance"],
    image: "/k1/assets/images/products/smd-p391-02.jpg",
    alt: "Transparent LED poster screen in a calm, light studio space",
  },
  {
    n: "02",
    Icon: PosterIcon,
    label: "Holographic LED",
    title: "Depth and motion, floating on clear glass",
    body: "Holographic panels pair a transparent LED surface with high-contrast, depth-rich content to give the impression of an image suspended in mid-air. Three pixel pitches — P3.91, P6.25 and P10.4 — let you tune the balance between close-range sharpness and large-format transparency for the viewing distance of the room.",
    points: ["P3.91 · P6.25 · P10.4", "High-contrast depth effect", "160° wide viewing angle"],
    image: "/k1/assets/images/products/smd-p625-01.jpg",
    alt: "SMD holographic LED panel rendering depth on clear glass",
  },
  {
    n: "03",
    Icon: FlexIcon,
    label: "Flexible LED Film",
    title: "A display you can bend and peel into place",
    body: "Just millimetres thin and self-adhesive, flexible LED film conforms to curved glass, columns, and surfaces a rigid panel never could. It applies directly to existing glazing with no added frame or structure, and all but disappears when powered off — turning architecture itself into a living surface.",
    points: ["≈ 4 mm thin, self-adhesive", "Bends to a 6 cm radius", "Up to 88% transparency"],
    image: null,
    alt: "Flexible LED film curving gently",
  },
];

function TechRow({ tech, index }) {
  const reversed = index % 2 === 1;
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      {/* Media */}
      <Reveal
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${reversed ? "md:order-2" : ""}`}
      >
        <div
          className="absolute inset-0"
          style={{ border: `1px solid ${COLOR.gray}`, borderRadius: "1rem", zIndex: 1, pointerEvents: "none" }}
          aria-hidden
        />
        {tech.image ? (
          <Image
            src={tech.image}
            alt={tech.alt}
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />
        ) : (
          <FilmPlaceholder />
        )}
      </Reveal>

      {/* Copy */}
      <Reveal delay={0.1} className={reversed ? "md:order-1" : ""}>
        <div
          className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em]"
          style={{ color: COLOR.muted }}
        >
          <span style={{ color: COLOR.accent }}>{tech.n}</span>
          <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
          <span>{tech.label}</span>
        </div>

        <div
          className="mt-6 flex h-11 w-11 items-center justify-center rounded-xl p-2.5"
          style={{ background: COLOR.gray, color: COLOR.accent }}
        >
          <tech.Icon />
        </div>

        <h3
          className="mt-5 text-2xl leading-snug sm:text-3xl"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          {tech.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
          {tech.body}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {tech.points.map((p) => (
            <li
              key={p}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium"
              style={{ background: COLOR.gray, color: COLOR.ink }}
            >
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export default function Technology() {
  return (
    <section
      id="technology"
      className="scroll-mt-24 py-24 lg:py-32"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
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
            Three ways to bring light into glass
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
            Transparent, holographic, and flexible LED — each engineered to
            disappear into architecture and reappear as motion, colour, and
            presence. Here is how each one works.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          {TECHS.map((tech, i) => (
            <TechRow key={tech.label} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
