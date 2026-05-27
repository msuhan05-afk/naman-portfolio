/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bone:    "rgb(var(--bone)    / <alpha-value>)",
        graphite:"rgb(var(--graphite)/ <alpha-value>)",
        ink:     "rgb(var(--ink)     / <alpha-value>)",
        olive:   "rgb(var(--olive)   / <alpha-value>)",
        dust:    "rgb(var(--dust)    / <alpha-value>)",
        amber:   "rgb(var(--amber)   / <alpha-value>)",
        pink:    "rgb(var(--pink)    / <alpha-value>)",
        cyan:    "rgb(var(--cyan)    / <alpha-value>)",
        neon:    "rgb(var(--neon)    / <alpha-value>)",
      },
      fontFamily: {
        /* Museo (via MuseoModerno on Google Fonts) for display headings */
        display: ['"MuseoModerno"', "system-ui", "sans-serif"],
        /* SF Pro system stack for body */
        sans:    ["-apple-system", "BlinkMacSystemFont", '"SF Pro Text"', '"MuseoModerno"', "system-ui", "sans-serif"],
        serif:   ['"Instrument Serif"', "Georgia", "serif"],
        mono:    ['"SF Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: { tightest: "-0.04em" },
      transitionTimingFunction: { cinema: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};
