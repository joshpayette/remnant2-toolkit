import Filter from 'bad-words'

/**
 * @example
 * filter.clean(`Don't be an ash0le`)
 */
const filter = new Filter()
// filter.addWords('some', 'bad', 'words')
// filter.removeWords('some', 'bad', 'words')

export function badWordFilter(text: string) {
  if (!text || typeof text !== 'string' || text === '') return ''
  return filter.clean(text)
}
