# @buena/brand

The Buena Brand System — design tokens, icons, and a brand-skinning
layer — published as a private package consumed by multiple Buena
apps.

The showcase site at this repo's Vercel deployment is the canonical
visual reference. Open it, toggle the brand picker in the top-right,
and you'll see the data-brand skinning layer live.

## Install

```sh
npm install github:dougburnett/buena-design-system#v0.1.0
```

npm clones the repo, runs the `prepare` script to build `dist/lib`,
and exposes the package as `@buena/brand`. No `dist/` lives in git.

## Use

```ts
import { rampValue, SEMANTIC, type ThemeName } from '@buena/brand';
import { IconSettings } from '@buena/brand/icons';
import { rampValue as ramp } from '@buena/brand/tokens';
```

```ts
// In your app's entry (e.g. main.tsx), import the brand skin CSS once.
// It defines --color-accent and --color-accent-deep, scoped to
// data-brand="<app>" on <html>.
import '@buena/brand/styles.css';
```

```html
<!-- In index.html, pick which app's accent skin to apply. -->
<html data-brand="atho">
```

## What's exported

v0.1.0 exposes:

- **`@buena/brand/tokens`** — JS constants: `RAMPS`, `RAMP_STEPS`,
  `RADIUS`, `SEMANTIC`, `SPACING`, `TYPE_SCALE`, `rampValue`,
  `type RampFamily`, `type RampStep`, `type ThemeName`. The full
  token surface is here as values; only the accent pair is also
  exposed via CSS variables (see below).
- **`@buena/brand/icons`** — ~70 inline SVG icon components
  (`IconSettings`, `IconAlert`, `IconCheck`, …).
- **`@buena/brand/styles.css`** — A CSS file that defines
  `--color-accent` and `--color-accent-deep`, scoped to
  `data-brand=` selectors on `<html>`. Defaults match the Atho
  skin.
- **`@buena/brand`** — Re-export of tokens + icons for convenience.

As consuming apps need to override more of the token surface,
promote individual tokens into `src/styles/brand.css` and bump.

## Consumed by

| App  | Path                                          | Version pin |
| ---- | --------------------------------------------- | ----------- |
| Atho | `/Users/beebby/Projects/atho-mapper`          | (pending)   |

## Develop

```sh
npm install                   # also runs the lib build via `prepare`
npm run dev                   # showcase SPA at http://localhost:5173
npm run build                 # showcase build → dist/
npm run build:lib             # library build → dist/lib/
npm run typecheck             # tsc --noEmit
```

The showcase site (`src/showcase/`) is the brand-system reference,
not part of the library — it's deployed to Vercel for visual review
and never reaches consumer apps.

The library build (`vite build --config vite.lib.config.ts && tsc -p
tsconfig.lib.json`) emits three ESM entries + their `.d.ts` plus a
copy of `brand.css` into `dist/lib/`. The `prepare` script chains
those two commands so consumer-side `npm install` produces the dist
automatically.
