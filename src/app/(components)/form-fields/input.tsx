import { XMarkIcon } from '@heroicons/react/24/solid'

import { BaseButton } from '@/app/(components)/_base/button'
import {
  type BaseInputProps,
  Input as BaseInput,
} from '@/app/(components)/_base/input'

export function Input({
  onChange,
  onClear,
  onKeyDown,
  value,
  placeholder = 'Search',
}: BaseInputProps & { onClear: () => void }) {
  return (
    <div className="relative flex w-full flex-row items-center shadow-sm">
      <BaseInput
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        {value && (
          <BaseButton plain onClick={onClear} aria-label="Clear search text">
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </BaseButton>
        )}
      </div>
    </div>
  )
}
