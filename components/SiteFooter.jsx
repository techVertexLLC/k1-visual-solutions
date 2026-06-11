import Brand from "./site/Brand";
import { SOCIAL_LINKS } from "./ui/social";
import { CONTACT } from "../lib/demo";

/**
 * Shared site footer — reference design: text brand + blurb, Explore /
 * Products / Contact columns, quote CTA, then the socials + copyright bar.
 */

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PRODUCT_LINKS = [
  { label: "Crystal Film LED Screen", href: "/products/crystal-film" },
  { label: "Holographic Invisible Screen", href: "/products/holographic" },
  { label: "Soft LED Display", href: "/products/soft-led-display" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <Brand />
            <p className="blurb">
              Premium transparent, flexible &amp; holographic LED display solutions, distributed
              across North America by {CONTACT.companyLegal}
            </p>
          </div>
          <div>
            <h5>Explore</h5>
            <ul>
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Products</h5>
            <ul>
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li>{CONTACT.address}</li>
              <li>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                <a href={CONTACT.emailHref}>{CONTACT.email}</a>
              </li>
            </ul>
            <a className="btn" style={{ marginTop: 14 }} href="/contact">
              Request a Quote
            </a>
          </div>
        </div>
        <div className="bottom">
          {SOCIAL_LINKS.length > 0 && (
            <div className="socials">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
          <div className="copy">
            © {new Date().getFullYear()} {CONTACT.companyLegal} · K1 Visual Solutions. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
