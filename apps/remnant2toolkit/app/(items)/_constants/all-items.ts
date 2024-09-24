import { prismItems } from '@/app/(items)/_constants/prism-items';
import { type Item } from '@/app/(items)/_types/item';

import { amuletItems } from './amulet-items';
import { archetypeItems } from './archetype-items';
import { armorItems } from './armor-items';
import { concoctionItems } from './concoction-items';
import { consumableItems } from './consumable-items';
import { modItems } from './mod-items';
import { mutatorItems } from './mutator-items';
import { perkItems } from './perk-items';
import { relicFragmentItems } from './relic-fragment-items';
import { relicItems } from './relic-items';
import { ringItems } from './ring-items';
import { skillItems } from './skill-items';
import { traitItems } from './trait-items';
import { weaponItems } from './weapon-items';

export const allItems = [
  ...amuletItems,
  ...archetypeItems,
  ...armorItems,
  ...concoctionItems,
  ...consumableItems,
  ...modItems,
  ...mutatorItems,
  ...perkItems,
  ...prismItems,
  ...relicFragmentItems,
  ...relicItems,
  ...ringItems,
  ...skillItems,
  ...traitItems,
  ...weaponItems,
] as const satisfies Item[];
