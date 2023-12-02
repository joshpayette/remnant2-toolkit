import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ItemType, LoadoutItemType } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getArrayOfLength(length: number) {
  return Array.from(Array(length).keys())
}

export function toCsv<T extends {}>(array: T[], filename: string) {
  // const csvContent =
  //   'data:text/csv;charset=utf-8,' + array.map((item) => item[key]).join(',')
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
    'relic fragment',
    'ring',
    'trait',
  ]
  return itemTypes.includes(type as ItemType)
}

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
    'relic fragments',
    'rings',
    'traits',
  ]
  return loadoutItemTypes.includes(type as LoadoutItemType)
}

export function loadoutItemTypeToItemType(
  loadoutItemType: LoadoutItemType,
): ItemType {
  const itemType = loadoutItemType
    .replace('archtypes', 'archtype')
    .replace('concoctions', 'concoction')
    .replace('consumables', 'consumable')
    .replace('mods', 'mod')
    .replace('mutators', 'mutator')
    .replace('relic fragments', 'relic fragment')
    .replace('rings', 'ring')
    .replace('traits', 'trait')

  if (!isItemType(itemType)) {
    throw new Error(`Invalid loadout item type: ${loadoutItemType}`)
  }

  return itemType
}

export function itemTypeToLoadoutItemType(itemType: ItemType): LoadoutItemType {
  const loadoutItemType = itemType
    .replace('archtype', 'archtypes')
    .replace('concoction', 'concoctions')
    .replace('consumable', 'consumables')
    .replace('mod', 'mods')
    .replace('mutator', 'mutators')
    .replace('relic fragment', 'relic fragments')
    .replace('ring', 'rings')
    .replace('trait', 'traits')

  if (!isLoadoutItemType(loadoutItemType)) {
    throw new Error(`Invalid item type: ${itemType}`)
  }

  return loadoutItemType
}
