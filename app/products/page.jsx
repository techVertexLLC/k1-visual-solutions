import Reveal from "@/components/ui/Reveal";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { getAllProducts, CATEGORY_LABEL } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Products — Transparent, Holographic & Flexible LED",
  ogTitle: "K1 Products — Transparent, Holographic & Flexible LED",
  description:
    "Three product lines — Crystal Film LED Screen, SMD Holographic Invisible Screen, and the plug-and-play Soft LED Display. Compare key specs side by side and find the right transparent LED for your project.",
  path: "/products",
  image: "/assets/images/products/smd-p625-new-01.jpg",
  imageAlt: "K1 SMD holographic LED panel detail",
});

/* "Which one do I need?" — values in PRODUCTS order (crystal-film,
   holographic, soft-led-display); `hl` marks the standout cell per row. */
const COMPARE_ROWS = [
  { label: "Form", values: ["Engineered per project", "Engineered per project", "Plug-and-play unit"], hl: 2 },
  { label: "Pitch / matrix", values: ["P6.25 – P20", "P2.5 – P10", "16-dot matrix"], hl: 1 },
  { label: "Transparency", values: ["90 – 95%", "70 – 93%", "—"], hl: 0 },
  { label: "Thickness", values: ["2.5 mm", "< 3 mm", "Soft body"], hl: 0 },
  { label: "Best viewing", values: ["6 – 20 m", "2.5 – 10 m", "Street-side"], hl: 1 },
  {
    label: "Typical use",
    values: ["Facades · large glazing", "Premium windows · showrooms", "Small-business storefronts"],
    hl: -1,
  },
  { label: "Relative price", values: ["$$$", "$$$", "$"], hl: 2 },
];

/**
 * /products — the range: one wide card per product line, then the
 * "Which one do I need?" comparison table.
 */
export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main id="main-content">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Products" }])}
      />

      <section className="page-hero" style={{ minHeight: "42vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/scenes/scene-architecture-facade.jpg"
          alt="Curved glass facade carrying LED content at night"
        />
        <div className="shade" />
        <div className="container">
          <div className="crumbs">
            <a href="/">Home</a> / Products
          </div>
          <h1>The Range</h1>
          <p>
            Three families of see-through and flexible display systems — engineered to disappear
            into architecture and reappear as motion, colour, and presence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gridx" style={{ gap: 34 }}>
            {products.map((product) => (
              <Reveal key={product.slug}>
                <a className="pcard wide" href={`/products/${product.slug}`}>
                  <div className="media">
                    <span className="tag">{CATEGORY_LABEL[product.category]}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.cardImage} alt={product.name} loading="lazy" />
                  </div>
                  <div className="body">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="card-label" style={{ marginTop: 6 }}>
                      {(product.hero?.stats || [])
                        .map((stat) => `${stat.value} ${stat.label.toLowerCase()}`)
                        .join(" · ")}
                    </p>
                    <div className="meta">
                      <div>
                        <div className="card-label">
                          {product.productType === "retail" ? "Sizes" : "Pixel Pitch"}
                        </div>
                        <b>{product.pixelPitch}</b>
                      </div>
                      <span className="link-arrow">View Details →</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="sec-head" style={{ marginTop: 80 }}>
            <div className="kicker">
              <span className="num">—</span> Compare
            </div>
            <h2 className="title">Which one do I need?</h2>
          </Reveal>
          <Reveal>
            <table className="cmp">
              <thead>
                <tr>
                  <th></th>
                  {products.map((product) => (
                    <th key={product.slug}>{CATEGORY_LABEL[product.category]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className={row.hl === i ? "hl" : undefined}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
