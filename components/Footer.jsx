"use client";

import Image from "next/image";
import { MailIcon, PhoneIcon } from "./ui/icons";
import BrandLogo from "./ui/BrandLogo";
import { CONTACT } from "../lib/demo";

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
              {/* DC-021: 換 BrandLogo variant="dark"（h-48 + brightness-0 invert） */}
              <BrandLogo variant="dark" />
            </div>
            {/* DC-021: text-base → text-lg */}
            <p className="mt-4 max-w-xs text-lg text-white/75">
              LED Displays · Digital Signs · Endless Possibilities. Premium
              transparent &amp; flexible LED solutions, distributed across North
              America.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            {/* DC-021: text-sm → text-base 區塊標題 */}
            <h3 className="text-base font-semibold uppercase tracking-wider text-white/80">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  {/* DC-021: text-base → text-lg */}
                  <a
                    href={l.href}
                    onClick={handleNav(l.href)}
                    className="text-lg text-white/75 transition-colors hover:text-electric-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            {/* DC-021: text-sm → text-base 區塊標題 */}
            <h3 className="text-base font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            {/* DC-021: text-base → text-lg */}
            <ul className="mt-4 space-y-3 text-lg">
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-electric-cyan"
                >
                  <span className="h-4 w-4">
                    <MailIcon />
                  </span>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-electric-cyan"
                >
                  <span className="h-4 w-4">
                    <PhoneIcon />
                  </span>
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-white/75">{CONTACT.address}</li>
            </ul>
          </div>
        </div>

        {/* Copyright — DC-021: text-sm → text-base */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-base text-white/60">
            © 2025 {CONTACT.companyLegal} All rights reserved.
          </p>
          <p className="text-base text-white/60">
            {CONTACT.cityState} · Serving North America
          </p>
        </div>
      </div>
    </footer>
  );
}
