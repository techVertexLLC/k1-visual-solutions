"use client";

import Reveal from "./ui/Reveal";
import {
  RetailIcon,
  FacadeIcon,
  ExhibitionIcon,
  EscalatorIcon,
} from "./ui/icons";

const SCENARIOS = [
  {
    icon: RetailIcon,
    title: "Retail Windows",
    body: "Turn storefront glass into a dynamic canvas without blocking the display behind it.",
    variant: "a",
  },
  {
    icon: FacadeIcon,
    title: "Architectural Facades",
    body: "Wrap building exteriors in light while preserving the view from inside.",
    variant: "d",
  },
  {
    icon: ExhibitionIcon,
    title: "Exhibitions & Showrooms",
    body: "Immersive transparent walls and partitions for galleries, museums, and brand spaces.",
    variant: "c",
  },
  {
    icon: EscalatorIcon,
    title: "Mall Escalators",
    body: "Curved, continuous media surfaces along escalators and atriums in high-traffic retail.",
    variant: "b",
  },
];

export default function Scenarios() {
  return (
    <section
      id="scenarios"
      className="relative border-t border-white/5 bg-ink-800 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">
            Application Scenarios
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Where invisible displays come alive
          </h2>
          <p className="mt-4 text-base text-white/60">
            Designed for premium environments where the architecture should
            stay visible and the content should still command attention.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow">
                  {/* gradient backdrop */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      {
                        a: "from-brand-blue/30 via-brand-indigo/20 to-brand-purple/30",
                        b: "from-electric-cyan/25 via-brand-indigo/20 to-brand-violet/30",
                        c: "from-brand-purple/30 via-brand-blue/15 to-electric-cyan/25",
                        d: "from-brand-indigo/30 via-brand-violet/20 to-brand-blue/25",
                      }[s.variant]
                    }`}
                  />
                  <div className="absolute inset-0 led-grid opacity-50" />
                  <div
                    className="absolute inset-0 scanline opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900/90 to-transparent" />

                  <div className="relative flex aspect-[3/4] flex-col justify-end p-6">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-ink-900/70 p-2.5 text-electric-cyan ring-1 ring-white/15 backdrop-blur transition-transform duration-500 group-hover:scale-110">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {s.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
