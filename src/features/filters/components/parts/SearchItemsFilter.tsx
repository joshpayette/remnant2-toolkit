import { DESCRIPTION_TAGS, ITEM_TAGS } from '@/features/items/constants'
import { remnantItems } from '@/features/items/data/remnantItems'

import { SearchTextAutocomplete } from './SearchTextAutocomplete'

function buildItemList(): Array<{ id: string; name: string }> {
  let items = remnantItems
    .filter((item) => item.category !== 'relicfragment')
    .map((item) => ({
      id: item.id,
      name: item.name,
    }))

  // items = remnantBosses
  //   .map((boss) => ({ id: boss.id, name: boss.name }))
  //   .concat(items)

  items = DESCRIPTION_TAGS.map((tag) => ({
    id: tag.token as string,
    name: tag.type as string,
  })).concat(items)

  items = ITEM_TAGS.map((tag) => ({
    id: tag as string,
    name: tag as string,
  })).concat(items)

  items = items.sort((a, b) => a.name.localeCompare(b.name))

  // remove duplicates
  items = items.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.name === item.name),
  )

  return items
}

interface Props {
  searchText: string
  onSearchTextChange: (searchQuery: string) => void
  onApplyFilters: () => void
}

export function SearchItemsFilter({
  searchText,
  onApplyFilters,
  onSearchTextChange,
}: Props) {
  const items = buildItemList()

  return (
    <div className="col-span-full flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
      <div className="flex w-full max-w-[400px] flex-col items-start justify-center">
        <SearchTextAutocomplete
          onChange={onSearchTextChange}
          onKeyDown={onApplyFilters}
          items={items}
          value={searchText}
        />
      </div>
    </div>
  )
}
