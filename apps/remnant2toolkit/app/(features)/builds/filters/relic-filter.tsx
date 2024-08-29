import {
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';

import { relicItems } from '@/app/(data)/items/relic-items';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function RelicFilter({ value, onChange }: Props) {
  const allRelics: string[] = relicItems.map((item) => item.name);
  allRelics.unshift('All');

  const options = allRelics.map((relic) => ({
    label: relic,
    value: relic,
  }));

  return (
    <BaseField>
      <BaseLabel>Relic</BaseLabel>
      <BaseListbox
        key={value as string}
        name="relic"
        value={value}
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
