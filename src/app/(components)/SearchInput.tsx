import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Input from './Input'

export default function SearchInput({
  autoFocus = true,
  onChange,
  value,
  placeholder = 'Search',
}: {
  autoFocus?: boolean
  onChange: (value: string) => void
  value: string
  placeholder?: string
}) {
  return (
    <div className="relative flex w-full flex-row items-center shadow-sm">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {value ? (
          <button onClick={() => onChange('')}>
            <XMarkIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
          </button>
        ) : (
          <MagnifyingGlassIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}
