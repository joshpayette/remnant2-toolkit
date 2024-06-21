import { CheerioAPI } from 'cheerio'

import { removeTooltips } from '@/app/api/cron/wiki/scraper/utils'

export function modDataParse(
  $: CheerioAPI,
  isLinkedMod: boolean,
): {
  description: string
} {
  removeTooltips($)

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
