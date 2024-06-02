import { CheerioAPI } from 'cheerio'

import { removeTooltips } from '@/app/api/cron/wiki/scraper/utils'

export function consumableDataParse($: CheerioAPI): {
  description: string
} {
  removeTooltips($)

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
