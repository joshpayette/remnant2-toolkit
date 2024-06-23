import { CheerioAPI } from 'cheerio'

import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { removeTooltips } from '@/app/api/cron/wiki/scraper/utils'

const mutatorsWithBowDescriptions = ['Bandit', 'Extender', 'Transpose']

export function mutatorDataParse(
  $: CheerioAPI,
  item: MutatorItem,
): {
  description: string
  maxLevelBonus: string
} {
  removeTooltips($)

  const mutatorHasBowDescription = mutatorsWithBowDescriptions.some(
    (i) => i.toLowerCase() === item.name.toLowerCase(),
  )

  if (!mutatorHasBowDescription) {
    const wholeDescription = $('div.infobox-description')
      .find('br')
      .replaceWith('\n')
      .end()
      .text()
      .replaceAll('[sic]', '')

    // The description is everything before the two line breaks and the text Level 10
    const description = wholeDescription.split('Level 10:')[0]?.trim() || ''
    // The maxLevelBonus is everything starting with the Level 10 text
    const maxLevelBonus = wholeDescription.split('Level 10:')[1]?.trim() || ''

    return {
      description,
      maxLevelBonus,
    }
  }

  const standardWholeDescription = $(
    'div.infobox-description [data-title="Standard"]',
  )
    .find('br')
    .replaceWith('\n')
    .end()
    .text()
    .replaceAll('[sic]', '')

  const bowWholeDescription = $('div.infobox-description [data-title="Bow"]')
    .find('br')
    .replaceWith('\n')
    .end()
    .text()
    .replaceAll('[sic]', '')

  // The description is everything before the two line breaks and the text Level 10
  const standardDescription = standardWholeDescription
    .split('Level 10:')[0]
    ?.trim()
  // The maxLevelBonus is everything starting with the Level 10 text
  const standardMaxLevelBonus = standardWholeDescription
    .split('Level 10:')[1]
    ?.trim()

  const bowDescription = bowWholeDescription.split('Level 10:')[0]?.trim()
  const bowMaxLevelBonus = bowWholeDescription.split('Level 10:')[1]?.trim()

  const description =
    standardDescription === bowDescription
      ? standardDescription
      : `${standardDescription}\n\nBows: ${bowDescription}`

  const maxLevelBonus =
    standardMaxLevelBonus === bowMaxLevelBonus
      ? standardMaxLevelBonus
      : `${standardMaxLevelBonus}\n\nBows: ${bowMaxLevelBonus}`

  return {
    description: description || '',
    maxLevelBonus: maxLevelBonus || '',
  }
}
