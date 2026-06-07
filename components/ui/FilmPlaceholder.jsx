import { COLOR } from "@/components/home/tokens";

/**
 * Stand-in for the Flexible LED Film product, which has no photography yet.
 * An elegant single-weight line drawing of a thin film curving gently on a
 * warm-gray field — no gradient, no glow, in keeping with the brand. Fills its
 * container; the parent sets the aspect ratio.
 */
export default function FilmPlaceholder({ className = "" }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
      style={{ background: COLOR.gray }}
    >
      <svg
        viewBox="0 0 240 180"
        className="h-auto w-3/4"
        fill="none"
        role="img"
        aria-label="Illustration of a thin, flexible LED film curving gently"
      >
        {/* the two long edges of a gently flexing sheet */}
        <path
          d="M26 66 C 78 30 162 118 214 76"
          stroke={COLOR.muted}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M26 96 C 78 60 162 148 214 106"
          stroke={COLOR.muted}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        {/* end caps, to read as a thin film with depth */}
        <path d="M26 66 L 26 96" stroke={COLOR.muted} strokeWidth="1.25" strokeLinecap="round" />
        <path d="M214 76 L 214 106" stroke={COLOR.muted} strokeWidth="1.25" strokeLinecap="round" />
        {/* faint cross-ribs hinting at a roll of flexible film */}
        {[
          { x: 68, top: 62 },
          { x: 110, top: 56 },
          { x: 152, top: 64 },
        ].map(({ x, top }) => (
          <path
            key={x}
            d={`M${x} ${top} q 0 16 0 30`}
            stroke={COLOR.muted}
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeLinecap="round"
          />
        ))}
        {/* a sparse LED dot-matrix wash across the sheet */}
        <g fill={COLOR.muted} fillOpacity="0.5">
          {Array.from({ length: 5 }).flatMap((_, r) =>
            Array.from({ length: 10 }).map((__, c) => (
              <circle
                key={`${r}-${c}`}
                cx={40 + c * 17}
                cy={74 + r * 7 + Math.sin((c / 10) * Math.PI) * -22}
                r="0.9"
              />
            ))
          )}
        </g>
      </svg>
    </div>
  );
}
