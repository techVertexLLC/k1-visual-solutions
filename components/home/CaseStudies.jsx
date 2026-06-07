"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { COLOR, FONT, BLUR } from "./tokens";

/* Fade-in-up as the element scrolls into view. Once only, no repeat flicker. */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * VideoCard — 案例影片播放器
 *
 * 設計考量：
 * - Lazy loading：IntersectionObserver 偵測進入 viewport 才設定 src，
 *   避免頁面載入時一次拉取所有影片（最高 4.8MB）。
 * - Hover 播放：onMouseEnter/Leave 觸發 play/pause，符合「看到才播」的 UX。
 * - prefers-reduced-motion：系統要求減少動態時，video 存在但不自動觸發播放。
 * - play 圖示：右下角提示可播放，hover 後隱藏（視覺引導不喧賓奪主）。
 */
function VideoCard({ src }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const reduceMotion = useReducedMotion();

  // Lazy load：只有進入 viewport 時才真正設定 video src
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // 提前 200px 預載，確保 hover 時影片已備妥
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isLoaded]);

  const handleMouseEnter = () => {
    if (reduceMotion) return;
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoaded && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Play 圖示：hover 時淡出，未播放時顯示為視覺引導 */}
      <div
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.55)",
          opacity: isPlaying ? 0 : 1,
        }}
        aria-hidden
      >
        <span className="text-white text-sm leading-none pl-0.5">▶</span>
      </div>
    </div>
  );
}

/* 案例資料（含影片欄位）
   video 欄位：有對應素材的案例才加，沒有就省略（CaseCard 自動 fallback 靜態圖）。
   新增 4 個案例：Daxing Airport, Coca-Cola, Maomin Service Area, Beijing Showroom。
*/
const CASES = [
  {
    images: [
      {
        src: "/k1/assets/images/cases/changchun-01.jpg",
        alt: "Changchun Tech Park transparent LED media facade at dusk",
      },
      {
        src: "/k1/assets/images/cases/changchun-02.jpg",
        alt: "Interior atrium of Changchun Tech Park with transparent LED screens",
      },
      {
        src: "/k1/assets/images/cases/changchun-03.jpg",
        alt: "Changchun Tech Park transparent LED facade detail",
      },
    ],
    location: "Changchun · China",
    title: "Changchun Tech Park",
    description:
      "A transparent media facade wrapping the campus atrium — daylight passes through by day, motion graphics read clearly after dark, and the concourse glazing carries live content without ever blocking the view.",
    video: "/k1/assets/videos/case-changchun.mp4",
  },
  {
    images: [
      {
        src: "/k1/assets/images/cases/mashan-01.jpg",
        alt: "Mashan Resort curved flexible LED film installation",
      },
      {
        src: "/k1/assets/images/cases/mashan-02.jpg",
        alt: "Mashan Resort flexible LED film, second view",
      },
    ],
    location: "Mashan · China",
    title: "Mashan Resort",
    description:
      "Curved flexible film follows the resort's organic architecture, turning a sculpted wall into a calm, ambient light surface that bends where a rigid panel never could.",
    // 無對應影片素材，顯示靜態圖
  },
  {
    images: [
      {
        src: "/k1/assets/images/cases/macau-casino-01.jpg",
        alt: "Macau Star World Casino P6.0 transparent LED display",
      },
      {
        src: "/k1/assets/images/cases/macau-casino-02.jpg",
        alt: "Macau Star World Casino LED display, second view",
      },
    ],
    location: "Macau · China",
    title: "Star World Casino",
    description:
      "A P6.0 transparent installation at Macau's Star World — high-brightness content that holds its own against a dense, lit interior while keeping sightlines open across the floor.",
    video: "/k1/assets/videos/case-macau.mp4",
  },
  {
    images: [
      {
        src: "/k1/assets/images/cases/case-beijing-daxing-airport-p625.jpg",
        alt: "Transparent LED window display at Beijing Daxing Airport",
      },
    ],
    location: "Beijing · China",
    title: "Daxing Airport",
    product: "Transparent LED · P6.25",
    description:
      "Transparent panels turn airport retail glazing into a bright, always-on canvas at Beijing Daxing — content reads clearly across the concourse without closing off the unit behind the glass.",
    video: "/k1/assets/videos/case-airport.mp4",
  },
  {
    images: [
      {
        src: "/k1/assets/images/cases/case-coca-cola-experience-p625.jpg",
        alt: "Immersive Coca-Cola experience room wrapped in red transparent LED content",
      },
    ],
    location: "China",
    title: "Coca-Cola Experience",
    product: "Holographic LED · P6.25",
    description:
      "An immersive brand room wrapped corner-to-corner in transparent LED — effervescent red content surrounds the visitor while the glass keeps the space open and bright.",
    video: "/k1/assets/videos/case-cocacola.mp4",
  },
  {
    images: [
      {
        src: "/k1/assets/images/cases/case-maomin-service-p625.jpg",
        alt: "Transparent LED in Maomin highway service area lobby",
      },
    ],
    location: "Maomin · China",
    title: "Maomin Service Area",
    product: "Transparent LED · P6.25",
    description:
      "P6.25 transparent LED panels transform the service area lobby into a dynamic media environment — high-transparency content at highway scale with 4K clarity.",
    video: "/k1/assets/videos/case-maomin.mp4",
  },
  {
    images: [
      {
        src: "/k1/assets/images/cases/case-beijing-enterprise-p625.jpg",
        alt: "Holographic LED display in Beijing enterprise showroom reception",
      },
    ],
    location: "Beijing · China",
    title: "Beijing Enterprise Showroom",
    product: "Holographic LED · P6.25",
    description:
      "A P6.25 holographic LED panel anchors the reception of a Beijing enterprise showroom — floating content that draws visitors in while the room stays open and architectural.",
    video: "/k1/assets/videos/case-beijing.mp4",
  },
];

function CaseCard({ item, delay = 0 }) {
  const [primary, ...secondary] = item.images;
  return (
    <FadeUp delay={delay}>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
        style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
      >
        {/* 主媒體區塊：有 video → VideoCard（hover 播放）；無 video → 靜態圖 */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {item.video ? (
            <VideoCard src={item.video} />
          ) : (
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              quality={78}
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-7">
          {/* Secondary shots — a quiet strip of the project's other views.
              只在有多張靜態圖的案例顯示（video 案例通常只有一張主圖）。 */}
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
                    quality={64}
                    sizes="96px"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover transition-transform duration-500 hover:scale-[1.08]"
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
          <p
            className="mt-4 text-[15px] leading-relaxed"
            style={{ color: COLOR.body }}
          >
            {item.description}
          </p>
        </div>
      </article>
    </FadeUp>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="cases"
      className="scroll-mt-20 py-24 lg:py-32"
      style={{ background: COLOR.gray }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <FadeUp className="max-w-2xl">
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>03</span>
            <span aria-hidden className="h-px w-8" style={{ background: COLOR.muted }} />
            <span>Case Studies</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Light, set into real places
          </h2>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: COLOR.body }}
          >
            From a campus media facade to a resort's curved interior to a Macau
            casino floor — a look at where K1 transparent and flexible displays
            are already at work.
          </p>
        </FadeUp>

        <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
          {CASES.map((item, i) => (
            <CaseCard key={item.title} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
