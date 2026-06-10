"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "./tokens";
import { CASES } from "@/lib/cases";

/**
 * Case studies preview — the top two installations shown in full, with the
 * remaining projects offered through an expandable reveal so the home page stays
 * focused but the depth is one click away.
 *
 * Cases with a `video` play it on hover (muted, looped) over the primary photo;
 * the video element only mounts once the card nears the viewport so the page
 * never pulls clips it doesn't need.
 */

import { useEffect, useRef, useState } from "react";

function CaseMedia({ item }) {
  const [primary] = item.images;
  const boxRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!item.video || !boxRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, [item.video]);

  const play = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const pause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={boxRef}
      className="relative aspect-[16/10] overflow-hidden"
      onMouseEnter={item.video ? play : undefined}
      onMouseLeave={item.video ? pause : undefined}
      onClick={item.video ? () => (playing ? pause() : play()) : undefined}
    >
      <Image
        src={primary.src}
        alt={primary.alt}
        fill
        loading="lazy"
        quality={78}
        sizes="(max-width: 768px) 100vw, 50vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
      />
      {item.video && ready && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={item.video} type="video/mp4" />
        </video>
      )}
      {item.video && (
        <div
          aria-hidden
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.55)", opacity: playing ? 0 : 1 }}
        >
          <span className="pl-0.5 text-sm leading-none text-white">▶</span>
        </div>
      )}
    </div>
  );
}

function CaseCard({ item }) {
  const secondary = item.images.slice(1);
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-card transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      <CaseMedia item={item} />
      <div className="flex flex-1 flex-col p-7">
        {secondary.length > 0 && (
          <div className="mb-5 flex gap-3">
            {secondary.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] w-20 flex-none overflow-hidden rounded-md sm:w-24"
                style={{ border: `1px solid ${COLOR.gray}` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  quality={64}
                  sizes="96px"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
        <span
          className="text-[11px] font-medium uppercase tracking-[0.24em]"
          style={{ color: COLOR.muted }}
        >
          {item.location}
        </span>
        <h3
          className="mt-3 text-2xl leading-snug"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          {item.title}
        </h3>
        {item.product && (
          <span
            className="mt-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.04em]"
            style={{ background: COLOR.gray, color: COLOR.accent }}
          >
            {item.product}
          </span>
        )}
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

export default function CaseStudiesPreview() {
  const [expanded, setExpanded] = useState(false);
  const top = CASES.slice(0, 2);
  const rest = CASES.slice(2);

  return (
    <section
      id="cases"
      aria-label="Case studies"
      className="scroll-mt-24 py-16 md:py-24"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>02</span>
            <span aria-hidden className="h-px w-8" style={{ background: "#D4CFC8" }} />
            <span>Case Studies</span>
          </div>
          <h2
            className="mt-6 text-2xl leading-tight md:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Light, set into real places
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
            From a campus media facade to airport retail, casino floors, and bank
            branches — a look at where K1 transparent and flexible displays are
            already at work across Asia and beyond.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {top.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>

        {expanded && rest.length > 0 && (
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-2 md:gap-10">
            {rest.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i, 3) * 0.1}>
                <CaseCard item={item} />
              </Reveal>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="btn-lift inline-flex items-center gap-2 rounded-full border border-[#1A1A1A] px-6 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            >
              {expanded ? "Show fewer projects" : `View all ${CASES.length} projects`}
              <span
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
