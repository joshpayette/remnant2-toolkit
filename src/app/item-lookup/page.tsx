'use client'

import { remnantItems } from '@/app/(data)'
import { useEffect, useMemo, useState } from 'react'
import { type Item } from '@/app/(types)'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import PageHeader from '@/app/(components)/PageHeader'
import ItemInfo from '@/app/(components)/ItemInfo'
import { itemToCsvItem } from '@/app/(lib)/utils'
import ItemCard from '../tracker/(components)/ItemCard'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useDebounce } from 'usehooks-ts'

const csvItems = remnantItems.map((item) => itemToCsvItem(item))

export default function ItemLookupPage() {
  const isClient = useIsClient()

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const [filter, setFilter] = useState('')
  const [filteredItemList, setFilteredItemList] = useState(remnantItems)
  const debouncedFilter = useDebounce(filter, 500)

  useEffect(() => {
    const filteredItems = remnantItems.filter((item) =>
      item.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
    )
    setFilteredItemList(filteredItems)
  }, [debouncedFilter])

  const handleShowItemInfo = (itemId: string) => {
    const item = remnantItems.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  if (!isClient) return null

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <ItemInfo
        item={itemInfo}
        open={isShowItemInfoOpen}
        onClose={() => setItemInfo(null)}
      />
      <PageHeader
        title="Remnant 2 Item Info"
        subtitle="Look up info on all the items in Remnant 2"
      >
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          className=" text-md rounded border border-green-500 bg-black p-2 text-white outline-none outline-offset-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search"
          value={filter}
        />
      </PageHeader>
      <div className="w-full">
        <div className="flex items-center justify-end">
          <ToCsvButton data={csvItems} filename="remnant2toolkit_iteminfo" />
        </div>
        <div className="grid w-full grid-cols-2 gap-4 py-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {filteredItemList.map((item) => (
            <div key={item.id} className="flex flex-col">
              <ItemCard item={item} />
              <div className="flex items-end justify-end bg-black">
                <button
                  className="flex w-auto items-center gap-1 rounded-md px-2 py-1 text-xs text-green-500 hover:bg-green-500 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
                  onClick={() => handleShowItemInfo(item.id)}
                >
                  <InformationCircleIcon className="h-5 w-5" /> Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
