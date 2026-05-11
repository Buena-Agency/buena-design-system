/**
 * Atho design system tokens.
 *
 * Hand tuned hex ramps + a generic semantic vocabulary that maps onto
 * them per theme. All values are explicit so the brand doesn't drift
 * away from the colors the user has personally signed off on.
 *
 *   - Neutral 100 is full white; 200 is a warm off white; 900 is the
 *     near black page background. Variation between 600 and 900 is
 *     deliberately subtle so dark surfaces don't feel jumpy.
 *   - Each accent is anchored on its 700 step with the exact hex the
 *     app already uses; 800 and 900 push saturation rather than just
 *     darkening, so the deeper steps still read as the family color.
 */

// ── Type scale (Apple HIG inspired) ────────────────────────────

export interface TypeStyle {
  size: number;
  leading: number;
  weight: 400 | 500 | 600 | 700;
  letter: number;
}

// Weights bumped down one step on the heavier scales so titles
// don't read as boldface — large title / titles / callout each
// drop one degree (semibold → medium, medium → regular).
export const TYPE_SCALE: Record<string, TypeStyle> = {
  largeTitle: { size: 34, leading: 40, weight: 500, letter: -0.4 },
  title1: { size: 28, leading: 32, weight: 500, letter: -0.3 },
  title2: { size: 22, leading: 28, weight: 500, letter: -0.2 },
  title3: { size: 20, leading: 24, weight: 500, letter: -0.1 },
  callout: { size: 17, leading: 22, weight: 400, letter: 0 },
  body: { size: 15, leading: 20, weight: 400, letter: 0 },
  bodySmall: { size: 13, leading: 18, weight: 400, letter: 0 },
  caption: { size: 12, leading: 16, weight: 500, letter: 0.1 },
  footnote: { size: 11, leading: 14, weight: 500, letter: 0.2 },
};

// ── Spacing + Radii ────────────────────────────────────────────

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const RADIUS = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
} as const;

// ── Color ramps ─────────────────────────────────────────────────

export const RAMP_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type RampStep = (typeof RAMP_STEPS)[number];

export interface RampSpec {
  /** Display name. */
  name: string;
  /**
   * 9 hex values in order from 100 (lightest) to 900 (deepest).
   * Hand tuned. The 700 step is the canonical brand anchor and is
   * never algorithmically derived; later steps push saturation
   * rather than just darkening.
   */
  values: readonly [
    string, string, string,
    string, string, string,
    string, string, string,
  ];
}

/**
 * Neutral. 100 is full white, 200 is the warm off white the user
 * approved, 600 to 900 vary subtly so dark surfaces don't feel like
 * separate themes layered together.
 */
const NEUTRAL: RampSpec = {
  name: 'Neutral',
  values: [
    '#FFFFFF', // 100
    '#F7F5EE', // 200  warm off white
    '#ECE8DC', // 300  unchanged anchor
    '#B5B0A1', // 400  re-tuned 2026-05-09 — bridges 300 → 600 more evenly
    '#62635F', // 500  re-tuned 2026-05-09 — pulls toward 600's cool tone
    '#2A2D34', // 600  unchanged anchor
    '#1C2027', // 700  close to current --color-bg-elevated
    '#15181C', // 800  close to current --color-bg-panel
    '#0F1115', // 900  page background
  ],
};

// 800 and 900 push saturation past 700 instead of just darkening,
// per design feedback. Each anchor 700 stays exact; subsequent
// steps are deeper, richer versions of the brand color.

const GREEN: RampSpec = {
  name: 'Green',
  values: [
    '#F4F7E5',
    '#E6EFC2',
    '#D4E69D',
    '#C3DC7C',
    '#B3CD66',
    '#ADC55F',
    '#A7BE5A', // 700
    '#95B83C', // 800  more saturated, slightly darker
    '#80AC1A', // 900  most saturated
  ],
};

const YELLOW: RampSpec = {
  name: 'Yellow',
  values: [
    '#FAE299', // 100
    '#FBE587',
    '#FCE574',
    '#FDE25E',
    '#FEDD49',
    '#FFD93B',
    '#FFDA35', // 700
    '#F0C00A', // 800
    '#D9A000', // 900
  ],
};

