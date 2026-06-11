"use client";

/**
 * DESIGN MOODBOARD — K1 Visual Solutions redesign
 *
 * Direction: clean, refined, effortless premium. Aesop / Apple / Dieter Rams.
 * Warm white canvas, warm-gray structure, brand blue-purple used as a whisper
 * (≤5% of surface). No gradients, no glow, no tech/sci-fi vibes — just calm,
 * confident, well-spaced typography and generous breathing room.
 *
 * Self-contained reference page. Fonts are loaded in ./layout.jsx.
 */

import Image from "next/image";
import { motion } from "framer-motion";

/* ----------------------------------------------------------- tokens ------- */

const COLOR = {
  bg: "#FAF8F5", // warm white — primary surface
  gray: "#E8E4DF", // warm gray — dividers, secondary surfaces
  accent: "#4F46B5", // brand blue-purple — used sparingly
  ink: "#2A2722", // warm near-black — primary text
  muted: "#6B655C", // warm taupe — secondary text
};

// Font stacks, mapped to the CSS variables defined in layout.jsx.
const FONT = {
  dmSerif: "var(--font-mb-dmserif), Georgia, serif",
  inter: "var(--font-mb-inter), system-ui, sans-serif",
  playfair: "var(--font-mb-playfair), Georgia, serif",
  dmSans: "var(--font-mb-dmsans), system-ui, sans-serif",
};

const SAMPLE = {
  eyebrow: "Invisible Displays",
  h1: "Redefining Spaces with Invisible Displays",
  h2: "Light that lives in glass",
  h3: "Flexible Transparent Film",
  body: "Transparent and flexible LED, engineered to disappear into architecture and reappear as motion, colour, and presence. Up to 95% transparency, a 6 cm bend radius, and a self-adhesive film just 4 mm thin.",
  caption: "Crystal Film — 90–95% transparency · 2.5 mm · P6.25–P20",
  button: "Request a Quote",
};

