export const ARCHETYPE_COLORS = {
  ALCHEMIST: {
    bg: 'bg-[#102a22]',
    text: 'text-[#10a880]',
  },
  ARCHON: {
    bg: 'bg-[#102730]',
    text: 'text-[#56a9c6]',
  },
  CHALLENGER: {
    bg: 'bg-[#373029]',
    text: 'text-[#af9c94]',
  },
  ENGINEER: {
    bg: 'bg-[#26315a]',
    text: 'text-[#b2bee9]',
  },
  EXPLORER: {
    bg: 'bg-[#2f3c1f]',
    text: 'text-[#67c47c]',
  },
  GUNSLINGER: {
    bg: 'bg-[#3f1818]',
    text: 'text-[#de6966]',
  },
  HANDLER: {
    bg: 'bg-[#545520]',
    text: 'text-[#fffc9f]',
  },
  HUNTER: {
    bg: 'bg-[#392217]',
    text: 'text-[#e17963]',
  },
  INVADER: {
    bg: 'bg-[#362136]',
    text: 'text-[#eaa8ee]',
  },
  INVOKER: {
    bg: 'bg-[#212628]',
    text: 'text-[#b2cad4]',
  },
  MEDIC: {
    bg: 'bg-[#0f3021]',
    text: 'text-[#8bc0aa]',
  },
  SUMMONER: {
    bg: 'bg-[#2c221a]',
    text: 'text-[#ba9880]',
  },
  RITUALIST: {
    bg: 'bg-[#251133]',
    text: 'text-[#bb4fff]',
  },
}

export const WEIGHT_CLASSES = {
  LIGHT: {
    challengerDescription: 'Fast Dodge. No Stamina Cost Penalty.',
    description: 'Fast Dodge. No Stamina Cost Penalty.',
    textColor: 'text-[#89CFF0]',
    maxWeight: 25,
  },
  MEDIUM: {
    challengerDescription:
      'Normal Dodge. 12.5% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'Normal Dodge. 25% Stamina Cost Penalty.',
    textColor: 'text-[#98FB98]',
    maxWeight: 50,
  },
  HEAVY: {
    challengerDescription:
      'Slow Dodge. 25% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'Slow Dodge. 50% Stamina Cost Penalty.',
    textColor: 'text-[#ffff00]',
    maxWeight: 75,
  },
  ULTRA: {
    challengerDescription:
      'FLOP. 36% Stamina Cost Penalty due to Powerlifter perk.',
    description: 'FLOP. 75% Stamina Cost Penalty.',
    textColor: 'text-[#ff0000]',
    maxWeight: -1,
  },
} as const satisfies Record<'LIGHT' | 'MEDIUM' | 'HEAVY' | 'ULTRA', WeightClass>

export type WeightClass = {
  challengerDescription: string
  description: string
  textColor: string
  maxWeight: number
}
