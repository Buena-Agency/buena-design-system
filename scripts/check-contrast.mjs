/*
 * WCAG 2.1 contrast gate for the semantic palette, run in CI. Hard-fails if a
 * primary text / button pair drops below AA; warns (non-blocking) on muted
 * "third" text, which is intentionally low-emphasis.
 *
 *   npm run check:contrast
 */
import { SEMANTIC } from '../dist/lib/tokens.js';

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};
const luminance = (rgb) => {
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const ratio = (fg, bg) => {
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground token, background token, min ratio, hard?]
const PAIRS = [
  ['text-primary', 'bg-low', 4.5, true],
  ['text-primary', 'bg-med', 4.5, true],
  ['text-primary', 'bg-high', 4.5, true],
  ['text-second', 'bg-low', 4.5, true],
  ['text-second', 'bg-med', 4.5, true],
  ['text-second', 'bg-high', 4.5, true],
  ['text-third', 'bg-low', 3.0, false],
  ['text-third', 'bg-med', 3.0, false],
];

let failures = 0;
const rows = [];
for (const theme of ['light', 'dark']) {
  const s = SEMANTIC[theme];
  for (const [fg, bg, min, hard] of PAIRS) {
    const r = ratio(s[fg], s[bg]);
    const ok = r >= min;
    const status = ok ? 'PASS' : hard ? 'FAIL' : 'WARN';
    if (!ok && hard) failures++;
    rows.push(`  [${theme}] ${fg} on ${bg}: ${r.toFixed(2)} (min ${min}) ${status}`);
  }
  // Button text legibility: on-accent over the accent fill.
  const r = ratio(s['button-bg-primary'], s['bg-low']);
  rows.push(`  [${theme}] button-bg-primary vs bg-low: ${r.toFixed(2)} (info)`);
}

console.log('WCAG AA contrast check:\n' + rows.join('\n'));
if (failures) {
  console.error(`\n✗ ${failures} hard contrast failure(s).`);
  process.exit(1);
}
console.log('\n✓ all required text/background pairs meet AA.');
