import { useState } from 'react'

import { ItemCard } from '@/features/items/components/ItemCard'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { Item } from '@/features/items/types'
import { Dialog } from '@/features/ui/Dialog'

import { buildStateToMasonryItems } from '../lib/buildStateToMasonryItems'
import { BuildState } from '../types'

interface Props {
  buildState: BuildState
  open: boolean
  onClose: () => void
}

export function DetailedBuildDialog({ buildState, open, onClose }: Props) {
  const masonryItems = buildStateToMasonryItems(buildState)

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const isItemInfoOpen = Boolean(selectedItem)

  return (
    <>
      <Dialog
        title="Detailed Build View"
        maxWidthClass="max-w-4xl"
        open={open}
        onClose={onClose}
      >
        <ItemInfoDialog
          open={isItemInfoOpen}
          onClose={() => setSelectedItem(null)}
          item={selectedItem}
        />
        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {masonryItems.map((item, index) => (
            <ItemCard
              key={index}
              index={index}
              width={200}
              data={item}
              onMoreInfoClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </Dialog>
    </>
  )
}
