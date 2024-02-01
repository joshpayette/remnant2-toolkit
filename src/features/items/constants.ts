import { DescriptionTag } from './types'

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
    text: 'text-[#c3c17a]',
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
    description: 'Fast Dodge. No Stamina Cost Penalty.',
    textColor: 'text-[#5a97a9]',
    maxWeight: 25,
  },
  MEDIUM: {
    description: 'Normal Dodge. 25% Stamina Cost Penalty.',
    textColor: 'text-[#61855a]',
    maxWeight: 50,
  },
  HEAVY: {
    description: 'Slow Dodge. 50% Stamina Cost Penalty.',
    textColor: 'text-[#9ea457]',
    maxWeight: 75,
  },
  ULTRA: {
    description: 'FLOP. 75% Stamina Cost Penalty.',
    textColor: 'text-[#c9403c]',
    maxWeight: -1,
  },
}

export const RELEASE_TO_NAME = {
  base: 'Base Game',
  dlc1: 'The Awakened King',
} as const

/**
 * TODO Need to add bleedResistance, shockResistance, fireResistance, blightResistance, and toxinResistance
 * TODO Once done, add tooltips to Stats and ArmorInfo
 */
export const DESCRIPTION_TAGS = [
  {
    type: 'acid',
    token: 'ACID',
    color: 'text-[#589961]',
    description: 'Elemental Damage',
  },
  {
    type: 'additive',
    token: '[+]',
    color: 'text-[#64b5f6]',
    description: 'Damage is additive with other sources of damage.',
  },
  {
    type: 'alchemist',
    token: 'ALCHEMIST',
    color: ARCHTYPE_COLORS.ALCHEMIST.text,
    description: undefined,
  },
  {
    type: 'amplitude',
    token: '[A]',
    color: 'text-[#66ffcc]',
    description: 'This effect benefits from Amplitude.',
  },
  {
    type: 'archon',
    token: 'ARCHON',
    color: ARCHTYPE_COLORS.ARCHON.text,
    description: undefined,
  },
  {
    type: 'bleeding',
    token: 'BLEEDING',
    color: 'text-[#a63838]',
    description:
      'Deals physical damage per second. Reduces healing effectiveness by 50%.',
  },
  {
    type: 'burning',
    token: 'BURNING',
    color: 'text-[#b65d30]',
    description:
      'Deals elemental FIRE damage per second. Can make enemies panic.', //Have no good source on the secondary effect.
  },
  {
    type: 'bulwark',
    token: 'BULWARK',
    color: ARCHTYPE_COLORS.CHALLENGER.text,
    description:
      'Increases flat Damage Reduction per stack up to maximum of 25% at 5 stacks.',
  },
  {
    type: 'challenger',
    token: 'CHALLENGER',
    color: ARCHTYPE_COLORS.CHALLENGER.text,
    description: undefined,
  },
  {
    type: 'contamination',
    token: 'CONTAMINATION',
    color: 'text-[#800080]',
    description:
      'Inflicts a burst of damage after which it resets allowing another build-up.',
  },
  {
    type: 'corroded',
    token: 'CORRODED',
    color: 'text-[#30b65d]',
    description:
      'Deals elemental ACID damage per second. Increases damage taken by 10%.',
  },
  {
    type: 'curse',
    token: 'CURSE',
    color: 'text-[#7d219e]',
    description: 'Reduces maximum Health by 10% per stack. Maximum 5 stacks.',
  },
  {
    type: 'data corruption',
    token: 'DATA CORRUPTION',
    color: 'text-gray-400',
    description:
      'Disables skills, relic, and consumables use for a short duration.', // I think it also deals damage and staggers but need to verify.
  },
  {
    type: 'defrag',
    token: 'DEFRAG',
    color: 'text-[#ede6e6]',
    description: 'Physical Damage',
  },
  {
    type: 'engineer',
    token: 'ENGINEER',
    color: ARCHTYPE_COLORS.ENGINEER.text,
    description: undefined,
  },
  {
    type: 'explorer',
    token: 'EXPLORER',
    color: ARCHTYPE_COLORS.EXPLORER.text,
    description: undefined,
  },
  {
    type: 'explosive',
    token: 'EXPLOSIVE',
    color: 'text-[#fff]', //In game colour is the same as text - Alexij
    description: 'Physical Damage',
  },
  {
    type: 'fire',
    token: 'FIRE',
    color: 'text-[#9f674e]',
    description: 'Elemental Damage',
  },
  {
    type: 'frenzied',
    token: 'FRENZIED',
    color: ARCHTYPE_COLORS.ALCHEMIST.text,
    description:
      'Increases Fire Rate, Reload Speed, and Melee Speed by 20%, and Movement Speed by 15%. Lasts 15s.',
  },
  {
    type: 'gunslinger',
    token: 'GUNSLINGER',
    color: ARCHTYPE_COLORS.GUNSLINGER.text,
    description: undefined,
  },
  {
    type: 'handler',
    token: 'HANDLER',
    color: ARCHTYPE_COLORS.HANDLER.text,
    description: undefined,
  },
  {
    type: 'haste',
    token: 'HASTE',
    color: 'text-[#f1f1cf]',
    description: `Increases the speed of player's actions by 7%.`,
  },
  {
    type: 'hunter',
    token: 'HUNTER',
    color: ARCHTYPE_COLORS.HUNTER.text,
    description: undefined,
  },
  {
    type: 'invader',
    token: 'INVADER',
    color: ARCHTYPE_COLORS.INVADER.text,
    description: undefined,
  },
  {
    type: 'marked',
    token: 'MARKED',
    color: ARCHTYPE_COLORS.GUNSLINGER.text,
    description:
      'Crit Chance against MARKED enemies is increased by 15% for all allies.',
  },
  {
    type: 'medic',
    token: 'MEDIC',
    color: ARCHTYPE_COLORS.MEDIC.text,
    description: undefined,
  },
  {
    type: 'multiplicative',
    token: '[∗]',
    color: 'text-orange-300',
    description: 'Damage is multiplicative with other sources of damage.',
  },
  {
    type: 'overloaded',
    token: 'OVERLOADED',
    color: 'text-[#7676af]',
    description:
      'Deals elemental SHOCK area damage ever 5 seconds. Damage increases by 10% for every overloaded enemy nerby. ', // What's the range and what's the max damage increase for secondary effect?
  },
  {
    type: 'resonance',
    token: '[R]',
    color: 'text-[#00ffcc]',
    description: 'This effect benefits from Resonance.',
  },
  {
    type: 'ritualist',
    token: 'RITUALIST',
    color: ARCHTYPE_COLORS.RITUALIST.text,
    description: undefined,
  },
  {
    type: 'root rot',
    token: 'ROOT ROT',
    color: 'text-[#b4a065]',
    description: 'Reduces maximum Stamina by 33%. Forces coughing animation at random intervals.',
  },
  {
    type: 'shield',
    token: 'SHIELD',
    color: 'text-[#f1f1cf]',
    description: `Provides a shield on top of your health. Shields from different sources stack.`
  },
  {
    type: 'shock',
    token: 'SHOCK',
    color: 'text-[#7e7ea2]',
    description: 'Elemental Damage',
  },
  {
    type: 'slow',
    token: 'SLOW',
    color: 'text-[#f1f1cf]',
    description:  'Reduces target speed. Ineffective against Bosses and Aberrations.',
  },
  {
    type: 'summoner',
    token: 'SUMMONER',
    color: ARCHTYPE_COLORS.SUMMONER.text,
    description: undefined,
  },
  {
    type: 'suppression',
    token: 'SUPPRESSION',
    color: 'text-[#444662]',
    description: 'Reduces Mod Power Generation by 50%.',
  },
  {
    type: 'madness',
    token: 'MADNESS',
    color: 'text-[#ede6e6]',
    description: 'Physical Damage',
  },
] as const satisfies {
  type: string
  token: string
  color: string
  description: string | undefined
}[]
