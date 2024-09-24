import { type AmuletItem } from '@/app/(items)/_types/amulet-item';
import { type ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { type ArmorItem } from '@/app/(items)/_types/armor-item';
import { type ConcoctionItem } from '@/app/(items)/_types/concotion-item';
import { type ConsumableItem } from '@/app/(items)/_types/consumable-item';
import { type ModItem } from '@/app/(items)/_types/mod-item';
import { type MutatorItem } from '@/app/(items)/_types/mutator-item';
import { type PerkItem } from '@/app/(items)/_types/perk-item';
import { type PrismItem } from '@/app/(items)/_types/prism-item';
import { type RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { type RelicItem } from '@/app/(items)/_types/relic-item';
import { type RingItem } from '@/app/(items)/_types/ring-item';
import { type SkillItem } from '@/app/(items)/_types/skill-item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';
import { type WeaponItem } from '@/app/(items)/_types/weapon-item';

export type Item =
  | AmuletItem
  | ArchetypeItem
  | ArmorItem
  | ConcoctionItem
  | ConsumableItem
  | ModItem
  | MutatorItem
  | PerkItem
  | PrismItem
  | RelicItem
  | RelicFragmentItem
  | RingItem
  | SkillItem
  | TraitItem
  | WeaponItem;
