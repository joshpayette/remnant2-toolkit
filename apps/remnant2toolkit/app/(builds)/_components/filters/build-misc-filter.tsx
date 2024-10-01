import {
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';

import { BUILD_FILTER_KEYS } from '@/app/(builds)/_components/filters/types';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const MINIMUM_QUALITY_DESCRIPTION_LENGTH = 200;

export function BuildMiscFilter({ value, onChange }: Props) {
  const options = [
    {
      label: 'Only Quality Builds',
      value: BUILD_FILTER_KEYS.WITHQUALITY,
    },
    {
      label: 'Only Builds w/ Video',
      value: BUILD_FILTER_KEYS.WITHVIDEO,
    },
    {
      label: 'Only Builds w/ Reference Link',
      value: BUILD_FILTER_KEYS.WITHREFERENCE,
    },
    {
      label: 'Patch Affected Builds',
      value: BUILD_FILTER_KEYS.PATCHAFFECTED,
    },
  ];

  return (
    <BaseField>
      <BaseLabel>Include...</BaseLabel>
      <BaseListbox multiple name="misc" value={value} onChange={onChange}>
        {options.map(({ label: l, value: v }) => (
          <BaseListboxOption key={v} value={v}>
            <BaseListboxLabel>{l}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  );
}
