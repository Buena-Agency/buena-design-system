/*
 * Tailwind preset for @buena/brand. Add to your tailwind.config:
 *
 *   import buena from '@buena/brand/tailwind';
 *   export default { presets: [buena], content: [...] };
 *
 * Ramp colors are concrete hex (constant across themes). Semantic colors
 * (bg, text, border, …) and the accent map to CSS variables, so utilities
 * like `bg-bg-med` / `text-text-primary` flip with `data-theme` and re-skin
 * with `data-brand` at runtime.
 */
import { RAMPS, RAMP_STEPS, SPACING, RADIUS, TYPE_SCALE, rampValue } from '../tokens';
import type { RampFamily } from '../tokens';

const rampColors: Record<string, Record<string, string>> = {};
for (const family of Object.keys(RAMPS) as RampFamily[]) {
  const scale: Record<string, string> = {};
  for (const step of RAMP_STEPS) scale[String(step)] = rampValue(family, step);
  rampColors[family] = scale;
}

const v = (token: string) => `var(--color-${token})`;

const spacing: Record<string, string> = {};
for (const [k, px] of Object.entries(SPACING)) spacing[k] = `${px}px`;

const borderRadius: Record<string, string> = {};
for (const [k, px] of Object.entries(RADIUS)) borderRadius[k] = px === 9999 ? '9999px' : `${px}px`;

const fontSize: Record<string, [string, { lineHeight: string; letterSpacing: string }]> = {};
for (const [k, t] of Object.entries(TYPE_SCALE)) {
  fontSize[k] = [`${t.size}px`, { lineHeight: `${t.leading}px`, letterSpacing: `${t.letter}px` }];
}

export const preset = {
  theme: {
    extend: {
      colors: {
        ...rampColors,
        accent: 'var(--color-accent)',
        'accent-deep': 'var(--color-accent-deep)',
        'on-accent': v('on-accent'),
        bg: { low: v('bg-low'), med: v('bg-med'), high: v('bg-high') },
        text: { primary: v('text-primary'), second: v('text-second'), third: v('text-third') },
        border: { primary: v('border-primary'), second: v('border-second'), third: v('border-third') },
        success: v('success'),
        warning: v('warning'),
        error: v('error'),
        info: v('info'),
      },
      spacing,
      borderRadius,
      fontFamily: { sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'] },
      fontSize,
    },
  },
};

export default preset;
