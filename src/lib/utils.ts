import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ItemType, LoadoutItemType } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function loadoutItemTypeToItemType(
  loadoutItemType: LoadoutItemType,
): ItemType {
  const validType = loadoutItemType
    .replace('ring1', 'ring')
    .replace('ring2', 'ring')
    .replace('ring3', 'ring')
    .replace('ring4', 'ring')
    .replace('archtype1', 'archtype')
    .replace('archtype2', 'archtype')
    .replace('traits', 'trait')

  return validType as ItemType
}
