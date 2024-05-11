import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

import { parseSaveFile } from '@/app/tracker/actions/parse-save-file'
import {
  ALL_TRACKABLE_ITEMS,
  SKIPPED_ITEM_TRACKER_CATEGORIES,
} from '@/app/tracker/constants'

interface Props {
  handleSetDiscoveredItems: (discoveredItemIds: string[]) => void
}

export function useSaveFileUpload({ handleSetDiscoveredItems }: Props) {
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
        if (SKIPPED_ITEM_TRACKER_CATEGORIES.includes(item.category))
          return false
        return true
      },
    )

    saveFileInputRef.current = null
    // Update the discovered item ids
    handleSetDiscoveredItems(filteredDiscoveredItems)
    setImportSaveDialogOpen(false)
    toast.success('Save file imported successfully!')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadSaveFormResponse])

  return {
    importSaveDialogOpen,
    saveFileInputRef,
    saveFileFormAction,
    setImportSaveDialogOpen,
  }
}
