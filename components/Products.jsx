"use client";

import Reveal from "./ui/Reveal";
import GradientPlaceholder from "./ui/GradientPlaceholder";
import { FilmIcon, PosterIcon, CheckIcon, ArrowIcon } from "./ui/icons";

const scrollToContact = (e) => {
  e.preventDefault();
  document
    .querySelector("#contact")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const PRODUCTS = [
  {
    tag: "Series F",
    name: "Flexible Transparent Film",
    icon: FilmIcon,
    variant: "b",
    desc: "Bendable, self-adhesive transparent film display. Sticks directly to glass — no support structure, no visible frame.",
    specs: [
      ["Pixel Pitch", "P6.25 / P8 / P10 / P20"],
      ["Transparency", "80% – 95%"],
      ["Thickness", "~4 mm"],
      ["Weight", "3 – 6 kg/m²"],
    ],
    highlights: ["Peel & stick", "Curved-surface ready", "No brackets"],
  },
  {
    tag: "Series T",
    name: "Rigid Transparent Screen / Poster",
    icon: PosterIcon,
    variant: "c",
    desc: "Self-standing transparent poster screen for hanging or floor-mount displays. Premium rigidity with see-through clarity.",
    specs: [
      ["Pixel Pitch", "P2.8–5.6 / P3.9–7.8"],
      ["Transparency", "70% – 85%"],
      ["Format", "Hanging / Floor-standing"],
      ["Weight", "~32 kg / unit"],
    ],
    highlights: ["Plug & play", "Modular cabinets", "Poster-grade clarity"],
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="relative border-t border-white/5 bg-ink-900 py-24 sm:py-32"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-purple/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">
            Product Lines
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Two transparent platforms, endless applications
          </h2>
          <p className="mt-4 text-base text-white/60">
            From peel-and-stick film to free-standing poster screens — pick the
            form factor your space calls for.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.tag} delay={i * 0.1}>
                <article className="led-border group flex h-full flex-col overflow-hidden rounded-3xl bg-ink-700/50 transition-shadow duration-500 hover:shadow-glow-lg">
                  {/* Placeholder product image */}
                  <div className="relative">
                    <GradientPlaceholder
                      label={`${p.tag} — Product Visual`}
                      caption="Product photography drops in here"
                      variant={p.variant}
                      ratio="aspect-[16/10]"
                      className="rounded-none border-0"
                      icon={
                        <span className="block h-10 w-10">
                          <Icon />
                        </span>
                      }
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-electric-cyan backdrop-blur">
                      {p.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-bold text-white">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {p.desc}
                    </p>

                    {/* Spec grid */}
                    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                      {p.specs.map(([k, v]) => (
                        <div key={k} className="bg-ink-800 p-4">
                          <dt className="text-[11px] uppercase tracking-wider text-white/40">
                            {k}
                          </dt>
                          <dd className="mt-1 text-sm font-semibold text-white">
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Highlights */}
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.highlights.map((h) => (
                        <li
                          key={h}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                        >
                          <span className="h-3.5 w-3.5 text-electric-cyan">
                            <CheckIcon />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="group/btn mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-electric-cyan transition-colors hover:text-white"
                    >
                      Request {p.tag} specs &amp; pricing
                      <span className="h-4 w-4 transition-transform group-hover/btn:translate-x-1">
                        <ArrowIcon />
                      </span>
                    </a>
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
