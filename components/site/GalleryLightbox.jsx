"use client";

import { useEffect, useState } from "react";

/**
 * Application gallery (reference .gallery) + fullscreen lightbox. Each scene
 * is a 4/3 tile with a pill label; clicking opens the image in the dark
 * overlay, any click (or Escape) closes it.
 */
export default function GalleryLightbox({ items }) {
  const [openSrc, setOpenSrc] = useState(null);

  useEffect(() => {
    if (!openSrc) return;
    const onKey = (e) => e.key === "Escape" && setOpenSrc(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openSrc]);

  return (
    <>
      <div className="gallery">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            className="gitem"
            onClick={() => setOpenSrc(item.src)}
            aria-label={`View larger: ${item.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt || item.label} loading="lazy" />
            <span className="glabel">{item.label}</span>
          </button>
        ))}
      </div>
      <div
        className={`lightbox${openSrc ? " open" : ""}`}
        onClick={() => setOpenSrc(null)}
        role={openSrc ? "dialog" : undefined}
        aria-modal={openSrc ? true : undefined}
      >
        {openSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={openSrc} alt="" />
        )}
      </div>
    </>
  );
}
