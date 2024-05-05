import { CheerioAPI } from 'cheerio'

export function skillDataParse($: CheerioAPI): {
  description: string
  cooldown: number
} {
  const wholeDescription = $('div.infobox-description')
    .find('br')
    .replaceWith('\n')
    .end()
    .text()

  // Not every skill has a cooldown
  const hasCooldown = wholeDescription.includes('Cooldown:')

  if (!hasCooldown) {
    return {
      description: wholeDescription.trim(),
      cooldown: 0,
    }
  }

  // The description is everything before the two line breaks and the text Cooldown:
  const description = wholeDescription.split('Cooldown:')[0].trim()
  // The cooldown is everything starting with the Cooldown: text
  const cooldown = wholeDescription.split('Cooldown:')[1].trim()

  return {
    description,
    cooldown: parseInt(cooldown, 10),
  }
}
