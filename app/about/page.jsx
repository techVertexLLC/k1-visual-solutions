import Image from "next/image";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import CtaBanner from "@/components/home/CtaBanner";
import SiteFooter from "@/components/SiteFooter";
import { CheckIcon, PinIcon, DualDriveIcon } from "@/components/ui/icons";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";

export const metadata = {
  title: "About — K1trends Global Inc.",
  description:
    "K1 Visual Solutions is a Markham, Ontario distributor of premium transparent, flexible and holographic LED display systems, serving architects, retail brands and integrators across North America.",
  openGraph: {
    title: "About K1trends Global Inc. — Our Mission & Story",
    description:
      "K1 Visual Solutions is a Markham, Ontario distributor of premium transparent, flexible and holographic LED display systems, serving architects, retail brands and integrators across North America.",
    url: "https://k1visualsolutions.com/k1/about",
    type: "website",
  },
};

const FACTS = [
  { label: "Based in", value: "Markham, Ontario" },
  { label: "Serving", value: "North America" },
  { label: "Focus", value: "Transparent & flexible LED" },
  { label: "Parent", value: "K1trends Global Inc." },
];

const VALUES = [
  {
    Icon: CheckIcon,
    title: "Honest Specs",
    body: "We publish real-world numbers, not datasheet maximums. What you read is what you get on site.",
  },
  {
    Icon: PinIcon,
    title: "North American Support",
    body: "Same-timezone response, local accountability, and a Markham showroom you can visit.",
  },
  {
    Icon: DualDriveIcon,
    title: "Integrator-Friendly",
    body: "Every system ships with mounting docs, wiring diagrams, and clear content input specs. No guesswork for your installer.",
  },
];

const PRINCIPLES = [
  {
    title: "Source the right technology",
    body: "We curate next-generation transparent, holographic, and flexible LED systems from manufacturers we've vetted — and only bring forward what we'd specify ourselves.",
  },
  {
    title: "Specify it honestly",
    body: "Transparency figures, brightness, pitch, weight — we quote the numbers that matter and match the product to the room, not the other way around.",
  },
  {
    title: "Stand behind it",
    body: "From the first quote to final commissioning, we stay involved — documentation, installation support, and a local point of accountability.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="page-enter min-h-screen" style={{ background: "#FAF8F5" }}>
      <PageBanner
        eyebrow="About"
        title="A quieter way to put light into a space"
        description="K1 Visual Solutions brings high-clarity digital surfaces into glass, curves, and facades — without the bulk, glare, or visual noise of conventional signage."
        image="/k1/assets/images/applications/app-lobby.jpg"
        imageAlt="Corporate lobby with a transparent LED display"
        breadcrumb={
          <>
            <a href="/k1/" className="hover:opacity-70">Home</a>
            <span aria-hidden>/</span>
            <span>About</span>
          </>
        }
      />

      {/* Story */}
      <section className="py-20 lg:py-28" style={{ background: COLOR.bg }}>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:gap-20 lg:px-10">
          <Reveal>
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: COLOR.muted }}
            >
              <span style={{ color: COLOR.accent }}>Who we are</span>
            </div>
            <h2
              className="mt-6 text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              A distributor built for architects and integrators
            </h2>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl"
              style={{ background: COLOR.gray, border: `1px solid ${COLOR.gray}` }}
            >
              {FACTS.map((f) => (
                <div key={f.label} className="p-5" style={{ background: "#fff" }}>
                  <dt className="text-[11px] uppercase tracking-[0.16em]" style={{ color: COLOR.muted }}>
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium" style={{ color: COLOR.ink }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <div
              className="relative mb-8 aspect-[16/10] overflow-hidden rounded-2xl"
              style={{ border: `1px solid ${COLOR.gray}` }}
            >
              <Image
                src="/k1/assets/images/k1-office-render.jpg"
                alt="K1 Visual Solutions office — interior render"
                fill
                loading="lazy"
                quality={82}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
            <p className="text-lg leading-relaxed" style={{ color: COLOR.body }}>
              K1 Visual Solutions is a Markham, Ontario–based distributor of
              premium transparent, flexible, and self-adhesive LED display
              systems. We work with architects, retail brands, and system
              integrators across North America to bring high-clarity digital
              surfaces into glass, curves, and facades.
            </p>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: COLOR.body }}>
              Our role is simple: source the right technology, specify it
              honestly, and stand behind it from quote to commissioning.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 lg:py-28" style={{ background: COLOR.gray }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <h2
              className="text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              How we work
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
              Three principles guide every project we take on.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div
                  className="flex h-full flex-col rounded-2xl p-8"
                  style={{ background: "#fff", border: `1px solid #D4CFC8` }}
                >
                  <span
                    className="text-2xl"
                    style={{ fontFamily: FONT.serif, color: COLOR.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-4 text-xl leading-snug"
                    style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: COLOR.body }}>
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why K1 — values */}
      <section className="py-20 lg:py-28" style={{ background: COLOR.bg }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: COLOR.muted }}
            >
              <span style={{ color: COLOR.accent }}>Why K1</span>
            </div>
            <h2
              className="mt-6 text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              What you can count on
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLOR.body }}>
              The things that make a K1 project easy to specify, easy to trust,
              and easy to install.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div
                  className="flex h-full flex-col rounded-2xl p-8"
                  style={{ background: "#fff", border: `1px solid #D4CFC8` }}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl p-2.5"
                    style={{ background: COLOR.gray, color: COLOR.accent }}
                  >
                    <v.Icon />
                  </div>
                  <h3
                    className="mt-5 text-xl leading-snug"
                    style={{ fontFamily: FONT.serif, color: COLOR.ink }}
                  >
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: COLOR.body }}>
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Installation expertise */}
      <section className="py-20 lg:py-28" style={{ background: COLOR.gray }}>
        <Reveal className="mx-auto max-w-6xl px-6 lg:px-10">
          <div
            className="grid items-stretch gap-px overflow-hidden rounded-2xl md:grid-cols-2"
            style={{ border: `1px solid ${COLOR.gray}`, background: COLOR.gray }}
          >
            <div className="relative aspect-[3/2] md:aspect-auto">
              <Image
                src="/k1/assets/images/applications/install-guide.jpg"
                alt="Installation diagram for a K1 transparent LED display system"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12" style={{ background: "#fff" }}>
              <span
                className="text-[11px] font-medium uppercase tracking-[0.24em]"
                style={{ color: COLOR.muted }}
              >
                Specified to install
              </span>
              <h3
                className="mt-3 text-2xl leading-snug sm:text-3xl"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                Engineered for a clean install
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: COLOR.body }}>
                Every system ships with clear mounting and wiring documentation,
                so integrators know exactly how the panels carry, align, and
                connect before they reach site. We specify the structure and stand
                behind it from quote to commissioning.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
