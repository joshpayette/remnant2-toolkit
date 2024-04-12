'use client'

import { useState } from 'react'

import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { Item } from '@/features/items/types'

export default function Page({ params: { item } }: { params: { item: Item } }) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <ItemInfoDialog open={open} onClose={() => setOpen(false)} item={item} />
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-secondary-500 px-4 py-2 text-white"
        aria-label={`Open info for ${item.name}`}
      >
        Open Info for {item.name}
      </button>
    </>
  )
}
