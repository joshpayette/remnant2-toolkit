import { allItems } from '@/app/(data)/items/all-items'
import { Item } from '@/app/(data)/items/types'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { BuildState, ItemCategory } from '@/app/(types)/builds'

/**
 * Returns a list of items that match the selected slot
 * Takes into account the build's current items and the selected slot
 * This is passed to the ItemSelect modal to display the correct items
 */
export function getItemListForSlot(
  buildState: BuildState,
  selectedItem: {
    category: ItemCategory | null
    index?: number // Used for slots that can have multiple items, such as rings
  },
) {
  if (!selectedItem.category) return []

  // Remove items that are already in the build
  // for the current category
  const unequippedItems = allItems.filter((item) => {
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
  // skills based on the equipped archetypes
  if (selectedItem.category === 'skill') {
    const skillItems = unequippedItems.filter(
      (item) => item.category === 'skill',
    )

    if (selectedItem.index === undefined) return skillItems

    const archetype =
      buildState.items.archetype[selectedItem.index]?.name.toLowerCase()

    const otherArchetypeIndex = selectedItem.index === 0 ? 1 : 0
    const otherArchetype =
      buildState.items.archetype[otherArchetypeIndex]?.name.toLowerCase()

    if (!archetype && !otherArchetype) return skillItems

    const itemsForArchetype = skillItems.filter(
      (item) => item.linkedItems?.archetype?.name.toLowerCase() === archetype,
    )

    const itemsForOtherArchetype = skillItems.filter(
      (item) =>
        item.linkedItems?.archetype?.name.toLowerCase() === otherArchetype,
    )

    // If current archetype is empty, then all skill items can be returned
    const finalSkillList =
      itemsForArchetype.length === 0 ? skillItems : itemsForArchetype

    // remove itemsForOtherArchetype from itemsForArchetype
    return finalSkillList.filter(
      (item) => !itemsForOtherArchetype.find((i) => i.id === item.id),
    )
  }

  // If the selected slot is an archetype, try to limit
  // the archetypes based on the corresponding skill
  if (selectedItem.category === 'archetype') {
    const archtypeItems = (unequippedItems as ArchetypeItem[]).filter(
      (item) => item.category === 'archetype',
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
  return (unequippedItems as Item[]).filter(
    (item) => item.category === selectedItem.category,
  )
}
