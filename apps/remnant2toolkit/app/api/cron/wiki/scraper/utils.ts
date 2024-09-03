import { type CheerioAPI } from 'cheerio';

/**
 * The wiki has tooltips for key words like BULWARK and HASTE.
 * The issue is that these tooltips get parsed into the description.
 * This function removes these tooltips from the description before it is parsed.
 */
export function removeTooltips($: CheerioAPI, containerClass = '.infobox') {
  // Bulwark, Haste, etc. tooltips messes up the description
  const $tooltips = $(containerClass).find('.rw-tooltip');
  for (const $tooltip of $tooltips.toArray()) {
    const $tooltipText = $($tooltip).find('.rw-tooltip__hoverable').text();
    // Remove and replace the tooltip with the text
    $($tooltip).replaceWith($tooltipText);
  }
}
