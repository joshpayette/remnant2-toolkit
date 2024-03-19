'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { SearchTextAutocomplete } from '@/features/build/filters/parts/SearchTextAutocomplete'
import { ITEM_TAGS } from '@/features/items/constants'
import { allItems } from '@/features/items/data/allItems'

function buildItemList(): Array<{ id: string; name: string }> {
  let items = allItems
    .filter((item) => item.category !== 'relicfragment')
    .map((item) => ({
      id: item.id,
      name: item.name,
    }))

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

export function HomePageSearch() {
  const router = useRouter()
  const pathname = usePathname()

  const [searchText, setSearchText] = useState('')

  function handleSearchSubmit() {
    let finalPath = `/item-lookup?`
    if (searchText) {
      finalPath += `searchText=${searchText}`
    }

    router.push(finalPath)
  }

  return (
    <SearchTextAutocomplete
      items={buildItemList()}
      onChange={(value) => setSearchText(value)}
      onKeyDown={handleSearchSubmit}
      value={searchText}
      showLabel={false}
      size="lg"
    />
  )
}
