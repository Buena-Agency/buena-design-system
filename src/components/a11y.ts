import { useEffect } from 'react';
import type { RefObject } from 'react';

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Visible, focusable descendants of `root`, in DOM order. */
export function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

/** Lock body scroll while `active`. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/** Call `handler` on Escape while `active`. */
export function useEscape(active: boolean, handler: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handler();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, handler]);
}

/** Call `handler` on a pointer-down outside `ref` while `active`. */
export function useOutsideClick(ref: RefObject<HTMLElement>, active: boolean, handler: () => void) {
  useEffect(() => {
    if (!active) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [ref, active, handler]);
}

/**
 * Full modal-dialog a11y for an overlay rooted at `ref`: traps Tab focus
 * inside it, moves focus in on open, restores focus to the trigger on close,
 * locks body scroll, and closes on Escape. Call it unconditionally (before any
 * early return) so the hook order stays stable.
 */
export function useDialog(ref: RefObject<HTMLElement>, open: boolean, onClose?: () => void) {
  useScrollLock(open);
  useEscape(open && !!onClose, () => onClose?.());
  useEffect(() => {
    if (!open || !ref.current) return;
    const root = ref.current;
    const restore = document.activeElement as HTMLElement | null;
    const initial = getFocusable(root);
    (initial[0] ?? root).focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = getFocusable(root);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    root.addEventListener('keydown', onKey);
    return () => {
      root.removeEventListener('keydown', onKey);
      restore?.focus?.();
    };
  }, [open, ref]);
}

/**
 * Roving arrow-key navigation among the focusable rows inside `ref`
 * (menus, listboxes, command palettes). ArrowUp/Down wrap; Home/End jump.
 */
export function useMenuKeyboard(ref: RefObject<HTMLElement>, active = true) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const onKey = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
      const items = getFocusable(root);
      if (!items.length) return;
      const idx = items.indexOf(document.activeElement as HTMLElement);
      e.preventDefault();
      let next = idx;
      if (e.key === 'ArrowDown') next = idx < 0 ? 0 : (idx + 1) % items.length;
      else if (e.key === 'ArrowUp') next = idx <= 0 ? items.length - 1 : idx - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = items.length - 1;
      items[next]?.focus();
    };
    root.addEventListener('keydown', onKey);
    return () => root.removeEventListener('keydown', onKey);
  }, [active, ref]);
}
