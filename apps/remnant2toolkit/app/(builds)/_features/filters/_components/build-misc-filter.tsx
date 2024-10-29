import {
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';

import { patchAffectedFilter } from '@/app/(builds)/_features/filters/_libs/patch-affected-filter';
import { withQualityFilter } from '@/app/(builds)/_features/filters/_libs/with-quality-filter';
import { withReferenceFilter } from '@/app/(builds)/_features/filters/_libs/with-reference-filter';
import { withVideoFilter } from '@/app/(builds)/_features/filters/_libs/with-video-filter';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function BuildMiscFilter({ value, onChange }: Props) {
  const options = [
    {
      label: withQualityFilter.label,
      value: withQualityFilter.defaultValue,
    },
    {
      label: withVideoFilter.label,
      value: withVideoFilter.defaultValue,
    },
    {
      label: withReferenceFilter.label,
      value: withReferenceFilter.defaultValue,
    },
    {
      label: patchAffectedFilter.label,
      value: patchAffectedFilter.defaultValue,
    },
  ];

  return (
    <BaseField>
      <BaseLabel>Include...</BaseLabel>
      <BaseListbox multiple name="misc" value={value} onChange={onChange}>
        {options.map(({ label: l, value: v }) => (
          <BaseListboxOption key={v as string} value={v}>
            <BaseListboxLabel>{l}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
