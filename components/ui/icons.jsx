/**
 * Lightweight inline SVG icon set (stroke-based, currentColor).
 * Keeps the bundle free of icon-library deps.
 */
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
};

export function TransparencyIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" opacity="0.6" />
      <circle cx="15" cy="15" r="3.5" />
    </svg>
  );
}

export function FlexIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 16c4 0 5-9 9-9s5 5 9 5" />
      <circle cx="3" cy="16" r="1.4" />
      <circle cx="21" cy="12" r="1.4" />
    </svg>
  );
}

export function AdhesiveIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h14v10a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V4Z" />
      <path d="M9 4v6M15 4v6" opacity="0.6" />
      <path d="M12 19v2" />
    </svg>
  );
}

export function DualDriveIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h7M4 12h7M4 17h7" />
      <path d="M13 12h7" />
      <circle cx="20" cy="7" r="1.4" />
      <circle cx="20" cy="17" r="1.4" />
      <path d="M13 7l3 0M16 7v10" opacity="0.6" />
    </svg>
  );
}

export function FilmIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M3 15h18M8 5v14M16 5v14" opacity="0.5" />
    </svg>
  );
}

export function PosterIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M9 7h6M9 11h6M9 15h3" opacity="0.7" />
    </svg>
  );
}

export function RetailIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9l1-4h14l1 4" />
      <path d="M4 9v10h16V9" />
      <path d="M9 19v-5h6v5" />
    </svg>
  );
}

export function FacadeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V5l7-2 7 2v16" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
    </svg>
  );
}

export function ExhibitionIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h18M5 7v12h14V7M3 7l2-3h14l2 3" />
      <path d="M10 12h4" />
    </svg>
  );
}

export function EscalatorIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 18l8-8 8-8" opacity="0" />
      <path d="M3 18l6-6h6l6-6" />
      <circle cx="9" cy="12" r="1.2" />
      <path d="M3 18h4M17 6h4" />
    </svg>
  );
}

export function HospitalityIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
      <path d="M16 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 3v2M11.5 3v2" opacity="0.6" />
      <path d="M4 20h14" />
    </svg>
  );
}

export function CorporateIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18" />
      <path d="M6 21V6l8-3v18" />
      <path d="M14 21V9l4 1.5V21" />
      <path d="M9 8h.01M9 12h.01M9 16h.01" opacity="0.7" />
    </svg>
  );
}

export function SignageIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18" />
      <path d="M12 5h7l2.5 2.5L19 10h-7z" />
      <path d="M12 12H5l-2.5 2.5L5 17h7z" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
