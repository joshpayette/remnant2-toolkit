import { CheerioAPI } from 'cheerio'

import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'

export function weaponDataParse(
  $: CheerioAPI,
  item: WeaponItem,
): {
  description: string
  damage: number
  rps: number
  magazine: number
  accuracy: number
  ideal: number
  falloff: number
  ammo: number
  crit: number
  weakspot: number
  stagger: number
} {
  const description = $('div.infobox-description')
    .find('br')
    .replaceWith('\n')
    .end()
    .text()

  // Main stats
  const mainstatsContainer = $('ul.infobox-mainstats')
  // The first li is the damage
  // the second li is the rps
  // the third li is the magazine
  const damage = parseInt(
    mainstatsContainer.find('li').eq(0).find('span').eq(1).text(),
  )
  const rps = parseFloat(
    mainstatsContainer.find('li').eq(1).find('span').eq(1).text(),
  )
  const magazine = parseInt(
    mainstatsContainer.find('li').eq(2).find('span').eq(1).text(),
  )

  // Substats
  const substatsContainer = $('ul.infobox-substats')
  // The accuracy bar, only on non-melee weapons
  let accuracy = 0
  if (item.type !== 'melee') {
    // extracts the style value from the accuracy bar
    // ex: width:15%;--bg:#c9c9c9;--lines:#dadada
    // need to get the number from the width
    const styleValue = substatsContainer
      .find('li')
      .eq(0)
      .find('span.infobox-substats-accuracy')
      .attr('style')
    accuracy = parseInt(styleValue?.split(':')[1].split('%')[0] ?? '0')
  }

  let ideal = 0
  let falloff = 0
  let ammo = 0
  let crit = 0
  let weakspot = 0
  let stagger = 0

  // The rest of the li tags are the other stats
  substatsContainer.find('li').each((_, el) => {
    const stat = $(el).find('span').eq(0).text()
    const value = $(el).find('span').eq(1).text()
    switch (stat) {
      case 'Ideal Range':
        ideal = parseInt(value)
        break
      case 'Falloff Range':
        falloff = parseInt(value)
        break
      case 'Max Ammo':
        ammo = parseInt(value)
        break
      case 'Critical Hit Chance':
        crit = parseInt(value)
        break
      case 'Weak Spot Damage Bonus':
        weakspot = parseInt(value)
        break
      case 'Stagger Modifier':
        stagger = parseInt(value)
        break
      default:
        // No need to return anything here
        break
    }
  })

  return {
    description,
    damage,
    rps,
    magazine,
    accuracy,
    ideal,
    falloff,
    ammo,
    crit,
    weakspot,
    stagger,
  }
}
