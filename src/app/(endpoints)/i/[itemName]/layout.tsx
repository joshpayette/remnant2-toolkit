import { Metadata, ResolvingMetadata } from 'next'

import { allItems } from '@/app/(data)/items/allItems'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'

import ItemPage from './page'

function getItemFromParam(itemName: string) {
  // need to remove all punctuation and spaces from itemName
  // and convert it to lowercase
  const cleanItemName = itemName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()

  const item = allItems.find((item) => {
    // need to remove all punctuation and spaces from item.name
    // and convert it to lowercase
    const cleanCurrentItemName = item.name
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()
    return cleanCurrentItemName === cleanItemName
  })
  return item
}

export async function generateMetadata(
  { params: { itemName } }: { params: { itemName: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const item = getItemFromParam(itemName)

  if (!item) {
    throw new Error(`Item ${itemName} is not found.`)
  }

  const title = `${item.name} (${
    item.category === 'relicfragment' ? 'relic fragment' : item.category
  })`
  let description = `${item.description}\r\n` ?? 'An item for Remnant 2.'

  if (MutatorItem.isMutatorItem(item) || TraitItem.isTraitItem(item)) {
    description += ''
    description += `\r\nAt Max Level: ${item.maxLevelBonus}`
  }
  if (item.cooldown) {
    description += ''
    description += `\r\nCooldown: ${item.cooldown}s`
  }
  if (ArmorItem.isArmorItem(item)) {
    description += ''
    description += `\r\nArmor: ${item.armor}`
    description += `\r\nWeight: ${item.weight}`
    description += `\r\nBleed Resistance: ${item.bleedResistance}`
    description += `\r\nFire Resistance: ${item.fireResistance}`
    description += `\r\nShock Resistance: ${item.shockResistance}`
    description += `\r\nToxin Resistance: ${item.toxinResistance}`
    description += `\r\nBlight Resistance: ${item.blightResistance}`
  }
  if (WeaponItem.isWeaponItem(item)) {
    description += ''
    description += `\r\nDamage: ${item.damage}`
    if (item.rps) {
      description += `\r\nRPS: ${item.rps}`
    }
    if (item.magazine) {
      description += `\r\nMagazine: ${item.magazine}`
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/endpoint/item/${item.name}`,
      images: [
        {
          url: `https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`,
          width: 100,
          height: 100,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary',
      images: [
        {
          url: `https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`,
          width: 100,
          height: 100,
        },
      ],
    },
  }
}

export default async function Layout({
  params: { itemName },
}: {
  params: { itemName: string }
}) {
  const item = getItemFromParam(itemName)

  if (!item) {
    throw new Error(`Item ${itemName} is not found.`)
  }

  return <ItemPage params={{ item }} />
}
