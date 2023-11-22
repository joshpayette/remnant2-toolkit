'use client'

import ArmorCard from '@/components/ArmorCard'
import armorList from '@/data/armor-list.json'
import { ArmorItem } from '@/types/index'

export default function Home() {
  const item = armorList[0] as ArmorItem

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {/* <BuildContainer /> */}
      <div className="w-[300px]">
        <ArmorCard item={item} />
      </div>
    </main>
  )
}
