'use client'

import { useState } from 'react'
import { armorList } from '@/data/armor'
import BuildContainer from '@/components/build-container'
import ArmorSelect from '@/components/armor-select'
import ArmorItem from '@/components/armor-item'
import useBuildState from '@/hooks/use-build-state'
import type { ArmorSlot, Armor } from '@/data/armor'

export default function Home() {
  const { buildState, updateBuildState } = useBuildState()
  const [armorSelectOpen, setArmorSelectOpen] = useState<ArmorSlot | null>(null)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <BuildContainer>
        <ArmorSelect
          armorList={armorList.filter(
            (armor) => armor.slot === armorSelectOpen,
          )}
          open={Boolean(armorSelectOpen)}
          onSelectArmor={(armor: Armor) => {
            updateBuildState(armor.slot, armor)
            setArmorSelectOpen(null)
          }}
          onClose={() => setArmorSelectOpen(null)}
        />
        {Object.keys(buildState).map((key) => {
          const slot = key as ArmorSlot
          const armor = buildState[slot]
          return (
            <ArmorItem
              key={slot}
              slot={slot}
              selectedArmor={armor}
              onClick={() => setArmorSelectOpen(slot)}
            />
          )
        })}
      </BuildContainer>
    </main>
  )
}
