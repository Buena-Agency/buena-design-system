// @buena/brand components, organized by atomic-design layer. Import the
// styles once in your app entry:
//   import '@buena/brand/styles.css';
//   import '@buena/brand/components.css';
// then use the components:
//   import { Button, Text, Surface, MenuItem, Menu, Modal } from '@buena/brand/components';
//
// Layering rule: molecules compose atoms, organisms compose molecules + atoms.
// Nothing re-creates an atom from scratch.
export * from './atoms';
export * from './molecules';
export * from './organisms';
// A11y hooks for building your own overlays/menus on-system.
export {
  useDialog,
  useEscape,
  useOutsideClick,
  useScrollLock,
  useMenuKeyboard,
  getFocusable,
} from './a11y';
