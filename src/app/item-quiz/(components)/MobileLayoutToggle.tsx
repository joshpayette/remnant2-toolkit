import { Squares2X2Icon } from '@heroicons/react/24/solid'

import { LayoutPreference } from '@/app/item-quiz/types'
import { Checkbox } from '@/features/ui/Checkbox'

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
      <Squares2X2Icon className="h-12 w-12 text-primary" />
      <Checkbox
        name="layoutPreference"
        label="Mobile layout?"
        checked={layoutPreference === 'mobile'}
        onChange={onToggleLayoutPreference}
      />
    </div>
  )
}
