import Hero from "@/components/home/Hero";
import ProductOverview from "@/components/home/ProductOverview";
import Applications from "@/components/home/Applications";
import CaseStudies from "@/components/home/CaseStudies";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

/**
 * K1 Visual Solutions — home page.
 *
 * Built to the G1 moodboard direction: warm white canvas, warm-gray structure,
 * brand blue-purple as a whisper. Clean, refined, effortless — no neon, no glow,
 * no sci-fi. The warm surface here covers the root layout's body.
 *
 * Section flow: Hero → Products → Applications → Case Studies → About →
 * Contact → Footer.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Hero />
      <ProductOverview />
      <Applications />
      <CaseStudies />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
