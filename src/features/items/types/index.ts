import { ItemCategory } from '@/features/build/types'
import { DESCRIPTION_TAGS, RELEASE_TO_NAME } from '../constants'
import { ArmorItem } from './ArmorItem'
import { ModItem } from './ModItem'
import { MutatorItem } from './MutatorItem'
import { PerkItem } from './PerkItem'
import { TraitItem } from './TraitItem'
import { WeaponItem } from './WeaponItem'
import { AmuletItem } from './AmuletItem'
import { RelicItem } from './RelicItem'
import { RelicFragmentItem } from './RelicFragmentItem'
import { ArchetypeItem } from './ArchetypeItem'
import { SkillItem } from './SkillItem'
import { RingItem } from './RingItem'
import { ConsumableItem } from './ConsumableItem'
import { ConcoctionItem } from './ConcoctionItem'

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

/**
 * The minimum information that should be
 * written in a CSV export for each item
 */
export interface CsvItem {
  name: string
  category: ItemCategory
  description: string
  wikiLinks: string
}

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
  | 'Charged Melee Damage'
  | 'Charged Melee'
  | 'Charged Shot'
  | 'Concoction'
  | 'Critical Chance'
  | 'Critical Hit'
  | 'Damage Reduction'
  | 'Elemental Damage'
  | 'Encumbrance'
  | 'Firearm Swap Speed'
  | 'Grey Health'
  | 'Hardcore'
  | 'Heal'
  | 'Healing Effectivness'
  | 'Health'
  | 'Heat Generation'
  | 'Lifesteal'
  | 'Magazine Capacity'
  | 'Melee Attack Speed'
  | 'Melee Charge Speed'
  | 'Melee Critical Chance'
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

export type ReleaseKey = keyof typeof RELEASE_TO_NAME
export type ReleaseName = (typeof RELEASE_TO_NAME)[ReleaseKey]

export type DescriptionTag = (typeof DESCRIPTION_TAGS)[number]
