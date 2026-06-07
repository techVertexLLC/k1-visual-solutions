"use client";

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

const FACTS = [
  { label: "Based in", value: "Markham, Ontario" },
  { label: "Serving", value: "North America" },
  { label: "Focus", value: "Transparent & flexible LED" },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-24 lg:py-32"
      style={{ background: COLOR.bg }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:gap-20 lg:px-10">
        <FadeUp>
          <div
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em]"
            style={{ color: COLOR.muted }}
          >
            <span style={{ color: COLOR.accent }}>03</span>
            <span aria-hidden className="h-px w-8" style={{ background: COLOR.gray }} />
            <span>About</span>
          </div>
          <h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: FONT.serif, color: COLOR.ink }}
          >
            A quieter way to put light into a space
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} className="flex flex-col justify-center">
          <p className="text-lg leading-relaxed" style={{ color: COLOR.body }}>
            K1 Visual Solutions is a Markham, Ontario–based distributor of premium
            transparent, flexible, and self-adhesive LED display systems. We work
            with architects, retail brands, and system integrators across North
            America to bring high-clarity digital surfaces into glass, curves, and
            facades — without the bulk, glare, or visual noise of conventional
            signage.
          </p>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: COLOR.body }}>
            Our role is simple: source the right technology, specify it honestly,
            and stand behind it from quote to commissioning.
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label} className="py-2">
                <dt
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: COLOR.muted }}
                >
                  {f.label}
                </dt>
                <dd
                  className="mt-1 text-sm font-medium"
                  style={{ color: COLOR.ink }}
                >
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>
    </section>
  );
}
