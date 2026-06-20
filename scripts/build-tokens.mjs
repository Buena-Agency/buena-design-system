/*
 * Generate the canonical W3C DTCG token file (tokens/buena.tokens.json) from
 * the single token source of truth (src/tokens, via the built dist/lib). This
 * is the interchange format Style Dictionary consumes to emit CSS + native
 * outputs — see scripts/build-platforms.mjs.
 *
 *   npm run build:tokens
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  RAMPS,
  RAMP_STEPS,
  SPACING,
  RADIUS,
  TYPE_SCALE,
  MOTION,
  SEMANTIC,
  rampValue,
} from '../dist/lib/tokens.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

// Reverse-map each ramp hex back to a {color.family.step} alias so semantic
// tokens reference the primitives instead of duplicating hex.
const hexToAlias = new Map();
for (const family of Object.keys(RAMPS)) {
  for (const step of RAMP_STEPS) {
    hexToAlias.set(rampValue(family, step).toUpperCase(), `{color.${family}.${step}}`);
  }
}

const beziers = (fn) => {
  const m = /cubic-bezier\(([^)]+)\)/.exec(fn);
  return m ? m[1].split(',').map((n) => Number(n.trim())) : fn;
};

const dtcg = {
  $description: 'Buena Design System tokens (W3C DTCG). Generated — edit src/tokens.',
  color: {},
  space: {},
  radius: {},
  type: {},
  motion: { duration: {}, easing: {} },
  semantic: { light: {}, dark: {} },
};

for (const family of Object.keys(RAMPS)) {
  dtcg.color[family] = {};
  for (const step of RAMP_STEPS) {
    dtcg.color[family][step] = { $type: 'color', $value: rampValue(family, step) };
  }
}
for (const [k, px] of Object.entries(SPACING)) {
  dtcg.space[k] = { $type: 'dimension', $value: `${px}px` };
}
for (const [k, px] of Object.entries(RADIUS)) {
  dtcg.radius[k] = { $type: 'dimension', $value: px === 9999 ? '9999px' : `${px}px` };
}
for (const [k, t] of Object.entries(TYPE_SCALE)) {
  dtcg.type[k] = {
    $type: 'typography',
    $value: {
      fontFamily: 'Satoshi',
      fontWeight: t.weight,
      fontSize: `${t.size}px`,
      lineHeight: `${t.leading}px`,
      letterSpacing: `${t.letter}px`,
    },
  };
}
for (const [k, ms] of Object.entries(MOTION.duration)) {
  dtcg.motion.duration[k] = { $type: 'duration', $value: `${ms}ms` };
}
for (const [k, fn] of Object.entries(MOTION.easing)) {
  dtcg.motion.easing[k] = { $type: 'cubicBezier', $value: beziers(fn) };
}
for (const theme of ['light', 'dark']) {
  for (const [k, val] of Object.entries(SEMANTIC[theme])) {
    const alias = typeof val === 'string' ? hexToAlias.get(val.toUpperCase()) : null;
    dtcg.semantic[theme][k] = { $type: 'color', $value: alias || val };
  }
}

mkdirSync(resolve(root, 'tokens'), { recursive: true });
const out = resolve(root, 'tokens/buena.tokens.json');
writeFileSync(out, JSON.stringify(dtcg, null, 2) + '\n');
console.log('✓ wrote tokens/buena.tokens.json');
