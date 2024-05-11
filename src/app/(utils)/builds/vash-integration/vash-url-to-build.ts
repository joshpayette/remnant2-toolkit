import { amuletItems } from '@/app/(data)/items/amulet-items'
import { archetypeItems } from '@/app/(data)/items/archetype-items'
import { armorItems } from '@/app/(data)/items/armor-items'
import { concoctionItems } from '@/app/(data)/items/concoction-items'
import { consumableItems } from '@/app/(data)/items/consumable-items'
import { modItems } from '@/app/(data)/items/mod-items'
import { mutatorItems } from '@/app/(data)/items/mutator-items'
import { relicFragmentItems } from '@/app/(data)/items/relic-fragment-items'
import { relicItems } from '@/app/(data)/items/relic-items'
import { ringItems } from '@/app/(data)/items/ring-items'
import { skillItems } from '@/app/(data)/items/skill-items'
import { traitItems } from '@/app/(data)/items/trait-items'
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
import { weaponItems } from '@/app/(data)/items/weapon-items'

import { INITIAL_BUILD_STATE } from '../../../(data)/builds/constants'

export function vashUrlToBuild(searchParams: URLSearchParams): string | null {
  if (typeof window === 'undefined') return null

  const buildState = INITIAL_BUILD_STATE
  let newBuildUrl = `${new URL(window.location.href.split('?')[0])}?`

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

  newBuildUrl += `trait=${TraitItem.toParams(buildState.items.trait)}`
  newBuildUrl += `&archetype=${ArchetypeItem.toParams(
    buildState.items.archetype,
  )}`
  newBuildUrl += `&skill=${SkillItem.toParams(buildState.items.skill)}`
  newBuildUrl += buildState.items.helm
    ? `&helm=${ArmorItem.toParams(buildState.items.helm)}`
    : ''
  newBuildUrl += buildState.items.torso
    ? `&torso=${ArmorItem.toParams(buildState.items.torso)}`
    : ''
  newBuildUrl += buildState.items.legs
    ? `&legs=${ArmorItem.toParams(buildState.items.legs)}`
    : ''
  newBuildUrl += buildState.items.gloves
    ? `&gloves=${ArmorItem.toParams(buildState.items.gloves)}`
    : ''
  newBuildUrl += buildState.items.relic
    ? `&relic=${RelicItem.toParams(buildState.items.relic)}`
    : ''
  newBuildUrl += buildState.items.relicfragment
    ? `&relicfragment=${RelicFragmentItem.toParams(
        buildState.items.relicfragment,
      )}`
    : ''
  newBuildUrl += `&weapon=${WeaponItem.toParams(buildState.items.weapon)}`
  newBuildUrl += buildState.items.amulet
    ? `&amulet=${AmuletItem.toParams(buildState.items.amulet)}`
    : ''
  newBuildUrl += `&ring=${RingItem.toParams(buildState.items.ring)}`
  newBuildUrl += `&mod=${ModItem.toParams(buildState.items.mod)}`
  newBuildUrl += `&mutator=${MutatorItem.toParams(buildState.items.mutator)}`
  newBuildUrl += `&concoction=${ConcoctionItem.toParams(
    buildState.items.concoction,
  )}`
  newBuildUrl += `&consumable=${ConsumableItem.toParams(
    buildState.items.consumable,
  )}`

  return newBuildUrl
}
