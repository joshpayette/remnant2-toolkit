import { Item } from '../types'

export function cleanItemName(item: Item) {
  return item.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}
