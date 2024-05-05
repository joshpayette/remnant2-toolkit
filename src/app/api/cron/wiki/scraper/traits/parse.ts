import { CheerioAPI } from 'cheerio'

export function traitDataParse($: CheerioAPI): {
  description: string
} {
  const wholeDescription = $('div.infobox-description')
    .find('br')
    .replaceWith('\n')
    .end()
    .text()

  // The description is everything before the two line breaks
  const description = wholeDescription.split('\n\n')[0].trim()

  return {
    description,
  }
}
