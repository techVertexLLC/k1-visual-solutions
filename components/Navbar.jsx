"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  { label: "Crystal Film LED Screen", href: "/products/crystal-film" },
  { label: "Holographic Invisible Screen", href: "/products/holographic" },
  { label: "Soft LED Display", href: "/products/soft-led-display" },
  { label: "View All Products", href: "/products" },
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
          className="flex h-8 w-8 items-center justify-center rounded-full p-1.5 text-[#6B655C] transition-colors duration-200 hover:bg-[#4F46B5]/[0.06] hover:text-[#4F46B5]"
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
  const reduceMotion = useReducedMotion();

  // Mobile sheet items cascade in after the panel opens; collapses to a
  // plain fade (no x drift, no stagger) under prefers-reduced-motion.
  const sheetList = {
    hidden: {},
    show: reduceMotion
      ? {}
      : { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
  };
  const sheetItem = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

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
        {/* Logo — BrandLogo variant="navbar" → h-40 / sm:h-48. The PNG is a
            square canvas with large transparent margins, so the anchor clips
            to the bar height: the visible mark is untouched, but the dead
            clickable area above/below the bar is removed. */}
        <a href="/" className="flex h-full items-center overflow-hidden px-1">
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
                onFocus={() => setProductsOpen(true)}
                onBlur={(e) => {
                  // Close only when focus leaves the trigger and the dropdown
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setProductsOpen(false);
                  }
                }}
              >
                <a
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-200 ${
                    active ? "text-[#1A1A1A]" : "text-[#4A4A4A] hover:text-[#1A1A1A]"
                  }`}
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
                      // Centering lives in framer's x — a Tailwind -translate-x-1/2
                      // would be overwritten the moment framer writes its own
                      // inline transform for the y animation.
                      initial={{ opacity: 0, y: 6, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 6, x: "-50%" }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full w-64 overflow-hidden rounded-xl border pt-2 shadow-[0_18px_40px_-16px_rgba(26,26,26,0.18)]"
                      style={{ background: "#fff", borderColor: COLOR.gray }}
                    >
                      {link.sublinks.map((sub) => (
                        <li key={sub.href}>
                          <a
                            href={sub.href}
                            className="block px-5 py-3 text-sm text-[#4A4A4A] transition-[background-color,padding-left,color] duration-200 ease-premium hover:bg-[#FAF8F5] hover:pl-6 hover:text-[#1A1A1A]"
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
                  className={`nav-link inline-block py-2 text-sm font-medium transition-colors duration-200 ${
                    active ? "text-[#1A1A1A]" : "text-[#4A4A4A] hover:text-[#1A1A1A]"
                  }`}
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
            className="btn-lift btn-glow btn-shimmer hidden rounded-full bg-[#4F46B5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5A50C7] sm:inline-block"
          >
            Request a Quote
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border transition-transform duration-200 active:scale-90 md:hidden"
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
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t md:hidden"
            style={{ borderColor: COLOR.gray, backgroundColor: COLOR.bg }}
          >
            {/* mobile-menu-scroll: caps the sheet to the visible viewport so the
                CTA and social row stay reachable on short screens while body
                scroll is locked. */}
            <motion.ul
              variants={sheetList}
              initial="hidden"
              animate="show"
              className="mobile-menu-scroll space-y-1 px-6 py-4"
            >
              {NAV_LINKS.map((link) => (
                <motion.li variants={sheetItem} key={link.href}>
                  {/* DC-021: min-h-[48px] Apple HIG 觸控標準 */}
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
                    className={`flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium transition-colors duration-200 active:bg-white ${
                      isActivePath(link.href, pathname)
                        ? "border-l-2 border-[#4F46B5] bg-white"
                        : ""
                    }`}
                    style={{ color: COLOR.ink }}
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
                            className="flex min-h-[48px] items-center rounded-lg px-3 text-sm transition-colors duration-200 active:bg-white"
                            style={{ color: COLOR.body }}
                          >
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}

              <motion.li variants={sheetItem} className="pt-2">
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-lift btn-glow block rounded-full bg-[#4F46B5] px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Request a Quote
                </a>
              </motion.li>

              {/* Social row — only when there are real links to show.
                  h-11/w-11 keeps each icon at the 44px touch minimum. */}
              {SOCIAL_LINKS.length > 0 && (
                <motion.li
                  variants={sheetItem}
                  className="flex items-center justify-center gap-3 pt-4"
                >
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border p-2.5 transition-transform duration-200 active:scale-90"
                      style={{ borderColor: COLOR.gray, color: COLOR.muted }}
                    >
                      <Icon />
                    </a>
                  ))}
                </motion.li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
