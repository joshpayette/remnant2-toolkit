'use client'

import { useState } from 'react'

import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import { ItemCard } from '@/app/(components)/cards/item-card'
import { ItemInfoDialog } from '@/app/(components)/dialogs/item-info-dialog'
import { buildStateToMasonryItems } from '@/features/build/lib/buildStateToMasonryItems'
import { BuildState } from '@/features/build/types'
import { Item } from '@/features/items/types'

interface Props {
  open: boolean
  buildState: BuildState
  onClose: () => void
}

export function DetailedBuildDialog({ open, buildState, onClose }: Props) {
  const masonryItems = buildStateToMasonryItems(buildState)

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const isItemInfoOpen = Boolean(selectedItem)

  return (
    <BaseDialog open={open} onClose={onClose} size="7xl">
      <ItemInfoDialog
        open={isItemInfoOpen}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
      <BaseDialogTitle>Detailed Build View</BaseDialogTitle>
      <BaseDialogBody>
        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      </BaseDialogBody>
    </BaseDialog>
  )
}
