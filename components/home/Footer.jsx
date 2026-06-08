import Image from "next/image";
import { COLOR, FONT } from "./tokens";

/**
 * Home page footer. Warm-gray surface, brand navigation + contact.
 *
 * DC-019: 文字可讀性優化
 * - 區塊標題：muted → ink，text-xs → text-sm，font-medium → font-semibold
 * - 內文/連結：body → ink
 * - Copyright：muted → body
 * - 間距：py-16 → py-20，mt-4 → mt-5
 *
 * DC-020: 手機版間距優化
 * - py-20 → py-24：整體更多呼吸感
 * - gap-12 → gap-y-14 md:gap-12：手機區塊間距放大
 * - space-y-3 → space-y-4 + py-1：連結間距 + 觸控面積提升
 * - mt-5 → mt-6：標題與內容拉開
 * - leading-relaxed → leading-loose：描述文字行高更寬鬆
 */

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Case Studies", href: "#cases" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      className="border-t py-24"
      style={{ background: COLOR.gray, borderColor: "#DAD5CE" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* DC-020: flex-col 手機換行，gap-y-14 區塊間距 */}
        <div className="flex flex-col justify-between gap-y-14 md:flex-row md:gap-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div>
              <Image
                src="/k1/assets/images/k1-logo-transparent.png"
                alt="K1 Visual Solutions logo"
                width={200}
                height={80}
                className="h-56 w-auto object-contain"
              />
            </div>
            {/* DC-020: leading-relaxed → leading-loose */}
            <p className="mt-4 text-base leading-loose" style={{ color: COLOR.body }}>
              Premium transparent &amp; flexible LED display solutions, distributed
              across North America.
            </p>
          </div>

          {/* Links + contact */}
          <div className="grid grid-cols-2 gap-y-14 gap-x-12 sm:gap-x-20">
            <div>
              {/* 標題加深 + 放大：確保在 #E8E4DF 背景對比度 ≥ 4.5:1 */}
              <h3
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: COLOR.ink }}
              >
                Explore
              </h3>
              {/* DC-020: mt-5 → mt-6，space-y-3 → space-y-4 */}
              <ul className="mt-6 space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    {/* DC-020: py-1 增加觸控面積 */}
                    <a
                      href={link.href}
                      className="inline-block py-1 text-base transition-colors hover:opacity-70"
                      style={{ color: COLOR.ink }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: COLOR.ink }}
              >
                Contact
              </h3>
              {/* DC-020: mt-5 → mt-6，space-y-3 → space-y-4 */}
              <ul className="mt-6 space-y-4 text-base" style={{ color: COLOR.ink }}>
                <li className="py-1">525 W Wrightwood Avenue, Elmhurst, IL</li>
                <li>
                  <a href="mailto:Andrewxu@vertexdistributor.com" className="inline-block py-1 hover:opacity-70">
                    Andrewxu@vertexdistributor.com
                  </a>
                </li>
                <li>
                  <a href="tel:+163****5931" className="inline-block py-1 hover:opacity-70">
                    +1 (630) 359-5931
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright — body (#4A4A4A) 取代 muted (#6B655C)，對比度更佳 */}
        {/* DC-020: mt-14 保持原有呼吸感 */}
        <div
          className="mt-14 border-t pt-8 text-sm"
          style={{ borderColor: "#DAD5CE", color: COLOR.body }}
        >
          © {new Date().getFullYear()} K1trends Global Inc. · K1 Visual Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
