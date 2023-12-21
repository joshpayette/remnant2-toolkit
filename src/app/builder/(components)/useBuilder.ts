import { type BuildState } from '@/app/(types)'
import { remnantItemCategories, remnantItems } from '@/app/(data)'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { DEFAULT_TRAIT_AMOUNT, TraitItem } from '@/app/(types)/TraitItem'
import { BaseItem } from '@/app/(types)/BaseItem'
import { ArmorItem } from '@/app/(types)/ArmorItem'
import { WeaponItem } from '@/app/(types)/WeaponItem'
import { MutatorItem } from '@/app/(types)/MutatorItem'

/**
 * Handles reading/writing the build to the URL query string,
 * linking weapons to mods, and some helper functions
 *
 * @example Adds a `name` parameter to the query string
 * router.push(`${pathname}?${createQueryString('name', name)}`)
 */
export default function useBuilder() {
  // Hooks for monitoring the URL query string
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data: session } = useSession()

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
    /**
     * The build state that will be returned
     */
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
          const armorItem = ArmorItem.fromParamsSingle<ArmorItem>(params)
          if (armorItem) buildState.items[armorItem.category] = armorItem
          break
        case 'torso':
          const torsoItem = ArmorItem.fromParamsSingle<ArmorItem>(params)
          if (torsoItem) buildState.items[torsoItem.category] = torsoItem
          break
        case 'legs':
          const legsItem = ArmorItem.fromParamsSingle<ArmorItem>(params)
          if (legsItem) buildState.items[legsItem.category] = legsItem
          break
        case 'gloves':
          const glovesItem = ArmorItem.fromParamsSingle<ArmorItem>(params)
          if (glovesItem) buildState.items[glovesItem.category] = glovesItem
          break
        case 'relic':
          const relicItem = BaseItem.fromParamsSingle<BaseItem>(params)
          if (relicItem) buildState.items.relic = relicItem
          break
        case 'amulet':
          const amuletItem = BaseItem.fromParamsSingle<BaseItem>(params)
          if (amuletItem) buildState.items.amulet = amuletItem
          break
        case 'weapon':
          const weaponItems = WeaponItem.fromParamsArray<WeaponItem>(params)
          if (weaponItems) buildState.items.weapon = weaponItems
          break
        case 'archtype':
          const archtypeItems = BaseItem.fromParamsArray<BaseItem>(params)
          if (archtypeItems) buildState.items.archtype = archtypeItems
          break
        case 'concoction':
          const concoctionItems = BaseItem.fromParamsArray<BaseItem>(params)
          if (concoctionItems) buildState.items.concoction = concoctionItems
          break
        case 'consumable':
          const consumableItems = BaseItem.fromParamsArray<BaseItem>(params)
          if (consumableItems) buildState.items.consumable = consumableItems
          break
        case 'mod':
          const modItems = BaseItem.fromParamsArray<BaseItem>(params)
          if (modItems) buildState.items.mod = modItems
          break
        case 'mutator':
          const mutatorItems = MutatorItem.fromParamsArray<MutatorItem>(params)
          if (mutatorItems) buildState.items.mutator = mutatorItems
          break
        case 'relicfragment':
          const relicFragmentItems = BaseItem.fromParamsArray<BaseItem>(params)
          if (relicFragmentItems)
            buildState.items.relicfragment = relicFragmentItems
          break
        case 'ring':

        case 'skill':
          const skillItem = BaseItem.fromParamsSingle<BaseItem>(params)
          if (skillItem) buildState.items.skill = [skillItem]
          break
        case 'trait':
          const traitItems = TraitItem.fromParamsArray<TraitItem>(params)
          if (traitItems) buildState.items.trait = traitItems
          break
        default: {
          throw new Error(`Unknown item category: ${itemCategory}`)
        }
      }
    })

    return buildState
  }

  /**
   * Returns a list of items that match the selected slot
   * Takes into account the build's current items and the selected slot
   * This is passed to the ItemSelect modal to display the correct items
   */
  function getItemListForCategory(
    buildState: BuildState,
    selectedItem: {
      category: BaseItem['category'] | null
      index?: number
    },
  ) {
    if (!selectedItem.category) return []

    // Remove items that are already in the build
    // for the current category
    const unequippedItems = remnantItems.filter((item) => {
      const itemCategory = item.category as BaseItem['category']
      const categoryItemorItems = buildState.items[itemCategory]
      if (!categoryItemorItems) return true

      if (Array.isArray(categoryItemorItems)) {
        const buildItems = categoryItemorItems
        return !buildItems.find((i) => i?.id === item.id)
      } else {
        const buildItem = categoryItemorItems
        return buildItem?.id !== item.id
      }
    })

    // If the selected slot is a weapon, then limit the
    // weapons based on the corresponding weapon type
    if (selectedItem.category === 'weapon') {
      let type: WeaponItem['type']
      switch (selectedItem.index) {
        case 0:
          type = 'long gun'
          break
        case 1:
          type = 'melee'
          break
        case 2:
          type = 'hand gun'
          break
      }

      return (unequippedItems as WeaponItem[]).filter(
        (item) => item.category === 'weapon' && item.type === type,
      )
    }

    // If the selected slot is a mod, then limit the
    // mods to those without a linked weapon
    if (selectedItem.category === 'mod') {
      return (unequippedItems as BaseItem[]).filter(
        (item) => item.category === 'mod' && !item.linkedItems?.weapon,
      )
    }

    // If the selected slot is a mutator,
    // then limit the mutators to the weapon type
    if (selectedItem.category === 'mutator') {
      // Get the corresponding weapon from the build
      const buildWeapon = buildState.items.weapon[selectedItem.index ?? 0]
      if (!buildWeapon) return []

      const weaponType = buildWeapon.type === 'melee' ? 'melee' : 'gun'

      return (unequippedItems as MutatorItem[]).filter(
        (item) => item.category === 'mutator' && item.type === weaponType,
      )
    }

    // If the selected slot is a skill, try to limit
    // skills based on the corresponding archtype
    if (selectedItem.category === 'skill') {
      const skillItems = (unequippedItems as BaseItem[]).filter(
        (item) => item.category === 'skill',
      )

      if (selectedItem.index === undefined) return skillItems

      const archtype =
        buildState.items.archtype[selectedItem.index]?.name.toLowerCase()

      if (!archtype) return skillItems

      const itemsForArchtype = skillItems.filter(
        (item) => item.linkedItems?.archtype?.name.toLowerCase() === archtype,
      )

      return itemsForArchtype
    }

    // If the selected slot is an archtype, try to limit
    // the archtypes based on the corresponding skill
    if (selectedItem.category === 'archtype') {
      const archtypeItems = (unequippedItems as BaseItem[]).filter(
        (item) => item.category === 'archtype',
      )

      if (selectedItem.index === undefined) return archtypeItems

      const skill =
        buildState.items.skill[selectedItem.index]?.name.toLowerCase()

      if (!skill) return archtypeItems

      const itemsForSkill = archtypeItems.filter(
        (item) =>
          item.linkedItems?.skills?.some((s) => s.name.toLowerCase() === skill),
      )

      return itemsForSkill
    }

    // If we got this far, then return all items for the selected slot
    return (unequippedItems as BaseItem[]).filter(
      (item) => item.category === selectedItem.category,
    )
  }

  /**
   * Checks the build weapons and equips any mods
   * that are linked to them
   */
  function linkWeaponsToMods(currentBuild: BuildState) {
    const newBuild = { ...currentBuild }

    // Check the weapons for linked mods
    // If any are found, add them to the build
    const weapons = newBuild.items.weapon
    weapons.forEach((weapon, index) => {
      const linkedMod = weapon.linkedItems?.mod
      if (!linkedMod) return

      const modItem = remnantItems.find((mod) => mod.name === linkedMod.name)
      if (!modItem) return

      newBuild.items.mod[index] = modItem
    })

    // Check the mods for linked weapons
    // If any are found, add them to the build
    const mods = newBuild.items.mod
    mods.forEach((mod, index) => {
      const linkedWeapon = mod.linkedItems?.weapon
      if (!linkedWeapon) return

      const weaponItem = remnantItems.find(
        (weapon) => weapon.name === linkedWeapon.name,
      )
      if (!weaponItem) return

      newBuild.items.weapon[index] = weaponItem as WeaponItem
    })

    // Return the build with linked items
    return newBuild
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

  const build = linkArchtypesToTraits(
    linkWeaponsToMods(parseQueryString(searchParams)),
  )

  return { getItemListForCategory, updateBuild, currentBuild: build }
}
