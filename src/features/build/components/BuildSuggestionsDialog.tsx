import Dialog from '@/features/ui/Dialog'
import { BuildState } from '../types'
import { useState } from 'react'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { ArmorSuggestions } from './ArmorSuggestions'
import { ItemTagSuggestions } from './ItemTagSuggestions'
import { Item } from '@/features/items/types'

interface Props {
  buildState: BuildState
  open: boolean
  onClose: () => void
  onApplySuggestions: (newBuildState: BuildState) => void
}

export function BuildSuggestionsDialog({
  buildState,
  open,
  onClose,
  onApplySuggestions,
}: Props) {
  // Tracks the item the user wants info on
  const [itemInfo, setItemInfo] = useState<Item | null>(null)

  // If the item info is defined, the modal should be open
  const isShowItemInfoOpen = Boolean(itemInfo)

  return (
    <>
      <Dialog
        title="Build Suggestions"
        subtitle="Find the exact items you want to use for your build."
        maxWidthClass="max-w-2xl"
        open={open}
        onClose={onClose}
      >
        <ItemInfoDialog
          item={itemInfo}
          open={isShowItemInfoOpen}
          onClose={() => setItemInfo(null)}
        />
        <div className="grid grid-cols-1 border-t border-t-green-900 pt-4 sm:grid-cols-2 sm:divide-x sm:divide-green-900">
          <ArmorSuggestions
            buildState={buildState}
            onApplySuggestions={onApplySuggestions}
            onOpenItemInfo={setItemInfo}
          />
          <ItemTagSuggestions
            buildState={buildState}
            onApplySuggestions={onApplySuggestions}
            onOpenItemInfo={setItemInfo}
          />
        </div>
      </Dialog>
    </>
  )
}
