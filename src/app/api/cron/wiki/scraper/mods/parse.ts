import { CheerioAPI } from 'cheerio'

export function modDataParse($: CheerioAPI): {
  description: string
} {
  const description = $('div.infobox-description')
    .find('br')
    .replaceWith('\n')
    .end()
    .text()

  return {
    description,
  }
}
