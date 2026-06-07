"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "./ui/icons";

const scrollTo = (href) => (e) => {
  e.preventDefault();
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-animated-gradient animate-gradient-shift"
    >
      {/* Video placeholder layer — gradient + animated light effects.
          (Real <video muted loop playsinline autoplay preload="metadata"> drops in here later.)
          data-parallax="bg" → GSAP ScrollTrigger drives the slow drift + fade. */}
      <div
        className="absolute inset-0"
        aria-hidden
        data-parallax="bg"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="absolute inset-0 bg-brand-radial" />
        {/* Primary light orb — marked as glow layer for faster parallax depth */}
        <div
          className="absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-blue/30 blur-[120px] animate-led-pulse"
          data-parallax="glow"
          style={{ willChange: "transform" }}
        />
        <div className="absolute right-1/4 top-1/3 h-80 w-80 translate-x-1/2 rounded-full bg-brand-purple/30 blur-[130px] animate-float" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-electric-cyan/20 blur-[120px]" />
        {/* LED dot-matrix wash */}
        <div className="absolute inset-0 led-grid opacity-30" />
        {/* Bottom fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-800 to-transparent" />
      </div>

      {/* data-parallax="text" → drifts upward + fades as user scrolls down */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8"
        data-parallax="text"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-electric-cyan/30 bg-electric-cyan/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-electric-cyan"
          >
            <span className="h-1.5 w-1.5 animate-led-pulse rounded-full bg-electric-cyan" />
            LED Displays · Digital Signs · Endless Possibilities
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Redefining Spaces with{" "}
            <span className="text-gradient animate-text-glow">
              Invisible Displays.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            Next-gen flexible &amp; transparent LED solutions — ultra-clear,
            bendable, and self-adhesive. Engineered to disappear into the glass
            and reappear as light.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              onClick={scrollTo("#products")}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              Explore Products
              <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#contact"
              onClick={scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:border-electric-cyan/50 hover:bg-white/10"
            >
              Request a Quote
            </a>
          </motion.div>

          {/* Quick spec strip */}
          <motion.dl
            variants={item}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              { v: "70–95%", k: "Transparency" },
              { v: "6 cm", k: "Min. bend radius" },
              { v: "~4 mm", k: "Panel thickness" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="sr-only">{s.k}</dt>
                <dd className="text-2xl font-bold text-gradient-cyan sm:text-3xl">
                  {s.v}
                </dd>
                <span className="mt-1 block text-xs uppercase tracking-wider text-white/45">
                  {s.k}
                </span>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
          <span className="h-2 w-1 animate-float rounded-full bg-electric-cyan" />
        </div>
      </div>
    </section>
  );
}
