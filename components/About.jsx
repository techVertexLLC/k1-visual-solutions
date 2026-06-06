"use client";

import Reveal from "./ui/Reveal";
import GradientPlaceholder from "./ui/GradientPlaceholder";

const STATS = [
  { v: "Markham, ON", k: "Canadian HQ" },
  { v: "North America", k: "Service footprint" },
  { v: "STEM-led", k: "Engineering team" },
  { v: "Global", k: "Supply chain" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-ink-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">
              About K1trends Global
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A Canadian partner for the world&apos;s most ambitious displays
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              K1trends Global Inc. is a Markham, Ontario–based distributor of
              advanced LED hardware, serving architects, high-end retail brands,
              and system integrators across North America. Backed by a STEM
              engineering background and a global supply chain, we bridge
              cutting-edge transparent display technology with reliable local
              service — from spec and sourcing to delivery and support.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-white/10 bg-ink-700/40 p-4"
                >
                  <dt className="sr-only">{s.k}</dt>
                  <dd className="text-base font-bold text-gradient-cyan">
                    {s.v}
                  </dd>
                  <span className="mt-1 block text-[11px] uppercase tracking-wider text-white/45">
                    {s.k}
                  </span>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <GradientPlaceholder
                label="K1 Visual Solutions"
                caption="LED Displays · Digital Signs · Endless Possibilities"
                variant="c"
                ratio="aspect-[4/3]"
                className="shadow-glow-lg"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
