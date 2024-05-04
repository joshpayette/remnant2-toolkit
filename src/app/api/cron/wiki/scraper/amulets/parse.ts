import { CheerioAPI } from 'cheerio'

export function amuletDataParse($: CheerioAPI): {
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
