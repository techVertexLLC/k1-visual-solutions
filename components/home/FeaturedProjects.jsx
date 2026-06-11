"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "./tokens";
import { getFeaturedCases } from "@/lib/products";

/**
 * Featured Projects — horizontal rail of flagship case videos (redesign spec
 * §9): Daxing Airport, Coca-Cola, Xinpai showroom, Estée Lauder. Each card
 * shows the case poster (video plays on hover, muted and looped), the project
 * title, and its location — and clicks through to the owning product page's
 * case wall (#cases).
 *
 * The rail is a native scroll-snap strip (swipe on touch); from md up a pair
 * of arrow buttons nudge it one card at a time. Videos mount only once the
 * rail nears the viewport, and never autoplay under prefers-reduced-motion.
 */

const FEATURED = getFeaturedCases();

const RAIL_STYLES = `
  .k1-projects-rail { scrollbar-width: none; }
  .k1-projects-rail::-webkit-scrollbar { display: none; }
`;

function ProjectCard({ item }) {
  const boxRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Mount the <video> only when the card nears the viewport.
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
    <a
      href={item.href}
      className="group w-[82vw] max-w-[460px] flex-none snap-start overflow-hidden rounded-2xl shadow-card transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover sm:w-[440px]"
      style={{ background: "#fff", border: `1px solid ${COLOR.gray}` }}
      onMouseEnter={item.video ? play : undefined}
      onMouseLeave={item.video ? pause : undefined}
      aria-label={`${item.title} — see this project on the ${item.productName} page`}
    >
      <div ref={boxRef} className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.poster}
          alt={`${item.title} — ${item.productName} installation`}
          fill
          loading="lazy"
          quality={78}
          sizes="(max-width: 640px) 82vw, 440px"
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
            preload="none"
            poster={item.poster}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={item.video} type="video/mp4" />
          </video>
        )}
        {item.video && (
          <span
            aria-hidden
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.55)", opacity: playing ? 0 : 1 }}
          >
            <span className="pl-0.5 text-sm leading-none text-white">▶</span>
          </span>
        )}
      </div>

      <div className="p-6">
        <span
          className="text-[11px] font-medium uppercase tracking-[0.22em]"
          style={{ color: COLOR.muted }}
        >
          {item.location || item.productName}
        </span>
        <h3
          className="mt-2 text-xl leading-snug"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          {item.title}
        </h3>
        <span
          className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.04em]"
          style={{ background: COLOR.gray, color: COLOR.accent }}
        >
          {item.productName}
          {item.model ? ` · ${item.model}` : ""}
        </span>
      </div>
    </a>
  );
}

export default function FeaturedProjects() {
  const railRef = useRef(null);

  const nudge = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("a");
    const step = card ? card.offsetWidth + 20 : 460;
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (FEATURED.length === 0) return null;

  return (
    <section
      id="featured-projects"
      aria-label="Featured projects"
      className="scroll-mt-24 py-16 md:py-24"
      style={{ background: COLOR.bg }}
    >
      <style dangerouslySetInnerHTML={{ __html: RAIL_STYLES }} />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: COLOR.muted }}
            >
              <span style={{ color: COLOR.accent }}>02</span>
              <span aria-hidden className="h-px w-8" style={{ background: "#D4CFC8" }} />
              <span>Featured Projects</span>
            </div>
            <h2
              className="mt-6 text-2xl leading-tight md:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Proven on glass, at scale
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
              Four flagship installations on camera — an international airport, a
              global beverage brand, a semiconductor showroom, and a luxury
              flagship. Tap any project to see its full case wall.
            </p>
          </div>

          {/* Rail controls — desktop only; touch users swipe */}
          <div className="hidden flex-none gap-2 md:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll projects left"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 hover:border-[#4F46B5] hover:text-[#4F46B5] active:scale-95"
              style={{ borderColor: "#D4CFC8", color: COLOR.ink }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll projects right"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 hover:border-[#4F46B5] hover:text-[#4F46B5] active:scale-95"
              style={{ borderColor: "#D4CFC8", color: COLOR.ink }}
            >
              →
            </button>
          </div>
        </Reveal>
      </div>

      {/* The rail bleeds to the viewport edge; padding keeps the first and
          last cards aligned with the page gutter at rest. */}
      <Reveal className="mt-12">
        <div
          ref={railRef}
          className="k1-projects-rail flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 lg:px-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))]"
        >
          {FEATURED.map((item) => (
            <ProjectCard key={item.title} item={item} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
