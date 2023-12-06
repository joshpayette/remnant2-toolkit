import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Item, ItemType, LoadoutItemType } from '@/types'
import { remnantItems } from '@/data/items'

/**
 * shadcn utility function combining clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * capitalizes the first letter of a string
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Generates an array of the specified length
 */
export function getArrayOfLength(length: number): number[] {
  return Array.from(Array(length).keys())
}

/**
 * Converts an array of objects to a CSV file and starts the download
 */
export function toCsv<T extends {}>(array: T[], filename: string) {
  let csvContent = 'data:text/csv;charset=utf-8,'
  // Add header row with keys
  csvContent += Object.keys(array[0]).join(',') + '\n'
  // Add data rows with values
  csvContent += array.map((item) => Object.values(item).join(',')).join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `${filename}.csv`)
  document.body.appendChild(link) // Required for FF
  link.click()
}

/**
 * Removes dangling comma from the end of a string
 */
export function trimTrailingComma(string: string): string {
  return string.replace(/,\s*$/, '')
}

/**
 * Typeguard for ItemType
 */
function isItemType(type: string): type is ItemType {
  const itemTypes: ItemType[] = [
    'helm',
    'torso',
    'legs',
    'gloves',
    'relic',
    'amulet',
    'mainhand',
    'offhand',
    'melee',
    'archtype',
    'concoction',
    'mod',
    'mutator',
    'relicfragment',
    'ring',
    'skill',
    'trait',
  ]
  return itemTypes.includes(type as ItemType)
}

/**
 * Typeguard for LoadoutItemType
 */
function isLoadoutItemType(type: string): type is LoadoutItemType {
  const loadoutItemTypes: LoadoutItemType[] = [
    'helm',
    'torso',
    'legs',
    'gloves',
    'relic',
    'amulet',
    'mainhand',
    'offhand',
    'melee',
    'archtypes',
    'concoctions',
    'consumables',
    'mods',
    'mutators',
    'relicfragments',
    'rings',
    'skills',
    'traits',
  ]
  return loadoutItemTypes.includes(type as LoadoutItemType)
}

/**
 * Converts LoadoutItemType to ItemType
 */
export function loadoutItemTypeToItemType(
  loadoutItemType: LoadoutItemType,
): ItemType {
  const itemType = loadoutItemType
    .replace('archtypes', 'archtype')
    .replace('concoctions', 'concoction')
    .replace('consumables', 'consumable')
    .replace('mods', 'mod')
    .replace('mutators', 'mutator')
    .replace('relicfragments', 'relicfragment')
    .replace('rings', 'ring')
    .replace('skills', 'skill')
    .replace('traits', 'trait')

  if (!isItemType(itemType)) {
    throw new Error(`Invalid loadout item type: ${loadoutItemType}`)
  }

  return itemType
}

/**
 * Converts ItemType to LoadoutItemType
 */
export function itemTypeToLoadoutItemType(itemType: ItemType): LoadoutItemType {
  const loadoutItemType = itemType
    .replace('archtype', 'archtypes')
    .replace('concoction', 'concoctions')
    .replace('consumable', 'consumables')
    .replace('mod', 'mods')
    .replace('mutator', 'mutators')
    .replace('relicfragment', 'relicfragments')
    .replace('ring', 'rings')
    .replace('skill', 'skills')
    .replace('trait', 'traits')

  if (!isLoadoutItemType(loadoutItemType)) {
    throw new Error(`Invalid item type: ${itemType}`)
  }

  return loadoutItemType
}

/**
 * Filter out the item list for a specific loadout slot
 */
export function getItemListForSlot(
  loadoutSlot: LoadoutItemType | null,
): Item[] {
  if (!loadoutSlot) return []
  // convert loadout slot to item type
  // necessary because of loadout slots like 'archtypes' and 'relicfragments'
  const itemType = loadoutItemTypeToItemType(loadoutSlot)

  // return items that match the loadout slot
  return (remnantItems as Item[]).filter((item) => item.type === itemType)
}
