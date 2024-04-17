import { Item } from '@/features/items/types'

import { amuletItems } from './amuletItems'
import { archetypeItems } from './archetypeItems'
import { armorItems } from './armorItems'
import { concoctionItems } from './concoctionItems'
import { consumableItems } from './consumableItems'
import { modItems } from './modItems'
import { mutatorItems } from './mutatorItems'
import { perkItems } from './perkItems'
import { relicFragmentItems } from './relicFragmentItems'
import { relicItems } from './relicItems'
import { ringItems } from './ringItems'
import { skillItems } from './skillItems'
import { traitItems } from './traitItems'
import { weaponItems } from './weaponItems'

export const allItems = [
  ...amuletItems,
  ...archetypeItems,
  ...armorItems,
  ...concoctionItems,
  ...consumableItems,
  ...modItems,
  ...mutatorItems,
  ...perkItems,
  ...relicFragmentItems,
  ...relicItems,
  ...ringItems,
  ...skillItems,
  ...traitItems,
  ...weaponItems,
] satisfies Item[]
