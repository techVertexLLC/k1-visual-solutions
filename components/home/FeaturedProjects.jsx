import Reveal from "@/components/ui/Reveal";
import VideoCard from "@/components/site/VideoCard";
import { getFeaturedCases, CATEGORY_LABEL } from "@/lib/products";

/* "/products/<slug>#cases" → the short product label for the caption. */
function shortLabel(item) {
  const slug = item.href?.match(/\/products\/([^#]+)/)?.[1];
  return CATEGORY_LABEL[slug] || item.productName;
}

/**
 * 02 · Featured Projects — dark section, four flagship case clips that roll
 * on hover. Picks come from lib/products#getFeaturedCases so the rail always
 * mirrors the product case walls.
 */
export default function FeaturedProjects() {
  const cases = getFeaturedCases();

  return (
    <section className="section dark">
      <div className="container">
        <Reveal className="sec-head wide">
          <div className="kicker">
            <span className="num">02</span> Featured Projects
          </div>
          <div className="row">
            <h2 className="title">Proven on glass, at scale</h2>
            <a className="link-arrow" href="/projects">
              View all projects →
            </a>
          </div>
          <p>
            Airports, global brands, showrooms, and storefronts — hover any project to roll the
            footage.
          </p>
        </Reveal>
        <Reveal className="gridx c4">
          {cases.map((item) => (
            <VideoCard
              key={item.title}
              video={item.video}
              poster={item.poster}
              title={item.title}
              sub={[shortLabel(item), item.model].filter(Boolean).join(" · ")}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
