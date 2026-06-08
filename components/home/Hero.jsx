"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLOR, FONT, BLUR } from "./tokens";
import { TransparencyIcon, CheckIcon, PinIcon } from "@/components/ui/icons";

gsap.registerPlugin(ScrollTrigger);

/* Quick trust signals, absorbed from the old "Why K1" block. Kept light. */
const TRUST = [
  { Icon: TransparencyIcon, label: "Up to 90% Transparency" },
  { Icon: CheckIcon, label: "3-Year Warranty" },
  { Icon: PinIcon, label: "North American Support" },
];

/* Load-in: a quiet fade-up, staggered. No bounce, no glow. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Hero 背景媒體層：
   - reduceMotion=false → 播放影片（西安賽格廣場，upscale 到 1080p，8s loop，無聲）
   - reduceMotion=true  → 靜態 poster 圖（無動態，accessibility compliant）
   設計考量：poster 與 Image 共用同一張照片，確保影片載入前無 FOUC。

   畫質優化策略（CSS-only，不動影片檔）：
   - contrast(1.05)：微提對比，收緊 upscale 後的「鬆散感」
   - saturate(1.08)：輕微提飽和，讓燈光色彩更立體
   - blur(0.4px)：把 upscale 放大後的像素鋸齒柔化（不是讓畫面變糊，是讓鋸齒不突兀）
   - scale(1.02)：額外放大 2% 遮住邊緣的 blur 暈染
   所有媒體元素（video + poster Image）套相同 filter，保持切換一致性。 */

/* 統一 filter style，抽成常數方便維護 */
const MEDIA_FILTER = {
  filter: "contrast(1.05) saturate(1.08) blur(0.4px)",
  transform: "scale(1.02)",
  transformOrigin: "center center",
};

