# @buena/brand

The Buena Design System — design tokens, icons, **React components**, a
Tailwind preset, and a brand-skinning layer — published as a package
consumed by multiple Buena apps.

The showcase site at this repo's Vercel deployment is the canonical
visual reference. Open it, toggle the brand picker in the top-right,
and you'll see the data-brand skinning layer live.

**Building an app on the system?** See [docs/USING-BUENA.md](docs/USING-BUENA.md)
for the install checklist and the `CLAUDE.md` rule to paste into the app.

## Install

```sh
npm install github:Buena-Agency/buena-design-system#v0.4.0
```

npm clones the repo, runs the `prepare` script to build `dist/lib`,
and exposes the package as `@buena/brand`. No `dist/` lives in git.

## Use

```ts
// 1. Import the token surface + component styles once, in your app entry.
import '@buena/brand/styles.css'; // ramps + semantic vars + spacing/radius/type
import '@buena/brand/components.css'; // component styles

// 2. Use components, tokens, and icons.
import { Button, Input, Field, Switch, Badge, Card } from '@buena/brand/components';
import { rampValue, SEMANTIC, type ThemeName } from '@buena/brand/tokens';
import { IconSettings } from '@buena/brand/icons';
```

```html
<!-- Drive theme + accent from <html>. data-theme flips the whole app;
     data-brand swaps only the accent pair. -->
<html data-theme="dark" data-brand="atho"></html>
```

## What's exported

v0.4.0 exposes:

- **`@buena/brand/components`** — React components organized by atomic-design
  layer (`src/components/atoms`, `/molecules`, `/organisms`). Molecules compose
  atoms; organisms compose molecules + atoms; nothing re-creates an atom.
  - **Atoms:** `Text`, `Link`, `Kbd`, `Code`, `Icon`, `Surface`, `Stack`,
    `Inline`, `Divider`, `VisuallyHidden`, `Card`, `Button`, `IconButton`,
    `Pill`, `Label`, `Input`, `Textarea`, `Checkbox`, `Radio`, `Switch`,
    `Badge`, `Chip`, `Tag`, `Avatar`, `StatusDot`, `Spinner`, `Skeleton`,
    `Slider`, `ProgressBar`, `ColorSwatch`.
  - **Molecules:** `Field`, `Alert`, `Banner`, `Toast`, `Tooltip`, `Tabs`/`Tab`,
    `Breadcrumb`, `Pagination`, `SegmentedControl`, `MenuItem`, `ListItem`,
    `ButtonGroup`, `AvatarGroup`, `SearchInput`, `Stat`, `Select`, `Stepper`,
    `DateField`, `ColorPicker`, `FileDropzone`, `InlineEdit`, `Rating`,
    `StatComparison`, `ProgressSteps`, `Accordion`, `DataTableRow`,
    `NotificationItem`, `MediaControls`, `CodeBlock`, `NavItem`, `Toolbar`,
    `TabsBar`, `TreeItem`.
  - **Organisms:** `Menu` (+ `MenuDivider`, `MenuLabel`), `Modal`, `EmptyState`,
    `Combobox`, `Multiselect`, `DataTable`, `Sidebar` (+ `SidebarSection`),
    `TopAppBar`, `Tray`, `BottomSheet`, `CommandPalette`, `SnackbarQueue`,
    `NotificationList`, `Carousel`, `Calendar`, `TreeView`.

  `Text` keys to the type scale (`variant="title1"`), `Icon` standardizes
  size/color over the SVG set, and every component resolves to the CSS
  variables — so they flip with `data-theme` and re-skin with `data-brand`.
- **`@buena/brand/styles.css`** — the full token surface as CSS variables:
  ramp primitives (`--color-green-700`), semantic tokens that flip per
  `data-theme` (`--color-bg-med`, `--color-text-primary`, …), spacing
  (`--space-lg`), radius (`--radius-lg`), and the Satoshi type scale
  (`--text-body`), plus the `--color-accent` pair per `data-brand`.
- **`@buena/brand/components.css`** — the component styles. Import after
  `styles.css`.
- **`@buena/brand/tokens`** — the same values as JS constants: `RAMPS`,
  `RAMP_STEPS`, `RADIUS`, `SEMANTIC`, `SPACING`, `TYPE_SCALE`, `rampValue`,
  `type RampFamily`, `type RampStep`, `type ThemeName`.
- **`@buena/brand/icons`** — ~70 inline SVG icon components.
- **`@buena/brand/tailwind`** — a Tailwind preset generated from the tokens.
  `import buena from '@buena/brand/tailwind'; export default { presets: [buena] }`
  gives you `bg-bg-med`, `text-text-primary`, `rounded-lg`, `text-callout`,
  `bg-accent`, etc.
- **`@buena/brand/stylelint`** — a shareable stylelint config that blocks raw
  hex / named colors in app CSS, so off-token values fail lint.
- **`@buena/brand`** — re-export of tokens + icons + components for convenience.

## Consumed by

| App  | Path                                 | Version pin |
| ---- | ------------------------------------ | ----------- |
| Atho | `/Users/beebby/Projects/atho-mapper` | (pending)   |

## Develop

```sh
npm install                   # also runs the lib build via `prepare`
npm run dev                   # showcase SPA at http://localhost:5173
npm run build                 # showcase build → dist/
npm run build:lib             # library build → dist/lib/
npm run typecheck             # tsc -b
```

The showcase site (`src/showcase/`) is the brand-system reference, not part
of the library — it's deployed to Vercel for visual review and never reaches
consumer apps.

The library build emits five ESM entries (`index`, `tokens`, `icons`,
`components`, `tailwind`) + their `.d.ts`, plus `brand.css` and
`components.css`, into `dist/lib/`. The `prepare` script chains the vite and
tsc passes so consumer-side `npm install` produces the dist automatically.
