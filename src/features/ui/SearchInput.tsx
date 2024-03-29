import { XMarkIcon } from '@heroicons/react/24/solid'

import { Input } from './Input'

export function SearchInput({
  onChange,
  onKeyDown,
  value,
  placeholder = 'Search',
}: {
  onChange: (value: string) => void
  onKeyDown?: () => void
  value: string
  placeholder?: string
}) {
  return (
    <div className="relative flex w-full flex-row items-center shadow-sm">
      <Input
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {value && (
          <button onClick={() => onChange('')} aria-label="Clear search text">
            <XMarkIcon
              className="text-primary-400 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  )
}
