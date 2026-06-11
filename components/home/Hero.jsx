/**
 * Home hero — full-bleed installation footage under a left-weighted shade,
 * eyebrow kicker, Playfair headline, lead, two CTAs, and frosted stat badges.
 */
export default function Hero() {
  return (
    <section className="hero">
      <video autoPlay muted loop playsInline poster="/assets/images/hero-poster.jpg">
        <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="shade" />
      <div className="container">
        <div className="eyebrow">Invisible Displays · North America</div>
        <h1>Redefining spaces with invisible displays</h1>
        <p className="lead">
          Premium transparent, holographic &amp; flexible LED display solutions for architecture,
          retail, and exhibitions — engineered in our partner factories, delivered and supported
          across North America.
        </p>
        <div className="actions">
          <a className="btn light" href="/products">
            Explore Products →
          </a>
          <a className="btn ghost onDark" href="/contact">
            Request a Quote
          </a>
        </div>
        <div className="stat-badges">
          <div className="stat-badge">
            <b>Up to 95%</b>
            <span>Transparency</span>
          </div>
          <div className="stat-badge">
            <b>2.5 mm</b>
            <span>Thinnest screen body</span>
          </div>
          <div className="stat-badge">
            <b>100,000 h</b>
            <span>LED lifespan</span>
          </div>
          <div className="stat-badge">
            <b>3-Year</b>
            <span>Warranty &amp; local support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