function HeroBackground({ reduceMotion }) {
  if (reduceMotion) {
    return (
      <Image
        src="/assets/images/hero-poster.jpg"
        alt="K1 transparent LED display illuminating a modern building interior"
        fill
        priority
        quality={85}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover"
        style={{ objectPosition: "center 40%", ...MEDIA_FILTER }}
      />
    );
  }
  return (
    <>
      {/* Poster image shown while video loads — prevents flash of empty bg */}
      <Image
        src="/assets/images/hero-poster.jpg"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%", ...MEDIA_FILTER }}
        aria-hidden
      />
      {/* filter + scale 套在 video 上；scale(1.02) 補上 blur 邊緣暈染的 headroom */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/images/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 40%", ...MEDIA_FILTER }}
        aria-hidden
      >
        <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
      </video>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   useParallaxInput — 陀螺儀 / 滑鼠視差輸入 hook
   回傳 { bgRef, iosPermissionNeeded, requestIOSPermission }
   - 手機：DeviceOrientationEvent（beta/gamma） → GSAP lerp → bgRef translateX/Y
   - 桌面：mousemove → 反方向偏移，模擬「看進去」的窗口感
   - iOS 13+ 需 requestPermission（必須在手勢事件中呼叫）
   - prefers-reduced-motion → 完全不啟動，bgRef 不加 transform
   最大偏移：±15px translate + 1.02 scale（背景已有 scale-125 headroom）
───────────────────────────────────────────────────────────────────────────── */
function useParallaxInput(reduceMotion) {
  const bgRef = useRef(null);
  const [iosPermissionNeeded, setIosPermissionNeeded] = useState(false);
  const permissionGranted = useRef(false);
  const rafId = useRef(null);

  // GSAP quickTo targets — lazy-initialised after mount
  const quickX = useRef(null);
  const quickY = useRef(null);

  // lerp-smoothed current values（fallback for browsers without quickTo）
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  // 偏移上限
  const MAX = 15;

  /* clamp helper */
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  /* 初始化 GSAP quickTo — 在 bgRef mount 後執行 */
  const initQuick = useCallback(() => {
    if (!bgRef.current || quickX.current) return;
    quickX.current = gsap.quickTo(bgRef.current, "x", {
      duration: 0.6,
      ease: "power2.out",
    });
    quickY.current = gsap.quickTo(bgRef.current, "y", {
      duration: 0.6,
      ease: "power2.out",
    });
    // 確保 will-change 提示到位
    gsap.set(bgRef.current, { willChange: "transform" });
  }, []);

  /* 套用偏移，走 GSAP quickTo */
  const applyOffset = useCallback((x, y) => {
    if (!bgRef.current) return;
    if (!quickX.current) initQuick();
    if (quickX.current) {
      quickX.current(clamp(x, -MAX, MAX));
      quickY.current(clamp(y, -MAX, MAX));
    }
  }, [initQuick]);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    initQuick();

    /* ── 桌面：mousemove ── */
    const onMouseMove = (e) => {
      if (window.matchMedia("(pointer: coarse)").matches) return; // 觸控裝置跳過
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // 反方向偏移（滑鼠往右 → 背景往左），模擬視差感
      const nx = -((e.clientX - cx) / cx) * MAX * 0.8;
      const ny = -((e.clientY - cy) / cy) * MAX * 0.5;
      applyOffset(nx, ny);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── 手機：DeviceOrientationEvent ── */
    const startGyro = () => {
      const onOrientation = (e) => {
        // gamma = 左右傾斜（-90~90）, beta = 前後傾斜（-180~180）
        // 中性位置約 beta=45（手機直立）/ gamma=0
        const rawX = e.gamma ?? 0; // 左右
        const rawY = (e.beta ?? 45) - 45; // 前後（減去直立偏移）
        // 縮放到 ±MAX 範圍：gamma 通常 ±30 算大動作
        const nx = clamp((rawX / 30) * MAX, -MAX, MAX);
        const ny = clamp((rawY / 20) * MAX, -MAX, MAX);
        applyOffset(nx, ny);
      };
      window.addEventListener("deviceorientation", onOrientation, {
        passive: true,
      });
      return () => window.removeEventListener("deviceorientation", onOrientation);
    };

    let cleanupGyro = () => {};

    // 偵測是否為觸控裝置
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        // iOS 13+ — 需要 permission，顯示按鈕
        setIosPermissionNeeded(true);
      } else {
        // Android / 舊 iOS — 直接監聽
        cleanupGyro = startGyro();
      }
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cleanupGyro();
      if (rafId.current) cancelAnimationFrame(rafId.current);
      // 復位
      if (bgRef.current) {
        gsap.to(bgRef.current, { x: 0, y: 0, duration: 0.4 });
      }
      quickX.current = null;
      quickY.current = null;
    };
  }, [reduceMotion, applyOffset, initQuick]);

  /* iOS permission request — 必須在用戶手勢中呼叫 */
  const requestIOSPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent?.requestPermission !== "function") return;
    try {
      const res = await DeviceOrientationEvent.requestPermission();
      if (res === "granted") {
        permissionGranted.current = true;
        setIosPermissionNeeded(false);
        // 開始監聽
        const onOrientation = (e) => {
          const rawX = e.gamma ?? 0;
          const rawY = (e.beta ?? 45) - 45;
          const nx = clamp((rawX / 30) * MAX, -MAX, MAX);
          const ny = clamp((rawY / 20) * MAX, -MAX, MAX);
          applyOffset(nx, ny);
        };
        window.addEventListener("deviceorientation", onOrientation, {
          passive: true,
        });
      }
    } catch {
      // 用戶拒絕或不支援 — 靜默降級，按鈕消失
      setIosPermissionNeeded(false);
    }
  }, [applyOffset]);

  return { bgRef, iosPermissionNeeded, requestIOSPermission };
}

