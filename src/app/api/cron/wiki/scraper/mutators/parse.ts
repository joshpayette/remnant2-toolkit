import { CheerioAPI } from 'cheerio'

import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'

export function mutatorDataParse(
  $: CheerioAPI,
  item: MutatorItem,
): {
  description: string
  maxLevelBonus: string
} {
  const mutatorsWithTabberPanels = ['Bandit']

  const wholeDescription = mutatorsWithTabberPanels.some(
    (i) => i.toLowerCase() === item.name.toLowerCase(),
  )
    ? $('div.infobox-description article.tabber__panel')
        .find('br')
        .replaceWith('\n')
        .end()
        .text()
        .replaceAll('[sic]', '')
    : $('div.infobox-description')
        .find('br')
        .replaceWith('\n')
        .end()
        .text()
        .replaceAll('[sic]', '')

  // The description is everything before the two line breaks and the text Level 10
  const description = wholeDescription.split('Level 10:')[0].trim()
  // The maxLevelBonus is everything starting with the Level 10 text
  const maxLevelBonus = wholeDescription.split('Level 10:')[1].trim()

  return {
    description,
    maxLevelBonus,
  }
}
