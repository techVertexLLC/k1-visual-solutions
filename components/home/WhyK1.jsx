"use client";

import Reveal from "@/components/ui/Reveal";
import { CheckIcon, TransparencyIcon, AdhesiveIcon, PinIcon } from "@/components/ui/icons";
import { COLOR, FONT } from "./tokens";

/**
 * "Why K1" — the value proposition. Four quiet points, each with a line-drawn
 * icon, on a warm-white canvas. No claims we can't stand behind.
 */

const VALUES = [
  {
    Icon: TransparencyIcon,
    title: "Premium technology",
    body: "We source next-generation transparent, holographic, and flexible LED systems and specify them honestly — no over-claiming, no surprises on site.",
  },
  {
    Icon: CheckIcon,
    title: "Specified to install",
    body: "Every system ships with clear mounting and wiring documentation, so integrators know exactly how the panels carry, align, and connect before they arrive.",
  },
  {
    Icon: AdhesiveIcon,
    title: "End-to-end support",
    body: "From first quote to final commissioning, we stay involved — sizing the display, matching the pitch to the room, and standing behind the result.",
  },
  {
    Icon: PinIcon,
    title: "North American distribution",
    body: "Based in Markham, Ontario, we serve architects, retail brands, and system integrators across North America with local accountability.",
  },
];

export default function WhyK1() {
  return (
    <section
      id="why"
      className="scroll-mt-24 py-24 lg:py-32"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>05</span>
            <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
            <span>Why K1</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            A partner, not just a supplier
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
            We make the technology easy to specify and easy to trust — the right
            product, an honest spec, and support that lasts past the invoice.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
          style={{ background: COLOR.gray, border: `1px solid ${COLOR.gray}` }}
        >
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={(i % 4) * 0.07}>
              <div className="flex h-full flex-col p-8" style={{ background: "#fff" }}>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl p-2.5"
                  style={{ background: COLOR.gray, color: COLOR.accent }}
                >
                  <v.Icon />
                </div>
                <h3
                  className="mt-5 text-lg leading-snug"
                  style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                >
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: COLOR.body }}>
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
