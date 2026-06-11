"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered reveal wrapper. Fades + slides children into view once.
 *
 * Respects prefers-reduced-motion for accessibility — when the user has
 * requested reduced motion, children render as plain HTML with no animation.
 * Initial state is always visible so content remains accessible if JS fails.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
  style,
}) {
  const shouldReduce = useReducedMotion();

  // No animation for users who prefer reduced motion (accessibility)
  if (shouldReduce) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
