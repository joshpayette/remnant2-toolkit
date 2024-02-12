'use client'

import Papa from 'papaparse'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'
import { useIsClient } from 'usehooks-ts'

import { Filters } from '@/app/tracker/Filters'
import { ListItems } from '@/app/tracker/ListItems'
import { ItemCategory } from '@/features/build/types'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import {
  remnantItemCategories,
  remnantItems,
} from '@/features/items/data/remnantItems'
import { useFilteredItems } from '@/features/items/hooks/useFilteredItems'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { Item } from '@/features/items/types'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { PageHeader } from '@/features/ui/PageHeader'

import { parseSaveFile } from './actions'
import { ImportCSVDialog } from './ImportCSVDialog'
import { ImportSaveDialog } from './ImportSaveDialog'

const skippedItemCategories: Array<ItemCategory> = ['skill', 'perk']

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
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const { discoveredItemIds, setDiscoveredItemIds } = useLocalStorage()

  const { filteredItems, handleUpdateFilters } = useFilteredItems(itemList)
  const totalItems = filteredItems.length

  /**
   * ----------------------------------------------
   * Save File Upload
   * ----------------------------------------------
   */

  // get response after save file upload
  const [uploadSaveFormResponse, saveFileFormAction] = useFormState(
    parseSaveFile,
    {
      saveFileDiscoveredItemIds: null,
    },
  )
  const [importSaveDialogOpen, setImportSaveDialogOpen] = useState(false)
  const saveFileInputRef = useRef<HTMLInputElement | null>(null)

  // If the upload save file form response changes, we need to set the save data
  useEffect(() => {
    if (!uploadSaveFormResponse) return

    const { saveFileDiscoveredItemIds, error } = uploadSaveFormResponse

    if (error) {
      saveFileInputRef.current = null
      setImportSaveDialogOpen(false)
      toast.error(error)
      return
    }

    if (!saveFileDiscoveredItemIds) return

    // Remove any items that are in the skipped categories
    const filteredDiscoveredItems = saveFileDiscoveredItemIds.filter(
      (itemId) => {
        const item = itemList.find((item) => item.id === itemId)
        if (!item) return false
        if (skippedItemCategories.includes(item.category)) return false
        return true
      },
    )

    saveFileInputRef.current = null
    // Update the discovered item ids
    setDiscoveredItemIds({ ids: filteredDiscoveredItems })
    setImportSaveDialogOpen(false)
    toast.success('Save file imported successfully!')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadSaveFormResponse])

  /**
   * ----------------------------------------------
   * CSV File Upload
   * ----------------------------------------------
   */

  const [importCSVDialogOpen, setImportCSVDialogOpen] = useState(false)
  const csvFileInputRef = useRef<HTMLInputElement | null>(null)

  // Provide the tracker progress
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

  function handleCsvFileSubmit() {
    if (!csvFileInputRef.current || !csvFileInputRef.current.files) {
      setImportCSVDialogOpen(false)
      return
    }

    try {
      Papa.parse(csvFileInputRef.current.files[0], {
        complete: function (results) {
          const newCsvItemIds: string[] = []

          results.data.forEach(
            (value: any, index: number, array: unknown[]) => {
              const itemName = value[0]
              const discovered =
                value[value.length - 1].toLowerCase() === 'true'

              if (!discovered) return

              const item = remnantItems.find((item) => item.name === itemName)
              if (!item) return

              if (skippedItemCategories.includes(item.category)) return

              newCsvItemIds.push(item.id)
            },
          )

          csvFileInputRef.current = null
          setDiscoveredItemIds({ ids: newCsvItemIds })
          setImportCSVDialogOpen(false)
          toast.success('CSV file imported successfully!')
        },
      })
    } catch (error) {
      csvFileInputRef.current = null
      setImportCSVDialogOpen(false)
      toast.error('There was an error importing the CSV file.')
    }
  }

  /**
   * ----------------------------------------------
   * Other functions
   * ----------------------------------------------
   */
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
      // We need to set the user item insert needed flag
      // so that the next time they filter builds by collection,
      // their items will be updated
      return
    }

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setDiscoveredItemIds({ ids: newDiscoveredItemIds })
    // We need to set the user item insert needed flag
    // so that the next time they filter builds by collection,
    // their items will be updated
  }

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

  if (!isClient) return null

  return (
    <>
      <ImportSaveDialog
        open={importSaveDialogOpen}
        onClose={() => setImportSaveDialogOpen(false)}
        onSubmit={saveFileFormAction}
        fileInputRef={saveFileInputRef}
      />
      <ImportCSVDialog
        csvItems={csvItems}
        open={importCSVDialogOpen}
        onClose={() => setImportCSVDialogOpen(false)}
        onSubmit={handleCsvFileSubmit}
        fileInputRef={csvFileInputRef}
      />
      <div className="relative flex w-full flex-col items-center justify-center">
        <ItemInfoDialog
          item={itemInfo}
          open={isShowItemInfoOpen}
          onClose={() => setItemInfo(null)}
        />
        <PageHeader
          title="Remnant 2 Item Tracker"
          subtitle="Discover all the items in Remnant 2"
        >
          <div className="flex flex-col items-center justify-center text-4xl font-bold text-green-400">
            <h2 className="text-4xl font-bold">Progress</h2>
            <span className="text-2xl font-bold text-white">{progress}</span>
          </div>
        </PageHeader>

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
          <div className="mt-16 flex w-full items-center justify-center gap-x-4">
            <button
              onClick={() => setImportSaveDialogOpen(true)}
              className="w-[200px] rounded border-2 border-purple-500 bg-purple-700 p-2 text-lg font-bold text-white/90 hover:bg-purple-500 hover:text-white"
            >
              Import Save File
            </button>
            <button
              onClick={() => setImportCSVDialogOpen(true)}
              className="w-[200px] rounded border-2 border-purple-500 bg-purple-700 p-2 text-lg font-bold text-white/90 hover:bg-purple-500 hover:text-white"
            >
              Import CSV File
            </button>
          </div>
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
