import { remnantItemCategories, remnantItems } from '@/app/(data)'
import { itemToCsvItem } from '@/app/(lib)/utils'
import { BuildState } from '@/app/(types)'
import { ArmorItem } from '@/app/(types)/ArmorItem'
import { GenericItem } from '@/app/(types)/GenericItem'
import { MutatorItem } from '@/app/(types)/MutatorItem'
import { TraitItem } from '@/app/(types)/TraitItem'
import { WeaponItem } from '@/app/(types)/WeaponItem'
import { Build } from '@prisma/client'

/**
 * Returns a list of items that match the selected slot
 * Takes into account the build's current items and the selected slot
 * This is passed to the ItemSelect modal to display the correct items
 */
export function getItemListForCategory(
  buildState: BuildState,
  selectedItem: {
    category: GenericItem['category'] | null
    index?: number
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

export function buildToCsvData(buildState: BuildState) {
  return remnantItemCategories
    .map((category) => {
      const itemOrItems = buildState.items[category]

      if (!itemOrItems)
        return {
          name: '',
          category,
          description: '',
          howToGet: '',
          wikiLinks: '',
        }

      if (Array.isArray(itemOrItems)) {
        // If the category is a trait, we need to add the trait amount to the name
        if (category === 'trait') {
          return itemOrItems.map((item) => {
            if (!TraitItem.isTraitItem(item)) return itemToCsvItem(item)
            const { name, ...csvItem } = itemToCsvItem(item)
            return {
              name: `${name} - ${item.amount}`,
              ...csvItem,
            }
          })
        }

        return itemOrItems.map((item) => itemToCsvItem(item))
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

export function dbBuildToBuildState(dbBuild: Build): BuildState {
  return {
    name: dbBuild.name,
    description: dbBuild.description,
    isPublic: dbBuild.isPublic,
    items: {
      helm: dbBuild.helm ? ArmorItem.fromDBValue(dbBuild.helm) : null,
      torso: dbBuild.torso ? ArmorItem.fromDBValue(dbBuild.torso) : null,
      gloves: dbBuild.gloves ? ArmorItem.fromDBValue(dbBuild.gloves) : null,
      legs: dbBuild.legs ? ArmorItem.fromDBValue(dbBuild.legs) : null,
      relic: dbBuild.relic
        ? GenericItem.fromDBValueSingle(dbBuild.relic)
        : null,
      weapon: dbBuild.weapon ? WeaponItem.fromDBValue(dbBuild.weapon) : [],
      ring: dbBuild.ring ? GenericItem.fromDBValueArray(dbBuild.ring) : [],
      amulet: dbBuild.amulet
        ? GenericItem.fromDBValueSingle(dbBuild.amulet)
        : null,
      archtype: dbBuild.archtype
        ? GenericItem.fromDBValueArray(dbBuild.archtype)
        : [],
      skill: dbBuild.skill ? GenericItem.fromDBValueArray(dbBuild.skill) : [],
      concoction: dbBuild.concoction
        ? GenericItem.fromDBValueArray(dbBuild.concoction)
        : [],
      consumable: dbBuild.consumable
        ? GenericItem.fromDBValueArray(dbBuild.consumable)
        : [],
      mod: dbBuild.mod ? GenericItem.fromDBValueArray(dbBuild.mod) : [],
      mutator: dbBuild.mutator ? MutatorItem.fromDBValue(dbBuild.mutator) : [],
      relicfragment: dbBuild.relicfragment
        ? GenericItem.fromDBValueArray(dbBuild.relicfragment)
        : [],
      trait: dbBuild.trait ? TraitItem.fromDBValue(dbBuild.trait) : [],
    },
  }
}
