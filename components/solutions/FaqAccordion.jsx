"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { COLOR, FONT } from "@/components/home/tokens";

/**
 * FAQ accordion for the Solutions page. Quiet, single-column list of common
 * B2B LED-display questions with a + / − toggle and a smooth expand/collapse.
 * One panel open at a time. Styled to the warm, minimal site aesthetic.
 */

const FAQS = [
  {
    q: "What is the minimum order quantity?",
    a: "We work on a per-project basis. No fixed MOQ — tell us your wall size and we'll spec the right system.",
  },
  {
    q: "How long does shipping take?",
    a: "Typical lead time is 3–5 weeks from order confirmation. Rush orders can be arranged.",
  },
  {
    q: "Do you offer installation support?",
    a: "We provide detailed mounting documentation and can connect you with certified integrators in your region.",
  },
  {
    q: "What warranty do you offer?",
    a: "Standard 3-year warranty on all LED panels. Extended warranty options available.",
  },
  {
    q: "Can I see a demo unit?",
    a: "Yes. We keep demo units at our Markham facility. Contact us to schedule a visit.",
  },
  {
    q: "What content formats are supported?",
    a: "Our displays accept HDMI, USB, and network input. We support MP4, JPG, PNG, and most standard media formats.",
  },
];

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
          <span
            className="flex h-6 w-6 flex-none items-center justify-center text-xl leading-none"
            style={{ color: COLOR.accent }}
            aria-hidden
          >
            {isOpen ? "−" : "+"}
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
    <section className="py-20 lg:py-28" style={{ background: COLOR.gray }}>
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal>
          <span
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: COLOR.accent }}
          >
            FAQ
          </span>
          <h2
            className="mt-4 text-3xl leading-tight sm:text-4xl"
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
