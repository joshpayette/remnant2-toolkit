import { CheerioAPI } from 'cheerio'

/**
 * This one is a bit more challenging because some perks use the tabber layout and some don't
 * Additionally, the perk description changes are not static, meaning some change at level 1, level 6, and level 10,
 * while others change at level 2 and level 7.
 */
export function perkDataParse($: CheerioAPI): {
  description: string
} {
  const $container = $('[data-item-name="info"]')

  const firstLevelLabel = $container
    .find('.pi-section-navigation [data-ref="0"]')
    .text()
    .replaceAll('\t', '')
    .replaceAll('\n', '')
  const secondLevelLabel = $container
    .find('.pi-section-navigation [data-ref="1"]')
    .text()
    .replaceAll('\t', '')
    .replaceAll('\n', '')
  const thirdLevelLabel = $container
    .find('.pi-section-navigation [data-ref="2"]')
    .text()
    .replaceAll('\t', '')
    .replaceAll('\n', '')

  const firstLevelDescription = $container
    .find('.pi-section-contents [data-ref="0"] div div')
    .text()
    .replaceAll('\t', '')
  const secondLevelDescription = $container
    .find('.pi-section-contents [data-ref="1"] div div')
    .text()
    .replaceAll('\t', '')
  const thirdLevelDescription = $container
    .find('.pi-section-contents [data-ref="2"] div div')
    .text()
    .replaceAll('\t', '')

  const description = `${firstLevelLabel}:\n${firstLevelDescription}\n\n${secondLevelLabel}:\n${secondLevelDescription}\n\n${thirdLevelLabel}:\n${thirdLevelDescription}`

  return {
    description,
  }
}
