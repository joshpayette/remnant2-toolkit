import { remnantItemCategories, remnantItems } from '../(data)'
import { DEFAULT_TRAIT_AMOUNT } from '../(data)/constants'
import { Item } from '../(types)'
import { GenericItem } from '../(types)/items/GenericItem'
import { MutatorItem } from '../(types)/items/MutatorItem'
import { TraitItem } from '../(types)/items/TraitItem'
import { WeaponItem } from '../(types)/items/WeaponItem'
import { BuildState, DBBuild, ItemCategory } from '@/app/(types)/build'
import { getArrayOfLength, itemToCsvItem } from './utils'
import { ModItem } from '../(types)/items/ModItem'
import { z } from 'zod'
import { ArmorItem } from '../(types)/items/ArmorItem'

/**
 * Converts the build state into a CSV file
 */
export function buildStateToCsvData(buildState: BuildState) {
  return remnantItemCategories
    .map((category) => {
      const itemOrItems = buildState.items[category]

      const emptyItem = {
        name: '',
        category,
        description: '',
        howToGet: '',
        wikiLinks: '',
      }

      if (!itemOrItems) return emptyItem

      if (Array.isArray(itemOrItems)) {
        // If the category is a trait, we need to add the trait amount to the name
        if (category === 'trait') {
          return itemOrItems.map((item) => {
            if (!item) return emptyItem
            if (!TraitItem.isTraitItem(item)) return itemToCsvItem(item)
            const { name, ...csvItem } = itemToCsvItem(item)
            return {
              name: `${name} - ${item.amount}`,
              ...csvItem,
            }
          })
        }

        return itemOrItems
          .filter((item) => item !== null)
          .map((item) => itemToCsvItem(item as GenericItem))
      }

      if (itemOrItems.category === 'trait') {
        if (!Array.isArray(itemOrItems)) {
          return {
            name: '',
            category,
            description: '',
            howToGet: '',
            wikiLinks: '',
          }
        }
        return itemOrItems.map((item) => itemToCsvItem(item.item))
      }
    })
    .flat()
}

export function dbBuildToBuildState(dbBuild: DBBuild): BuildState {
  const { buildItems } = dbBuild

  const buildState: BuildState = {
    buildId: dbBuild.id,
    name: dbBuild.name,
    description: dbBuild.description,
    createdById: dbBuild.createdById,
    createdByDisplayName: dbBuild.createdByDisplayName,
    isMember: dbBuild.isMember,
    isPublic: dbBuild.isPublic,
    isFeaturedBuild: dbBuild.isFeaturedBuild,
    thumbnailUrl: dbBuild.thumbnailUrl,
    upvoted: dbBuild.upvoted,
    totalUpvotes: dbBuild.totalUpvotes,
    reported: dbBuild.reported,
    items: {
      helm: ArmorItem.fromDBValue(buildItems, 'helm'),
      torso: ArmorItem.fromDBValue(buildItems, 'torso'),
      legs: ArmorItem.fromDBValue(buildItems, 'legs'),
      gloves: ArmorItem.fromDBValue(buildItems, 'gloves'),
      relic: GenericItem.fromDBValueSingle(buildItems, 'relic'),
      amulet: GenericItem.fromDBValueSingle(buildItems, 'amulet'),
      ring: GenericItem.fromDBValueArray(buildItems, 'ring'),
      archtype: GenericItem.fromDBValueArray(buildItems, 'archtype'),
      skill: GenericItem.fromDBValueArray(buildItems, 'skill'),
      concoction: GenericItem.fromDBValueArray(buildItems, 'concoction'),
      consumable: GenericItem.fromDBValueArray(buildItems, 'consumable'),
      relicfragment: GenericItem.fromDBValueArray(buildItems, 'relicfragment'),
      weapon: WeaponItem.fromDBValue(buildItems),
      mod: ModItem.fromDBValue(buildItems),
      mutator: MutatorItem.fromDBValue(buildItems),
      trait: TraitItem.fromDBValue(buildItems),
    },
  }

  return buildState
}

