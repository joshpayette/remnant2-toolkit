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

export const WEIGHT_CLASSES = [
  {
    type: 'light',
    description: 'Fast Dodge. No Stamina Cost Penalty.',
    text: 'text-[#5a97a9]',
    maxWeight: 25,
  },
  {
    type: 'medium',
    description: 'Normal Dodge. 25% Stamina Cost Penalty.',
    text: 'text-[#61855a]',
    maxWeight: 50,
  },
  {
    type: 'heavy',
    description: 'Slow Dodge. 50% Stamina Cost Penalty.',
    text: 'text-[#9ea457]',
    maxWeight: 75,
  },
  {
    type: 'ultra',
    description: 'FLOP. 75% Stamina Cost Penalty.',
    text: 'text-[#c9403c]',
    maxWeight: -1,
  },
]

export const MODIFIERS: Modifier[] = [
  {
    type: 'additive',
    token: '[+]',
    color: 'text-blue-300',
  },
  {
    type: 'multiplicative',
    token: '[∗]',
    color: 'text-orange-300',
  },
]
