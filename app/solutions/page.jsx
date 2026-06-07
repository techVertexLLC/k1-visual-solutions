import PageBanner from "@/components/ui/PageBanner";
import SolutionsList from "@/components/solutions/SolutionsList";
import FaqAccordion from "@/components/solutions/FaqAccordion";
import CtaBanner from "@/components/home/CtaBanner";
import SiteFooter from "@/components/SiteFooter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions — Applications for Transparent LED",
  ogTitle: "LED Display Solutions — Retail, Architecture, Hospitality",
  description:
    "Retail, architecture, hospitality, corporate, entertainment, signage and more — see how K1 transparent and holographic LED displays serve every environment.",
  path: "/k1/solutions",
  image: "/k1/assets/images/applications/app-architecture.jpg",
  imageAlt:
    "Architectural glass facade with an integrated transparent LED display",
});

/**
 * Solutions page — the Applications section expanded into a full page, one
 * editorial row per environment.
 */
export default function SolutionsPage() {
  return (
    <main id="main-content" className="page-enter min-h-screen" style={{ background: "#FAF8F5" }}>
      <PageBanner
        eyebrow="Solutions"
        title="Where vision meets space"
        description="The same transparent surface reads differently in every room it enters. From storefront windows to building facades, here is where K1 displays are made to work."
        image="/k1/assets/images/applications/app-architecture.jpg"
        imageAlt="Architectural glass facade with an integrated transparent LED display"
        breadcrumb={
          <>
            <a href="/k1/" className="hover:opacity-70">Home</a>
            <span aria-hidden>/</span>
            <span>Solutions</span>
          </>
        }
      />
      <SolutionsList />
      <FaqAccordion />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
