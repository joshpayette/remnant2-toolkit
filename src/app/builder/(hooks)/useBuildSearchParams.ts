import { type BuildState } from '@/app/(types)'
import { remnantItemCategories, remnantItems } from '@/app/(data)'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { TraitItem } from '@/app/(types)/TraitItem'
import { GenericItem } from '@/app/(types)/GenericItem'
import { ArmorItem } from '@/app/(types)/ArmorItem'
import { WeaponItem } from '@/app/(types)/WeaponItem'
import { MutatorItem } from '@/app/(types)/MutatorItem'
import { DEFAULT_TRAIT_AMOUNT } from '@/app/(lib)/constants'

/**
 * Checks the build weapons and equips any mods
 * that are linked to them
 */
function linkWeaponsToMods(currentBuild: BuildState) {
  const newBuildState = { ...currentBuild }

  // Check the weapons for linked mods
  // If any are found, add them to the build
  const weapons = newBuildState.items.weapon
  weapons.forEach((weapon, index) => {
    const linkedMod = weapon.linkedItems?.mod
    if (!linkedMod) return

    const modItem = remnantItems.find((mod) => mod.name === linkedMod.name)
    if (!modItem) return

    newBuildState.items.mod[index] = modItem
  })

  // Check the mods for linked weapons
  // If any are found, add them to the build
  const mods = newBuildState.items.mod
  mods.forEach((mod, index) => {
    const linkedWeapon = mod.linkedItems?.weapon
    if (!linkedWeapon) return

    const weaponItem = remnantItems.find(
      (weapon) => weapon.name === linkedWeapon.name,
    )
    if (!WeaponItem.isWeaponItem(weaponItem)) return

    newBuildState.items.weapon[index] = weaponItem
  })

  // Return the build with linked items
  return newBuildState
}

/**
 * Checks the build archtypes and equips any traints
 * that are linked to them
 */
function linkArchtypesToTraits(currentBuildState: BuildState) {
  const newBuildState = { ...currentBuildState }

  // Check the archtypes for linked traits
  // If any are found, add them to the build
  const archtypes = newBuildState.items.archtype
  archtypes.forEach((archtype) => {
    const linkedTrait = archtype.linkedItems?.trait
    if (!linkedTrait) return

    const traitItem = remnantItems.find(
      (trait) => trait.name === linkedTrait.name,
    )
    if (!traitItem) return

    // If the trait is already in the build, set the amount to 10
    // Otherwise, add the trait to the build
    const existingTrait = newBuildState.items.trait.find(
      (trait) => trait.name === traitItem.name,
    )
    if (existingTrait) {
      existingTrait.amount = DEFAULT_TRAIT_AMOUNT
      newBuildState.items.trait = newBuildState.items.trait.map((trait) =>
        trait.name === traitItem.name ? existingTrait : trait,
      )
    } else {
      newBuildState.items.trait.push(
        new TraitItem({
          amount: DEFAULT_TRAIT_AMOUNT,
          id: traitItem.id,
          name: traitItem.name,
          category: traitItem.category,
          imagePath: traitItem.imagePath,
          description: traitItem.description ?? '',
          howToGet: traitItem.howToGet ?? '',
          wikiLinks: traitItem.wikiLinks ?? [],
          linkedItems: traitItem.linkedItems ?? {},
          saveFileSlug: traitItem.saveFileSlug,
        }),
      )
    }
  })

  // *We deliberately don't check the traits and link to archtypes,
  // *since traits can be used without the archtype equipped
  // Return the build with linked items
  return newBuildState
}

/**
 * Handles reading/writing the build to the URL query string,
 * linking weapons to mods, and some helper functions
 *
 * @example Adds a `name` parameter to the query string
 * router.push(`${pathname}?${createQueryString('name', name)}`)
 */
export default function useBuildSearchParams() {
  // Hooks for monitoring the URL query string
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
  function updateBuild(
    name: string,
    value: string | string[],
    scroll = false,
  ): void {
    if (Array.isArray(value)) {
      value = value.join(',')
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
          throw new Error(`Unknown item category: ${itemCategory}`)
        }
      }
    })

    return buildState
  }

  const buildState = linkArchtypesToTraits(
    linkWeaponsToMods(parseQueryString(searchParams)),
  )

  return { updateBuild, currentBuildState: buildState }
}
