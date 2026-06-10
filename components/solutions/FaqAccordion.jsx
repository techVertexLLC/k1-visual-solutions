"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT } from "@/components/home/tokens";
import { FAQS } from "@/lib/faqs";

/**
 * FAQ accordion for the Solutions page. Quiet, single-column list of common
 * B2B LED-display questions with a + / − toggle and a smooth expand/collapse.
 * One panel open at a time. Styled to the warm, minimal site aesthetic.
 *
 * Questions/answers live in lib/faqs.js so the same content also feeds the
 * FAQPage structured data emitted on /solutions.
 */

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b" style={{ borderColor: "#DAD5CE" }}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-opacity hover:opacity-70"
        >
          <span
            className="text-base font-medium sm:text-lg"
            style={{ color: COLOR.ink }}
          >
            {item.q}
          </span>
          {/* A plus that rotates 45° into an × — one glyph, one smooth motion,
              instead of swapping characters mid-air. */}
          <span
            className={`flex h-6 w-6 flex-none items-center justify-center transition-transform duration-300 ease-premium ${
              isOpen ? "rotate-45" : ""
            }`}
            style={{ color: COLOR.accent }}
            aria-hidden
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M7 1v12M1 7h12" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 pr-10 text-[15px] leading-relaxed"
              style={{ color: COLOR.body }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      aria-label="Frequently asked questions"
      className="py-16 md:py-24"
      style={{ background: COLOR.gray }}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal>
          <span
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: COLOR.accent }}
          >
            FAQ
          </span>
          <h2
            className="mt-4 text-2xl leading-tight md:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Common questions
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: COLOR.body }}
          >
            A few things buyers ask before a first project. Anything else — just
            get in touch.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="border-t" style={{ borderColor: "#DAD5CE" }}>
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
