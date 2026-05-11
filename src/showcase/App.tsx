import { useEffect, useState } from 'react';
import { BrandSystem } from './BrandSystem';

type Brand = 'atho' | 'carespace';

export function App() {
  const [brand, setBrand] = useState<Brand>(() => {
    if (typeof document === 'undefined') return 'atho';
    const cur = document.documentElement.getAttribute('data-brand');
    return cur === 'carespace' ? 'carespace' : 'atho';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
  }, [brand]);

  return (
    <>
      <BrandSkinPicker brand={brand} setBrand={setBrand} />
      <BrandSystem />
    </>
  );
}

function BrandSkinPicker({
  brand,
  setBrand,
}: {
  brand: Brand;
  setBrand: (b: Brand) => void;
}) {
  // Small fixed control that demonstrates the data-brand skinning layer
  // by flipping `--color-accent` / `--color-accent-deep`. The swatches
  // are pure CSS-var consumers, so flipping `brand` recolors them with
  // no React state involved.
  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 8,
        background: 'rgb(var(--color-bg-panel))',
        border: '1px solid rgb(var(--color-stroke))',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 11,
        color: 'rgb(var(--color-fg))',
      }}
    >
      <span style={{ opacity: 0.7 }}>brand</span>
      <button
        type="button"
        onClick={() => setBrand(brand === 'atho' ? 'carespace' : 'atho')}
        style={{
          padding: '3px 8px',
          borderRadius: 6,
          border: '1px solid rgb(var(--color-stroke))',
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: 11,
        }}
      >
        {brand}
      </button>
      <span
        aria-label="accent swatch"
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: 'var(--color-accent)',
          border: '1px solid rgb(var(--color-stroke))',
        }}
      />
      <span
        aria-label="accent-deep swatch"
        style={{
          width: 14,
          height: 14,
          borderRadius: 3,
          background: 'var(--color-accent-deep)',
          border: '1px solid rgb(var(--color-stroke))',
        }}
      />
    </div>
  );
}
