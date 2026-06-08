"use client";

/**
 * PageTransition — wraps page content in a Framer Motion fade.
 *
 * Design decisions:
 *   - duration 0.25s, easeOut: snappy but not jarring
 *   - key=pathname: ensures AnimatePresence registers a real unmount/mount
 *     when the route changes (App Router keeps the same layout tree, so without
 *     a changing key the animation never fires)
 *   - prefers-reduced-motion: we read the media query at runtime and set
 *     duration → 0 so the layout shift still happens but with no animation
 */

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
    exit:    { opacity: 0 },
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeOut" };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
