import Reveal from "@/components/ui/Reveal";
import { getAllProducts, CATEGORY_LABEL } from "@/lib/products";

/**
 * 01 · Featured Products — the three product lines as .pcard tiles: tagged
 * media, Playfair title, one-line pitch, and the pitch/size meta row.
 */
export default function FeaturedProducts() {
  const products = getAllProducts();

  return (
    <section className="section">
      <div className="container">
        <Reveal className="sec-head wide">
          <div className="kicker">
            <span className="num">01</span> Featured Products
          </div>
          <div className="row">
            <h2 className="title">A transparent LED display for every surface</h2>
            <a className="link-arrow" href="/products">
              View all products →
            </a>
          </div>
          <p>
            Self-adhesive crystal film, holographic invisible screens, and plug-and-play soft LED
            signs.
          </p>
        </Reveal>
        <Reveal className="gridx c3">
          {products.map((product) => (
            <a className="pcard" href={`/products/${product.slug}`} key={product.slug}>
              <div className="media">
                <span className="tag">{CATEGORY_LABEL[product.category]}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.cardImage} alt={product.name} loading="lazy" />
              </div>
              <div className="body">
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
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
          ))}
        </Reveal>
      </div>
    </section>
  );
}
