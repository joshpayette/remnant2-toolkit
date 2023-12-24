import Filter from 'bad-words'

/**
 * @example
 * filter.clean(`Don't be an ash0le`)
 */
export const badwordFilter = new Filter()
// filter.addWords('some', 'bad', 'words')
// filter.removeWords('some', 'bad', 'words')

export default badwordFilter
