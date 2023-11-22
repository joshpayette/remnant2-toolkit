// The type of the slot of armor
export type ItemSlot =
  | 'helm'
  | 'torso'
  | 'legs'
  | 'gloves'
  | 'relic'
  | 'amulet'
  | 'mainhand'
  | 'offhand'
  | 'melee'
  | 'mod'
  | 'ring'
  | 'trait'
  | 'concoction'
  | 'archtype1'
  | 'archtype2'

// Because loadouts have multiple rings, archtypes, and traits, we need to specify a separate LoadoutSlot
// definition that contains all the definitions of ArmorSlot except 'ring' and 'archtype',
// and then add 'ring1', 'ring2', 'ring3', 'ring4', 'archtype1' and 'archtype2' to it.
export type LoadoutSlot =
  | Exclude<ItemSlot, 'ring' | 'archtype' | 'trait'>
  | 'ring1'
  | 'ring2'
  | 'ring3'
  | 'ring4'
  | 'archtype1'
  | 'archtype2'
  | 'traits'

// The type of a single armor item
export interface Item {
  slot: ItemSlot
  name: string
  path: string
}

// The type of a single loadout item
export interface LoadoutItem {
  slot: LoadoutSlot
  name: string
  path: string
}
