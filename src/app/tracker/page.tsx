'use client'

import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { useEffect, useMemo, useRef, useState } from 'react'
import ToCsvButton from '@/features/csv/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import PageHeader from '@/features/ui/PageHeader'
import { useFormState } from 'react-dom'
import parseSaveFile from './actions'
import { SubmitButton } from '../../features/ui/SubmitButton'
import { toast } from 'react-toastify'
import { remnantItemCategories, remnantItems } from '@/features/items/data'
import { GenericItem } from '@/features/items/types/GenericItem'
import useFilteredItems from '@/features/items/hooks/useFilteredItems'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import ItemInfo from '@/features/items/components/ItemInfo'
import Filters from '@/app/tracker/Filters'
import ListItems from '@/app/tracker/ListItems'
import ImportSaveDialog from './ImportSaveDialog'

const skippedItemCategories: Array<GenericItem['category']> = ['skill', 'perk']

const itemCategories = remnantItemCategories.filter((category) => {
  return skippedItemCategories.includes(category) === false
})

const itemList = remnantItems
  // We don't want to show the items that are in the skippedItemCategories
  .filter((item) => skippedItemCategories.includes(item.category) === false)
  // Remove mods that have linked guns
  .filter((item) => {
    if (item.category !== 'mod') return true
    return item.linkedItems?.weapon === undefined
  })
  .map((item) => ({
    ...item,
    discovered: false,
  }))

export default function Page() {
  const isClient = useIsClient()

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<GenericItem | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const { discoveredItemIds, setDiscoveredItemIds } = useLocalStorage()

  const { filteredItems, handleUpdateFilters } = useFilteredItems(itemList)
  const totalItems = filteredItems.length

  // get response after save file upload
  const [uploadFormResponse, formAction] = useFormState(parseSaveFile, {
    saveFileDiscoveredItemIds: null,
  })
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  // tracks the save data after upload
  const saveData = useRef<string[] | null>(null)
  // file input field
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // We only provide the relevant item data, not the internal image paths, etc.
  // We could maybe provide the ids as well, in case users wanted to dynamically
  // generate the build urls, but that's not a priority right now.
  const csvItems = useMemo(() => {
    return (
      filteredItems
        // Modify the data for use. Adds a discovered flag,
        // modifies the description for mutators
        .map((item) => {
          let csvItem = itemToCsvItem(item)

          // For mutators, we need to combine the description
          // and the max level bonus
          if (MutatorItem.isMutatorItem(item)) {
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
  }, [filteredItems])

  // If the upload form response changes, we need to set the save data
  useEffect(() => {
    if (!uploadFormResponse) return

    setImportDialogOpen(false)

    const { saveFileDiscoveredItemIds, error } = uploadFormResponse

    if (error) {
      toast.error(error)
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    if (!saveFileDiscoveredItemIds) return
    saveData.current = saveFileDiscoveredItemIds
  }, [uploadFormResponse])

  // If the save data is set, we need to check the discovered items
  useEffect(() => {
    if (!saveData.current) return

    // Remove any items that are in the skipped categories
    const filteredDiscoveredItems = saveData.current.filter((itemId) => {
      const item = itemList.find((item) => item.id === itemId)
      if (!item) return false
      if (skippedItemCategories.includes(item.category)) return false
      return true
    })

    // Update the discovered item ids
    setDiscoveredItemIds({ ids: filteredDiscoveredItems })
    // Reset the save data
    saveData.current = null
    // clear input field
    if (fileInputRef.current) fileInputRef.current.value = ''
    // notify of success
    toast.success('Save file uploaded successfully!')
  }, [setDiscoveredItemIds, filteredItems])

  // Provider the tracker progress
  const discoveredCount = filteredItems.reduce((acc, item) => {
    if (discoveredItemIds.includes(item.id)) return acc + 1
    return acc
  }, 0)
  const discoveredPercent = Math.round((discoveredCount / totalItems) * 100)
  const progress = isClient
    ? `${discoveredCount} / ${totalItems} (${
        isNaN(discoveredPercent) ? '0' : discoveredPercent
      }%)`
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
      setDiscoveredItemIds({ ids: newDiscoveredItemIds })
      return
    }

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setDiscoveredItemIds({ ids: newDiscoveredItemIds })
  }

  if (!isClient) return null

  return (
    <>
      <ImportSaveDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onSubmit={formAction}
        fileInputRef={fileInputRef}
      />
      <div className="relative flex w-full flex-col items-center justify-center">
        <ItemInfo
          item={itemInfo}
          open={isShowItemInfoOpen}
          onClose={() => setItemInfo(null)}
        />
        <PageHeader
          title="Remnant 2 Item Tracker"
          subtitle="Discover all the items in Remnant 2"
        >
          <div className="flex w-full items-center justify-center">
            <button
              onClick={() => setImportDialogOpen(true)}
              className="w-[200px] rounded border-2 border-purple-500 bg-purple-700 p-2 text-lg font-bold text-white/90 hover:bg-purple-500 hover:text-white"
            >
              Import Save File
            </button>
          </div>
        </PageHeader>

        <hr className="mb-4 mt-4 w-full max-w-3xl border-gray-700" />

        <div className="my-8 flex flex-col items-center justify-center gap-y-2 text-4xl font-bold text-green-400">
          <h2 className="text-4xl font-bold">Progress</h2>
          <span className="mb-4 text-2xl font-bold text-white">{progress}</span>
          <div className="flex flex-row items-center justify-center gap-x-2">
            <ToCsvButton data={csvItems} filename="remnant2toolkit_tracker" />
          </div>
        </div>

        <hr className="mb-8 mt-4 w-full max-w-3xl border-gray-700" />

        <div className="max-w-3xl">
          <h2 className="mb-2 text-center text-4xl font-bold text-green-400">
            Filters
          </h2>
          <Filters
            allItems={itemList}
            onUpdate={handleUpdateFilters}
            itemCategories={itemCategories}
          />
        </div>

        <div className="my-8 w-full">
          <ListItems
            items={filteredItems}
            onShowItemInfo={handleShowItemInfo}
            onClick={handleListItemClicked}
          />
        </div>
      </div>
    </>
  )
}
