import { type BuildState } from '@/app/(types)'
import { remnantItemCategories } from '@/app/(data)'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { TraitItem } from '@/app/(types)/TraitItem'
import { GenericItem } from '@/app/(types)/GenericItem'
import { ArmorItem } from '@/app/(types)/ArmorItem'
import { WeaponItem } from '@/app/(types)/WeaponItem'
import { MutatorItem } from '@/app/(types)/MutatorItem'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { linkArchtypesToTraits, linkWeaponsToMods } from '@/app/(lib)/utils'

/**
 * Handles reading/writing the build to the URL query string,
 * linking weapons to mods, and some helper functions
 *
 * @example Adds a `name` parameter to the query string
 * router.push(`${pathname}?${createQueryString('name', name)}`)
 */
export default function useBuildState() {
  // Hooks for monitoring the URL query string
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  /**
   * Creates a new query string by adding or updating a parameter.
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  /**
   * Adds a value to the query string then navigates to it
   */
  function updateBuildState(
    name: string,
    value: string | string[],
    scroll = false,
  ): void {
    if (Array.isArray(value)) {
      value = value.join(',')
    }

    if (name === 'description') {
      buildState.description = value
      setBuilderStorage({
        ...builderStorage,
        tempDescription: value,
      })
    }
    if (name === 'isPublic') {
      buildState.isPublic = value === 'true'
      setBuilderStorage({
        ...builderStorage,
        tempIsPublic: value === 'true',
      })
    }

    router.push(`${pathname}?${createQueryString(name, value)}`, {
      scroll,
    })
  }

  /**
   * Parses the build values from the query string
   */
  function parseQueryString(searchParams: URLSearchParams): BuildState {
    /** The build state that will be returned */
    const buildState: BuildState = {
      name: 'My Build',
      description: null,
      isPublic: null,
      buildId: null,
      createdById: null,
      items: {
        helm: null,
        torso: null,
        legs: null,
        gloves: null,
        relic: null,
        amulet: null,
        weapon: [],
        ring: [],
        archtype: [],
        skill: [],
        concoction: [],
        consumable: [],
        mod: [],
        mutator: [],
        relicfragment: [],
        trait: [],
      },
    }

    // Build name
    const name = searchParams.get('name')
    buildState.name = name ?? buildState.name

    // Build description from localstorage
    if (builderStorage.tempDescription) {
      buildState.description = builderStorage.tempDescription
    }
    // Build public visibility from localstorage
    buildState.isPublic = builderStorage.tempIsPublic === true

    // Check for buildId from localstorage
    buildState.buildId = builderStorage.tempBuildId

    // Check for createdById from localstorage
    buildState.createdById = builderStorage.tempCreatedById

    // Loop through each category and check the query params
    // for that category's item IDs
    remnantItemCategories.forEach((itemCategory) => {
      const params = searchParams.get(itemCategory)

      if (!params) return

      switch (itemCategory) {
        case 'helm':
          const armorItem = ArmorItem.fromParams(params)
          if (armorItem) buildState.items[itemCategory] = armorItem
          break
        case 'torso':
          const torsoItem = ArmorItem.fromParams(params)
          if (torsoItem) buildState.items[itemCategory] = torsoItem
          break
        case 'legs':
          const legsItem = ArmorItem.fromParams(params)
          if (legsItem) buildState.items[itemCategory] = legsItem
          break
        case 'gloves':
          const glovesItem = ArmorItem.fromParams(params)
          if (glovesItem) buildState.items[itemCategory] = glovesItem
          break
        case 'relic':
          const relicItem = GenericItem.fromParamsSingle(params)
          if (relicItem) buildState.items.relic = relicItem
          break
        case 'amulet':
          const amuletItem = GenericItem.fromParamsSingle(params)
          if (amuletItem) buildState.items.amulet = amuletItem
          break
        case 'weapon':
          const weaponItems = WeaponItem.fromParams(params)
          if (weaponItems) buildState.items.weapon = weaponItems
          break
        case 'archtype':
          const archtypeItems = GenericItem.fromParamsArray(params)
          if (archtypeItems) buildState.items.archtype = archtypeItems
          break
        case 'concoction':
          const concoctionItems = GenericItem.fromParamsArray(params)
          if (concoctionItems) buildState.items.concoction = concoctionItems
          break
        case 'consumable':
          const consumableItems = GenericItem.fromParamsArray(params)
          if (consumableItems) buildState.items.consumable = consumableItems
          break
        case 'mod':
          const modItems = GenericItem.fromParamsArray(params)
          if (modItems) buildState.items.mod = modItems
          break
        case 'mutator':
          const mutatorItems = MutatorItem.fromParams(params)
          if (mutatorItems) buildState.items.mutator = mutatorItems
          break
        case 'relicfragment':
          const relicFragmentItems = GenericItem.fromParamsArray(params)
          if (relicFragmentItems)
            buildState.items.relicfragment = relicFragmentItems
          break
        case 'ring':
          const ringItems = GenericItem.fromParamsArray(params)
          if (ringItems) buildState.items.ring = ringItems
          break
        case 'skill':
          const skillItems = GenericItem.fromParamsArray(params)
          if (skillItems) buildState.items.skill = skillItems
          break
        case 'trait':
          const traitItems = TraitItem.fromParams(params)
          if (traitItems) buildState.items.trait = traitItems
          break
        default: {
          console.error(`Unhandled item category: ${itemCategory}`)
          break
        }
      }
    })

    return buildState
  }

  const buildState = linkArchtypesToTraits(
    linkWeaponsToMods(parseQueryString(searchParams)),
  )

  return { updateBuildState, buildState }
}
