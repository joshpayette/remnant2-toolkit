import type { ItemType } from '@/types'

export type Filters = {
  undiscovered: boolean
  discovered: boolean
} & {
  [key in ItemType]: boolean
}
