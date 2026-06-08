"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";

/**
 * Inner-page banner. A warm photographic header with an editorial title and a
 * short standfirst, washed in warm white so the type stays effortless to read.
 * Optional eyebrow and breadcrumb. No dark scrim, no glow — consistent with the
 * G1 moodboard direction used across the site.
 */
export default function PageBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  breadcrumb = null,
}) {
  return (
    <section
      aria-label={typeof title === "string" ? title : "Page introduction"}
      className="relative flex min-h-[44vh] items-center overflow-hidden border-b"
      style={{ background: COLOR.bg, borderColor: COLOR.gray }}
    >
      {image && (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={80}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(100deg, ${COLOR.bg}f7 0%, ${COLOR.bg}e0 42%, ${COLOR.bg}99 70%, ${COLOR.bg}66 100%)`,
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {breadcrumb && (
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: COLOR.muted }}
            >
              {breadcrumb}
            </nav>
          )}
          {eyebrow && (
            <p
              className="text-[11px] font-medium uppercase tracking-[0.34em]"
              style={{ color: COLOR.accent }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="mt-5 text-3xl leading-[1.1] md:text-5xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="mt-6 max-w-xl text-lg leading-relaxed"
              style={{ color: COLOR.body }}
            >
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
