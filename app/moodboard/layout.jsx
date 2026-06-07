import {
  Inter,
  DM_Sans,
  DM_Serif_Display,
  Playfair_Display,
} from "next/font/google";

/**
 * Moodboard — design-direction reference for the K1 Visual Solutions redesign.
 *
 * Deliberately departs from the production dark/neon theme. The root layout owns
 * <html>/<body> (dark bg); this nested layout simply wraps the moodboard in a
 * warm-white, full-height surface and loads the four candidate typefaces so both
 * pairings (A: DM Serif Display + Inter, B: Playfair Display + DM Sans) can be
 * compared on the same page.
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mb-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-mb-dmsans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-mb-dmserif",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-mb-playfair",
  display: "swap",
});

export const metadata = {
  title: "Design Moodboard — K1 Visual Solutions Redesign",
  description:
    "Color, typography, whitespace, and component direction for the K1 Visual Solutions redesign. Clean, refined, effortless — inspired by Aesop, Apple, and Dieter Rams.",
};

const fontVars = [
  inter.variable,
  dmSans.variable,
  dmSerif.variable,
  playfair.variable,
].join(" ");

export default function MoodboardLayout({ children }) {
  return (
    <div
      className={`${fontVars} min-h-screen bg-[#FAF8F5] text-[#2A2722] antialiased selection:bg-[#4F46B5]/15`}
      style={{ fontFamily: "var(--font-mb-inter), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
