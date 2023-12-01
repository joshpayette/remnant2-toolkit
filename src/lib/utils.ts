import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ItemType, LoadoutItemType } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
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
    'relicfragment',
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
    'mods',
    'mutators',
    'relicfragments',
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
    .replace('relicfragments', 'relicfragment')
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
    .replace('relicfragment', 'relicfragments')
    .replace('ring', 'rings')
    .replace('trait', 'traits')

  if (!isLoadoutItemType(loadoutItemType)) {
    throw new Error(`Invalid item type: ${itemType}`)
  }

  return loadoutItemType
}

export function getArrayOfLength(length: number) {
  return Array.from(Array(length).keys())
}
