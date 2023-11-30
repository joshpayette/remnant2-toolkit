import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ItemType, LoadoutItemType } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function loadoutItemTypeToItemType(
  loadoutItemType: LoadoutItemType,
): ItemType {
  const validType = loadoutItemType
    .replace('archtypes', 'archtype')
    .replace('concoctions', 'concoction')
    .replace('mods', 'mod')
    .replace('mutators', 'mutator')
    .replace('relicfragments', 'relicfragment')
    .replace('rings', 'ring')
    .replace('traits', 'trait') as ItemType

  return validType
}

export function itemTypeToLoadoutItemType(itemType: ItemType): LoadoutItemType {
  const validType = itemType
    .replace('archtype', 'archtypes')
    .replace('concoction', 'concoctions')
    .replace('mod', 'mods')
    .replace('mutator', 'mutators')
    .replace('relicfragment', 'relicfragments')
    .replace('ring', 'rings')
    .replace('trait', 'traits') as LoadoutItemType

  return validType
}
