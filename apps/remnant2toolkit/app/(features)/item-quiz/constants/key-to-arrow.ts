import type { ARROW_TO_INDEX } from '@/app/(features)/item-quiz/constants/arrow-to-index'

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
