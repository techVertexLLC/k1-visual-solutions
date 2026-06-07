"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "./tokens";
import { CASES } from "@/lib/cases";

/**
 * Case studies preview — the top two installations shown in full, with the
 * remaining projects offered through an expandable reveal so the home page stays
 * focused but the depth is one click away.
 */

import { useState } from "react";

function CaseCard({ item }) {
  const [primary, ...secondary] = item.images;
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={primary.src}
          alt={primary.alt}
          fill
          loading="lazy"
          quality={78}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        {secondary.length > 0 && (
          <div className="mb-5 flex gap-3">
            {secondary.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] w-20 flex-none overflow-hidden rounded-md sm:w-24"
                style={{ border: `1px solid ${COLOR.gray}` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  quality={64}
                  sizes="96px"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
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
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default function CaseStudiesPreview() {
  const [expanded, setExpanded] = useState(false);
  const top = CASES.slice(0, 2);
  const rest = CASES.slice(2);

  return (
    <section
      id="cases"
      className="scroll-mt-24 py-24 lg:py-32"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>02</span>
            <span aria-hidden className="h-px w-8" style={{ background: "#D4CFC8" }} />
            <span>Case Studies</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Light, set into real places
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
            From a campus media facade to a resort's curved interior — a look at
            where K1 transparent and flexible displays are already at work.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {top.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>

        {expanded && rest.length > 0 && (
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-10">
            {rest.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <CaseCard item={item} />
              </Reveal>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: COLOR.ink, color: COLOR.ink }}
            >
              {expanded ? "Show fewer projects" : "View more projects"}
              <span
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
