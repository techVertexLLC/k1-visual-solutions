# SEO / Content / Layout Optimization Spec

> Generated from Coffee Time discussion (Cora + Steve, 2026-06-09)
> Owner: Steve (implementation) | Cora (spec & validation)

## Current State Assessment

### ✅ Already Done
- `lib/seo.js` with `pageMetadata()` helper — OG/Twitter cards
- Most pages use `pageMetadata()` (home, products, catalog, contact, solutions)
- Product detail pages have `generateMetadata()` with dynamic titles
- CTA already says "Request a Quote" (Hero, Navbar, CtaBanner)
- Product data has `shortDescription`, `description`, `features`, `applications`
- Alt text on product gallery images

### ❌ Missing / Needs Fix
1. **SITE_URL is wrong**: `k1visualsolutions.com` → should be `k1visual.com`
2. **No sitemap.xml** — Google can't discover pages
3. **No robots.txt** — no crawl directives
4. **No JSON-LD structured data** — no rich snippets in search
5. **About page** doesn't use `pageMetadata()` helper (manual metadata, missing twitter card)
6. **Product detail pages** missing twitter card, og:image
7. **No `<article>` or `aria-label`** on content sections
8. **Product descriptions** are decent but lack scene-based value propositions as the FIRST thing visitors see
9. **Mobile spacing** inconsistencies

---

## P0 — SEO Infrastructure (Steve, one PR)

### 1. Fix SITE_URL
- `lib/seo.js`: change `https://k1visualsolutions.com` → `https://k1visual.com`
- `app/layout.jsx`: same fix
- `app/products/[slug]/page.jsx`: fix hardcoded URL in generateMetadata
- `app/about/page.jsx`: fix hardcoded openGraph.url

### 2. Create `app/sitemap.js`
```js
import { getAllProducts } from "@/lib/products";

const BASE = "https://k1visual.com";

export default function sitemap() {
  const products = getAllProducts().map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const pages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/catalog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  return [...pages, ...products];
}
```

### 3. Create `app/robots.js`
```js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/moodboard", "/variant-a", "/variant-b"],
      },
    ],
    sitemap: "https://k1visual.com/sitemap.xml",
  };
}
```

### 4. JSON-LD Structured Data

Add to `app/layout.jsx` (site-wide Organization + LocalBusiness):
```jsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "K1 Visual Solutions",
  "legalName": "K1trends Global Inc.",
  "url": "https://k1visual.com",
  "logo": "https://k1visual.com/assets/images/k1-logo.png",
  "description": "Premium distributor of transparent, flexible, and holographic LED display solutions across North America.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "525 W Wrightwood Avenue",
    "addressLocality": "Elmhurst",
    "addressRegion": "IL",
    "postalCode": "60126",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "Canada" }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-630-359-5931",
    "contactType": "sales",
    "email": "Andrewxu@vertexdistributor.com"
  },
  "sameAs": []
})}} />
```

Add Product JSON-LD to each product detail page (`app/products/[slug]/page.jsx`):
```jsx
// Inside the component, before return:
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.shortDescription || product.description?.slice(0, 200),
  "image": `https://k1visual.com${product.cardImage}`,
  "brand": { "@type": "Brand", "name": "K1 Visual Solutions" },
  "manufacturer": { "@type": "Organization", "name": "K1trends Global Inc." },
  "category": "LED Display",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "K1trends Global Inc." }
  }
};

// In JSX, add before <ProductDetail>:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

### 5. Fix About page to use `pageMetadata()`
```js
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About — K1trends Global Inc.",
  ogTitle: "About K1trends Global Inc. — Our Mission & Story",
  description: "K1 Visual Solutions is an Elmhurst, IL distributor of premium transparent, flexible and holographic LED display systems, serving architects, retail brands and integrators across North America.",
  path: "/about",
  image: "/assets/images/k1-office-render.jpg",
  imageAlt: "K1trends Global Inc. office",
});
```

### 6. Fix Product detail generateMetadata to include twitter card + og:image
```js
export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — Transparent LED Display | K1`,
    description: product.shortDescription || product.description?.slice(0, 150),
    openGraph: {
      title: `${product.name} — K1 Visual Solutions`,
      description: product.shortDescription || product.description?.slice(0, 150),
      url: `https://k1visual.com/products/${params.slug}`,
      type: "website",
      images: [{ url: product.cardImage, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — K1 Visual Solutions`,
      description: product.shortDescription || product.description?.slice(0, 150),
      images: [product.cardImage],
    },
  };
}
```

---

## P1 — Content Optimization

### 7. Add scene-based value propositions to product data

In `lib/products.js`, add a `valueProposition` field to each product. This should be the FIRST text visitors see, BEFORE specs. Examples:

**Holographic series:**
- P3.91: "Turn any storefront glass into a captivating holographic canvas — delivering crisp, depth-rich visuals that stop foot traffic while keeping the space behind fully visible."
- P6.25: "The go-to choice for architects designing atriums, escalator voids, and feature walls — bright enough to cut through daylight, transparent enough to preserve the open feel."
- P10.4: "Cover large building facades and expo halls at a fraction of the cost per square metre — ideal for venues where viewing distance makes ultra-fine pitch unnecessary."

**Series T (Transparent Poster):**
- T1: "A freestanding digital poster that replaces static signage in retail lobbies and airport terminals — plug-and-play with built-in media player, no custom mounting required."

**Series F (Flexible Film):**
- F1: "A self-adhesive LED film that transforms any existing glass surface into a digital display — no structural modification, no frame, just peel-and-stick transparency."

**Crystal Film:**
- "Ultra-thin crystal LED film bonded directly onto glass — completely invisible when off, strikingly vivid when on. The closest thing to a true 'invisible display'."

### 8. Restructure product detail page information hierarchy

Current: H1 → specs table → features list
Target: H1 → **value proposition (2-3 sentences)** → key benefits (3 icons) → CTA → specs (collapsible) → gallery

### 9. SEO keyword integration in H1/H2

Target keywords per page:
| Page | H1 keywords to include naturally |
|------|----------------------------------|
| Home | "transparent LED display", "North America" |
| Products | "transparent LED", "holographic LED", "flexible LED" |
| Catalog | "commercial LED display", "LED screen catalog" |
| Solutions | "retail digital signage", "architectural LED" |
| About | "LED display distributor", "North America" |
| Contact | "LED display quote", "commercial LED inquiry" |

Product pages: include `{product.name}` + "transparent LED display" naturally in H1.

---

## P2 — Layout & Accessibility Polish

### 10. Semantic HTML + aria-label
- Add `aria-label` to all `<section>` elements
- Wrap product descriptions in `<article>`
- Use `<nav aria-label="Breadcrumb">` for breadcrumbs

### 11. Mobile spacing audit
- Standardize section padding: `py-16 md:py-24` across all pages
- Ensure consistent gap between product cards
- Typography scale check: h1=`text-3xl md:text-5xl`, h2=`text-2xl md:text-4xl`

### 12. Image alt text audit
- Ensure all images have descriptive alt text including product name + use case
- Format: "[Product Name] [context]" e.g. "SMD Holographic LED P3.91 installed in retail window"

---

## Acceptance Criteria

1. `next build` passes with 0 errors
2. `/sitemap.xml` returns valid XML with all pages + products
3. `/robots.txt` returns valid directives
4. Google Rich Results Test passes for homepage + any product page
5. Lighthouse SEO score ≥ 95 on homepage
6. All pages have unique title, description, og:image
7. SITE_URL consistently `https://k1visual.com` everywhere
8. Product pages show value proposition before specs
9. All `<section>` elements have `aria-label`
