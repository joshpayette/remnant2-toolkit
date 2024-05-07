import { CheerioAPI } from 'cheerio'

/**
 * This one is a bit more challenging because some perks use the tabber layout and some don't
 * Additionally, the perk description changes are not static, meaning some change at level 1, level 6, and level 10,
 * while others change at level 2 and level 7.
 */
export function perkDataParse($: CheerioAPI): {
  description: string
} {
  const $mutatorUsesTabber = $('div.infobox-description article.tabber__panel')

  let description = ''
  if ($mutatorUsesTabber.length > 0) {
    // Loop through each article.tabber__panel, grab the data-title value and the text
    description = $mutatorUsesTabber
      .map((_, el) => {
        const title = $(el).attr('data-title')
        const text = $(el).find('br').replaceWith('\n').end().text().trim()

        return `${title}:\n${text}\n`
      })
      .get()
      .join('\n')
      .trim()
      .replaceAll('[sic]', '')
  } else {
    description = $('div.infobox-description')
      .find('br')
      .replaceWith('\n')
      .end()
      .text()
      .trim()
      .replaceAll('[sic]', '')
  }

  return {
    description,
  }
}
