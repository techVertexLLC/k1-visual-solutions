"use client";

import Reveal from "./ui/Reveal";
import {
  TransparencyIcon,
  FlexIcon,
  AdhesiveIcon,
  DualDriveIcon,
} from "./ui/icons";

const FEATURES = [
  {
    icon: TransparencyIcon,
    title: "Ultra Transparency",
    metric: "70%–95%",
    body: "See-through panels keep sightlines and natural light intact — content floats on glass with no visible structure behind it.",
  },
  {
    icon: FlexIcon,
    title: "Flexible & Bendable",
    metric: "6 cm radius",
    body: "Conform to curved columns, domes, and organic architecture with a minimum bend radius of just 6 cm — no rigid framing required.",
  },
  {
    icon: AdhesiveIcon,
    title: "Self-Adhesive & Light",
    metric: "~4 mm thin",
    body: "Peel-and-stick installation at roughly 4 mm thickness and 3–6 kg/m². Mounts straight to glass — no brackets, no scaffolding.",
  },
  {
    icon: DualDriveIcon,
    title: "Dual-Drive Continuation",
    metric: "Zero blackout",
    body: "Breakpoint-continuation dual-drive circuitry means a single point of failure never takes the display down. The show goes on.",
  },
];

export default function TechHighlights() {
  return (
    <section
      id="technology"
      className="relative border-t border-white/5 bg-ink-800 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">
            Core Technology
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Four advantages engineered into every panel
          </h2>
          <p className="mt-4 text-base text-white/60">
            The hardware language behind invisible displays — clarity,
            flexibility, weightlessness, and resilience.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.08}>
                <article className="led-border group relative h-full rounded-2xl bg-ink-700/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gradient/10 p-3 text-electric-cyan shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:animate-led-pulse">
                    <Icon />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
                    {f.metric}
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
