export const OPTIONAL_ITEM_SYMBOL = '*' as const

export const ARCHETYPE_COLORS = {
  ALCHEMIST: {
    bg: 'bg-[#BBCAC5] dark:bg-[#102a22]',
    text: 'text-[#0B775B] dark:text-[#10a880]',
  },
  ARCHON: {
    bg: 'bg-[#BBC8CD] dark:bg-[#102730]',
    text: 'text-[#3D788D] dark:text-[#56a9c6]',
  },
  CHALLENGER: {
    bg: 'bg-[#CCC9C5] dark:bg-[#373029]',
    text: 'text-[#7C6F69] dark:text-[#af9c94]',
  },
  ENGINEER: {
    bg: 'bg-[#C2C7D8] dark:bg-[#26315a]',
    text: 'text-[#7E87A5] dark:text-[#b2bee9]',
  },
  EXPLORER: {
    bg: 'bg-[#C9CFC1] dark:bg-[#2f3c1f]',
    text: 'text-[#498B58] dark:text-[#67c47c]',
  },
  GUNSLINGER: {
    bg: 'bg-[#D1BEBE] dark:bg-[#3f1818]',
    text: 'text-[#9E4B48] dark:text-[#de6966]',
  },
  HANDLER: {
    bg: 'bg-[#D7D7C0] dark:bg-[#545520]',
    text: 'text-[#96955E] dark:text-[#fffc9f]',
  },
  HUNTER: {
    bg: 'bg-[#CFC3BE] dark:bg-[#392217]',
    text: 'text-[#A05646] dark:text-[#e17963]',
  },
  INVADER: {
    bg: 'bg-[#CCC2CC] dark:bg-[#362136]',
    text: 'text-[#A677A9] dark:text-[#eaa8ee]',
  },
  INVOKER: {
    bg: 'bg-[#C3C6C7] dark:bg-[#212628]',
    text: 'text-[#7E8F97] dark:text-[#b2cad4]',
  },
  MEDIC: {
    bg: 'bg-[#BBCCC4] dark:bg-[#0f3021]',
    text: 'text-[#638879] dark:text-[#8bc0aa]',
  },
  SUMMONER: {
    bg: 'bg-[#CAC5C0] dark:bg-[#2c221a]',
    text: 'text-[#846C5B] dark:text-[#ba9880]',
  },
  RITUALIST: {
    bg: 'bg-[#C6BBCD] dark:bg-[#251133]',
    text: 'text-[#8538B5] dark:text-[#bb4fff]',
  },
}

export const WEIGHT_CLASSES = {
  LIGHT: {
    challengerDescription: 'Fast Dodge. No Stamina Cost Penalty.',
    description: 'Fast Dodge. No Stamina Cost Penalty.',
    textColor: 'text-[#6193AA] dark:text-[#89CFF0]',
    maxWeight: 25,
  },
  MEDIUM: {
    challengerDescription:
      'Normal Dodge. 12.5% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'Normal Dodge. 25% Stamina Cost Penalty.',
    textColor: 'text-[#6CB26C] dark:text-[#98FB98]',
    maxWeight: 50,
  },
  HEAVY: {
    challengerDescription:
      'Slow Dodge. 25% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'Slow Dodge. 50% Stamina Cost Penalty.',
    textColor: 'text-[#B5B500] dark:text-[#ffff00]',
    maxWeight: 75,
  },
  ULTRA: {
    challengerDescription:
      'FLOP. 36% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'FLOP. 75% Stamina Cost Penalty.',
    textColor: 'text-[#B50000] dark:text-[#ff0000]',
    maxWeight: -1,
  },
} as const satisfies Record<'LIGHT' | 'MEDIUM' | 'HEAVY' | 'ULTRA', WeightClass>

export type WeightClass = {
  challengerDescription: string
  description: string
  textColor: string
  maxWeight: number
}
