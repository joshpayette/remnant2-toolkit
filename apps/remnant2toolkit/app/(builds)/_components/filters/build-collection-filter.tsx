import {
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';

interface Props {
  value: PercentageOwned;
  onChange: (value: PercentageOwned) => void;
}

export type PercentageOwned = 99 | 95 | 90 | 75 | 50 | 0;

export function BuildCollectionFilter({ value, onChange }: Props) {
  const options = [
    {
      label: '>= 99% Owned',
      value: 99,
    },
    {
      label: '>= 95% Owned',
      value: 95,
    },
    {
      label: '>= 90% Owned',
      value: 90,
    },
    {
      label: '>= 75% Owned',
      value: 75,
    },
    {
      label: '>= 50% Owned',
      value: 50,
    },
  ];

  return (
    <BaseField>
      <BaseLabel>Owned Items</BaseLabel>
      <BaseListbox name="withCollection" value={value} onChange={onChange}>
        {options.map(({ label: l, value: v }) => (
          <BaseListboxOption key={v} value={v}>
            <BaseListboxLabel>{l}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
