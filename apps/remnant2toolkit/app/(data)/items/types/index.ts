import { type AmuletItem } from '@/app/(data)/items/types/AmuletItem';
import { type ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem';
import { type ArmorItem } from '@/app/(data)/items/types/ArmorItem';
import { type ConcoctionItem } from '@/app/(data)/items/types/ConcoctionItem';
import { type ConsumableItem } from '@/app/(data)/items/types/ConsumableItem';
import { type ModItem } from '@/app/(data)/items/types/ModItem';
import { type MutatorItem } from '@/app/(data)/items/types/MutatorItem';
import { type PerkItem } from '@/app/(data)/items/types/PerkItem';
import { type RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem';
import { type RelicItem } from '@/app/(data)/items/types/RelicItem';
import { type RingItem } from '@/app/(data)/items/types/RingItem';
import { type SkillItem } from '@/app/(data)/items/types/SkillItem';
import { type TraitItem } from '@/app/(data)/items/types/TraitItem';
import { type WeaponItem } from '@/app/(data)/items/types/WeaponItem';

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
  | WeaponItem;

/**
 * Used to link items, such as guns to their mods,
 * archtypes to skills, etc.
 */
export type LinkedItems = Partial<{
  archetype: { name: string };
  skills: Array<{ name: string }>;
  weapon: { name: string };
  mod: { name: string };
  traits: Array<{ name: string; amount: number }>;
  perks: Array<{ name: string }>;
}>;

export type WeightClass = {
  challengerDescription: string;
  description: string;
  textColor: string;
  maxWeight: number;
};
