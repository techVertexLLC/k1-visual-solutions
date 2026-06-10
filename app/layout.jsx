import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import PageTransition from "@/components/ui/PageTransition";
import JsonLd from "@/components/ui/JsonLd";
import { CONTACT } from "@/lib/demo";
import { SITE_URL, siteJsonLd } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Editorial serif for headlines — the chosen G1 pairing (DM Serif Display + Inter).
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dmserif",
  display: "swap",
});

// Root metadata owns the site-wide defaults only: metadataBase, the title
// template, keywords, icons, and the global robots directive. Each page
// declares its own title/description/openGraph via lib/seo.js#pageMetadata.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `K1 Visual Solutions — Transparent & Flexible LED Displays | ${CONTACT.companyLegal}`,
    template: "%s | K1 Visual Solutions",
  },
  description: `${CONTACT.companyLegal} — premium distributor of next-gen transparent, flexible, and self-adhesive LED display solutions. Serving architects, retail brands, and system integrators across North America from ${CONTACT.cityState}.`,
  keywords: [
    "transparent LED display",
    "flexible LED film",
    "LED digital signage",
    "retail window LED",
    "architectural LED facade",
    CONTACT.companyShort,
    "K1 Visual Solutions",
    "B2B LED distributor Canada",
  ],
  authors: [{ name: CONTACT.companyLegal }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  // Lets fixed bars pad themselves with env(safe-area-inset-*) on notched phones.
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <head>
        {/*
          Animation fallback: framer-motion server-renders its reveal elements
          with an inline `opacity:0`. If JavaScript never runs, that would hide
          the content for good — so when scripting is unavailable we force those
          elements visible. With JS on, framer-motion drives the animation as
          normal and this rule does nothing.
        */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
        {/* Site-wide Organization/LocalBusiness + WebSite graph — feeds rich
            results (knowledge panel, business info) and lets per-page Product /
            Breadcrumb schema reference the Organization by @id. */}
        <JsonLd data={siteJsonLd()} />
      </head>
      <body className="bg-[#FAF8F5] font-sans antialiased overflow-x-hidden">
        {/* Skip link — visible only on keyboard focus, jumps past the nav. */}
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <BackToTop />
      </body>
    </html>
  );
}
