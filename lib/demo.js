/**
 * Demo-aware contact configuration.
 *
 * When NEXT_PUBLIC_DEMO_MODE=true, every piece of real company contact info
 * across the site is swapped for neutral demo placeholders. When the variable
 * is unset or anything other than "true", the site renders the real values and
 * behaves exactly as before.
 *
 * The NEXT_PUBLIC_ prefix is required so Next.js inlines the value into the
 * client bundle — without it, client components would always see undefined.
 *
 * This is the single source of truth: all other files import CONTACT from here
 * rather than hardcoding addresses, emails, phone numbers, or the legal name.
 */

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

// Real production values.
const REAL = {
  // Full one-line address as shown in footers / contact cards.
  address: "525 W Wrightwood Avenue, Elmhurst, IL",
  // Street line on its own (used in structured data).
  street: "525 W Wrightwood Avenue",
  city: "Elmhurst",
  region: "IL",
  postalCode: "60126",
  // "City, State" — appears throughout marketing copy and metadata.
  cityState: "Elmhurst, IL",
  email: "Andrewxu@vertexdistributor.com",
  // Human-readable phone, tel: href, and the dash-formatted form used in
  // structured data.
  phone: "+1 (630) 359-5931",
  phoneHref: "tel:+16303595931",
  phoneIntl: "+1-630-359-5931",
  // Legal entity name (copyright lines, structured data), the shorter
  // brand-style name used in some headings, and the bare brand token used in
  // possessive form ("<brand>'s ... displays").
  companyLegal: "K1trends Global Inc.",
  companyShort: "K1trends Global",
  brand: "K1trends",
};

// Neutral placeholders shown in demo mode.
const DEMO = {
  address: "350 Fifth Avenue, Suite 4500, New York, NY",
  street: "350 Fifth Avenue, Suite 4500",
  city: "New York",
  region: "NY",
  postalCode: "10118",
  cityState: "New York, NY",
  email: "hello@k1visual.com",
  phone: "+1 (212) 555-0199",
  phoneHref: "tel:+12125550199",
  phoneIntl: "+1-212-555-0199",
  companyLegal: "K1 Visual Solutions LLC",
  companyShort: "K1 Visual Solutions",
  brand: "K1 Visual Solutions",
};

const base = DEMO_MODE ? DEMO : REAL;

export const CONTACT = {
  ...base,
  // Convenience hrefs derived from the active email.
  emailHref: `mailto:${base.email}`,
};
