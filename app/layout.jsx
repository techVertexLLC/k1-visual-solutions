import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "K1 Visual Solutions — Transparent & Flexible LED Displays | K1trends Global Inc.",
    template: "%s | K1 Visual Solutions",
  },
  description:
    "K1trends Global Inc. — premium distributor of next-gen transparent, flexible, and self-adhesive LED display solutions. Serving architects, retail brands, and system integrators across North America from Markham, Ontario.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "K1 Visual Solutions",
    title: "K1 Visual Solutions — Redefining Spaces with Invisible Displays",
    description:
      "Next-gen flexible & transparent LED solutions for retail, architecture, and exhibitions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "K1 Visual Solutions — Redefining Spaces with Invisible Displays",
    description:
      "Next-gen flexible & transparent LED solutions for retail, architecture, and exhibitions.",
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
      <body className="bg-[#FAF8F5] font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
