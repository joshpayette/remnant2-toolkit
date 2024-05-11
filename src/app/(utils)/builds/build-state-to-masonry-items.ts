import { perkItems } from '@/app/(data)/items/perk-items'
import { Item } from '@/app/(data)/items/types'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'
import { RingItem } from '@/app/(data)/items/types/RingItem'
import { SkillItem } from '@/app/(data)/items/types/SkillItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { BuildState } from '@/app/(types)/builds'

import { getArrayOfLength } from '../get-array-of-length'

export function buildStateToMasonryItems(build: BuildState): Item[] {
  const masonryItems: Item[] = []
  const { items } = build

  // archtypes
  getArrayOfLength(2).forEach((_, i) => {
    if (!items.archetype[i] && !items.skill[i]) return

    const archetype = items.archetype[i] as ArchetypeItem
    const skill = items.skill[i] as SkillItem

    if (archetype) masonryItems.push(items.archetype[i] as ArchetypeItem)
    if (skill) masonryItems.push(skill)
  })

  // perks
  getArrayOfLength(2).forEach((_, i) => {
    if (!items.archetype[i]) return

    const archetype = items.archetype[i] as ArchetypeItem
    if (archetype) {
      archetype.linkedItems?.perks?.forEach((perk) => {
        const perkItem = perkItems.find((item) => item.name === perk.name)
        if (perkItem) masonryItems.push(perkItem)
      })
    }
  })

  // armor
  items.helm && masonryItems.push(items.helm)
  items.torso && masonryItems.push(items.torso)
  items.legs && masonryItems.push(items.legs)
  items.gloves && masonryItems.push(items.gloves)
  items.relic && masonryItems.push(items.relic)
  getArrayOfLength(3).forEach((_, i) => {
    if (!items.relicfragment[i]) return
    items.relicfragment[i] &&
      masonryItems.push(items.relicfragment[i] as RelicFragmentItem)
  })
  items.amulet && masonryItems.push(items.amulet)
  getArrayOfLength(4).forEach((_, i) => {
    if (!items.ring[i]) return
    items.ring[i] && masonryItems.push(items.ring[i] as RingItem)
  })

  // weapons
  getArrayOfLength(3).forEach((_, i) => {
    items.weapon[i] && masonryItems.push(items.weapon[i] as WeaponItem)
    items.mod[i] && masonryItems.push(items.mod[i] as Item)
    items.mutator[i] && masonryItems.push(items.mutator[i] as MutatorItem)
  })

  // traits
  items.trait.forEach((trait) => trait && masonryItems.push(trait))

  // concoctions
  items.concoction.forEach(
    (concoction) => concoction && masonryItems.push(concoction),
  )

  // consumables
  items.consumable.forEach(
    (consumable) => consumable && masonryItems.push(consumable),
  )

  return masonryItems
}
