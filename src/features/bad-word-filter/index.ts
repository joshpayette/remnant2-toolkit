import Filter from 'bad-words'

/**
 * @example
 * filter.clean(`Don't be an ash0le`)
 *
 * @reference default block list https://github.com/web-mech/badwords/blob/master/lib/lang.json
 */
const filter = new Filter()
// filter.addWords('some', 'bad', 'words')
filter.removeWords('fart')

export function badWordsFilter(text: string) {
  if (!text || typeof text !== 'string' || text === '') return ''
  return filter.clean(text)
}

export default badWordsFilter
