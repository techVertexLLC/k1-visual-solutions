import Hero from "@/components/home/Hero";
import Technology from "@/components/home/Technology";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ApplicationsPreview from "@/components/home/ApplicationsPreview";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import WhyK1 from "@/components/home/WhyK1";
import CtaBanner from "@/components/home/CtaBanner";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: {
    absolute:
      "K1 Visual Solutions — Transparent & Flexible LED Displays | K1trends Global Inc.",
  },
  ogTitle: "K1 Visual Solutions — Redefining Spaces with Invisible Displays",
  description:
    "Premium transparent, flexible & holographic LED display solutions for architecture, retail, and exhibitions — distributed across North America by K1trends Global Inc.",
  path: "/k1/",
});

/**
 * K1 Visual Solutions — home page.
 *
 * Content-rich and technology-led, built to the G1 moodboard direction: warm
 * white canvas, warm-gray structure, brand blue-purple as a whisper. Product
 * detail now lives on /k1/products; the home page tells the story and previews
 * the range.
 *
 * Flow: Hero → Our Technology → Featured Products → Applications preview →
 * Case Studies preview → Why K1 → CTA banner → Footer.
 */
export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#FAF8F5]">
      <Hero />
      <Technology />
      <FeaturedProducts />
      <ApplicationsPreview />
      <CaseStudiesPreview />
      <WhyK1 />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
