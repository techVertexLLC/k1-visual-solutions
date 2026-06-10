"use client";

import { useEffect, useState } from "react";
import { COLOR } from "@/components/home/tokens";

/**
 * Subtle back-to-top control. Fades in once the page has scrolled past 500px
 * and smooth-scrolls to the top on click. Warm-gray circle in the bottom-right
 * corner, consistent with the site's quiet aesthetic.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`no-print fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover active:translate-y-0 active:scale-90 ${
        show ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
      }`}
      style={{
        background: COLOR.gray,
        borderColor: "#D4CFC8",
        color: COLOR.ink,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
