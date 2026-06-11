/**
 * Text-only brand mark: a Playfair "K1" in brand indigo + uppercase wordmark.
 * Used by both the navbar and the footer — the image logo is retired.
 */
export default function Brand({ href = "/" }) {
  return (
    <a className="brand" href={href} aria-label="K1 Visual Solutions — home">
      <span className="k1">K1</span>
      <span className="rest">Visual Solutions</span>
    </a>
  );
}
