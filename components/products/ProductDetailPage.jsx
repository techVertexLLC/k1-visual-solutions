import Reveal from "@/components/ui/Reveal";
import VideoCard from "@/components/site/VideoCard";
import Tabs from "@/components/site/Tabs";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import PitchSelector from "@/components/site/PitchSelector";

/**
 * ProductDetailPage — the reference-design detail template shared by the
 * three product lines, fully driven by lib/products.js:
 *
 *   page-hero (footage + stat badges) → anchor subnav → 01 What it is
 *   (spec-flex + number strip) → 02 Core Features → 03 Models & Specs
 *   (pill tabs, photo + spec table, shared specs, pitch selector) →
 *   04 Applications gallery (lightbox) → 05 Installation (dark; steps,
 *   method tabs, or app-control panel) → Certifications & Wholesale
 *   (retail only) → Case wall (hover-play) → FAQ accordion → CTA band
 *   + related products.
 *
 * Retail products (Soft LED Display) re-label the anchors ("Sizes & Specs",
 * "Scenarios", "How it works", "Real installs") and gain the wholesale
 * section — same markup, different data.
 */

/* Emoji glyphs for icon-only feature cards (reference uses emoji icons). */
const FEATURE_GLYPHS = {
  eye: "👁",
  layers: "🧱",
  wave: "〰️",
  feather: "🪶",
  shield: "🛡",
  sun: "☀️",
  ruler: "📏",
  sparkle: "✨",
  grid: "🔳",
  plug: "🔌",
  phone: "📱",
  droplet: "💧",
  bolt: "⚡",
  globe: "🌐",
};

/* Split one long paragraph into two at the sentence boundary nearest the
   midpoint — the reference sets "What it is" as a two-paragraph column. */
function splitParagraphs(text) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (!sentences || sentences.length < 2) return [text];
  let first = "";
  for (const s of sentences) {
    if (first.length + s.length / 2 > text.length / 2 && first) break;
    first += s;
  }
  return [first.trim(), text.slice(first.length).trim()].filter(Boolean);
}

/* Parse "≥ 6 m" → 6 (viewing-distance spec → pitch-selector threshold). */
function parseDistance(value) {
  const m = String(value || "").match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : null;
}

function SectionHead({ num, kicker, title, intro, link, children }) {
  return (
    <Reveal className={`sec-head${link ? " wide" : ""}`}>
      <div className="kicker">
        <span className="num">{num}</span> {kicker}
      </div>
      {link ? (
        <div className="row">
          <h2 className="title">{title}</h2>
          <a className="link-arrow" href={link.href}>
            {link.label}
          </a>
        </div>
      ) : (
        <h2 className="title">{title}</h2>
      )}
      {intro && <p>{intro}</p>}
      {children}
    </Reveal>
  );
}

function FeatureCard({ feature }) {
  const { title, description, media, icon } = feature;
  return (
    <Reveal className="feat">
      {media?.type === "video" && (
        <div className="media">
          <VideoCard
            video={media.src}
            poster={media.poster}
            style={{ borderRadius: 0, height: "100%" }}
          />
        </div>
      )}
      {media?.type === "image" && (
        <div className="media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.src} alt={title} loading="lazy" />
        </div>
      )}
      <div className="body">
        {!media && (
          <div className="icon" aria-hidden>
            {FEATURE_GLYPHS[icon] || "✦"}
          </div>
        )}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Reveal>
  );
}

