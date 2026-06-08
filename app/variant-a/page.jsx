"use client";

/**
 * VARIANT A — "Reefilm Style"
 * Clean, minimal, cinematic, product-photography-centric.
 * Big hero, full-width product showcases, floating glass-morphism spec cards,
 * generous whitespace, elegant fade-in motion. Single standalone page file.
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
  { label: "Scenarios", href: "#scenarios" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const TECH = [
  { icon: TransparencyIcon, metric: "70–95%", title: "Ultra Transparency" },
  { icon: FlexIcon, metric: "6 cm", title: "Bend Radius" },
  { icon: AdhesiveIcon, metric: "~4 mm", title: "Self-Adhesive" },
  { icon: DualDriveIcon, metric: "Zero", title: "Blackout Risk" },
];

const SHOWCASE = [
  {
    tag: "Series F",
    name: "Flexible Transparent Film",
    line: "Disappears into glass. Reappears as light.",
    icon: FilmIcon,
    gradient: "from-brand-blue/40 via-brand-indigo/25 to-brand-purple/40",
    specs: [
      ["Transparency", "80–95%"],
      ["Thickness", "~4 mm"],
      ["Weight", "3–6 kg/m²"],
      ["Pitch", "P6.25–P20"],
    ],
  },
  {
    tag: "Series T",
    name: "Rigid Transparent Poster",
    line: "Free-standing clarity for the boldest spaces.",
    icon: PosterIcon,
    gradient: "from-brand-purple/40 via-brand-blue/20 to-electric-cyan/35",
    specs: [
      ["Transparency", "70–85%"],
      ["Format", "Hang / Floor"],
      ["Weight", "~32 kg"],
      ["Pitch", "P2.8–P7.8"],
    ],
  },
];

const SCENARIOS = [
  { icon: RetailIcon, title: "Retail Windows", gradient: "from-brand-blue/30 to-brand-purple/30" },
  { icon: FacadeIcon, title: "Architectural Facades", gradient: "from-brand-indigo/30 to-brand-violet/30" },
  { icon: ExhibitionIcon, title: "Exhibitions", gradient: "from-brand-purple/30 to-electric-cyan/25" },
  { icon: EscalatorIcon, title: "Mall Escalators", gradient: "from-electric-cyan/25 to-brand-indigo/30" },
];

/* ----------------------------------------------------------- animation ----- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

function FadeIn({ children, className = "", delay = 0, y = 40 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const scrollTo = (href) => (e) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ------------------------------------------------------------------- nav --- */

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/5 bg-ink-900/70 backdrop-blur-2xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#hero" onClick={scrollTo("#hero")} className="flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-lg ring-1 ring-white/15 shadow-glow">
            <Image src="/assets/images/k1-logo.jpg" alt="K1 Visual Solutions logo" fill sizes="36px" className="object-cover" priority />
          </span>
          <span className="text-sm font-semibold tracking-[0.2em] text-white/90">
            K1 <span className="text-gradient-cyan">VISUAL</span>
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={scrollTo(l.href)}
                className="text-[13px] font-medium uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={scrollTo("#contact")}
            className="hidden rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:border-electric-cyan/60 hover:text-electric-cyan sm:inline-block"
          >
            Request Quote
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
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
            className="overflow-hidden border-t border-white/5 bg-ink-900/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="space-y-1 px-6 py-5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      setOpen(false);
                      scrollTo(l.href)(e);
                    }}
                    className="block py-3 text-sm uppercase tracking-[0.15em] text-white/70 hover:text-white"
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

