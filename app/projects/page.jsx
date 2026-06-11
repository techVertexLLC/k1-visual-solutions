import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import CtaBanner from "@/components/home/CtaBanner";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { COLOR, FONT } from "@/components/home/tokens";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/structured-data";
import { PROJECTS } from "@/lib/projects";

export const metadata = pageMetadata({
  // The root layout's title template appends "| K1 Visual Solutions".
  title: "Projects — LED Display Installations Worldwide",
  ogTitle: "Projects — LED Display Installations Worldwide | K1 Visual Solutions",
  description: `Browse ${PROJECTS.length} real LED display installations across 15+ countries — transparent crystal film, holographic, and soft LED screens at work in retail, hospitality, airports, showrooms, and more.`,
  path: "/projects",
  image: "/assets/images/cases/case-coca-cola-experience-p625.jpg",
  imageAlt:
    "Brand experience center wrapped in transparent LED — a K1 Visual Solutions installation",
});

/**
 * /projects — the full installation portfolio. A server-rendered hero and
 * grid HTML (all entries in the static page for crawlers), with filtering,
 * hover playback, and the lightbox layered on by the client-side explorer.
 */
export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      className="page-enter min-h-screen"
      style={{ background: "#FAF8F5" }}
    >
      {/* ItemList enumerating every install (anchored per card) + the
          Home / Projects breadcrumb trail. */}
      <JsonLd
        data={[
          itemListJsonLd({
            name: "K1 Visual Solutions — LED Display Installation Projects",
            description:
              "Real transparent, holographic, and soft LED display installations delivered across 15+ countries.",
            path: "/projects",
            items: PROJECTS.map((p) => ({
              name: p.title,
              path: `/projects#${p.id}`,
            })),
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects" }]),
        ]}
      />

      {/* ── Hero ── */}
      <section aria-label="Our projects" style={{ background: COLOR.bg }}>
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-14 lg:px-10 md:pb-14 md:pt-20">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ color: COLOR.muted }}
          >
            <a href="/" className="hover:opacity-70">
              Home
            </a>
            <span aria-hidden>/</span>
            <span style={{ color: COLOR.accent }}>Projects</span>
          </nav>
          <h1
            className="mt-6 text-4xl leading-[1.05] md:text-6xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Our Projects
          </h1>
          <p
            className="mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: COLOR.body }}
          >
            Real installations across 15+ countries — filter by industry,
            product, or region to see how transparent and flexible LED reads in
            spaces like yours.
          </p>
        </div>
      </section>

      <ProjectsExplorer />

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
