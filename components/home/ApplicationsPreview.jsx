"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "./tokens";
import { APPLICATIONS } from "@/lib/applications";

/**
 * Applications preview for the home page — the top four scenarios, linking
 * through to the full Solutions page. Warm-white label chips, no dark scrim.
 */

const TOP = APPLICATIONS.slice(0, 4);

function ApplicationCard({ item }) {
  return (
    <a
      href="/k1/solutions"
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        loading="lazy"
        quality={76}
        sizes="(max-width: 640px) 50vw, 25vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
          style={{ background: `${COLOR.bg}e6`, color: COLOR.ink }}
        >
          {item.label}
        </span>
      </div>
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
        <p className="mt-2 text-sm leading-relaxed" style={{ color: COLOR.ink }}>
          {item.description}
        </p>
      </div>
    </a>
  );
}

export default function ApplicationsPreview() {
  return (
    <section
      id="applications"
      className="scroll-mt-24 py-24 lg:py-32"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: COLOR.muted }}
            >
              <span style={{ color: COLOR.accent }}>03</span>
              <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
              <span>Applications</span>
            </div>
            <h2
              className="mt-6 text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Where vision meets space
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
              From café windows to building facades, the same transparent surface
              reads differently in every room it enters.
            </p>
          </div>

          <a
            href="/k1/solutions"
            className="group inline-flex flex-none items-center gap-2 text-sm font-medium"
            style={{ color: COLOR.accent }}
          >
            All solutions
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 md:mt-16 md:grid-cols-4 md:gap-6">
          {TOP.map((item, i) => (
            <Reveal key={item.label} delay={(i % 4) * 0.08}>
              <ApplicationCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
