'use client'

import { ItemInfoDialog } from '@/features/items/components/ItemInfoDialog'
import { Item } from '@/features/items/types'
import { useState } from 'react'

export default function Page({ params: { item } }: { params: { item: Item } }) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <ItemInfoDialog open={open} onClose={() => setOpen(false)} item={item} />
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-purple-500 px-4 py-2 text-white"
      >
        Open Info for {item.name}
      </button>
    </>
  )
}
