'use client'

import { remnantItemCategories, remnantItems } from '@/app/(data)'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Filters } from './(components)/Filters'
import { isMutatorItem, type Item, type ItemCategory } from '@/app/(types)'
import TrackerFilters from './(components)/Filters'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import PageHeader from '@/app/(components)/PageHeader'
import ItemInfo from '@/app/(components)/ItemInfo'
import { itemToCsvItem } from '@/app/(lib)/utils'
import ListItems from './(components)/ListItems'
import { useFormState } from 'react-dom'
import parseSaveFile from './actions'
import { SubmitButton } from '../(components)/SubmitButton'
import { toast } from 'react-toastify'

const skippedItemCategories: ItemCategory[] = [
  'concoction',
  'consumable',
  'skill',
]
const itemList = remnantItems
  // We don't want to show the items that are in the skippedItemCategories
  .filter((item) => skippedItemCategories.includes(item.category) === false)
  // Remove mods that have linked guns
  .filter((item) => {
    if (item.category !== 'mod') return true
    return item.linkedItems?.weapon === undefined
  })

const itemCategories = remnantItemCategories
  .filter((category) => skippedItemCategories.includes(category) === false)
  // sort alphabetically by name
  .sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

export default function TrackerPage() {
  const isClient = useIsClient()

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const { itemTrackerStorage, setDiscoveredItemIds } = useLocalStorage()
  const { discoveredItemIds } = itemTrackerStorage

  const [filters, setFilters] = useState<Filters>({
    undiscovered: true,
    discovered: true,
  })

  // get response after save file upload
  const [uploadFormResponse, formAction] = useFormState(parseSaveFile, {
    convertedSave: null,
  })
  // tracks the save data after upload
  const saveData = useRef<string | null>(null)
  // file input field
  const fileInput = useRef<HTMLInputElement | null>(null)

  // If the upload form response changes, we need to set the save data
  useEffect(() => {
    if (!uploadFormResponse) return
    const { convertedSave } = uploadFormResponse
    if (!convertedSave) return
    saveData.current = convertedSave
  }, [uploadFormResponse])

  // If the save data is set, we need to check the discovered items
  useEffect(() => {
    if (!saveData.current) return
    const newDiscoveredItemIds = remnantItems
      // filter out the skipped categories
      .filter((item) => skippedItemCategories.includes(item.category) === false)
      // Match all item names against info in the save file
      .filter((item) => {
        const name = item.name.replace(/[^a-zA-Z]/g, '').toLowerCase()
        return (
          saveData.current?.includes(name) ||
          (item.saveFileSlug && saveData.current?.includes(item.saveFileSlug))
        )
      })
      // Get just the item ids
      .map((item) => item.id)

    // Reset the save data
    saveData.current = null
    // Update the discovered item ids
    setDiscoveredItemIds(newDiscoveredItemIds)
    // clear input field
    if (fileInput.current) fileInput.current.value = ''
    // notify of success
    toast.success('Save file uploaded successfully!')
  }, [setDiscoveredItemIds])

  // We need to add the discovered flag to the items based on the discoveredItemIds
  // fetched from localstorage
  const items = useMemo(
    () =>
      itemList.map((item) => ({
        ...item,
        discovered: discoveredItemIds.includes(item.id),
      })),
    [discoveredItemIds],
  )

  // We only provide the relevant item data, not the internal image paths, etc.
  // We could maybe provide the ids as well, in case users wanted to dynamically
  // generate the build urls, but that's not a priority right now.
  const csvItems = useMemo(() => {
    return (
      items
        // Modify the data for use. Adds a discovered flag,
        // modifies the description for mutators
        .map((item) => {
          let csvItem = itemToCsvItem(item)

          // For mutators, we need to combine the description
          // and the max level bonus
          if (isMutatorItem(item)) {
            const description = item.description
            const maxLevelBonus = item.maxLevelBonus
            csvItem = itemToCsvItem({
              ...item,
              description: `${description}. At Max Level: ${maxLevelBonus}`,
            })
          }

          return {
            ...csvItem,
            discovered: item.discovered,
          }
        })
        // sort items by category then name alphabetically
        .sort((a, b) => {
          if (a.category < b.category) return -1
          if (a.category > b.category) return 1
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
    )
  }, [items])

  // Provider the tracker progress
  const discoveredCount = discoveredItemIds.length
  const discoveredPercent = Math.round(
    (discoveredItemIds.length / items.length) * 100,
  )
  const progress = isClient
    ? `${discoveredCount} / ${items.length} (${discoveredPercent}%)`
    : 'Calculating...'

  const handleShowItemInfo = (itemId: string) => {
    const item = itemList.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  const handleListItemClicked = (itemId: string) => {
    // If the item is already discovered, undiscover it
    if (discoveredItemIds.includes(itemId)) {
      const newDiscoveredItemIds = discoveredItemIds.filter(
        (id) => id !== itemId,
      )
      setDiscoveredItemIds(newDiscoveredItemIds)
      return
    }

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setDiscoveredItemIds(newDiscoveredItemIds)
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
        title="Remnant 2 Item Tracker"
        subtitle="Discover all the items in Remnant 2"
      >
        <h2>Progress</h2>
        <span className="mb-4 text-2xl font-bold text-green-400">
          {progress}
        </span>
        <ToCsvButton data={csvItems} filename="remnant2toolkit_tracker" />
      </PageHeader>
      <TrackerFilters
        filters={filters}
        onFiltersChange={(newFilters: Filters) => {
          setFilters(newFilters)
        }}
      />
      <div className="my-12 w-full">
        <div className="mb-4 ml-auto flex flex-col items-center justify-center">
          <div className="mb-4 rounded border border-purple-500">
            <form
              action={formAction}
              className="grid grid-cols-1 sm:grid-cols-3"
            >
              <input
                type="file"
                name="saveFile"
                className="mt-2 px-2 text-sm sm:col-span-2"
                ref={fileInput}
              />
              <SubmitButton
                label="Import Save File"
                className="flex items-center justify-center border border-transparent bg-purple-500 p-2 px-2 text-sm font-bold text-white hover:border-purple-500 hover:bg-purple-700"
              />
              <div className="col-span-full bg-black">
                <p className="p-2 text-sm text-green-500">
                  You can find your save file in the following location:
                  <pre>
                    C:\Users\_your_username_\Saved
                    Games\Remnant2\Steam\_steam_id_\profile.sav
                  </pre>
                </p>
                <p className="p-2 text-sm text-red-500">
                  Note: About 90% of the items are currently discoverable via
                  import. The rest will be added soon.
                </p>
              </div>
            </form>
          </div>
        </div>
        <ListItems
          filters={filters}
          items={items}
          itemCategories={itemCategories}
          onShowItemInfo={handleShowItemInfo}
          onClick={handleListItemClicked}
        />
      </div>
    </div>
  )
}
