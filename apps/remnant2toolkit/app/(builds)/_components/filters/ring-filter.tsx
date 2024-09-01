import {
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';

import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import { ringItems } from '@/app/(items)/_constants/ring-items';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function RingFilter({ value, onChange }: Props) {
  const allRings: string[] = ringItems.map((item) => item.name);
  allRings.unshift(DEFAULT_FILTER);

  const options = allRings.map((ring) => ({
    label: ring,
    value: ring,
  }));

  return (
    <BaseField>
      <BaseLabel>Rings</BaseLabel>
      <BaseListbox multiple name="ring" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
