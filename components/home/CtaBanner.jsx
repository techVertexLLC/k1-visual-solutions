import Reveal from "@/components/ui/Reveal";

/**
 * CTA band — dark rounded panel with the quote pitch and two actions.
 * Shared by the home page and the inner pages that close on a quote ask.
 */
export default function CtaBanner({
  title = "Tell us about your space",
  body = "Share the glazing dimensions and the effect you're after — we'll come back with the right product, a clear spec, and an indicative price within 24 hours.",
  primary = { label: "Request a Quote", href: "/contact" },
  secondary = { label: "Browse Products →", href: "/products" },
}) {
  return (
    <section className="section tight">
      <div className="container">
        <Reveal className="ctaband">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="actions">
            <a className="btn light" href={primary.href}>
              {primary.label}
            </a>
            {secondary && (
              <a className="btn ghost onDark" href={secondary.href}>
                {secondary.label}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
