"use client";

/**
 * VARIANT B — "Milestrong Style"
 * Information-dense, spec-heavy B2B. Split-screen hero, prominent comparison
 * table, tabbed product sections (Series F / Series T), FAQ accordion, trust /
 * certification badge row, structured grid-heavy layout. Standalone page file.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  TransparencyIcon,
  FlexIcon,
  AdhesiveIcon,
  DualDriveIcon,
  FilmIcon,
  PosterIcon,
  RetailIcon,
  FacadeIcon,
  ExhibitionIcon,
  EscalatorIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ArrowIcon,
  CheckIcon,
} from "@/components/ui/icons";

/* ------------------------------------------------------------------ data --- */

const NAV_LINKS = [
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Compare", href: "#compare" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const TECH = [
  { icon: TransparencyIcon, metric: "70–95%", title: "Transparency", body: "See-through panels keep sightlines and daylight intact." },
  { icon: FlexIcon, metric: "6 cm radius", title: "Flexible", body: "Wrap curved columns and domes with no rigid framing." },
  { icon: AdhesiveIcon, metric: "~4 mm", title: "Self-Adhesive", body: "Peel-and-stick to glass at 3–6 kg/m² — no brackets." },
  { icon: DualDriveIcon, metric: "Zero blackout", title: "Dual-Drive", body: "Breakpoint-continuation circuitry keeps the show running." },
];

const PRODUCT_TABS = {
  "Series F": {
    icon: FilmIcon,
    name: "Flexible Transparent Film",
    gradient: "from-brand-blue/35 via-brand-indigo/25 to-brand-purple/35",
    desc: "Bendable, self-adhesive transparent film display. Sticks directly to glass — no support structure, no visible frame.",
    specs: [
      ["Pixel Pitch", "P6.25 / P8 / P10 / P20"],
      ["Transparency", "80% – 95%"],
      ["Thickness", "~4 mm"],
      ["Weight", "3 – 6 kg/m²"],
      ["Brightness", "Up to 5,000 nits"],
      ["Install", "Peel & stick, curved-ready"],
    ],
    highlights: ["Peel & stick", "Curved-surface ready", "No brackets"],
  },
  "Series T": {
    icon: PosterIcon,
    name: "Rigid Transparent Screen / Poster",
    gradient: "from-brand-purple/35 via-brand-blue/20 to-electric-cyan/30",
    desc: "Self-standing transparent poster screen for hanging or floor-mount displays. Premium rigidity with see-through clarity.",
    specs: [
      ["Pixel Pitch", "P2.8–5.6 / P3.9–7.8"],
      ["Transparency", "70% – 85%"],
      ["Format", "Hanging / Floor-standing"],
      ["Weight", "~32 kg / unit"],
      ["Brightness", "Up to 6,000 nits"],
      ["Install", "Plug & play modular cabinets"],
    ],
    highlights: ["Plug & play", "Modular cabinets", "Poster-grade clarity"],
  },
};

const COMPARE_ROWS = [
  ["Form factor", "Flexible film", "Rigid cabinet"],
  ["Transparency", "80% – 95%", "70% – 85%"],
  ["Pixel pitch", "P6.25 – P20", "P2.8 – P7.8"],
  ["Thickness", "~4 mm", "Cabinet depth"],
  ["Weight", "3 – 6 kg/m²", "~32 kg / unit"],
  ["Mounting", "Self-adhesive to glass", "Hang / floor-stand"],
  ["Best for", "Curved & retrofit glass", "Free-standing displays"],
];

const SCENARIOS = [
  { icon: RetailIcon, title: "Retail Windows", body: "Dynamic storefront glass without blocking the display behind it." },
  { icon: FacadeIcon, title: "Architectural Facades", body: "Wrap exteriors in light while preserving the view from inside." },
  { icon: ExhibitionIcon, title: "Exhibitions & Showrooms", body: "Transparent walls for galleries, museums, and brand spaces." },
  { icon: EscalatorIcon, title: "Mall Escalators", body: "Curved continuous media along escalators and atriums." },
];

const TRUST = ["CE", "RoHS", "FCC", "IP65", "ISO 9001", "ETL"];

