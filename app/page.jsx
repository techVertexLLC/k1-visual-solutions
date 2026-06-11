import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import CtaBanner from "@/components/home/CtaBanner";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/demo";

// SmoothScrollProvider: client-only (Lenis + GSAP ticker), ssr:false prevents
// hydration mismatch. Falls back gracefully (no-op) on prefers-reduced-motion.
const SmoothScrollProvider = dynamic(
  () => import("@/components/providers/SmoothScrollProvider"),
  { ssr: false }
);

export const metadata = pageMetadata({
  title: {
    absolute: `K1 Visual Solutions — Transparent & Flexible LED Displays | ${CONTACT.companyLegal}`,
  },
  ogTitle: "K1 Visual Solutions — Redefining Spaces with Invisible Displays",
  description: `Premium transparent, flexible & holographic LED display solutions for architecture, retail, and exhibitions — distributed across North America by ${CONTACT.companyLegal}.`,
  path: "/",
});

/**
 * K1 Visual Solutions — home page.
 *
 * Content-rich and technology-led, built to the G1 moodboard direction: warm
 * white canvas, warm-gray structure, brand blue-purple as a whisper. Product
 * detail now lives on /products; the home page tells the story and previews
 * the range.
 *
 * Flow: Hero → Featured Products → Featured Projects rail → Case Studies
 * preview → CTA banner → Footer.
 */
export default function Home() {
  return (
    <SmoothScrollProvider>
      <main id="main-content" className="min-h-screen bg-[#FAF8F5]">
        <Hero />
        <FeaturedProducts />
        <FeaturedProjects />
        <CaseStudiesPreview />
        <CtaBanner />
        <SiteFooter />
      </main>
    </SmoothScrollProvider>
  );
}
