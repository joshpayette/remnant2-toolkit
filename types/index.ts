// The type of the slot of armor
export type ArmorSlotType =
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

// Because loadouts have 4 rings, we need to specify a separate LoadoutSlot
// definition that contains all the definitions of ArmorSlot except 'ring', and
// then add 'ring1', 'ring2', 'ring3', and 'ring4' to it.
export type LoadoutSlotType =
  | Exclude<ArmorSlotType, 'ring'>
  | 'ring1'
  | 'ring2'
  | 'ring3'
  | 'ring4'

// The type of a single armor item
export interface ArmorItem {
  slot: ArmorSlotType
  name: string
  path: string
}

// The type of a single loadout item
export interface LoadoutItem {
  slot: LoadoutSlotType
  name: string
  path: string
}
