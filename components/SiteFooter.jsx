import Image from "next/image";
import { COLOR, FONT } from "./home/tokens";
import { SOCIAL_LINKS } from "./ui/social";
import BrandLogo from "./ui/BrandLogo";

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
 *
 * DC-020: 手機版間距優化
 * - py-20 → py-24：整體更多呼吸感
 * - gap-12 → gap-y-14 md:gap-12：手機區塊間距放大，桌面維持不變
 * - space-y-3 → space-y-4 + py-1：連結間距 + 觸控面積提升
 * - mt-5 → mt-6：標題與內容拉開
 * - leading-relaxed → leading-loose：描述文字行高更寬鬆
 * - mt-10 → mt-14：Copyright 區塊呼吸感
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
      className="border-t py-24"
      style={{ background: COLOR.gray, borderColor: "#DAD5CE" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* DC-020: gap-y-14 手機區塊間距，md:grid-cols-12 桌面不變 */}
        <div className="grid gap-y-14 md:gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="/k1/" className="inline-block">
              {/* DC-021: 換 BrandLogo 統一管理，h-48 */}
              <BrandLogo variant="footer" />
            </a>
            {/* DC-021: text-base → text-lg */}
            <p className="mt-5 max-w-xs text-lg leading-loose" style={{ color: COLOR.body }}>
              Premium transparent, flexible &amp; holographic LED display
              solutions, distributed across North America.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            {/* DC-021: text-sm → text-base 區塊標題 */}
            <h3
              className="text-base font-semibold uppercase tracking-[0.2em]"
              style={{ color: COLOR.ink }}
            >
              Explore
            </h3>
            <ul className="mt-6 space-y-4">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  {/* DC-021: text-base → text-lg */}
                  <a
                    href={link.href}
                    className="link-underline inline-block py-1 text-lg"
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
            {/* DC-021: text-sm → text-base 區塊標題 */}
            <h3
              className="text-base font-semibold uppercase tracking-[0.2em]"
              style={{ color: COLOR.ink }}
            >
              Products
            </h3>
            <ul className="mt-6 space-y-4">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  {/* DC-021: text-base → text-lg */}
                  <a
                    href={link.href}
                    className="link-underline inline-block py-1 text-lg"
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
            {/* DC-021: text-sm → text-base 區塊標題 */}
            <h3
              className="text-base font-semibold uppercase tracking-[0.2em]"
              style={{ color: COLOR.ink }}
            >
              Contact
            </h3>
            {/* DC-021: text-base → text-lg */}
            <ul className="mt-6 space-y-4 text-lg" style={{ color: COLOR.ink }}>
              {/* DC-020: py-1 統一 contact 項目觸控區域 */}
              <li className="py-1">525 W Wrightwood Avenue, Elmhurst, IL</li>
              <li>
                <a href="tel:+163****5931" className="inline-block py-1 hover:opacity-70">
                  +1 (630) 359-5931
                </a>
              </li>
              <li>
                <a href="mailto:Andrewxu@vertexdistributor.com" className="inline-block py-1 hover:opacity-70">
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

        {/* DC-021: text-sm → text-base copyright */}
        <div
          className="mt-14 border-t pt-8 text-base"
          style={{ color: COLOR.body, borderColor: "#DAD5CE" }}
        >
          © {new Date().getFullYear()} K1trends Global Inc. · K1 Visual Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
