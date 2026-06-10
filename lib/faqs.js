/**
 * FAQ content — the common B2B questions shown on the Solutions page.
 *
 * Single source of truth so the data drives two things at once: the interactive
 * <FaqAccordion> (client) and the FAQPage structured data emitted server-side
 * on /solutions. Keep questions/answers in sync here only.
 */

import { CONTACT } from "@/lib/demo";

export const FAQS = [
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
    a: `Yes. We keep demo units at our ${CONTACT.city} showroom. Contact us to schedule a visit.`,
  },
  {
    q: "What content formats are supported?",
    a: "Our displays accept HDMI, USB, and network input. We support MP4, JPG, PNG, and most standard media formats.",
  },
];
