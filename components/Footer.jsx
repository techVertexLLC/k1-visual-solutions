"use client";

import Image from "next/image";
import { MailIcon, PhoneIcon } from "./ui/icons";

/**
 * Deep-dark footer variant (bg-ink-900). Used on standalone pages that carry
 * the dark hero treatment.
 *
 * DC-019: 文字可讀性優化（深色版）
 * - 內文透明度：text-white/55 → text-white/75（對比度提升）
 * - Copyright 透明度：text-white/40 → text-white/60
 */

const NAV = [
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const handleNav = (href) => (e) => {
  e.preventDefault();
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div>
              <Image
                src="/k1/assets/images/k1-logo-transparent.png"
                alt="K1 Visual Solutions logo"
                width={200}
                height={80}
                className="h-56 w-auto object-contain brightness-0 invert"
              />
            </div>
            {/* text-white/55 → text-white/75：深底白字對比提升 */}
            <p className="mt-4 max-w-xs text-base text-white/75">
              LED Displays · Digital Signs · Endless Possibilities. Premium
              transparent &amp; flexible LED solutions, distributed across North
              America.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h3 className="text-base font-semibold uppercase tracking-wider text-white/80">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={handleNav(l.href)}
                    className="text-base text-white/75 transition-colors hover:text-electric-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-base">
              <li>
                <a
                  href="mailto:Andrewxu@vertexdistributor.com"
                  className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-electric-cyan"
                >
                  <span className="h-4 w-4">
                    <MailIcon />
                  </span>
                  Andrewxu@vertexdistributor.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+163****5931"
                  className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-electric-cyan"
                >
                  <span className="h-4 w-4">
                    <PhoneIcon />
                  </span>
                  +1 (630) 359-5931
                </a>
              </li>
              <li className="text-white/75">525 W Wrightwood Avenue, Elmhurst, IL</li>
            </ul>
          </div>
        </div>

        {/* Copyright — text-white/40 → text-white/60：提高對比度 */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-white/60">
            © 2025 K1trends Global Inc. All rights reserved.
          </p>
          <p className="text-sm text-white/60">
            Elmhurst, IL · Serving North America
          </p>
        </div>
      </div>
    </footer>
  );
}
