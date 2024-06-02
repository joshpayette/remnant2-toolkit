import { CheerioAPI } from 'cheerio'

export function modDataParse(
  $: CheerioAPI,
  isLinkedMod: boolean,
): {
  description: string
} {
  // Sporebloom workaround
  if (isLinkedMod) {
    $('.infobox div.infobox-attachment-description')
      .find('.rw-tooltip')
      .remove()
  }

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
