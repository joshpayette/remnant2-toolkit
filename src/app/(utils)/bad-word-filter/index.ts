import Filter from 'bad-words'

/**
 * @example
 * filter.clean(`Don't be an ash0le`)
 *
 * @reference default block list https://github.com/web-mech/badwords/blob/master/lib/lang.json
 * @reference base block list with more terms https://github.com/web-mech/badwords-list/blob/master/lib/array.js
 */
const filter = new Filter()
filter.addWords('gay', 'homosexual')
filter.removeWords('fart', 'pawn', 'shit', 'god', 'bum', 'heck', 'bloody')

export function cleanBadWords(text: string) {
  if (!text || typeof text !== 'string' || text === '') return ''
  return filter.clean(text)
}

export function checkBadWords(text: string) {
  if (!text || typeof text !== 'string' || text === '') return false

  // If the string has 3 or more asterisks in a row, it should be considered a bad word
  if (text.includes('***')) return true

  return filter.isProfane(text)
}
