"use client";

/**
 * CtaBanner — GSAP ScrollTrigger fade-in upgrade.
 *
 * When the section enters the viewport, a staggered reveal plays:
 *   1. Card container fades + rises  (0.7s)
 *   2. Heading follows closely       (-0.45s overlap)
 *   3. Body copy next                (-0.4s overlap)
 *   4. Buttons last                  (-0.35s overlap)
 *
 * The animation plays once (toggleActions: "play none none none") and is
 * skipped entirely for prefers-reduced-motion — all elements start visible.
 * Uses gsap.context() for proper cleanup on route transitions.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR, FONT } from "./tokens";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const parasRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Accessibility: skip animation, keep everything visible
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      [cardRef, headingRef, parasRef, buttonsRef].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Start hidden
      gsap.set(
        [
          cardRef.current,
          headingRef.current,
          parasRef.current,
          buttonsRef.current,
        ],
        { opacity: 0, y: 32 }
      );

      // Staggered reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.45"
        )
        .to(
          parasRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          buttonsRef.current,
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
          "-=0.35"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-20 lg:px-10 lg:py-24"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          ref={cardRef}
          className="overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-12 sm:py-16"
          style={{ background: COLOR.gray, willChange: "transform, opacity" }}
        >
          <h2
            ref={headingRef}
            className="mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl"
            style={{
              fontFamily: FONT.serif,
              color: COLOR.ink,
              willChange: "transform, opacity",
            }}
          >
            Tell us about your space
          </h2>
          <p
            ref={parasRef}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: COLOR.body, willChange: "transform, opacity" }}
          >
            Share the dimensions and the effect you're after, and we'll come
            back with the right product, a clear spec, and an indicative price.
          </p>
          <div
            ref={buttonsRef}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
            style={{ willChange: "transform, opacity" }}
          >
            <a
              href="/k1/contact"
              className="rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: COLOR.accent }}
            >
              Request a Quote
            </a>
            <a
              href="/k1/products"
              className="group inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-opacity-10"
              style={{ borderColor: COLOR.accent, color: COLOR.accent }}
            >
              Browse Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
