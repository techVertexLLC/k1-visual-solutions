"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { COLOR, FONT } from "./home/tokens";
import { SOCIAL_LINKS } from "./ui/social";
import BrandLogo from "./ui/BrandLogo";

/* Compare each nav href against the current pathname to decide the active link. */
function isActivePath(href, pathname) {
  const linkPath = href || "/";
  return linkPath === "/"
    ? pathname === "/"
    : pathname === linkPath || pathname.startsWith(`${linkPath}/`);
}

/**
 * Primary site navigation for K1 Visual Solutions — now a multi-page nav.
 *
 * Warm white surface, warm-gray hairline border, brand blue-purple held back to
 * the single CTA. Sticky on scroll; no glow, no gradient, no dark chrome.
 *
 * Internal links are plain anchors addressing routes and assets at the site root
 * (the whole site addresses routes and assets as "/...").
 */

const PRODUCT_SUBLINKS = [
  { label: "Series T — Transparent Poster", href: "/products?series=series-t" },
  { label: "Series F — Flexible Film", href: "/products?series=series-f" },
  { label: "Holographic LED", href: "/products?series=holographic" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", sublinks: PRODUCT_SUBLINKS },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* Compact social icon strip — icons only, used on the right of the desktop bar.
   Renders nothing until SOCIAL_LINKS has real entries. */
function NavSocial() {
  if (SOCIAL_LINKS.length === 0) return null;
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          className="flex h-8 w-8 items-center justify-center rounded-full p-1.5 transition-colors"
          style={{ color: COLOR.muted }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.muted)}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: `${COLOR.bg}f2`,
        borderColor: COLOR.gray,
      }}
    >
      {/* DC-021: nav h-24 → h-28（配合更大 logo），logo 換 BrandLogo variant="navbar"（h-40/sm:h-48） */}
      <nav
        className="mx-auto flex h-28 max-w-6xl items-center justify-between px-6 lg:px-10"
        aria-label="Primary"
      >
        {/* Logo — BrandLogo variant="navbar" → h-40 / sm:h-48 */}
        <a href="/" className="flex items-center px-1 py-2">
          <BrandLogo variant="navbar" />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(link.href, pathname);
            return link.sublinks ? (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <a
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="flex items-center gap-1 text-sm font-medium transition-colors"
                  style={{ color: active ? COLOR.ink : COLOR.body }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.ink)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = active ? COLOR.ink : COLOR.body)
                  }
                >
                  {link.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden
                    className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full w-64 -translate-x-1/2 overflow-hidden rounded-xl border pt-2 shadow-lg"
                      style={{ background: "#fff", borderColor: COLOR.gray }}
                    >
                      {link.sublinks.map((sub) => (
                        <li key={sub.href}>
                          <a
                            href={sub.href}
                            className="block px-5 py-3 text-sm transition-colors hover:bg-[#FAF8F5]"
                            style={{ color: COLOR.body }}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="text-sm font-medium transition-colors"
                  style={{ color: active ? COLOR.ink : COLOR.body }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.ink)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = active ? COLOR.ink : COLOR.body)
                  }
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-4">
          <NavSocial />
          <a
            href="/contact"
            className="hidden rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:inline-block"
            style={{ background: COLOR.accent }}
          >
            Request a Quote
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border md:hidden"
            style={{ borderColor: COLOR.gray, color: COLOR.ink }}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
                style={{ backgroundColor: COLOR.ink }}
              />
              <span
                className={`block h-0.5 w-5 transition-opacity ${open ? "opacity-0" : ""}`}
                style={{ backgroundColor: COLOR.ink }}
              />
              <span
                className={`block h-0.5 w-5 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
                style={{ backgroundColor: COLOR.ink }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t md:hidden"
            style={{ borderColor: COLOR.gray, backgroundColor: COLOR.bg }}
          >
            <ul className="space-y-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {/* DC-021: min-h-[48px] Apple HIG 觸控標準 */}
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
                    className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium"
                    style={{
                      color: COLOR.ink,
                      background: isActivePath(link.href, pathname)
                        ? "#fff"
                        : "transparent",
                    }}
                  >
                    {link.label}
                  </a>
                  {link.sublinks && (
                    <ul className="mb-1 ml-3 space-y-1 border-l pl-3" style={{ borderColor: COLOR.gray }}>
                      {link.sublinks.map((sub) => (
                        <li key={sub.href}>
                          {/* DC-021: sublink 也保持 min-h-[48px] */}
                          <a
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="flex min-h-[48px] items-center rounded-lg px-3 text-sm"
                            style={{ color: COLOR.body }}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              <li className="pt-2">
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full px-4 py-3 text-center text-sm font-medium text-white"
                  style={{ background: COLOR.accent }}
                >
                  Request a Quote
                </a>
              </li>

              {/* Social row — only when there are real links to show */}
              {SOCIAL_LINKS.length > 0 && (
                <li className="flex items-center justify-center gap-3 pt-4">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border p-2"
                      style={{ borderColor: COLOR.gray, color: COLOR.muted }}
                    >
                      <Icon />
                    </a>
                  ))}
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