export function buildStateToBuildItems(buildState: BuildState): Array<{
  itemId: string
  amount?: number
  index?: number
  category: ItemCategory
}> {
  const { items } = buildState

  const buildItems = [
    ...(items.helm
      ? [{ itemId: items.helm.id, category: 'helm' as ItemCategory }]
      : []),
    ...(items.torso
      ? [{ itemId: items.torso.id, category: 'torso' as ItemCategory }]
      : []),
    ...(items.legs
      ? [{ itemId: items.legs.id, category: 'legs' as ItemCategory }]
      : []),
    ...(items.gloves
      ? [{ itemId: items.gloves.id, category: 'gloves' as ItemCategory }]
      : []),
    ...(items.amulet
      ? [{ itemId: items.amulet.id, category: 'amulet' as ItemCategory }]
      : []),
    ...(items.relic
      ? [{ itemId: items.relic.id, category: 'relic' as ItemCategory }]
      : []),
    ...(items.ring
      ? items.ring.map((ring, index) => ({
          itemId: ring?.id ?? '',
          category: 'ring' as ItemCategory,
          index,
        }))
      : []),
    ...(items.archtype
      ? items.archtype.map((archtype, index) => ({
          itemId: archtype?.id ?? '',
          category: 'archtype' as ItemCategory,
          index,
        }))
      : []),
    ...(items.skill
      ? items.skill.map((skill, index) => ({
          itemId: skill?.id ?? '',
          category: 'skill' as ItemCategory,
          index,
        }))
      : []),
    ...(items.concoction
      ? items.concoction.map((concoction, index) => ({
          itemId: concoction?.id ?? '',
          category: 'concoction' as ItemCategory,
          index,
        }))
      : []),
    ...(items.consumable
      ? items.consumable.map((consumable, index) => ({
          itemId: consumable?.id ?? '',
          category: 'consumable' as ItemCategory,
          index,
        }))
      : []),
    ...(items.weapon
      ? items.weapon.map((weapon, index) => ({
          itemId: weapon?.id ?? '',
          category: 'weapon' as ItemCategory,
          index,
        }))
      : []),
    ...(items.mod
      ? items.mod.map((mod, index) => ({
          itemId: mod?.id ?? '',
          category: 'mod' as ItemCategory,
          index,
        }))
      : []),
    ...(items.mutator
      ? items.mutator.map((mutator, index) => ({
          itemId: mutator?.id ?? '',
          category: 'mutator' as ItemCategory,
          index,
        }))
      : []),
    ...(items.relicfragment
      ? items.relicfragment.map((relicfragment, index) => ({
          itemId: relicfragment?.id ?? '',
          category: 'relicfragment' as ItemCategory,
          index,
        }))
      : []),
    ...(items.trait
      ? items.trait.map((trait) => ({
          itemId: trait.id,
          category: 'trait' as ItemCategory,
          amount: trait.amount,
        }))
      : []),
  ]
  return buildItems
}

/**
 * Determines how many concoction slots the build has
 */
export function getConcoctionSlotCount(buildState: BuildState): number {
  // Start at 0 since we already rendered the first concoction
  let concoctionCount = 0

  // Add 3 concoctions if primary is alchemist
  // or if the primary skill is an alchemist skill
  const isPrimaryAlchemist =
    buildState.items.archtype[0]?.name?.toLowerCase() === 'alchemist'
  const isPrimarySkillAlchemist =
    buildState.items.skill[0]?.linkedItems?.archtype?.name === 'Alchemist'
  if (isPrimaryAlchemist || isPrimarySkillAlchemist) concoctionCount += 3

  // Add 1 concoction if they are wearing Feastmaster's Signet
  const hasFeastmastersSignet = buildState.items.ring.some(
    (ring) => ring?.name === "Feastmaster's Signet",
  )
  if (hasFeastmastersSignet) concoctionCount += 1

  // Add 2 concoctionc if they are wearing Brewmasters Cork
  const hasBrewmastersCork =
    buildState.items.amulet?.name === 'Brewmasters Cork'

  if (hasBrewmastersCork) concoctionCount += 2

  return concoctionCount
}

/**
 * Returns a list of items that match the selected slot
 * Takes into account the build's current items and the selected slot
 * This is passed to the ItemSelect modal to display the correct items
 */
