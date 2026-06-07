/**
 * 404 — not found page.
 * robots: noindex, nofollow — prevents search engines from indexing this page.
 */
export const metadata = {
  title: "404 — Page Not Found | K1 Visual Solutions",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="page-enter flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: "#FAF8F5" }}
    >
      <p className="text-6xl font-light" style={{ color: "#C4BEB6" }}>
        404
      </p>
      <h1 className="mt-4 text-2xl font-medium" style={{ color: "#1A1A1A" }}>
        Page not found
      </h1>
      <p className="mt-3 text-base" style={{ color: "#6B6560" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/k1/"
        className="mt-8 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90"
        style={{ background: "#5B6EE8" }}
      >
        Back to Home
      </a>
    </main>
  );
}
