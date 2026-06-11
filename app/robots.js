export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/moodboard"],
      },
    ],
    sitemap: "https://k1visual.com/sitemap.xml",
  };
}
