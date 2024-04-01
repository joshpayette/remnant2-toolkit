'use client'

import Papa from 'papaparse'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'
import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { ImportCSVDialog } from '@/app/tracker/(components)/ImportCSVDialog'
import { ImportSaveDialog } from '@/app/tracker/(components)/ImportSaveDialog'
import { ItemTrackerFilters } from '@/app/tracker/(components)/ItemTrackerFilters'
import { getProgressLabel } from '@/app/tracker/(lib)/getProgressLabel'
import { ItemTrackerCategory, LocalStorage } from '@/app/tracker/(lib)/types'
import { useFilteredItems } from '@/app/tracker/(lib)/useFilteredItems'
import { allTrackerItems, skippedItemCategories } from '@/app/tracker/constants'
import { ItemButton } from '@/features/items/components/ItemButton'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { allItems } from '@/features/items/data/allItems'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { Item } from '@/features/items/types'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { PageHeader } from '@/features/ui/PageHeader'
import { capitalize } from '@/lib/capitalize'

import { parseSaveFile } from './(lib)/actions'

/**
 * ----------------------------------------------
 * Get the item categories
 * ----------------------------------------------
 */
const subCategories: ItemTrackerCategory[] = [
  'Long Gun',
  'Hand Gun',
  'Melee',
  'Mutator (Gun)',
  'Mutator (Melee)',
]

let itemCategories = allTrackerItems
  // Remove the categories that will be replaced by subcategories
  .reduce((acc, item) => {
    if (acc.includes(capitalize(item.category))) return acc
    return [...acc, capitalize(item.category)]
  }, [] as ItemTrackerCategory[])
// Add the subcategories
itemCategories.push(...subCategories)
// Sort alphabetically
itemCategories = itemCategories.sort()
itemCategories = itemCategories.filter(
  (category) => category !== 'Weapon' && category !== 'Mutator',
)

