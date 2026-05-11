import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  RAMPS,
  RAMP_STEPS,
  RADIUS,
  SEMANTIC,
  SPACING,
  TYPE_SCALE,
  type RampFamily,
  type RampStep,
  type ThemeName,
  rampValue,
} from '../tokens';
import { AthoItem } from './AthoItem';
import { BaseChip } from './BaseChip';
import {
  IconAlert,
  IconArrowDiagonalDownLeft,
  IconArrowDiagonalDownRight,
  IconArrowDiagonalUpLeft,
  IconArrowDiagonalUpRight,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconBell,
  IconBookmark,
  IconCalendar,
  IconChat,
  IconCheck,
  IconCheckCircle,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconClock,
  IconClose,
  IconCollapse,
  IconColumns,
  IconCopy,
  IconDownload,
  IconDragHandle,
  IconDuplicate,
  IconEdit,
  IconExpand,
  IconExport,
  IconEyeClosed,
  IconEyeOpen,
  IconFile,
  IconFilter,
  IconFlag,
  IconFolder,
  IconGrid,
  IconHeart,
  IconImage,
  IconInfo,
  IconLink,
  IconList,
  IconLock,
  IconMail,
  IconMenu,
  IconMinus,
  IconMoon,
  IconPause,
  IconPin,
  IconPlay,
  IconPlus,
  IconRedo,
  IconRefresh,
  IconRows,
  IconRunner,
  IconSave,
  IconSearch,
  IconSettings,
  IconShare,
  IconStar,
  IconStopwatch,
  IconSun,
  IconTarget,
  IconTrash,
  IconTrophy,
  IconUndo,
  IconUnlock,
  IconUpload,
  IconUser,
  IconUsers,
} from '../icons';

// ── BrandSystem ─────────────────────────────────────────────────

export function BrandSystem() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof document === 'undefined') return 'dark';
    const cur = document.documentElement.getAttribute('data-theme');
    return cur === 'light' ? 'light' : 'dark';
  });
  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', theme);
    return () => {
      if (prev) document.documentElement.setAttribute('data-theme', prev);
      else document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);

  const cssVars = useMemo<React.CSSProperties>(() => {
    const out: Record<string, string> = {};
    const sem = SEMANTIC[theme];
    for (const k of Object.keys(sem) as Array<keyof typeof sem>) {
      out[`--bs-${k}`] = sem[k];
    }
    for (const family of Object.keys(RAMPS) as RampFamily[]) {
      for (const step of RAMP_STEPS) {
        out[`--bs-${family}-${step}`] = rampValue(family, step);
      }
    }
    return out as React.CSSProperties;
  }, [theme]);

  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  // Force the page to open on Foundations every time. Without this
  // the browser can restore a prior scroll position (back-forward
  // navigation, refresh) and land mid-page on Pills or Inputs, which
  // misrepresents the document order and the TOC active state.
  // Runs before the IntersectionObserver attaches so the initial
  // observed section is the one actually at the top.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        ...cssVars,
        background: c('bg-low'),
        color: c('text-primary'),
        minHeight: '100vh',
        fontFamily: '"Satoshi", system-ui, sans-serif',
      }}
      className="antialiased"
    >
      {/* Focus rings appear only on keyboard navigation. Click +
          mouse interactions never trigger the ring; tabbing does. */}
      <style>{`
        .bs-btn:focus { outline: none; }
        .bs-btn:focus-visible {
          outline: 2px solid var(--bs-focus-ring);
          outline-offset: 2px;
        }
      `}</style>
      <header
        className="sticky top-0 z-30 backdrop-blur"
        style={{
          background: `color-mix(in srgb, ${c('bg-low')} 92%, transparent)`,
          borderBottom: `1px solid ${c('border-third')}`,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span style={{ ...typeStyle('title2'), color: c('text-primary') }}>
              Buena Brand System
            </span>
            <span style={{ ...typeStyle('caption'), color: c('text-third') }}>
              v0.4 · Live components
            </span>
          </div>
          <ThemeToggle theme={theme} onChange={setTheme} />
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 flex gap-12">
        <Toc active={activeId} />
        {/* Generous bottom padding so the last sections can scroll
            into the TOC active zone. Without this, the TOC can't
            highlight items past whatever the viewport reaches. */}
        <main
          className="flex-1 min-w-0 py-12 space-y-24"
          style={{ paddingBottom: '40vh' }}
        >
          <SectionFoundations />
          <SectionTypography />
          <SectionColor theme={theme} />
          <SectionSpacing />
          <SectionCorners />
          <SectionButtons />
          <SectionPillsAndToggles />
          <SectionInputs />
          <SectionFormControls />
          <SectionChipsAndTags />
          <SectionStandardTabs />
          <SectionCards />
          <SectionDrawers />
          <SectionTables />
          <SectionDates />
          <SectionCalendar />
          <SectionDragAndSort />
          <SectionTooltips />
          <SectionIcons />
          <SectionLayouts />
          <SectionFooter />
        </main>
      </div>
    </div>
  );
}

const SECTIONS: { id: string; label: string }[] = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'typography', label: 'Typography' },
  { id: 'color', label: 'Color' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'corners', label: 'Corners' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'pills', label: 'Pills & Toggles' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'form-controls', label: 'Form Controls' },
  { id: 'chips', label: 'Chips & Tags' },
  { id: 'tabs', label: 'Standard Tabs' },
  { id: 'cards', label: 'Cards' },
  { id: 'drawers', label: 'Drawers' },
  { id: 'tables', label: 'Tables' },
  { id: 'dates', label: 'Dates' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'drag-sort', label: 'Drag & Sort' },
  { id: 'tooltip', label: 'Tooltips' },
  { id: 'icons', label: 'Icons' },
  { id: 'layouts', label: 'Layouts' },
];

// ── Helpers ─────────────────────────────────────────────────────

function c(token: string): string {
  return `var(--bs-${token})`;
}

/** Direct ramp accessor for components that want a specific accent. */
function ramp(family: RampFamily, step: RampStep): string {
  return rampValue(family, step);
}

function typeStyle(name: keyof typeof TYPE_SCALE): React.CSSProperties {
  const t = TYPE_SCALE[name];
  return {
    fontSize: `${t.size}px`,
    lineHeight: `${t.leading}px`,
    fontWeight: t.weight,
    letterSpacing: `${t.letter}px`,
  };
}

