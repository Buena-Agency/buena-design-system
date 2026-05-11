import type { Config } from 'tailwindcss';

// Palette tokens are sourced from CSS variables defined in
// `src/styles/showcase.css` so the showcase can flip theme/brand at
// runtime via `[data-theme]` and `[data-brand]` on <html>. Each color
// uses the `rgb(var(...) / <alpha-value>)` pattern so Tailwind's
// opacity modifiers (e.g. `bg-bg-app/80`) keep working.
const themed = (token: string) => `rgb(var(${token}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: themed('--color-ink'),
        bg: {
          app: themed('--color-bg-app'),
          panel: themed('--color-bg-panel'),
          elevated: themed('--color-bg-elevated'),
        },
        stroke: themed('--color-stroke'),
        muted: themed('--color-muted'),
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
