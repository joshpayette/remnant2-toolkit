import { BuildTag } from './types'

export const ALL_TAGS: BuildTag[] = [
  {
    label: 'Melee',
    value: 'Melee',
    colors: {
      bg: 'bg-yellow-400/10',
      hover: 'hover:bg-yellow-400/20',
      ring: 'ring-yellow-400/30',
      text: 'text-yellow-500',
    },
  },
  {
    label: 'Ranged',
    value: 'Ranged',
    colors: {
      bg: 'bg-green-400/10',
      hover: 'hover:bg-green-400/20',
      ring: 'ring-green-400/30',
      text: 'text-green-500',
    },
  },
  {
    label: 'Mods',
    value: 'Mods',
    colors: {
      bg: 'bg-blue-400/10',
      hover: 'hover:bg-blue-400/20',
      ring: 'ring-blue-400/30',
      text: 'text-blue-500',
    },
  },
  {
    label: 'Skills',
    value: 'Skills',
    colors: {
      bg: 'bg-indigo-400/10',
      hover: 'hover:bg-indigo-400/20',
      ring: 'ring-indigo-400/30',
      text: 'text-indigo-500',
    },
  },
  {
    label: 'Status Effects',
    value: 'StatusEffects',
    colors: {
      bg: 'bg-purple-400/10',
      hover: 'hover:bg-purple-400/20',
      ring: 'ring-purple-400/30',
      text: 'text-purple-500',
    },
  },
  {
    label: 'Support',
    value: 'Support',
    colors: {
      bg: 'bg-pink-400/10',
      hover: 'hover:bg-pink-400/20',
      ring: 'ring-pink-400/30',
      text: 'text-pink-500',
    },
  },
  {
    label: 'Tank',
    value: 'Tank',
    colors: {
      bg: 'bg-red-400/10',
      hover: 'hover:bg-red-400/20',
      ring: 'ring-red-400/30',
      text: 'text-red-500',
    },
  },
]
