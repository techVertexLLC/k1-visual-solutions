"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COLOR, FONT } from "./tokens";

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

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[color:var(--accent)]";

function Field({ id, label, type = "text", as = "input", ...rest }) {
  const Tag = as;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em]"
        style={{ color: COLOR.muted }}
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={as === "input" ? type : undefined}
        className={inputBase}
        style={{ borderColor: COLOR.gray, color: COLOR.ink }}
        {...rest}
      />
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: no backend yet — confirm receipt locally.
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-24 lg:py-32"
      style={{ background: COLOR.bg, "--accent": COLOR.accent }}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <FadeUp className="text-center">
          <div
            className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>05</span>
            <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
            <span>Contact</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            Request a quote
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: COLOR.body }}
          >
            Tell us about the space and the effect you're after. We'll come back
            with the right product, a spec, and an indicative price.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-12">
          {submitted ? (
            <div
              className="rounded-2xl border p-10 text-center"
              style={{ borderColor: COLOR.gray, background: "#fff" }}
            >
              <h3
                className="text-2xl"
                style={{ fontFamily: FONT.serif, color: COLOR.ink }}
              >
                Thank you — we've got it.
              </h3>
              <p className="mt-3 text-base" style={{ color: COLOR.body }}>
                A member of the K1 team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border p-7 sm:p-9"
              style={{ borderColor: COLOR.gray, background: "#fff" }}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Name" autoComplete="name" required />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="mt-6">
                <Field
                  id="scenario"
                  label="Scenario"
                  as="textarea"
                  rows={4}
                  placeholder="e.g. transparent screen for a retail window, ~3m × 2m…"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:w-auto"
                style={{ background: COLOR.accent }}
              >
                Request a Quote
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
