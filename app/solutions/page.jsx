import Image from "next/image";
import PageBanner from "@/components/ui/PageBanner";
import SolutionsList from "@/components/solutions/SolutionsList";
import FaqAccordion from "@/components/solutions/FaqAccordion";
import CtaBanner from "@/components/home/CtaBanner";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions — Applications for Transparent LED",
  ogTitle: "LED Display Solutions — Retail, Architecture, Hospitality",
  description:
    "Retail, architecture, hospitality, corporate, entertainment, signage and more — see how K1 transparent and holographic LED displays serve every environment.",
  path: "/solutions",
  image: "/assets/images/scenes/scene-architecture-facade.jpg",
  imageAlt:
    "Architectural glass curtain-wall facade with integrated transparent LED content",
});

/* The two install guides supplied with every system — front-facing and
   back-sticker mounting, shown to make the install path concrete. */
const INSTALL_GUIDES = [
  {
    src: "/assets/images/scenes/scene-install-front-facing.jpg",
    alt: "Front-facing installation method guide for a transparent LED screen",
    label: "Front-facing mounting",
  },
  {
    src: "/assets/images/scenes/scene-install-back-sticker.jpg",
    alt: "Back-sticker installation method guide for a transparent LED screen",
    label: "Back-sticker mounting",
  },
];

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
        image="/assets/images/scenes/scene-architecture-facade.jpg"
        imageAlt="Architectural glass curtain-wall facade at dusk with integrated transparent LED content"
        breadcrumb={
          <>
            <a href="/" className="hover:opacity-70">Home</a>
            <span aria-hidden>/</span>
            <span>Solutions</span>
          </>
        }
      />
      <SolutionsList />

      {/* Installation capability — the guides that ship with every system */}
      <section className="py-20 lg:py-28" style={{ background: COLOR.gray }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: COLOR.accent }}
            >
              Specified to install
            </span>
            <h2
              className="mt-4 text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Mounting that's documented, not improvised
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
              Every K1 system ships with step-by-step installation guides for
              both front-facing and back-sticker mounting — so integrators know
              exactly how the panels align, adhere, and connect before they reach
              site.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {INSTALL_GUIDES.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.1}>
                <figure
                  className="overflow-hidden rounded-2xl"
                  style={{ border: `1px solid #D4CFC8`, background: "#fff" }}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      loading="lazy"
                      quality={82}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-contain"
                    />
                  </div>
                  <figcaption
                    className="border-t px-5 py-4 text-sm font-medium"
                    style={{ borderColor: COLOR.gray, color: COLOR.ink }}
                  >
                    {g.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
