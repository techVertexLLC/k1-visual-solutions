"use client";

import { useEffect, useRef } from "react";

/**
 * Animated number — the reference main.js counter: the real value renders in
 * the HTML (SEO/no-JS safe) and only the numeric part animates up over 900 ms
 * with a cubic ease-out once the element scrolls into view.
 *
 * `value` is the number to count to (e.g. 95, 2.5, 3840); `prefix`/`suffix`
 * wrap it ("≥", "%", " mm"). The static fallback text is the formatted final
 * value.
 */
export default function Counter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = typeof value === "number" ? value : parseFloat(String(value).replace(/,/g, ""));
    if (isNaN(num)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dec = (String(value).split(".")[1] || "").length;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / 900, 1);
            const v = num * (1 - Math.pow(1 - p, 3));
            el.textContent =
              prefix +
              v.toLocaleString("en-US", {
                minimumFractionDigits: dec,
                maximumFractionDigits: dec,
              }) +
              suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, suffix]);

  const num = typeof value === "number" ? value : parseFloat(String(value).replace(/,/g, ""));
  const dec = (String(value).split(".")[1] || "").length;
  const final = isNaN(num)
    ? String(value)
    : num.toLocaleString("en-US", {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      });

  return (
    <span ref={ref}>
      {prefix}
      {final}
      {suffix}
    </span>
  );
}
