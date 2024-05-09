'use client'

import Papa from 'papaparse'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'
import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { BaseButton } from '@/app/(components)/_base/button'
import { ImportCsvDialog } from '@/app/(components)/dialogs/import-csv-dialog'
import { ImportSaveDialog } from '@/app/(components)/dialogs/import-save-dialog'
import { ItemTrackerFilters } from '@/app/(components)/filters/item-tracker/item-tracker-filters'
import { allItems } from '@/app/(data)/items/all-items'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import {
  ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { getTrackerProgressLabel } from '@/app/(utils)/tracker/get-tracker-progress-label'
import {
  ALL_TRACKABLE_ITEMS,
  skippedItemCategories,
} from '@/app/tracker/constants'
import { ItemList } from '@/app/tracker/item-list'
import { ItemTrackerCategory } from '@/app/tracker/types'
import { itemToCsvItem } from '@/features/items/lib/itemToCsvItem'
import { PageHeader } from '@/features/ui/PageHeader'
import { Skeleton } from '@/features/ui/Skeleton'
import { capitalize } from '@/lib/capitalize'

import { parseSaveFile } from './actions'

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

let itemCategories = ALL_TRACKABLE_ITEMS
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

  const [tracker, setTracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds } = tracker

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
        const item = ALL_TRACKABLE_ITEMS.find((item) => item.id === itemId)
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
  const totalProgress = getTrackerProgressLabel({
    items: ALL_TRACKABLE_ITEMS,
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
              const itemId = value[0]
              const discovered =
                value[value.length - 1].toLowerCase() === 'true'

              if (!discovered) return

              const item = allItems.find((item) => item.id === itemId)
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
  // We only provide the relevant item data, not the internal image paths, etc.
  // We could maybe provide the ids as well, in case users wanted to dynamically
  // generate the build urls, but that's not a priority right now.
  const csvItems = useMemo(() => {
    return (
      allItems
        .map((item) => ({
          ...item,
          discovered: discoveredItemIds.includes(item.id),
        }))
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
  }, [discoveredItemIds])

  // #region Render

  return (
    <>
      <ImportSaveDialog
        open={importSaveDialogOpen}
        onClose={() => setImportSaveDialogOpen(false)}
        onSubmit={saveFileFormAction}
        fileInputRef={saveFileInputRef}
      />
      <ImportCsvDialog
        items={csvItems}
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
        <div className="mb-2 flex flex-col items-center justify-center text-2xl font-bold text-primary">
          <h2 className="text-2xl font-bold">Progress</h2>
          <div className="text-xl font-bold text-on-background">
            {isClient ? totalProgress : 'Calculating...'}
          </div>
          <div className="w-full max-w-3xl">
            <div className="mt-6 flex w-full items-center justify-center gap-x-4">
              <BaseButton
                color="cyan"
                onClick={() => setImportSaveDialogOpen(true)}
                aria-label="Import Save File"
                className="w-[200px]"
              >
                Import Save File
              </BaseButton>
              <BaseButton
                color="cyan"
                onClick={() => setImportCSVDialogOpen(true)}
                aria-label="Import/Export CSV File"
                className="w-[250px]"
              >
                Import/Export CSV
              </BaseButton>
            </div>
            <hr className="mt-4 w-full max-w-3xl border-outline" />
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mb-8 flex w-full flex-col items-center">
            <div className="w-full max-w-xl">
              <Suspense fallback={<Skeleton className="h-[497px] w-full" />}>
                <ItemTrackerFilters />
              </Suspense>
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
              <ItemList />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
