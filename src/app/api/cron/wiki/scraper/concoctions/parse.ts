import { CheerioAPI } from 'cheerio'

export function concoctionDataParse($: CheerioAPI): {
  description: string
} {
  const description = $('div.infobox-description')
    .find('br')
    .replaceWith('\n')
    .end()
    .text()
    .replaceAll('[sic]', '')

  return {
    description,
  }
}
