/**
 * Social media links — single source of truth + inline SVG icons.
 *
 * No icon library: each glyph is a small, hand-rolled SVG so the bundle stays
 * dependency-free and the marks render in the brand's quiet, minimal style.
 * Icons inherit `currentColor`, so colour is set by the parent.
 *
 * WhatsApp number and the social URLs are placeholders to be swapped for the
 * client's real handles.
 */

export const SOCIAL_LINKS = [
  { label: "WhatsApp", href: "https://wa.me/19050000000", Icon: WhatsAppIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
];

export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.83c2.16 0 4.18.84 5.71 2.37a8.05 8.05 0 0 1 2.37 5.71c0 4.45-3.62 8.07-8.08 8.07a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.03 8.03 0 0 1-1.26-4.3c0-4.45 3.62-8.08 8.08-8.08Zm-2.78 4.27c-.13 0-.34.05-.52.24-.18.2-.69.68-.69 1.65 0 .97.71 1.91.81 2.04.1.13 1.39 2.12 3.37 2.97.47.2.84.32 1.12.42.47.15.9.13 1.24.08.38-.06 1.16-.47 1.33-.93.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23-.2-.1-1.16-.57-1.34-.64-.18-.06-.31-.1-.44.1-.13.2-.51.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.1-1.38-.11-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.44-1.08-.61-1.48-.16-.39-.32-.33-.44-.34l-.38-.01Z" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" {...props}>
      <path d="M14 8.5V7c0-.83.67-1 1.5-1H17V3h-2.5C12 3 11 4.5 11 7v1.5H9V12h2v9h3v-9h2.2l.3-3.5H14Z" />
    </svg>
  );
}

export function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" {...props}>
      <path d="M16.5 3c.32 1.93 1.4 3.43 3.5 3.74v2.45c-1.2.06-2.27-.27-3.42-.93v5.7c0 4.06-3.34 6.43-6.74 5.34-2.5-.8-3.7-3.4-3.06-5.94.62-2.45 3.04-3.92 5.66-3.5v2.62c-.4-.1-.83-.16-1.25-.1-1.1.16-1.94 1.05-1.86 2.2.08 1.16 1.1 1.96 2.27 1.78 1.05-.16 1.7-1.04 1.7-2.16V3h3.2Z" />
    </svg>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%" {...props}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.9h3.1V21H3.4V8.9Zm5.3 0h2.97v1.65h.04c.41-.78 1.42-1.6 2.93-1.6 3.14 0 3.72 2.06 3.72 4.74V21h-3.1v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H8.7V8.9Z" />
    </svg>
  );
}
