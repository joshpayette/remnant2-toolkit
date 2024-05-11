import { BuildTags } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { INITIAL_BUILD_STATE } from '@/app/(data)/builds/constants'
import { AmuletItem } from '@/app/(data)/items/types/AmuletItem'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { ConcoctionItem } from '@/app/(data)/items/types/ConcoctionItem'
import { ConsumableItem } from '@/app/(data)/items/types/ConsumableItem'
import { ModItem } from '@/app/(data)/items/types/ModItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { PerkItem } from '@/app/(data)/items/types/PerkItem'
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'
import { RelicItem } from '@/app/(data)/items/types/RelicItem'
import { RingItem } from '@/app/(data)/items/types/RingItem'
import { SkillItem } from '@/app/(data)/items/types/SkillItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { BuildState } from '@/app/(types)/builds'
import { buildStateToCsvData } from '@/app/(utils)/builds/build-state-to-csv-data'
import { buildStateToMasonryItems } from '@/app/(utils)/builds/build-state-to-masonry-items'
import { cleanUpBuildState } from '@/app/(utils)/builds/clean-up-build-state'
import { itemCategories } from '@/app/(utils)/items/get-item-categories'

import { vashUrlToBuild } from '../vash-integration/vash-url-to-build'

/**
 * Handles reading/writing the build to the URL query string,
 * used for unauthenticated users who can't save builds to the database.
 *
 * @example Adds a `name` parameter to the query string
 * router.push(`${pathname}?${createQueryString('name', name)}`)
 */
