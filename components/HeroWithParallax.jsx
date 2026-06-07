"use client";

/**
 * HeroWithParallax
 * Combines the static Hero section with the client-only GSAP parallax wrapper.
 * dynamic import with ssr:false prevents hydration mismatch — HeroParallax
 * touches the DOM directly (GSAP) and must only run in the browser.
 */

import dynamic from "next/dynamic";
import Hero from "./Hero";

const HeroParallax = dynamic(() => import("./HeroParallax"), { ssr: false });

export default function HeroWithParallax() {
  return (
    <HeroParallax>
      <Hero />
    </HeroParallax>
  );
}
