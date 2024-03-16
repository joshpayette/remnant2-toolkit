import { useMemo, useState } from 'react'

import { BuildState } from '@/features/build/types'
import { Item } from '@/features/items/types'
import { AmuletItem } from '@/features/items/types/AmuletItem'
import { ArchetypeItem } from '@/features/items/types/ArchetypeItem'
import { ArmorItem } from '@/features/items/types/ArmorItem'
import { ConcoctionItem } from '@/features/items/types/ConcoctionItem'
import { ConsumableItem } from '@/features/items/types/ConsumableItem'
import { ModItem } from '@/features/items/types/ModItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { RelicFragmentItem } from '@/features/items/types/RelicFragmentItem'
import { RelicItem } from '@/features/items/types/RelicItem'
import { RingItem } from '@/features/items/types/RingItem'
import { SkillItem } from '@/features/items/types/SkillItem'
import { TraitItem } from '@/features/items/types/TraitItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'

import { buildStateToCsvData } from '../lib/buildStateToCsvData'
import { buildStateToMasonryItems } from '../lib/buildStateToMasonryItems'
import { cleanUpBuildState } from '../lib/cleanUpBuildState'
import { linkArchetypesToTraits } from '../lib/linkArchetypesToTraits'
import { linkWeaponsToMods } from '../lib/linkWeaponsToMods'

export function useDBBuildState(INITIAL_BUILD_STATE: BuildState) {
  const [dbBuildState, setDBBuildState] =
    useState<BuildState>(INITIAL_BUILD_STATE)

  /**
   * Converts the build state to CSV data.
   */
  const csvItems = useMemo(
    () => buildStateToCsvData(dbBuildState).filter((item) => item?.name !== ''),
    [dbBuildState],
  )

  /**
   * Populates the masonry grid with the items from the build state.
   */
  const masonryItems = useMemo(
    () => buildStateToMasonryItems(dbBuildState),
    [dbBuildState],
  )

  function updateDBBuildState({
    category,
    value,
  }: {
    category: string
    value: string | Array<string | undefined>
  }) {
    // --------------------------
    // Non-items
    // --------------------------

    if (category === 'name') {
      setDBBuildState({
        ...dbBuildState,
        name: value as string,
      })
      return
    }
    if (category === 'description') {
      setDBBuildState({
        ...dbBuildState,
        description: value as string,
      })
      return
    }
    if (category === 'isPublic') {
      setDBBuildState({
        ...dbBuildState,
        isPublic: value === 'true',
      })
      return
    }
    if (category === 'buildLink') {
      setDBBuildState({
        ...dbBuildState,
        buildLink: value as string,
      })
      return
    }

    // --------------------------
    // Items
    // --------------------------

    // Remove empty items
    if (Array.isArray(value)) {
      const allItemsEmpty = value.every((item) => item === '')
      if (allItemsEmpty) {
        setDBBuildState({
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            [category]: [],
          },
        })
        return
      }
    } else {
      if (value === '') {
        setDBBuildState({
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            [category]: null,
          },
        })
        return
      }
    }

    const params = Array.isArray(value) ? value.join(',') : value
    let itemOrItems: Item | Item[] | null = null

    switch (category) {
      case 'helm':
        itemOrItems = ArmorItem.fromParams(params)
        break
      case 'torso':
        itemOrItems = ArmorItem.fromParams(params)
        break
      case 'legs':
        itemOrItems = ArmorItem.fromParams(params)
        break
      case 'gloves':
        itemOrItems = ArmorItem.fromParams(params)
        break
      case 'relic':
        itemOrItems = RelicItem.fromParams(params)
        break
      case 'amulet':
        itemOrItems = AmuletItem.fromParams(params)
        break
      case 'weapon':
        itemOrItems = WeaponItem.fromParams(params)
        break
      case 'archetype':
        itemOrItems = ArchetypeItem.fromParams(params)
        break
      case 'concoction':
        itemOrItems = ConcoctionItem.fromParams(params)
        break
      case 'consumable':
        itemOrItems = ConsumableItem.fromParams(params)
        break
      case 'mod':
        itemOrItems = ModItem.fromParams(params)
        break
      case 'mutator':
        itemOrItems = MutatorItem.fromParams(params)
        break
      case 'relicfragment':
        itemOrItems = RelicFragmentItem.fromParams(params)
        break
      case 'ring':
        itemOrItems = RingItem.fromParams(params)
        break
      case 'skill':
        itemOrItems = SkillItem.fromParams(params)
        break
      case 'trait':
        itemOrItems = TraitItem.fromParams(params)
        break
      default:
        console.error(`Unknown category ${category}`)
        return
    }

    if (itemOrItems === null) return

    const newBuildState = {
      ...dbBuildState,
      items: {
        ...dbBuildState.items,
        [category]: itemOrItems,
      },
    }

    cleanUpBuildState(newBuildState)

    const linkedBuildState = linkArchetypesToTraits(
      linkWeaponsToMods(newBuildState),
    )
    setDBBuildState(linkedBuildState)
  }

  function setNewBuildState(buildState: BuildState) {
    setDBBuildState(buildState)
  }

  return {
    csvItems,
    masonryItems,
    dbBuildState,
    setNewBuildState,
    updateDBBuildState,
  }
}