export function useUrlBuildState() {
  // Hooks for monitoring the URL query string
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Check if the vash search params exists
  const sourceParam = searchParams.get('source')
  const isVashBuild = sourceParam === 'vash'
  if (isVashBuild) {
    const convertedUrl = vashUrlToBuild(searchParams)
    if (convertedUrl) {
      window.location.href = convertedUrl
    }
  }

  const parsedBuild = parseQueryString(searchParams)

  const urlBuildState = cleanUpBuildState(parsedBuild)

  /**
   * Converts the build state to CSV data.
   */
  const csvItems = buildStateToCsvData(urlBuildState).filter(
    (item) => item?.name !== '',
  )

  /**
   * Populates the masonry grid with the items from the build state.
   */
  const masonryItems = buildStateToMasonryItems(urlBuildState)

  // Add the build name to the page title
  // * useEffect necessary here to update the document title
  useEffect(() => {
    if (!urlBuildState) {
      document.title = 'Remnant 2 Toolkit'
      return
    }
    document.title = `${urlBuildState.name} | Remnant 2 Toolkit`
  }, [urlBuildState])

  /**
   * Creates a new query string by adding or updating a parameter.
   */
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams)
      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams],
  )

  /**
   * Adds a value to the query string then navigates to it
   */
  function updateUrlBuildState({
    category,
    value,
    scroll = false,
  }: {
    category: string
    value: string | Array<string | undefined> | BuildTags[]
    scroll?: boolean
  }): void {
    // Remove empty items
    if (Array.isArray(value)) {
      const allItemsEmpty = value.every((item) => item === '')
      if (allItemsEmpty) {
        router.push(`${pathname}?${createQueryString(category, null)}`)
        return
      }
    } else {
      if (value === '') {
        router.push(`${pathname}?${createQueryString(category, null)}`)
        return
      }
    }

    if (Array.isArray(value)) {
      value = value.join(',')
    }

    router.push(`${pathname}?${createQueryString(category, value)}`, {
      scroll,
    })
  }

  /**
   * Parses the build values from the query string
   */
  function parseQueryString(searchParams: URLSearchParams): BuildState {
    /** The build state that will be returned */
    const buildState = JSON.parse(
      JSON.stringify(INITIAL_BUILD_STATE),
    ) as BuildState

    // Build name
    const name = searchParams.get('name')
    buildState.name = name ?? buildState.name

    // Loop through each category and check the query params
    // for that category's item IDs
    itemCategories.forEach((itemCategory) => {
      const params = searchParams.get(itemCategory)

      switch (itemCategory) {
        case 'helm':
          if (!params) {
            buildState.items[itemCategory] = null
            break
          }
          const armorItem = ArmorItem.fromParams(params)
          if (armorItem) buildState.items[itemCategory] = armorItem
          break
        case 'torso':
          if (!params) {
            buildState.items[itemCategory] = null
            break
          }
          const torsoItem = ArmorItem.fromParams(params)
          if (torsoItem) buildState.items[itemCategory] = torsoItem
          break
        case 'legs':
          if (!params) {
            buildState.items[itemCategory] = null
            break
          }
          const legsItem = ArmorItem.fromParams(params)
          if (legsItem) buildState.items[itemCategory] = legsItem
          break
        case 'gloves':
          if (!params) {
            buildState.items[itemCategory] = null
            break
          }
          const glovesItem = ArmorItem.fromParams(params)
          if (glovesItem) buildState.items[itemCategory] = glovesItem
          break
        case 'relic':
          if (!params) {
            buildState.items.relic = null
            break
          }
          const relicItem = RelicItem.fromParams(params)
          if (relicItem) buildState.items.relic = relicItem
          break
        case 'amulet':
          if (!params) {
            buildState.items.amulet = null
            break
          }
          const amuletItem = AmuletItem.fromParams(params)
          if (amuletItem) buildState.items.amulet = amuletItem
          break
        case 'weapon':
          if (!params) {
            buildState.items.weapon = []
            break
          }
          const weaponItems = WeaponItem.fromParams(params)
          if (weaponItems) buildState.items.weapon = weaponItems
          break
        case 'archetype':
          if (!params) {
            buildState.items.archetype = []
            break
          }
          const archetypeItems = ArchetypeItem.fromParams(params)
          if (archetypeItems) buildState.items.archetype = archetypeItems
          break
        case 'concoction':
          if (!params) {
            buildState.items.concoction = []
            break
          }
          const concoctionItems = ConcoctionItem.fromParams(params)
          if (concoctionItems) buildState.items.concoction = concoctionItems
          break
        case 'consumable':
          if (!params) {
            buildState.items.consumable = []
            break
          }
          const consumableItems = ConsumableItem.fromParams(params)
          if (consumableItems) buildState.items.consumable = consumableItems
          break
        case 'mod':
          if (!params) {
            buildState.items.mod = []
            break
          }
          const modItems = ModItem.fromParams(params)
          if (modItems) buildState.items.mod = modItems
          break
        case 'mutator':
          if (!params) {
            buildState.items.mutator = []
            break
          }
          const mutatorItems = MutatorItem.fromParams(params)
          if (mutatorItems) buildState.items.mutator = mutatorItems
          break
        case 'relicfragment':
          if (!params) {
            buildState.items.relicfragment = []
            break
          }
          const relicFragmentItems = RelicFragmentItem.fromParams(params)
          if (relicFragmentItems)
            buildState.items.relicfragment = relicFragmentItems
          break
        case 'ring':
          if (!params) {
            buildState.items.ring = []
            break
          }
          const ringItems = RingItem.fromParams(params)
          if (ringItems) buildState.items.ring = ringItems
          break
        case 'skill':
          if (!params) {
            buildState.items.skill = []
            break
          }
          const skillItems = SkillItem.fromParams(params)
          if (skillItems) buildState.items.skill = skillItems
          break
        case 'trait':
          if (!params) {
            buildState.items.trait = []
            break
          }
          const traitItems = TraitItem.fromParams(params)
          if (traitItems) buildState.items.trait = traitItems
          break
        case 'perk':
          if (!params) {
            buildState.items.perk = []
            break
          }
          const perkItems = PerkItem.fromParams(params)
          if (perkItems) buildState.items.perk = perkItems
          break
        default: {
          console.error(`Unhandled item category: ${itemCategory}`)
          break
        }
      }
    })

    const cleanedBuildState = cleanUpBuildState(buildState)
    return cleanedBuildState
  }

  return { csvItems, masonryItems, urlBuildState, updateUrlBuildState }
}
