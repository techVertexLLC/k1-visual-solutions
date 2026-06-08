import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/ui/BackToTop";

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

const SITE_URL = "https://k1visualsolutions.com";

// Root metadata owns the site-wide defaults only: metadataBase, the title
// template, keywords, icons, and the global robots directive. Each page
// declares its own title/description/openGraph via lib/seo.js#pageMetadata.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "K1 Visual Solutions — Transparent & Flexible LED Displays | K1trends Global Inc.",
    template: "%s | K1 Visual Solutions",
  },
  description:
    "K1trends Global Inc. — premium distributor of next-gen transparent, flexible, and self-adhesive LED display solutions. Serving architects, retail brands, and system integrators across North America from Elmhurst, IL.",
  keywords: [
    "transparent LED display",
    "flexible LED film",
    "LED digital signage",
    "retail window LED",
    "architectural LED facade",
    "K1trends Global",
    "K1 Visual Solutions",
    "B2B LED distributor Canada",
  ],
  authors: [{ name: "K1trends Global Inc." }],
  icons: {
    icon: [
      { url: "/k1/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/k1/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/k1/favicon.ico",
    apple: [{ url: "/k1/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
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
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
