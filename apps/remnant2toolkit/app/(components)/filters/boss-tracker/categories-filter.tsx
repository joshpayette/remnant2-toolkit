import { BaseField, BaseLabel } from '@repo/ui';
import { BaseListbox, BaseListboxLabel, BaseListboxOption } from '@repo/ui';

import { DEFAULT_FILTER } from '@/app/(components)/filters/types';

export const VALID_BOSS_CATEGORIES = ['World Boss', 'Boss', 'Aberration'];

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function CategoriesFilter({ value, onChange }: Props) {
  const options = VALID_BOSS_CATEGORIES.map((category) => ({
    label: category as string,
    value: category,
  }));
  options.unshift({ label: DEFAULT_FILTER, value: DEFAULT_FILTER });

  return (
    <BaseField>
      <BaseLabel>Categories</BaseLabel>
      <BaseListbox multiple name="categories" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
