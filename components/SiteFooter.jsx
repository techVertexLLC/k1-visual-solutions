import Image from "next/image";
import { COLOR, FONT } from "./home/tokens";
import { SOCIAL_LINKS } from "./ui/social";

/**
 * Shared site footer for every page. Warm-gray surface, multi-page navigation,
 * contact details, and the full set of social links shown with labels. Plain
 * anchors with the explicit "/k1" basePath.
 *
 * DC-019: 文字可讀性優化
 * - 區塊標題：muted → ink，text-xs → text-sm，font-medium → font-semibold
 * - 內文/連結：body → ink（#E8E4DF 背景對比 ≥ 4.5:1 WCAG AA）
 * - Copyright：muted → body
 * - 間距：py-16 → py-20，mt-4 → mt-5
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
      className="border-t py-20"
      style={{ background: COLOR.gray, borderColor: "#DAD5CE" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="/k1/" className="inline-block">
              <Image
                src="/k1/assets/images/k1-logo-transparent.png"
                alt="K1 Visual Solutions logo"
                width={200}
                height={80}
                loading="lazy"
                className="h-56 w-auto object-contain"
              />
            </a>
            <p className="mt-5 max-w-xs text-base leading-relaxed" style={{ color: COLOR.body }}>
              Premium transparent, flexible &amp; holographic LED display
              solutions, distributed across North America.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            {/* 標題加深 + 放大：確保在 #E8E4DF 背景對比度 ≥ 4.5:1 */}
            <h3
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: COLOR.ink }}
            >
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline inline-block text-base"
                    style={{ color: COLOR.ink }}
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
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: COLOR.ink }}
            >
              Products
            </h3>
            <ul className="mt-5 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline inline-block text-base"
                    style={{ color: COLOR.ink }}
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
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: COLOR.ink }}
            >
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-base" style={{ color: COLOR.ink }}>
               <li>525 W Wrightwood Avenue, Elmhurst, IL</li>
              <li>
                 <a href="tel:+163****5931" className="hover:opacity-70">
                   +1 (630) 359-5931
                </a>
              </li>
              <li>
                 <a href="mailto:Andrewxu@vertexdistributor.com" className="hover:opacity-70">
                   Andrewxu@vertexdistributor.com
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

        {/* Copyright — body (#4A4A4A) 取代 muted (#6B655C)，對比度更佳 */}
        <div
          className="mt-10 border-t pt-8 text-sm"
          style={{ color: COLOR.body, borderColor: "#DAD5CE" }}
        >
          © {new Date().getFullYear()} K1trends Global Inc. · K1 Visual Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
