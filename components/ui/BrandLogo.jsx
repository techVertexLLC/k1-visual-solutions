import Image from "next/image";

/**
 * BrandLogo — single source of truth for the K1 Visual Solutions logo mark.
 *
 * The source PNG is an 800×800 canvas: the wordmark + swoosh occupy rows
 * 264–472 (33%–59% of the height) and a small tagline strip sits below them —
 * illegible at UI sizes. Each variant renders the image inside a fixed-aspect
 * window (800:208) that crops to the wordmark band only: the image fills the
 * window's width and is shifted up by 33% of its own height, so the crop holds
 * at any rendered size. The PNG itself is untouched.
 *
 * Variants
 * --------
 *   "navbar"  — h-12 / sm:h-14 window. Same on-screen mark size as the old
 *               uncropped h-40/sm:h-48 (the mark was ~26% of the canvas),
 *               with the tagline strip cropped away.
 *   "footer"  — h-12 window (uniform across footers)
 *   "dark"    — footer size, inverted to white for dark surfaces
 *
 * Usage:
 *   <BrandLogo variant="navbar" />
 *   <BrandLogo variant="footer" />
 *   <BrandLogo variant="dark"   />   ← deep-dark Footer.jsx
 */
export default function BrandLogo({ variant = "footer", className = "" }) {
  const sizeClass = variant === "navbar" ? "h-12 sm:h-14" : "h-12";
  const filterClass = variant === "dark" ? "brightness-0 invert" : "";

  return (
    <span
      className={`block aspect-[800/208] overflow-hidden ${sizeClass} ${className}`.trim()}
    >
      <Image
        src="/assets/images/k1-logo-transparent.png"
        alt="K1 Visual Solutions logo"
        width={800}
        height={800}
        loading={variant === "navbar" ? "eager" : "lazy"}
        priority={variant === "navbar"}
        className={`h-auto w-full -translate-y-[33%] ${filterClass}`.trim()}
      />
    </span>
  );
}
