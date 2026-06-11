import { Suspense } from "react";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { CONTACT } from "@/lib/demo";

export const metadata = pageMetadata({
  title: "Contact — Request a Quote",
  ogTitle: "Contact K1 Visual Solutions — Request a Quote",
  description: `Tell us about your space and the effect you're after. K1 Visual Solutions will come back with the right product, a spec, and an indicative price. Based in ${CONTACT.cityState}.`,
  path: "/contact",
  image: "/assets/images/applications/app-storefront.jpg",
  imageAlt: "Storefront window with a transparent LED display",
});

const DIRECT_LINES = [
  { label: "Office", value: CONTACT.address },
  { label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: "Email", value: CONTACT.email, href: CONTACT.emailHref },
  { label: "Quotes", value: "Within 24 hours" },
  { label: "Resellers", value: "Carton pricing available" },
];

/**
 * /contact — quote-request form in a white card, direct lines beside it, and
 * the "what to include" dark panel for a fast first response.
 */
export default function ContactPage() {
  return (
    <main id="main-content">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact" }])}
      />

      <section className="page-hero" style={{ minHeight: "36vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/applications/app-storefront.jpg"
          alt="Storefront window with a transparent LED display"
        />
        <div className="shade" />
        <div className="container">
          <div className="crumbs">
            <a href="/">Home</a> / Contact
          </div>
          <h1>Tell us about your space</h1>
          <p>
            Dimensions, viewing distance, and a photo if you have one — we&apos;ll come back with
            the right product, a clear spec, and an indicative price within 24 hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="spec-flex">
            <Reveal className="form-card">
              <h2 className="title" style={{ fontSize: 26, marginBottom: 20 }}>
                Request a Quote
              </h2>
              {/* Suspense: the form reads ?product= via useSearchParams for the
                  product-interest pre-fill from detail-page CTAs. */}
              <Suspense fallback={<div style={{ minHeight: 480 }} />}>
                <ContactForm />
              </Suspense>
            </Reveal>
            <Reveal>
              <div className="shared-specs" style={{ marginTop: 0 }}>
                <h3>Direct lines</h3>
                {DIRECT_LINES.map((line) => (
                  <div className="row" key={line.label}>
                    <span>{line.label}</span>
                    <b>{line.href ? <a href={line.href}>{line.value}</a> : line.value}</b>
                  </div>
                ))}
              </div>
              <div className="pitchsel" style={{ marginTop: 24 }}>
                <h3>What to include for a fast quote</h3>
                <p style={{ marginBottom: 0 }}>
                  ① Glass width × height (or wall size) · ② How far viewers stand · ③ Indoor or
                  street-facing · ④ A phone photo of the space. That&apos;s all we need.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