/* ------------------------------------------------------- motion helper ---- */

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function FadeIn({ children, className = "", delay = 0, as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------------------------------------------------- primitives ---- */

function SectionHeader({ index, kicker, title, lead }) {
  return (
    <FadeIn className="mx-auto max-w-2xl text-center">
      <div
        className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
        style={{ color: COLOR.muted }}
      >
        <span style={{ color: COLOR.accent }}>{index}</span>
        <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
        <span>{kicker}</span>
      </div>
      <h2
        className="mt-6 text-3xl leading-tight sm:text-4xl"
        style={{ fontFamily: FONT.dmSerif, color: COLOR.ink }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
          style={{ color: COLOR.muted }}
        >
          {lead}
        </p>
      )}
    </FadeIn>
  );
}

// Reusable button primitives — the canonical component styles for the redesign.
function PrimaryButton({ children }) {
  return (
    <button
      type="button"
      className="rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
      style={{ background: COLOR.accent }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children }) {
  return (
    <button
      type="button"
      className="rounded-full border px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5"
      style={{ borderColor: COLOR.ink, color: COLOR.ink }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children }) {
  return (
    <button
      type="button"
      className="group inline-flex items-center gap-2 px-1 py-3 text-sm font-medium tracking-wide transition-colors duration-300"
      style={{ color: COLOR.accent }}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

/* ----------------------------------------------------------- 0 · header --- */

function Header() {
  return (
    <header className="border-b" style={{ borderColor: COLOR.gray }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-lg ring-1 ring-black/5">
            <Image
              src="/assets/images/k1-logo.jpg"
              alt="K1 Visual Solutions logo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </span>
          <span
            className="text-sm tracking-[0.2em]"
            style={{ color: COLOR.ink }}
          >
            K1 VISUAL
          </span>
        </div>
        <span
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: COLOR.muted }}
        >
          Design Moodboard
        </span>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------ 0 · intro --- */

function Intro() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 lg:px-10 lg:pt-32">
      <FadeIn>
        <p
          className="text-[11px] font-medium uppercase tracking-[0.36em]"
          style={{ color: COLOR.accent }}
        >
          K1 Visual Solutions · Redesign Direction
        </p>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h1
          className="mt-8 max-w-4xl text-4xl leading-[1.08] sm:text-6xl"
          style={{ fontFamily: FONT.dmSerif, color: COLOR.ink }}
        >
          A calmer, more confident way to show invisible displays.
        </h1>
      </FadeIn>
      <FadeIn delay={0.16}>
        <p
          className="mt-8 max-w-xl text-lg leading-relaxed"
          style={{ color: COLOR.muted }}
        >
          Clean, refined, effortless. Warm light over cold tech. Generous space,
          honest materials, and restraint — in the spirit of Aesop, Apple, and
          Dieter Rams.
        </p>
      </FadeIn>
      <FadeIn
        delay={0.24}
        className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm"
      >
        {["Warm & quiet", "Generous whitespace", "Accent as a whisper"].map(
          (tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2"
              style={{ color: COLOR.muted }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: COLOR.accent }}
              />
              {tag}
            </span>
          )
        )}
      </FadeIn>
    </section>
  );
}

/* ---------------------------------------------------------- 1 · colour ---- */

const SWATCHES = [
  {
    name: "Primary Background",
    hex: "#FAF8F5",
    usage: "~80%",
    role: "Warm white — the canvas. Never pure white; carries a soft warmth.",
    text: COLOR.ink,
    border: true,
  },
  {
    name: "Secondary / Divider",
    hex: "#E8E4DF",
    usage: "~15%",
    role: "Warm gray — cards, dividers, quiet structure and separation.",
    text: COLOR.ink,
    border: true,
  },
  {
    name: "Brand Accent",
    hex: "#4F46B5",
    usage: "≤5%",
    role: "K1 blue-purple — links, focus, a single CTA. Used sparingly.",
    text: "#FFFFFF",
    border: false,
  },
];

const SUPPORTING = [
  { name: "Primary Text", hex: "#2A2722" },
  { name: "Secondary Text", hex: "#6B655C" },
];

function ColorPalette() {
  return (
    <section className="border-t py-24 lg:py-32" style={{ borderColor: COLOR.gray }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="01"
          kicker="Colour"
          title="A warm, three-tier system"
          lead="One warm canvas, one warm structural gray, and the brand blue-purple held back as a deliberate accent — never more than a twentieth of any screen."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SWATCHES.map((s, i) => (
            <FadeIn key={s.hex} delay={i * 0.08}>
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  border: `1px solid ${COLOR.gray}`,
                  background: "#fff",
                }}
              >
                <div
                  className="flex h-44 items-end p-5"
                  style={{
                    background: s.hex,
                    borderBottom: s.border
                      ? `1px solid ${COLOR.gray}`
                      : "none",
                  }}
                >
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium tracking-wide"
                    style={{
                      background: s.border
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.18)",
                      color: s.text,
                    }}
                  >
                    {s.usage} of surface
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3
                      className="text-sm font-medium"
                      style={{ color: COLOR.ink }}
                    >
                      {s.name}
                    </h3>
                    <code
                      className="text-xs tracking-wide"
                      style={{ color: COLOR.muted }}
                    >
                      {s.hex}
                    </code>
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: COLOR.muted }}
                  >
                    {s.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Supporting text tones + the 5% rule, shown literally */}
        <FadeIn delay={0.1} className="mt-10 grid gap-6 md:grid-cols-2">
          <div
            className="rounded-2xl p-6"
            style={{ border: `1px solid ${COLOR.gray}` }}
          >
            <p
              className="text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: COLOR.muted }}
            >
              Supporting text tones
            </p>
            <div className="mt-5 space-y-4">
              {SUPPORTING.map((t) => (
                <div key={t.hex} className="flex items-center gap-4">
                  <span
                    className="h-8 w-8 shrink-0 rounded-full ring-1 ring-black/5"
                    style={{ background: t.hex }}
                  />
                  <span className="text-sm" style={{ color: COLOR.ink }}>
                    {t.name}
                  </span>
                  <code
                    className="ml-auto text-xs"
                    style={{ color: COLOR.muted }}
                  >
                    {t.hex}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col rounded-2xl p-6"
            style={{ border: `1px solid ${COLOR.gray}` }}
          >
            <p
              className="text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: COLOR.muted }}
            >
              The 5% rule
            </p>
            <div
              className="mt-5 flex h-16 overflow-hidden rounded-xl ring-1 ring-black/5"
              title="Roughly how the three tiers share a screen"
            >
              <span style={{ background: COLOR.bg, flex: "80" }} />
              <span style={{ background: COLOR.gray, flex: "15" }} />
              <span style={{ background: COLOR.accent, flex: "5" }} />
            </div>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: COLOR.muted }}
            >
              Warm white dominates, warm gray gives structure, and the accent is
              a thin, intentional sliver — a link, a focus ring, a single button.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ 2 · typography ---- */

function TypeSpecimen({ option, label, headlineFont, bodyFont, headlineName, bodyName }) {
  return (
    <div
      className="flex flex-col rounded-2xl p-8 sm:p-10"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex h-7 items-center rounded-full px-3 text-xs font-medium tracking-wide"
          style={{ background: COLOR.bg, color: COLOR.accent }}
        >
          Option {option}
        </span>
        <span className="text-xs" style={{ color: COLOR.muted }}>
          {label}
        </span>
      </div>

      <p
        className="mt-8 text-[10px] uppercase tracking-[0.34em]"
        style={{ color: COLOR.muted, fontFamily: bodyFont }}
      >
        {SAMPLE.eyebrow}
      </p>

      <h3
        className="mt-4 text-3xl leading-[1.12] sm:text-4xl"
        style={{ fontFamily: headlineFont, color: COLOR.ink }}
      >
        {SAMPLE.h1}
      </h3>

      <h4
        className="mt-8 text-2xl"
        style={{ fontFamily: headlineFont, color: COLOR.ink }}
      >
        {SAMPLE.h2}
      </h4>

      <h5
        className="mt-6 text-lg font-medium"
        style={{ fontFamily: bodyFont, color: COLOR.ink }}
      >
        {SAMPLE.h3}
      </h5>

      <p
        className="mt-4 text-[15px] leading-[1.75]"
        style={{ fontFamily: bodyFont, color: COLOR.muted }}
      >
        {SAMPLE.body}
      </p>

      <p
        className="mt-6 text-xs uppercase tracking-[0.18em]"
        style={{ fontFamily: bodyFont, color: COLOR.muted }}
      >
        {SAMPLE.caption}
      </p>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: COLOR.accent, fontFamily: bodyFont }}
        >
          {SAMPLE.button}
        </button>
        <span
          className="text-sm"
          style={{ color: COLOR.accent, fontFamily: bodyFont }}
        >
          Learn more →
        </span>
      </div>

      <div
        className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t pt-5 text-xs"
        style={{ borderColor: COLOR.gray, color: COLOR.muted }}
      >
        <span>
          Headlines · <strong style={{ color: COLOR.ink }}>{headlineName}</strong>
        </span>
        <span>
          Body · <strong style={{ color: COLOR.ink }}>{bodyName}</strong>
        </span>
      </div>
    </div>
  );
}

function Typography() {
  return (
    <section className="border-t py-24 lg:py-32" style={{ borderColor: COLOR.gray }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="02"
          kicker="Typography"
          title="Two pairings, one voice"
          lead="A serif headline for warmth and authority, set against a clean grotesque for body. The same content, set both ways, so the choice is honest."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <TypeSpecimen
              option="A"
              label="Editorial & warm"
              headlineFont={FONT.dmSerif}
              bodyFont={FONT.inter}
              headlineName="DM Serif Display"
              bodyName="Inter"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <TypeSpecimen
              option="B"
              label="Classic & elegant"
              headlineFont={FONT.playfair}
              bodyFont={FONT.dmSans}
              headlineName="Playfair Display"
              bodyName="DM Sans"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 3 · whitespace/layout --- */

function Whitespace() {
  return (
    <section className="border-t py-24 lg:py-32" style={{ borderColor: COLOR.gray }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="03"
          kicker="Whitespace & Layout"
          title="Room to breathe"
          lead="Space is the primary material. Generous margins, unhurried line lengths, and one idea per view — content is never crowded into a corner."
        />

        {/* Padding scale */}
        <FadeIn className="mt-16">
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
          >
            <p
              className="text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: COLOR.muted }}
            >
              Spacing scale (8 px base)
            </p>
            <div className="mt-6 flex flex-wrap items-end gap-5">
              {[8, 16, 24, 40, 64, 96].map((px) => (
                <div key={px} className="flex flex-col items-center gap-2">
                  <div
                    className="rounded-md"
                    style={{
                      width: px,
                      height: px,
                      background: COLOR.gray,
                    }}
                  />
                  <span className="text-xs" style={{ color: COLOR.muted }}>
                    {px}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Hero mockup */}
        <FadeIn className="mt-10">
          <figure>
            <figcaption
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: COLOR.muted }}
            >
              Hero — new style
            </figcaption>
            <div
              className="overflow-hidden rounded-3xl"
              style={{ border: `1px solid ${COLOR.gray}`, background: COLOR.bg }}
            >
              <div className="grid items-center gap-10 p-10 sm:p-16 lg:grid-cols-2 lg:p-20">
                <div>
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.34em]"
                    style={{ color: COLOR.accent }}
                  >
                    {SAMPLE.eyebrow}
                  </p>
                  <h3
                    className="mt-6 text-4xl leading-[1.1] sm:text-5xl"
                    style={{ fontFamily: FONT.dmSerif, color: COLOR.ink }}
                  >
                    {SAMPLE.h1}
                  </h3>
                  <p
                    className="mt-6 max-w-md text-base leading-relaxed"
                    style={{ color: COLOR.muted }}
                  >
                    Transparent and flexible LED that disappears into glass and
                    reappears as light.
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <PrimaryButton>{SAMPLE.button}</PrimaryButton>
                    <GhostButton>View the technology</GhostButton>
                  </div>
                </div>
                {/* Calm media placeholder — warm gray, no gradient/glow */}
                <div
                  className="flex aspect-[4/3] items-center justify-center rounded-2xl"
                  style={{ background: COLOR.gray }}
                >
                  <span
                    className="text-xs uppercase tracking-[0.28em]"
                    style={{ color: COLOR.muted }}
                  >
                    Product photography
                  </span>
                </div>
              </div>
            </div>
          </figure>
        </FadeIn>

        {/* Product card mockup */}
        <FadeIn className="mt-10">
          <figure>
            <figcaption
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: COLOR.muted }}
            >
              Product card — new style
            </figcaption>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProductCard />
              <ProductCard
                title="Holographic Invisible Screen"
                spec="70–93% transparency · Glass-bonded · P2.5–P10"
                series="Holographic"
              />
              <ProductCard
                title="Soft LED Display"
                spec="35″/52″/70″ · 10 W · plug-and-play"
                series="Soft LED"
              />
            </div>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}

function ProductCard({
  title = SAMPLE.h3,
  spec = SAMPLE.caption.replace("Crystal Film — ", ""),
  series = "Crystal Film",
}) {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      <div
        className="flex aspect-[4/3] items-center justify-center"
        style={{ background: COLOR.bg }}
      >
        <span
          className="text-[11px] uppercase tracking-[0.24em]"
          style={{ color: COLOR.muted }}
        >
          {series}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3
          className="text-lg"
          style={{ fontFamily: FONT.dmSerif, color: COLOR.ink }}
        >
          {title}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: COLOR.muted }}
        >
          {spec}
        </p>
        <div
          className="mt-6 flex items-center justify-between border-t pt-4"
          style={{ borderColor: COLOR.gray }}
        >
          <span
            className="text-sm transition-colors"
            style={{ color: COLOR.accent }}
          >
            Request specs →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- 4 · components --- */

function Components() {
  return (
    <section className="border-t py-24 lg:py-32" style={{ borderColor: COLOR.gray }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="04"
          kicker="Components"
          title="A quiet, consistent kit"
          lead="Soft radii, hairline borders, and motion measured in millimetres. Every element earns the accent, or does without it."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Buttons */}
          <FadeIn>
            <Panel label="Buttons">
              <div className="flex flex-wrap items-center gap-4">
                <PrimaryButton>{SAMPLE.button}</PrimaryButton>
                <SecondaryButton>View specs</SecondaryButton>
                <GhostButton>Learn more</GhostButton>
              </div>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: COLOR.muted }}>
                Primary carries the accent and appears once per view. Secondary is
                a calm outline; ghost is text-only for tertiary actions.
              </p>
            </Panel>
          </FadeIn>

          {/* Form input */}
          <FadeIn delay={0.08}>
            <Panel label="Form input">
              <FormField label="Full name" placeholder="Jane Architect" />
              <FormField
                label="Work email"
                placeholder="jane@studio.com"
                type="email"
                focused
              />
              <p className="mt-2 text-xs" style={{ color: COLOR.muted }}>
                Focus state uses the accent as a hairline ring — the only colour
                in the form.
              </p>
            </Panel>
          </FadeIn>

          {/* Navigation bar */}
          <FadeIn delay={0.12} className="lg:col-span-2">
            <Panel label="Navigation bar">
              <div
                className="flex items-center justify-between rounded-full px-6 py-3"
                style={{ background: COLOR.bg, border: `1px solid ${COLOR.gray}` }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="relative h-7 w-7 overflow-hidden rounded-md ring-1 ring-black/5">
                    <Image
                      src="/assets/images/k1-logo.jpg"
                      alt="K1 Visual Solutions logo"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </span>
                  <span
                    className="text-xs tracking-[0.18em]"
                    style={{ color: COLOR.ink }}
                  >
                    K1 VISUAL
                  </span>
                </div>
                <nav className="hidden items-center gap-8 md:flex">
                  {["Technology", "Products", "Scenarios", "About"].map((l) => (
                    <span
                      key={l}
                      className="text-[13px] transition-colors hover:opacity-70"
                      style={{ color: COLOR.muted }}
                    >
                      {l}
                    </span>
                  ))}
                </nav>
                <button
                  type="button"
                  className="rounded-full px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: COLOR.accent }}
                >
                  Get a Quote
                </button>
              </div>
            </Panel>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Panel({ label, children }) {
  return (
    <div
      className="h-full rounded-2xl p-8"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      <p
        className="mb-6 text-[11px] font-medium uppercase tracking-[0.28em]"
        style={{ color: COLOR.muted }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function FormField({ label, placeholder, type = "text", focused = false }) {
  return (
    <div className="mb-4">
      <label
        className="mb-2 block text-xs font-medium tracking-wide"
        style={{ color: COLOR.ink }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
        style={{
          background: COLOR.bg,
          color: COLOR.ink,
          border: `1px solid ${focused ? COLOR.accent : COLOR.gray}`,
          boxShadow: focused ? `0 0 0 3px ${COLOR.accent}22` : "none",
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------- footer -- */

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: COLOR.gray }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center lg:px-10">
        <span className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-black/5">
          <Image
            src="/assets/images/k1-logo.jpg"
            alt="K1 Visual Solutions logo"
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>
        <p
          className="text-base tracking-[0.18em]"
          style={{ color: COLOR.ink }}
        >
          K1 VISUAL SOLUTIONS
        </p>
        <p className="text-sm" style={{ color: COLOR.muted }}>
          Design moodboard · Internal reference · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------- page --- */

export default function Moodboard() {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <ColorPalette />
        <Typography />
        <Whitespace />
        <Components />
      </main>
      <Footer />
    </>
  );
}
