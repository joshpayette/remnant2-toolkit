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
import { DESCRIPTION_TAGS } from '@/features/items/constants'

export type Item =
  | AmuletItem
  | ArchetypeItem
  | ArmorItem
  | ConcoctionItem
  | ConsumableItem
  | ModItem
  | MutatorItem
  | PerkItem
  | RelicItem
  | RelicFragmentItem
  | RingItem
  | SkillItem
  | TraitItem
  | WeaponItem

export type Archetype =
  | 'alchemist'
  | 'archon'
  | 'challenger'
  | 'engineer'
  | 'explorer'
  | 'gunslinger'
  | 'handler'
  | 'hunter'
  | 'invader'
  | 'invoker'
  | 'medic'
  | 'ritualist'
  | 'summoner'

/**
 * Used to link items, such as guns to their mods,
 * archtypes to skills, etc.
 */
export type LinkedItems = Partial<{
  archetype: { name: string }
  skills: Array<{ name: string }>
  weapon: { name: string }
  mod: { name: string }
  traits: Array<{ name: string; amount: number }>
  perks: Array<{ name: string }>
}>

export type ItemTag =
  | 'All Damage'
  | 'Ammo Reserves'
  | 'Armor Increase'
  | 'Charged Melee Damage'
  | 'Charged Melee'
  | 'Charged Shot'
  | 'Concoction'
  | 'Consumable'
  | 'Critical Chance'
  | 'Critical Damage'
  | 'Critical Hit'
  | 'Damage Reduction'
  | 'Elemental Damage'
  | 'Encumbrance'
  | 'Firearm Swap Speed'
  | 'Fire Rate'
  | 'Grenade'
  | 'Grey Health'
  | 'Hardcore Reward'
  | 'Heal'
  | 'Healing Effectiveness'
  | 'Health'
  | 'Heat Generation'
  | 'Lifesteal'
  | 'Magazine Capacity'
  | 'Melee Attack Speed'
  | 'Melee Charge Speed'
  | 'Melee Critical Chance'
  | 'Melee Critical Damage'
  | 'Melee Critical Hit'
  | 'Melee Damage'
  | 'Melee Hit'
  | 'Melee Special Ability'
  | 'Melee Speed'
  | 'Mod Cast Speed'
  | 'Mod Cooldown'
  | 'Mod Cost'
  | 'Mod Damage'
  | 'Mod Duration'
  | 'Mod Power'
  | 'Movement Speed'
  | 'Neutral Backdash'
  | 'Neutral Dodge'
  | 'Perfect Dodge'
  | 'Perfect Neutral Evade'
  | 'Projectile Speed'
  | 'Range'
  | 'Ranged Damage'
  | 'Rate of Fire'
  | 'Recoil'
  | 'Reduce Skill Cooldown'
  | 'Relic Use Speed'
  | 'Reload Speed'
  | 'Skill Cast Speed'
  | 'Skill Damage'
  | 'Skill Duration'
  | 'Spread'
  | 'Stagger'
  | 'Stamina'
  | 'Status Duration'
  | 'Status Effect'
  | 'Summon'
  | 'Weakspot Critical Chance'
  | 'Weakspot Damage'
  | 'Weakspot Hit'
  | 'Weapon Damage'

export type DescriptionTag = (typeof DESCRIPTION_TAGS)[number]

export type WeightClass = {
  challengerDescription: string
  description: string
  textColor: string
  maxWeight: number
}

/** Used to show the # of builds an item is used in */
export type ItemBuildStats = {
  featured: { usedIn: number; total: number }
  community: { usedIn: number; total: number }
}
