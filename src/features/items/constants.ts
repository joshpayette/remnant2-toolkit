import { ItemTag } from './types'

/**
 * The max size a profile.sav import can be (in kilobytes)
 */
export const MAX_PROFILE_SAV_SIZE = 250

/**
 * Some words are too long to fit in the item label on the builder
 * and need to be manually broken up
 */
export const MANUAL_ITEM_NAME_BREAKS: Array<{ name: string; break: string }> = [
  { name: 'Hyperconductor', break: 'Hyper-conductor' },
  { name: 'Microcompressor', break: 'Micro-compressor' },
]

/**
 * Some labels are too long to fit the label, but can't be broken up
 * and need to be manually transformed to a smaller text size
 */
export const MANUAL_ITEM_NAME_TEXT_TRANSFORMS: Array<{
  name: string
  transform: string
}> = [{ name: "Nightweaver's Grudge", transform: 'text-[9px]' }]

export const ARCHTYPE_COLORS = {
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
}

export const RELEASE_TO_NAME = {
  base: 'Base Game',
  dlc1: 'The Awakened King',
} as const

export const DESCRIPTION_TAGS = [
  {
    type: 'Acid',
    token: 'ACID',
    color: 'text-[#589961]',
    description: 'Elemental Damage',
  },
  {
    type: 'Alchemist',
    token: 'ALCHEMIST',
    color: ARCHTYPE_COLORS.ALCHEMIST.text,
    description: undefined,
  },
  {
    type: 'Amplitude',
    token: '[A]',
    color: 'text-[#66ffcc]',
    description: 'This effect benefits from Amplitude.',
  },
  {
    type: 'Archon',
    token: 'ARCHON',
    color: ARCHTYPE_COLORS.ARCHON.text,
    description: undefined,
  },
  {
    type: 'Bleeding',
    token: 'BLEEDING',
    color: 'text-[#f2350f]',
    description:
      'Deals physical damage per second. Reduces healing effectiveness by 50%.',
  },
  {
    type: 'Bug',
    token: '[BUG]',
    color: 'text-[#ecff00]',
    description:
      'This item is currently bugged and MAY not function as expected.',
  },
  {
    type: 'Burning',
    token: 'BURNING',
    color: 'text-[#b65d30]',
    description: 'Can make enemies panic.', // Have no good source on the secondary effect.
  },
  {
    type: 'Bulwark',
    token: 'BULWARK',
    color: ARCHTYPE_COLORS.CHALLENGER.text,
    description:
      'Increases flat Damage Reduction per stack up to maximum of 25% at 5 stacks.',
  },
  {
    type: 'Challenger',
    token: 'CHALLENGER',
    color: ARCHTYPE_COLORS.CHALLENGER.text,
    description: undefined,
  },
  {
    type: 'Contamination',
    token: 'CONTAMINATION',
    color: 'text-[#800080]',
    description:
      'Inflicts a burst of damage after which it resets allowing another build-up.',
  },
  {
    type: 'Corroded',
    token: 'CORRODED',
    color: 'text-[#0fa82b]',
    description: 'Increases damage taken by 10%.',
  },
  {
    type: 'Corrosive',
    token: 'CORROSIVE',
    color: 'text-[#589961]',
    description: 'Elemental Damage',
  },
  {
    type: 'Critical Damage',
    token: '[C]',
    color: 'text-[#f2350f]',
    description:
      'Base 50%. Critical damage is multiplicative with other sources of damage.',
  },
  {
    type: 'Curse',
    token: 'CURSE',
    color: 'text-[#7d219e]',
    description: 'Reduces maximum Health by 10% per stack. Maximum 5 stacks.',
  },
  {
    type: 'Data corruption',
    token: 'DATA CORRUPTION',
    color: 'text-gray-400',
    description:
      'Disables skills, relic, and consumables use for a short duration.', // TODO: I think it also deals damage and staggers but need to verify.
  },
  {
    type: 'Defrag',
    token: 'DEFRAG',
    color: 'text-[#ede6e6]',
    description: 'Physical Damage',
  },
  {
    type: 'Engineer',
    token: 'ENGINEER',
    color: ARCHTYPE_COLORS.ENGINEER.text,
    description: undefined,
  },
  {
    type: 'Explorer',
    token: 'EXPLORER',
    color: ARCHTYPE_COLORS.EXPLORER.text,
    description: undefined,
  },
  {
    type: 'Explosive Damage',
    token: '[E]',
    color: 'text-[#ff7575]',
    description: 'Counts as Explosive Damage.',
  },
  {
    type: 'Fire',
    token: 'FIRE',
    color: 'text-[#cc5500]',
    description: 'Elemental Damage',
  },
  {
    type: 'Frenzied',
    token: 'FRENZIED',
    color: ARCHTYPE_COLORS.ALCHEMIST.text,
    description:
      'Increases Fire Rate, Reload Speed, and Melee Speed by 20%, and Movement Speed by 15%. Lasts 15s.',
  },
  {
    type: 'Gunslinger',
    token: 'GUNSLINGER',
    color: ARCHTYPE_COLORS.GUNSLINGER.text,
    description: undefined,
  },
  {
    type: 'Handler',
    token: 'HANDLER',
    color: ARCHTYPE_COLORS.HANDLER.text,
    description: undefined,
  },
  {
    type: 'Haste',
    token: 'HASTE',
    color: 'text-[#f1f1cf]',
    description: `Increases the speed of player's actions by 7%.`,
  },
  {
    type: 'Hunter',
    token: 'HUNTER',
    color: ARCHTYPE_COLORS.HUNTER.text,
    description: undefined,
  },
  {
    type: 'Invader',
    token: 'INVADER',
    color: ARCHTYPE_COLORS.INVADER.text,
    description: undefined,
  },
  {
    type: 'Madness',
    token: 'MADNESS',
    color: 'text-[#ede6e6]',
    description: 'Physical Damage',
  },
  {
    type: 'Marked',
    token: 'MARKED',
    color: ARCHTYPE_COLORS.GUNSLINGER.text,
    description:
      'Crit Chance against MARKED enemies is increased by 15% for all allies.',
  },
  {
    type: 'Medic',
    token: 'MEDIC',
    color: ARCHTYPE_COLORS.MEDIC.text,
    description: undefined,
  },
  {
    type: 'Multiplicative',
    token: '[M]',
    color: 'text-orange-300',
    description: 'Damage is multiplicative with other sources of damage.',
  },
  {
    type: 'Multiplicative Debuffs',
    token: '[MD]',
    color: 'text-orange-500',
    description:
      'Counts as a debuff making it multiplicative with other sources of damage.',
  },
  {
    type: 'Overloaded',
    token: 'OVERLOADED',
    color: 'text-[#7676af]',
    description:
      'Deals elemental SHOCK area damage every 5 seconds. Damage increases by 10% for every overloaded enemy nerby. ', // TODO What's the range and what's the max damage increase for secondary effect?
  },
  {
    type: 'Resonance',
    token: '[R]',
    color: 'text-[#00ffcc]',
    description: 'This effect benefits from Resonance.',
  },
  {
    type: 'Ritualist',
    token: 'RITUALIST',
    color: ARCHTYPE_COLORS.RITUALIST.text,
    description: undefined,
  },
  {
    type: 'Root Rot',
    token: 'ROOT ROT',
    color: 'text-[#c66806]',
    description:
      'Reduces maximum Stamina by 33%. Forces coughing animation at random intervals.',
  },
  {
    type: 'Shield',
    token: 'SHIELD',
    color: 'text-[#80e0e1]',
    description: `Provides a shield on top of your health. Shields from different sources stack.`,
  },
  {
    type: 'Shock',
    token: 'SHOCK',
    color: 'text-[#5c5cce]',
    description: 'Elemental Damage',
  },
  {
    type: 'Slow',
    token: 'SLOW',
    color: 'text-[#f1f1cf]',
    description:
      'Reduces target speed. Ineffective against Bosses and Aberrations.',
  },
  {
    type: 'Summoner',
    token: 'SUMMONER',
    color: ARCHTYPE_COLORS.SUMMONER.text,
    description: undefined,
  },
  {
    type: 'Suppression',
    token: 'SUPPRESSION',
    color: 'text-[#444662]',
    description: 'Reduces Mod Power Generation by 50%.',
  },
  {
    type: 'Status Effect',
    token: 'Status Effect',
    color: 'text-[#3179de]',
    description: `Elemental: Burning, Corroded, Overloaded. Physical: Bleeding.`,
  },
] as const satisfies {
  type: string
  token: string
  color: string
  description: string | undefined
}[]