/* ------------------------------------------------------------------ hero --- */

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />
        <div className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-purple/20 blur-[160px] animate-led-pulse" />
        <div className="absolute left-1/4 bottom-0 h-96 w-96 rounded-full bg-brand-blue/20 blur-[140px] animate-float" />
        <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-electric-cyan/10 blur-[130px]" />
        <div className="absolute inset-0 led-grid opacity-[0.15]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-electric-cyan backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-led-pulse rounded-full bg-electric-cyan" />
          Invisible Displays
        </motion.span>

        <motion.h1 variants={fadeUp} className="mt-8 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
          Light that
          <br />
          <span className="text-gradient animate-text-glow">lives in glass.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/55">
          Transparent &amp; flexible LED, engineered to vanish into architecture — and reappear as motion, color, and presence.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#products"
            onClick={scrollTo("#products")}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition-transform hover:scale-105"
          >
            Explore
            <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </a>
          <a
            href="#contact"
            onClick={scrollTo("#contact")}
            className="inline-flex items-center rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur transition-colors hover:border-electric-cyan/50 hover:text-white"
          >
            Get a Quote
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <span className="block h-12 w-px animate-float bg-gradient-to-b from-electric-cyan to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------------------------- tech (floating glass) --- */

function Tech() {
  return (
    <section id="technology" className="relative overflow-hidden py-32 sm:py-40">
      <div className="absolute left-1/2 top-0 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-brand-indigo/10 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-electric-cyan">The Technology</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Engineered to disappear</h2>
        </FadeIn>

        {/* Floating glass-morphism spec cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.map((t, i) => {
            const Icon = t.icon;
            return (
              <FadeIn key={t.title} delay={i * 0.12}>
                <div className="glass group relative flex flex-col items-center rounded-3xl px-6 py-10 text-center transition-transform duration-500 hover:-translate-y-2 animate-float" style={{ animationDelay: `${i * 0.6}s` }}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient/10 p-3.5 text-electric-cyan shadow-glow transition-transform duration-500 group-hover:scale-110">
                    <Icon />
                  </div>
                  <div className="text-3xl font-extrabold text-gradient-cyan">{t.metric}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">{t.title}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------- products (full-width show) --- */

function Products() {
  return (
    <section id="products" className="relative">
      <FadeIn className="mx-auto max-w-2xl px-6 pt-24 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-electric-cyan">The Products</span>
        <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Two ways to bring glass alive</h2>
      </FadeIn>

      <div className="mt-20 space-y-0">
        {SHOWCASE.map((p, i) => {
          const Icon = p.icon;
          const reversed = i % 2 === 1;
          return (
            <FadeIn key={p.tag}>
              <div className="grid items-center gap-0 lg:grid-cols-2">
                {/* Big gradient placeholder card — full bleed on its side */}
                <div className={`relative min-h-[28rem] overflow-hidden ${reversed ? "lg:order-2" : ""}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
                  <div className="absolute inset-0 led-grid opacity-30" />
                  <div className="absolute inset-0 scanline" aria-hidden />
                  <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-electric-cyan/20 blur-3xl animate-float" />
                  <div className="absolute -bottom-20 -left-12 h-72 w-72 rounded-full bg-brand-purple/25 blur-3xl" />
                  <div className="relative flex h-full min-h-[28rem] flex-col items-center justify-center p-10 text-center">
                    <div className="h-16 w-16 text-electric-cyan">
                      <Icon />
                    </div>
                    <p className="mt-6 text-sm uppercase tracking-[0.25em] text-white/70">{p.tag} — Product Visual</p>
                  </div>
                </div>

                {/* Minimal text panel */}
                <div className={`flex flex-col justify-center gap-6 bg-ink-800 px-8 py-16 sm:px-16 ${reversed ? "lg:order-1" : ""}`}>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-electric-cyan">{p.tag}</span>
                  <h3 className="text-3xl font-bold sm:text-4xl">{p.name}</h3>
                  <p className="text-lg text-white/55">{p.line}</p>

                  {/* Floating glass spec strip */}
                  <div className="glass mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl">
                    {p.specs.map(([k, v]) => (
                      <div key={k} className="px-5 py-4">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{k}</div>
                        <div className="mt-1 text-base font-semibold text-white">{v}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={scrollTo("#contact")}
                    className="group mt-2 inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.15em] text-electric-cyan transition-colors hover:text-white"
                  >
                    Request specs
                    <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- scenarios ----- */

function Scenarios() {
  return (
    <section id="scenarios" className="relative overflow-hidden py-32 sm:py-40">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-electric-cyan">Where It Lives</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Built for premium space</h2>
        </FadeIn>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`} />
                  <div className="absolute inset-0 led-grid opacity-40" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-900/95 to-transparent" />
                  <div className="absolute inset-0 scanline opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                  <div className="relative flex h-full flex-col justify-end p-7">
                    <div className="mb-3 h-9 w-9 text-electric-cyan">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- about ----- */

function About() {
  return (
    <section id="about" className="relative overflow-hidden py-32 sm:py-40">
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-purple/15 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-electric-cyan">K1trends Global</span>
          <h2 className="mt-6 text-3xl font-bold leading-snug tracking-tight sm:text-5xl">
            A North American partner for the world&apos;s most <span className="text-gradient-cyan">ambitious</span> displays.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/55">
            Elmhurst, IL–based. STEM-engineered. Backed by a global supply chain and local North American service — from spec and sourcing to delivery and support.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-16">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl glass sm:grid-cols-4">
            {[
              ["Elmhurst, IL", "HQ"],
              ["North America", "Service"],
              ["STEM-led", "Engineering"],
              ["Global", "Supply"],
            ].map(([v, k]) => (
              <div key={k} className="px-6 py-8">
                <div className="text-base font-bold text-gradient-cyan">{v}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">{k}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- contact ----- */

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const field =
    "w-full rounded-xl border border-white/10 bg-ink-900/60 px-5 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-electric-cyan/60";

  return (
    <section id="contact" className="relative overflow-hidden py-32 sm:py-40">
      <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-indigo/15 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-electric-cyan">Start a Conversation</span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Let&apos;s light up your space</h2>
          <p className="mx-auto mt-5 max-w-md text-white/55">Tell us about your project — we&apos;ll reply within one business day with tailored specs and pricing.</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <div className="glass rounded-3xl p-8 sm:p-10">
            {submitted ? (
              <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient p-4 text-white shadow-glow animate-led-pulse">
                  <CheckIcon />
                </div>
                <h3 className="text-2xl font-bold">Message received</h3>
                <p className="mt-3 max-w-sm text-sm text-white/55">Our team will be in touch within one business day.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-electric-cyan hover:text-white">
                  Send another
                </button>
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
                  <input required placeholder="Name" className={field} aria-label="Name" />
                  <input required placeholder="Company" className={field} aria-label="Company" />
                  <input required type="email" placeholder="Email" className={field} aria-label="Email" />
                  <input placeholder="Phone" className={field} aria-label="Phone" />
                </div>
                <textarea rows={4} placeholder="Tell us about your project…" className={`${field} resize-y`} aria-label="Message" />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Request a Quote
                </button>
              </form>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/55">
          <a href="mailto:Andrewxu@vertexdistributor.com" className="inline-flex items-center gap-2 hover:text-electric-cyan">
            <span className="h-4 w-4"><MailIcon /></span> Andrewxu@vertexdistributor.com
          </a>
          <a href="tel:+16303595931" className="inline-flex items-center gap-2 hover:text-electric-cyan">
            <span className="h-4 w-4"><PhoneIcon /></span> +1 (630) 359-5931
          </a>
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4"><PinIcon /></span> Elmhurst, IL
          </span>
        </FadeIn>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- footer ----- */

function FooterA() {
  return (
    <footer className="border-t border-white/5 bg-ink-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
        <span className="relative h-12 w-12 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-glow">
          <Image src="/assets/images/k1-logo.jpg" alt="K1 Visual Solutions logo" fill sizes="48px" className="object-cover" />
        </span>
        <p className="text-lg font-semibold tracking-[0.15em] text-white/90">
          K1 <span className="text-gradient-cyan">VISUAL</span> SOLUTIONS
        </p>
        <p className="max-w-md text-sm text-white/45">LED Displays · Digital Signs · Endless Possibilities</p>
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.15em] text-white/45">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={scrollTo(l.href)} className="hover:text-electric-cyan">
              {l.label}
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/30">© 2025 K1trends Global Inc. · Elmhurst, IL</p>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- page ----- */

export default function VariantA() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Tech />
        <Products />
        <Scenarios />
        <About />
        <Contact />
      </main>
      <FooterA />
    </>
  );
}
