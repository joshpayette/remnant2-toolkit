'use client'

import ItemCard from '@/components/ItemCard'
import { remnantItems } from '@/data/items'
import { Item } from '@/types'

export default function Home() {
  const item = remnantItems[0] as Item

  return (
    <div>
      <div className="w-[300px]">
        <ItemCard item={item} />
      </div>
    </div>
  )
}
