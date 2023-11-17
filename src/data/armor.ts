export type ArmorSlot =
  | 'helm'
  | 'torso'
  | 'legs'
  | 'gloves'
  | 'relic'
  | 'amulet'
  | 'ring1'
  | 'ring2'
  | 'ring3'
  | 'ring4'

export const armorList = [
  {
    slot: 'gloves',
    name: "Academic's Gloves",
    path: '/armor/academics_gloves.png',
  },
  { slot: 'helm', name: "Academic's Hat", path: '/armor/academics_hat.png' },
  {
    slot: 'torso',
    name: "Academic's Overcoat",
    path: '/armor/academics_overcoat.png',
  },
  {
    slot: 'legs',
    name: "Academic's Trousers",
    path: '/armor/academics_trousers.png',
  },
  { slot: 'torso', name: "Bandit's Jacket", path: '/armor/bandits_jacket.png' },
  { slot: 'helm', name: "Bandit's Mask", path: '/armor/bandits_mask.png' },
  {
    slot: 'legs',
    name: "Bandit's Trousers",
    path: '/armor/bandits_trousers.png',
  },
  { slot: 'helm', name: 'Bruiser Helmet', path: '/armor/bruiser_helmet.png' },
] as const satisfies { slot: ArmorSlot; name: string; path: string }[]

type ArmorList = typeof armorList
export type Armor = ArmorList[number]

// Limit the type of the name to the slot
export type ArmorName = {
  [K in ArmorSlot]: Extract<Armor, { slot: K }>['name']
}
