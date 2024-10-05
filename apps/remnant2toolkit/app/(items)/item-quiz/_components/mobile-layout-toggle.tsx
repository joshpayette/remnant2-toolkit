import { BaseCheckbox, BaseField, BaseLabel, LayoutIcon } from '@repo/ui';

import { type LayoutPreference } from '@/app/(items)/item-quiz/_types/layout-preference';

interface Props {
  layoutPreference: LayoutPreference;
  onToggleLayoutPreference: () => void;
}

export function MobileLayoutToggle({
  layoutPreference,
  onToggleLayoutPreference,
}: Props) {
  return (
    <div className="hidden sm:mb-8 sm:flex sm:flex-row sm:items-center sm:justify-center">
      <LayoutIcon className="text-primary-500 mr-2 mt-2 h-5 w-5" />
      <BaseField className="flex items-center justify-start gap-x-2">
        <BaseLabel className="mt-2">Use mobile layout</BaseLabel>
        <BaseCheckbox
          name="layoutPreference"
          checked={layoutPreference === 'mobile'}
          onChange={onToggleLayoutPreference}
        />
      </BaseField>
    </div>
  );
}
