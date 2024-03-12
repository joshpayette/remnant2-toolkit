import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import { DESCRIPTION_TAGS } from '../constants'
import { DescriptionTag } from '../types'

function createTagElement(
  tag: DescriptionTag,
  index: number,
  partIndex: number,
  token: string,
): JSX.Element {
  const key = `${index}-${partIndex}-${token}`
  if (tag.description) {
    return (
      <Tooltip key={key} content={tag.description}>
        <button
          className={cn('font-semibold', tag.color)}
          aria-label={tag.description}
        >
          {token}
        </button>
      </Tooltip>
    )
  } else {
    return (
      <span key={key} className={cn('font-semibold', tag.color)}>
        {token}
      </span>
    )
  }
}

function parseStringForToken(input: string): (JSX.Element | string)[] | null {
  const escapeRegExp = (string: string) =>
    string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  const regex = new RegExp(
    `(${DESCRIPTION_TAGS.map((tag) => escapeRegExp(tag.token)).join('|')})`,
    'g',
  )

  const wordsAndSpaces = input.split(regex)

  const result = wordsAndSpaces.flatMap((wordOrSpace, index) => {
    if (wordOrSpace.trim() === '') {
      // If it's a space, return it as is
      return wordOrSpace
    } else {
      // If it's a word, check if it's a tag.token
      const tag = DESCRIPTION_TAGS.find(
        (tag) => tag.token === wordOrSpace.trim(),
      )
      if (tag) {
        // If it's a tag.token, return it as a JSX element
        const tagElement = createTagElement(tag, index, 0, tag.token)
        return tagElement
      } else {
        // If it's not a tag.token, return it as is
        return wordOrSpace
      }
    }
  })

  return result.length > 0 ? result : null
}

interface Props {
  description: string
}

export function DescriptionWithTags({ description }: Props) {
  return parseStringForToken(description)
}
