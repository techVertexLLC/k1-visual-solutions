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
 * solves that industry's problem, and two routes onward: the matching product
 * detail page and a quote. Two-column grid on desktop, single column on mobile.
 *
 * `href` points each industry at its product detail page (with an
 * #applications anchor where the scene gallery is the payoff); `label` is the
 * lead product line shown as a quiet tag. Routing per redesign spec §9.
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
    href: "/products/crystal-film#applications",
    label: "Crystal Film LED Screen",
  },
  {
    key: "architecture",
    title: "Architecture & Facades",
    Icon: FacadeIcon,
    image: "/assets/images/scenes/scene-architecture-facade.jpg",
    imageAlt:
      "Glass curtain-wall facade at dusk with transparent LED content integrated flush with the glazing",
    copy: "Turn building glass into a media canvas without sacrificing transparency. Self-adhesive Crystal Film bonds straight onto curtain walls and atrium glazing — no steel structure — adding motion and brand presence while preserving the architect's sightlines.",
    href: "/products/crystal-film#applications",
    label: "Crystal Film LED Screen",
  },
  {
    key: "hospitality",
    title: "Hospitality & F&B",
    Icon: HospitalityIcon,
    image: "/assets/images/scenes/scene-restaurant-hospitality.jpg",
    imageAlt:
      "Transparent LED display in a restaurant window, warm lit interior visible behind",
    copy: "Set the mood with ambient visuals that don't crowd the space. Transparent screens behind bars, in café windows, or across hotel lobbies deliver content without walls — keeping the interior open and inviting.",
    href: "/products/crystal-film",
    label: "Crystal Film LED Screen",
  },
  {
    key: "corporate",
    title: "Corporate & Lobbies",
    Icon: CorporateIcon,
    image: "/assets/images/applications/app-lobby.jpg",
    imageAlt:
      "Corporate lobby glazing carrying composed transparent LED branding above the reception area",
    copy: "Welcome visitors with a composed digital presence across lobby glazing. Display company messaging, wayfinding, or branded content on near-invisible panels that maintain the reception area's clean, open feel.",
    href: "/products/holographic",
    label: "Holographic Invisible Screen",
  },
  {
    key: "events",
    title: "Events & Exhibitions",
    Icon: ExhibitionIcon,
    image: "/assets/images/applications/app-event.jpg",
    imageAlt:
      "Exhibition space with holographic invisible screens floating content on glass",
    copy: "Create immersive booth and showroom experiences with holographic invisible screens — fine-pitch, 3D-capable imagery that floats on the glass and reads from every aisle, while the exhibit behind stays in full view.",
    href: "/products/holographic",
    label: "Holographic Invisible Screen",
  },
  {
    key: "signage",
    title: "Digital Signage & Storefronts",
    Icon: SignageIcon,
    image: "/assets/images/applications/app-signage.jpg",
    imageAlt:
      "Storefront window with a bright programmable LED sign scrolling a message",
    copy: "Give any storefront a sign that moves. The plug-and-play Soft LED Display sticks to glass or walls, runs on USB power, and updates from your phone — promotions, hours, and messages live in five minutes.",
    href: "/products/soft-led-display",
    label: "Soft LED Display",
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
        {/* Image — 16:9, links straight to the matching product detail page */}
        <a
          href={item.href}
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
              href={item.href}
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