export default function Page() {
  const isClient = useIsClient()

  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)
  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  const [tracker, setTracker] = useLocalStorage<LocalStorage>(
    'item-tracker',
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds } = tracker

  const { filteredItems, handleUpdateFilters } = useFilteredItems([])

  /**
   * ----------------------------------------------
   * Save File Upload
   * ----------------------------------------------
   */
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
        const item = allTrackerItems.find((item) => item.id === itemId)
        if (!item) return false
        if (skippedItemCategories.includes(item.category)) return false
        return true
      },
    )

    saveFileInputRef.current = null
    // Update the discovered item ids
    setTracker({ ...tracker, discoveredItemIds: filteredDiscoveredItems })
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
  const totalProgress = getProgressLabel({
    items: allTrackerItems,
    discoveredItemIds,
  })

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

              const item = allItems.find((item) => item.name === itemName)
              if (!item) return

              if (skippedItemCategories.includes(item.category)) return

              newCsvItemIds.push(item.id)
            },
          )

          csvFileInputRef.current = null
          setTracker({ ...tracker, discoveredItemIds: newCsvItemIds })
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
    const item = allTrackerItems.find((item) => item.id === itemId)
    if (item) setItemInfo(item)
  }

  const handleItemClicked = (itemId: string) => {
    // If the item is already discovered, undiscover it
    if (discoveredItemIds.includes(itemId)) {
      const newDiscoveredItemIds = discoveredItemIds.filter(
        (id) => id !== itemId,
      )
      setTracker({ ...tracker, discoveredItemIds: newDiscoveredItemIds })
      // We need to set the user item insert needed flag
      // so that the next time they filter builds by collection,
      // their items will be updated
      return
    }

    const newDiscoveredItemIds = [...discoveredItemIds, itemId]
    setTracker({ ...tracker, discoveredItemIds: newDiscoveredItemIds })
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

  function getSelectedCategory() {
    let item = filteredItems[0]
    if (!item) return ''

    if (WeaponItem.isWeaponItem(item)) {
      if (item.type === 'long gun') return 'Long Gun'
      if (item.type === 'hand gun') return 'Hand Gun'
      if (item.type === 'melee') return 'Melee'
    } else if (MutatorItem.isMutatorItem(item)) {
      if (item.type === 'gun') return 'Mutator (Gun)'
      if (item.type === 'melee') return 'Mutator (Melee)'
    } else if (item.category === 'relicfragment') {
      return 'Relic Fragment'
    } else {
      return capitalize(item.category)
    }
  }

  const selectedCategory = getSelectedCategory()

  const selectedItemProgress = getProgressLabel({
    items: filteredItems,
    discoveredItemIds,
  })

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

      <div className="flex w-full items-start justify-start sm:items-center sm:justify-center">
        <PageHeader
          title="Remnant 2 Item Tracker"
          subtitle="Discover all the items in Remnant 2"
        />
      </div>

      <div className="relative flex w-full flex-col items-center justify-center">
        <ItemInfoDialog
          item={itemInfo}
          open={isShowItemInfoOpen}
          onClose={() => setItemInfo(null)}
        />
        <div className="mb-2 flex flex-col items-center justify-center text-2xl font-bold text-primary-400">
          <h2 className="text-2xl font-bold">Progress</h2>
          <span className="text-xl font-bold text-white">
            {isClient ? totalProgress : 'Calculating...'}
          </span>
        </div>

        <div className="w-full max-w-3xl">
          <ItemTrackerFilters
            allItems={allTrackerItems}
            itemCategoryOptions={
              !isClient
                ? []
                : itemCategories.map((category) => ({
                    label: `${category as string} - ${getProgressLabel({
                      items: allTrackerItems.filter((item) => {
                        if (category === 'Long Gun') {
                          return (
                            WeaponItem.isWeaponItem(item) &&
                            item.type === 'long gun'
                          )
                        }
                        if (category === 'Hand Gun') {
                          return (
                            WeaponItem.isWeaponItem(item) &&
                            item.type === 'hand gun'
                          )
                        }
                        if (category === 'Melee') {
                          return (
                            WeaponItem.isWeaponItem(item) &&
                            item.type === 'melee'
                          )
                        }
                        if (category === 'Mutator (Gun)') {
                          return (
                            MutatorItem.isMutatorItem(item) &&
                            item.type === 'gun'
                          )
                        }
                        if (category === 'Mutator (Melee)') {
                          return (
                            MutatorItem.isMutatorItem(item) &&
                            item.type === 'melee'
                          )
                        }
                        return (
                          item.category.toLowerCase() === category.toLowerCase()
                        )
                      }),
                      discoveredItemIds,
                      percentOnly: true,
                    })}`,
                    value: category.toLowerCase() as string,
                  }))
            }
            onUpdate={handleUpdateFilters}
          />

          <div className="mt-4 flex w-full items-center justify-center gap-x-4">
            <button
              onClick={() => setImportSaveDialogOpen(true)}
              aria-label="Import Save File"
              className="w-[200px] rounded border-2 border-secondary-500 bg-secondary-700 p-2 text-lg font-bold text-white/90 hover:bg-secondary-500 hover:text-white"
            >
              Import Save File
            </button>
            <button
              onClick={() => setImportCSVDialogOpen(true)}
              aria-label="Import/Export CSV File"
              className="w-[250px] rounded border-2 border-secondary-500 bg-secondary-700 p-2 text-lg font-bold text-white/90 hover:bg-secondary-500 hover:text-white"
            >
              Import/Export CSV
            </button>
          </div>
        </div>

        <hr className="mt-4 w-full max-w-3xl border-gray-700" />

        <div className="mt-4 min-h-[500px] w-full">
          {filteredItems.length > 0 && (
            <>
              <h2 className="mb-2 text-center text-2xl font-bold text-primary-400">
                {selectedCategory} Items
              </h2>
              <div className="mb-4 flex w-full items-center justify-center gap-x-4 text-lg font-semibold">
                {selectedItemProgress}
              </div>
              <div className="flex w-full flex-wrap items-center justify-center gap-2">
                {filteredItems.map((item) => (
                  <ItemButton
                    key={item.id}
                    item={item}
                    isEditable={false}
                    isToggled={item.discovered}
                    onClick={() => handleItemClicked(item.id)}
                    onItemInfoClick={() => handleShowItemInfo(item.id)}
                    size="lg"
                    tooltipDisabled={isShowItemInfoOpen}
                    loadingType="lazy"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
