"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { COLOR, FONT } from "./home/tokens";

/**
 * Primary site navigation for K1 Visual Solutions.
 *
 * Built to the G1/G2 moodboard direction: warm white surface, warm-gray
 * hairline border, brand blue-purple held back to the single CTA. Sticky so it
 * stays with the reader on scroll; no glow, no gradient, no dark chrome.
 */

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Case Studies", href: "#cases" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10"
        aria-label="Primary"
      >
        {/* Logo + wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="flex items-center gap-3"
        >
          <Image
            src="/k1/assets/images/k1-logo-transparent.png"
            alt="K1 Visual Solutions logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain"
          />
          <span
            className="text-base font-semibold tracking-tight"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            K1 Visual Solutions
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:transition-all hover:after:w-full"
                style={{ color: COLOR.body }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLOR.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLOR.body)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="hidden rounded-full px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:inline-block"
            style={{ background: COLOR.accent }}
          >
            Request a Quote
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
            style={{ borderColor: COLOR.gray, color: COLOR.ink }}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
                style={{ backgroundColor: COLOR.ink }}
              />
              <span
                className={`block h-0.5 w-5 transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
                style={{ backgroundColor: COLOR.ink }}
              />
              <span
                className={`block h-0.5 w-5 transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
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
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="block rounded-lg px-3 py-3 text-base font-medium"
                    style={{ color: COLOR.body }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, "#contact")}
                  className="block rounded-full px-4 py-3 text-center text-sm font-medium text-white"
                  style={{ background: COLOR.accent }}
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
