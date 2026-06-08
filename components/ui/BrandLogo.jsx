import Image from "next/image";

/**
 * BrandLogo — single source of truth for the K1 Visual Solutions logo mark.
 *
 * Variants
 * --------
 *   "navbar"  — h-40 / sm:h-48  (taller than before, per DC-021 boss request)
 *   "footer"  — h-48            (uniform across all three footers)
 *   "dark"    — like footer but inverted (brightness-0 invert) for dark bg
 *
 * Usage:
 *   <BrandLogo variant="navbar" />
 *   <BrandLogo variant="footer" />
 *   <BrandLogo variant="dark"   />   ← deep-dark Footer.jsx
 */
export default function BrandLogo({ variant = "footer", className = "" }) {
  const sizeClass =
    variant === "navbar"
      ? "h-40 sm:h-48 w-auto object-contain"
      : "h-48 w-auto object-contain";

  const filterClass = variant === "dark" ? "brightness-0 invert" : "";

  return (
    <Image
      src="/k1/assets/images/k1-logo-transparent.png"
      alt="K1 Visual Solutions logo"
      width={200}
      height={80}
      loading={variant === "navbar" ? "eager" : "lazy"}
      priority={variant === "navbar"}
      className={`${sizeClass} ${filterClass} ${className}`.trim()}
    />
  );
}
