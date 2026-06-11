"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Brand from "./site/Brand";

/**
 * Primary site navigation — reference design header: sticky warm-white bar
 * with blur, the text-only K1 brand, hover-underline links, a Products
 * dropdown with one-line descriptions, and the pill CTA.
 *
 * Under 1000px the link row hides and a hamburger opens the slide-down panel
 * (the reference demo simply hid the nav; the panel restores mobile access).
 */

const PRODUCT_SUBLINKS = [
  {
    label: "Crystal Film LED Screen",
    desc: "Self-adhesive transparent film · P6.25–P20",
    href: "/products/crystal-film",
  },
  {
    label: "Holographic Invisible Screen",
    desc: "Borderless mesh PCB · P2.5–P10",
    href: "/products/holographic",
  },
  {
    label: "Soft LED Display",
    desc: "Plug-and-play sign · 35″/52″/70″",
    href: "/products/soft-led-display",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", sublinks: PRODUCT_SUBLINKS },
  { label: "Projects", href: "/projects" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActivePath(href, pathname) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile panel on navigation and keep body scroll locked while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container">
        <Brand />

        <nav className="nav" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.sublinks ? (
              <div className="dd" key={link.href}>
                <a
                  href={link.href}
                  className={isActivePath(link.href, pathname) ? "active" : ""}
                  aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
                >
                  {link.label}
                </a>
                <div className="dd-menu">
                  {link.sublinks.map((sub) => (
                    <a key={sub.href} href={sub.href}>
                      {sub.label}
                      <small>{sub.desc}</small>
                    </a>
                  ))}
                  <a href="/products">
                    <b>View all products →</b>
                  </a>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={isActivePath(link.href, pathname) ? "active" : ""}
                aria-current={isActivePath(link.href, pathname) ? "page" : undefined}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <a className="btn header-cta" href="/contact">
          Request a Quote
        </a>

        <button
          type="button"
          className={`mnav-toggle${open ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mnav${open ? " open" : ""}`}>
        <div className="container">
          <nav className="inner" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
                {link.sublinks?.map((sub) => (
                  <a key={sub.href} href={sub.href} className="sub" onClick={() => setOpen(false)}>
                    {sub.label}
                  </a>
                ))}
              </div>
            ))}
            <a className="btn" href="/contact" onClick={() => setOpen(false)}>
              Request a Quote
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
