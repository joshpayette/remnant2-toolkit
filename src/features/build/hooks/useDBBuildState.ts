import { useMemo, useState } from 'react'
import { BuildState } from '@/features/build/types'
import { Item } from '@/features/items/types'
import { ArmorItem } from '@/features/items/types/ArmorItem'
import { GenericItem } from '@/features/items/types/GenericItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { TraitItem } from '@/features/items/types/TraitItem'
import { remnantItems } from '@/features/items/data'
import { buildStateToCsvData } from '../lib/buildStateToCsvData'
import { buildStateToMasonryItems } from '../lib/buildStateToMasonryItems'
import linkWeaponsToMods from '../lib/linkWeaponsToMods'
import linkArchtypesToTraits from '../lib/linkArchtypesToTraits'

export default function useDBBuildState(initialBuildState: BuildState) {
  const [dbBuildState, setDBBuildState] =
    useState<BuildState>(initialBuildState)

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
        itemOrItems = GenericItem.fromParamsSingle(params)
        break
      case 'amulet':
        itemOrItems = GenericItem.fromParamsSingle(params)
        break
      case 'weapon':
        itemOrItems = WeaponItem.fromParams(params)
        break
      case 'archtype':
        itemOrItems = GenericItem.fromParamsArray(params)
        break
      case 'concoction':
        itemOrItems = GenericItem.fromParamsArray(params)
        break
      case 'consumable':
        itemOrItems = GenericItem.fromParamsArray(params)
        break
      case 'mod':
        itemOrItems = GenericItem.fromParamsArray(params)
        break
      case 'mutator':
        itemOrItems = MutatorItem.fromParams(params)
        break
      case 'relicfragment':
        itemOrItems = GenericItem.fromParamsArray(params)
        break
      case 'ring':
        itemOrItems = GenericItem.fromParamsArray(params)
        break
      case 'skill':
        itemOrItems = GenericItem.fromParamsArray(params)
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

    if (category === 'weapon') {
      // Look at each mod and if it is linked to the wrong weapon, remove it
      newBuildState.items.mod = newBuildState.items.mod.map((mod, index) => {
        if (mod?.linkedItems?.weapon) {
          const linkedWeapon = remnantItems.find(
            (item) => item.name === mod.linkedItems?.weapon?.name,
          )
          if (!linkedWeapon) return mod

          if (newBuildState.items.weapon[index]?.id !== linkedWeapon.id) {
            return null
          }
        }
        return mod
      })
    }

    const linkedBuildState = linkArchtypesToTraits(
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
