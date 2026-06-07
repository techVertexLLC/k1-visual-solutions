"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR, FONT, BLUR } from "./tokens";
import { TransparencyIcon, CheckIcon, PinIcon } from "@/components/ui/icons";

gsap.registerPlugin(ScrollTrigger);

/* Quick trust signals, absorbed from the old "Why K1" block. Kept light. */
const TRUST = [
  { Icon: TransparencyIcon, label: "Up to 90% Transparency" },
  { Icon: CheckIcon, label: "3-Year Warranty" },
  { Icon: PinIcon, label: "North American Support" },
];

/* Load-in: a quiet fade-up, staggered. No bounce, no glow. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Subtle parallax: the photograph drifts a touch slower than the page.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);

  // GSAP ScrollTrigger: text content drifts up + fades; overlay intensifies.
  // Complements the Framer Motion photo drift → three distinct depth layers.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduceMotion) return;
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Layer 2: warm overlay slightly darkens as you scroll — depth cue
      gsap.to(overlayRef.current, {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });

      // Layer 3: content block drifts up and exits
      gsap.to(contentRef.current, {
        yPercent: -8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "55% top",
          scrub: 1.2,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
      style={{ background: COLOR.bg }}
    >
      {/* Parallax photograph layer */}
      <motion.div style={{ y }} className="absolute inset-0" aria-hidden>
        <div className="relative h-full w-full scale-125">
          <Image
            src="/k1/assets/images/products/smd-holo-content-floral.jpg"
            alt="K1 transparent LED poster screen in a calm, light studio space"
            fill
            priority
            quality={82}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
          />
        </div>
      </motion.div>

      {/* Warm-white wash — keeps the type effortless to read without darkening
          the image or introducing a cold/sci-fi cast. Strongest on the left,
          under the headline. Layer 2: opacity transitions via GSAP for depth. */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        aria-hidden
        style={{
          background: `linear-gradient(100deg, ${COLOR.bg}f2 0%, ${COLOR.bg}d9 38%, ${COLOR.bg}80 64%, ${COLOR.bg}40 100%)`,
          willChange: "opacity",
        }}
      />

      {/* Content — Layer 3: drifts up + fades via GSAP ScrollTrigger */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 lg:px-10"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-center md:text-left"
        >
          <motion.p
            variants={item}
            className="text-[11px] font-medium uppercase tracking-[0.34em]"
            style={{ color: COLOR.accent }}
          >
            Invisible Displays
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-7 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Redefining Spaces with Invisible Displays
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed md:mx-0"
            style={{ color: COLOR.body }}
          >
            Premium transparent &amp; holographic LED solutions for architecture,
            retail, and beyond.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:justify-start"
          >
            {/* Primary — the single accent-coloured action in view */}
            <a
              href="/k1/contact"
              className="cta-pulse rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: COLOR.accent }}
            >
              Request a Quote
            </a>

            {/* Secondary — calm outline, no fill */}
            <a
              href="/k1/products"
              className="group inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: COLOR.accent, color: COLOR.accent }}
            >
              Explore Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          {/* Trust signals — small, warm-gray, evenly spaced. Subtle by design. */}
          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start"
          >
            {TRUST.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-xs font-medium"
                style={{ color: COLOR.muted }}
              >
                <span className="h-4 w-4 flex-none" style={{ color: COLOR.accent }} aria-hidden>
                  <Icon />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
