import { Squares2X2Icon } from '@heroicons/react/24/solid'
import { BaseCheckbox } from '@repo/ui/base/checkbox'

import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import { LayoutPreference } from '@/app/item-quiz/types'

interface Props {
  layoutPreference: LayoutPreference
  onToggleLayoutPreference: () => void
}

export function MobileLayoutToggle({
  layoutPreference,
  onToggleLayoutPreference,
}: Props) {
  return (
    <div className="hidden sm:mb-8 sm:flex sm:flex-col sm:items-center sm:justify-center">
      <Squares2X2Icon className="text-primary-500 h-12 w-12" />
      <BaseField className="flex items-center justify-start gap-x-2">
        <BaseLabel className="mt-2">Mobile layout?</BaseLabel>
        <BaseCheckbox
          name="layoutPreference"
          checked={layoutPreference === 'mobile'}
          onChange={onToggleLayoutPreference}
        />
      </BaseField>
    </div>
  )
}
