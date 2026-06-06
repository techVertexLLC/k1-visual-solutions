/**
 * Gradient card stand-in for real imagery/video. No external assets — pure CSS.
 * Communicates intent via a label + caption so the layout reads as finished.
 */
export default function GradientPlaceholder({
  label,
  caption,
  icon = null,
  variant = "a",
  className = "",
  ratio = "aspect-[4/3]",
  animate = true,
}) {
  const variants = {
    a: "from-brand-blue/30 via-brand-indigo/20 to-brand-purple/30",
    b: "from-electric-cyan/25 via-brand-indigo/20 to-brand-violet/30",
    c: "from-brand-purple/30 via-brand-blue/15 to-electric-cyan/25",
    d: "from-brand-indigo/30 via-brand-violet/20 to-electric-blue/25",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 ${ratio} ${className}`}
    >
      {/* Base gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          variants[variant] || variants.a
        }`}
      />
      {/* Dot-matrix LED texture */}
      <div className="absolute inset-0 led-grid opacity-60" />
      {/* Glow blob */}
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric-cyan/20 blur-3xl ${
          animate ? "animate-float" : ""
        }`}
      />
      <div
        className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-brand-purple/25 blur-3xl"
        aria-hidden
      />
      {/* Scanline shimmer */}
      <div className="absolute inset-0 scanline" aria-hidden />

      {/* Label */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
        {icon && <div className="mb-3 text-electric-cyan">{icon}</div>}
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
          {label}
        </span>
        {caption && (
          <span className="mt-2 max-w-[22ch] text-xs leading-relaxed text-white/55">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