const ORANGE: RampSpec = {
  name: 'Orange',
  values: [
    '#FBE6D8',
    '#F8D2B6',
    '#F4BE94',
    '#F0AA73',
    '#EE9D60',
    '#ED9658',
    '#ED9356', // 700
    '#E27530', // 800
    '#D45810', // 900
  ],
};

const RED: RampSpec = {
  name: 'Red',
  values: [
    '#FAE0DD',
    '#F4C0BB',
    '#EE9F99',
    '#E87D77',
    '#E26861',
    '#DF5F55',
    '#DE594F', // 700
    '#D43A2E', // 800
    '#C61708', // 900
  ],
};

const BLUE: RampSpec = {
  name: 'Blue',
  values: [
    '#DDE9F0',
    '#BBD2E0',
    '#99BBD0',
    '#7DA8C0',
    '#6E9BB6',
    '#6796B2',
    '#6493B0', // 700
    '#3D7CA1', // 800
    '#1A6390', // 900
  ],
};

const PURPLE: RampSpec = {
  name: 'Purple',
  values: [
    '#F8E1EE',
    '#EDC1DA',
    '#E2A2C6',
    '#DA82B5',
    '#D76CAA',
    '#D762A6',
    '#D75BA1', // 700
    '#C43387', // 800
    '#A8156D', // 900
  ],
};

export const RAMPS = {
  neutral: NEUTRAL,
  green: GREEN,
  yellow: YELLOW,
  orange: ORANGE,
  red: RED,
  blue: BLUE,
  purple: PURPLE,
} as const;

export type RampFamily = keyof typeof RAMPS;

/** Hex value for a single ramp step. */
export function rampValue(family: RampFamily, step: RampStep): string {
  const idx = RAMP_STEPS.indexOf(step);
  return RAMPS[family].values[idx];
}

// ── Semantic tokens ────────────────────────────────────────────

export type ThemeName = 'light' | 'dark';

export interface SemanticMap {
  'bg-low': string;
  'bg-med': string;
  'bg-high': string;
  'text-primary': string;
  'text-second': string;
  'text-third': string;
  'border-primary': string;
  'border-second': string;
  'border-third': string;
  'button-bg-primary': string;
  'button-bg-second': string;
  'button-bg-third': string;
  icon: string;
  'focus-ring': string;
  overlay: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export const SEMANTIC: Record<ThemeName, SemanticMap> = {
  light: {
    'bg-low': rampValue('neutral', 100),
    'bg-med': rampValue('neutral', 200),
    'bg-high': rampValue('neutral', 300),
    'text-primary': rampValue('neutral', 900),
    'text-second': rampValue('neutral', 700),
    'text-third': rampValue('neutral', 500),
    'border-primary': rampValue('neutral', 900),
    // Border-second / -third unified across themes onto the new
    // 400 / 500 anchors — single source of truth that ties the
    // border vocabulary to the ramp.
    'border-second': rampValue('neutral', 400),
    'border-third': rampValue('neutral', 500),
    'button-bg-primary': rampValue('neutral', 900),
    'button-bg-second': rampValue('neutral', 200),
    'button-bg-third': 'transparent',
    icon: rampValue('neutral', 700),
    'focus-ring': rampValue('neutral', 900),
    overlay: 'rgba(15, 17, 21, 0.45)',
    success: rampValue('green', 700),
    warning: rampValue('yellow', 400),
    error: rampValue('red', 700),
    info: rampValue('blue', 700),
  },
  dark: {
    'bg-low': rampValue('neutral', 900),
    'bg-med': rampValue('neutral', 800),
    'bg-high': rampValue('neutral', 700),
    'text-primary': rampValue('neutral', 100),
    'text-second': rampValue('neutral', 300),
    'text-third': rampValue('neutral', 500),
    'border-primary': rampValue('neutral', 100),
    // Unified with light theme on 400/500 — see comment above.
    'border-second': rampValue('neutral', 400),
    'border-third': rampValue('neutral', 500),
    'button-bg-primary': rampValue('neutral', 100),
    'button-bg-second': rampValue('neutral', 800),
    'button-bg-third': 'transparent',
    icon: rampValue('neutral', 300),
    'focus-ring': rampValue('neutral', 100),
    overlay: 'rgba(0, 0, 0, 0.6)',
    success: rampValue('green', 700),
    warning: rampValue('yellow', 400),
    error: rampValue('red', 700),
    info: rampValue('blue', 700),
  },
};
