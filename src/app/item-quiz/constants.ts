import { QuizItemCategory } from '@/app/item-quiz/types'

export const GAME_ITEM_CATEGORIES: QuizItemCategory[] = [
  'Helm',
  'Torso',
  'Legs',
  'Gloves',
  'Archetype',
  'Skill',
  'Trait',
  'Perk',
  'Amulet',
  'Ring',
  'Relic',
  'Long Gun',
  'Hand Gun',
  'Melee',
  'Mod',
  'Mutator (Gun)',
  'Mutator (Melee)',
  'Concoction',
  'Consumable',
]

export const TOTAL_CHOICES = 4
export const COUNTDOWN_DURATION = 2 // it's actually one second more than this value
export const GAME_DURATION = 60

export const ARROW_TO_INDEX = {
  ArrowUp: 1,
  ArrowRight: 2,
  ArrowDown: 3,
  ArrowLeft: 4,
}

export const KEY_TO_ARROW: Record<
  1 | 2 | 3 | 4 | 'W' | 'A' | 'S' | 'D',
  keyof typeof ARROW_TO_INDEX
> = {
  '1': 'ArrowUp',
  '2': 'ArrowLeft',
  '3': 'ArrowRight',
  '4': 'ArrowDown',
  W: 'ArrowUp',
  A: 'ArrowLeft',
  S: 'ArrowDown',
  D: 'ArrowRight',
}
