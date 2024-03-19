import { ALL_BUILD_TAGS } from '@/features/build/build-tags/constants'
import { stripUnicode } from '@/features/build/lib/stripUnicode'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import { DESCRIPTION_TAGS } from '../constants'
import { allItems } from '../data/allItems'
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

  const allTokens = [
    ...DESCRIPTION_TAGS.map((tag) => tag.token),
    ...allItems.map((item) => item.name.toLowerCase()),
    ...ALL_BUILD_TAGS.map((tag) => tag.label),
  ]

  const regex = new RegExp(
    `(${allTokens.map((token) => escapeRegExp(token)).join('|')})`,
    'gi',
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

      // check if it's an item
      const item = allItems.find(
        (item) => item.name.toLowerCase() === wordOrSpace.trim().toLowerCase(),
      )

      const buildTag = ALL_BUILD_TAGS.find(
        (tag) => tag.label === wordOrSpace.trim(),
      )

      if (tag) {
        // If it's a tag.token, return it as a JSX element
        const tagElement = createTagElement(tag, index, 0, tag.token)
        return tagElement
      } else if (item) {
        return (
          <span key={index} className="font-bold">
            {item.name}
          </span>
        )
      } else if (buildTag) {
        return (
          <span
            key={index}
            className={cn('font-semibold', buildTag.colors.text)}
          >
            {buildTag.label}
          </span>
        )
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
  return (
    <>
      <span className="sr-only">{stripUnicode(description)}</span>
      <div className="" aria-hidden="true">
        {parseStringForToken(description)}
      </div>
    </>
  )
}
