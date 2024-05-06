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
    .replaceAll('[sic]', '')

  // Not every skill has a cooldown
  const hasCooldown = wholeDescription.includes('Cooldown:')

  // Hunter skills have the MARK text after the cooldown
  const hasMark = wholeDescription.includes('MARK:')

  if (!hasCooldown) {
    return {
      description: wholeDescription.trim(),
      cooldown: 0,
    }
  }

  // The description is everything before the two line breaks and the text Cooldown:
  let description = wholeDescription.split('Cooldown:')[0].trim()
  // The cooldown is everything starting with the Cooldown: text
  let cooldown = wholeDescription.split('Cooldown:')[1].trim()

  if (hasMark) {
    // Need to remove the MARK text from the cooldown, then append it to the description
    const mark = cooldown.split('MARK:')[1].trim()
    cooldown = cooldown.split('MARK:')[0].trim()
    description += `\n\nMARK: ${mark}`
  }

  return {
    description,
    cooldown: parseInt(cooldown, 10),
  }
}
