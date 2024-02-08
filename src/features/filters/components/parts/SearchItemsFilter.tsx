import SearchInput from '@/features/ui/SearchInput'
import SearchTagsFilter from './SearchTagsFilter'

interface Props {
  selectedSearchTag: string
  searchText: string
  onSearchTagApply: () => void
  onSearchTagChange: (searchTag: string) => void
  onSearchTextChange: (searchQuery: string) => void
}

export default function SearchItemsFilter({
  searchText,
  selectedSearchTag,
  onSearchTagApply,
  onSearchTagChange,
  onSearchTextChange,
}: Props) {
  return (
    <div className="col-span-full flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-0">
        <div className="col-span-full flex flex-col items-start justify-end sm:col-span-2">
          <div className="mb-2 text-left text-sm text-green-500">Search</div>
          <SearchInput
            onChange={onSearchTextChange}
            value={searchText}
            placeholder={'Search item names and descriptions'}
          />
        </div>

        <div className="col-span-full sm:col-span-1">
          <SearchTagsFilter
            selectedSearchTag={selectedSearchTag}
            onSearchTagApply={onSearchTagApply}
            onSearchTagChange={onSearchTagChange}
          />
        </div>
      </div>
    </div>
  )
}
