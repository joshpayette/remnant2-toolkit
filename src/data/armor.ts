/** All the armor in the game */
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
  {
    slot: 'helm',
    name: 'Crown of the Red Prince',
    path: '/armor/crown_of_the_red_prince.png',
  },
  {
    slot: 'legs',
    name: 'Cultist Britches',
    path: '/armor/cultist_britches.png',
  },
  {
    slot: 'torso',
    name: 'Cultist Duster',
    path: '/armor/cultist_duster.png',
  },
  {
    slot: 'helm',
    name: 'Cultist Head',
    path: '/armor/cultist_head.png',
  },
  {
    slot: 'torso',
    name: 'Dendroid Chest',
    path: '/armor/dendroid_chest.png',
  },
  {
    slot: 'gloves',
    name: 'Dendroid Grips',
    path: '/armor/dendroid_grips.png',
  },
  {
    slot: 'legs',
    name: 'Dendroid Leggings',
    path: '/armor/dendroid_leggings.png',
  },
  {
    slot: 'helm',
    name: 'Dendroid Mask',
    path: '/armor/dendroid_mask.png',
  },
  {
    slot: 'gloves',
    name: 'Elder Gloves',
    path: '/armor/elder_gloves.png',
  },
  {
    slot: 'helm',
    name: 'Elder Headdress',
    path: '/armor/elder_headdress.png',
  },
  {
    slot: 'legs',
    name: 'Elder Leggings',
    path: '/armor/elder_leggings.png',
  },
  {
    slot: 'torso',
    name: 'Elder Raiment',
    path: '/armor/elder_raiment.png',
  },
] as const satisfies Armor[]

// The type of the slot of armor
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

// The type of a single armor
interface Armor {
  slot: ArmorSlot
  name: string
  path: string
}

// Limit the type of the name to the slot
export type ArmorName = {
  [K in ArmorSlot]: Extract<Armor, { slot: K }>['name']
}
