# Building an app on the Buena Design System

This is the contract for any app that should "use the Buena Design System."
Copy the **rule block** below into the app's `CLAUDE.md` (or `.cursor/rules`)
so the agent reaches for the system by default, then follow the checklist.

## Install

```sh
npm install github:Buena-Agency/buena-design-system#v0.6.0
```

## New-app checklist

1. **Import the styles once**, in the app entry (e.g. `app/layout.tsx`, `main.tsx`):
   ```ts
   import '@buena/brand/styles.css';      // tokens: ramps + semantic vars + spacing/radius/type
   import '@buena/brand/components.css';   // component styles
   ```
2. **Set the theme + brand** on `<html>`:
   ```html
   <html data-theme="dark" data-brand="atho">
   ```
   Flip `data-theme` between `dark` / `light` to theme the whole app. `data-brand`
   swaps only the accent pair (`--color-accent`, `--color-accent-deep`).
3. **Load Satoshi** (the brand typeface). Until it's hosted, the stack falls back
   to Inter → system-ui.
4. **(Tailwind apps)** extend the preset so utilities map to tokens:
   ```ts
   import buena from '@buena/brand/tailwind';
   export default { presets: [buena], content: ['./**/*.{ts,tsx}'] };
   ```
   Now `bg-bg-med`, `text-text-primary`, `rounded-lg`, `text-callout`, `bg-accent`, etc. are on-system.
5. **(Lint)** extend the stylelint config to block off-token color:
   ```json
   { "extends": ["@buena/brand/stylelint"] }
   ```
6. **Use the components + tokens** — never hand-roll buttons/inputs or hardcode values.
   ```tsx
   import { Button, Input, Field, Switch, Badge } from '@buena/brand/components';
   import { rampValue, SEMANTIC } from '@buena/brand/tokens';
   import { IconSearch } from '@buena/brand/icons';
   ```

## The rule (paste into the app's CLAUDE.md)

```md
## Buena Design System (REQUIRED for all UI)

This app's UI is built on `@buena/brand`. Non-negotiable:

- **Components** come from `@buena/brand/components`, organized atoms →
  molecules → organisms. Do not hand-roll an element the system already
  provides, and **never re-create an atom** — compose the existing one.
  - Atoms: Text, Link, Kbd, Code, Icon, Surface, Stack, Inline, Divider,
    VisuallyHidden, Card, Button, IconButton, Pill, Label, Input, Textarea,
    Checkbox, Radio, Switch, Badge, Chip, Tag, Avatar, StatusDot, Spinner, Skeleton.
  - Molecules: Field, Alert, Banner, Toast, Tooltip, Tabs/Tab, Breadcrumb,
    Pagination, SegmentedControl, MenuItem, ListItem, ButtonGroup, AvatarGroup,
    SearchInput, Stat.
  - Organisms: Menu/MenuItem/MenuDivider/MenuLabel, Modal, EmptyState.
- **All text uses the `Text` atom** (`<Text variant="title1">`) — never a raw
  `font-size`. **All icons use the `Icon` atom** over `@buena/brand/icons`.
- **Colors, spacing, radius, type** come from tokens — use the CSS variables
  (`var(--color-bg-med)`, `var(--space-lg)`, `var(--radius-lg)`, `var(--text-body)`),
  the Tailwind preset utilities, or `@buena/brand/tokens`. **Never write a raw
  hex, rgb, or arbitrary px spacing value in app code.**
- **Icons** come from `@buena/brand/icons`. Don't paste new SVGs inline.
- **Theme** is driven by `data-theme` on `<html>` — components already flip; just
  reference the semantic tokens, never a literal light/dark color.
- If a needed component or token genuinely doesn't exist, **add it to
  `@buena/brand` and bump the version** — do not add a one-off to this app.
```

## Why this works

Components and tokens both resolve to the same CSS variables, so a single
`data-theme` flips the entire app, `data-brand` re-skins the accent, and a token
change in the package (new version) propagates to every consuming app on the next
bump. The stylelint rule + the CLAUDE.md rule make "on-system" the path of least
resistance instead of a thing you have to remember.
