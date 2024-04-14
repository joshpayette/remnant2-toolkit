'use client'

import { useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { Item } from '@/features/items/types'

export default function Page({ params: { item } }: { params: { item: Item } }) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <ItemInfoDialog open={open} onClose={() => setOpen(false)} item={item} />
      <BaseButton
        color="cyan"
        onClick={() => setOpen(true)}
        aria-label={`Open info for ${item.name}`}
      >
        Open Info for {item.name}
      </BaseButton>
    </>
  )
}
