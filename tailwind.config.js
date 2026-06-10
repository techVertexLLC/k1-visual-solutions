/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a1a",
          900: "#06060f",
          800: "#0a0a1a",
          700: "#11112b",
          600: "#191942",
        },
        electric: {
          DEFAULT: "#22d3ee",
          cyan: "#22d3ee",
          blue: "#3b82f6",
        },
        brand: {
          blue: "#2563eb",
          indigo: "#4f46e5",
          purple: "#7c3aed",
          violet: "#a855f7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #2563eb 0%, #4f46e5 45%, #7c3aed 100%)",
        "brand-radial":
          "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(34,211,238,0.45), 0 0 40px rgba(124,58,237,0.25)",
        "glow-lg":
          "0 0 30px rgba(34,211,238,0.55), 0 0 70px rgba(124,58,237,0.35)",
        // Warm-canvas card shadows — ink-tinted, never gray-blue.
        card: "0 1px 2px rgba(26,26,26,0.04)",
        "card-hover":
          "0 18px 40px -16px rgba(26,26,26,0.18), 0 4px 12px -6px rgba(26,26,26,0.06)",
        // Soft brand glow under primary CTAs on hover.
        cta: "0 10px 28px -10px rgba(79,70,181,0.5)",
      },
      transitionTimingFunction: {
        // Shared premium curve for hover lifts / zooms (Material standard ease).
        premium: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "led-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 18px rgba(34,211,238,0.35), 0 0 36px rgba(124,58,237,0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(34,211,238,0.7), 0 0 70px rgba(124,58,237,0.45)",
          },
        },
        "text-glow": {
          "0%, 100%": { textShadow: "0 0 14px rgba(34,211,238,0.35)" },
          "50%": { textShadow: "0 0 26px rgba(34,211,238,0.75)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "led-pulse": "led-pulse 3.5s ease-in-out infinite",
        "text-glow": "text-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        scan: "scan 4s linear infinite",
      },
    },
  },
  plugins: [],
};
