"use client";

import { useState } from "react";
import { COLOR, FONT } from "@/components/home/tokens";

/**
 * Quote-request form. No backend yet — confirms receipt locally on submit.
 */

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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="flex h-full flex-col justify-center rounded-2xl border p-10 text-center"
        style={{ borderColor: COLOR.gray, background: "#fff" }}
      >
        <h3 className="text-2xl" style={{ fontFamily: FONT.serif, color: COLOR.ink }}>
          Thank you — we've got it.
        </h3>
        <p className="mt-3 text-base" style={{ color: COLOR.body }}>
          A member of the K1 team will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border p-7 sm:p-9"
      style={{ borderColor: COLOR.gray, background: "#fff", "--accent": COLOR.accent }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" required />
        <Field id="email" label="Email" type="email" autoComplete="email" required />
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field id="company" label="Company" autoComplete="organization" />
        <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
      </div>
      <div className="mt-6">
        <Field
          id="product"
          label="Product of interest"
          placeholder="e.g. Transparent LED Poster Screen, Holographic P3.91…"
        />
      </div>
      <div className="mt-6">
        <Field
          id="scenario"
          label="Tell us about your project"
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
  );
}