export const ITEM_TAGS: ItemTag[] = [
  'Ammo Reserves', // Only plural one due to wording in game
  'All Damage',
  'Armor Increase',
  'Charged Melee Damage',
  'Charged Melee',
  'Charged Shot',
  'Concoction',
  'Critical Chance',
  'Critical Hit',
  'Damage Reduction',
  'Elemental Damage',
  'Encumbrance',
  'Firearm Swap Speed',
  'Fire Rate',
  'Grey Health',
  'Hardcore',
  'Heal',
  'Healing Effectivness',
  'Health',
  'Heat Generation',
  'Lifesteal',
  'Magazine Capacity',
  'Melee Attack Speed',
  'Melee Charge Speed',
  'Melee Critical Chance',
  'Melee Critical Damage',
  'Melee Critical Hit',
  'Melee Damage',
  'Melee Hit',
  'Melee Special Ability',
  'Melee Speed',
  'Mod Cast Speed',
  'Mod Cooldown',
  'Mod Cost',
  'Mod Damage',
  'Mod Duration',
  'Mod Power',
  'Movement Speed',
  'Neutral Backdash',
  'Neutral Dodge', // TODO Probably merge these 3 into one tag
  'Perfect Dodge',
  'Perfect Neutral Evade',
  'Projectile Speed',
  'Range',
  'Ranged Damage',
  'Recoil',
  'Reduce Skill Cooldown',
  'Relic Use Speed',
  'Reload Speed',
  'Skill Cast Speed',
  'Skill Damage',
  'Skill Duration',
  'Spread',
  'Stagger',
  'Stamina',
  'Status Duration',
  'Status Effect',
  'Summon',
  'Weakspot Critical Chance',
  'Weakspot Damage',
  'Weakspot Hit',
  'Weapon Damage',
]
