import { XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  searchText: string
  onChange: (searchQuery: string) => void
}

export default function SearchBuildsFilter({ searchText, onChange }: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-start text-left text-sm font-bold text-green-500">
          By Build Name or Description
        </div>

        <div className="relative flex w-full flex-row items-center shadow-sm">
          <input
            type="text"
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-2 border-purple-500 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
            value={searchText}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {searchText && (
              <button onClick={() => onChange('')}>
                <XMarkIcon
                  className="h-5 w-5 text-green-400"
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
