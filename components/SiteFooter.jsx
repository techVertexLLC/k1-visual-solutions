import Image from "next/image";
import { COLOR, FONT } from "./home/tokens";
import { SOCIAL_LINKS } from "./ui/social";

/**
 * Shared site footer for every page. Warm-gray surface, multi-page navigation,
 * contact details, and the full set of social links shown with labels. Plain
 * anchors with the explicit "/k1" basePath.
 */

const EXPLORE = [
  { label: "Home", href: "/k1/" },
  { label: "Products", href: "/k1/products" },
  { label: "Solutions", href: "/k1/solutions" },
  { label: "About", href: "/k1/about" },
  { label: "Contact", href: "/k1/contact" },
];

const PRODUCT_LINKS = [
  { label: "Series T — Transparent Poster", href: "/k1/products?series=series-t" },
  { label: "Series F — Flexible Film", href: "/k1/products?series=series-f" },
  { label: "Holographic LED", href: "/k1/products?series=holographic" },
];

export default function SiteFooter() {
  return (
    <footer
      className="border-t py-16"
      style={{ background: COLOR.gray, borderColor: "#DAD5CE" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="/k1/" className="flex items-center gap-3">
              <Image
                src="/k1/assets/images/k1-logo-transparent.png"
                alt="K1 Visual Solutions logo"
                width={56}
                height={56}
                className="h-12 w-12 object-contain"
              />
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                K1 Visual Solutions
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: COLOR.body }}>
              Premium transparent, flexible &amp; holographic LED display
              solutions, distributed across North America.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: COLOR.muted }}
            >
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: COLOR.body }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: COLOR.muted }}
            >
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: COLOR.body }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: COLOR.muted }}
            >
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: COLOR.body }}>
              <li>Markham, Ontario, Canada</li>
              <li>
                <a href="tel:+19050000000" className="hover:opacity-70">
                  +1 (905) 000-0000
                </a>
              </li>
              <li>
                <a href="mailto:info@k1visualsolutions.com" className="hover:opacity-70">
                  info@k1visualsolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social — rendered only once real handles exist (see lib/ui/social). */}
        {SOCIAL_LINKS.length > 0 && (
          <div
            className="mt-14 border-t pt-8"
            style={{ borderColor: "#DAD5CE" }}
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 text-sm transition-colors"
                  style={{ color: COLOR.body }}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border p-2 transition-colors group-hover:border-[color:var(--accent)]"
                    style={{ borderColor: "#DAD5CE", color: COLOR.muted, "--accent": COLOR.accent }}
                  >
                    <Icon />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}

        <div
          className="mt-10 border-t pt-8 text-xs"
          style={{ color: COLOR.muted, borderColor: "#DAD5CE" }}
        >
          © {2026} K1trends Global Inc. · K1 Visual Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
