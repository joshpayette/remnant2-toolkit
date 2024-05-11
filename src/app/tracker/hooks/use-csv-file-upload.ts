import Papa from 'papaparse'
import { useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { allItems } from '@/app/(data)/items/all-items'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { itemToCsvItem } from '@/app/(utils)/items/item-to-csv-item'
import { SKIPPED_ITEM_TRACKER_CATEGORIES } from '@/app/tracker/constants'

interface Props {
  discoveredItemIds: string[]
  handleSetDiscoveredItems: (discoveredItemIds: string[]) => void
}

export function useCsvFileUpload({
  discoveredItemIds,
  handleSetDiscoveredItems,
}: Props) {
  const [importCsvDialogOpen, setImportCsvDialogOpen] = useState(false)
  const csvFileInputRef = useRef<HTMLInputElement | null>(null)

  function handleCsvFileSubmit() {
    if (!csvFileInputRef.current || !csvFileInputRef.current.files) {
      setImportCsvDialogOpen(false)
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

              if (SKIPPED_ITEM_TRACKER_CATEGORIES.includes(item.category))
                return

              newCsvItemIds.push(item.id)
            },
          )

          csvFileInputRef.current = null
          handleSetDiscoveredItems(newCsvItemIds)
          setImportCsvDialogOpen(false)
          toast.success('CSV file imported successfully!')
        },
      })
    } catch (error) {
      csvFileInputRef.current = null
      setImportCsvDialogOpen(false)
      toast.error('There was an error importing the CSV file.')
    }
  }

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

  return {
    csvFileInputRef,
    csvItems,
    importCsvDialogOpen,
    handleCsvFileSubmit,
    setImportCsvDialogOpen,
  }
}
