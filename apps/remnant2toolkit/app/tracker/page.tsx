'use client'

import { BaseButton } from '@repo/ui/base/button'
import { Skeleton } from '@repo/ui/skeleton'
import { capitalize } from '@repo/utils/capitalize'
import { useSession } from 'next-auth/react'
import { Suspense } from 'react'
import { useIsClient } from 'usehooks-ts'

import { ImportCsvDialog } from '@/app/(components)/dialogs/import-csv-dialog'
import { ImportItemsDialog } from '@/app/(components)/dialogs/import-items-dialog'
import { ItemTrackerFilters } from '@/app/(components)/filters/item-tracker/item-tracker-filters'
import { PageHeader } from '@/app/(components)/page-header'
import { useDiscoveredItems } from '@/app/(hooks)/use-discovered-items'
import { getTrackerProgressLabel } from '@/app/(utils)/tracker/get-tracker-progress-label'
import { ALL_TRACKABLE_ITEMS } from '@/app/tracker/constants'
import { useCsvFileUpload } from '@/app/tracker/hooks/use-csv-file-upload'
import { useSaveFileUpload } from '@/app/tracker/hooks/use-save-file-upload'
import { ItemList } from '@/app/tracker/item-list'
import { ItemTrackerCategory } from '@/app/tracker/types'

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
  }, [] as string[])
// Add the subcategories
itemCategories.push(...subCategories)
// Sort alphabetically
itemCategories = itemCategories.sort()
itemCategories = itemCategories.filter(
  (category) => category !== 'Weapon' && category !== 'Mutator',
)

// #region Component
export default function Page() {
  const { status: sessionStatus } = useSession()

  const isClient = useIsClient()

  const { discoveredItemIds, handleSetDiscoveredItems } = useDiscoveredItems()

  const {
    importSaveDialogOpen,
    saveFileInputRef,
    saveFileFormAction,
    setImportSaveDialogOpen,
  } = useSaveFileUpload({
    handleSetDiscoveredItems,
  })

  const {
    csvFileInputRef,
    csvItems,
    importCsvDialogOpen,
    handleCsvFileSubmit,
    setImportCsvDialogOpen,
  } = useCsvFileUpload({
    discoveredItemIds,
    handleSetDiscoveredItems,
  })

  // Provide the tracker progress
  const totalProgress = getTrackerProgressLabel({
    items: ALL_TRACKABLE_ITEMS,
    discoveredItemIds,
  })

  // #region Render

  if (sessionStatus === 'loading') return null

  return (
    <>
      <ImportItemsDialog
        open={importSaveDialogOpen}
        onClose={() => setImportSaveDialogOpen(false)}
        onSubmit={saveFileFormAction}
        fileInputRef={saveFileInputRef}
      />
      <ImportCsvDialog
        items={csvItems}
        open={importCsvDialogOpen}
        onClose={() => setImportCsvDialogOpen(false)}
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
        <div className="text-primary-400 mb-2 flex flex-col items-center justify-center text-2xl font-bold">
          <h2 className="text-2xl font-bold">Progress</h2>
          <div className="text-surface-solid text-xl font-bold">
            {isClient ? totalProgress : 'Calculating...'}
          </div>
          <div className="w-full max-w-3xl">
            <div className="mt-6 flex w-full flex-col items-center justify-center gap-x-4 gap-y-4 sm:flex-row sm:gap-y-0">
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
                onClick={() => setImportCsvDialogOpen(true)}
                aria-label="Import/Export CSV File"
                className="w-[250px]"
              >
                Import/Export CSV
              </BaseButton>
            </div>
            <hr className="mt-4 w-full max-w-3xl border-gray-700" />
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="mb-8 flex w-full flex-col items-center">
            <div className="w-full max-w-4xl">
              <Suspense fallback={<Skeleton className="h-[497px] w-full" />}>
                <ItemTrackerFilters />
              </Suspense>
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
              <ItemList
                discoveredItemIds={discoveredItemIds}
                handleSetDiscoveredItems={handleSetDiscoveredItems}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
