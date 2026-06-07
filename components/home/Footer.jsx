import Image from "next/image";
import { COLOR, FONT } from "./tokens";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Case Studies", href: "#cases" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      className="border-t py-16"
      style={{ background: COLOR.gray, borderColor: "#DAD5CE" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/images/k1-logo-transparent.png"
                alt="K1 Visual Solutions logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
              />
              <span
                className="text-base font-semibold tracking-tight"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                K1 Visual Solutions
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: COLOR.body }}>
              Premium transparent &amp; flexible LED display solutions, distributed
              across North America.
            </p>
          </div>

          {/* Links + contact */}
          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <h3
                className="text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: COLOR.muted }}
              >
                Explore
              </h3>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
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

            <div>
              <h3
                className="text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{ color: COLOR.muted }}
              >
                Contact
              </h3>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: COLOR.body }}>
                <li>Markham, Ontario, Canada</li>
                <li>
                  <a href="mailto:info@k1visualsolutions.com" className="hover:opacity-70">
                    info@k1visualsolutions.com
                  </a>
                </li>
                <li>
                  <a href="tel:+10000000000" className="hover:opacity-70">
                    +1 (000) 000-0000
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-14 border-t pt-8 text-xs"
          style={{ borderColor: "#DAD5CE", color: COLOR.muted }}
        >
          © {2026} K1trends Global Inc. · K1 Visual Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
