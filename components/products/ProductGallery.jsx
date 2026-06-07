"use client";

import { useState } from "react";
import Image from "next/image";
import FilmPlaceholder from "@/components/ui/FilmPlaceholder";
import { COLOR, BLUR } from "@/components/home/tokens";

/**
 * Product image gallery — a large primary image with a row of selectable
 * thumbnails beneath. Falls back to the illustrated film stand-in for products
 * with no photography yet.
 */
export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        style={{ border: `1px solid ${COLOR.gray}` }}
      >
        <FilmPlaceholder />
      </div>
    );
  }

  const current = images[active];

  return (
    <div>
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt || name}
          fill
          priority
          quality={82}
          sizes="(max-width: 1024px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              className="relative aspect-square overflow-hidden rounded-lg transition-all"
              style={{
                border: `2px solid ${i === active ? COLOR.accent : COLOR.gray}`,
              }}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
            >
              <Image
                src={img.src}
                alt={img.alt || `${name} thumbnail ${i + 1}`}
                fill
                quality={60}
                sizes="120px"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
