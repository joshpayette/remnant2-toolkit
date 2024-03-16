import { amuletItems } from '@/features/items/data/amuletItems'
import { archetypeItems } from '@/features/items/data/archetypeItems'
import { armorItems } from '@/features/items/data/armorItems'
import { concoctionItems } from '@/features/items/data/concoctionItems'
import { consumableItems } from '@/features/items/data/consumableItems'
import { modItems } from '@/features/items/data/modItems'
import { mutatorItems } from '@/features/items/data/mutatorItems'
import { relicFragmentItems } from '@/features/items/data/relicFragmentItems'
import { relicItems } from '@/features/items/data/relicItems'
import { ringItems } from '@/features/items/data/ringItems'
import { skillItems } from '@/features/items/data/skillItems'
import { traitItems } from '@/features/items/data/traitItems'
import { weaponItems } from '@/features/items/data/weaponItems'
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

      const traitItem = traitItems.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      )

      if (!traitItem) continue

      const isTraitInBuild = buildState.items.trait.some(
        (trait) => trait.name === traitItem.name,
      )
      if (!isTraitInBuild) {
        buildState.items.trait.push({
          ...traitItem,
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

      const archetypeItem = archetypeItems.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      )

      if (!archetypeItem) continue

      const isArchetypeInBuild = buildState.items.archetype.some(
        (archetype) => archetype?.name === archetypeItem.name,
      )
      if (!isArchetypeInBuild) {
        buildState.items.archetype.push(archetypeItem)
      }
    }
    for (const skill of archetypesAndSkills) {
      const name = skill.replace('+', ' ')

      const skillItem = skillItems.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      )

      if (!skillItem) continue

      const isSkillInBuild = buildState.items.skill.some(
        (skill) => skill?.name === skillItem.name,
      )
      if (!isSkillInBuild) {
        buildState.items.skill.push(skillItem)
      }
    }
  }

  // Parse the armor
  const armorString = searchParams.get('armor')
  if (armorString) {
    const armor = armorString.split(',')
    for (const piece of armor) {
      const name = piece.replace('+', ' ')

      const armorItem = armorItems.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      )

      if (!armorItem) continue

      switch (armorItem.category) {
        case 'helm':
          buildState.items.helm = armorItem
          break
        case 'torso':
          buildState.items.torso = armorItem
          break
        case 'legs':
          buildState.items.legs = armorItem
          break
        case 'gloves':
          buildState.items.gloves = armorItem
          break
      }
    }
  }

  // main weapon
  const mainWeaponString = searchParams.get('primary')
  if (mainWeaponString) {
    const mainWeapon = mainWeaponString.split(',')

    if (mainWeapon[0]) {
      const mainWeaponItem = weaponItems.find(
        (item) =>
          item.name.toLowerCase() ===
          mainWeapon[0].replace('+', ' ').toLowerCase(),
      )
      if (mainWeaponItem) {
        buildState.items.weapon[0] = mainWeaponItem
      }
    }

    if (mainWeapon[1]) {
      const mainWeaponMutator = mutatorItems.find(
        (item) =>
          item.name.toLowerCase() ===
          mainWeapon[1].replace('+', ' ').toLowerCase(),
      )
      if (mainWeaponMutator) {
        buildState.items.mutator[0] = mainWeaponMutator
      }
    }

    if (mainWeapon[2]) {
      const mainWeaponMod = modItems.find(
        (item) =>
          item.name.toLowerCase() ===
          mainWeapon[2].replace('+', ' ').toLowerCase(),
      )
      if (mainWeaponMod) {
        buildState.items.mod[0] = mainWeaponMod
      }
    }
  }

  // melee weapon
  const meleeWeaponString = searchParams.get('melee')
  if (meleeWeaponString) {
    const meleeWeapon = meleeWeaponString.split(',')

    if (meleeWeapon[0]) {
      const meleeWeaponItem = weaponItems.find(
        (item) =>
          item.name.toLowerCase() ===
          meleeWeapon[0].replace('+', ' ').toLowerCase(),
      )
      if (meleeWeaponItem) {
        buildState.items.weapon[1] = meleeWeaponItem
      }
    }

    if (meleeWeapon[1]) {
      const meleeWeaponMutator = mutatorItems.find(
        (item) =>
          item.name.toLowerCase() ===
          meleeWeapon[1].replace('+', ' ').toLowerCase(),
      )
      if (meleeWeaponMutator) {
        buildState.items.mutator[1] = meleeWeaponMutator
      }
    }

    if (meleeWeapon[2]) {
      const meleeWeaponMod = modItems.find(
        (item) =>
          item.name.toLowerCase() ===
          meleeWeapon[2].replace('+', ' ').toLowerCase(),
      )
      if (meleeWeaponMod) {
        buildState.items.mod[1] = meleeWeaponMod
      }
    }
  }

  // pistol weapon
  const pistolWeaponString = searchParams.get('secondary')
  if (pistolWeaponString) {
    const pistolWeapon = pistolWeaponString.split(',')

    if (pistolWeapon[0]) {
      const pistolWeaponItem = weaponItems.find(
        (item) =>
          item.name.toLowerCase() ===
          pistolWeapon[0].replace('+', ' ').toLowerCase(),
      )
      if (pistolWeaponItem) {
        buildState.items.weapon[2] = pistolWeaponItem
      }
    }

    if (pistolWeapon[1]) {
      const pistolWeaponMutator = mutatorItems.find(
        (item) =>
          item.name.toLowerCase() ===
          pistolWeapon[1].replace('+', ' ').toLowerCase(),
      )
      if (pistolWeaponMutator) {
        buildState.items.mutator[2] = pistolWeaponMutator
      }
    }

    if (pistolWeapon[2]) {
      const pistolWeaponMod = modItems.find(
        (item) =>
          item.name.toLowerCase() ===
          pistolWeapon[2].replace('+', ' ').toLowerCase(),
      )
      if (pistolWeaponMod) {
        buildState.items.mod[2] = pistolWeaponMod
      }
    }
  }

  // accessories
  const accessoryString = searchParams.get('accessory')
  if (accessoryString) {
    const accessories = accessoryString.split(',')

    if (accessories[0]) {
      const amuletItem = amuletItems.find(
        (item) =>
          item.name.toLowerCase() ===
          accessories[0].replace('+', ' ').toLowerCase(),
      )
      if (amuletItem) {
        buildState.items.amulet = amuletItem
      }
    }

    if (accessories[1]) {
      const ringItem = ringItems.find(
        (item) =>
          item.name.toLowerCase() ===
          accessories[1].replace('+', ' ').toLowerCase(),
      )
      if (ringItem) {
        buildState.items.ring[0] = ringItem
      }
    }

    if (accessories[2]) {
      const ringItem = ringItems.find(
        (item) =>
          item.name.toLowerCase() ===
          accessories[2].replace('+', ' ').toLowerCase(),
      )
      if (ringItem) {
        buildState.items.ring[1] = ringItem
      }
    }

    if (accessories[3]) {
      const ringItem = ringItems.find(
        (item) =>
          item.name.toLowerCase() ===
          accessories[3].replace('+', ' ').toLowerCase(),
      )
      if (ringItem) {
        buildState.items.ring[2] = ringItem
      }
    }

    if (accessories[4]) {
      const ringItem = ringItems.find(
        (item) =>
          item.name.toLowerCase() ===
          accessories[4].replace('+', ' ').toLowerCase(),
      )
      if (ringItem) {
        buildState.items.ring[3] = ringItem
      }
    }
  }

  // relic and relic fragments
  const relicString = searchParams.get('relic')
  if (relicString) {
    const relics = relicString.split(',')

    if (relics[0]) {
      const relicItem = relicItems.find(
        (item) =>
          item.name.toLowerCase() === relics[0].replace('+', ' ').toLowerCase(),
      )
      if (relicItem) {
        buildState.items.relic = relicItem
      }
    }

    if (relics[1]) {
      const relicFragmentItem = relicFragmentItems.find(
        (item) =>
          item.name.toLowerCase() === relics[1].replace('+', ' ').toLowerCase(),
      )
      if (relicFragmentItem) {
        buildState.items.relicfragment[0] = relicFragmentItem
      }
    }

    if (relics[2]) {
      const relicFragmentItem = relicFragmentItems.find(
        (item) =>
          item.name.toLowerCase() === relics[2].replace('+', ' ').toLowerCase(),
      )
      if (relicFragmentItem) {
        buildState.items.relicfragment[1] = relicFragmentItem
      }
    }

    if (relics[3]) {
      const relicFragmentItem = relicFragmentItems.find(
        (item) =>
          item.name.toLowerCase() === relics[3].replace('+', ' ').toLowerCase(),
      )
      if (relicFragmentItem) {
        buildState.items.relicfragment[2] = relicFragmentItem
      }
    }
  }

  // concoctions and consumables
  const consumableString = searchParams.get('consumable')
  if (consumableString) {
    const consumables = consumableString.split(',')

    for (let i = 0; i < 7; i++) {
      const concoctionItem = concoctionItems.find(
        (item) =>
          item.name.toLowerCase() ===
          consumables[i].replace('+', ' ').toLowerCase(),
      )
      if (concoctionItem) {
        buildState.items.concoction[i] = concoctionItem
      }
    }

    for (let i = 0; i < 4; i++) {
      const consumableItem = consumableItems.find(
        (item) =>
          item.name.toLowerCase() ===
          consumables[i + 7].replace('+', ' ').toLowerCase(),
      )
      if (consumableItem) {
        buildState.items.consumable[i] = consumableItem
      }
    }
  }

  buildState.isPublic = false
  buildState.description = `Imported from Vash Cowaii's Loadout Calculator.`

  return buildState
}
