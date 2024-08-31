import {
  BaseField,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';

import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import { ALL_BOSSES } from '@/app/(data)/world-saves/constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function BossNameFilter({ value, onChange }: Props) {
  const options = ALL_BOSSES.map((boss) => ({
    label: boss.name as string,
    value: boss.name as string,
  }));
  options.unshift({ label: DEFAULT_FILTER, value: DEFAULT_FILTER });

  return (
    <BaseField>
      <BaseListbox name="bosses" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
