/**
 * Schema.org JSON-LD builders — the single source of truth for the site's
 * structured data. Each function returns a plain object; render it with the
 * <JsonLd> component (components/ui/JsonLd.jsx).
 *
 * Everything that touches company identity reads from lib/demo.js#CONTACT, so
 * the structured data automatically follows demo mode (neutral placeholders)
 * vs. production (real K1 details) — never hardcode an address or phone here.
 *
 * Entity @ids let the graph cross-reference itself: a Product's `seller` and a
 * BreadcrumbList can point back at the Organization emitted site-wide by the
 * root layout, instead of duplicating it. Consumers (Google) merge every
 * JSON-LD block on a page into one graph, so a reference in one <script> tag
 * resolves against the Organization declared in another.
 */

import { CONTACT } from "@/lib/demo";
import { SOCIAL_LINKS } from "@/components/ui/social";

export const SITE_URL = "https://k1visual.com";

/** Resolve a site-root-relative path to an absolute URL (passes through full URLs). */
export function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Stable identifiers for the site-wide entities declared once in the layout.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Only real, off-site social profiles belong in `sameAs` — placeholder "#"
// links (none ship today) are filtered out so we never assert a fake profile.
const REAL_SOCIAL = SOCIAL_LINKS.map((s) => s.href).filter((href) =>
  /^https?:\/\//.test(href || "")
);

/**
 * Organization + LocalBusiness for K1 Visual Solutions. `name` stays the brand;
 * `legalName` carries the operating entity (which swaps in demo mode).
 */
export function organizationJsonLd() {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: "K1 Visual Solutions",
    legalName: CONTACT.companyLegal,
    url: SITE_URL,
    logo: absoluteUrl("/assets/images/k1-logo.png"),
    image: absoluteUrl("/assets/images/k1-office-render.jpg"),
    description:
      "Premium distributor of transparent, flexible, and holographic LED display solutions across North America.",
    email: CONTACT.email,
    telephone: CONTACT.phoneIntl,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postalCode,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneIntl,
      email: CONTACT.email,
      contactType: "sales",
      areaServed: ["US", "CA"],
      availableLanguage: ["English"],
    },
    ...(REAL_SOCIAL.length > 0 ? { sameAs: REAL_SOCIAL } : {}),
  };
}

/** The website entity, published by the Organization. */
export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "K1 Visual Solutions",
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Site-wide graph rendered once in the root layout: Organization/LocalBusiness
 * + WebSite, so the two entities are declared on every page for cross-reference.
 */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd()],
  };
}

/**
 * BreadcrumbList from an ordered list of { name, path? } crumbs. The final
 * crumb (current page) is conventionally listed without a link.
 */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

/**
 * Product schema for a /products/[slug] page. Pulls every gallery image and
 * turns the spec table into additionalProperty rows so search engines can read
 * pitch / brightness / transparency directly. No price is asserted — K1 sells
 * on a per-project quote, so the Offer carries availability and condition only.
 */
export function productJsonLd(product) {
  const url = absoluteUrl(`/products/${product.slug}`);
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery.map((g) => absoluteUrl(g.src))
      : [absoluteUrl(product.cardImage)];

  const additionalProperty = product.specs
    ? Object.entries(product.specs).map(([name, value]) => ({
        "@type": "PropertyValue",
        name,
        value: String(value),
      }))
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description:
      product.shortDescription || product.description?.slice(0, 250) || product.name,
    image: images,
    sku: product.slug,
    category: "Transparent LED Display",
    brand: { "@type": "Brand", name: "K1 Visual Solutions" },
    manufacturer: { "@type": "Organization", name: CONTACT.companyLegal },
    url,
    ...(additionalProperty ? { additionalProperty } : {}),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
    },
  };
}

/** FAQPage from a list of { q, a } items. */
export function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
