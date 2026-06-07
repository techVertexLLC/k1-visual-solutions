"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import { APPLICATIONS } from "@/lib/applications";

/**
 * Full solutions / applications list. Each scenario gets an alternating
 * editorial row — render on one side, a short note on how transparent and
 * holographic LED serve that environment on the other.
 */

function SolutionRow({ item, index }) {
  const reversed = index % 2 === 1;
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <Reveal
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${reversed ? "md:order-2" : ""}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          quality={80}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover"
        />
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ border: `1px solid ${COLOR.gray}`, pointerEvents: "none" }}
          aria-hidden
        />
      </Reveal>

      <Reveal delay={0.1} className={reversed ? "md:order-1" : ""}>
        <span
          className="text-[11px] font-medium uppercase tracking-[0.28em]"
          style={{ color: COLOR.accent }}
        >
          {String(index + 1).padStart(2, "0")} — {item.label}
        </span>
        <h3
          className="mt-4 text-2xl leading-snug sm:text-3xl"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          {item.description}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
          {item.detail}
        </p>
        <a
          href="/k1/contact"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: COLOR.accent }}
        >
          Discuss this application
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </Reveal>
    </div>
  );
}

export default function SolutionsList() {
  return (
    <section className="py-20 lg:py-28" style={{ background: COLOR.bg }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="space-y-20 md:space-y-28">
          {APPLICATIONS.map((item, i) => (
            <SolutionRow key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
