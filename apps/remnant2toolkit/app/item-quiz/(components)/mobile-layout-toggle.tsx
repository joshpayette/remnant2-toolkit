import { BaseCheckbox } from '@repo/ui/base/checkbox'
import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import { AiFillLayout as LayoutIcon } from 'react-icons/ai'

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
      <LayoutIcon className="text-primary-500 h-12 w-12" />
      <BaseField className="flex items-center justify-start gap-x-2">
        <BaseLabel className="mt-2">Use mobile layout</BaseLabel>
        <BaseCheckbox
          name="layoutPreference"
          checked={layoutPreference === 'mobile'}
          onChange={onToggleLayoutPreference}
        />
      </BaseField>
    </div>
  )
}
