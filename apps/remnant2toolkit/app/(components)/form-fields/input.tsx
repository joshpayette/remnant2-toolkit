import { XMarkIcon } from '@heroicons/react/24/solid'
import { BaseInput, BaseInputProps } from '@repo/ui/base/input'

import { BaseButton } from '@repo/ui/base/button'

export function Input({
  onChange,
  onClear,
  onKeyDown,
  value,
  placeholder = 'Search',
  ...props
}: BaseInputProps & { onClear: () => void }) {
  return (
    <div className="relative flex w-full flex-row items-center">
      <BaseInput
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
        {...props}
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
