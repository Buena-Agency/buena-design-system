// Minimal inline icon set for Phase 1 header.

interface IconProps {
  className?: string;
  /** Pass-through style — used by the brand system to size icons
   *  with explicit pixel widths/heights, and by callers that need
   *  inline color overrides. */
  style?: React.CSSProperties;
}

export function IconSettings({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function IconExport({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function IconChevronLeft({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} style={style}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function IconPlus({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} style={style}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconTrash({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export function IconCopy({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function IconMenu({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function IconUndo({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} style={style}>
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h11a5 5 0 0 1 0 10H9" />
    </svg>
  );
}

export function IconRedo({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} style={style}>
      <path d="m15 14 5-5-5-5" />
      <path d="M20 9H9a5 5 0 0 0 0 10h6" />
    </svg>
  );
}

export function IconShare({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98" />
      <path d="m15.41 6.51-6.82 3.98" />
    </svg>
  );
}

export function IconChevronRight({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconFilter({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 5h18l-7 9v6l-4-2v-4z" />
    </svg>
  );
}

export function IconLink({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19" />
    </svg>
  );
}

/* ── Added 2026-05-08 ── */

/**
 * Magnifying-glass search icon. Drawn at 24×24 on a 1.75 stroke so
 * the visible glyph reads close to the cap height of body / callout
 * text when sized at 18–20px.
 */
export function IconSearch({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

/** Eye-open glyph for password visibility toggle (revealed). */
export function IconEyeOpen({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Eye-closed glyph for password visibility toggle (hidden). */
export function IconEyeClosed({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 4 21 20" />
      <path d="M10.6 6.6A11.5 11.5 0 0 1 12 5.5C18.5 5.5 22 12 22 12s-1.1 2-3.2 3.8" />
      <path d="M6.2 8.2C3.6 9.9 2 12 2 12s3.5 6.5 10 6.5c1.7 0 3.2-.4 4.4-1" />
      <path d="M9.5 9.5a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

/** Sun glyph (light mode). */
export function IconSun({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.93 19.07 1.41-1.41" />
      <path d="m17.66 6.34 1.41-1.41" />
    </svg>
  );
}

/** Crescent moon glyph (dark mode). */
export function IconMoon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M21 12.8A9 9 0 0 1 11.2 3a7 7 0 1 0 9.8 9.8Z" />
    </svg>
  );
}

/** Info / tooltip glyph. Round. */
export function IconInfo({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

/**
 * Duplicate icon (two-page stack). Visually distinct from
 * IconCopy (which is the conventional clipboard glyph).
 */
export function IconDuplicate({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </svg>
  );
}

/**
 * Six-dot drag handle (two columns of three dots). Used as the
 * affordance on sortable rows.
 */
export function IconDragHandle({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <circle cx="9" cy="6" r="1.4" />
      <circle cx="15" cy="6" r="1.4" />
      <circle cx="9" cy="12" r="1.4" />
      <circle cx="15" cy="12" r="1.4" />
      <circle cx="9" cy="18" r="1.4" />
      <circle cx="15" cy="18" r="1.4" />
    </svg>
  );
}

/* ── Added 2026-05-09 ── */

/**
 * Shared SVG attrs across the rest of the icon set so every icon
 * picks up the same stroke weight, line caps and join rules.
 * `1.75` matches the existing additions (search / eye / sun etc.).
 */
const ICON_SVG_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

// ── Directional arrows ────────────────────────────────────────

export function IconArrowUp({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M12 5v14" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

export function IconArrowDown({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function IconArrowLeft({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M5 12h14" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function IconArrowRight({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/* Diagonal arrows — bolder stroke, square line caps, head proportional
 * to the shaft (like a thick airplane-corner glyph). The shaft runs
 * from corner to corner; the two head segments sit symmetrically
 * tucked into the destination corner. */
const DIAGONAL_SVG_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Arrow pointing top-left (north-west). */
export function IconArrowDiagonalUpLeft({ className, style }: IconProps) {
  return (
    <svg {...DIAGONAL_SVG_PROPS} className={className} style={style}>
      <path d="M19 19 5 5" />
      <path d="M5 13V5h8" />
    </svg>
  );
}

/** Arrow pointing top-right (north-east). */
export function IconArrowDiagonalUpRight({ className, style }: IconProps) {
  return (
    <svg {...DIAGONAL_SVG_PROPS} className={className} style={style}>
      <path d="M5 19 19 5" />
      <path d="M11 5h8v8" />
    </svg>
  );
}

/** Arrow pointing bottom-left (south-west). */
export function IconArrowDiagonalDownLeft({ className, style }: IconProps) {
  return (
    <svg {...DIAGONAL_SVG_PROPS} className={className} style={style}>
      <path d="M19 5 5 19" />
      <path d="M5 11v8h8" />
    </svg>
  );
}

/** Arrow pointing bottom-right (south-east). */
export function IconArrowDiagonalDownRight({ className, style }: IconProps) {
  return (
    <svg {...DIAGONAL_SVG_PROPS} className={className} style={style}>
      <path d="m5 5 14 14" />
      <path d="M11 19h8v-8" />
    </svg>
  );
}

export function IconChevronUp({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

export function IconChevronDown({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ── System / actions ──────────────────────────────────────────

export function IconCheck({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  );
}

export function IconClose({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M6 6 18 18" />
      <path d="M6 18 18 6" />
    </svg>
  );
}

export function IconMinus({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconEdit({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M14.5 4.5 19.5 9.5 8 21H3v-5z" />
      <path d="m13 6 5 5" />
    </svg>
  );
}

export function IconSave({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M7 3v6h9V3" />
      <path d="M7 14h10v7H7z" />
    </svg>
  );
}

export function IconUpload({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M12 4v12" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function IconDownload({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M12 4v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function IconRefresh({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M21 12a9 9 0 0 1-15.4 6.36" />
      <path d="M3 12a9 9 0 0 1 15.4-6.36" />
      <path d="m18 2 .5 4-4 .5" />
      <path d="m6 22-.5-4 4-.5" />
    </svg>
  );
}

export function IconLock({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function IconUnlock({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7-2.6" />
    </svg>
  );
}

// ── Calendar / time ───────────────────────────────────────────

export function IconCalendar({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

export function IconClock({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconStopwatch({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13V9" />
      <path d="M9 3h6" />
      <path d="m18 7 2-2" />
    </svg>
  );
}

// ── People / org ──────────────────────────────────────────────

export function IconUser({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function IconUsers({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.8" />
      <path d="M15 14.2a5 5 0 0 1 6.5 4.8" />
    </svg>
  );
}

// ── Communication ─────────────────────────────────────────────

export function IconBell({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M6 17V11a6 6 0 1 1 12 0v6" />
      <path d="M4 17h16" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function IconMail({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconChat({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M4 5h16v11H8l-4 4z" />
    </svg>
  );
}

// ── Status / feedback ─────────────────────────────────────────

export function IconStar({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="m12 4 2.6 5.3 5.9.9-4.3 4.1 1 5.7L12 17.3l-5.2 2.7 1-5.7L3.5 10.2l5.9-.9z" />
    </svg>
  );
}

export function IconHeart({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 5.5-7 10-7 10z" />
    </svg>
  );
}

export function IconBookmark({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  );
}

export function IconFlag({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

export function IconAlert({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M12 4 2 21h20z" />
      <path d="M12 10v5" />
      <path d="M12 18h.01" />
    </svg>
  );
}

export function IconCheckCircle({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </svg>
  );
}

// ── Documents / data ──────────────────────────────────────────

export function IconFile({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}

export function IconFolder({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

export function IconImage({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="10" r="1.5" />
      <path d="m4 19 6-7 5 6 3-3 4 4" />
    </svg>
  );
}

export function IconPin({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

// ── Media controls ────────────────────────────────────────────

export function IconPlay({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M7 5v14l12-7z" />
    </svg>
  );
}

export function IconPause({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M8 5v14" />
      <path d="M16 5v14" />
    </svg>
  );
}

// ── Layout / view ─────────────────────────────────────────────

export function IconList({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M9 6h12" />
      <path d="M9 12h12" />
      <path d="M9 18h12" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </svg>
  );
}

export function IconGrid({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  );
}

export function IconColumns({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="3" y="3" width="6" height="18" rx="1.5" />
      <rect x="11" y="3" width="6" height="18" rx="1.5" />
      <rect x="19" y="3" width="2" height="18" rx="1" />
    </svg>
  );
}

export function IconRows({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <rect x="3" y="3" width="18" height="6" rx="1.5" />
      <rect x="3" y="11" width="18" height="6" rx="1.5" />
      <rect x="3" y="19" width="18" height="2" rx="1" />
    </svg>
  );
}

export function IconExpand({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M4 10V4h6" />
      <path d="m4 4 7 7" />
      <path d="M20 14v6h-6" />
      <path d="m20 20-7-7" />
    </svg>
  );
}

export function IconCollapse({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M10 4v6H4" />
      <path d="m11 11-7-7" />
      <path d="M14 20v-6h6" />
      <path d="m13 13 7 7" />
    </svg>
  );
}

// ── Activity / Atho-flavor ────────────────────────────────────

export function IconRunner({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <circle cx="14" cy="5" r="2" />
      <path d="m6 18 4-4 2 3 4-1" />
      <path d="m14 9-3 4-3-2-3 4" />
      <path d="m14 9 3 3 3-1" />
    </svg>
  );
}

export function IconTrophy({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <path d="M7 4h10v6a5 5 0 0 1-10 0z" />
      <path d="M7 6H4v2a3 3 0 0 0 3 3" />
      <path d="M17 6h3v2a3 3 0 0 1-3 3" />
      <path d="M9 19h6" />
      <path d="M12 15v4" />
    </svg>
  );
}

export function IconTarget({ className, style }: IconProps) {
  return (
    <svg {...ICON_SVG_PROPS} className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

