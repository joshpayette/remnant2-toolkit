import { type CheerioAPI } from 'cheerio';

import { removeTooltips } from '@/app/api/cron/wiki/scraper/utils';

/**
 * This one is a bit more challenging because some perks use the tabber layout and some don't
 * Additionally, the perk description changes are not static, meaning some change at level 1, level 6, and level 10,
 * while others change at level 2 and level 7.
 */
export function perkDataParse($: CheerioAPI): {
  description: string;
} {
  removeTooltips($, '[data-item-name="info"]');

  const $container = $('[data-item-name="info"]');

  const firstLevelLabel = $container
    .find('.pi-section-navigation [data-ref="0"]')
    .text()
    .replaceAll('\t', '')
    .replaceAll('\n', '');
  const secondLevelLabel = $container
    .find('.pi-section-navigation [data-ref="1"]')
    .text()
    .replaceAll('\t', '')
    .replaceAll('\n', '');
  const thirdLevelLabel = $container
    .find('.pi-section-navigation [data-ref="2"]')
    .text()
    .replaceAll('\t', '')
    .replaceAll('\n', '');

  const firstLevelDescription = $container
    .find('.pi-section-contents [data-ref="0"] div:eq(0) .pi-data-value')
    .first()
    .text()
    .trim()
    .replaceAll('\t', '');
  const secondLevelDescription = $container
    .find('.pi-section-contents [data-ref="1"] div:eq(0) .pi-data-value')
    .first()
    .text()
    .trim()
    .replaceAll('\t', '');
  const thirdLevelDescription = $container
    .find('.pi-section-contents [data-ref="2"] div:eq(0) .pi-data-value')
    .first()
    .text()
    .trim()
    .replaceAll('\t', '');

  // First try to find the cooldowns within the tabber panels
  let firstCooldown = $container
    .find('.pi-section-contents [data-ref="0"] div:eq(2) .pi-data-value')
    .text();
  let secondCooldown = $container
    .find('.pi-section-contents [data-ref="1"] div:eq(2) .pi-data-value')
    .text();
  let thirdCooldown = $container
    .find('.pi-section-contents [data-ref="2"] div:eq(2) .pi-data-value')
    .text();

  // If cooldowns are not found, check if it is in another section
  // If it's in another section, it means the cooldown is the same at all levels
  if (!firstCooldown) {
    firstCooldown = $(
      '.portable-infobox [data-source="cooldown"] .pi-data-value',
    ).text();
    secondCooldown = firstCooldown;
    thirdCooldown = firstCooldown;
  }

  let description = '';

  if (firstLevelLabel) {
    description += `${firstLevelLabel}:\n${firstLevelDescription}\n\n`;
    if (firstCooldown) {
      description += `Cooldown: ${firstCooldown}\n\n`;
    }
  }
  if (secondLevelLabel) {
    description += `${secondLevelLabel}:\n${secondLevelDescription}\n\n`;
    if (secondCooldown) {
      description += `Cooldown: ${secondCooldown}\n\n`;
    }
  }
  if (thirdLevelLabel) {
    description += `${thirdLevelLabel}:\n${thirdLevelDescription}\n\n`;
    if (thirdCooldown) {
      description += `Cooldown: ${thirdCooldown}\n\n`;
    }
  }

  // trim final \n
  description = description.trim();

  return {
    description,
  };
}
