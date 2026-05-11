import { memo } from 'react';
import { BaseChip, type BaseChipProps } from './BaseChip';

// Showcase-only chip wrapper. v0.1 keeps the original `categoryId` API so
// BrandSystem.tsx renders unchanged; the 6 ids are internal palette slots
// (only the resolved color is user-visible). Renamed to BrandedChip in
// v0.2 with a generic colorKey API.
type CategoryId = 'sprint' | 'distance' | 'hurdles' | 'relay' | 'throws' | 'jumps';

const CATEGORY_COLOR: Record<CategoryId, string> = {
  sprint: '#a7be5a',
  distance: '#f5e4a2',
  hurdles: '#ed9356',
  relay: '#6493b0',
  throws: '#de594f',
  jumps: '#d75ba1',
};

interface AthoItemProps extends Omit<BaseChipProps, 'color'> {
  categoryId: CategoryId;
}

function AthoItemImpl({ categoryId, ...rest }: AthoItemProps) {
  return <BaseChip color={CATEGORY_COLOR[categoryId]} {...rest} />;
}

export const AthoItem = memo(AthoItemImpl);
