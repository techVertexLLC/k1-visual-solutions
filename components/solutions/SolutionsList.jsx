"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import {
  RetailIcon,
  FacadeIcon,
  HospitalityIcon,
  CorporateIcon,
  ExhibitionIcon,
  SignageIcon,
} from "@/components/ui/icons";

/**
 * Solutions — industry-based navigation. Six environments, each a card with a
 * 16:9 image, an inline icon, a short note on how transparent / holographic LED
 * solves that industry's problem, and two routes onward: filtered products and
 * a quote. Two-column grid on desktop, single column on mobile.
 *
 * The `series` value deep-links the catalog filter via ?series= (honoured by
 * ProductCatalog); `label` is the lead product family shown as a quiet tag.
 */
const CATEGORIES = [
  {
    key: "retail",
    title: "Retail & Storefront",
    Icon: RetailIcon,
    image: "/assets/images/applications/app-storefront.jpg",
    imageAlt:
      "Transparent LED storefront window running a promotion, street visible through the glass",
    copy: "Transform window displays into dynamic, see-through media walls. Transparent LED lets natural light in while running promotions, product launches, and seasonal campaigns — visible from the street, day or night.",
    series: "series-t",
    label: "Series T — Transparent Poster",
  },
  {
    key: "architecture",
    title: "Architecture & Facades",
    Icon: FacadeIcon,
    image: "/assets/images/scenes/scene-architecture-facade.jpg",
    imageAlt:
      "Glass curtain-wall facade at dusk with holographic LED content integrated flush with the glazing",
    copy: "Turn building glass into a media canvas without sacrificing transparency. Holographic LED panels integrate flush with curtain walls and atriums, adding motion and brand presence while preserving the architect's sightlines.",
    series: "holographic",
    label: "Holographic LED",
  },
  {
    key: "hospitality",
    title: "Hospitality & F&B",
    Icon: HospitalityIcon,
    image: "/assets/images/scenes/scene-restaurant-hospitality.jpg",
    imageAlt:
      "Transparent LED display in a restaurant window, warm lit interior visible behind",
    copy: "Set the mood with ambient visuals that don't crowd the space. Transparent screens behind bars, in café windows, or across hotel lobbies deliver content without walls — keeping the interior open and inviting.",
    series: "series-t",
    label: "Series T, Holographic",
  },
  {
    key: "corporate",
    title: "Corporate & Lobbies",
    Icon: CorporateIcon,
    image: "/assets/images/applications/app-lobby.jpg",
    imageAlt:
      "Corporate lobby glazing carrying composed transparent LED branding above the reception area",
    copy: "Welcome visitors with a composed digital presence across lobby glazing. Display company messaging, wayfinding, or branded content on transparent panels that maintain the reception area's clean, open feel.",
    series: "holographic",
    label: "Holographic LED",
  },
  {
    key: "events",
    title: "Events & Exhibitions",
    Icon: ExhibitionIcon,
    image: "/assets/images/applications/app-event.jpg",
    imageAlt:
      "Exhibition booth wrapped in flexible LED film curving around columns and displays",
    copy: "Create immersive booth experiences with flexible LED film that wraps columns, curves around displays, and transforms any surface into a screen — then rolls up when the show is over.",
    series: "series-f",
    label: "Series F — Flexible Film",
  },
  {
    key: "signage",
    title: "Digital Signage & Wayfinding",
    Icon: SignageIcon,
    image: "/assets/images/applications/app-signage.jpg",
    imageAlt:
      "Transparent LED signage panel showing real-time messaging with the space behind still visible",
    copy: "Replace static signs with transparent LED panels that deliver real-time messaging — transit schedules, directory maps, promotions — readable at a glance without blocking the view behind.",
    series: "series-t",
    label: "Series T, Holographic",
  },
];

function SolutionCard({ item, index }) {
  const { Icon } = item;
  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <article
        className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-card transition-[transform,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover"
        style={{
          background: "#fff",
          border: `1px solid ${COLOR.gray}`,
        }}
      >
        {/* Image — 16:9, links straight to the filtered catalog */}
        <a
          href={`/products?series=${item.series}`}
          className="relative block aspect-[16/9] overflow-hidden"
          aria-label={`See ${item.title} products`}
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
          />
        </a>

        {/* Content */}
        <div className="flex flex-1 flex-col p-7 lg:p-8">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 flex-none items-center justify-center rounded-lg p-2.5"
              style={{ background: COLOR.gray, color: COLOR.accent }}
              aria-hidden
            >
              <Icon />
            </span>
            <span
              className="text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: COLOR.muted }}
            >
              {item.label}
            </span>
          </div>

          <h3
            className="mt-5 text-2xl leading-snug"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            {item.title}
          </h3>
          <p
            className="mt-3 flex-1 text-[15px] leading-relaxed"
            style={{ color: COLOR.body }}
          >
            {item.copy}
          </p>

          {/* Routes onward */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`/products?series=${item.series}`}
              className="btn-lift btn-glow inline-flex items-center gap-2 rounded-full bg-[#4F46B5] px-5 py-2 text-sm font-medium text-white hover:bg-[#5A50C7]"
            >
              See Products
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="/contact"
              className="btn-lift inline-flex items-center rounded-full border border-[#E8E4DF] px-5 py-2 text-sm font-medium text-[#1A1A1A] hover:border-[#4F46B5] hover:bg-[#4F46B5]/[0.05] hover:text-[#4F46B5]"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function SolutionsList() {
  return (
    <section
      aria-label="Solutions by industry"
      className="py-16 md:py-24"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: COLOR.accent }}
          >
            By industry
          </span>
          <h2
            className="mt-4 text-2xl leading-tight md:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Built for retail digital signage, architectural LED, and beyond
          </h2>
          <p
            className="mt-5 text-base leading-relaxed"
            style={{ color: COLOR.body }}
          >
            The same transparent surface solves a different problem in each
            environment. Pick the setting closest to yours to see the right
            product family — and the path to a quote.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:gap-8">
          {CATEGORIES.map((item, i) => (
            <SolutionCard key={item.key} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