function ModelPane({ product, model }) {
  return (
    <div className="spec-flex">
      <div className="photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={model.image} alt={`${product.name} — ${model.name}`} loading="lazy" />
      </div>
      <table className="spec-table">
        <thead>
          <tr>
            <th colSpan={2}>
              {product.name} — {model.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(model.specs).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StepCard({ step }) {
  return (
    <div className="step">
      <div className="n">{String(step.number).padStart(2, "0")}</div>
      <h4>{step.title}</h4>
      <p>{step.description}</p>
    </div>
  );
}

export default function ProductDetailPage({ product, related = [] }) {
  const retail = product.productType === "retail";
  const installation = product.installation || {};

  /* Sequential section numbering — sections only count when they render. */
  let sectionIndex = 0;
  const nextNum = () => String(++sectionIndex).padStart(2, "0");

  const specsLabel = retail ? "Sizes & Specs" : "Specs";
  const appsLabel = retail ? "Scenarios" : "Applications";
  const installLabel = retail ? "How it works" : "Installation";
  const casesLabel = retail ? "Real installs" : "Cases";

  /* Pitch selector thresholds from the models' viewing-distance specs. */
  const pitchModels = !retail
    ? product.models
        .map((m) => ({
          name: m.name,
          dist: parseDistance(m.specs["Viewing Distance"]),
          note: [
            m.specs["Transparency"] ? `${m.specs["Transparency"]} transparency` : null,
            m.specs["Viewing Distance"] ? `viewing ${m.specs["Viewing Distance"]}` : null,
          ]
            .filter(Boolean)
            .join(" · "),
        }))
        .filter((m) => m.dist != null)
    : [];
  const pitchTriples = pitchModels.map((m, i) => [
    i === pitchModels.length - 1 ? 999 : m.dist,
    m.name,
    m.note,
  ]);
  const sliderMax = pitchModels.length
    ? Math.ceil(pitchModels[pitchModels.length - 1].dist + 10)
    : 30;
  const sliderInitial = pitchModels.length ? Math.max(2, Math.round(pitchModels[0].dist)) : 6;

  const whatParagraphs = splitParagraphs(product.whatIsIt.text);

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero" style={{ minHeight: "72vh" }}>
        {product.hero?.video ? (
          <video autoPlay muted loop playsInline poster={product.hero.poster}>
            <source src={product.hero.video} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.hero?.poster || product.cardImage} alt={product.name} />
        )}
        <div className="shade" />
        <div className="container">
          <div className="crumbs">
            <a href="/">Home</a> / <a href="/products">Products</a> / {product.name}
          </div>
          <h1>{product.name}</h1>
          <p>
            {product.subtitle} {product.tagline}
          </p>
          <div className="actions">
            <a className="btn light" href={product.cta.primary.href}>
              {product.cta.primary.label}
            </a>
            {product.cta.secondary && (
              <a
                className="btn ghost onDark"
                href={product.cta.secondary.href}
                {...(product.cta.secondary.href.endsWith(".pdf")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {product.cta.secondary.label}
                {product.cta.secondary.href.startsWith("#") ? " ↓" : ""}
              </a>
            )}
          </div>
          <div className="stat-badges" style={{ marginTop: 28 }}>
            {(product.hero?.stats || []).map((stat) => (
              <div className="stat-badge" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Anchor subnav ── */}
      <nav className="subnav" aria-label="Page sections">
        <div className="container">
          <a href="#what">What it is</a>
          <a href="#models">{specsLabel}</a>
          <a href="#applications">{appsLabel}</a>
          <a href="#installation">{installLabel}</a>
          {retail && product.certifications && <a href="#wholesale">Certifications</a>}
          <a href="#cases">{casesLabel}</a>
          {product.faq?.length > 0 && <a href="#faq">FAQ</a>}
          <a className="quote" href={product.cta.primary.href}>
            {product.cta.primary.label} →
          </a>
        </div>
      </nav>

      {/* ── 01 What it is ── */}
      <section className="section" id="what">
        <div className="container">
          <div className="spec-flex">
            <Reveal>
              <div className="kicker">
                <span className="num">{nextNum()}</span> What it is
              </div>
              <h2 className="title">What is the {product.name.replace(/^SMD /, "")}?</h2>
              {whatParagraphs.map((paragraph, i) => (
                <p key={i} style={{ marginTop: i === 0 ? 18 : 14, color: "var(--ink2)" }}>
                  {paragraph}
                </p>
              ))}
              <p className="card-label" style={{ marginTop: 18 }}>
                {product.whatIsIt.scenarios.join(" · ")}
              </p>
            </Reveal>
            <Reveal className="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.whatIsIt.image} alt={product.name} loading="lazy" />
            </Reveal>
          </div>
          <Reveal className="numstrip" style={{ marginTop: 60 }}>
            {product.statsBar.map((stat) => (
              <div className="cell" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 02 Core Features ── */}
      {product.features?.length > 0 && (
        <section className="section tight" style={{ paddingTop: 0 }}>
          <div className="container">
            <SectionHead num={nextNum()} kicker="Core Features" title="Why teams specify it" />
            <div className="gridx c3">
              {product.features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 03 Models & Specs ── */}
      <section className="section" id="models" style={{ background: "var(--paper2)" }}>
        <div className="container">
          <SectionHead
            num={nextNum()}
            kicker={retail ? "Sizes & Specs" : "Models & Specs"}
            title={retail ? "Choose your size" : "Find the right model"}
            intro={retail ? product.choosingGuide : undefined}
          />
          <Tabs
            items={product.models.map((model) => ({
              label: model.name,
              pane: <ModelPane product={product} model={model} />,
            }))}
          />
          <Reveal className="shared-specs">
            <h3>{retail ? "Every model includes" : "Shared across every model"}</h3>
            <div className="grid-mini">
              {Object.entries(product.sharedSpecs).map(([key, value]) => (
                <div className="row" key={key}>
                  <span>{key}</span>
                  <b>{value}</b>
                </div>
              ))}
            </div>
            {product.powerNote && (
              <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)" }}>
                {product.powerNote}
              </p>
            )}
          </Reveal>
          {!retail && pitchTriples.length > 0 && (
            <Reveal>
              <PitchSelector
                models={pitchTriples}
                min={2}
                max={sliderMax}
                initial={sliderInitial}
                intro={product.choosingGuide}
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 04 Applications ── */}
      <section className="section" id="applications">
        <div className="container">
          <SectionHead
            num={nextNum()}
            kicker={appsLabel}
            title={retail ? "Built for main-street storefronts" : "Where it earns its keep"}
            intro="Tap any scene to take a closer look."
          />
          <Reveal>
            <GalleryLightbox items={product.applications} />
          </Reveal>
        </div>
      </section>

      {/* ── 05 Installation / How it works ── */}
      <section className="section dark" id="installation">
        <div className="container">
          <SectionHead num={nextNum()} kicker={installLabel} title={installation.tagline} />

          {/* Method tabs (holographic: Front Facing / Back Sticker) */}
          {installation.methods ? (
            <>
              <Tabs
                items={installation.methods.map((method, i) => ({
                  label: `${method.name} — ${method.steps.length} steps`,
                  pane: (
                    <div className="spec-flex">
                      {installation.guides?.[i] &&
                      !installation.guides[i].href.endsWith(".pdf") ? (
                        <div className="photo">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={installation.guides[i].href}
                            alt={installation.guides[i].label}
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <div className="steps col">
                        {method.steps.map((step) => (
                          <StepCard key={step.number} step={step} />
                        ))}
                      </div>
                    </div>
                  ),
                }))}
              />
              {installation.guides?.length > 0 && (
                <p style={{ marginTop: 26 }}>
                  {installation.guides.map((guide) => (
                    <a
                      className="link-arrow"
                      style={{ marginRight: 26 }}
                      key={guide.href}
                      href={guide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {guide.label} ↓
                    </a>
                  ))}
                </p>
              )}
            </>
          ) : retail && product.appControl ? (
            /* Soft LED: steps on the left, app + remote panel on the right */
            <div className="spec-flex">
              <div className="steps col">
                {(installation.steps || []).map((step) => (
                  <Reveal key={step.number}>
                    <StepCard step={step} />
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <div className="photo" style={{ borderRadius: 18, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.appControl.remoteImage}
                    alt={`${product.appControl.app} app and remote control`}
                    loading="lazy"
                  />
                </div>
                <p style={{ marginTop: 14, fontSize: 14, color: "#b3aca2" }}>
                  App features: {product.appControl.features.join(" · ")}
                </p>
              </Reveal>
            </div>
          ) : (
            <div className="steps">
              {(installation.steps || []).map((step) => (
                <Reveal key={step.number}>
                  <StepCard step={step} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Certifications & Wholesale (retail only) ── */}
      {retail && product.certifications && (
        <section className="section" id="wholesale" style={{ background: "var(--paper2)" }}>
          <div className="container">
            <SectionHead
              num={nextNum()}
              kicker="Certifications & Wholesale"
              title="Certified, boxed, and ready to distribute"
              intro={product.wholesale?.note}
            />
            <Reveal className="certs">
              {product.certifications.map((cert) => (
                <div className="cert" key={cert.name}>
                  <b>{cert.name}</b>
                  <span>{cert.region}</span>
                  {cert.file && (
                    <div>
                      <a href={cert.file} target="_blank" rel="noopener noreferrer">
                        Download PDF
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </Reveal>
            {product.wholesale?.cartons && (
              <Reveal>
                <table className="cmp" style={{ marginTop: 30 }}>
                  <thead>
                    <tr>
                      <th>Distributor pack</th>
                      {product.wholesale.cartons.map((carton) => (
                        <th key={carton.model}>{carton.model}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Units per carton</td>
                      {product.wholesale.cartons.map((carton) => (
                        <td key={carton.model}>{carton.units}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Carton size</td>
                      {product.wholesale.cartons.map((carton) => (
                        <td key={carton.model}>{carton.carton}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Carton weight</td>
                      {product.wholesale.cartons.map((carton) => (
                        <td key={carton.model}>{carton.weight}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                {product.wholesale?.cta && (
                  <p style={{ marginTop: 20 }}>
                    <a className="btn" href={product.wholesale.cta.href}>
                      {product.wholesale.cta.label}
                    </a>
                  </p>
                )}
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ── Case wall ── */}
      <section className="section" id="cases">
        <div className="container">
          <SectionHead
            num={nextNum()}
            kicker={retail ? "Real installs" : "Case Studies"}
            title={retail ? "Storefronts, on camera" : "Real installs, rolling"}
            intro="Hover (or tap) any project to play it."
            link={{ label: "View all projects →", href: "/projects" }}
          />
          <Reveal className="gridx c3">
            {product.cases.map((caseStudy) => (
              <VideoCard
                key={caseStudy.title}
                video={caseStudy.video}
                poster={caseStudy.poster}
                title={caseStudy.title}
                sub={[caseStudy.model, caseStudy.location].filter(Boolean).join(" · ")}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      {product.faq?.length > 0 && (
        <section className="section tight" id="faq" style={{ background: "var(--paper2)" }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <SectionHead num={nextNum()} kicker="FAQ" title="Questions, answered" />
            <Reveal className="faq">
              {product.faq.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── CTA + related ── */}
      <section className="section tight">
        <div className="container">
          <Reveal className="ctaband">
            <div>
              <h2>
                {retail
                  ? "Stock it, sell it, or light up your own storefront"
                  : `Let's spec the ${product.name.replace(/^SMD /, "")} for your space`}
              </h2>
              <p>
                {retail
                  ? "Unit pricing, carton pricing, or a reseller agreement — we come back within 24 hours."
                  : "Send the glazing dimensions and viewing distance — right pitch, clear spec, indicative price within 24 hours."}
              </p>
            </div>
            <div className="actions">
              <a className="btn light" href={product.cta.primary.href}>
                {product.cta.primary.label}
              </a>
              {retail && product.cta.secondary && (
                <a className="btn ghost onDark" href={product.cta.secondary.href}>
                  {product.cta.secondary.label}
                </a>
              )}
            </div>
          </Reveal>
          {related.length > 0 && (
            <Reveal className="gridx c2" style={{ marginTop: 26 }}>
              {related.map((rel) => (
                <a className="pcard" href={`/products/${rel.slug}`} key={rel.slug}>
                  <div className="media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rel.cardImage} alt={rel.name} loading="lazy" />
                  </div>
                  <div className="body">
                    <h3>{rel.name}</h3>
                    <p>{rel.shortDescription}</p>
                    <div className="meta">
                      <div>
                        <div className="card-label">
                          {rel.productType === "retail" ? "Sizes" : "Pixel pitch"}
                        </div>
                        <b>{rel.pixelPitch}</b>
                      </div>
                      <span className="link-arrow">View →</span>
                    </div>
                  </div>
                </a>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
