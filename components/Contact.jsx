"use client";

import { useState } from "react";
import Reveal from "./ui/Reveal";
import { MailIcon, PhoneIcon, PinIcon, CheckIcon } from "./ui/icons";

const SCENARIOS = [
  "Retail Windows",
  "Architectural Facades",
  "Exhibitions & Showrooms",
  "Mall Escalators",
  "Other / Not sure yet",
];

const CONTACT_INFO = [
  { icon: MailIcon, label: "Email", value: "sales@k1trends.com", href: "mailto:sales@k1trends.com" },
  { icon: PhoneIcon, label: "Phone", value: "+1 (905) 000-0000", href: "tel:+19050000000" },
  { icon: PinIcon, label: "Headquarters", value: "Markham, Ontario, Canada", href: null },
];

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-ink-800/80 px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-electric-cyan/60 focus:ring-1 focus:ring-electric-cyan/40";

export default function Contact() {
  const [intent, setIntent] = useState("quote"); // "quote" | "demo"
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end only: real submission wires to a backend/CRM later.
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-white/5 bg-ink-800 py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-purple/15 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-electric-cyan">
            Get in Touch
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s light up your space
          </h2>
          <p className="mt-4 text-base text-white/60">
            Tell us about your project and our team will respond with tailored
            specs, lead times, and pricing.
          </p>
        </Reveal>

        {/* CTA intent switch */}
        <Reveal delay={0.05} className="mt-10 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIntent("quote")}
              aria-pressed={intent === "quote"}
              className={`rounded-full px-7 py-3 text-base font-semibold transition-all ${
                intent === "quote"
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "border border-white/20 bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              Request a Quote
            </button>
            <button
              type="button"
              onClick={() => setIntent("demo")}
              aria-pressed={intent === "demo"}
              className={`rounded-full px-7 py-3 text-base font-semibold transition-all ${
                intent === "demo"
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "border border-white/20 bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              Book a Demo
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-ink-700/40 p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient p-4 text-white shadow-glow animate-led-pulse">
                    <CheckIcon />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Thank you — message received
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-white/60">
                    Our team will get back to you within one business day with
                    {intent === "demo" ? " demo scheduling options." : " a tailored quote."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-electric-cyan hover:text-white"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <input type="hidden" name="intent" value={intent} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/80">
                        Name <span className="text-electric-cyan">*</span>
                      </label>
                      <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-white/80">
                        Company <span className="text-electric-cyan">*</span>
                      </label>
                      <input id="company" name="company" type="text" required autoComplete="organization" placeholder="Acme Retail Group" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/80">
                        Email <span className="text-electric-cyan">*</span>
                      </label>
                      <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/80">
                        Phone
                      </label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (000) 000-0000" className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="scenario" className="mb-1.5 block text-sm font-medium text-white/80">
                        Application Scenario
                      </label>
                      <select id="scenario" name="scenario" defaultValue="" className={fieldClass}>
                        <option value="" disabled>
                          Select an application…
                        </option>
                        {SCENARIOS.map((s) => (
                          <option key={s} value={s} className="bg-ink-800">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quantity" className="mb-1.5 block text-sm font-medium text-white/80">
                        Estimated Area / Quantity
                      </label>
                      <input id="quantity" name="quantity" type="text" placeholder="e.g. 40 m² or 12 panels" className={fieldClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/80">
                      Message
                    </label>
                    <textarea id="message" name="message" rows={4} placeholder="Tell us about your project, timeline, and goals…" className={`${fieldClass} resize-y`} />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:w-auto"
                  >
                    {intent === "demo" ? "Book a Demo" : "Request a Quote"}
                  </button>
                  <p className="text-xs text-white/40">
                    Fields marked <span className="text-electric-cyan">*</span> are required. We respect your privacy and never share your details.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact info + map */}
          <Reveal delay={0.18} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <ul className="space-y-4 rounded-3xl border border-white/10 bg-ink-700/40 p-6">
                {CONTACT_INFO.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <>
                      <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-brand-gradient/10 p-2.5 text-electric-cyan ring-1 ring-white/10">
                        <Icon />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-white/40">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-medium text-white">
                          {c.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="flex gap-3 transition-colors hover:text-electric-cyan">
                          {inner}
                        </a>
                      ) : (
                        <div className="flex gap-3">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Static map placeholder */}
              <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900" />
                <div className="absolute inset-0 led-grid opacity-40" />
                {/* faux roads */}
                <div className="absolute left-0 top-1/3 h-px w-full bg-white/10" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
                <div className="absolute left-1/4 top-0 h-full w-px bg-white/5" />
                <div className="absolute left-0 top-2/3 h-px w-full bg-white/5" />
                <div className="relative flex h-full min-h-[12rem] items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <span className="flex h-12 w-12 animate-led-pulse items-center justify-center rounded-full bg-brand-gradient p-3 text-white shadow-glow">
                      <PinIcon />
                    </span>
                    <span className="mt-3 text-sm font-semibold text-white">
                      Markham, Ontario
                    </span>
                    <span className="text-xs text-white/45">
                      Interactive map placeholder
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
