import { Modifier } from './types'

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

export const MODIFIERS: Modifier[] = [
  {
    type: 'additive',
    token: '[+]',
    color: 'text-blue-300',
    description: 'Damage is additive with other sources of damage.',
  },
  {
    type: 'multiplicative',
    token: '[∗]',
    color: 'text-orange-300',
    description: 'Damage is multiplicative with other sources of damage.',
  },
  {
    type: 'bleeding',
    token: 'BLEEDING',
    color: 'text-[#a63838]',
    description: 'Deals physical BLEED damage per second. Reduces healing effectiveness by 50%.', //
  },
  {
    type: 'burning',
    token: 'BURNING',
    color: 'text-[#b65d30]',
    description: 'Deals elemental FIRE damage per second. Can make enemies panic.', //Have no good source on the secondary effect.
  },
  {
    type: 'overloaded',
    token: 'OVERLOADED',
    color: 'text-[#7676af]',
    description: 'Deals elemental SHOCK area damage ever 5 seconds. Damage increases by 10% for every overloaded enemy nerby. ', // What's the range and what's the max damage increase for secondary effect?
  },
  {
    type: 'corroded',
    token: 'CORRODED',
    color: 'text-[#30b65d]',
    description: 'Deals elemental ACID damage per second. Increases damage taken by 10%.',
  },
  {
    type: 'shield',
    token: 'SHIELD',
    color: 'text-[#f1f1cf]',
    description: '',
  },
  {
    type: 'bulwark',
    token: 'BULWARK',
    color: ARCHTYPE_COLORS.CHALLENGER.text,
    description: '',
  },
  {
    type: 'slow',
    token: 'SLOW',
    color: '',
    description: '',
  },
  {
    type: 'haste',
    token: 'HASTE',
    color: '',
    description: `Increases the speed of player's actions by 7%.`, 
  },
  {
    type: 'root rot',
    token: 'ROOT ROT',
    color: '',
    description: '',
  },
  {
    type: 'contamination',
    token: 'CONTAMINATION',
    color: '',
    description: '',
  },
  {
    type: 'curse',
    token: 'CURSE',
    color: '',
    description: '',
  },
  {
    type: 'suppression',
    token: 'SUPPRESSION',
    color: '',
    description: '',
  },
  {
    type: 'data corruption',
    token: 'DATA CORRUPTION',
    color: '',
    description: '',
  },
]

export const RELEASE_TO_NAME = {
  base: 'Base Game',
  dlc1: 'The Awakened King',
} as const
