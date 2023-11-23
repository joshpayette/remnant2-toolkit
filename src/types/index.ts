// Remnant 2 has a lot of different types of items
// Because a loadout can have multiple of the same item type,
// we need to split the definitions into two types:
type BaseItemType =
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
  | 'concoction'

// The type of a single item category
export type ItemType = BaseItemType | 'ring' | 'trait' | 'archtype'

// The type of a single item slot in a loadout
export type LoadoutItemType =
  | BaseItemType
  | 'ring1'
  | 'ring2'
  | 'ring3'
  | 'ring4'
  | 'archtype1'
  | 'archtype2'
  | 'traits'

// The type of a single item stored in the database
export interface Item {
  type: ItemType
  name: string
  path: string
}

// The type of a single item stored in a loadout
export interface LoadoutItem extends Omit<Item, 'type'> {
  type: LoadoutItemType
}

// The type of a loadout
export interface Loadout {
  name: string
  items: {
    [key in LoadoutItemType]: LoadoutItem | LoadoutItem[] | null
  }
}
