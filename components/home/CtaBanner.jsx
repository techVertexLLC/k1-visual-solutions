"use client";

import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT } from "./tokens";

/**
 * Closing CTA banner. A calm warm-gray panel — the lone accent stays on the
 * button — inviting the reader to start a quote. No dark background, no glow.
 */
export default function CtaBanner() {
  return (
    <section className="px-6 py-20 lg:px-10 lg:py-24" style={{ background: COLOR.bg }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div
            className="overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-12 sm:py-16"
            style={{ background: COLOR.gray }}
          >
            <h2
              className="mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Tell us about your space
            </h2>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: COLOR.body }}
            >
              Share the dimensions and the effect you're after, and we'll come
              back with the right product, a clear spec, and an indicative price.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              <a
                href="/k1/contact"
                className="rounded-full px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                style={{ background: COLOR.accent }}
              >
                Request a Quote
              </a>
              <a
                href="/k1/products"
                className="group inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-opacity-10"
                style={{ borderColor: COLOR.accent, color: COLOR.accent }}
              >
                Browse Products
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
