'use client'

import ItemCard from '@/app/builds/ItemCard'
import itemList from '@/data/item-list.json'
import { Item } from '@/types'

export default function Home() {
  const item = itemList[0] as Item

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* <BuildContainer /> */}
      <div className="w-[300px]">
        <ItemCard item={item} />
      </div>
    </main>
  )
}
