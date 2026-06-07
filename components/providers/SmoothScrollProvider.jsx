"use client";

/**
 * SmoothScrollProvider
 * Initialises Lenis smooth-scroll and wires it to GSAP's RAF ticker so that
 * ScrollTrigger progress values stay perfectly in sync with the smoothed
 * scroll position (no jitter / lag between Lenis and GSAP).
 *
 * Skips entirely when the user prefers reduced motion — the native scroll
 * continues to work; GSAP animations still fire but without inertia.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // SSR guard (layout runs server-side; effect runs client-side only)
    if (typeof window === "undefined") return;

    // Honour prefers-reduced-motion — skip smooth scroll entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Let Lenis tell ScrollTrigger about the true scroll position
      syncTouch: false,
    });

    // Keep Lenis + GSAP ticker in sync
    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Sync Lenis scroll events with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return children;
}