export default function Hero() {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Subtle parallax: the background drifts a touch slower than the page.
  // Works for both static image and video — same motion.div wrapper.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);

  // 陀螺儀 / 滑鼠視差 hook
  const { bgRef, iosPermissionNeeded, requestIOSPermission } =
    useParallaxInput(reduceMotion);

  // GSAP ScrollTrigger: text content drifts up + fades; overlay intensifies.
  // Complements the Framer Motion background drift → three distinct depth layers.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduceMotion) return;
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Layer 2: warm overlay slightly darkens as you scroll — depth cue
      gsap.to(overlayRef.current, {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });

      // Layer 3: content block drifts up and exits
      gsap.to(contentRef.current, {
        yPercent: -8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "55% top",
          scrub: 1.2,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
      style={{ background: COLOR.bg }}
    >
      {/* Layer 1 — Parallax background: video (default) or static image (reduced-motion).
          scale-125 給 parallax drift 留出 headroom，避免邊緣露白。
          bgRef 接收陀螺儀/滑鼠的 GSAP translateX/Y，疊加在 Framer Motion scrollY 之上。*/}
      <motion.div style={{ y }} className="absolute inset-0" aria-hidden>
        {/* 陀螺儀偏移容器：GSAP 操控此層的 x/y，scale-125 headroom 同時吸收 ±15px */}
        <div
          ref={bgRef}
          className="relative h-full w-full scale-125"
          style={{ willChange: "transform" }}
        >
          <HeroBackground reduceMotion={reduceMotion} />
        </div>
      </motion.div>

      {/* Layer 2 — Warm-white wash overlay.
          Keeps type effortless to read without darkening the image or introducing
          a cold/sci-fi cast. Strongest on the left, under the headline.
          GSAP ScrollTrigger transitions opacity for depth cue on scroll.

          暗角設計：四邊額外一層 radial vignette，遮住 upscale 邊緣的畫質損失，
          讓視覺注意力自然集中在中央內容區。中央 transparent，不影響主視覺。 */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        aria-hidden
        style={{
          background: `linear-gradient(100deg, ${COLOR.bg}f5 0%, ${COLOR.bg}e0 38%, ${COLOR.bg}88 64%, ${COLOR.bg}50 100%)`,
          willChange: "opacity",
        }}
      />
      {/* Vignette layer — radial dark edge to hide upscale artefacts at borders
          and draw eye to centre. Opacity intentionally low (0.38) so it aids
          without noticeably darkening the overall scene. */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      {/* iOS AR View permission button — 只在 iOS 13+ 觸控裝置上顯示，點擊後消失。
          設計：低調 ghost button，不搶 CTA 視線，但位置明顯（右下角）。 */}
      {iosPermissionNeeded && !reduceMotion && (
        <button
          onClick={requestIOSPermission}
          className="absolute bottom-8 right-6 z-20 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-sm transition-all duration-300 active:scale-95"
          style={{
            borderColor: `${COLOR.accent}60`,
            color: COLOR.accent,
            background: `${COLOR.bg}cc`,
          }}
          aria-label="Enable AR view with gyroscope"
        >
          {/* 小陀螺儀 icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
          </svg>
          Enable AR View
        </button>
      )}

      {/* Layer 3 — Content: drifts up + fades via GSAP ScrollTrigger */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 lg:px-10"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-center md:text-left"
        >
          <motion.p
            variants={item}
            className="text-[11px] font-medium uppercase tracking-[0.34em]"
            style={{ color: COLOR.accent }}
          >
            Invisible Displays
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-7 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Redefining Spaces with Invisible Displays
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed md:mx-0"
            style={{ color: COLOR.body }}
          >
            Premium transparent LED display &amp; holographic solutions for
            architecture, retail, and exhibitions — distributed across North
            America.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:justify-start"
          >
            {/* Primary — the single accent-coloured action in view */}
            <a
              href="/contact"
              className="cta-pulse rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: COLOR.accent }}
            >
              Request a Quote
            </a>

            {/* Secondary — calm outline, no fill */}
            <a
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: COLOR.accent, color: COLOR.accent }}
            >
              Explore Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          {/* Trust signals — small, warm-gray, evenly spaced. Subtle by design. */}
          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start"
          >
            {TRUST.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-xs font-medium"
                style={{ color: COLOR.muted }}
              >
                <span className="h-4 w-4 flex-none" style={{ color: COLOR.accent }} aria-hidden>
                  <Icon />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