const FAQ = [
  ["Do you publish pricing?", "We quote per project. Transparent LED pricing depends on pitch, area, brightness, and install conditions — request a quote and we'll return a tailored figure within one business day."],
  ["How is the film installed?", "Series F is self-adhesive: it peels and sticks directly to clean glass at ~4 mm thickness, with a minimum bend radius of 6 cm. No brackets or scaffolding required."],
  ["What about outdoor use?", "Outdoor configurations reach IP65 weatherproofing and up to 6,000 nits for daylight visibility. Tell us the environment and we'll spec accordingly."],
  ["Do you serve North America locally?", "Yes. K1trends Global is based in Elmhurst, IL and provides North American service — from spec and sourcing through delivery and support."],
  ["What is dual-drive continuation?", "Breakpoint-continuation circuitry means a single point of failure won't take the display down — content keeps running, eliminating full blackouts."],
];

/* ------------------------------------------------------------ animation ---- */

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const scrollTo = (href) => (e) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ------------------------------------------------------------------ nav --- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-ink-900/90 backdrop-blur-xl" : "border-b border-transparent bg-ink-900/40 backdrop-blur"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" onClick={scrollTo("#hero")} className="flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-lg ring-1 ring-white/15 shadow-glow">
            <Image src="/assets/images/k1-logo.jpg" alt="K1 Visual Solutions logo" fill sizes="36px" className="object-cover" priority />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide text-white">
              K1 <span className="text-gradient-cyan">Visual</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">Solutions</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={scrollTo(l.href)} className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={scrollTo("#contact")}
            className="hidden rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:inline-block"
          >
            Get a Free Quote
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      setOpen(false);
                      scrollTo(l.href)(e);
                    }}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ----------------------------------------------------- hero (split) ------- */

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <div className="grid lg:grid-cols-2">
        {/* Left — text / CTA */}
        <div className="relative flex flex-col justify-center bg-ink-900 px-6 py-20 sm:px-10 lg:py-28 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-electric-cyan/30 bg-electric-cyan/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-electric-cyan">
              <span className="h-1.5 w-1.5 animate-led-pulse rounded-full bg-electric-cyan" />
              Transparent LED Manufacturer-Direct
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transparent LED, <span className="text-gradient">spec'd for B2B.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              Flexible film &amp; rigid poster displays — 70–95% transparency, up to 6,000 nits, IP65 outdoor options. Compare the full spec sheet and request a free quote.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" onClick={scrollTo("#contact")} className="group inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-105">
                Get a Free Quote
                <span className="h-4 w-4 transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
              </a>
              <a href="#compare" onClick={scrollTo("#compare")} className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-electric-cyan/50">
                Compare Specs
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
              {[["70–95%", "Transparency"], ["6,000", "Max nits"], ["IP65", "Outdoor"]].map(([v, k]) => (
                <div key={k}>
                  <dd className="text-2xl font-bold text-gradient-cyan sm:text-3xl">{v}</dd>
                  <span className="mt-1 block text-xs uppercase tracking-wider text-white/45">{k}</span>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right — product visual */}
        <div className="relative min-h-[22rem] overflow-hidden lg:min-h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/40 via-brand-indigo/30 to-brand-purple/40" />
          <div className="absolute inset-0 led-grid opacity-30" />
          <div className="absolute inset-0 scanline" aria-hidden />
          <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-electric-cyan/20 blur-[120px] animate-led-pulse" />
          <div className="absolute -bottom-16 left-1/4 h-80 w-80 rounded-full bg-brand-purple/30 blur-[120px] animate-float" />
          <div className="relative flex h-full min-h-[22rem] flex-col items-center justify-center p-10 text-center">
            <div className="h-20 w-20 text-electric-cyan"><FilmIcon /></div>
            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-white/75">Product Visual</p>
            <p className="mt-2 max-w-xs text-xs text-white/50">High-resolution product photography drops in here</p>
          </div>
        </div>
      </div>

      {/* Trust / certification badge row */}
      <div className="border-y border-white/10 bg-ink-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Certified &amp; compliant</span>
          {TRUST.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-bold tracking-wider text-white/70">
              <span className="h-3.5 w-3.5 text-electric-cyan"><CheckIcon /></span>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- tech (grid) ------ */

function Tech() {
  return (
    <section id="technology" className="border-t border-white/5 bg-ink-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">Core Technology</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Four advantages, every panel</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={i * 0.06}>
                <div className="group h-full bg-ink-800 p-7 transition-colors hover:bg-ink-700/60">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gradient/10 p-2.5 text-electric-cyan shadow-glow transition-transform duration-500 group-hover:scale-110">
                    <Icon />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-violet">{t.metric}</div>
                  <h3 className="mt-1 text-lg font-bold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{t.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------- products (tabbed) -------- */

function Products() {
  const tabs = Object.keys(PRODUCT_TABS);
  const [active, setActive] = useState(tabs[0]);
  const p = PRODUCT_TABS[active];
  const Icon = p.icon;

  return (
    <section id="products" className="border-t border-white/5 bg-ink-800 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">Product Lines</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Switch between our two platforms</h2>
        </Reveal>

        {/* Tab switcher */}
        <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-ink-900/60 p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              aria-pressed={active === t}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                active === t ? "bg-brand-gradient text-white shadow-glow" : "text-white/55 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-8 lg:grid-cols-2"
          >
            {/* Visual */}
            <div className="relative min-h-[20rem] overflow-hidden rounded-2xl border border-white/10">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
              <div className="absolute inset-0 led-grid opacity-40" />
              <div className="absolute inset-0 scanline" aria-hidden />
              <span className="absolute left-4 top-4 rounded-full bg-ink-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-electric-cyan backdrop-blur">{active}</span>
              <div className="relative flex h-full min-h-[20rem] items-center justify-center">
                <div className="h-16 w-16 text-electric-cyan"><Icon /></div>
              </div>
            </div>

            {/* Spec detail */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
              <dl className="mt-6 divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 bg-ink-900/40 px-5 py-3">
                    <dt className="text-xs uppercase tracking-wider text-white/45">{k}</dt>
                    <dd className="text-sm font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.highlights.map((h) => (
                  <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-3.5 w-3.5 text-electric-cyan"><CheckIcon /></span>
                    {h}
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={scrollTo("#contact")} className="group mt-7 inline-flex items-center gap-2 self-start rounded-lg bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105">
                Request {active} quote
                <span className="h-4 w-4 transition-transform group-hover:translate-x-1"><ArrowIcon /></span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* --------------------------------------------- compare (spec table) ------- */

function Compare() {
  return (
    <section id="compare" className="border-t border-white/5 bg-ink-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">Spec Comparison</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Series F vs. Series T at a glance</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse overflow-hidden rounded-2xl text-left">
            <thead>
              <tr className="bg-ink-700/60">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/45">Specification</th>
                <th className="px-6 py-4 text-sm font-bold text-white">
                  <span className="inline-flex items-center gap-2"><span className="h-4 w-4 text-electric-cyan"><FilmIcon /></span> Series F — Film</span>
                </th>
                <th className="px-6 py-4 text-sm font-bold text-white">
                  <span className="inline-flex items-center gap-2"><span className="h-4 w-4 text-electric-cyan"><PosterIcon /></span> Series T — Poster</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={row[0]} className={i % 2 ? "bg-ink-800/40" : "bg-ink-800/80"}>
                  <td className="border-t border-white/5 px-6 py-4 text-sm font-medium text-white/55">{row[0]}</td>
                  <td className="border-t border-white/5 px-6 py-4 text-sm text-white">{row[1]}</td>
                  <td className="border-t border-white/5 px-6 py-4 text-sm text-white">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------- scenarios (grid) ----- */

function Scenarios() {
  return (
    <section id="scenarios" className="border-t border-white/5 bg-ink-800 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">Application Scenarios</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Deployed across premium environments</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <article className="led-border group h-full rounded-2xl bg-ink-700/50 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gradient/10 p-2.5 text-electric-cyan ring-1 ring-white/10">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- about (grid) ----- */

function About() {
  return (
    <section id="about" className="border-t border-white/5 bg-ink-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">About K1trends Global</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">A North American partner for ambitious displays</h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              K1trends Global Inc. is an Elmhurst, IL–based distributor of advanced LED hardware, serving architects, high-end retail brands, and system integrators across North America. Backed by a STEM engineering background and a global supply chain.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[["Elmhurst, IL", "HQ"], ["North America", "Service"], ["STEM-led", "Engineering"], ["Global", "Supply"]].map(([v, k]) => (
                <div key={k} className="rounded-xl border border-white/10 bg-ink-700/40 p-4">
                  <dd className="text-sm font-bold text-gradient-cyan">{v}</dd>
                  <span className="mt-1 block text-[11px] uppercase tracking-wider text-white/45">{k}</span>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-glow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/30 via-brand-blue/20 to-electric-cyan/25" />
              <div className="absolute inset-0 led-grid opacity-50" />
              <div className="absolute inset-0 scanline" aria-hidden />
              <div className="relative flex h-full items-center justify-center text-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">K1 Visual Solutions</p>
                  <p className="mt-2 text-xs text-white/55">LED Displays · Digital Signs · Endless Possibilities</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- faq (accordion) -------- */

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="border-t border-white/5 bg-ink-800 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently asked questions</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 space-y-3">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="overflow-hidden rounded-xl border border-white/10 bg-ink-900/40">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-white">{q}</span>
                  <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/15 text-electric-cyan transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    <span className="text-lg leading-none">+</span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- contact ---- */

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const field =
    "w-full rounded-lg border border-white/10 bg-ink-800/80 px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-electric-cyan/60 focus:ring-1 focus:ring-electric-cyan/40";

  return (
    <section id="contact" className="border-t border-white/5 bg-ink-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">Get in Touch</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Request a free quote</h2>
            <p className="mt-4 text-base text-white/60">Tell us your project specs and we&apos;ll respond within one business day with pricing and lead times.</p>
            <ul className="mt-8 space-y-4">
              {[
                [MailIcon, "Email", "Andrewxu@vertexdistributor.com", "mailto:Andrewxu@vertexdistributor.com"],
                [PhoneIcon, "Phone", "+1 (630) 359-5931", "tel:+16303595931"],
                [PinIcon, "Headquarters", "525 W Wrightwood Avenue, Elmhurst, IL", null],
              ].map(([Icon, label, value, href]) => {
                const inner = (
                  <>
                    <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-brand-gradient/10 p-2.5 text-electric-cyan ring-1 ring-white/10"><Icon /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-white/40">{label}</span>
                      <span className="mt-0.5 block text-sm font-medium text-white">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? <a href={href} className="flex gap-3 hover:text-electric-cyan">{inner}</a> : <div className="flex gap-3">{inner}</div>}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-ink-700/40 p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient p-4 text-white shadow-glow animate-led-pulse"><CheckIcon /></div>
                  <h3 className="text-2xl font-bold text-white">Thank you — message received</h3>
                  <p className="mt-3 max-w-md text-sm text-white/60">Our team will reply within one business day with a tailored quote.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-electric-cyan hover:text-white">Submit another request</button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <input required placeholder="Name *" className={field} aria-label="Name" />
                    <input required placeholder="Company *" className={field} aria-label="Company" />
                    <input required type="email" placeholder="Email *" className={field} aria-label="Email" />
                    <input placeholder="Phone" className={field} aria-label="Phone" />
                    <select defaultValue="" className={field} aria-label="Product line">
                      <option value="" disabled>Product line…</option>
                      <option className="bg-ink-800">Series F — Film</option>
                      <option className="bg-ink-800">Series T — Poster</option>
                      <option className="bg-ink-800">Not sure yet</option>
                    </select>
                    <input placeholder="Estimated area / quantity" className={field} aria-label="Quantity" />
                  </div>
                  <textarea rows={4} placeholder="Tell us about your project, timeline, and goals…" className={`${field} resize-y`} aria-label="Message" />
                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:w-auto">
                    Request a Quote
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- footer ---- */

function FooterB() {
  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-white/15 shadow-glow">
                <Image src="/assets/images/k1-logo.jpg" alt="K1 Visual Solutions logo" fill sizes="40px" className="object-cover" />
              </span>
              <div className="leading-tight">
                <p className="font-bold text-white">K1 Visual Solutions</p>
                <p className="text-xs text-white/45">K1trends Global Inc.</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/55">LED Displays · Digital Signs · Endless Possibilities. Transparent &amp; flexible LED, distributed across North America.</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Explore</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={scrollTo(l.href)} className="text-sm text-white/55 transition-colors hover:text-electric-cyan">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="mailto:Andrewxu@vertexdistributor.com" className="inline-flex items-center gap-2 text-white/55 hover:text-electric-cyan"><span className="h-4 w-4"><MailIcon /></span> Andrewxu@vertexdistributor.com</a></li>
              <li><a href="tel:+16303595931" className="inline-flex items-center gap-2 text-white/55 hover:text-electric-cyan"><span className="h-4 w-4"><PhoneIcon /></span> +1 (630) 359-5931</a></li>
              <li className="text-white/55">525 W Wrightwood Avenue, Elmhurst, IL</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">© 2025 K1trends Global Inc. All rights reserved.</p>
          <p className="text-xs text-white/40">Elmhurst, IL · Serving North America</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- page ---- */

export default function VariantB() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Tech />
        <Products />
        <Compare />
        <Scenarios />
        <About />
        <Faq />
        <Contact />
      </main>
      <FooterB />
    </>
  );
}
