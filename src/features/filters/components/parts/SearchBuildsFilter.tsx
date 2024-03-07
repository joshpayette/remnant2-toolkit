import { XMarkIcon } from '@heroicons/react/24/solid'

import { SearchInput } from '@/features/ui/SearchInput'

interface Props {
  searchText: string
  onApplyFilters: () => void
  onChange: (searchQuery: string) => void
}

export function SearchBuildsFilter({
  searchText,
  onApplyFilters,
  onChange,
}: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="text-primary-500 flex w-full items-center justify-start text-left text-sm font-bold">
          By Build Name or Description
        </div>

        <div className="relative flex w-full flex-row items-center shadow-sm">
          <SearchInput
            onKeyDown={onApplyFilters}
            onChange={onChange}
            value={searchText}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {searchText && (
              <button
                onClick={() => onChange('')}
                aria-label="Clear search text"
              >
                <XMarkIcon
                  className="text-primary-400 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
