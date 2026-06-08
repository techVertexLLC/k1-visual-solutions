"use client";

import Image from "next/image";
import { MailIcon, PhoneIcon } from "./ui/icons";

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
                className="h-20 w-auto object-contain brightness-0 invert"
              />
              <p className="mt-1 text-xs text-white/45">K1trends Global Inc.</p>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/55">
              LED Displays · Digital Signs · Endless Possibilities. Premium
              transparent &amp; flexible LED solutions, distributed across North
              America.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={handleNav(l.href)}
                    className="text-sm text-white/55 transition-colors hover:text-electric-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:Andrewxu@vertexdistributor.com"
                  className="inline-flex items-center gap-2 text-white/55 transition-colors hover:text-electric-cyan"
                >
                  <span className="h-4 w-4">
                    <MailIcon />
                  </span>
                  Andrewxu@vertexdistributor.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+16303595931"
                  className="inline-flex items-center gap-2 text-white/55 transition-colors hover:text-electric-cyan"
                >
                  <span className="h-4 w-4">
                    <PhoneIcon />
                  </span>
                  +1 (630) 359-5931
                </a>
              </li>
              <li className="text-white/55">525 W Wrightwood Avenue, Elmhurst, IL</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © 2025 K1trends Global Inc. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Elmhurst, IL · Serving North America
          </p>
        </div>
      </div>
    </footer>
  );
}
