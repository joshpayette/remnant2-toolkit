import { CheerioAPI } from 'cheerio'

// TODO Check a hunter skill

export function skillDataParse($: CheerioAPI): {
  description: string
  cooldown: number
} {
  const $descriptionEl = $('.portable-infobox [data-source="description"] div')

  const description = $descriptionEl
    .find('br')
    .replaceWith('\n')
    .end()
    .text()
    .replaceAll('[sic]', '')
    .replaceAll('\t', '')

  // Not every skill has a cooldown
  const $cooldownEl = $('.portable-infobox [data-source="cooldown"] div')
  const cooldown = $cooldownEl.length ? $cooldownEl.text() : '0'

  return {
    description,
    cooldown: parseInt(cooldown, 10),
  }
}
