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
