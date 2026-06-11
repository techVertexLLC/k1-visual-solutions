import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TransparencyProof from "@/components/home/TransparencyProof";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyK1 from "@/components/home/WhyK1";
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
 * Home page — reference index.html flow:
 * Hero → 01 Featured Products → transparency proof → 02 Featured Projects
 * (dark) → 03 Why K1 number strip → CTA band → Footer.
 */
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <FeaturedProducts />
      <TransparencyProof />
      <FeaturedProjects />
      <WhyK1 />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
