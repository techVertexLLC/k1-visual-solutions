import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import CtaBanner from "@/components/home/CtaBanner";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/demo";

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
 * Flow: Hero → Featured Products → Featured Projects rail → Case Studies
 * preview → CTA banner → Footer.
 */
export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#FAF8F5]">
      <Hero />
      <FeaturedProducts />
      <FeaturedProjects />
      <CaseStudiesPreview />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