export function getItemListForSlot(
  buildState: BuildState,
  selectedItem: {
    category: GenericItem['category'] | null
    index?: number // Used for slots that can have multiple items, such as rings
  },
) {
  if (!selectedItem.category) return []

  // Remove items that are already in the build
  // for the current category
  const unequippedItems = remnantItems.filter((item) => {
    const categoryItemorItems = buildState.items[item.category]
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

    return unequippedItems.filter(
      (item) => WeaponItem.isWeaponItem(item) && item.type === type,
    )
  }

  // If the selected slot is a mod, then limit the
  // mods to those without a linked weapon
  if (selectedItem.category === 'mod') {
    // If melee weapon is selected, no mods are allowed that are not linked
    // to a melee weapon
    if (selectedItem.index === 1) {
      return []
    }

    return unequippedItems.filter(
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

    return unequippedItems.filter(
      (item) => MutatorItem.isMutatorItem(item) && item.type === weaponType,
    )
  }

  // If the selected slot is a skill, try to limit
  // skills based on the corresponding archtype
  if (selectedItem.category === 'skill') {
    const skillItems = unequippedItems.filter(
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
    const archtypeItems = (unequippedItems as GenericItem[]).filter(
      (item) => item.category === 'archtype',
    )

    if (selectedItem.index === undefined) return archtypeItems

    const skill = buildState.items.skill[selectedItem.index]?.name.toLowerCase()

    if (!skill) return archtypeItems

    const itemsForSkill = archtypeItems.filter(
      (item) =>
        item.linkedItems?.skills?.some((s) => s.name.toLowerCase() === skill),
    )

    return itemsForSkill
  }

  // If we got this far, then return all items for the selected slot
  return (unequippedItems as GenericItem[]).filter(
    (item) => item.category === selectedItem.category,
  )
}

export function getRandomItem(
  buildState: BuildState,
  selectedItem: {
    category: GenericItem['category'] | null
    index?: number // Used for slots that can have multiple items, such as rings
  },
): Item {
  let items = getItemListForSlot(buildState, selectedItem)
  const randomIndex = Math.floor(Math.random() * items.length)
  const randomItem = items[randomIndex]
  return randomItem
}

/**
 * Checks the build weapons and equips any mods
 * that are linked to them
 */
export function linkWeaponsToMods(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the weapons for linked mods
  // If any are found, add them to the build
  const weapons = newBuildState.items.weapon
  weapons.forEach((weapon, index) => {
    const linkedMod = weapon?.linkedItems?.mod
    if (!linkedMod) return

    const modItem = remnantItems.find((mod) => mod.name === linkedMod.name)
    if (!modItem) return

    newBuildState.items.mod[index] = modItem as ModItem
  })

  // Return the build with linked items
  return newBuildState
}

/**
 * Checks the build archtypes and equips any traints
 * that are linked to them
 */
export function linkArchtypesToTraits(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the archtypes for linked traits
  // If any are found, add them to the build
  const archtypes = newBuildState.items.archtype

  archtypes.forEach((archtype, archtypeIndex) => {
    const linkedTraits = archtype?.linkedItems?.traits
    if (!linkedTraits) return

    const linkedTraitItems = remnantItems.filter((item) =>
      linkedTraits.some(
        (linkedTrait) =>
          linkedTrait.name === item.name && item.category === 'trait',
      ),
    ) as TraitItem[]
    if (!linkedTraitItems) return

    // if any items aren't valid trait items, error
    const invalidItems = linkedTraitItems.filter(
      (traitItem) => !TraitItem.isTraitItem(traitItem),
    )
    if (invalidItems.length > 0) {
      console.error(
        `Invalid traits found for archtype ${archtype.name}: ${invalidItems}`,
      )
      return
    }

    for (const linkedTraitItem of linkedTraitItems) {
      // if we are not on the primary archtype, skip this linkedTraitItem if it does
      // not have a value of 10 (we don't add core values for secondary archtypes)
      const linkedTrait = linkedTraits.find(
        (trait) => trait.name === linkedTraitItem.name,
      )
      if (archtypeIndex === 1 && linkedTrait?.amount !== 10) continue

      const existingBuildTrait = newBuildState.items.trait.find(
        (trait) => trait.name === linkedTraitItem.name,
      )

      let defaultTraitAmount = DEFAULT_TRAIT_AMOUNT

      // If we are on the primary archtype, determine the core
      // trait amounts to use as defaults
      if (archtypeIndex === 0) {
        defaultTraitAmount =
          linkedTraits.find((trait) => trait.name === linkedTraitItem.name)
            ?.amount ?? DEFAULT_TRAIT_AMOUNT
      }

      // If the trait already exists with a value that is greater
      // than the default amount, use the existing amount
      const traitAmount = existingBuildTrait?.amount ?? defaultTraitAmount

      // If the trait is already in the build, set the amount to the default value
      // Otherwise, add the trait to the build
      if (existingBuildTrait) {
        existingBuildTrait.amount = traitAmount

        newBuildState.items.trait = newBuildState.items.trait.map((trait) =>
          trait.name === linkedTraitItem.name ? existingBuildTrait : trait,
        )
      } else {
        newBuildState.items.trait.push(
          new TraitItem({
            amount: traitAmount,
            id: linkedTraitItem.id,
            name: linkedTraitItem.name,
            category: linkedTraitItem.category,
            imagePath: linkedTraitItem.imagePath,
            description: linkedTraitItem.description ?? '',
            maxLevelBonus: linkedTraitItem.maxLevelBonus ?? '',
            howToGet: linkedTraitItem.howToGet ?? '',
            wikiLinks: linkedTraitItem.wikiLinks ?? [],
            linkedItems: linkedTraitItem.linkedItems ?? {},
            saveFileSlug: linkedTraitItem.saveFileSlug,
          }),
        )
      }
    }
  })

  // *We deliberately don't check the traits and link to archtypes,
  // *since traits can be used without the archtype equipped
  // Return the build with linked items
  return newBuildState
}

export function buildStateToMasonryItems(build: BuildState): Item[] {
  const masonryItems: Item[] = []
  const { items } = build

  // archtypes
  getArrayOfLength(2).forEach((_, i) => {
    items.archtype[i] && masonryItems.push(items.archtype[i] as GenericItem)
    items.skill[i] && masonryItems.push(items.skill[i] as GenericItem)
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
      masonryItems.push(items.relicfragment[i] as GenericItem)
  })
  items.amulet && masonryItems.push(items.amulet)
  getArrayOfLength(4).forEach((_, i) => {
    if (!items.ring[i]) return
    items.ring[i] && masonryItems.push(items.ring[i] as GenericItem)
  })

  // weapons
  getArrayOfLength(3).forEach((_, i) => {
    items.weapon[i] && masonryItems.push(items.weapon[i] as GenericItem)
    items.mod[i] && masonryItems.push(items.mod[i] as Item)
    items.mutator[i] && masonryItems.push(items.mutator[i] as GenericItem)
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

export const buildStateSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  isPublic: z.boolean().nullable(),
  buildId: z.string().nullable(),
  isFeaturedBuild: z.boolean().nullable(),
  createdById: z.string().nullable(),
  upvoted: z.boolean().nullable(),
  items: z.object({
    helm: z.any(),
    torso: z.any(),
    legs: z.any(),
    gloves: z.any(),
    relic: z.any(),
    amulet: z.any(),
    weapon: z.array(z.any()),
    ring: z.array(z.any()),
    archtype: z.array(z.any()),
    skill: z.array(z.any()),
    concoction: z.array(z.any()),
    consumable: z.array(z.any()),
    mod: z.array(z.any()),
    mutator: z.array(z.any()),
    relicfragment: z.array(z.any()),
    trait: z.array(z.any()),
  }),
})

export const initialBuildState: BuildState = {
  name: 'My Build',
  description: null,
  isPublic: true,
  isMember: false,
  isFeaturedBuild: false,
  thumbnailUrl: null,
  buildId: null,
  createdByDisplayName: null,
  createdById: null,
  upvoted: false,
  totalUpvotes: 0,
  reported: false,
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
