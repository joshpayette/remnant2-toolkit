import { type CheerioAPI } from 'cheerio';

import { removeTooltips } from '@/app/api/cron/wiki/scraper/utils';

export function skillDataParse($: CheerioAPI): {
  description: string;
  cooldown: number;
} {
  // Remove tooltips
  removeTooltips($, '[data-source="description"]');

  const $descriptionEl = $('.portable-infobox [data-source="description"] div');

  const description = $descriptionEl
    .find('br')
    .replaceWith('\n')
    .end()
    .text()
    .trim()
    .replaceAll('[sic]', '')
    .replaceAll('\t', '');

  // Not every skill has a cooldown
  const $cooldownEl = $('.portable-infobox [data-source="cooldown"] div');
  const cooldown = $cooldownEl.length ? $cooldownEl.text() : '0';

  return {
    description,
    cooldown: parseInt(cooldown, 10),
  };
}