function Toc({ active }: { active: string }) {
  // Cap nav height + scroll internally so every section is reachable
  // even on shorter viewports.
  return (
    <aside className="hidden lg:block w-[200px] shrink-0 py-12">
      <nav
        className="sticky top-[80px] space-y-1"
        style={{
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}
        aria-label="Brand system sections"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              ...typeStyle('bodySmall'),
              color: active === s.id ? c('text-primary') : c('text-third'),
              background: active === s.id ? c('bg-high') : 'transparent',
              fontWeight: active === s.id ? 500 : 400,
            }}
            className="block px-3 py-1.5 rounded-md transition-colors hover:!opacity-100"
          >
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function ThemeToggle({
  theme,
  onChange,
}: {
  theme: ThemeName;
  onChange: (t: ThemeName) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center p-0.5"
      style={{
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        borderRadius: 9999,
      }}
    >
      {(['light', 'dark'] as const).map((t) => {
        const active = theme === t;
        return (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(t)}
            aria-label={t === 'light' ? 'Light mode' : 'Dark mode'}
            className="w-9 h-7 inline-flex items-center justify-center transition-colors"
            style={{
              borderRadius: 9999,
              background: active ? c('button-bg-primary') : 'transparent',
              color: active ? c('bg-low') : c('text-third'),
            }}
          >
            {t === 'light' ? (
              <IconSun className="w-4 h-4" />
            ) : (
              <IconMoon className="w-4 h-4" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Section primitives ─────────────────────────────────────────

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <header className="mb-6">
        <h2 style={{ ...typeStyle('title1'), color: c('text-primary') }}>
          {title}
        </h2>
        {description && (
          <p
            style={{
              ...typeStyle('body'),
              color: c('text-second'),
              marginTop: 4,
              maxWidth: '60ch',
            }}
          >
            {description}
          </p>
        )}
      </header>
      <div className="space-y-8">{children}</div>
    </section>
  );
}

function Group({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {title && (
        <header className="mb-3">
          <h3 style={{ ...typeStyle('title3'), color: c('text-primary') }}>
            {title}
          </h3>
          {description && (
            <p
              style={{
                ...typeStyle('bodySmall'),
                color: c('text-third'),
                marginTop: 2,
              }}
            >
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  );
}

function Specimen({
  caption,
  bordered = true,
  centered = false,
  noPadding = false,
  children,
}: {
  caption?: string;
  bordered?: boolean;
  centered?: boolean;
  noPadding?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: bordered ? `1px solid ${c('border-third')}` : undefined,
        borderRadius: 8,
        padding: noPadding ? 0 : 24,
        display: centered ? 'flex' : 'block',
        alignItems: centered ? 'center' : undefined,
        justifyContent: centered ? 'center' : undefined,
        minHeight: centered ? 120 : undefined,
      }}
    >
      <div className={centered ? '' : 'min-w-0'}>{children}</div>
      {caption && (
        <div
          style={{
            ...typeStyle('footnote'),
            color: c('text-third'),
            marginTop: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}

// ── Section: Foundations ──────────────────────────────────────

function SectionFoundations() {
  return (
    <Section
      id="foundations"
      title="Foundations"
      description="App-style sizing (Apple HIG), 8pt grid spacing, hand tuned color ramps, and a generic semantic vocabulary that travels across products."
    >
      <ul
        style={{ ...typeStyle('body'), color: c('text-second') }}
        className="space-y-2 list-disc pl-5"
      >
        <li>Type: nine step scale from footnote (11pt) to large title (34pt).</li>
        <li>Space: 8pt grid with a 4pt half step.</li>
        <li>Color: seven ramps (one neutral, six accents) of nine steps each.</li>
        <li>
          Semantic tokens (<code>bg-low</code>, <code>text-primary</code>, …)
          resolve to ramp values per theme.
        </li>
      </ul>
    </Section>
  );
}

// ── Section: Typography ───────────────────────────────────────

function SectionTypography() {
  const order: (keyof typeof TYPE_SCALE)[] = [
    'largeTitle',
    'title1',
    'title2',
    'title3',
    'callout',
    'body',
    'bodySmall',
    'caption',
    'footnote',
  ];
  return (
    <Section
      id="typography"
      title="Typography"
      description="Satoshi Variable. Apple HIG inspired scale — 600 weight on titles, 500 on callouts and captions, 400 on body."
    >
      <div
        className="rounded-lg divide-y"
        style={{
          border: `1px solid ${c('border-third')}`,
          borderColor: c('border-third'),
        }}
      >
        {order.map((key) => {
          const t = TYPE_SCALE[key];
          return (
            <div
              key={key}
              className="grid grid-cols-[140px_120px_1fr] gap-6 px-6 py-4 items-baseline"
              style={{ borderColor: c('border-third') }}
            >
              <div
                style={{
                  ...typeStyle('caption'),
                  color: c('text-third'),
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {key}
              </div>
              <div
                style={{
                  ...typeStyle('caption'),
                  color: c('text-third'),
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {t.size}/{t.leading} · {t.weight} {weightLabel(t.weight)}
              </div>
              <div style={{ ...typeStyle(key), color: c('text-primary') }}>
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function weightLabel(w: number): string {
  if (w >= 600) return 'semibold';
  if (w >= 500) return 'medium';
  return 'regular';
}

// ── Section: Color ────────────────────────────────────────────

function SectionColor({ theme }: { theme: ThemeName }) {
  const families = Object.keys(RAMPS) as RampFamily[];
  return (
    <Section
      id="color"
      title="Color"
      description="Two layers. Primitives (the 100 to 900 ramps) carry the raw values; semantic tokens map onto them per theme."
    >
      <Group title="Primitives">
        <div className="space-y-3">
          {families.map((family) => (
            <RampRow key={family} family={family} />
          ))}
        </div>
      </Group>

      <Group title="Semantic Tokens" description={`Resolved against the ${theme} theme. Toggle the page theme to see the mapping flip.`}>
        <SemanticTwoColumn theme={theme} />
      </Group>
    </Section>
  );
}

function RampRow({ family }: { family: RampFamily }) {
  const spec = RAMPS[family];
  const [copied, setCopied] = useState<RampStep | null>(null);
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span
          style={{ ...typeStyle('caption'), color: c('text-primary') }}
          className="font-medium capitalize"
        >
          {spec.name}
        </span>
      </div>
      <div className="grid grid-cols-9 gap-1">
        {RAMP_STEPS.map((step) => {
          // Anchor outline: thin white. Yellow's 700 is so bright it
          // also gets the same thin white outline so its anchor reads
          // against the swatch.
          const isAnchor =
            (family === 'yellow' && step === 100) ||
            (family !== 'yellow' && step === 700) ||
            (family === 'yellow' && step === 700);
          const hex = rampValue(family, step);
          const isCopied = copied === step;
          return (
            <button
              key={step}
              type="button"
              onClick={() => {
                copyToClipboard(hex);
                setCopied(step);
                window.setTimeout(() => {
                  setCopied((cur) => (cur === step ? null : cur));
                }, 1100);
              }}
              className="rounded-md text-left bs-btn"
              style={{
                background: hex,
                aspectRatio: '1.6 / 1',
                outline: isAnchor ? '1px solid #ffffff' : 'none',
                outlineOffset: -1,
                position: 'relative',
                cursor: 'copy',
                border: 'none',
                padding: 0,
              }}
              title={`Click to copy ${hex}`}
              aria-label={`Copy ${family}-${step} ${hex}`}
            >
              <span
                style={{
                  position: 'absolute',
                  bottom: 4,
                  left: 6,
                  ...typeStyle('footnote'),
                  color: step <= 400 ? '#0a0a0a' : '#fafafa',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {step}
              </span>
              {isCopied && (
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    borderRadius: 6,
                    ...typeStyle('footnote'),
                    fontWeight: 600,
                  }}
                >
                  Copied
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Best-effort hex copy. Modern browsers always have navigator.clipboard
 *  on https; falls back to a hidden textarea + execCommand for older. */
function copyToClipboard(text: string): void {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      /* fall through to legacy below */
      legacyCopy(text);
    });
    return;
  }
  legacyCopy(text);
}

function legacyCopy(text: string): void {
  if (typeof document === 'undefined') return;
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } catch {
    /* swallow — best-effort */
  }
  document.body.removeChild(ta);
}

function SemanticTwoColumn({ theme }: { theme: ThemeName }) {
  const entries = Object.entries(SEMANTIC[theme]) as Array<[
    keyof (typeof SEMANTIC)['dark'],
    string,
  ]>;
  const half = Math.ceil(entries.length / 2);
  const left = entries.slice(0, half);
  const right = entries.slice(half);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <SemanticColumn entries={left} />
      <SemanticColumn entries={right} />
    </div>
  );
}

function SemanticColumn({
  entries,
}: {
  entries: Array<[string, string]>;
}) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: `1px solid ${c('border-third')}` }}
    >
      {entries.map(([name, value], i) => {
        const primitive = findPrimitiveName(value);
        const onChipColor = readableTextOn(value);
        const isHex = typeof value === 'string' && value.startsWith('#');
        return (
          <div
            key={name}
            className="grid grid-cols-[1fr_140px_1fr] gap-3 px-4 py-2 items-center"
            style={{
              borderTop: i === 0 ? 'none' : `1px solid ${c('border-third')}`,
            }}
          >
            <code style={{ ...typeStyle('caption'), color: c('text-primary') }}>
              {name}
            </code>
            <div
              style={{
                height: 28,
                borderRadius: 6,
                background: value,
                border: `1px solid ${c('border-third')}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isHex && (
                <span
                  style={{
                    ...typeStyle('footnote'),
                    color: onChipColor,
                    opacity: 0.5,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {value}
                </span>
              )}
            </div>
            <code
              style={{
                ...typeStyle('footnote'),
                color: c('text-third'),
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {primitive ?? value}
            </code>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Map a resolved hex value back to its `family-step` primitive name.
 * Returns null when the value doesn't correspond to any ramp step
 * (e.g. `transparent`, `rgba(...)`, or `color-mix(...)`).
 */
function findPrimitiveName(value: string): string | null {
  if (typeof value !== 'string' || !value.startsWith('#')) return null;
  for (const family of Object.keys(RAMPS) as RampFamily[]) {
    for (const step of RAMP_STEPS) {
      if (rampValue(family, step).toLowerCase() === value.toLowerCase()) {
        return `${family}-${step}`;
      }
    }
  }
  return null;
}

/** Pick a readable text color for a hex background using simple
 *  luminance. Falls back to text-primary for non-hex values. */
function readableTextOn(bg: string): string {
  if (typeof bg !== 'string' || !bg.startsWith('#')) return c('text-primary');
  const m = bg.match(/^#([0-9a-fA-F]{6})$/);
  if (!m) return c('text-primary');
  const r = parseInt(m[1].substring(0, 2), 16);
  const g = parseInt(m[1].substring(2, 4), 16);
  const b = parseInt(m[1].substring(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? '#0F1115' : '#FFFFFF';
}

// ── Section: Spacing ─────────────────────────────────────────

function SectionSpacing() {
  return (
    <Section
      id="spacing"
      title="Spacing"
      description="8pt grid with a 4pt half step. The square at right is rendered at the actual pixel size."
    >
      <div
        className="rounded-lg divide-y"
        style={{
          border: `1px solid ${c('border-third')}`,
          borderColor: c('border-third'),
        }}
      >
        {Object.entries(SPACING).map(([name, px]) => (
          <div
            key={name}
            className="grid grid-cols-[80px_60px_1fr] gap-6 px-6 py-3 items-center"
            style={{ borderColor: c('border-third') }}
          >
            <code style={{ ...typeStyle('caption'), color: c('text-primary') }}>
              {name}
            </code>
            <span
              style={{
                ...typeStyle('caption'),
                color: c('text-third'),
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {px}px
            </span>
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: px,
                  height: px,
                  background: c('text-primary'),
                  borderRadius: 2,
                }}
              />
              <span style={{ ...typeStyle('footnote'), color: c('text-third') }}>
                {px} × {px}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Section: Corners ─────────────────────────────────────────

function SectionCorners() {
  return (
    <Section
      id="corners"
      title="Corners"
      description="Each card uses its own radius. What you see is what you get."
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(RADIUS).map(([name, px]) => (
          <div
            key={name}
            className="p-4"
            style={{
              // Outer card stays at a single fixed radius across the
              // whole grid; only the inner block changes.
              border: `1px solid ${c('border-third')}`,
              borderRadius: 8,
            }}
          >
            <div
              className="h-16 mb-3"
              style={{
                background: c('text-primary'),
                borderRadius: px,
              }}
            />
            <code
              style={{
                ...typeStyle('caption'),
                color: c('text-primary'),
                textTransform: 'uppercase',
              }}
            >
              {name}
            </code>
            <div
              style={{
                ...typeStyle('footnote'),
                color: c('text-third'),
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {px === 9999 ? '∞' : `${px}px`}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Section: Buttons ──────────────────────────────────────────

function SectionButtons() {
  return (
    <Section
      id="buttons"
      title="Buttons"
      description="Tab into the page to see focus rings; hover and click to feel each state."
    >
      <Group title="All Types Functional" description="Every button below is wired up. Move your mouse around and click any of them.">
        <Specimen>
          <div className="flex flex-wrap items-center gap-3">
            <Btn variant="primary">Primary</Btn>
            <Btn variant="accent">Accent</Btn>
            <Btn variant="secondary">Secondary</Btn>
            <Btn variant="ghost">Ghost</Btn>
            <Btn variant="destructive">Delete</Btn>
            <Btn variant="destructive-secondary">Delete</Btn>
            <FloatingActionLink>Share link</FloatingActionLink>
            <IconBtn ariaLabel="Settings">
              <IconSettings className="w-5 h-5" />
            </IconBtn>
          </div>
        </Specimen>
      </Group>

      <ButtonMatrix variant="primary" label="Primary" />
      <ButtonMatrix variant="accent" label="Accent" />
      <ButtonMatrix variant="secondary" label="Secondary" />
      <ButtonMatrix variant="ghost" label="Ghost" />
      <ButtonMatrix variant="destructive" label="Destructive" verb="Delete" />
      <ButtonMatrix
        variant="destructive-secondary"
        label="Destructive Secondary"
        verb="Delete"
      />

      <Group title="Floating Action Links" description="Pill shape, used for floating actions over content.">
        <Specimen>
          <div className="space-y-4">
            <FloatingStateRow size="lg" />
            <FloatingStateRow size="md" />
            <FloatingStateRow size="sm" />
          </div>
        </Specimen>
      </Group>

      <Group title="Icon Buttons" description="Square hit area, no border, subtle hover background. The notification dot variant sits next to its plain twin.">
        <Specimen>
          <div className="space-y-4">
            <IconButtonRow size="lg" />
            <IconButtonRow size="md" />
            <IconButtonRow size="sm" />
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

type BtnVariant =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'destructive-secondary';
type BtnSize = 'lg' | 'md' | 'sm';
type BtnState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

interface BtnProps {
  variant?: BtnVariant;
  size?: BtnSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  forceState?: BtnState;
  children: React.ReactNode;
  onClick?: () => void;
}

const SIZE_DIMS: Record<
  BtnSize,
  { h: number; px: number; fs: keyof typeof TYPE_SCALE; iconPx: number }
> = {
  lg: { h: 44, px: 20, fs: 'callout', iconPx: 18 },
  md: { h: 36, px: 16, fs: 'body', iconPx: 16 },
  sm: { h: 28, px: 12, fs: 'caption', iconPx: 14 },
};

/**
 * Push button. When `forceState` is unset the button reacts to native
 * hover / active / focus and you can feel each state by interacting.
 * When set, the visual is forced into a given state for the matrix
 * specimens.
 */
/**
 * Push button.
 *
 * Hover: button lifts 1px and shifts to a more saturated value.
 * Press: button lifts 2px and shifts to the most saturated value.
 * No scale-down on press; saturation alone carries the click feel.
 *
 * Focus rings are CSS-driven via `:focus-visible` (see the global
 * style block in BrandSystem) so a click never paints a ring;
 * keyboard tabbing always does.
 */
function Btn({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  forceState,
  children,
  onClick,
}: BtnProps) {
  const dims = SIZE_DIMS[size];
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const visualState: BtnState =
    forceState ?? (active ? 'active' : hover ? 'hover' : 'default');

  const isDisabled = visualState === 'disabled';
  const styles = btnStyles(variant, visualState);

  return (
    <button
      type="button"
      className="bs-btn"
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        ...typeStyle(dims.fs),
        height: dims.h,
        paddingLeft: dims.px,
        paddingRight: dims.px,
        // Reduced corner radius across all buttons.
        borderRadius: 6,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'background 80ms, color 80ms, transform 90ms ease-out, filter 80ms',
        userSelect: 'none',
        ...styles,
      }}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}

function btnStyles(variant: BtnVariant, state: BtnState): React.CSSProperties {
  const base = btnBase(variant);
  if (state === 'default' || state === 'disabled') return base;
  if (state === 'focus') {
    return { ...base, outline: `2px solid ${c('focus-ring')}`, outlineOffset: 2 };
  }
  // Hover and press: saturation / fill carries the feedback. No
  // translateY — the buttons stay anchored in place. Removed
  // 2026-05-09 per design feedback.
  if (state === 'hover') return { ...base, ...btnHover(variant) };
  if (state === 'active') return { ...base, ...btnActive(variant) };
  return base;
}

function btnBase(variant: BtnVariant): React.CSSProperties {
  switch (variant) {
    case 'primary':
      return {
        background: c('button-bg-primary'),
        color: c('bg-low'),
        border: `1px solid ${c('button-bg-primary')}`,
      };
    case 'accent':
      // No border on accent; the surface IS the color and a
      // separate outline would just be visual noise.
      return {
        background: ramp('green', 700),
        color: '#0F1115',
        border: 'none',
      };
    case 'secondary':
      return {
        background: c('button-bg-second'),
        color: c('text-primary'),
        border: `1px solid ${c('border-second')}`,
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: c('text-primary'),
        border: '1px solid transparent',
      };
    case 'destructive':
      // Black text on the destructive red, no separate outline.
      return {
        background: c('error'),
        color: '#0F1115',
        border: 'none',
      };
    case 'destructive-secondary':
      return {
        background: 'transparent',
        color: c('error'),
        border: `1px solid ${c('error')}`,
      };
  }
}

function btnHover(variant: BtnVariant): React.CSSProperties {
  // Hover: more saturated (next ramp step) or slightly brighter.
  switch (variant) {
    case 'primary':
      return { filter: 'brightness(0.92) saturate(1.1)' };
    case 'accent':
      return { background: ramp('green', 800) };
    case 'secondary':
      return { background: c('bg-high') };
    case 'ghost':
      return { background: c('bg-high') };
    case 'destructive':
      return { background: ramp('red', 800) };
    case 'destructive-secondary':
      return {
        background: `color-mix(in srgb, ${c('error')} 15%, transparent)`,
      };
  }
}

function btnActive(variant: BtnVariant): React.CSSProperties {
  // Press: even more saturated (further ramp step) — no scale-down.
  switch (variant) {
    case 'primary':
      return { filter: 'brightness(0.82) saturate(1.2)' };
    case 'accent':
      return { background: ramp('green', 900) };
    case 'destructive':
      return { background: ramp('red', 900) };
    case 'destructive-secondary':
      return {
        background: `color-mix(in srgb, ${c('error')} 28%, transparent)`,
      };
    case 'secondary':
    case 'ghost':
      return { background: c('bg-high'), filter: 'brightness(0.92)' };
  }
}

function ButtonMatrix({
  variant,
  label,
  verb = 'Run',
}: {
  variant: BtnVariant;
  label: string;
  verb?: string;
}) {
  const states: BtnState[] = ['default', 'hover', 'active', 'focus', 'disabled'];
  const sizes: BtnSize[] = ['lg', 'md', 'sm'];
  return (
    <Group title={label}>
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: `1px solid ${c('border-third')}` }}
      >
        <div
          className="grid grid-cols-[80px_repeat(5,1fr)] gap-4 px-4 py-2"
          style={{
            background: c('bg-med'),
            borderBottom: `1px solid ${c('border-third')}`,
            ...typeStyle('footnote'),
            color: c('text-third'),
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          <div>Size</div>
          {states.map((s) => (
            <div key={s}>{s}</div>
          ))}
        </div>
        {sizes.map((sz) => (
          <div
            key={sz}
            className="grid grid-cols-[80px_repeat(5,1fr)] gap-4 px-4 py-3 items-center"
            style={{ borderBottom: `1px solid ${c('border-third')}` }}
          >
            <code style={{ ...typeStyle('caption'), color: c('text-primary') }}>
              {sz.toUpperCase()}
            </code>
            {states.map((s) => (
              <div key={s} className="flex">
                <Btn variant={variant} size={sz} forceState={s}>
                  {verb}
                </Btn>
              </div>
            ))}
          </div>
        ))}
        <div className="grid grid-cols-[80px_1fr_1fr] gap-4 px-4 py-3 items-start">
          <code style={{ ...typeStyle('caption'), color: c('text-primary') }}>
            Icons
          </code>
          <div>
            <span
              style={{ ...typeStyle('footnote'), color: c('text-third') }}
              className="block uppercase tracking-wide mb-1.5"
            >
              Icon left
            </span>
            <div className="flex items-start gap-2">
              {sizes.map((sz) => (
                <Btn
                  key={sz}
                  variant={variant}
                  size={sz}
                  iconLeft={
                    <IconPlus style={{ width: SIZE_DIMS[sz].iconPx, height: SIZE_DIMS[sz].iconPx }} />
                  }
                >
                  Add
                </Btn>
              ))}
            </div>
          </div>
          <div>
            <span
              style={{ ...typeStyle('footnote'), color: c('text-third') }}
              className="block uppercase tracking-wide mb-1.5"
            >
              Icon right
            </span>
            <div className="flex items-start gap-2">
              {sizes.map((sz) => (
                <Btn
                  key={sz}
                  variant={variant}
                  size={sz}
                  iconRight={
                    <IconChevronRight style={{ width: SIZE_DIMS[sz].iconPx, height: SIZE_DIMS[sz].iconPx }} />
                  }
                >
                  Next
                </Btn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Group>
  );
}

function FloatingActionLink({
  size = 'md',
  iconLeft,
  iconRight,
  forceState,
  children,
}: {
  size?: BtnSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  forceState?: BtnState;
  children: React.ReactNode;
}) {
  const dims = SIZE_DIMS[size];
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const visualState: BtnState =
    forceState ?? (active ? 'active' : hover ? 'hover' : 'default');
  const isDisabled = visualState === 'disabled';
  // Lift on hover/press, no scale-down. Focus ring is :focus-visible
  // only via .bs-btn class.
  const lift =
    visualState === 'hover' ? 'translateY(-1px)' :
    visualState === 'active' ? 'translateY(-2px)' : 'none';
  const bg =
    visualState === 'hover' || visualState === 'active' ? c('bg-high') : c('bg-med');
  return (
    <button
      type="button"
      className="bs-btn"
      disabled={isDisabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        ...typeStyle(dims.fs),
        height: dims.h,
        paddingLeft: dims.px,
        paddingRight: dims.px,
        borderRadius: 9999,
        background: bg,
        color: c('text-primary'),
        border: `1px solid ${c('border-second')}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        // Static "focus" specimen still draws the ring; live focus
        // is handled by :focus-visible.
        outline:
          forceState === 'focus' ? `2px solid ${c('focus-ring')}` : 'none',
        outlineOffset: 2,
        transform: lift,
        transition: 'background 80ms, transform 90ms ease-out',
        userSelect: 'none',
      }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

function FloatingStateRow({ size }: { size: BtnSize }) {
  const states: BtnState[] = ['default', 'hover', 'active', 'focus', 'disabled'];
  const ipx = SIZE_DIMS[size].iconPx;
  return (
    <div className="space-y-2">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        {size.toUpperCase()}
      </div>
      <div className="flex flex-wrap items-start gap-3">
        {states.map((s) => (
          <FloatingActionLink
            key={s}
            size={size}
            forceState={s}
            iconLeft={<IconShare style={{ width: ipx, height: ipx }} />}
          >
            Share
          </FloatingActionLink>
        ))}
        <FloatingActionLink
          size={size}
          iconRight={<IconChevronRight style={{ width: ipx, height: ipx }} />}
        >
          Open
        </FloatingActionLink>
      </div>
    </div>
  );
}

function IconBtn({
  size = 'md',
  notification,
  ariaLabel,
  forceState,
  children,
}: {
  size?: BtnSize;
  notification?: boolean;
  ariaLabel: string;
  forceState?: BtnState;
  children: React.ReactNode;
}) {
  const dims = SIZE_DIMS[size];
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const visualState: BtnState =
    forceState ?? (active ? 'active' : hover ? 'hover' : 'default');
  const isDisabled = visualState === 'disabled';
  return (
    <button
      type="button"
      className="bs-btn"
      aria-label={ariaLabel}
      disabled={isDisabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        position: 'relative',
        width: dims.h,
        height: dims.h,
        borderRadius: 6,
        background:
          visualState === 'hover' || visualState === 'active'
            ? c('bg-high')
            : 'transparent',
        color: c('text-primary'),
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        outline:
          forceState === 'focus' ? `2px solid ${c('focus-ring')}` : 'none',
        outlineOffset: 2,
        transition: 'background 80ms',
      }}
    >
      {children}
      {notification && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 7,
            height: 7,
            borderRadius: 9999,
            background: c('success'),
            border: `1px solid ${c('bg-low')}`,
          }}
        />
      )}
    </button>
  );
}

function IconButtonRow({ size }: { size: BtnSize }) {
  return (
    <div className="space-y-2">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        {size.toUpperCase()}
      </div>
      <div
        className="rounded-lg p-4 flex flex-wrap items-center gap-3"
        style={{ border: `1px solid ${c('border-third')}` }}
      >
        <IconBtn size={size} ariaLabel="Settings">
          <IconSettings className="w-5 h-5" />
        </IconBtn>
        <IconBtn size={size} ariaLabel="Share">
          <IconShare className="w-5 h-5" />
        </IconBtn>
        <IconBtn size={size} ariaLabel="Share with notification" notification>
          <IconShare className="w-5 h-5" />
        </IconBtn>
        <IconBtn size={size} ariaLabel="Export">
          <IconExport className="w-5 h-5" />
        </IconBtn>
        <IconBtn size={size} ariaLabel="Filter">
          <IconFilter className="w-5 h-5" />
        </IconBtn>
        <IconBtn size={size} ariaLabel="Menu">
          <IconMenu className="w-5 h-5" />
        </IconBtn>
        <IconBtn size={size} ariaLabel="Trash">
          <IconTrash className="w-5 h-5" />
        </IconBtn>
        <IconBtn size={size} ariaLabel="Disabled" forceState="disabled">
          <IconRedo className="w-5 h-5" />
        </IconBtn>
      </div>
    </div>
  );
}

// ── Section: Pills & Toggles ──────────────────────────────────

function SectionPillsAndToggles() {
  // Three independent toggle pairs so each size column is a working
  // demo, not a copy of the others.
  const [teamLg, setTeamLg] = useState(false);
  const [detailsLg, setDetailsLg] = useState(true);
  const [teamMd, setTeamMd] = useState(false);
  const [detailsMd, setDetailsMd] = useState(true);
  const [teamSm, setTeamSm] = useState(false);
  const [detailsSm, setDetailsSm] = useState(true);
  return (
    <Section
      id="pills"
      title="Pills & Toggles"
      description="Smaller binary affordances. All interactive."
    >
      <Group title="Header Pills" description="Three sizes, side by side. The medium column matches the original spec; small is the iOS-tray density and large is the desktop-toolbar density.">
        <Specimen>
          <div className="grid grid-cols-3 gap-6">
            <PillSizeColumn label="LG">
              <HeaderPill size="lg" enabled={teamLg} onClick={() => setTeamLg((v) => !v)}>
                Team
              </HeaderPill>
              <HeaderPill size="lg" enabled={detailsLg} onClick={() => setDetailsLg((v) => !v)}>
                Details
              </HeaderPill>
            </PillSizeColumn>
            <PillSizeColumn label="MD">
              <HeaderPill size="md" enabled={teamMd} onClick={() => setTeamMd((v) => !v)}>
                Team
              </HeaderPill>
              <HeaderPill size="md" enabled={detailsMd} onClick={() => setDetailsMd((v) => !v)}>
                Details
              </HeaderPill>
            </PillSizeColumn>
            <PillSizeColumn label="SM">
              <HeaderPill size="sm" enabled={teamSm} onClick={() => setTeamSm((v) => !v)}>
                Team
              </HeaderPill>
              <HeaderPill size="sm" enabled={detailsSm} onClick={() => setDetailsSm((v) => !v)}>
                Details
              </HeaderPill>
            </PillSizeColumn>
          </div>
        </Specimen>
      </Group>

      <Group title="Segmented Controls" description="Two flavors side by side. Rounded (infinite radius) on the left, Squared (slight radius) on the right. Each column shows three sizes (LG / MD / SM); the medium row matches the original spec.">
        <Specimen>
          <div className="grid grid-cols-2 gap-8">
            <SegmentedColumn label="Rounded" variant="round" />
            <SegmentedColumn label="Squared" variant="soft" />
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

/** Column header for the three header-pill size demos. Keeps the
 *  layout self-documenting without leaning on a separate caption. */
function PillSizeColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        {label}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

type PillSize = 'lg' | 'md' | 'sm';

const PILL_SIZE_DIMS: Record<
  PillSize,
  { h: number; px: number; type: keyof typeof TYPE_SCALE }
> = {
  lg: { h: 32, px: 14, type: 'body' },
  md: { h: 26, px: 12, type: 'caption' },
  sm: { h: 22, px: 10, type: 'footnote' },
};

function HeaderPill({
  enabled,
  onClick,
  children,
  size = 'md',
}: {
  enabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  size?: PillSize;
}) {
  const dims = PILL_SIZE_DIMS[size];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      style={{
        ...typeStyle(dims.type),
        height: dims.h,
        paddingLeft: dims.px,
        paddingRight: dims.px,
        borderRadius: 9999,
        border: `1px solid ${enabled ? c('button-bg-primary') : c('border-second')}`,
        background: enabled ? c('button-bg-primary') : 'transparent',
        color: enabled ? c('bg-low') : c('text-second'),
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

type SegmentedSize = 'lg' | 'md' | 'sm';

const SEGMENTED_SIZE_DIMS: Record<
  SegmentedSize,
  { padY: number; padX: number; type: keyof typeof TYPE_SCALE; outerRadius: number }
> = {
  lg: { padY: 8, padX: 16, type: 'body', outerRadius: 10 },
  md: { padY: 4, padX: 12, type: 'caption', outerRadius: 6 },
  sm: { padY: 2, padX: 10, type: 'footnote', outerRadius: 5 },
};

/**
 * Column wrapper that renders three sizes (LG/MD/SM) of the same
 * Segmented variant, each with a working state pair so a viewer can
 * actually flip them. Used inside SectionPillsAndToggles.
 */
function SegmentedColumn({
  label,
  variant,
}: {
  label: string;
  variant: 'round' | 'soft';
}) {
  const [lg, setLg] = useState('rows');
  const [md, setMd] = useState('rows');
  const [sm, setSm] = useState('rows');
  const opts = [
    { value: 'rows', label: 'Rows' },
    { value: 'columns', label: 'Columns' },
    { value: 'cards', label: 'Cards' },
  ];
  return (
    <div className="space-y-3">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        {label}
      </div>
      <div className="flex flex-col items-start gap-3">
        <Segmented size="lg" variant={variant} value={lg} onChange={setLg} options={opts} />
        <Segmented size="md" variant={variant} value={md} onChange={setMd} options={opts} />
        <Segmented size="sm" variant={variant} value={sm} onChange={setSm} options={opts} />
      </div>
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
  variant = 'round',
  size = 'md',
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  variant?: 'round' | 'soft';
  size?: SegmentedSize;
}) {
  const dims = SEGMENTED_SIZE_DIMS[size];
  const outerRadius = variant === 'round' ? 9999 : dims.outerRadius;
  const innerRadius = variant === 'round' ? 9999 : Math.max(2, dims.outerRadius - 2);
  return (
    <div
      role="radiogroup"
      className="inline-flex p-0.5"
      style={{
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        borderRadius: outerRadius,
      }}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            style={{
              ...typeStyle(dims.type),
              padding: `${dims.padY}px ${dims.padX}px`,
              borderRadius: innerRadius,
              fontWeight: 500,
              background: active ? c('button-bg-primary') : 'transparent',
              color: active ? c('bg-low') : c('text-second'),
              cursor: 'pointer',
              transition: 'background 120ms, color 120ms',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Section: Inputs ───────────────────────────────────────────

type InputState = 'default' | 'error' | 'warning' | 'focused' | 'disabled';

function SectionInputs() {
  return (
    <Section
      id="inputs"
      title="Inputs"
      description="Editable text controls. Hover, focus, type to feel each state."
    >
      <Group title="Text Inputs">
        <Specimen>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputDemo state="default" label="Default" />
            <InputDemo state="focused" label="Focused" />
            <InputDemo state="error" label="Error" message="Required field" />
            <InputDemo state="warning" label="Warning" message="Looks unusual, confirm" />
            <InputDemo state="disabled" label="Disabled" />
          </div>
        </Specimen>
      </Group>

      <Group title="Passwords">
        <Specimen>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PasswordDemo state="default" label="Default" />
            <PasswordDemo state="focused" label="Focused" />
            <PasswordDemo state="error" label="Error" message="Password is too short" />
            <PasswordDemo state="warning" label="Warning" message="Avoid reusing recent passwords" />
            <PasswordDemo state="disabled" label="Disabled" />
          </div>
        </Specimen>
      </Group>

      <Group title="Search" description="Plain on the left, autocomplete on the right. The autocomplete popover uses the same dropdown chrome as the select.">
        <Specimen>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Plain</Label>
              <SearchInput />
            </div>
            <div className="space-y-2">
              <Label>Autocomplete</Label>
              <SearchAutocomplete />
            </div>
          </div>
        </Specimen>
      </Group>

      <Group title="Textareas">
        <Specimen>
          <Textarea />
        </Specimen>
      </Group>

      <Group title="Selects / Dropdowns" description="Four sizes side by side. Each select is independently functional; popover chrome is shared across sizes.">
        <Specimen>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <DropdownColumn label="LG" size="lg" />
            <DropdownColumn label="MD" size="md" />
            <DropdownColumn label="SM" size="sm" />
            <DropdownColumn label="XS" size="xs" />
          </div>
        </Specimen>
      </Group>

      <Group title="Right-Click Menus" description="Static reference on the left; right-click anywhere in the dashed area on the right to feel the real thing.">
        <Specimen>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContextMenuStatic />
            <ContextMenuLive />
          </div>
        </Specimen>
      </Group>

      <Group title="Numbers / Times">
        <Specimen>
          <div className="flex items-end gap-4 flex-wrap">
            <NumberInput />
            <TimeInput />
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

function inputStyles(state: InputState): React.CSSProperties {
  let border = c('border-second');
  if (state === 'focused') border = c('focus-ring');
  if (state === 'error') border = c('error');
  if (state === 'warning') border = c('warning');
  return {
    ...typeStyle('body'),
    height: 40,
    padding: '0 12px',
    width: '100%',
    borderRadius: 8,
    background: c('bg-med'),
    border: `1px solid ${border}`,
    color: c('text-primary'),
    outline: state === 'focused' ? `2px solid ${c('focus-ring')}` : 'none',
    outlineOffset: -1,
    opacity: state === 'disabled' ? 0.5 : 1,
    cursor: state === 'disabled' ? 'not-allowed' : 'text',
  };
}

function InputDemo({
  state,
  label,
  message,
}: {
  state: InputState;
  label: string;
  message?: string;
}) {
  const [val, setVal] = useState(
    state === 'error' || state === 'warning' ? 'Something here' : ''
  );
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Type something"
        disabled={state === 'disabled'}
        autoFocus={state === 'focused'}
        style={inputStyles(state)}
      />
      {message && (
        <div
          style={{
            ...typeStyle('footnote'),
            color: state === 'error' ? c('error') : c('warning'),
            marginTop: 4,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

function PasswordDemo({
  state,
  label,
  message,
}: {
  state: InputState;
  label: string;
  message?: string;
}) {
  const [val, setVal] = useState(
    state === 'error' || state === 'warning' ? 'password' : ''
  );
  const [show, setShow] = useState(false);
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          disabled={state === 'disabled'}
          autoFocus={state === 'focused'}
          style={{ ...inputStyles(state), paddingRight: 40 }}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          disabled={state === 'disabled'}
          style={{
            position: 'absolute',
            right: 6,
            top: 6,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            color: c('text-third'),
            cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
          }}
        >
          {show ? (
            <IconEyeOpen className="w-4 h-4" />
          ) : (
            <IconEyeClosed className="w-4 h-4" />
          )}
        </button>
      </div>
      {message && (
        <div
          style={{
            ...typeStyle('footnote'),
            color: state === 'error' ? c('error') : c('warning'),
            marginTop: 4,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

function SearchInput() {
  const [val, setVal] = useState('');
  return (
    <div className="relative max-w-md">
      <span
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          color: c('text-third'),
        }}
      >
        <IconSearch className="w-[18px] h-[18px]" />
      </span>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
        style={{ ...inputStyles('default'), paddingLeft: 40 }}
      />
    </div>
  );
}

/**
 * Search field with a typed-ahead suggestion popover. Mirrors the
 * dropdown styling so the popover and the custom Select share the
 * same visual language. Substring match across a fixed sample set;
 * down-arrow / up-arrow navigates the highlighted row, Enter picks.
 */
function SearchAutocomplete() {
  // Generic sample set — two-level "Category — Item" so the dropdown
  // demos both grouping and a mix of short/long labels at typical
  // typeahead widths.
  const sample = [
    'Projects — Onboarding',
    'Projects — Quarterly Review',
    'Projects — Annual Roadmap',
    'Projects — Marketing Refresh',
    'Documents — Brand Guidelines',
    'Documents — Style Guide',
    'Documents — Meeting Notes',
    'People — Active Members',
    'People — Pending Invites',
    'People — Recently Added',
    'People — Archived Accounts',
    'Workspaces — Engineering',
    'Workspaces — Design',
    'Workspaces — Marketing & Brand',
    'Settings — Account',
    'Settings — Billing',
    'Settings — Notifications',
    'Settings — Integrations',
    'Reports — Weekly Summary',
    'Reports — Activity Log',
    'Reports — Audit Trail',
    'Reports — Performance',
  ];
  const [val, setVal] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  const q = val.trim().toLowerCase();
  const matches = q
    ? sample.filter((s) => s.toLowerCase().includes(q)).slice(0, 8)
    : [];
  const showPopover = open && matches.length > 0;
  return (
    <div ref={ref} className="relative max-w-md">
      <span
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          color: c('text-third'),
        }}
      >
        <IconSearch className="w-[18px] h-[18px]" />
      </span>
      <input
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          setOpen(true);
          setHighlight(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!showPopover) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlight((h) => (h + 1) % matches.length);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlight((h) => (h - 1 + matches.length) % matches.length);
          } else if (e.key === 'Enter') {
            e.preventDefault();
            setVal(matches[highlight]);
            setOpen(false);
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
        placeholder="Search events"
        style={{ ...inputStyles('default'), paddingLeft: 40 }}
      />
      {showPopover && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 20,
            background: c('bg-low'),
            border: `1px solid ${c('border-second')}`,
            borderRadius: 8,
            padding: 4,
          }}
        >
          {matches.map((opt, i) => {
            const sel = i === highlight;
            // Highlight the matched substring so the user sees why a
            // row showed up. Plain-text marker avoids any HTML-injection
            // concerns from the suggestion list.
            const idx = opt.toLowerCase().indexOf(q);
            const before = opt.slice(0, idx);
            const hit = opt.slice(idx, idx + q.length);
            const after = opt.slice(idx + q.length);
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={sel}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => {
                  setVal(opt);
                  setOpen(false);
                }}
                style={{
                  ...typeStyle('body'),
                  display: 'flex',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 6,
                  textAlign: 'left',
                  background: sel ? c('bg-high') : 'transparent',
                  color: c('text-primary'),
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <span>
                  {before}
                  <span style={{ color: c('text-primary'), fontWeight: 600 }}>
                    {hit}
                  </span>
                  {after}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Textarea() {
  const [val, setVal] = useState('Notes');
  return (
    <textarea
      value={val}
      onChange={(e) => setVal(e.target.value)}
      rows={4}
      style={{
        ...typeStyle('body'),
        width: '100%',
        padding: '10px 12px',
        borderRadius: 8,
        border: `1px solid ${c('border-second')}`,
        background: c('bg-med'),
        color: c('text-primary'),
        outline: 'none',
        resize: 'vertical',
      }}
    />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        ...typeStyle('caption'),
        display: 'block',
        color: c('text-third'),
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  );
}

type DropdownSize = 'lg' | 'md' | 'sm' | 'xs';

interface DropdownSizeDims {
  h: number;
  px: number;
  type: keyof typeof TYPE_SCALE;
  iconPx: number;
  radius: number;
  /** When true, the trigger is borderless / fill-less, hugs its
   *  content, and renders the chevron inline with the word — used
   *  by the LG / MD title-style variants. */
  borderless: boolean;
}

const DROPDOWN_SIZE_DIMS: Record<DropdownSize, DropdownSizeDims> = {
  lg: { h: 40, px: 0, type: 'title1', iconPx: 26, radius: 8, borderless: true },
  md: { h: 30, px: 0, type: 'title3', iconPx: 20, radius: 8, borderless: true },
  sm: { h: 28, px: 10, type: 'caption', iconPx: 14, radius: 6, borderless: false },
  xs: { h: 22, px: 8, type: 'footnote', iconPx: 12, radius: 4, borderless: false },
};

/** Column wrapper for the 4-size select grid. */
function DropdownColumn({ label, size }: { label: string; size: DropdownSize }) {
  return (
    <div className="space-y-2">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        {label}
      </div>
      <DropdownDemo size={size} />
    </div>
  );
}

function DropdownDemo({ size = 'md' }: { size?: DropdownSize } = {}) {
  const options = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F'];
  const [value, setValue] = useState(options[0]);
  const [open, setOpen] = useState(false);
  // `rendered` keeps the popover mounted long enough to play the
  // closing transition; `visible` flips opacity / translateY so the
  // 150ms ease-in-out can actually run on both open AND close.
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      setRendered(true);
      const handle = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(handle);
    }
    setVisible(false);
    const t = window.setTimeout(() => setRendered(false), 160);
    return () => window.clearTimeout(t);
  }, [open]);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  const dims = DROPDOWN_SIZE_DIMS[size];
  return (
    <div
      ref={ref}
      className={dims.borderless ? 'relative inline-block' : 'relative inline-block w-full'}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          ...typeStyle(dims.type),
          // Borderless: hug content. Bordered: fill the column.
          width: dims.borderless ? 'auto' : '100%',
          height: dims.h,
          padding: dims.borderless ? 0 : `0 ${dims.px}px`,
          background: dims.borderless ? 'transparent' : c('bg-med'),
          border: dims.borderless
            ? 'none'
            : `1px solid ${c('border-third')}`,
          color: c('text-primary'),
          textAlign: 'left',
          borderRadius: dims.borderless ? 0 : dims.radius,
          display: 'inline-flex',
          // Borderless: anchor children at the type baseline so the
          // chevron sits at the x-height of the title rather than
          // floating mid-line. Bordered: keep center-aligned.
          alignItems: dims.borderless ? 'baseline' : 'center',
          justifyContent: dims.borderless ? 'flex-start' : 'space-between',
          gap: dims.borderless ? 6 : 8,
          cursor: 'pointer',
          fontWeight: dims.borderless ? 500 : undefined,
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </span>
        {dims.borderless ? (
          // Borderless variants: position the chevron so its visual
          // bottom aligns with the cap-height baseline of the type
          // (NOT the descender baseline). Sized to ~58% of the
          // line-height to feel proportional next to a title-weight
          // glyph; translateY tucks it down so the bottom of the
          // arrow sits at the x-height line.
          <span
            aria-hidden
            style={{
              alignSelf: 'baseline',
              display: 'inline-flex',
              transform: `translateY(${dims.iconPx * 0.16}px)`,
              transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <IconChevronRight
              style={{
                width: dims.iconPx,
                height: dims.iconPx,
                transform: open ? 'rotate(270deg)' : 'rotate(90deg)',
                color: 'currentColor',
                flexShrink: 0,
                transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </span>
        ) : (
          <IconChevronRight
            style={{
              width: dims.iconPx,
              height: dims.iconPx,
              // Rotate so the chevron points down. Borderless variant
              // animates the rotation when open so the affordance reads
              // as expandable.
              transform: open ? 'rotate(270deg)' : 'rotate(90deg)',
              color: 'currentColor',
              flexShrink: 0,
              transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )}
      </button>
      {rendered && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            // Borderless: the popover hugs its widest item rather
            // than stretching to a 100% width that doesn't exist.
            right: dims.borderless ? 'auto' : 0,
            // Fade + slight downward slide. Mirrors the modal entry
            // ramp the rest of the system uses.
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-4px)',
            transition:
              'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: visible ? 'auto' : 'none',
            zIndex: 20,
            // Reverse colors per feedback. Body is darker than
            // surrounding bg; selected is lighter; hover sits between.
            background: c('bg-low'),
            border: `1px solid ${c('border-third')}`,
            borderRadius: dims.radius,
            padding: dims.borderless ? '6px 4px' : 4,
            minWidth: 'max-content',
          }}
        >
          {options.map((opt) => {
            const sel = opt === value;
            return (
              <DropdownItem
                key={opt}
                selected={sel}
                size={size}
                onClick={() => {
                  setValue(opt);
                  setOpen(false);
                }}
                label={opt}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  selected,
  label,
  onClick,
  size = 'md',
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
  size?: DropdownSize;
}) {
  const [hover, setHover] = useState(false);
  // selected = lightest, hover = mid, default = bg-low (darker)
  let bg = 'transparent';
  if (selected) bg = c('bg-high');
  else if (hover) bg = c('bg-med');
  const dims = DROPDOWN_SIZE_DIMS[size];
  // Slightly tighter vertical rhythm at smaller sizes.
  const padY =
    size === 'lg' ? 10 : size === 'md' ? 8 : size === 'sm' ? 6 : 4;
  // Borderless variants (LG / MD) used to have padX = 0 because
  // their TRIGGER hugs the title text — but the POPOVER items still
  // need breathing room on left + right so they read like the SM / XS
  // popover items. Pin LG/MD popover items to a comfortable 14px
  // horizontal pad so the menu feels grouped and tappable.
  const itemPadX = dims.borderless ? 14 : dims.px;
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...typeStyle(dims.type),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: `${padY}px ${itemPadX}px`,
        borderRadius: Math.max(2, dims.radius - 2),
        textAlign: 'left',
        background: bg,
        color: c('text-primary'),
        cursor: 'pointer',
        transition: 'background 80ms',
        border: 'none',
        gap: 8,
      }}
    >
      <span className="flex-1">{label}</span>
      {selected && <span style={{ marginLeft: 'auto', color: c('text-third') }}>✓</span>}
    </button>
  );
}

function NumberInput() {
  // Allow empty so the user can clear the field and retype.
  const [val, setVal] = useState<string>('15');
  return (
    <div>
      <Label>Number</Label>
      <input
        type="number"
        value={val}
        min={0}
        step={1}
        onChange={(e) => setVal(e.target.value)}
        style={{
          ...inputStyles('default'),
          width: 120,
          fontVariantNumeric: 'tabular-nums',
        }}
      />
    </div>
  );
}

/**
 * Time input. Click the trigger to open a popover with editable
 * hour and minute fields plus an AM/PM toggle. Inside the popover
 * each field is keyboard-driven: arrow keys step, typing rewrites.
 */
function TimeInput() {
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(30);
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>('AM');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <Label>Time</Label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          ...inputStyles('default'),
          width: 160,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontVariantNumeric: 'tabular-nums',
          cursor: 'pointer',
        }}
      >
        <span>
          {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')} {meridiem}
        </span>
        <span style={{ color: c('text-third') }}>
          <ClockIcon />
        </span>
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Pick time"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 20,
            background: c('bg-low'),
            border: `1px solid ${c('border-second')}`,
            borderRadius: 6,
            padding: 6,
            display: 'flex',
            gap: 6,
            alignItems: 'stretch',
          }}
        >
          {/* Wheels share a single rounded container with a single
              hairline between them; per-wheel borders + labels were
              eating space and reading as separate inputs. */}
          <div
            style={{
              display: 'flex',
              background: c('bg-med'),
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <ScrollWheel
              options={Array.from({ length: 12 }, (_, i) => i + 1)}
              value={hour}
              onChange={setHour}
              pad
            />
            {/* Hairline divider between hour + minute. Uses
                border-third so it stays in the divider vocabulary. */}
            <div style={{ width: 1, background: c('border-third') }} />
            <ScrollWheel
              options={Array.from({ length: 60 }, (_, i) => i)}
              value={minute}
              onChange={setMinute}
              pad
            />
          </div>
          <div className="flex flex-col gap-0.5">
            {(['AM', 'PM'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMeridiem(m)}
                style={{
                  ...typeStyle('caption'),
                  width: 36,
                  padding: '3px 6px',
                  borderRadius: 4,
                  border: `1px solid ${meridiem === m ? c('button-bg-primary') : c('border-second')}`,
                  background: meridiem === m ? c('button-bg-primary') : c('bg-med'),
                  color: meridiem === m ? c('bg-low') : c('text-primary'),
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Scrollable picker wheel. Renders all `options` in a vertical
 * scroller with the selected value pinned to the visible row.
 * Click any row to select; the list is keyboard-scrollable too.
 */
function ScrollWheel({
  options,
  value,
  onChange,
  pad,
}: {
  options: number[];
  value: number;
  onChange: (v: number) => void;
  pad?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Scroll the selected row into view when the picker opens.
  useEffect(() => {
    const el = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-wheel-value="${value}"]`
    );
    el?.scrollIntoView({ block: 'center' });
  }, [value]);
  return (
    <div
      ref={containerRef}
      style={{
        width: 48,
        height: 96,
        overflowY: 'auto',
        background: 'transparent',
        scrollbarWidth: 'thin',
      }}
    >
        {options.map((o) => {
          const sel = o === value;
          return (
            <button
              key={o}
              type="button"
              data-wheel-value={o}
              onClick={() => onChange(o)}
              style={{
                ...typeStyle('caption'),
                display: 'block',
                width: '100%',
                height: 22,
                background: sel ? c('button-bg-primary') : 'transparent',
                color: sel ? c('bg-low') : c('text-primary'),
                fontVariantNumeric: 'tabular-nums',
                fontWeight: sel ? 600 : 400,
                cursor: 'pointer',
                border: 'none',
                padding: 0,
              }}
            >
              {pad ? String(o).padStart(2, '0') : o}
            </button>
          );
        })}
    </div>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/**
 * Static reference of the right-click menu. Lines between items,
 * subtle row highlight on hover; matches the in-app context menu.
 */
function ContextMenuStatic() {
  return (
    <div className="space-y-2">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        Static
      </div>
      <div
        style={{
          background: c('bg-low'),
          border: `1px solid ${c('border-second')}`,
          borderRadius: 8,
          padding: 4,
          width: 220,
        }}
      >
        <StaticMenuRow label="Cut" shortcut="⌘X" />
        <StaticMenuRow label="Copy" shortcut="⌘C" hover />
        <StaticMenuRow label="Paste" shortcut="⌘V" />
        <MenuLine />
        <StaticMenuRow label="Move to" chevron />
        <StaticMenuRow label="Delete" destructive />
      </div>
    </div>
  );
}

function StaticMenuRow({
  label,
  shortcut,
  destructive,
  chevron,
  hover,
}: {
  label: string;
  shortcut?: string;
  destructive?: boolean;
  chevron?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      style={{
        ...typeStyle('body'),
        padding: '6px 10px',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: hover ? c('bg-med') : 'transparent',
        color: destructive ? c('error') : c('text-primary'),
      }}
    >
      <span className="flex-1">{label}</span>
      {shortcut && (
        <span style={{ ...typeStyle('caption'), color: c('text-third') }}>
          {shortcut}
        </span>
      )}
      {chevron && (
        <IconChevronRight className="w-3.5 h-3.5" style={{ color: c('text-third') }} />
      )}
    </div>
  );
}

function MenuLine() {
  return (
    <div style={{ height: 1, background: c('border-third'), margin: '4px 0' }} />
  );
}

function ContextMenuLive() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const close = () => setPos(null);
  useEffect(() => {
    if (!pos) return;
    const onClick = () => close();
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [pos]);
  return (
    <div className="space-y-2">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        Functional
      </div>
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          setSubmenuOpen(false);
        }}
        style={{
          position: 'relative',
          height: 200,
          borderRadius: 8,
          border: `1px dashed ${c('border-second')}`,
          background: c('bg-med'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: c('text-third'),
          ...typeStyle('body'),
          textAlign: 'center',
        }}
      >
        <span>
          Right-click here
          {selected && (
            <>
              <br />
              <span style={{ color: c('text-primary') }}>last action: {selected}</span>
            </>
          )}
        </span>
        {pos && (
          <div
            role="menu"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              zIndex: 20,
              background: c('bg-low'),
              border: `1px solid ${c('border-second')}`,
              borderRadius: 8,
              padding: 4,
              minWidth: 200,
            }}
          >
            {[
              ['cut', 'Cut', '⌘X'],
              ['copy', 'Copy', '⌘C'],
              ['paste', 'Paste', '⌘V'],
            ].map(([id, label, shortcut]) => (
              <LiveMenuItem
                key={id}
                label={label}
                shortcut={shortcut}
                onClick={() => {
                  setSelected(label);
                  close();
                }}
              />
            ))}
            <MenuLine />
            <LiveMenuItem
              label="Move to"
              chevron
              submenuOpen={submenuOpen}
              onMouseEnter={() => setSubmenuOpen(true)}
              onMouseLeave={() => setSubmenuOpen(false)}
              onClick={() => setSubmenuOpen((v) => !v)}
            >
              {submenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '100%',
                    background: c('bg-low'),
                    border: `1px solid ${c('border-second')}`,
                    borderRadius: 8,
                    padding: 4,
                    minWidth: 160,
                    marginLeft: 4,
                  }}
                >
                  {['Inbox', 'Archive', 'Trash'].map((s) => (
                    <LiveMenuItem
                      key={s}
                      label={s}
                      onClick={() => {
                        setSelected(`Move to ${s}`);
                        close();
                      }}
                    />
                  ))}
                </div>
              )}
            </LiveMenuItem>
            <LiveMenuItem
              label="Delete"
              destructive
              onClick={() => {
                setSelected('Delete');
                close();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function LiveMenuItem({
  label,
  shortcut,
  onClick,
  destructive,
  chevron,
  submenuOpen,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  destructive?: boolean;
  chevron?: boolean;
  submenuOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const active = hover || !!submenuOpen;
  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => {
        setHover(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setHover(false);
        onMouseLeave?.();
      }}
    >
      <button
        type="button"
        role="menuitem"
        onClick={onClick}
        style={{
          ...typeStyle('body'),
          width: '100%',
          padding: '6px 10px',
          borderRadius: 6,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: active ? c('bg-med') : 'transparent',
          color: destructive ? c('error') : c('text-primary'),
          cursor: 'pointer',
        }}
      >
        <span className="flex-1">{label}</span>
        {shortcut && (
          <span style={{ ...typeStyle('caption'), color: c('text-third') }}>
            {shortcut}
          </span>
        )}
        {chevron && (
          <IconChevronRight className="w-3.5 h-3.5" style={{ color: c('text-third') }} />
        )}
      </button>
      {children}
    </div>
  );
}

// ── Section: Form Controls ────────────────────────────────────

function SectionFormControls() {
  // Two parallel state pairs per control so the expressive (color)
  // and neutral (mono) columns each toggle independently. Viewers
  // can feel both demos without one column re-rendering the other.
  const [aE, setAE] = useState(true);
  const [bE, setBE] = useState(false);
  const [aN, setAN] = useState(true);
  const [bN, setBN] = useState(false);
  const [radioE, setRadioE] = useState('first');
  const [radioN, setRadioN] = useState('first');
  const [sw1E, setSw1E] = useState(true);
  const [sw2E, setSw2E] = useState(false);
  const [sw1N, setSw1N] = useState(true);
  const [sw2N, setSw2N] = useState(false);
  return (
    <Section
      id="form-controls"
      title="Form Controls"
      description="Boolean and multi-choice primitives. Two flavors of each: expressive (color-driven) on the left, neutral (mono) on the right."
    >
      <Group title="Checkboxes">
        <Specimen>
          <div className="grid grid-cols-2 gap-8">
            <ToneColumn label="Expressive">
              <Checkbox tone="expressive" checked={aE} onChange={setAE} label="Option one" />
              <Checkbox tone="expressive" checked={bE} onChange={setBE} label="Option two" />
              <Checkbox tone="expressive" checked={false} onChange={() => {}} label="Option three" disabled />
            </ToneColumn>
            <ToneColumn label="Neutral">
              <Checkbox tone="neutral" checked={aN} onChange={setAN} label="Option one" />
              <Checkbox tone="neutral" checked={bN} onChange={setBN} label="Option two" />
              <Checkbox tone="neutral" checked={false} onChange={() => {}} label="Option three" disabled />
            </ToneColumn>
          </div>
        </Specimen>
      </Group>

      <Group title="Radios">
        <Specimen>
          <div className="grid grid-cols-2 gap-8">
            <ToneColumn label="Expressive">
              {(['first', 'second', 'third'] as const).map((v, i) => (
                <Radio
                  key={v}
                  name="demo-radio-expressive"
                  value={v}
                  tone="expressive"
                  checked={radioE === v}
                  onChange={setRadioE}
                  label={`Option ${['one', 'two', 'three'][i]}`}
                />
              ))}
            </ToneColumn>
            <ToneColumn label="Neutral">
              {(['first', 'second', 'third'] as const).map((v, i) => (
                <Radio
                  key={v}
                  name="demo-radio-neutral"
                  value={v}
                  tone="neutral"
                  checked={radioN === v}
                  onChange={setRadioN}
                  label={`Option ${['one', 'two', 'three'][i]}`}
                />
              ))}
            </ToneColumn>
          </div>
        </Specimen>
      </Group>

      <Group title="Switches" description="Expressive on-state uses green-900 (deepest saturation); neutral uses neutral-100.">
        <Specimen>
          <div className="grid grid-cols-2 gap-8">
            <ToneColumn label="Expressive">
              <Switch tone="expressive" checked={sw1E} onChange={setSw1E} label="Option one" />
              <Switch tone="expressive" checked={sw2E} onChange={setSw2E} label="Option two" />
              <Switch tone="expressive" checked={false} onChange={() => {}} label="Option three" disabled />
            </ToneColumn>
            <ToneColumn label="Neutral">
              <Switch tone="neutral" checked={sw1N} onChange={setSw1N} label="Option one" />
              <Switch tone="neutral" checked={sw2N} onChange={setSw2N} label="Option two" />
              <Switch tone="neutral" checked={false} onChange={() => {}} label="Option three" disabled />
            </ToneColumn>
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

type ControlTone = 'expressive' | 'neutral';

/** Subtle column header used inside the form-control specimens to
 *  label the expressive / neutral split. Same vocabulary as the
 *  pill-size and dropdown-size columns elsewhere in the system. */
function ToneColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        {label}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  tone = 'neutral',
  forceOutline,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  disabled?: boolean;
  tone?: ControlTone;
  /** Override the resting (unchecked) outline color. Used by the
   *  sortable color-row where the system border-second melts into
   *  the row background. */
  forceOutline?: string;
}) {
  // Expressive uses the brand green for the filled state; neutral
  // uses the brightest neutral so checkboxes stay visible without
  // ever pulling color into a strictly utilitarian context.
  const fill = tone === 'expressive' ? rampValue('green', 800) : rampValue('neutral', 100);
  // Both expressive (green fill) and neutral (white fill) read
  // best with a black checkmark — the green is light enough that
  // a white tick blew out against it.
  const checkColor = '#0a0a0a';
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          // Slightly lower corner radius per feedback.
          borderRadius: 3,
          background: disabled
            ? c('bg-high')
            : checked
              ? fill
              : 'transparent',
          border: `1.5px solid ${
            disabled
              ? c('border-third')
              : checked
                ? fill
                : (forceOutline ?? c('border-second'))
          }`,
          color: checkColor,
          opacity: disabled ? 0.5 : 1,
          transition: 'background 80ms, border-color 80ms',
        }}
      >
        {checked && (
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden>
            <path
              d="M3 8.5l3.5 3.5L13 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        style={{
          ...typeStyle('body'),
          color: disabled ? c('text-third') : c('text-primary'),
        }}
      >
        {label}
      </span>
    </label>
  );
}

function Radio({
  name,
  value,
  checked,
  onChange,
  label,
  tone = 'neutral',
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  label: string;
  tone?: ControlTone;
}) {
  const ringChecked =
    tone === 'expressive' ? rampValue('green', 800) : rampValue('neutral', 100);
  const dotColor = ringChecked;
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          borderRadius: 9999,
          border: `1.5px solid ${checked ? ringChecked : c('border-second')}`,
          background: 'transparent',
        }}
      >
        {checked && (
          <span
            // Inner dot expanded; less inset from the outer ring.
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: dotColor,
            }}
          />
        )}
      </span>
      <span style={{ ...typeStyle('body'), color: c('text-primary') }}>{label}</span>
    </label>
  );
}

function Switch({
  checked,
  onChange,
  label,
  disabled,
  tone = 'neutral',
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  disabled?: boolean;
  tone?: ControlTone;
}) {
  // Expressive on-state pulled to green-900 per design feedback —
  // most-saturated step in the green ramp. Neutral on-state uses
  // the brightest neutral so the affordance reads without color.
  const onFill = tone === 'expressive' ? rampValue('green', 900) : rampValue('neutral', 100);
  // Knob fills:
  //   - Expressive on-state: bright knob (neutral 100) against the
  //     deep green track.
  //   - Neutral on-state: dark knob (neutral 700) against the bright
  //     white track — the previous all-white knob blended in.
  //   - Expressive off-state: solid neutral so it reads against the
  //     dark transparent track.
  //   - Neutral off-state: hollow ring (transparent fill + visible
  //     border). A solid neutral knob there read like an empty black
  //     dot and didn't telegraph "this is a switch you can flip".
  const knobOnColor =
    tone === 'expressive' ? rampValue('neutral', 100) : rampValue('neutral', 700);
  const expressiveOffKnob = rampValue('neutral', 100);
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          width: 40,
          height: 24,
          borderRadius: 9999,
          padding: 2,
          background: disabled
            ? c('bg-high')
            : checked
              ? onFill
              : 'transparent',
          border: `1.5px solid ${
            disabled
              ? c('border-third')
              : checked
                ? onFill
                : c('border-second')
          }`,
          opacity: disabled ? 0.5 : 1,
          transition: 'background 120ms, border-color 120ms',
        }}
      >
        {/* Knob. When ON, expand to 18×18 (1px more in every
            direction) so it nearly fills the 20×20 inner space.
            Outer dimensions (24×24) are unchanged; the wrapper's
            2px padding shrinks toward 1px to make room. Off-state
            keeps the smaller 16×16 ring/dot. */}
        <span
          style={{
            display: 'block',
            width: checked ? 18 : 16,
            height: checked ? 18 : 16,
            margin: checked ? -1 : 0,
            borderRadius: 9999,
            background: checked
              ? knobOnColor
              : tone === 'expressive'
                ? expressiveOffKnob
                : 'transparent',
            border:
              !checked && tone === 'neutral'
                ? `1.5px solid ${c('border-second')}`
                : 'none',
            boxSizing: 'border-box',
            transform: `translateX(${checked ? 16 : 0}px)`,
            transition:
              'transform 140ms cubic-bezier(0.4,0,0.2,1), background 120ms, width 120ms, height 120ms, margin 120ms',
          }}
        />
      </span>
      <span
        style={{
          ...typeStyle('body'),
          color: disabled ? c('text-third') : c('text-primary'),
        }}
      >
        {label}
      </span>
    </label>
  );
}

// ── Section: Chips & Tags ─────────────────────────────────────

type ChipState = 'neutral' | 'include' | 'exclude';

const PRIMARY_CHIP_FAMILIES: { id: RampFamily; label: string }[] = [
  { id: 'green', label: 'Green' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'orange', label: 'Orange' },
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue' },
  { id: 'purple', label: 'Purple' },
];

function SectionChipsAndTags() {
  return (
    <Section
      id="chips"
      title="Chips & Tags"
      description="Pill-shaped tags. Filters, labels, and status badges."
    >
      <Group title="Primary Key Chips" description="Three-state cycle: neutral, include, exclude. Click to advance.">
        <Specimen>
          <PrimaryKeyChips />
        </Specimen>
      </Group>

      <Group title="Secondary Key Chips" description="Same colors, outlined. The outline white-border chip lives in this group at the end.">
        <Specimen>
          <SecondaryKeyChips />
        </Specimen>
      </Group>

      <Group title="Sort Chips">
        <Specimen>
          <SortChips />
        </Specimen>
      </Group>

      <Group title="Status & Count Badges">
        <Specimen>
          {/* 2px gap per design feedback — same density as the
              primary key chips so the vocab feels consistent. */}
          <div className="flex items-center" style={{ gap: 2 }}>
            <Badge tone="neutral">Draft</Badge>
            <Badge tone="primary">Published</Badge>
            <Badge tone="success">4 New</Badge>
            <Badge tone="error">3 Failed</Badge>
          </div>
        </Specimen>
      </Group>

      <Group title="Calendar Chips" description="Two orientations side by side. Horizontal (rows view) on the left, vertical (columns view) on the right. The vertical chips show how the title stays pinned top-left as the chip's height grows.">
        <Specimen>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2 max-w-md">
              <div
                style={{ ...typeStyle('footnote'), color: c('text-third') }}
                className="uppercase tracking-wide"
              >
                Horizontal
              </div>
              <div className="space-y-2">
                <AthoItem categoryId="sprint" label="Item A" durationMinutes={30} />
                <AthoItem categoryId="distance" label="Item B" durationMinutes={45} />
                <AthoItem categoryId="hurdles" label="Long Sample Label" durationMinutes={30} />
                <AthoItem categoryId="throws" label="Sample Item" durationMinutes={60} />
                <AthoItem categoryId="jumps" label="Another Item" durationMinutes={60} />
                <AthoItem categoryId="relay" label="Brief" durationMinutes={30} />
                <AthoItem categoryId="sprint" label="Outlined Sample" durationMinutes={45} outlined />
                <BaseChip color={ramp('green', 700)} label="(empty)" durationMinutes={30} empty />
              </div>
            </div>
            <div className="space-y-2">
              <div
                style={{ ...typeStyle('footnote'), color: c('text-third') }}
                className="uppercase tracking-wide"
              >
                Vertical
              </div>
              <VerticalChipGrid />
            </div>
          </div>
        </Specimen>
      </Group>

      <Group title="Indicator Chips" description="Calendar chip with a black corner dot, in every accent color.">
        <Specimen>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
            style={{ gap: 2 }}
          >
            {PRIMARY_CHIP_FAMILIES.map(({ id }) => (
              <DotChip key={id} family={id} />
            ))}
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

/**
 * Grid of vertical calendar chips at multiple heights and accent
 * colors. Shows how the title pins to the top-left as the chip
 * vertical extent grows — the visual rule for the columns-view
 * calendar chips.
 */
function VerticalChipGrid() {
  // Wide enough that the title doesn't truncate but narrow enough
  // that several fit on a desktop. Heights pick a small / medium /
  // large pair across categories.
  const items: { cat: 'sprint' | 'distance' | 'hurdles' | 'throws' | 'jumps' | 'relay'; label: string; h: number }[] = [
    { cat: 'sprint', label: 'Item A', h: 48 },
    { cat: 'distance', label: 'Item B', h: 96 },
    { cat: 'hurdles', label: 'Long Sample Label', h: 72 },
    { cat: 'throws', label: 'Sample Item', h: 156 },
    { cat: 'jumps', label: 'Another Item', h: 120 },
    { cat: 'relay', label: 'Brief', h: 60 },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 items-start">
      {items.map((it, i) => (
        <VerticalChip key={i} categoryId={it.cat} label={it.label} height={it.h} />
      ))}
    </div>
  );
}

/** Single vertical-orientation calendar chip. Solid category fill,
 *  black ink border, title top-left, content area expands downward. */
function VerticalChip({
  categoryId,
  label,
  height,
}: {
  categoryId: 'sprint' | 'distance' | 'hurdles' | 'throws' | 'jumps' | 'relay';
  label: string;
  height: number;
}) {
  const colorMap: Record<typeof categoryId, RampFamily> = {
    sprint: 'orange',
    distance: 'red',
    hurdles: 'yellow',
    throws: 'blue',
    jumps: 'purple',
    relay: 'green',
  };
  const bg = ramp(colorMap[categoryId], 700);
  return (
    <div
      style={{
        height,
        background: bg,
        border: '1px solid #0a0a0a',
        borderRadius: 6,
        padding: '6px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: '#0a0a0a',
        ...typeStyle('caption'),
        fontWeight: 600,
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          lineHeight: '14px',
          textAlign: 'left',
          whiteSpace: 'normal',
          overflowWrap: 'break-word',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function PrimaryKeyChips() {
  const [state, setState] = useState<Record<string, ChipState>>({});
  const cycle = (id: string) =>
    setState((s) => {
      const cur = s[id] ?? 'neutral';
      const next: ChipState =
        cur === 'neutral' ? 'include' : cur === 'include' ? 'exclude' : 'neutral';
      return { ...s, [id]: next };
    });
  // 2px gap per design feedback — chips read as a tight strip when
  // primary, distinct from the more breathing room secondary set.
  return (
    <div className="flex flex-wrap" style={{ gap: 2 }}>
      {PRIMARY_CHIP_FAMILIES.map((ch) => (
        <KeyChip
          key={ch.id}
          family={ch.id}
          label={ch.label}
          state={state[ch.id] ?? 'neutral'}
          onClick={() => cycle(ch.id)}
        />
      ))}
    </div>
  );
}

function SecondaryKeyChips() {
  const [state, setState] = useState<Record<string, ChipState>>({});
  const cycle = (id: string) =>
    setState((s) => {
      const cur = s[id] ?? 'neutral';
      const next: ChipState =
        cur === 'neutral' ? 'include' : cur === 'include' ? 'exclude' : 'neutral';
      return { ...s, [id]: next };
    });
  return (
    <div className="flex flex-wrap gap-1.5">
      {PRIMARY_CHIP_FAMILIES.map((ch) => (
        <KeyChip
          key={ch.id}
          family={ch.id}
          label={ch.label}
          state={state[ch.id] ?? 'neutral'}
          outlined
          onClick={() => cycle(ch.id)}
        />
      ))}
      <OutlineWhiteChip />
    </div>
  );
}

function KeyChip({
  family,
  label,
  state,
  outlined,
  onClick,
}: {
  family: RampFamily;
  label: string;
  state: ChipState;
  outlined?: boolean;
  onClick?: () => void;
}) {
  // Yellow's anchor is 700; for accent chips we render at the canonical
  // 700 step regardless. Strikethrough on exclude.
  const accentColor = ramp(family, 700);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={state !== 'neutral'}
      style={{
        ...typeStyle('caption'),
        display: 'inline-flex',
        alignItems: 'center',
        height: 22,
        padding: '0 8px',
        borderRadius: 4,
        background: outlined ? 'transparent' : accentColor,
        border: `1.5px solid ${outlined ? accentColor : '#0a0a0a'}`,
        color: outlined ? accentColor : '#0a0a0a',
        fontWeight: 700,
        cursor: onClick ? 'pointer' : 'default',
        opacity: state === 'exclude' ? 0.5 : 1,
        textDecoration: state === 'exclude' ? 'line-through' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function OutlineWhiteChip() {
  return (
    <span
      style={{
        ...typeStyle('caption'),
        display: 'inline-flex',
        alignItems: 'center',
        height: 22,
        padding: '0 8px',
        borderRadius: 4,
        border: `1.5px solid ${c('text-primary')}`,
        color: c('text-primary'),
        background: 'transparent',
        fontWeight: 700,
      }}
    >
      Outline
    </span>
  );
}

function SortChips() {
  const [active, setActive] = useState('group');
  const opts = [
    ['status', 'Status'],
    ['group', 'Group'],
    ['first', 'First'],
    ['last', 'Last'],
    ['value', 'Value'],
  ];
  // Reduced gap by 2px (gap-1 = 4px instead of gap-2 = 8px).
  return (
    <div className="flex flex-wrap" style={{ gap: 4 }}>
      {opts.map(([id, label]) => {
        const sel = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            style={{
              ...typeStyle('caption'),
              padding: '4px 10px',
              borderRadius: 4,
              border: `1px solid ${sel ? c('button-bg-primary') : c('border-second')}`,
              background: sel ? c('button-bg-primary') : 'transparent',
              color: sel ? c('bg-low') : c('text-second'),
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: 'neutral' | 'primary' | 'success' | 'error';
  children: React.ReactNode;
}) {
  const styles: Record<typeof tone, React.CSSProperties> = {
    neutral: { background: c('bg-high'), color: c('text-third') },
    primary: { background: c('button-bg-primary'), color: c('bg-low') },
    success: { background: c('success'), color: '#0a0a0a' },
    error: { background: c('error'), color: '#FFFFFF' },
  };
  return (
    <span
      style={{
        ...typeStyle('footnote'),
        padding: '2px 8px',
        borderRadius: 4,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        ...styles[tone],
      }}
    >
      {children}
    </span>
  );
}

function DotChip({ family }: { family: RampFamily }) {
  const DOT = 5.4;
  const color = ramp(family, family === 'yellow' ? 100 : 700);
  return (
    <div
      style={{
        position: 'relative',
        height: 26,
        borderRadius: 6,
        background: color,
        border: `1px solid #0a0a0a`,
        color: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
      }}
    >
      <span style={{ ...typeStyle('footnote'), fontWeight: 600 }}>Item</span>
      <span
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          width: DOT,
          height: DOT,
          borderRadius: 9999,
          background: '#0a0a0a',
        }}
      />
    </div>
  );
}

// ── Section: Standard Tabs ────────────────────────────────────

function SectionStandardTabs() {
  const [tabLg, setTabLg] = useState('day1');
  const [tabMd, setTabMd] = useState('day1');
  const [tabSm, setTabSm] = useState('day1');
  return (
    <Section
      id="tabs"
      title="Standard Tabs"
      description="Underline tabs in three sizes. Selected weight is constant; only color changes so siblings don't shift."
    >
      <Group title="Standard Tabs">
        <Specimen>
          <div className="space-y-6">
            <UnderlineTabs size="lg" value={tabLg} onChange={setTabLg} />
            <UnderlineTabs size="md" value={tabMd} onChange={setTabMd} />
            <UnderlineTabs size="sm" value={tabSm} onChange={setTabSm} />
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

function UnderlineTabs({
  size,
  value,
  onChange,
}: {
  size: BtnSize;
  value: string;
  onChange: (v: string) => void;
}) {
  const fs: keyof typeof TYPE_SCALE =
    size === 'lg' ? 'title3' : size === 'md' ? 'callout' : 'body';
  const pb = size === 'lg' ? 14 : size === 'md' ? 12 : 8;
  const gap = size === 'lg' ? 32 : size === 'md' ? 24 : 18;
  // Border-second so the underline reads more clearly than the
  // subtle border-third dividers used elsewhere.
  return (
    <div style={{ borderBottom: `1px solid ${c('border-second')}` }}>
      <div className="flex" style={{ gap }}>
        {[
          ['day1', 'Saturday'],
          ['day2', 'Sunday'],
          ['day3', 'Monday'],
        ].map(([id, label]) => {
          const sel = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              style={{
                ...typeStyle(fs),
                paddingBottom: pb,
                marginBottom: -1,
                borderBottom: `2px solid ${sel ? c('text-primary') : 'transparent'}`,
                color: sel ? c('text-primary') : c('text-third'),
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Section: Cards ────────────────────────────────────────────

function SectionCards() {
  return (
    <Section
      id="cards"
      title="Cards"
      description="Container shapes for list rows and dashboards. Top-left aligned text, consistent padding."
    >
      <Group title="Primary Cards">
        <Specimen>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <CardSolid />
            <CardOutlined />
            <CardImage />
            <CardEmpty />
          </div>
        </Specimen>
      </Group>

      <Group title="Stats Cards">
        <Specimen>
          <div className="flex flex-wrap items-start gap-3">
            <StatsCard size="lg" label="Members" value={1248} hint="across 100 groups" />
            <StatsCard size="md" label="Members" value={1248} hint="across 100 groups" />
            <StatsCard size="sm" label="Members" value={1248} hint="across 100 groups" />
            <StatsSimple value={1248} description="across 100 groups" />
          </div>
        </Specimen>
      </Group>

      <Group title="Stats Cards With Charts" description="Hover anywhere over a card (chart or headline) to see the value at that point. The headline snaps to the hovered point and returns to its rest value when the cursor leaves. Cards animate into view with a 300ms cubic-ease-out and a small stagger across the group.">
        <Specimen>
          <div className="space-y-6">
            <RowSpecLabel>Line Chart · Expressive vs Neutral</RowSpecLabel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <ScrollIn delay={0}>
                <StatsLineCard
                  label="Active members"
                  hint="last 8 weeks"
                  tone="expressive"
                  accent="green"
                />
              </ScrollIn>
              <ScrollIn delay={70}>
                <StatsLineCard
                  label="Active members"
                  hint="last 8 weeks"
                  tone="neutral"
                />
              </ScrollIn>
            </div>

            <RowSpecLabel>Line Chart · Multi-Stat</RowSpecLabel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <ScrollIn delay={0}>
                <StatsLineMultiCard tone="expressive" />
              </ScrollIn>
              <ScrollIn delay={70}>
                <StatsLineMultiCard tone="neutral" />
              </ScrollIn>
            </div>

            <RowSpecLabel>Line Chart · Small</RowSpecLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ScrollIn delay={0}>
                <StatsLineCard
                  label="Members"
                  tone="expressive"
                  accent="green"
                  size="sm"
                />
              </ScrollIn>
              <ScrollIn delay={60}>
                <StatsLineCard
                  label="Practices"
                  tone="expressive"
                  accent="blue"
                  size="sm"
                />
              </ScrollIn>
              <ScrollIn delay={120}>
                <StatsLineCard
                  label="Drills"
                  tone="expressive"
                  accent="orange"
                  size="sm"
                />
              </ScrollIn>
              <ScrollIn delay={180}>
                <StatsLineCard label="Splits" tone="neutral" size="sm" />
              </ScrollIn>
            </div>

            <RowSpecLabel>Bar Chart</RowSpecLabel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <ScrollIn delay={0}>
                <StatsBarCard
                  label="New signups"
                  hint="last 8 weeks"
                  tone="expressive"
                  accent="green"
                />
              </ScrollIn>
              <ScrollIn delay={70}>
                <StatsBarCard
                  label="New signups"
                  hint="last 8 weeks"
                  tone="neutral"
                />
              </ScrollIn>
            </div>

            <RowSpecLabel>Horizontal Bars · Top categories</RowSpecLabel>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <ScrollIn delay={0}>
                <StatsHorizontalBarsCard tone="expressive" />
              </ScrollIn>
              <ScrollIn delay={70}>
                <StatsHorizontalBarsCard tone="neutral" />
              </ScrollIn>
            </div>

            <RowSpecLabel>Gauge + Pie</RowSpecLabel>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <ScrollIn delay={0}>
                <StatsGaugeCard
                  label="Goal · Active"
                  value={68}
                  tone="expressive"
                  accent="green"
                />
              </ScrollIn>
              <ScrollIn delay={70}>
                <StatsGaugeCard
                  label="Goal · Active"
                  value={68}
                  tone="neutral"
                />
              </ScrollIn>
              <ScrollIn delay={140}>
                <StatsPieCard tone="expressive" />
              </ScrollIn>
            </div>
          </div>
        </Specimen>
      </Group>

      <Group title="Button Cards">
        <Specimen>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <ButtonGridCard />
            <ButtonInlineCard />
            <ButtonRightActionCard />
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

function CardSolid() {
  return (
    <button
      type="button"
      style={{
        textAlign: 'left',
        padding: 16,
        borderRadius: 12,
        background: c('button-bg-primary'),
        color: c('bg-low'),
        // Explicit flex column so the contents anchor to the top-left
        // corner of the card rather than vertically centering inside
        // the button (which is the user-agent default for buttons).
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 140,
      }}
    >
      <div style={{ ...typeStyle('callout'), fontWeight: 600 }}>Sample Title</div>
      <div
        style={{
          ...typeStyle('bodySmall'),
          color: c('bg-low'),
          opacity: 0.65,
          marginTop: 2,
        }}
      >
        Two-line description fits here for context.
      </div>
    </button>
  );
}

function CardOutlined() {
  return (
    <button
      type="button"
      style={{
        textAlign: 'left',
        padding: 16,
        borderRadius: 12,
        border: `1px solid ${c('border-third')}`,
        background: c('bg-med'),
        color: c('text-primary'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 140,
      }}
    >
      <div style={{ ...typeStyle('callout'), fontWeight: 600 }}>Sample Title</div>
      <div
        style={{ ...typeStyle('bodySmall'), color: c('text-third'), marginTop: 2 }}
      >
        Two-line description fits here for context.
      </div>
    </button>
  );
}

function CardImage() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        height: 140,
        background: `linear-gradient(135deg, ${ramp('blue', 700)} 0%, ${ramp('purple', 700)} 100%)`,
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      <div style={{ position: 'absolute', left: 16, top: 16, right: 16 }}>
        <div style={{ ...typeStyle('callout'), fontWeight: 600 }}>Sample Title</div>
        <div style={{ ...typeStyle('bodySmall'), opacity: 0.85, marginTop: 2 }}>
          Two-line description fits here for context.
        </div>
      </div>
    </div>
  );
}

function CardEmpty() {
  return (
    <button
      type="button"
      style={{
        textAlign: 'left',
        padding: 16,
        borderRadius: 12,
        border: `1.5px dashed ${c('border-second')}`,
        background: 'transparent',
        color: c('text-third'),
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 140,
      }}
    >
      <IconPlus className="w-5 h-5" />
      <div
        style={{
          ...typeStyle('callout'),
          // Lower font weight + dimmer color per feedback.
          fontWeight: 400,
          color: c('text-third'),
        }}
      >
        New
      </div>
    </button>
  );
}

function StatsCard({
  size,
  label,
  value,
  hint,
}: {
  size: BtnSize;
  label: string;
  value: number;
  hint?: string;
}) {
  const padding = size === 'lg' ? 20 : size === 'md' ? 16 : 12;
  const titleStyle: keyof typeof TYPE_SCALE =
    size === 'lg' ? 'largeTitle' : size === 'md' ? 'title2' : 'title3';
  return (
    <div
      style={{
        padding,
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        // Hug content width.
        display: 'inline-block',
      }}
    >
      <div
        style={{
          ...typeStyle('caption'),
          color: c('text-third'),
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </div>
      <div
        style={{
          ...typeStyle(titleStyle),
          color: c('text-primary'),
          marginTop: 4,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value.toLocaleString()}
      </div>
      {hint && (
        <div
          style={{ ...typeStyle('footnote'), color: c('text-third'), marginTop: 2 }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

type StatsTone = 'expressive' | 'neutral';

/** Resolve the line / fill color for the chart based on tone +
 *  optional accent family (only relevant for expressive). */
function statsAccent(tone: StatsTone, accent: RampFamily): string {
  return tone === 'expressive' ? rampValue(accent, 700) : rampValue('neutral', 100);
}

/* ── Scroll-into-view animation primitive ─────────────────────
 *
 * `ScrollIn` fades + slides each child into place the first time
 * its element scrolls past the viewport's intersection threshold.
 * Cubic ease-out over 300ms; the parent passes a `delay` to
 * stagger consecutive cards. After the first reveal the element
 * stays mounted in its visible state so re-scrolling doesn't
 * replay the animation. */

function useScrollIn(delay: number = 0): {
  ref: React.RefObject<HTMLDivElement>;
  shown: boolean;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shown, delay]);
  return { ref, shown };
}

function ScrollIn({
  delay = 0,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const { ref, shown } = useScrollIn(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(14px)',
        transition:
          'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stats card with an interactive line chart. Hovering ANYWHERE over
 * the card (not just the chart) updates the headline number to the
 * value under the cursor's horizontal position; the dot on the line
 * follows. Mousing out reverts to the card's "current" (rightmost)
 * value. The dot is sized larger and the SVG uses overflow:visible
 * so the rightmost marker isn't clipped at the card's edge.
 */
function StatsLineCard({
  label,
  hint,
  tone = 'neutral',
  accent = 'green',
  size = 'md',
}: {
  label: string;
  hint?: string;
  tone?: StatsTone;
  accent?: RampFamily;
  /** 'md' = full card with hint + 8wk axis. 'sm' = compact card for
   *  dashboards; same chart, no hint, smaller headline. */
  size?: 'md' | 'sm';
}) {
  const data = [
    18, 22, 19, 26, 23, 28, 24, 30, 27, 32, 35, 31,
    36, 41, 38, 44, 47, 43, 49, 52, 48, 55, 60, 58,
  ];
  const lineColor = statsAccent(tone, accent);
  const fillColor = lineColor;
  const restingValue = data[data.length - 1];
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const value = hoverIdx == null ? restingValue : data[hoverIdx];
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Whole-card hover tracking: convert clientX → an index into the
  // sample array. The chart's onMouseMove will keep doing the same
  // thing, but here we extend it to the title/headline area too.
  const handleMove = (clientX: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const idx = Math.round(ratio * (data.length - 1));
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
  };

  const isSmall = size === 'sm';
  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={() => setHoverIdx(null)}
      style={{
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        padding: isSmall ? 14 : 20,
        display: 'flex',
        flexDirection: 'column',
        gap: isSmall ? 10 : 16,
        minWidth: isSmall ? 140 : 240,
      }}
    >
      <div>
        <div
          style={{
            ...typeStyle(isSmall ? 'footnote' : 'caption'),
            color: c('text-third'),
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </div>
        <div
          style={{
            ...typeStyle(isSmall ? 'title3' : 'largeTitle'),
            color: c('text-primary'),
            fontVariantNumeric: 'tabular-nums',
            marginTop: 2,
          }}
        >
          {value.toLocaleString()}
        </div>
        {hint && !isSmall && (
          <div
            style={{ ...typeStyle('footnote'), color: c('text-third'), marginTop: 2 }}
          >
            {hint}
          </div>
        )}
      </div>
      <SparkLine
        data={data}
        lineColor={lineColor}
        fillColor={fillColor}
        hoverIdx={hoverIdx}
        onHoverIdx={setHoverIdx}
        height={isSmall ? 48 : 80}
      />
    </div>
  );
}

/**
 * Multi-stat line chart. Two or three series rendered on the same
 * axes, each with its own colored line + headline. Sharing a single
 * card lets a viewer compare related metrics at a glance. Hover
 * anywhere over the card updates ALL headline values to the same
 * x-position so they read together.
 */
function StatsLineMultiCard({ tone }: { tone: StatsTone }) {
  // Three correlated series.
  const series = useMemo(
    () => [
      {
        label: 'Members',
        data: [
          18, 22, 19, 26, 23, 28, 24, 30, 27, 32, 35, 31,
          36, 41, 38, 44, 47, 43, 49, 52, 48, 55, 60, 58,
        ],
        accent: 'green' as RampFamily,
      },
      {
        label: 'Practices',
        data: [
          12, 14, 13, 16, 14, 18, 17, 20, 19, 23, 22, 25,
          24, 27, 26, 30, 29, 33, 31, 36, 34, 39, 41, 40,
        ],
        accent: 'blue' as RampFamily,
      },
      {
        label: 'Coaches',
        data: [
          5, 6, 5, 7, 7, 8, 8, 9, 9, 10, 10, 11,
          11, 12, 12, 13, 14, 14, 15, 16, 16, 17, 18, 18,
        ],
        accent: 'orange' as RampFamily,
      },
    ],
    []
  );
  const colorFor = (s: { accent: RampFamily }) =>
    tone === 'expressive'
      ? rampValue(s.accent, 700)
      : rampValue('neutral', 100);
  // Use the lightest neutral for the second + third when neutral so
  // they don't all blur into one strand. Step through the neutral
  // ramp instead.
  const neutralStep = (i: number) =>
    rampValue('neutral', i === 0 ? 100 : i === 1 ? 400 : 500);
  const lineColors = series.map((s, i) =>
    tone === 'expressive' ? colorFor(s) : neutralStep(i)
  );
  const length = series[0].data.length;
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const handleMove = (clientX: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const idx = Math.round(ratio * (length - 1));
    setHoverIdx(Math.max(0, Math.min(length - 1, idx)));
  };
  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={() => setHoverIdx(null)}
      style={{
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minWidth: 280,
      }}
    >
      <div className="flex flex-wrap items-baseline" style={{ gap: 16 }}>
        {series.map((s, i) => {
          const idx = hoverIdx ?? s.data.length - 1;
          const v = s.data[idx];
          return (
            <div key={s.label}>
              <div
                style={{
                  ...typeStyle('footnote'),
                  color: c('text-third'),
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 9999,
                    background: lineColors[i],
                    display: 'inline-block',
                  }}
                />
                {s.label}
              </div>
              <div
                style={{
                  ...typeStyle('title3'),
                  color: c('text-primary'),
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {v.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
      <SparkLineMulti
        series={series.map((s, i) => ({ data: s.data, color: lineColors[i] }))}
        hoverIdx={hoverIdx}
        onHoverIdx={setHoverIdx}
      />
    </div>
  );
}

/** Bar chart stats card. Hovering ANYWHERE over the card highlights
 *  the bar at the cursor's x-position and snaps the headline number
 *  to that bar's value; every other bar dims to neutral 600. Mousing
 *  out reverts to the rightmost bar. */
function StatsBarCard({
  label,
  hint,
  tone = 'neutral',
  accent = 'green',
}: {
  label: string;
  hint?: string;
  tone?: StatsTone;
  accent?: RampFamily;
}) {
  const data = [
    8, 11, 9, 14, 12, 16, 13, 19, 17, 22, 25, 21,
    27, 30, 28, 33, 36, 32, 39, 42, 38, 45, 50, 48,
  ];
  const restingValue = data[data.length - 1];
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const value = hoverIdx == null ? restingValue : data[hoverIdx];
  const activeColor =
    tone === 'expressive' ? rampValue(accent, 700) : rampValue('neutral', 100);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const handleMove = (clientX: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const idx = Math.round(ratio * (data.length - 1));
    setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
  };
  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={() => setHoverIdx(null)}
      style={{
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minWidth: 240,
      }}
    >
      <div>
        <div
          style={{
            ...typeStyle('caption'),
            color: c('text-third'),
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </div>
        <div
          style={{
            ...typeStyle('largeTitle'),
            color: c('text-primary'),
            fontVariantNumeric: 'tabular-nums',
            marginTop: 4,
          }}
        >
          {value.toLocaleString()}
        </div>
        {hint && (
          <div
            style={{ ...typeStyle('footnote'), color: c('text-third'), marginTop: 2 }}
          >
            {hint}
          </div>
        )}
      </div>
      <SparkBars
        data={data}
        activeColor={activeColor}
        hoverIdx={hoverIdx}
        onHoverIdx={setHoverIdx}
      />
    </div>
  );
}

/* ── Horizontal bars ───────────────────────────────────────────── */

function StatsHorizontalBarsCard({ tone }: { tone: StatsTone }) {
  const items = [
    { label: 'Sprint', value: 312, accent: 'green' as RampFamily },
    { label: 'Distance', value: 248, accent: 'blue' as RampFamily },
    { label: 'Throws', value: 184, accent: 'orange' as RampFamily },
    { label: 'Jumps', value: 156, accent: 'purple' as RampFamily },
    { label: 'Hurdles', value: 92, accent: 'red' as RampFamily },
  ];
  const total = items.reduce((sum, x) => sum + x.value, 0);
  const max = Math.max(...items.map((x) => x.value));
  return (
    <div
      style={{
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minWidth: 240,
      }}
    >
      <div>
        <div
          style={{
            ...typeStyle('caption'),
            color: c('text-third'),
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Top categories
        </div>
        <div
          style={{
            ...typeStyle('largeTitle'),
            color: c('text-primary'),
            fontVariantNumeric: 'tabular-nums',
            marginTop: 4,
          }}
        >
          {total.toLocaleString()}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it) => {
          const pct = (it.value / max) * 100;
          const color =
            tone === 'expressive'
              ? rampValue(it.accent, 700)
              : rampValue('neutral', 400);
          return (
            <div key={it.label}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 4,
                  ...typeStyle('caption'),
                  color: c('text-primary'),
                }}
              >
                <span>{it.label}</span>
                <span
                  style={{
                    color: c('text-third'),
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {it.value}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 9999,
                  background: rampValue('neutral', 700),
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: color,
                    borderRadius: 9999,
                    transition: 'width 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Gauge ──────────────────────────────────────────────────────── */

function StatsGaugeCard({
  label,
  value,
  tone,
  accent = 'green',
}: {
  label: string;
  value: number;
  tone: StatsTone;
  accent?: RampFamily;
}) {
  // Half-circle arc, 0..100. Stroke is the active color from value=0
  // up to `value`, then track color the rest.
  const v = Math.max(0, Math.min(100, value));
  const radius = 64;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - v / 100);
  const color =
    tone === 'expressive' ? rampValue(accent, 700) : rampValue('neutral', 100);
  return (
    <div
      style={{
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        minWidth: 200,
      }}
    >
      <div
        style={{
          ...typeStyle('caption'),
          color: c('text-third'),
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          alignSelf: 'flex-start',
        }}
      >
        {label}
      </div>
      <svg viewBox="0 0 160 90" width="100%" height={90}>
        <path
          d={`M 16 80 A ${radius} ${radius} 0 0 1 144 80`}
          fill="none"
          stroke={rampValue('neutral', 700)}
          strokeWidth={12}
          strokeLinecap="round"
        />
        <path
          d={`M 16 80 A ${radius} ${radius} 0 0 1 144 80`}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <text
          x={80}
          y={72}
          textAnchor="middle"
          style={{
            fontFamily: 'inherit',
            ...typeStyle('title2'),
            fill: c('text-primary'),
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {v}%
        </text>
      </svg>
    </div>
  );
}

/* ── Pie chart ──────────────────────────────────────────────────── */

function StatsPieCard({ tone }: { tone: StatsTone }) {
  const slices = [
    { label: 'Sprint', value: 38, accent: 'green' as RampFamily },
    { label: 'Distance', value: 26, accent: 'blue' as RampFamily },
    { label: 'Throws', value: 18, accent: 'orange' as RampFamily },
    { label: 'Jumps', value: 12, accent: 'purple' as RampFamily },
    { label: 'Hurdles', value: 6, accent: 'red' as RampFamily },
  ];
  const total = slices.reduce((s, x) => s + x.value, 0);
  const colorFor = (s: { accent: RampFamily }, i: number) =>
    tone === 'expressive'
      ? rampValue(s.accent, 700)
      : rampValue('neutral', i === 0 ? 100 : i === 1 ? 300 : i === 2 ? 400 : i === 3 ? 500 : 600);
  // SVG donut. Compute each slice as an arc.
  const radius = 50;
  const cx = 60;
  const cy = 60;
  let angle = -Math.PI / 2;
  const arcs = slices.map((s, i) => {
    const portion = s.value / total;
    const start = angle;
    const end = angle + portion * 2 * Math.PI;
    angle = end;
    const x1 = cx + Math.cos(start) * radius;
    const y1 = cy + Math.sin(start) * radius;
    const x2 = cx + Math.cos(end) * radius;
    const y2 = cy + Math.sin(end) * radius;
    const large = portion > 0.5 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
    return { d, color: colorFor(s, i), label: s.label, value: s.value };
  });
  return (
    <div
      style={{
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        padding: 20,
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        minWidth: 240,
      }}
    >
      <svg viewBox="0 0 120 120" width={120} height={120}>
        {arcs.map((a, i) => (
          <path key={i} d={a.d} fill={a.color} stroke={c('bg-med')} strokeWidth={1} />
        ))}
        {/* Inner punch for a donut feel. */}
        <circle cx={cx} cy={cy} r={26} fill={c('bg-med')} />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {arcs.map((a, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              ...typeStyle('caption'),
              color: c('text-primary'),
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: a.color,
                flexShrink: 0,
              }}
            />
            <span style={{ flex: 1 }}>{a.label}</span>
            <span
              style={{
                color: c('text-third'),
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {a.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Inline SVG sparkline with a smooth (Catmull-Rom-ish) curve, a
 * gradient area fill from the line color at the top to fully
 * transparent at the bottom, and an interactive hover tracker that
 * pins a dot to the curve at the cursor's x. Resting state shows a
 * dot at the most-recent sample so the chart doesn't read as
 * "headless" when nothing is hovered.
 */
function SparkLine({
  data,
  lineColor,
  fillColor,
  hoverIdx,
  onHoverIdx,
  height = 80,
}: {
  data: readonly number[];
  lineColor: string;
  fillColor: string;
  hoverIdx: number | null;
  onHoverIdx: (i: number | null) => void;
  height?: number;
}) {
  const W = 320;
  const H = height;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const step = W / (data.length - 1);
  const points = data.map((v, i) => ({
    x: i * step,
    y: H - ((v - min) / range) * (H - 8) - 4,
  }));

  // Smooth path via cubic-bezier with mirrored tangents. Tension
  // 0.18 gives a generous curve without overshooting.
  const tension = 0.18;
  const curvePath = (() => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] ?? points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] ?? p2;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;
      d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
    }
    return d;
  })();
  const areaPath = `${curvePath} L ${W} ${H} L 0 ${H} Z`;

  // Marker — at hover index when set, otherwise the rightmost sample.
  const marker = hoverIdx != null ? points[hoverIdx] : points[points.length - 1];
  const gradientId = useMemo(
    () => `bs-spark-grad-${Math.floor(Math.random() * 1e9)}`,
    []
  );

  return (
    <svg
      viewBox={`-8 -2 ${W + 16} ${H + 4}`}
      width="100%"
      height={H + 4}
      preserveAspectRatio="none"
      // overflow:visible + the slightly larger viewBox padding give
      // the marker dot room to extend past the chart edges without
      // getting cropped (the rightmost sample sits flush at x=W).
      style={{ display: 'block', cursor: 'crosshair', overflow: 'visible' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const idx = Math.round(ratio * (data.length - 1));
        const clamped = Math.max(0, Math.min(data.length - 1, idx));
        onHoverIdx(clamped);
      }}
      onMouseLeave={() => onHoverIdx(null)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop
            offset="0%"
            stopColor={fillColor}
            stopOpacity={0.45}
          />
          <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
        </linearGradient>
        {/* clip the gradient fill so it stays inside the chart even
            though overflow is visible (we only want the DOT to escape) */}
        <clipPath id={`${gradientId}-clip`}>
          <rect x={0} y={0} width={W} height={H} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${gradientId}-clip)`}>
        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path
          d={curvePath}
          fill="none"
          stroke={lineColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* End / hover marker. Drawn after the clipped group so it
          sits on top AND can render outside the clip rect. */}
      {marker && (
        <>
          <circle cx={marker.x} cy={marker.y} r={7} fill={c('bg-med')} />
          <circle cx={marker.x} cy={marker.y} r={5} fill={lineColor} />
        </>
      )}
    </svg>
  );
}

/** Multi-series line chart used by `StatsLineMultiCard`. Each
 *  series shares the same x scale; y scales are independent so a
 *  small series doesn't get squished against the bottom. */
function SparkLineMulti({
  series,
  hoverIdx,
  onHoverIdx,
}: {
  series: { data: readonly number[]; color: string }[];
  hoverIdx: number | null;
  onHoverIdx: (i: number | null) => void;
}) {
  const W = 320;
  const H = 80;
  const length = series[0]?.data.length ?? 0;
  const step = length > 1 ? W / (length - 1) : 0;
  const tension = 0.18;

  const renderedSeries = series.map((s) => {
    const max = Math.max(...s.data);
    const min = Math.min(...s.data);
    const range = Math.max(1, max - min);
    const points = s.data.map((v, i) => ({
      x: i * step,
      y: H - ((v - min) / range) * (H - 8) - 4,
    }));
    let d = points.length ? `M ${points[0].x} ${points[0].y}` : '';
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] ?? points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] ?? p2;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;
      d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
    }
    return { color: s.color, path: d, points };
  });

  return (
    <svg
      viewBox={`-8 -2 ${W + 16} ${H + 4}`}
      width="100%"
      height={H + 4}
      preserveAspectRatio="none"
      style={{ display: 'block', cursor: 'crosshair', overflow: 'visible' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const idx = Math.round(ratio * (length - 1));
        onHoverIdx(Math.max(0, Math.min(length - 1, idx)));
      }}
      onMouseLeave={() => onHoverIdx(null)}
    >
      {renderedSeries.map((s, i) => (
        <path
          key={i}
          d={s.path}
          fill="none"
          stroke={s.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {renderedSeries.map((s, i) => {
        const idx = hoverIdx ?? s.points.length - 1;
        const p = s.points[idx];
        if (!p) return null;
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={7} fill={c('bg-med')} />
            <circle cx={p.x} cy={p.y} r={5} fill={s.color} />
          </g>
        );
      })}
    </svg>
  );
}

/** Bar-chart counterpart with hover-driven highlight. Hovered bar
 *  flips to the active color, every other bar dims to neutral 600.
 *  Resting state highlights the rightmost (latest) bar. */
function SparkBars({
  data,
  activeColor,
  hoverIdx,
  onHoverIdx,
}: {
  data: readonly number[];
  activeColor: string;
  hoverIdx: number | null;
  onHoverIdx: (i: number | null) => void;
}) {
  const max = Math.max(...data);
  const restingActive = data.length - 1;
  const activeIdx = hoverIdx ?? restingActive;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 4,
        height: 72,
        width: '100%',
      }}
      onMouseLeave={() => onHoverIdx(null)}
    >
      {data.map((v, i) => {
        const h = (v / max) * 100;
        const isActive = i === activeIdx;
        return (
          <div
            key={i}
            onMouseEnter={() => onHoverIdx(i)}
            style={{
              flex: 1,
              height: `${h}%`,
              background: isActive ? activeColor : rampValue('neutral', 600),
              borderRadius: 2,
              transition: 'background 80ms',
              cursor: 'crosshair',
            }}
          />
        );
      })}
    </div>
  );
}

function StatsSimple({ value, description }: { value: number; description: string }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 12,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          ...typeStyle('title3'),
          color: c('text-primary'),
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value.toLocaleString()}
      </div>
      <div style={{ ...typeStyle('footnote'), color: c('text-third'), marginTop: 2 }}>
        {description}
      </div>
    </div>
  );
}

function ButtonGridCard() {
  const [on, setOn] = useState<Record<string, boolean>>({
    A: true,
    B: false,
    C: true,
    D: false,
  });
  return (
    <div
      style={{
        // Top padding shaved 4px; the button grid below already has
        // its own 16px bottom inset so the card felt visually
        // top-heavy at 16/16. Bottom kept at 16.
        padding: '12px 16px 16px 16px',
        borderRadius: 12,
        border: `1px solid ${c('border-third')}`,
        background: 'transparent',
      }}
    >
      <div style={{ ...typeStyle('callout'), fontWeight: 600, color: c('text-primary') }}>
        Card With Toggles
      </div>
      <div style={{ ...typeStyle('bodySmall'), color: c('text-third'), marginTop: 2 }}>
        Inline toggles inside a card. Click any toggle to flip it.
      </div>
      {/* mt-2 (8px) instead of mt-3 (12px) so the visual top + bottom
          inset around the grid feels balanced against the 16px card
          padding (the title + description provides ~8px of breathing
          room on its own). */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {Object.keys(on).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setOn((s) => ({ ...s, [k]: !s[k] }))}
            style={{
              ...typeStyle('caption'),
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${on[k] ? c('button-bg-primary') : c('border-second')}`,
              background: on[k] ? c('button-bg-primary') : 'transparent',
              color: on[k] ? c('bg-low') : c('text-primary'),
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Option {k}
          </button>
        ))}
      </div>
    </div>
  );
}

function ButtonInlineCard() {
  const [on, setOn] = useState(false);
  return (
    <div
      style={{
        // Top padding shaved 4px so the title baseline doesn't sit
        // visually low. Right padding also shaved 4px so the switch
        // hugs closer to the right edge.
        padding: '12px 12px 16px 16px',
        borderRadius: 12,
        border: `1px solid ${c('border-third')}`,
        background: 'transparent',
        display: 'flex',
        alignItems: 'flex-start',
        // Larger gap so the body text doesn't crowd the switch.
        gap: 24,
        // Hug content height.
        alignSelf: 'flex-start',
      }}
    >
      <div className="flex-1 min-w-0">
        <div style={{ ...typeStyle('callout'), fontWeight: 600, color: c('text-primary') }}>
          Card With Inline Action
        </div>
        <div style={{ ...typeStyle('bodySmall'), color: c('text-third'), marginTop: 2 }}>
          A right-aligned switch matches the description's first line.
        </div>
      </div>
      {/* Switch hugs the top-right corner with equal top/right
          padding. flex-start aligns it with the title's first line. */}
      <Switch checked={on} onChange={setOn} label="" />
    </div>
  );
}

function ButtonRightActionCard() {
  // Title + description on the left; primary button pinned to the
  // top-right corner with the same padding as the rest of the card
  // (so the visual top-right inset matches the card's edges).
  return (
    <div
      style={{
        // Top trimmed 4px so title baseline lifts; right edge stays
        // at 16 because the button has its own breathing room
        // baked into its padding.
        padding: '12px 16px 16px 16px',
        borderRadius: 12,
        border: `1px solid ${c('border-third')}`,
        background: 'transparent',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 24,
      }}
    >
      <div className="flex-1 min-w-0">
        <div style={{ ...typeStyle('callout'), fontWeight: 600, color: c('text-primary') }}>
          Card With Right Action
        </div>
        <div style={{ ...typeStyle('bodySmall'), color: c('text-third'), marginTop: 2 }}>
          Description text on the left; the call to action sits to the right.
        </div>
      </div>
      <Btn variant="primary" size="md" iconLeft={<IconPlus className="w-4 h-4" />}>
        Add
      </Btn>
    </div>
  );
}

// ── Section: Drawers ──────────────────────────────────────────

function SectionDrawers() {
  return (
    <Section
      id="drawers"
      title="Drawers"
      description="One drawer shape across the whole app. Bottom-up on mobile (rounded top corners only); right-side on desktop (no rounded corners)."
    >
      <Group title="Default Drawers" description="Empty shells. Bottom-up at left, right-side at right.">
        <Specimen noPadding bordered={false}>
          <div className="flex flex-wrap gap-6 justify-start">
            <DrawerShell variant="bottom" title="Drawer Title" />
            <DrawerShell variant="side" title="Drawer Title" />
          </div>
        </Specimen>
      </Group>

      <Group title="Drawer Specimens">
        <Specimen noPadding bordered={false}>
          <div className="flex flex-wrap gap-6 justify-start">
            <DrawerShell variant="bottom" title="Sample Detail · Group A">
              <CompetitorBody />
            </DrawerShell>
            <DrawerShell variant="side" title="Settings">
              <SettingsBody />
            </DrawerShell>
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

function DrawerShell({
  variant,
  title,
  children,
}: {
  variant: 'bottom' | 'side';
  title: string;
  children?: React.ReactNode;
}) {
  // Bottom: rounded top corners only. Side: no rounded corners.
  const radius =
    variant === 'bottom'
      ? '12px 12px 0 0'
      : '0';
  return (
    <div
      style={{
        width: 350,
        height: 600,
        borderRadius: radius,
        background: c('bg-med'),
        border: `1px solid ${c('border-third')}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Bottom-sheet drag handle. Subtle pill at the top of the
          drawer that signals the sheet can be dragged closed.
          Static visual only — actual drag behavior lives in the
          mobile drawer; here it's just the affordance. */}
      {variant === 'bottom' && (
        <div
          aria-hidden
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 8,
            paddingBottom: 4,
          }}
        >
          <span
            style={{
              width: 36,
              height: 4,
              borderRadius: 9999,
              background: c('border-second'),
              opacity: 0.7,
            }}
          />
        </div>
      )}
      <header
        style={{
          height: 56,
          padding: '0 16px',
          // 1.5px white — same heaviest-stroke vocabulary used at
          // the top of the body of every table in the system. The
          // drawer's title acts as the column-label band.
          borderBottom: `1.5px solid ${rampValue('neutral', 100)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3 style={{ ...typeStyle('title3'), color: c('text-primary'), margin: 0 }}>
          {title}
        </h3>
        <button
          type="button"
          aria-label="Close"
          style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            color: c('text-third'),
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
      <div
        style={{
          ...typeStyle('footnote'),
          color: c('text-third'),
          padding: '4px 16px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          background: c('bg-low'),
          borderTop: `1px solid ${c('border-third')}`,
        }}
      >
        {variant === 'bottom' ? 'Bottom-up · mobile' : 'Right-side · desktop'}
      </div>
    </div>
  );
}

function SettingsBody() {
  const [tab, setTab] = useState('Overview');
  // Each label sits flush against its input via Label's built-in
  // 6px marginBottom (matching the Inputs section). Field groups
  // sit 16px apart from each other so the label-to-input pairing
  // reads as a tighter unit.
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SmallUnderlineTabs
        value={tab}
        onChange={setTab}
        options={['Overview', 'Details', 'History']}
      />
      <div>
        <Label>Project name</Label>
        <input style={inputStyles('default')} defaultValue="Sample Project" />
      </div>
      <div>
        <Label>Category</Label>
        <DropdownDemo />
      </div>
      <div>
        <Label>Notes</Label>
        <Textarea />
      </div>
      <p style={{ ...typeStyle('bodySmall'), color: c('text-third') }}>
        Edits are saved automatically.
      </p>
    </div>
  );
}

function SmallUnderlineTabs({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div style={{ borderBottom: `1px solid ${c('border-third')}` }}>
      <div className="flex" style={{ gap: 18 }}>
        {options.map((label) => {
          const sel = value === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange(label)}
              style={{
                ...typeStyle('body'),
                paddingBottom: 8,
                marginBottom: -1,
                borderBottom: `2px solid ${sel ? c('text-primary') : 'transparent'}`,
                color: sel ? c('text-primary') : c('text-third'),
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CompetitorBody() {
  // Sort chips and stats keep horizontal padding; the table rows
  // run edge-to-edge so the highlight color reaches the drawer
  // edges (matches the live CompetitorDrawer).
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '12px 16px' }}>
        <SortChips />
      </div>
      <CompetitorMiniTable />
      <div
        style={{
          padding: '8px 16px',
          ...typeStyle('footnote'),
          color: c('text-third'),
          borderTop: `1px solid ${c('border-third')}`,
        }}
      >
        5 entries · 3 in your group
      </div>
    </div>
  );
}

function CompetitorMiniTable() {
  // Generic placeholder data — the brand system shouldn't bake in a
  // particular consumer-app's domain (rosters, line items, etc.).
  // Renders as a Full Width table: the rows stretch edge-to-edge of
  // their container, and the text inside has 16px L/R padding so it
  // aligns with the drawer title above it. Highlighted rows use the
  // brand green. Per the highlight rule, font weight stays the same
  // and consecutive highlights are separated by a 1px black line.
  const ROWS: Array<[string, string, string, string, boolean]> = [
    ['A-1', 'Person One', 'Sample Group', '12.34', true],
    ['A-2', 'Person Two', 'Sample Group', '12.41', true],
    ['A-3', 'Person Three', 'Other Group', '12.95', false],
    ['B-1', 'Person Four', 'Sample Group', '12.81', true],
    ['B-2', 'Person Five', 'Other Group', '13.05', false],
  ];
  const TEMPLATE = '60px 1fr 1.4fr auto';
  const HL = ramp('green', 700);
  const headerCells = ['#', 'Name', 'Group', 'Value'];
  const rows: TableRowDef[] = ROWS.map(([lane, name, club, pr, ours]) => ({
    cells: [
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{lane}</span>,
      <span>{name}</span>,
      <span style={{ color: ours ? '#0a0a0a' : c('text-third') }}>{club}</span>,
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{pr}</span>,
    ],
    highlight: ours ? HL : undefined,
    textColor: ours ? '#0a0a0a' : undefined,
  }));
  return (
    <div style={{ ...typeStyle('bodySmall') }}>
      {renderTable({
        header: headerCells,
        rows,
        layout: {
          template: TEMPLATE,
          fullWidth: true,
          cellPadY: 6,
          divider: 'third',
        },
      })}
    </div>
  );
}

// ── Section: Tables ───────────────────────────────────────────

function SectionTables() {
  return (
    <Section
      id="tables"
      title="Tables"
      description="Tables follow a strict shape. No outer rounded corners. No left/right border. The top line below column labels is neutral-100 at 1.5px (the heaviest stroke in the system). Other dividers use border-second on Large rows and border-third on Small. Highlighted rows take their borders from the row's own background color so the highlight reads as a continuous block; the only exception is the white top line directly below the column labels. Every value is left-aligned, regardless of column. The last column shrinks to its widest value with the right edge of that value flush to the table's right edge."
    >
      <Group title="Inline Rows" description="Cells have no left/right padding — the row content sits flush against the table's outer edges. Lines span the full row width.">
        <InlineRowsDemo />
      </Group>

      <Group title="Full Width Rows" description="Rows stretch edge-to-edge of their container; the lines reach the outer edges. Text is inset on the left and right so it aligns with whatever sits above or below the table. Highlighted rows use a brand color rather than the neutral 700 used in Inline Rows.">
        <FullWidthRowsDemo />
      </Group>

      <Group title="Composed Tables" description="A Full Width Rows table styled the way it appears inside the bottom drawer.">
        <Specimen>
          <CompetitorMiniTable />
        </Specimen>
      </Group>

      <Group title="Editable Tables" description="Tap the pencil icon at the top-right to switch the whole row into edit mode. Or click any single value to edit just that one — input lines appear only on the field you're touching.">
        <Specimen>
          <RosterTable />
        </Specimen>
      </Group>
    </Section>
  );
}

/* ── Tables: shared rendering pipeline ───────────────────────────
 * `TableRowDef` describes one row. `renderTableBody` handles the
 * border merge rule (highlighted rows take their bg color as their
 * top + bottom border, so adjacent highlights flow visually).
 * Border atop the very first body row is always white 1.5px (the
 * "header underline"), per spec.
 */

interface TableRowDef {
  cells: React.ReactNode[];
  /** When set, the row's bg AND its top/bottom borders all use this
   *  color. Used for selection / status callouts inside tables. */
  highlight?: string;
  /** Override text color (highlight rows usually want #0a0a0a). */
  textColor?: string;
  fontWeight?: number;
}

interface TableLayout {
  /** Width per column. Last column should be 'auto' so it shrinks
   *  to its widest value with the right edge flush to the right. */
  template: string;
  /** When true, first cell gets pad-left 16, last cell gets pad-right 0
   *  (so the last value's right edge sits flush). When false, all cells
   *  have padding 0 — Inline Rows. */
  fullWidth: boolean;
  /** Row content vertical padding. */
  cellPadY: number;
  /** Border-second is the standard divider for Large rows; Small rows
   *  use border-third for a quieter rhythm. */
  divider: 'second' | 'third';
}

/**
 * Render a complete table — header + body rows in ONE outer grid.
 * The header band and every body row use `gridTemplateColumns:
 * subgrid`, so column widths match across the whole table no
 * matter how wide each cell's content is. Without this, the auto
 * column on the right was sized per-row and the body's number
 * column drifted left of the header's "Count" label.
 */
function renderTable({
  header,
  rows,
  layout,
  showHeader = true,
  topLineWhite = true,
}: {
  header: React.ReactNode[];
  rows: TableRowDef[];
  layout: TableLayout;
  /** When false, the column-label band is omitted but cells still
   *  use the shared grid so columns line up across siblings. */
  showHeader?: boolean;
  /** First-row top line. White 1.5px when the table has a header
   *  band (the canonical "header underline"); border-second when
   *  the table is renderered without its header. */
  topLineWhite?: boolean;
}) {
  const cellPadX = layout.fullWidth ? 16 : 0;
  const dividerColor =
    layout.divider === 'second' ? c('border-second') : c('border-third');
  const lastCol = header.length - 1;

  // Wrapping grid sets the column track. Each child uses subgrid.
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: layout.template,
      }}
    >
      {showHeader && (
        <div
          role="row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            gridColumn: '1 / -1',
            ...typeStyle('caption'),
            color: c('text-third'),
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            // Header underline is owned here so the first body row
            // can keep a transparent / divider top.
            borderBottom: `1.5px solid ${rampValue('neutral', 100)}`,
            background: 'transparent',
          }}
        >
          {header.map((cell, j) => {
            const isFirstCol = j === 0;
            const isLastCol = j === lastCol;
            return (
              <div
                key={j}
                role="columnheader"
                style={{
                  padding: '6px 0',
                  paddingLeft: isFirstCol ? cellPadX : 0,
                  paddingRight: isLastCol ? cellPadX : 0,
                  textAlign: 'left',
                  fontWeight: 500,
                }}
              >
                {cell}
              </div>
            );
          })}
        </div>
      )}
      {rows.map((r, i) => {
        const isFirst = i === 0;
        const isLast = i === rows.length - 1;
        const prev = i > 0 ? rows[i - 1] : null;
        // Highlight rule: the row carries border-second on top + bottom
        // like every other row. Two adjacent highlights get a black
        // separator drawn as a borderTop on the second one. The very
        // first row's top is either white-1.5px (when a header is
        // showing AND topLineWhite) or border-second otherwise.
        let borderTop: string;
        let borderTopWidth = 1;
        if (isFirst && topLineWhite && showHeader) {
          // Header above already drew the white underline; skip.
          borderTop = 'transparent';
          borderTopWidth = 0;
        } else if (isFirst && topLineWhite) {
          borderTop = rampValue('neutral', 100);
          borderTopWidth = 1.5;
        } else if (r.highlight && prev?.highlight) {
          // Adjacent highlights: black 1px separator.
          borderTop = '#0a0a0a';
        } else {
          borderTop = dividerColor;
        }
        const borderBottom = isLast ? dividerColor : 'transparent';
        const borderBottomWidth = isLast ? 1 : 0;
        return (
          <div
            key={i}
            role="row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'subgrid',
              gridColumn: '1 / -1',
              borderTop:
                borderTopWidth > 0
                  ? `${borderTopWidth}px solid ${borderTop}`
                  : 'none',
              borderBottom:
                borderBottomWidth > 0
                  ? `${borderBottomWidth}px solid ${borderBottom}`
                  : 'none',
              background: r.highlight ?? 'transparent',
              color: r.textColor ?? c('text-primary'),
              // Highlights NEVER get a different font weight per
              // system rule. fontWeight on a row only honors an
              // explicit override (used very rarely).
              fontWeight: r.fontWeight ?? 'normal',
            }}
          >
            {r.cells.map((cell, j) => {
              const isFirstCol = j === 0;
              const isLastCol = j === lastCol;
              return (
                <div
                  key={j}
                  role="cell"
                  style={{
                    padding: `${layout.cellPadY}px ${cellPadX}px`,
                    paddingLeft: isFirstCol ? cellPadX : 0,
                    paddingRight: isLastCol ? cellPadX : 0,
                    textAlign: 'left',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/* Compatibility shim retained for older call sites that render the
 * column-label band on its own. New code should call renderTable()
 * directly so the header + body share one CSS grid. */
function TableHeaderBand({
  cells,
  template,
  fullWidth,
}: {
  cells: React.ReactNode[];
  template: string;
  fullWidth: boolean;
}) {
  // Used only by call sites that render the header separately from
  // the body. Compose the column-label band as a standalone grid;
  // for proper column alignment with the body, callers should move
  // to renderTable() instead.
  const cellPadX = fullWidth ? 16 : 0;
  const lastCol = cells.length - 1;
  return (
    <div
      role="row"
      style={{
        display: 'grid',
        gridTemplateColumns: template,
        ...typeStyle('caption'),
        color: c('text-third'),
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        borderBottom: `1.5px solid ${rampValue('neutral', 100)}`,
        background: 'transparent',
      }}
    >
      {cells.map((cell, j) => {
        const isFirstCol = j === 0;
        const isLastCol = j === lastCol;
        return (
          <div
            key={j}
            role="columnheader"
            style={{
              padding: '6px 0',
              paddingLeft: isFirstCol ? cellPadX : 0,
              paddingRight: isLastCol ? cellPadX : 0,
              textAlign: 'left',
              fontWeight: 500,
            }}
          >
            {cell}
          </div>
        );
      })}
    </div>
  );
}

/* ── Inline Rows demo ──────────────────────────────────────────── */

function InlineRowsDemo() {
  // Reused across the Header + Small + Large + Highlight specimens.
  // Same content + template → all 4 sub-specimens line up exactly.
  const SAMPLE_ROWS: TableRowDef[] = [
    { cells: ['Item one', 'Active', '12'] },
    { cells: ['Item two', 'Pending', '8'] },
  ];
  const HEADER_LABELS = ['Item', 'Status', 'Count'];
  const TEMPLATE = '1fr 1fr auto';
  // Highlight color for inline rows: neutral 800 per design feedback.
  const HL = rampValue('neutral', 800);
  return (
    <Specimen>
      <div className="space-y-6">
        <LabeledSubSection label="Header">
          {/* Header-only specimen: no body rows. */}
          <TableHeaderBand cells={HEADER_LABELS} template={TEMPLATE} fullWidth={false} />
        </LabeledSubSection>

        <LabeledSubSection label="Small">
          {renderTable({
            header: HEADER_LABELS,
            rows: SAMPLE_ROWS,
            layout: {
              template: TEMPLATE,
              fullWidth: false,
              cellPadY: 6,
              divider: 'third',
            },
            showHeader: false,
          })}
        </LabeledSubSection>

        <LabeledSubSection label="Large">
          {renderTable({
            header: HEADER_LABELS,
            rows: SAMPLE_ROWS,
            layout: {
              template: TEMPLATE,
              fullWidth: false,
              cellPadY: 14,
              divider: 'second',
            },
            showHeader: false,
          })}
        </LabeledSubSection>

        <LabeledSubSection label="Highlight">
          {renderTable({
            header: HEADER_LABELS,
            rows: [
              { cells: ['Item one', 'Active', '12'] },
              {
                cells: ['Item two', 'Active', '18'],
                highlight: HL,
                textColor: rampValue('neutral', 100),
              },
              {
                cells: ['Item three', 'Active', '24'],
                highlight: HL,
                textColor: rampValue('neutral', 100),
              },
              { cells: ['Item four', 'Pending', '8'] },
            ],
            layout: {
              template: TEMPLATE,
              fullWidth: false,
              cellPadY: 8,
              divider: 'third',
            },
            showHeader: false,
          })}
        </LabeledSubSection>
      </div>
    </Specimen>
  );
}

/* ── Full Width Rows demo ──────────────────────────────────────── */

function FullWidthRowsDemo() {
  const SAMPLE_ROWS: TableRowDef[] = [
    { cells: ['Item one', 'Active', '12'] },
    { cells: ['Item two', 'Pending', '8'] },
  ];
  const HEADER_LABELS = ['Item', 'Status', 'Count'];
  const TEMPLATE = '1fr 1fr auto';
  // Full-width table highlights still use the brand green per spec.
  const HL = ramp('green', 700);
  return (
    <Specimen>
      <div className="space-y-6">
        <LabeledSubSection label="Header">
          <TableHeaderBand cells={HEADER_LABELS} template={TEMPLATE} fullWidth />
        </LabeledSubSection>

        <LabeledSubSection label="Small">
          {renderTable({
            header: HEADER_LABELS,
            rows: SAMPLE_ROWS,
            layout: {
              template: TEMPLATE,
              fullWidth: true,
              cellPadY: 6,
              divider: 'third',
            },
            showHeader: false,
          })}
        </LabeledSubSection>

        <LabeledSubSection label="Large">
          {renderTable({
            header: HEADER_LABELS,
            rows: SAMPLE_ROWS,
            layout: {
              template: TEMPLATE,
              fullWidth: true,
              cellPadY: 14,
              divider: 'second',
            },
            showHeader: false,
          })}
        </LabeledSubSection>

        <LabeledSubSection label="Highlight">
          {renderTable({
            header: HEADER_LABELS,
            rows: [
              { cells: ['Item one', 'Active', '12'] },
              {
                cells: ['Item two', 'Active', '18'],
                highlight: HL,
                textColor: '#0a0a0a',
              },
              {
                cells: ['Item three', 'Active', '24'],
                highlight: HL,
                textColor: '#0a0a0a',
              },
              { cells: ['Item four', 'Pending', '8'] },
            ],
            layout: {
              template: TEMPLATE,
              fullWidth: true,
              cellPadY: 8,
              divider: 'third',
            },
            showHeader: false,
          })}
        </LabeledSubSection>
      </div>
    </Specimen>
  );
}

/** Wraps a sub-specimen with its label tightly above the content
 *  so the relationship reads as a single unit. */
function LabeledSubSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          ...typeStyle('footnote'),
          color: c('text-third'),
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

/** Small uppercase label that sits above each row spec. Same vocab
 *  the section uses elsewhere for size-column labels. */
function RowSpecLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ ...typeStyle('footnote'), color: c('text-third') }}
      className="uppercase tracking-wide"
    >
      {children}
    </div>
  );
}

/**
 * Editable Tables specimen. Each row has three text cells + a
 * pencil button on the right. Two ways to edit:
 *
 *   1. Pencil click — the whole row toggles into edit mode and all
 *      three cells render their input border at once.
 *   2. Single-cell click — clicking any one of the text values puts
 *      JUST that field in edit mode (input border on that cell only).
 *
 * Once a cell is being edited, blurring it returns to read-only.
 * The pencil only stays "engaged" while it's the active source —
 * blurring the row also exits row-mode.
 */
function RosterTable() {
  // Generic placeholder names — the brand system shouldn't ship
  // with a particular consumer-app's data baked in.
  const [rows, setRows] = useState([
    { first: 'Person', last: 'One', age: 12 },
    { first: 'Person', last: 'Two', age: 11 },
    { first: 'Person', last: 'Three', age: 12 },
  ]);
  // Per-row edit state. `null` = not editing; 'all' = pencil-engaged
  // row-edit; a column id = single-cell edit on that field.
  // Pencil-mode is exclusive — clicking a different row's pencil
  // moves the whole-row highlight to that one and clears it from
  // the previous.
  type EditMode = null | 'all' | 'first' | 'last' | 'age';
  const [editing, setEditing] = useState<Record<number, EditMode>>({});
  const setRowEdit = (i: number, mode: EditMode) =>
    setEditing((m) => ({ ...m, [i]: mode }));
  const togglePencil = (i: number) => {
    setEditing((m) => {
      const next: Record<number, EditMode> = {};
      // Clear all rows; pencil mode is mutually exclusive across
      // the table so the user can see at a glance which row is
      // actively being edited.
      const wasOn = m[i] === 'all';
      if (!wasOn) next[i] = 'all';
      return next;
    });
  };
  const update = (i: number, patch: Partial<(typeof rows)[number]>) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  const TEMPLATE = '1fr 1fr 80px 36px';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: TEMPLATE }}>
      {/* Column-label band */}
      <div
        role="row"
        style={{
          display: 'grid',
          gridTemplateColumns: 'subgrid',
          gridColumn: '1 / -1',
          ...typeStyle('caption'),
          color: c('text-third'),
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          borderBottom: `1.5px solid ${rampValue('neutral', 100)}`,
        }}
      >
        {(['First', 'Last', 'Age', ''] as const).map((label, j) => (
          <div
            key={j}
            role="columnheader"
            style={{
              padding: '6px 0',
              textAlign: 'left',
              fontWeight: 500,
            }}
          >
            {label}
          </div>
        ))}
      </div>
      {rows.map((row, i) => {
        const mode = editing[i] ?? null;
        const isLast = i === rows.length - 1;
        const cellOn = (col: 'first' | 'last' | 'age') =>
          mode === 'all' || mode === col;
        return (
          <div
            key={i}
            role="row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'subgrid',
              gridColumn: '1 / -1',
              alignItems: 'center',
              borderBottom: isLast
                ? `1px solid ${c('border-second')}`
                : `1px solid ${c('border-second')}`,
            }}
          >
            <RosterCell
              value={row.first}
              editing={cellOn('first')}
              onChange={(v) => update(i, { first: v })}
              onBeginEdit={() => setRowEdit(i, mode === 'all' ? 'all' : 'first')}
              onEndEdit={() => setRowEdit(i, null)}
            />
            <RosterCell
              value={row.last}
              editing={cellOn('last')}
              onChange={(v) => update(i, { last: v })}
              onBeginEdit={() => setRowEdit(i, mode === 'all' ? 'all' : 'last')}
              onEndEdit={() => setRowEdit(i, null)}
            />
            <RosterCell
              value={String(row.age)}
              editing={cellOn('age')}
              numeric
              onChange={(v) => update(i, { age: Number(v) || 0 })}
              onBeginEdit={() => setRowEdit(i, mode === 'all' ? 'all' : 'age')}
              onEndEdit={() => setRowEdit(i, null)}
            />
            <button
              type="button"
              aria-label={mode === 'all' ? 'Stop editing row' : 'Edit row'}
              aria-pressed={mode === 'all'}
              onClick={() => togglePencil(i)}
              style={{
                width: 28,
                height: 28,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                background: mode === 'all' ? c('bg-high') : 'transparent',
                color: c('text-third'),
                border: 'none',
                cursor: 'pointer',
                justifySelf: 'end',
              }}
            >
              <IconEdit className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** A single editable-row cell. Renders text by default; switches to
 *  an input when `editing` is true. Click the text to enter edit mode
 *  for just this cell; blur leaves the cell. */
function RosterCell({
  value,
  editing,
  onChange,
  onBeginEdit,
  onEndEdit,
  numeric,
}: {
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  onBeginEdit: () => void;
  onEndEdit: () => void;
  numeric?: boolean;
}) {
  if (editing) {
    // 8px above + below brings the row taller by 4px on each side
    // versus the previous 4-px pad — per design feedback that the
    // editable rows felt cramped against neighbors.
    return (
      <div style={{ padding: '8px 0' }}>
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onEndEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              (e.target as HTMLInputElement).blur();
            }
          }}
          style={{
            ...typeStyle('body'),
            width: '100%',
            height: 32,
            padding: '0 8px',
            borderRadius: 6,
            background: c('bg-med'),
            border: `1px solid ${c('focus-ring')}`,
            color: c('text-primary'),
            fontVariantNumeric: numeric ? 'tabular-nums' : 'normal',
            outline: 'none',
          }}
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onBeginEdit}
      style={{
        ...typeStyle('body'),
        // Row taller by 4px on each side; matches the editing
        // variant so toggling between read + edit doesn't shift
        // neighbouring rows.
        height: 40,
        padding: '0 0',
        textAlign: 'left',
        background: 'transparent',
        border: 'none',
        color: c('text-primary'),
        fontVariantNumeric: numeric ? 'tabular-nums' : 'normal',
        cursor: 'text',
        width: '100%',
      }}
    >
      {value}
    </button>
  );
}

// ── Section: Dates ───────────────────────────────────────────
//
// Default formatter the rest of the system reads from. Three tiers,
// picked by the gap between `target` and `today`:
//
//   1. Future date is within seven days inclusive (i.e. the target
//      day-of-week happens before/at the same weekday next week) →
//      three-letter weekday (`Wed`).
//   2. Same calendar year → three-letter month + day (`Jun 16`).
//   3. Different calendar year → three-letter month + day + 4-digit
//      year (`Jun 16, 2027`).
//
// Past dates fall through to the calendar-year rule (so historic
// records still read consistently). The function is exported via
// the brand-system module so other parts of the app can adopt the
// same vocabulary in one swap.

const WEEKDAYS_3 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTHS_3 = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatBrandDate(target: Date, today: Date = new Date()): string {
  const t0 = startOfDay(today);
  const tg = startOfDay(target);
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((tg.getTime() - t0.getTime()) / oneDay);
  if (diffDays >= 0 && diffDays < 7) {
    return WEEKDAYS_3[tg.getDay()];
  }
  if (tg.getFullYear() === t0.getFullYear()) {
    return `${MONTHS_3[tg.getMonth()]} ${tg.getDate()}`;
  }
  return `${MONTHS_3[tg.getMonth()]} ${tg.getDate()}, ${tg.getFullYear()}`;
}

function SectionDates() {
  return (
    <Section
      id="dates"
      title="Dates"
      description="A single formatter handles every date in the system. Three tiers depending on how far the target date is from today."
    >
      <Group title="Date Logic" description="Each row shows what the formatter returns for a target date relative to a fixed today (Wed Jun 11, 2026). The labels on the left are the rule names; the right column shows the rendered value.">
        <Specimen>
          <DateLogicTable />
        </Specimen>
      </Group>

      <Group title="Date Picker" description="Calendar grid styled with the rest of the system. Click any day to pick. The previous and next months step the displayed grid.">
        <Specimen>
          <DatePicker />
        </Specimen>
      </Group>

      <Group title="Date Picker · with year column" description="Same calendar grid with a scrollable year picker pinned to the right so jumping decades is one click instead of stepping months at a time.">
        <Specimen>
          <DatePickerWithYear />
        </Specimen>
      </Group>
    </Section>
  );
}

function DateLogicTable() {
  // Anchor uses today so the table feels live. Same-year and
  // different-year samples are computed off today so the
  // demonstration always lands on real future dates regardless of
  // when the page is opened.
  const today = useMemo(() => startOfDay(new Date()), []);
  const samples: { label: string; rule: string; date: Date }[] = [
    {
      label: 'Tomorrow',
      rule: 'Within 7 days · weekday',
      date: addDays(today, 1),
    },
    {
      label: '5 days out',
      rule: 'Within 7 days · weekday',
      date: addDays(today, 5),
    },
    {
      label: 'Next week',
      rule: 'Same year · month + day',
      date: addDays(today, 9),
    },
    {
      label: 'Several months',
      rule: 'Same year · month + day',
      date: addDays(today, 90),
    },
    {
      label: 'Next year',
      rule: 'Different year · month + day + year',
      date: addDays(today, 400),
    },
    {
      label: 'Past · same year',
      rule: 'Same year · month + day',
      date: addDays(today, -120),
    },
  ];
  const TEMPLATE = '1.4fr 1.6fr auto';
  const rows: TableRowDef[] = samples.map((s) => ({
    cells: [
      // All cells left-aligned, no per-cell font-weight overrides
      // (highlight + bold are not used here). Date string still uses
      // tabular figures so the column reads as a clean stack.
      <span style={{ color: c('text-primary') }}>{s.label}</span>,
      <span style={{ color: c('text-third') }}>{s.rule}</span>,
      <span
        style={{
          color: c('text-primary'),
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatBrandDate(s.date, today)}
      </span>,
    ],
  }));
  return (
    <div>
      {renderTable({
        header: ['Label', 'Rule', 'Renders as'],
        rows,
        layout: {
          template: TEMPLATE,
          fullWidth: false,
          cellPadY: 8,
          divider: 'third',
        },
      })}
      <div
        style={{
          ...typeStyle('footnote'),
          color: c('text-third'),
          marginTop: 8,
        }}
      >
        Anchor: today (
        {WEEKDAYS_3[today.getDay()]} {MONTHS_3[today.getMonth()]} {today.getDate()},{' '}
        {today.getFullYear()})
      </div>
    </div>
  );
}

function addDays(d: Date, n: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

/**
 * Custom calendar / date picker using the system's borders + type.
 * Click any day cell to pick. The header buttons step the visible
 * month. "Today" gets a circle outline; the picked day gets the
 * solid neutral fill.
 */
function DatePicker() {
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [picked, setPicked] = useState<Date>(today);
  const monthName = MONTHS_3[view.getMonth()];
  const year = view.getFullYear();

  // Build the 6×7 grid. Start on Sunday of the week containing the
  // first of the month so adjacent-month days fill the leading slots.
  const firstOfMonth = new Date(view);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(1 - firstOfMonth.getDay());
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    cells.push(addDays(gridStart, i));
  }

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div
      style={{
        display: 'inline-block',
        border: `1px solid ${c('border-third')}`,
        borderRadius: 12,
        background: c('bg-med'),
        padding: 16,
        minWidth: 320,
      }}
    >
      {/* Month / year header with prev / next steppers */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          style={iconStepperStyle()}
        >
          <IconChevronLeft className="w-4 h-4" />
        </button>
        <div
          style={{
            ...typeStyle('callout'),
            color: c('text-primary'),
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {monthName} {year}
        </div>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          style={iconStepperStyle()}
        >
          <IconChevronRight className="w-4 h-4" />
        </button>
      </div>
      {/* Weekday header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          ...typeStyle('footnote'),
          color: c('text-third'),
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: 4,
        }}
      >
        {WEEKDAYS_3.map((d) => (
          <div key={d} style={{ textAlign: 'center', padding: '4px 0' }}>
            {d[0]}
          </div>
        ))}
      </div>
      {/* Day cells. Adjacent-month cells dim to text-third. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
        }}
      >
        {cells.map((d) => {
          const inMonth = d.getMonth() === view.getMonth();
          const isToday = sameDay(d, today);
          const isPicked = sameDay(d, picked);
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => setPicked(d)}
              style={{
                ...typeStyle('caption'),
                height: 36,
                borderRadius: 6,
                border:
                  isToday && !isPicked
                    ? `1px solid ${c('border-second')}`
                    : '1px solid transparent',
                background: isPicked ? c('button-bg-primary') : 'transparent',
                color: isPicked
                  ? c('bg-low')
                  : inMonth
                    ? c('text-primary')
                    : c('text-third'),
                fontWeight: isPicked || isToday ? 600 : 400,
                cursor: 'pointer',
                fontVariantNumeric: 'tabular-nums',
                transition: 'background 80ms, color 80ms',
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      {/* Selection echo using the brand date format. */}
      <div
        style={{
          ...typeStyle('footnote'),
          color: c('text-third'),
          marginTop: 12,
          textAlign: 'center',
        }}
      >
        Selected · <span style={{ color: c('text-primary'), fontWeight: 600 }}>
          {formatBrandDate(picked, today)}
        </span>
      </div>
    </div>
  );
}

function iconStepperStyle(): React.CSSProperties {
  return {
    width: 28,
    height: 28,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    border: `1px solid ${c('border-third')}`,
    background: 'transparent',
    color: c('text-primary'),
    cursor: 'pointer',
  };
}

/** Variant of DatePicker with a scrollable year column on the right.
 *  The picker grid still steps months via the chevron buttons, but
 *  the year column lets the user jump directly to any year in a
 *  ±50-year window without holding the chevron. */
function DatePickerWithYear() {
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [picked, setPicked] = useState<Date>(today);
  const monthName = MONTHS_3[view.getMonth()];
  const year = view.getFullYear();

  // Generate the 6×7 day grid for the visible month.
  const firstOfMonth = new Date(view);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(1 - firstOfMonth.getDay());
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) cells.push(addDays(gridStart, i));

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // ±50-year window centered on the current view. Reasonable for a
  // brand-system demo without scrolling forever.
  const yearStart = today.getFullYear() - 50;
  const yearEnd = today.getFullYear() + 50;
  const years: number[] = [];
  for (let y = yearStart; y <= yearEnd; y++) years.push(y);

  // Auto-scroll the year column to keep the active year in view.
  const yearScrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = yearScrollRef.current?.querySelector<HTMLButtonElement>(
      `[data-year="${year}"]`
    );
    if (el) el.scrollIntoView({ block: 'center' });
  }, [year]);

  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 16,
        border: `1px solid ${c('border-third')}`,
        borderRadius: 12,
        background: c('bg-med'),
        padding: 16,
        alignItems: 'stretch',
      }}
    >
      {/* Calendar grid — same chrome as DatePicker, just inlined so
          this variant can sit alongside the year column without
          double-bordering. */}
      <div style={{ minWidth: 280 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setView(new Date(year, view.getMonth() - 1, 1))}
            style={iconStepperStyle()}
          >
            <IconChevronLeft className="w-4 h-4" />
          </button>
          <div
            style={{
              ...typeStyle('callout'),
              color: c('text-primary'),
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {monthName} {year}
          </div>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setView(new Date(year, view.getMonth() + 1, 1))}
            style={iconStepperStyle()}
          >
            <IconChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            ...typeStyle('footnote'),
            color: c('text-third'),
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: 4,
          }}
        >
          {WEEKDAYS_3.map((d) => (
            <div key={d} style={{ textAlign: 'center', padding: '4px 0' }}>
              {d[0]}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
          }}
        >
          {cells.map((d) => {
            const inMonth = d.getMonth() === view.getMonth();
            const isToday = sameDay(d, today);
            const isPicked = sameDay(d, picked);
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => setPicked(d)}
                style={{
                  ...typeStyle('caption'),
                  height: 36,
                  borderRadius: 6,
                  border:
                    isToday && !isPicked
                      ? `1px solid ${c('border-second')}`
                      : '1px solid transparent',
                  background: isPicked ? c('button-bg-primary') : 'transparent',
                  color: isPicked
                    ? c('bg-low')
                    : inMonth
                      ? c('text-primary')
                      : c('text-third'),
                  fontWeight: isPicked || isToday ? 600 : 400,
                  cursor: 'pointer',
                  fontVariantNumeric: 'tabular-nums',
                  transition: 'background 80ms, color 80ms',
                }}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
        <div
          style={{
            ...typeStyle('footnote'),
            color: c('text-third'),
            marginTop: 12,
            textAlign: 'center',
          }}
        >
          Selected · <span style={{ color: c('text-primary'), fontWeight: 600 }}>
            {formatBrandDate(picked, today)}
          </span>
        </div>
      </div>
      {/* Year column — scrollable, click any year to jump. The
          calendar's month stays the same; only the year flips. */}
      <div
        ref={yearScrollRef}
        style={{
          width: 80,
          maxHeight: 320,
          overflowY: 'auto',
          background: c('bg-low'),
          border: `1px solid ${c('border-third')}`,
          borderRadius: 8,
          padding: 4,
          scrollbarWidth: 'thin',
        }}
      >
        {years.map((y) => {
          const sel = y === year;
          return (
            <button
              key={y}
              type="button"
              data-year={y}
              onClick={() => setView(new Date(y, view.getMonth(), 1))}
              style={{
                ...typeStyle('caption'),
                width: '100%',
                padding: '6px 8px',
                borderRadius: 4,
                background: sel ? c('button-bg-primary') : 'transparent',
                color: sel ? c('bg-low') : c('text-primary'),
                fontWeight: sel ? 600 : 400,
                fontVariantNumeric: 'tabular-nums',
                cursor: 'pointer',
                border: 'none',
                textAlign: 'left',
              }}
            >
              {y}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Section: Calendar ────────────────────────────────────────

function SectionCalendar() {
  // Match the in-app calendar exactly. Time column has no left
  // padding — labels sit flush with the table's outer edge. Half-
  // hour boundaries are labelled (8:00, 8:30, 9:00); the 15-minute
  // ticks in between draw a quieter divider but no label.
  const HALF_HOUR_LABELS = ['8:00', '8:30', '9:00', '9:30'];
  const groups = ['11-12 G', '11-12 B', '13-14 G', '13-14 B'];
  // Row sequence: each labelled row is followed by an unlabelled
  // row that represents the 15-minute tick. Use `null` to mark the
  // tick rows so the renderer can pick the right border color.
  const rowSeq: (string | null)[] = [];
  HALF_HOUR_LABELS.forEach((label, i) => {
    rowSeq.push(label);
    if (i < HALF_HOUR_LABELS.length - 1) rowSeq.push(null);
  });
  return (
    <Section
      id="calendar"
      title="Calendar"
      description="Headers and row labels exactly as the app draws them. The white 1.5px line below the column labels matches the table grammar; half-hour dividers use border-second; the 15-minute tick lines between them use border-third. Vertical age-group dividers live in the body only and sit 2px to the left of each label."
    >
      <Group title="Headers & Row Labels">
        <Specimen>
          <div>
            {/* Header band — column labels with the canonical
                white 1.5px underline. Time column has no left
                padding so the labels start at the outer edge. */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: '88px repeat(4, 1fr)',
                ...typeStyle('caption'),
                color: c('text-third'),
                borderBottom: `1.5px solid ${rampValue('neutral', 100)}`,
              }}
            >
              <div style={{ padding: '8px 0' }}>Time</div>
              {groups.map((g) => (
                <div key={g} style={{ padding: '8px 12px' }}>
                  {g}
                </div>
              ))}
            </div>
            {rowSeq.map((label, i) => {
              const isLabelled = label != null;
              // Labelled rows draw a border-second; tick rows use
              // border-third. First row has no top border (handled
              // by the header underline above).
              const top =
                i === 0
                  ? 'none'
                  : isLabelled
                    ? `1px solid ${c('border-second')}`
                    : `1px solid ${c('border-third')}`;
              return (
                <div
                  key={i}
                  className="grid"
                  style={{
                    gridTemplateColumns: '88px repeat(4, 1fr)',
                    borderTop: top,
                    minHeight: 28,
                    ...typeStyle('caption'),
                    color: c('text-third'),
                  }}
                >
                  <div
                    style={{
                      padding: '4px 0',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {label ?? ''}
                  </div>
                  {groups.map((_, col) => (
                    // Each age-group cell carries a 1px vertical line
                    // at left:10 (2px to the left of the label's
                    // 12px pad-left). Lives in body rows only — the
                    // header above stays clean.
                    <div key={col} style={{ position: 'relative' }}>
                      <span
                        aria-hidden
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 10,
                          width: 1,
                          background: c('border-third'),
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

// ── Section: Drag & Sort ──────────────────────────────────────

function SectionDragAndSort() {
  return (
    <Section
      id="drag-sort"
      title="Drag & Sort"
      description="Affordances that signal grab me. All examples are interactive."
    >
      <Group title="Chip Resize" description="Click a chip to select it. The handle and selection ring only appear once selected. Text always anchors top-left and truncates if the chip is too narrow. Two single-axis chips on the left, plus a free chip on the right that resizes both axes at once.">
        <Specimen>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <ResizableChip axis="x" />
              <ResizableChip axis="y" />
            </div>
            <div>
              <ResizableChip axis="xy" />
            </div>
          </div>
        </Specimen>
      </Group>

      <Group title="Sortable Rows">
        <Specimen>
          <div className="space-y-6">
            <SortableList variant="basic" />
            <SortableList variant="checkbox-left" />
            <SortableList variant="color-row" />
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

/**
 * Resizable chip that mirrors the editor: handle + ring only appear
 * once selected, text stays top-left and truncates when too narrow.
 */
function ResizableChip({ axis }: { axis: 'x' | 'y' | 'xy' }) {
  const [w, setW] = useState(axis === 'y' ? 200 : 220);
  const [h, setH] = useState(axis === 'x' ? 28 : 90);
  const [selected, setSelected] = useState(false);
  const accent =
    axis === 'x'
      ? ramp('blue', 700)
      : axis === 'y'
        ? ramp('purple', 700)
        : ramp('green', 700);

  /** Generic drag start factory — captures starting w/h and updates
   *  whichever dimensions the handle is responsible for. */
  const startDrag = (
    e: React.MouseEvent,
    options: { dx?: 1 | 0; dy?: 1 | 0 }
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = w;
    const startH = h;
    const onMove = (ev: MouseEvent) => {
      if (options.dx) {
        const next = startW + (ev.clientX - startX);
        setW(Math.max(60, Math.min(420, next)));
      }
      if (options.dy) {
        const next = startH + (ev.clientY - startY);
        setH(Math.max(28, Math.min(220, next)));
      }
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div className="flex items-center gap-3">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelected(true);
        }}
        onBlur={() => setSelected(false)}
        tabIndex={0}
        style={{
          position: 'relative',
          width: w,
          height: h,
          background: accent,
          borderRadius: 6,
          // Black text — chip backgrounds are mid-light accents and a
          // black title reads consistently across all of them.
          color: '#0a0a0a',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          ...typeStyle('caption'),
          fontWeight: 600,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          outline: selected ? `2px solid ${c('focus-ring')}` : 'none',
          outlineOffset: -2,
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
          }}
        >
          Click to select
        </span>
        {selected && (axis === 'x' || axis === 'xy') && (
          <span
            role="separator"
            aria-orientation="vertical"
            onMouseDown={(e) => startDrag(e, { dx: 1 })}
            style={{
              position: 'absolute',
              right: -3,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 6,
              height: 18,
              cursor: 'ew-resize',
              background: '#0a0a0a',
              borderRadius: 9999,
              opacity: 0.95,
            }}
          />
        )}
        {selected && (axis === 'y' || axis === 'xy') && (
          <span
            role="separator"
            aria-orientation="horizontal"
            onMouseDown={(e) => startDrag(e, { dy: 1 })}
            style={{
              position: 'absolute',
              bottom: -3,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 18,
              height: 6,
              cursor: 'ns-resize',
              background: '#0a0a0a',
              borderRadius: 9999,
              opacity: 0.95,
            }}
          />
        )}
        {selected && axis === 'xy' && (
          <span
            role="separator"
            aria-label="Resize both"
            onMouseDown={(e) => startDrag(e, { dx: 1, dy: 1 })}
            style={{
              position: 'absolute',
              right: -3,
              bottom: -3,
              width: 12,
              height: 12,
              cursor: 'nwse-resize',
              background: '#0a0a0a',
              borderRadius: 9999,
              opacity: 0.95,
            }}
          />
        )}
      </div>
      <span style={{ ...typeStyle('footnote'), color: c('text-third') }}>
        {axis === 'xy' ? `${w} × ${h}` : axis === 'x' ? `${w}px` : `${h}px`}
      </span>
    </div>
  );
}

function SortableList({
  variant,
}: {
  variant: 'basic' | 'checkbox-left' | 'color-row';
}) {
  const [items, setItems] = useState(() =>
    [1, 2, 3, 4].map((n) => ({
      id: `${variant}-${n}`,
      label: `Item ${n}`,
      checked: n === 1,
    }))
  );
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  return (
    <div className="max-w-md">
      <div
        style={{
          ...typeStyle('caption'),
          color: c('text-third'),
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: 6,
        }}
      >
        {variant === 'basic'
          ? 'Drag handle on the right'
          : variant === 'checkbox-left'
            ? 'Checkbox + text + drag handle'
            : 'Color row with checkbox + handle on the right'}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            setItems((arr) => {
              const oldIdx = arr.findIndex((i) => i.id === active.id);
              const newIdx = arr.findIndex((i) => i.id === over.id);
              return arrayMove(arr, oldIdx, newIdx);
            });
          }
        }}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div
            style={
              variant === 'color-row'
                ? undefined
                : { border: `1px solid ${c('border-third')}`, overflow: 'hidden' }
            }
          >
            {items.map((it, idx) => (
              <SortableRow
                key={it.id}
                id={it.id}
                label={it.label}
                idx={idx}
                checked={it.checked}
                onToggle={() =>
                  setItems((arr) =>
                    arr.map((row) =>
                      row.id === it.id ? { ...row, checked: !row.checked } : row
                    )
                  )
                }
                variant={variant}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableRow({
  id,
  label,
  idx,
  checked,
  onToggle,
  variant,
}: {
  id: string;
  label: string;
  idx: number;
  checked: boolean;
  onToggle: () => void;
  variant: 'basic' | 'checkbox-left' | 'color-row';
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const colorRow =
    variant === 'color-row'
      ? ramp(
          (['green', 'orange', 'blue', 'purple'] as const)[idx % 4],
          700
        )
      : null;
  const rowBg = colorRow ?? c('bg-med');
  const rowFg = colorRow ? '#0a0a0a' : c('text-primary');
  const rowMutedFg = colorRow ? 'rgba(15,17,21,0.65)' : c('text-third');
  // Color-row variant uses a 4px corner radius and a 2px gap between
  // siblings (rendered via `marginBottom` since each row is its own
  // standalone draggable). Other variants stay edge-to-edge.
  const isColor = variant === 'color-row';
  // Equal vertical padding across all variants now that the whole
  // row is the drag affordance.
  const padY = 8;
  return (
    <div
      ref={setNodeRef}
      // Whole-row drag: spread dnd-kit's listeners + attributes
      // here so any drag gesture starting inside the row triggers
      // the sort. The checkbox stops propagation on its own click
      // so it remains tappable.
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        background: rowBg,
        color: rowFg,
        borderTop:
          isColor || idx === 0 ? 'none' : `1px solid ${c('border-third')}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: `${padY}px 12px`,
        borderRadius: isColor ? 4 : 0,
        marginBottom: isColor ? 2 : 0,
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      {variant === 'checkbox-left' && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox checked={checked} onChange={onToggle} label="" />
        </div>
      )}
      <span
        style={{
          ...typeStyle('body'),
          color: rowFg,
          // Color-row text reads one weight heavier per design.
          fontWeight: isColor ? 600 : 400,
          flex: 1,
          minWidth: 0,
        }}
      >
        {label}
      </span>
      {variant === 'color-row' && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          <Checkbox
            checked={checked}
            onChange={onToggle}
            label=""
            // Color-row sits on a saturated background so the
            // default neutral border melts into the chip; force
            // the resting outline to black here.
            forceOutline="#0a0a0a"
          />
          <span
            aria-hidden
            style={{
              color: rowMutedFg,
              display: 'inline-flex',
              alignItems: 'center',
              padding: 4,
            }}
          >
            <IconDragHandle className="w-4 h-4" />
          </span>
        </div>
      )}
      {variant !== 'color-row' && (
        <span
          aria-hidden
          style={{
            color: rowMutedFg,
            display: 'inline-flex',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <IconDragHandle className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}

// ── Section: Tooltips ─────────────────────────────────────────

function SectionTooltips() {
  return (
    <Section
      id="tooltip"
      title="Tooltips"
      description="Three styles of tooltip across two rows. The top row is interactive — hover any icon to feel the real popover. The bottom row shows the same three styles statically, side by side, so the open state can be inspected without hovering."
    >
      <Group title="Hoverable" description="Just icons. Hover one to see the corresponding tooltip style.">
        <Specimen>
          {/* Spread horizontally with justify-between so the three
              triggers anchor at left / center / right of the
              specimen, not bunched at the start. */}
          <div
            className="flex items-center justify-between"
            style={{ paddingTop: 96, paddingBottom: 16, gap: 24 }}
          >
            <TooltipHover>
              <TooltipParagraph>One-line tip.</TooltipParagraph>
            </TooltipHover>
            <TooltipHover>
              <TooltipTitle>Heads up</TooltipTitle>
              <TooltipParagraph muted>
                Body text appears below the title for context.
              </TooltipParagraph>
            </TooltipHover>
            <TooltipHover>
              <TooltipTitle>New feature</TooltipTitle>
              <TooltipParagraph muted>
                Use this to call out a small piece of UI.
              </TooltipParagraph>
              <TooltipActionButton>Learn more</TooltipActionButton>
            </TooltipHover>
          </div>
        </Specimen>
      </Group>

      <Group title="Static Layouts" description="Each variant rendered open. The action button on the right sits on its own line below the body — never inline with the paragraph text.">
        <Specimen>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            <TooltipStatic label="Plain">
              <TooltipParagraph>One-line tip.</TooltipParagraph>
            </TooltipStatic>
            <TooltipStatic label="Title + Body">
              <TooltipTitle>Heads up</TooltipTitle>
              <TooltipParagraph muted>
                Body text appears below the title for context.
              </TooltipParagraph>
            </TooltipStatic>
            <TooltipStatic label="Title + Body + Action">
              <TooltipTitle>New feature</TooltipTitle>
              <TooltipParagraph muted>
                Use this to call out a small piece of UI.
              </TooltipParagraph>
              <TooltipActionButton interactive={false}>
                Learn more
              </TooltipActionButton>
            </TooltipStatic>
          </div>
        </Specimen>
      </Group>
    </Section>
  );
}

/** Bare info-icon trigger that shows a popover on hover. The
 *  trigger box hugs the icon (5×5 = 20×20 px) — the popover floats
 *  freely above without expanding the host's hit area. */
function TooltipHover({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        position: 'relative',
        // Box ONLY around the icon. Earlier the wrapper grew with
        // the popover content, which pushed neighbours around when
        // a tooltip opened.
        width: 20,
        height: 20,
      }}
    >
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'help',
          color: c('text-third'),
          width: 20,
          height: 20,
        }}
      >
        <IconInfo className="w-5 h-5" />
      </span>
      {hover && <TooltipPopover>{children}</TooltipPopover>}
    </div>
  );
}

/** Static tooltip layout — the popover always renders open and a
 *  small caption describes which variant it represents. */
function TooltipStatic({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div
        style={{ ...typeStyle('footnote'), color: c('text-third') }}
        className="uppercase tracking-wide"
      >
        {label}
      </div>
      <div
        role="tooltip"
        style={{
          ...tooltipBoxStyle(),
          minWidth: 180,
          maxWidth: 260,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Shared popover chrome, used by `TooltipHover`. Solid black
 *  surface + border-third outline + slight shadow for separation. */
function TooltipPopover({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="tooltip"
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)',
        ...tooltipBoxStyle(),
        zIndex: 30,
        minWidth: 180,
        maxWidth: 260,
      }}
    >
      {children}
    </div>
  );
}

function tooltipBoxStyle(): React.CSSProperties {
  return {
    // 100% black surface per design feedback — the tooltip should
    // read as a foreign object floating over the page rather than
    // a beige panel inheriting the bg-high token.
    background: '#000000',
    border: `1px solid ${c('border-third')}`,
    borderRadius: 8,
    padding: 10,
    color: rampValue('neutral', 100),
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
    whiteSpace: 'normal',
  };
}

/** Tooltip title — bold caption-size line. */
function TooltipTitle({ children }: { children: React.ReactNode }) {
  return (
    <strong
      style={{
        ...typeStyle('caption'),
        display: 'block',
        color: rampValue('neutral', 100),
        fontWeight: 600,
        // No bottom margin — the paragraph component below sets its
        // own marginTop so the spacing is consistent across hoverable
        // and static instances.
      }}
    >
      {children}
    </strong>
  );
}

/** Tooltip body paragraph. `muted` shifts to a quieter neutral 300
 *  for subordinate context lines. Tighter line spacing (1.3×) to
 *  match the static layout — the previous style inherited the
 *  caption's leading and read too airy when wrapped to two lines. */
function TooltipParagraph({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      style={{
        ...typeStyle('caption'),
        // Tighter leading than caption's default 16px; 15px gives a
        // ~1.25 ratio that pulls multi-line copy together.
        lineHeight: '15px',
        display: 'block',
        marginTop: 2,
        color: muted ? rampValue('neutral', 300) : rampValue('neutral', 100),
      }}
    >
      {children}
    </span>
  );
}

/** Action button inside a tooltip. Sits on its own line below the
 *  body text (display: block + marginTop). When `interactive` is
 *  false the button still renders but doesn't activate on click —
 *  used by the static specimens. */
function TooltipActionButton({
  children,
  interactive = true,
}: {
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <button
      type="button"
      style={{
        ...typeStyle('caption'),
        display: 'block',
        marginTop: 8,
        padding: '4px 8px',
        background: rampValue('neutral', 100),
        color: '#000000',
        borderRadius: 4,
        fontWeight: 600,
        border: 'none',
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      {children}
    </button>
  );
}

// ── Section: Icons ────────────────────────────────────────────

function SectionIcons() {
  // Grouped by intent so the catalogue scans by purpose, not by name.
  const groups: { label: string; icons: { name: string; el: React.ReactNode }[] }[] = [
    {
      label: 'Arrows',
      icons: [
        { name: 'ArrowUp', el: <IconArrowUp className="w-5 h-5" /> },
        { name: 'ArrowDown', el: <IconArrowDown className="w-5 h-5" /> },
        { name: 'ArrowLeft', el: <IconArrowLeft className="w-5 h-5" /> },
        { name: 'ArrowRight', el: <IconArrowRight className="w-5 h-5" /> },
        { name: 'ArrowUpLeft', el: <IconArrowDiagonalUpLeft className="w-5 h-5" /> },
        { name: 'ArrowUpRight', el: <IconArrowDiagonalUpRight className="w-5 h-5" /> },
        { name: 'ArrowDownLeft', el: <IconArrowDiagonalDownLeft className="w-5 h-5" /> },
        { name: 'ArrowDownRight', el: <IconArrowDiagonalDownRight className="w-5 h-5" /> },
        { name: 'ChevronUp', el: <IconChevronUp className="w-5 h-5" /> },
        { name: 'ChevronDown', el: <IconChevronDown className="w-5 h-5" /> },
        { name: 'ChevronLeft', el: <IconChevronLeft className="w-5 h-5" /> },
        { name: 'ChevronRight', el: <IconChevronRight className="w-5 h-5" /> },
      ],
    },
    {
      label: 'Actions',
      icons: [
        { name: 'Plus', el: <IconPlus className="w-5 h-5" /> },
        { name: 'Minus', el: <IconMinus className="w-5 h-5" /> },
        { name: 'Check', el: <IconCheck className="w-5 h-5" /> },
        { name: 'Close', el: <IconClose className="w-5 h-5" /> },
        { name: 'Edit', el: <IconEdit className="w-5 h-5" /> },
        { name: 'Save', el: <IconSave className="w-5 h-5" /> },
        { name: 'Copy', el: <IconCopy className="w-5 h-5" /> },
        { name: 'Duplicate', el: <IconDuplicate className="w-5 h-5" /> },
        { name: 'Trash', el: <IconTrash className="w-5 h-5" /> },
        { name: 'Undo', el: <IconUndo className="w-5 h-5" /> },
        { name: 'Redo', el: <IconRedo className="w-5 h-5" /> },
        { name: 'Refresh', el: <IconRefresh className="w-5 h-5" /> },
        { name: 'Upload', el: <IconUpload className="w-5 h-5" /> },
        { name: 'Download', el: <IconDownload className="w-5 h-5" /> },
        { name: 'Export', el: <IconExport className="w-5 h-5" /> },
        { name: 'Share', el: <IconShare className="w-5 h-5" /> },
        { name: 'Lock', el: <IconLock className="w-5 h-5" /> },
        { name: 'Unlock', el: <IconUnlock className="w-5 h-5" /> },
        { name: 'EyeOpen', el: <IconEyeOpen className="w-5 h-5" /> },
        { name: 'EyeClosed', el: <IconEyeClosed className="w-5 h-5" /> },
      ],
    },
    {
      label: 'Layout / view',
      icons: [
        { name: 'Menu', el: <IconMenu className="w-5 h-5" /> },
        { name: 'List', el: <IconList className="w-5 h-5" /> },
        { name: 'Grid', el: <IconGrid className="w-5 h-5" /> },
        { name: 'Columns', el: <IconColumns className="w-5 h-5" /> },
        { name: 'Rows', el: <IconRows className="w-5 h-5" /> },
        { name: 'Expand', el: <IconExpand className="w-5 h-5" /> },
        { name: 'Collapse', el: <IconCollapse className="w-5 h-5" /> },
        { name: 'Filter', el: <IconFilter className="w-5 h-5" /> },
        { name: 'Search', el: <IconSearch className="w-5 h-5" /> },
        { name: 'Settings', el: <IconSettings className="w-5 h-5" /> },
        { name: 'DragHandle', el: <IconDragHandle className="w-5 h-5" /> },
      ],
    },
    {
      label: 'Time / calendar',
      icons: [
        { name: 'Calendar', el: <IconCalendar className="w-5 h-5" /> },
        { name: 'Clock', el: <IconClock className="w-5 h-5" /> },
        { name: 'Stopwatch', el: <IconStopwatch className="w-5 h-5" /> },
      ],
    },
    {
      label: 'Communication / status',
      icons: [
        { name: 'Bell', el: <IconBell className="w-5 h-5" /> },
        { name: 'Mail', el: <IconMail className="w-5 h-5" /> },
        { name: 'Chat', el: <IconChat className="w-5 h-5" /> },
        { name: 'Info', el: <IconInfo className="w-5 h-5" /> },
        { name: 'Alert', el: <IconAlert className="w-5 h-5" /> },
        { name: 'CheckCircle', el: <IconCheckCircle className="w-5 h-5" /> },
        { name: 'Star', el: <IconStar className="w-5 h-5" /> },
        { name: 'Heart', el: <IconHeart className="w-5 h-5" /> },
        { name: 'Bookmark', el: <IconBookmark className="w-5 h-5" /> },
        { name: 'Flag', el: <IconFlag className="w-5 h-5" /> },
      ],
    },
    {
      label: 'Files / data',
      icons: [
        { name: 'File', el: <IconFile className="w-5 h-5" /> },
        { name: 'Folder', el: <IconFolder className="w-5 h-5" /> },
        { name: 'Image', el: <IconImage className="w-5 h-5" /> },
        { name: 'Link', el: <IconLink className="w-5 h-5" /> },
        { name: 'Pin', el: <IconPin className="w-5 h-5" /> },
      ],
    },
    {
      label: 'People / activity',
      icons: [
        { name: 'User', el: <IconUser className="w-5 h-5" /> },
        { name: 'Users', el: <IconUsers className="w-5 h-5" /> },
        { name: 'Runner', el: <IconRunner className="w-5 h-5" /> },
        { name: 'Trophy', el: <IconTrophy className="w-5 h-5" /> },
        { name: 'Target', el: <IconTarget className="w-5 h-5" /> },
        { name: 'Play', el: <IconPlay className="w-5 h-5" /> },
        { name: 'Pause', el: <IconPause className="w-5 h-5" /> },
      ],
    },
    {
      label: 'Theme',
      icons: [
        { name: 'Sun', el: <IconSun className="w-5 h-5" /> },
        { name: 'Moon', el: <IconMoon className="w-5 h-5" /> },
      ],
    },
  ];
  return (
    <Section
      id="icons"
      title="Icons"
      description="Stroke icons. Sized 18 to 24px on a 1.75 stroke. Grouped by intent so the catalogue scans by purpose."
    >
      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g.label} className="space-y-3">
            <div
              style={{ ...typeStyle('footnote'), color: c('text-third') }}
              className="uppercase tracking-wide"
            >
              {g.label}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {g.icons.map((i) => (
                <div
                  key={i.name}
                  className="rounded-lg p-4 flex flex-col items-center gap-2"
                  style={{
                    border: `1px solid ${c('border-third')}`,
                    color: c('text-primary'),
                  }}
                >
                  {i.el}
                  <code style={{ ...typeStyle('footnote'), color: c('text-third') }}>
                    {i.name}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Section: Layouts ─────────────────────────────────────────
//
// A second tier of the system. Where everything above documents
// atomic primitives, this section composes those primitives into
// the kinds of full-page screens the apps actually render. Visible
// divider above + white section title makes it clear this isn't
// "more pieces" — it's the next level up.

function SectionLayouts() {
  return (
    <section
      id="layouts"
      className="scroll-mt-24"
      style={{ paddingTop: 64, marginTop: 24 }}
    >
      <div
        style={{
          borderTop: `1px solid ${c('border-second')}`,
          marginBottom: 32,
        }}
      />
      <header style={{ marginBottom: 24 }}>
        <h2
          style={{
            ...typeStyle('largeTitle'),
            color: c('text-primary'),
            margin: 0,
            fontWeight: 600,
          }}
        >
          Layouts
        </h2>
        <p
          style={{
            ...typeStyle('body'),
            color: c('text-third'),
            marginTop: 6,
          }}
        >
          Composed views built from the primitives above. These
          previews are informational — they're not interactive screens
          you can navigate, just shape references.
        </p>
      </header>

      <div className="space-y-12">
        <LayoutGroup title="Dashboards">
          <ScrollIn delay={0}>
            <DashboardLayout />
          </ScrollIn>
        </LayoutGroup>

        <LayoutGroup title="Tables">
          <ScrollIn delay={0}>
            <TableLayout />
          </ScrollIn>
        </LayoutGroup>

        <LayoutGroup title="Forms">
          <ScrollIn delay={0}>
            <FormLayout />
          </ScrollIn>
        </LayoutGroup>

        <LayoutGroup title="Calendars">
          <ScrollIn delay={0}>
            <CalendarLayout />
          </ScrollIn>
        </LayoutGroup>
      </div>
    </section>
  );
}

function LayoutGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        style={{
          ...typeStyle('title2'),
          color: c('text-primary'),
          margin: 0,
          marginBottom: 16,
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ── Dashboard layout ───────────────────────────────────────────── */

function DashboardLayout() {
  // Composes: stats cards (line + bar + horizontal + gauge + pie),
  // a header row with a title-style dropdown, and a sortable list
  // panel down the side. Mirrors the sort of overview a viewer sees
  // when they open the app.
  return (
    <div
      style={{
        border: `1px solid ${c('border-third')}`,
        borderRadius: 12,
        background: c('bg-low'),
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <ScrollIn delay={0}>
          <StatsLineCard
            label="Active members"
            hint="last 8 weeks"
            tone="expressive"
            accent="green"
          />
        </ScrollIn>
        <ScrollIn delay={70}>
          <StatsBarCard
            label="New signups"
            hint="last 8 weeks"
            tone="expressive"
            accent="blue"
          />
        </ScrollIn>
        <ScrollIn delay={140}>
          <StatsGaugeCard
            label="Goal · Active"
            value={68}
            tone="expressive"
            accent="orange"
          />
        </ScrollIn>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ScrollIn delay={0}>
          <StatsHorizontalBarsCard tone="expressive" />
        </ScrollIn>
        <ScrollIn delay={70}>
          <StatsPieCard tone="expressive" />
        </ScrollIn>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <DropdownDemo size="lg" />
        <span style={{ ...typeStyle('caption'), color: c('text-third') }}>
          / today
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Btn variant="ghost" size="sm" iconLeft={<IconRefresh className="w-4 h-4" />}>
          Refresh
        </Btn>
        <Btn variant="primary" size="sm" iconLeft={<IconPlus className="w-4 h-4" />}>
          New
        </Btn>
      </div>
    </div>
  );
}

/* ── Table layout ───────────────────────────────────────────────── */

function TableLayout() {
  // Composes: search field, segmented control filter, full-width
  // table, sort chips above. This is the shape a "list of records"
  // view takes across the app.
  const [tab, setTab] = useState('All');
  const ROWS = [
    { name: 'Item one', tag: 'Sprint', updated: 'Wed', value: 1248, status: 'Active', highlight: false },
    { name: 'Item two', tag: 'Distance', updated: 'Tue', value: 942, status: 'Active', highlight: true },
    { name: 'Item three', tag: 'Sprint', updated: 'Mon', value: 521, status: 'Active', highlight: true },
    { name: 'Item four', tag: 'Hurdles', updated: 'Jun 4', value: 311, status: 'Pending', highlight: false },
    { name: 'Item five', tag: 'Throws', updated: 'Jun 2', value: 218, status: 'Pending', highlight: false },
    { name: 'Item six', tag: 'Jumps', updated: 'May 28', value: 142, status: 'Active', highlight: false },
  ];
  const HL = ramp('green', 700);
  return (
    <div
      style={{
        border: `1px solid ${c('border-third')}`,
        borderRadius: 12,
        background: c('bg-low'),
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, maxWidth: 320 }}>
          <SearchInput />
        </div>
        <Segmented
          variant="round"
          size="md"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Active', label: 'Active' },
            { value: 'Pending', label: 'Pending' },
          ]}
        />
      </div>
      {renderTable({
        header: ['Name', 'Tag', 'Updated', 'Status', 'Value'],
        rows: ROWS.map((r) => ({
          cells: [
            r.name,
            r.tag,
            r.updated,
            r.status,
            r.value.toLocaleString(),
          ],
          highlight: r.highlight ? HL : undefined,
          textColor: r.highlight ? '#0a0a0a' : undefined,
        })),
        layout: {
          template: '1.6fr 1fr 1fr 1fr auto',
          fullWidth: true,
          cellPadY: 10,
          divider: 'second',
        },
      })}
    </div>
  );
}

/* ── Form layout ───────────────────────────────────────────────── */

function FormLayout() {
  return (
    <div
      style={{
        border: `1px solid ${c('border-third')}`,
        borderRadius: 12,
        background: c('bg-low'),
        padding: 24,
        maxWidth: 640,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div>
        <h4
          style={{
            ...typeStyle('title3'),
            color: c('text-primary'),
            margin: 0,
            fontWeight: 600,
          }}
        >
          New record
        </h4>
        <p
          style={{
            ...typeStyle('bodySmall'),
            color: c('text-third'),
            marginTop: 4,
          }}
        >
          Generic placeholder form composed from the input + select +
          radio + switch primitives.
        </p>
      </div>
      <div>
        <Label>Name</Label>
        <input style={inputStyles('default')} defaultValue="Sample Record" />
      </div>
      <div>
        <Label>Category</Label>
        <DropdownDemo size="md" />
      </div>
      <div>
        <Label>Notes</Label>
        <Textarea />
      </div>
      <div>
        <Label>Visibility</Label>
        <FormVisibilityRadios />
      </div>
      <FormVisibilitySwitch />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Btn variant="ghost" size="md">
          Cancel
        </Btn>
        <Btn variant="primary" size="md">
          Save
        </Btn>
      </div>
    </div>
  );
}

function FormVisibilityRadios() {
  const [v, setV] = useState('private');
  return (
    <div className="flex flex-col gap-2 mt-1">
      {(['private', 'team', 'public'] as const).map((opt) => (
        <Radio
          key={opt}
          name="visibility"
          value={opt}
          checked={v === opt}
          onChange={setV}
          label={opt[0].toUpperCase() + opt.slice(1)}
        />
      ))}
    </div>
  );
}

function FormVisibilitySwitch() {
  const [on, setOn] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 24,
        padding: '12px 0',
        borderTop: `1px solid ${c('border-third')}`,
      }}
    >
      <div>
        <div style={{ ...typeStyle('body'), color: c('text-primary'), fontWeight: 500 }}>
          Notify on update
        </div>
        <div style={{ ...typeStyle('bodySmall'), color: c('text-third') }}>
          Email subscribers when this record changes.
        </div>
      </div>
      <Switch checked={on} onChange={setOn} label="" tone="expressive" />
    </div>
  );
}

/* ── Calendar layout ───────────────────────────────────────────── */

function CalendarLayout() {
  // Composes: a day-tabs strip, the calendar header + row labels
  // that already live in the system, and the date picker on the side.
  return (
    <div
      style={{
        border: `1px solid ${c('border-third')}`,
        borderRadius: 12,
        background: c('bg-low'),
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <CalendarLayoutHeader />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: 24,
          alignItems: 'start',
        }}
      >
        <CalendarLayoutBody />
        <DatePicker />
      </div>
    </div>
  );
}

function CalendarLayoutHeader() {
  const [day, setDay] = useState('day1');
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <h4
          style={{
            ...typeStyle('title2'),
            color: c('text-primary'),
            margin: 0,
            fontWeight: 600,
          }}
        >
          Sample calendar
        </h4>
        <span style={{ ...typeStyle('caption'), color: c('text-third') }}>
          Day 1 / Day 2
        </span>
      </div>
      <Segmented
        variant="round"
        size="md"
        value={day}
        onChange={setDay}
        options={[
          { value: 'day1', label: 'Day 1' },
          { value: 'day2', label: 'Day 2' },
        ]}
      />
    </div>
  );
}

function CalendarLayoutBody() {
  // Lightweight clone of SectionCalendar's grid so this layout can
  // sit beside the DatePicker without coupling to that section's
  // internals.
  const HALF_HOUR_LABELS = ['8:00', '8:30', '9:00', '9:30', '10:00'];
  const groups = ['Group A', 'Group B', 'Group C', 'Group D'];
  const rowSeq: (string | null)[] = [];
  HALF_HOUR_LABELS.forEach((label, i) => {
    rowSeq.push(label);
    if (i < HALF_HOUR_LABELS.length - 1) rowSeq.push(null);
  });
  return (
    <div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: '64px repeat(4, 1fr)',
          ...typeStyle('caption'),
          color: c('text-third'),
          borderBottom: `1.5px solid ${rampValue('neutral', 100)}`,
        }}
      >
        <div style={{ padding: '8px 0' }}>Time</div>
        {groups.map((g) => (
          <div key={g} style={{ padding: '8px 12px' }}>
            {g}
          </div>
        ))}
      </div>
      {rowSeq.map((label, i) => {
        const isLabelled = label != null;
        const top =
          i === 0
            ? 'none'
            : isLabelled
              ? `1px solid ${c('border-second')}`
              : `1px solid ${c('border-third')}`;
        return (
          <div
            key={i}
            className="grid"
            style={{
              gridTemplateColumns: '64px repeat(4, 1fr)',
              borderTop: top,
              minHeight: 28,
              ...typeStyle('caption'),
              color: c('text-third'),
            }}
          >
            <div style={{ padding: '4px 0', fontVariantNumeric: 'tabular-nums' }}>
              {label ?? ''}
            </div>
            {groups.map((_, col) => (
              <div key={col} style={{ position: 'relative' }}>
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 10,
                    width: 1,
                    background: c('border-third'),
                  }}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────

function SectionFooter() {
  return (
    <footer
      style={{
        paddingTop: 32,
        marginTop: 48,
        borderTop: `1px solid ${c('border-third')}`,
      }}
    >
      <p style={{ ...typeStyle('footnote'), color: c('text-third') }}>
        Buena Brand System · v0.4 · Live components imported from{' '}
        <code style={{ color: c('text-primary') }}>src/</code>. Tokens live in{' '}
        <code style={{ color: c('text-primary') }}>src/styles/tokens.ts</code>.
      </p>
    </footer>
  );
}

export type { RampStep };
