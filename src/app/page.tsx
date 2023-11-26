'use client'

import ItemCard from '@/components/ItemCard'
import { remnantItems } from '@/data/items'
import { Item } from '@/types'

export default function Home() {
  const item = remnantItems[0] as Item

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* <BuildContainer /> */}
      <div className="w-[300px]">
        <ItemCard item={item} />
      </div>
    </main>
  )
}
