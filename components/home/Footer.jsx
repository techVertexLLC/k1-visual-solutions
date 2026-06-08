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
      className="border-t py-20"
      style={{ background: COLOR.gray, borderColor: "#DAD5CE" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
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
            <p className="mt-4 text-base leading-relaxed" style={{ color: COLOR.body }}>
              Premium transparent &amp; flexible LED display solutions, distributed
              across North America.
            </p>
          </div>

          {/* Links + contact */}
          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              {/* 標題加深 + 放大：確保在 #E8E4DF 背景對比度 ≥ 4.5:1 */}
              <h3
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: COLOR.ink }}
              >
                Explore
              </h3>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-base transition-colors hover:opacity-70"
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
              <ul className="mt-5 space-y-3 text-base" style={{ color: COLOR.ink }}>
                 <li>525 W Wrightwood Avenue, Elmhurst, IL</li>
                <li>
                   <a href="mailto:Andrewxu@vertexdistributor.com" className="hover:opacity-70">
                     Andrewxu@vertexdistributor.com
                  </a>
                </li>
                <li>
                   <a href="tel:+163****5931" className="hover:opacity-70">
                     +1 (630) 359-5931
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright — body (#4A4A4A) 取代 muted (#6B655C)，對比度更佳 */}
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
