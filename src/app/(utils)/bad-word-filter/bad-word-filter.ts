import { badWords } from './bad-words'

interface FilterOptions {
  badWordList: string[]
  placeHolder: string
  regex: RegExp
  replaceRegex: RegExp
  splitRegex: RegExp
}

export class BadWordFilter {
  /** all the bad words to check against */
  private badWordList: FilterOptions['badWordList']
  /** placeholder symbol to replace bad words with */
  private placeHolder: FilterOptions['placeHolder']
  /**
   * Finds and matches any character in a string that is not:
   *  - a letter
   *  - a digit
   *  - a dollar sign
   *  - an at symbol
   *  - a pipe
   *  - a caret
   */
  private regex: FilterOptions['regex']
  /** Splits a string into words */
  private splitRegex: FilterOptions['splitRegex']
  private replaceRegex: FilterOptions['replaceRegex']

  constructor(options: Partial<FilterOptions>) {
    this.badWordList = badWords
    this.placeHolder = options.placeHolder || '*'
    this.regex = options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g
    this.splitRegex = options.splitRegex || /\b/
    this.replaceRegex = options.replaceRegex || /\w/g
  }

  /**
   * Determine if a string contains profane language.
   */
  isProfane(text: string): { isProfane: boolean; badWords: string[] } {
    if (!text) return { isProfane: false, badWords: [] }
    if (text === '') return { isProfane: false, badWords: [] }
    if (typeof text !== 'string') return { isProfane: false, badWords: [] }

    const badWords = this.badWordList.filter((word) => {
      let sanitizedWord
      let wordExp
      if (word.includes('*')) {
        // Escape all non-word characters, then replace * with .* to treat it as a wildcard
        sanitizedWord = word.replace(/(\W)/g, '\\$1').replace(/\\\*/g, '.*')
        wordExp = new RegExp(`${sanitizedWord}`, 'gi')
      } else {
        // Add word boundaries to the start and end of the regular expression
        sanitizedWord = word.replace(/(\W)/g, '\\$1')
        wordExp = new RegExp(`\\b${sanitizedWord}\\b`, 'gi')
      }
      return wordExp.test(text)
    })
    return {
      isProfane: badWords.length > 0,
      badWords: badWords.map((word) => word.replaceAll('*', '')),
    }
  }

  /**
   * Replace a word with placeHolder characters;
   */
  replaceWord(text: string) {
    return text
      .replace(this.regex, '')
      .replace(this.replaceRegex, this.placeHolder)
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   */
  /**
   * Evaluate a string for profanity and return an edited version.
   */
  clean(text: string) {
    if (!text) return ''
    if (text === '') ''
    if (typeof text !== 'string') return ''

    const splitResult = this.splitRegex.exec(text)
    const splitDelimiter = splitResult ? splitResult[0] : ''
    return text
      .split(this.splitRegex)
      .map((word) => {
        return this.isProfane(word).isProfane ? this.replaceWord(word) : word
      })
      .join(splitDelimiter)
  }
}
