"use client";

/**
 * HeroParallax
 * A lightweight GSAP ScrollTrigger wrapper that drives a three-layer parallax
 * on the Hero section:
 *
 *   data-parallax="bg"   → background layer, drifts down + fades gently
 *   data-parallax="glow" → light-orb accents, drift at a different rate
 *   data-parallax="text" → content block, drifts up + fades out sooner
 *
 * Skips all animation when prefers-reduced-motion is set.
 * Uses gsap.context() for proper cleanup, preventing memory leaks on
 * route transitions.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroParallax({ children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    // Scope all GSAP selectors to the section so they don't bleed into other pages
    const ctx = gsap.context(() => {
      // ── Layer 1: Background (bg layer drifts down 30%, dims slightly) ──
      gsap.to('[data-parallax="bg"]', {
        yPercent: 30,
        opacity: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ── Layer 2: Glow orbs (drift faster + scale up for depth illusion) ──
      gsap.to('[data-parallax="glow"]', {
        yPercent: 20,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // ── Layer 3: Text content (drifts up, exits early) ──
      gsap.to('[data-parallax="text"]', {
        yPercent: -10,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "60% top", // exits before the background finishes
          scrub: 1.2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ willChange: "transform", isolation: "isolate" }}
    >
      {children}
    </div>
  );
}
