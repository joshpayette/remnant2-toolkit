import { BuildTags } from '@prisma/client'
import { useMemo, useState } from 'react'

import { Item } from '@/app/(data)/items/types'
import { AmuletItem } from '@/app/(data)/items/types/AmuletItem'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { ConcoctionItem } from '@/app/(data)/items/types/ConcoctionItem'
import { ConsumableItem } from '@/app/(data)/items/types/ConsumableItem'
import { ModItem } from '@/app/(data)/items/types/ModItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'
import { RelicItem } from '@/app/(data)/items/types/RelicItem'
import { RingItem } from '@/app/(data)/items/types/RingItem'
import { SkillItem } from '@/app/(data)/items/types/SkillItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { BuildState } from '@/features/build/types'

import { buildStateToCsvData } from '../lib/buildStateToCsvData'
import { buildStateToMasonryItems } from '../lib/buildStateToMasonryItems'
import { cleanUpBuildState } from '../lib/cleanUpBuildState'

export function useDBBuildState(
  INITIAL_BUILD_STATE: BuildState,
  mode: 'create' | 'edit',
) {
  // TODO Rework this functionality
  // Read the build-state from the localstorage
  // const [localBuildState, setLocalBuildState] = useLocalStorage<BuildState>(
  //   mode === 'create' ? 'create-build-state' : 'edit-build-state',
  //   INITIAL_BUILD_STATE,
  //   { initializeWithValue: true },
  // )

  // TODO
  // Initialize the build state with the local build state if it exists
  // and is not equal to the initial build state
  // const [dbBuildState, setDBBuildState] = useState<BuildState>(
  //   isEqual(localBuildState, INITIAL_BUILD_STATE)
  //     ? INITIAL_BUILD_STATE
  //     : localBuildState,
  // )
  const [dbBuildState, setDBBuildState] =
    useState<BuildState>(INITIAL_BUILD_STATE)

  // If mode is edit and the localBuildState.buildId is not equal to the buildId
  // in the initial build state, reset the local build state and the db build state
  // useEffect(() => {
  //   if (mode === 'create') return
  //   if (!localBuildState.buildId) return

  //   if (localBuildState.buildId !== INITIAL_BUILD_STATE.buildId) {
  //     setLocalBuildState(DEFAULT_BUILD_STATE)
  //     setDBBuildState(INITIAL_BUILD_STATE)
  //   }
  // }, [INITIAL_BUILD_STATE, localBuildState.buildId, mode, setLocalBuildState])

  // TODO
  // Check if the user is using local changes
  // Used to show an alert above the builder
  // const usingLocalChanges =
  //   INITIAL_BUILD_STATE.buildId === localBuildState.buildId &&
  //   !isEqual(INITIAL_BUILD_STATE, localBuildState)

  const usingLocalChanges = false

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
    value: string | Array<string | undefined> | BuildTags[]
  }) {
    // --------------------------
    // Non-items
    // --------------------------

    if (category === 'name') {
      const newBuildState = {
        ...dbBuildState,
        name: value as string,
      }
      setDBBuildState(newBuildState)
      //setLocalBuildState(newBuildState)
      return
    }
    if (category === 'description') {
      const newBuildState = {
        ...dbBuildState,
        description: value as string,
      }
      setDBBuildState(newBuildState)
      //setLocalBuildState(newBuildState)
      return
    }
    if (category === 'isPublic') {
      const newBuildState = {
        ...dbBuildState,
        isPublic: value === 'true',
      }
      setDBBuildState(newBuildState)
      //setLocalBuildState(newBuildState)
      return
    }
    if (category === 'isPatchAffected') {
      const newBuildState = {
        ...dbBuildState,
        isPatchAffected: value === 'true',
      }
      setDBBuildState(newBuildState)
      //setLocalBuildState(newBuildState)
      return
    }
    if (category === 'buildLink') {
      const newBuildState = {
        ...dbBuildState,
        buildLink: value as string,
      }
      setDBBuildState(newBuildState)
      //setLocalBuildState(newBuildState)
      return
    }
    if (category === 'tags') {
      const newBuildState = {
        ...dbBuildState,
        buildTags: value as BuildTags[],
      }
      setDBBuildState(newBuildState)
      //setLocalBuildState(newBuildState)
      return
    }

    // Remove skill if archetype unequipped
    if (category === 'archetype' && Array.isArray(value)) {
      const emptySlot = value.findIndex((item) => item === '')
      if (emptySlot !== -1) {
        const newSkills = dbBuildState.items.skill.map((skill, index) => {
          if (index === emptySlot) return null
          return skill
        })
        const newArchetypes = dbBuildState.items.archetype.map(
          (archetype, index) => {
            if (index === emptySlot) return null
            return archetype
          },
        )

        const newBuildState = {
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            archetype: newArchetypes,
            skill: newSkills,
          },
        }

        setDBBuildState(newBuildState)
        //setLocalBuildState(newBuildState)
        return
      }
    }

    // --------------------------
    // Items
    // --------------------------

    // Remove empty items
    if (Array.isArray(value)) {
      const allItemsEmpty = value.every((item) => item === '')
      if (allItemsEmpty) {
        const cleanBuildState = cleanUpBuildState({
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            [category]: [],
          },
        })

        setDBBuildState(cleanBuildState)
        //setLocalBuildState(cleanBuildState)
        return
      }
    } else {
      if (value === '') {
        const cleanBuildState = cleanUpBuildState({
          ...dbBuildState,
          items: {
            ...dbBuildState.items,
            [category]: null,
          },
        })

        setDBBuildState(cleanBuildState)
        //setLocalBuildState(cleanBuildState)
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

    const cleanBuildState = cleanUpBuildState(newBuildState)
    setDBBuildState(cleanBuildState)
    //setLocalBuildState(cleanBuildState)
  }

  function setNewBuildState(buildState: BuildState) {
    const cleanBuildState = cleanUpBuildState(buildState)
    setDBBuildState(cleanBuildState)
    //setLocalBuildState(cleanBuildState)
  }

  return {
    csvItems,
    masonryItems,
    dbBuildState,
    usingLocalChanges,
    setNewBuildState,
    updateDBBuildState,
  }
}
