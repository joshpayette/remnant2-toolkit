import {
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';
import { useSession } from 'next-auth/react';

interface Props {
  value: PercentageOwned;
  onChange: (value: PercentageOwned) => void;
}

export type PercentageOwned = 100 | 95 | 90 | 75 | 50 | 0;

export function BuildCollectionFilter({ value, onChange }: Props) {
  const { data: session } = useSession();

  const options = [
    {
      label: 'All',
      value: 0,
    },
    {
      label: '100% Owned',
      value: 100,
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
      <BaseListbox
        disabled={!session?.user?.id}
        name="withCollection"
        value={value}
        onChange={onChange}
      >
        {options.map(({ label: l, value: v }) => (
          <BaseListboxOption key={v} value={v}>
            <BaseListboxLabel>{l}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
