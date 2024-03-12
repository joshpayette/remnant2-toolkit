import { remnantItems } from '@/features/items/data/remnantItems'
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

import { INITIAL_BUILD_STATE } from '../constants'
import { BuildState } from '../types'

export function vashUrlToBuild(searchParams: URLSearchParams): BuildState {
  const buildState = INITIAL_BUILD_STATE

  // Parse the traits
  const traitString = searchParams.get('trait')
  if (traitString) {
    const traits = traitString.split(',')
    for (const trait of traits) {
      const amount = trait.replace(/[^0-9]/g, '')
      const name = trait.replace(/[0-9]/g, '').replace('+', ' ')

      const item = remnantItems.find(
        (item) =>
          TraitItem.isTraitItem(item) &&
          item.name.toLowerCase() === name.toLowerCase(),
      )

      if (!item) continue

      const isTraitInBuild = buildState.items.trait.some(
        (trait) => trait.name === item.name,
      )
      if (!isTraitInBuild) {
        buildState.items.trait.push({
          ...(item as TraitItem),
          amount: parseInt(amount),
        })
      }
    }
  }

  // Parse the archetypes and skills
  const archetypeAndSkillString = searchParams.get('archetype')
  if (archetypeAndSkillString) {
    const archetypesAndSkills = archetypeAndSkillString.split(',')
    for (const archetype of archetypesAndSkills) {
      const name = archetype.replace('+', ' ')

      const item = remnantItems.find(
        (item) =>
          item.name.toLowerCase() === name.toLowerCase() &&
          ArchetypeItem.isArchetypeItem(item),
      )

      if (!item) continue

      const isArchetypeInBuild = buildState.items.archetype.some(
        (archetype) => archetype?.name === item.name,
      )
      if (!isArchetypeInBuild) {
        buildState.items.archetype.push(item as ArchetypeItem)
      }
    }
    for (const skill of archetypesAndSkills) {
      const name = skill.replace('+', ' ')

      const item = remnantItems.find(
        (item) =>
          item.name.toLowerCase() === name.toLowerCase() &&
          SkillItem.isSkillItem(item),
      )

      if (!item) continue

      const isSkillInBuild = buildState.items.skill.some(
        (skill) => skill?.name === item.name,
      )
      if (!isSkillInBuild) {
        buildState.items.skill.push(item as SkillItem)
      }
    }
  }

  // Parse the armor
  const armorString = searchParams.get('armor')
  if (armorString) {
    const armor = armorString.split(',')
    for (const piece of armor) {
      const name = piece.replace('+', ' ')

      const item = remnantItems.find(
        (item) =>
          item.name.toLowerCase() === name.toLowerCase() &&
          ArmorItem.isArmorItem(item),
      )

      if (!item) continue

      switch (item.category) {
        case 'helm':
          buildState.items.helm = item as ArmorItem
          break
        case 'torso':
          buildState.items.torso = item as ArmorItem
          break
        case 'legs':
          buildState.items.legs = item as ArmorItem
          break
        case 'gloves':
          buildState.items.gloves = item as ArmorItem
          break
      }
    }
  }

  // main weapon
  const mainWeaponString = searchParams.get('primary')
  if (mainWeaponString) {
    const mainWeapon = mainWeaponString.split(',')

    if (mainWeapon[0]) {
      const mainWeaponItem = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            mainWeapon[0].replace('+', ' ').toLowerCase() &&
          WeaponItem.isWeaponItem(item),
      )
      if (mainWeaponItem) {
        buildState.items.weapon[0] = mainWeaponItem as WeaponItem
      }
    }

    if (mainWeapon[1]) {
      const mainWeaponMutator = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            mainWeapon[1].replace('+', ' ').toLowerCase() &&
          MutatorItem.isMutatorItem(item),
      )
      if (mainWeaponMutator) {
        buildState.items.mutator[0] = mainWeaponMutator as MutatorItem
      }
    }

    if (mainWeapon[2]) {
      const mainWeaponMod = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            mainWeapon[2].replace('+', ' ').toLowerCase() &&
          ModItem.isModItem(item),
      )
      if (mainWeaponMod) {
        buildState.items.mod[0] = mainWeaponMod as ModItem
      }
    }
  }

  // melee weapon
  const meleeWeaponString = searchParams.get('melee')
  console.info('meleeWeaponString', meleeWeaponString)
  if (meleeWeaponString) {
    const meleeWeapon = meleeWeaponString.split(',')

    if (meleeWeapon[0]) {
      const meleeWeaponItem = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            meleeWeapon[0].replace('+', ' ').toLowerCase() &&
          WeaponItem.isWeaponItem(item),
      )
      if (meleeWeaponItem) {
        buildState.items.weapon[1] = meleeWeaponItem as WeaponItem
      }
    }

    if (meleeWeapon[1]) {
      const meleeWeaponMutator = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            meleeWeapon[1].replace('+', ' ').toLowerCase() &&
          MutatorItem.isMutatorItem(item),
      )
      if (meleeWeaponMutator) {
        buildState.items.mutator[1] = meleeWeaponMutator as MutatorItem
      }
    }

    if (meleeWeapon[2]) {
      const meleeWeaponMod = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            meleeWeapon[2].replace('+', ' ').toLowerCase() &&
          ModItem.isModItem(item),
      )
      if (meleeWeaponMod) {
        buildState.items.mod[1] = meleeWeaponMod as ModItem
      }
    }
  }

  // pistol weapon
  const pistolWeaponString = searchParams.get('secondary')
  console.info('pistolWeaponString', pistolWeaponString)
  if (pistolWeaponString) {
    const pistolWeapon = pistolWeaponString.split(',')

    if (pistolWeapon[0]) {
      const pistolWeaponItem = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            pistolWeapon[0].replace('+', ' ').toLowerCase() &&
          WeaponItem.isWeaponItem(item),
      )
      if (pistolWeaponItem) {
        buildState.items.weapon[2] = pistolWeaponItem as WeaponItem
      }
    }

    if (pistolWeapon[1]) {
      const pistolWeaponMutator = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            pistolWeapon[1].replace('+', ' ').toLowerCase() &&
          MutatorItem.isMutatorItem(item),
      )
      if (pistolWeaponMutator) {
        buildState.items.mutator[2] = pistolWeaponMutator as MutatorItem
      }
    }

    if (pistolWeapon[2]) {
      const pistolWeaponMod = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            pistolWeapon[2].replace('+', ' ').toLowerCase() &&
          ModItem.isModItem(item),
      )
      if (pistolWeaponMod) {
        buildState.items.mod[2] = pistolWeaponMod as ModItem
      }
    }
  }

  console.info('checking accessories!')

  // accessories
  const accessoryString = searchParams.get('accessory')
  if (accessoryString) {
    const accessories = accessoryString.split(',')

    if (accessories[0]) {
      const amulet = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            accessories[0].replace('+', ' ').toLowerCase() &&
          AmuletItem.isAmuletItem(item),
      )
      if (amulet) {
        buildState.items.amulet = amulet as AmuletItem
      }
    }

    if (accessories[1]) {
      const ring = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            accessories[1].replace('+', ' ').toLowerCase() &&
          RingItem.isRingItem(item),
      )
      if (ring) {
        buildState.items.ring[0] = ring as RingItem
      }
    }

    if (accessories[2]) {
      const ring = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            accessories[2].replace('+', ' ').toLowerCase() &&
          RingItem.isRingItem(item),
      )
      if (ring) {
        buildState.items.ring[1] = ring as RingItem
      }
    }

    if (accessories[3]) {
      const ring = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            accessories[3].replace('+', ' ').toLowerCase() &&
          RingItem.isRingItem(item),
      )
      if (ring) {
        buildState.items.ring[2] = ring as RingItem
      }
    }

    if (accessories[4]) {
      const ring = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            accessories[4].replace('+', ' ').toLowerCase() &&
          RingItem.isRingItem(item),
      )
      if (ring) {
        buildState.items.ring[3] = ring as RingItem
      }
    }
  }

  // relic and relic fragments
  const relicString = searchParams.get('relic')
  if (relicString) {
    const relics = relicString.split(',')

    if (relics[0]) {
      const relic = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            relics[0].replace('+', ' ').toLowerCase() &&
          RelicItem.isRelicItem(item),
      )
      if (relic) {
        buildState.items.relic = relic as RelicItem
      }
    }

    if (relics[1]) {
      const relicFragment = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            relics[1].replace('+', ' ').toLowerCase() &&
          RelicFragmentItem.isRelicFragmentItem(item),
      )
      if (relicFragment) {
        buildState.items.relicfragment[0] = relicFragment as RelicFragmentItem
      }
    }

    if (relics[2]) {
      const relicFragment = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            relics[2].replace('+', ' ').toLowerCase() &&
          RelicFragmentItem.isRelicFragmentItem(item),
      )
      if (relicFragment) {
        buildState.items.relicfragment[1] = relicFragment as RelicFragmentItem
      }
    }

    if (relics[3]) {
      const relicFragment = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            relics[3].replace('+', ' ').toLowerCase() &&
          RelicFragmentItem.isRelicFragmentItem(item),
      )
      if (relicFragment) {
        buildState.items.relicfragment[2] = relicFragment as RelicFragmentItem
      }
    }
  }

  // concoctions and consumables
  const consumableString = searchParams.get('consumable')
  if (consumableString) {
    const consumables = consumableString.split(',')

    for (let i = 0; i < 7; i++) {
      const concoction = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            consumables[i].replace('+', ' ').toLowerCase() &&
          ConcoctionItem.isConcoctionItem(item),
      )
      if (concoction) {
        buildState.items.concoction[i] = concoction as ConcoctionItem
      }
    }

    for (let i = 0; i < 4; i++) {
      const consumable = remnantItems.find(
        (item) =>
          item.name.toLowerCase() ===
            consumables[i + 7].replace('+', ' ').toLowerCase() &&
          ConsumableItem.isConsumableItem(item),
      )
      if (consumable) {
        buildState.items.consumable[i] = consumable as ConsumableItem
      }
    }
  }

  buildState.isPublic = false
  buildState.description = `Imported from Vash Cowaii's Loadout Calculator.`

  return buildState
}
