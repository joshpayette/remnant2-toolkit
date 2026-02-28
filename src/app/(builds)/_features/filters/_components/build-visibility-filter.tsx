import { useBuildVisibilityFilter } from '@/app/(builds)/_features/filters/_hooks/use-build-visibility-filter';
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/ui/base/listbox';

interface Props {
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function BuildVisibilityFilter({ isLoading, value, onChange }: Props) {
  const { buildVisibilityOptions } = useBuildVisibilityFilter();

  return (
    <BaseListbox
      key={value}
      name="buildVisibility"
      value={value}
      disabled={isLoading}
      onChange={onChange}
    >
      {buildVisibilityOptions.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  );
}
