import { type ItemTrackerCategory } from '@/app/(items)/item-tracker/_types/item-tracker-category';

export const VALID_ITEM_CATEGORIES = [
  'Amulet',
  'Archetype',
  'Concoction',
  'Consumable',
  'Gloves',
  'Hand Gun',
  'Helm',
  'Legs',
  'Long Gun',
  'Melee',
  'Mod',
  'Mutator (Gun)',
  'Mutator (Melee)',
  'Prism',
  'Relic',
  'Relic Fragment',
  'Ring',
  'Torso',
  'Trait',
] as const satisfies ItemTrackerCategory[];
