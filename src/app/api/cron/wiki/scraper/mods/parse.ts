import { CheerioAPI } from 'cheerio'

export function modDataParse(
  $: CheerioAPI,
  isLinkedMod: boolean,
): {
  description: string
} {
  // Haste tooltip messes up the description
  $('.infobox').find('.rw-tooltip').replaceWith('HASTE')

  const description = isLinkedMod
    ? $('.infobox div.infobox-attachment-description')
        .find('br')
        .replaceWith('\n')
        .end()
        .text()
        .replaceAll('[sic]', '')
    : $('.infobox div.infobox-description')
        .find('br')
        .replaceWith('\n')
        .end()
        .text()
        .replaceAll('[sic]', '')

  return {
    description,
  }
}
