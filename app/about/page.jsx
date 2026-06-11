import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/site/Counter";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CONTACT } from "@/lib/demo";
import { PROJECTS } from "@/lib/projects";

export const metadata = pageMetadata({
  title: "About — LED Display Distributor for North America",
  ogTitle: `About ${CONTACT.companyLegal} — Our Mission & Story`,
  description: `K1 Visual Solutions is an ${CONTACT.cityState} distributor of premium transparent, flexible and holographic LED display systems, serving architects, retail brands and integrators across North America.`,
  path: "/about",
  image: "/assets/images/k1-office-render.jpg",
  imageAlt: `${CONTACT.companyLegal} office`,
});

/**
 * /about — "Why K1": the factory-direct / local-service model, the number
 * strip that backs it up, manufacturing partners, and a person to call.
 */
export default function AboutPage() {
  return (
    <main id="main-content">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About" }])}
      />

      <section className="page-hero" style={{ minHeight: "42vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/applications/app-lobby.jpg"
          alt="Corporate lobby with a transparent LED display"
        />
        <div className="shade" />
        <div className="container">
          <div className="crumbs">
            <a href="/">Home</a> / About
          </div>
          <h1>Why K1</h1>
          <p>
            Factory-direct pricing. North American service. That&apos;s the whole pitch —
            here&apos;s how we back it up.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="numstrip">
            <div className="cell">
              <b>
                <Counter value={3} />
              </b>
              <span>product families in stock</span>
            </div>
            <div className="cell">
              <b>
                <Counter value={PROJECTS.length} suffix="+" />
              </b>
              <span>documented projects</span>
            </div>
            <div className="cell">
              <b>3-Year</b>
              <span>warranty</span>
            </div>
            <div className="cell">
              <b>24 h</b>
              <span>quote turnaround</span>
            </div>
            <div className="cell">
              <b>FCC · CE · UL</b>
              <span>certified hardware</span>
            </div>
          </Reveal>

          <div className="spec-flex" style={{ marginTop: 70 }}>
            <Reveal>
              <div className="kicker">
                <span className="num">01</span> The model
              </div>
              <h2 className="title">Manufacturer pricing, without the overseas support gap</h2>
              <p style={{ marginTop: 16, color: "var(--ink2)" }}>
                K1 Visual Solutions ({CONTACT.companyLegal}) partners directly with leading
                transparent-LED factories in Shenzhen — the same production lines behind the
                projects on our Projects page. We hold stock and a warranty desk in{" "}
                {CONTACT.cityState}, provide installation guidance in your timezone, and answer
                quotes within 24 hours.
              </p>
              <p style={{ marginTop: 14, color: "var(--ink2)" }}>
                You get the price of buying at the source, with a partner who picks up the phone in
                North America.
              </p>
            </Reveal>
            <Reveal className="photo" style={{ border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", background: "#fff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/k1-office-render.jpg"
                alt="K1 Visual Solutions office — interior render"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Reveal>
          </div>

          <Reveal className="sec-head" style={{ marginTop: 80 }}>
            <div className="kicker">
              <span className="num">02</span> Manufacturing partners
            </div>
            <h2 className="title">Built on proven production lines</h2>
            <p>
              Our partner factories run full-chain production — LED encapsulation, SMT, adhesive
              potting, aging tests — with the certifications to show for it (FCC, CE-RED, UKCA, UL
              test reports on file, downloadable per product).
            </p>
          </Reveal>

          <Reveal className="ctaband" style={{ marginTop: 40 }}>
            <div>
              <h2>Talk to a person, not a portal</h2>
              <p>
                {CONTACT.phone} · {CONTACT.email} · {CONTACT.cityState}
              </p>
            </div>
            <div className="actions">
              <a className="btn light" href="/contact">
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
