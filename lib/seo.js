/**
 * Per-page SEO / Open Graph helper.
 *
 * The root layout (app/layout.jsx) owns metadataBase, the title template,
 * icons, and the global robots directive. Each page then calls pageMetadata()
 * to declare its own title, description, canonical URL, and a complete
 * openGraph/twitter block — Next.js replaces (does not deep-merge) nested
 * metadata objects per route, so every page must spell out its full openGraph.
 *
 * Paths carry the explicit "/k1" basePath because the site is served under it;
 * og/canonical URLs resolve against metadataBase (the bare domain).
 */

export const SITE_URL = "https://k1visualsolutions.com";

// Hero product photo — the default social-sharing preview for every page.
export const DEFAULT_OG_IMAGE = "/k1/assets/images/products/smd-p391-02.jpg";

export function pageMetadata({
  title,
  ogTitle,
  description,
  path = "/k1/",
  image = DEFAULT_OG_IMAGE,
  imageAlt = "K1 Visual Solutions — transparent LED display",
}) {
  const url = `${SITE_URL}${path}`;
  // openGraph.title is not run through the title.template, so resolve a full
  // string here (falling back to the page title when it is a plain string).
  const socialTitle =
    ogTitle || (typeof title === "string" ? title : undefined);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "K1 Visual Solutions",
      url,
      title: socialTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
