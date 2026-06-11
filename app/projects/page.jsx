import Reveal from "@/components/ui/Reveal";
import VideoCard from "@/components/site/VideoCard";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/structured-data";
import { PROJECTS } from "@/lib/projects";

export const metadata = pageMetadata({
  title: "Projects — LED Display Installations Worldwide",
  ogTitle: "Projects — LED Display Installations Worldwide | K1 Visual Solutions",
  description: `Browse ${PROJECTS.length} real LED display installations across 15+ countries — transparent crystal film, holographic, and soft LED screens at work in retail, hospitality, airports, showrooms, and more.`,
  path: "/projects",
  image: "/assets/images/cases/case-coca-cola-experience-p625.jpg",
  imageAlt:
    "Brand experience center wrapped in transparent LED — a K1 Visual Solutions installation",
});

/* The portfolio reads as three product walls, reference cases.html order. */
const GROUPS = [
  {
    product: "crystal-film",
    kicker: "Crystal Film LED Screen",
    title: "Architecture & retail glazing",
    grid: "c3",
    href: "/products/crystal-film",
  },
  {
    product: "holographic",
    kicker: "Holographic Invisible Screen",
    title: "Showrooms & premium glass",
    grid: "c3",
    href: "/products/holographic",
  },
  {
    product: "soft-led-display",
    kicker: "Soft LED Display",
    title: "North American storefronts",
    grid: "c4",
    href: "/products/soft-led-display",
  },
];

/**
 * /projects — every documented installation, grouped by product family.
 * Hover (or tap) a card to roll the footage; photo-only documentation
 * renders as a still.
 */
export default function ProjectsPage() {
  return (
    <main id="main-content">
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

      <section className="page-hero" style={{ minHeight: "42vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/cases/case-coca-cola-experience-p625.jpg"
          alt="Brand experience center wrapped in transparent LED"
        />
        <div className="shade" />
        <div className="container">
          <div className="crumbs">
            <a href="/">Home</a> / Projects
          </div>
          <h1>Light, set into real places</h1>
          <p>
            From airport concourses to main-street storefronts — every project below is documented
            on camera. Hover any clip to play.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {GROUPS.map((group, gi) => {
            const items = PROJECTS.filter((p) => p.product === group.product);
            if (items.length === 0) return null;
            return (
              <div key={group.product}>
                <Reveal
                  className="sec-head wide"
                  style={gi > 0 ? { marginTop: 80 } : undefined}
                >
                  <div className="kicker">
                    <span className="num">{String(gi + 1).padStart(2, "0")}</span> {group.kicker}
                  </div>
                  <div className="row">
                    <h2 className="title">{group.title}</h2>
                    <a className="link-arrow" href={group.href}>
                      View the product →
                    </a>
                  </div>
                </Reveal>
                <Reveal className={`gridx ${group.grid}`}>
                  {items.map((project) => (
                    <div key={project.id} id={project.id}>
                      <VideoCard
                        video={project.video}
                        poster={project.poster}
                        title={project.title}
                        sub={[project.model, project.location].filter(Boolean).join(" · ")}
                      />
                    </div>
                  ))}
                </Reveal>
              </div>
            );
          })}

          <Reveal className="ctaband" style={{ marginTop: 80 }}>
            <div>
              <h2>Your project could be next on this page</h2>
              <p>
                Send dimensions and a photo of the space — spec and indicative price within 24
                hours.
              </p>
            </div>
            <div className="actions">
              <a className="btn light" href="/contact">
                Request a Quote
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
