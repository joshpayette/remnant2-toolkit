import { ALL_BUILD_TAGS } from '@/features/build/build-tags/constants'
import { stripUnicode } from '@/features/build/lib/stripUnicode'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import { DESCRIPTION_TAGS } from '../items/constants'
import { allItems } from '../items/data/allItems'
import { DescriptionTag } from '../items/types'

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

function parseStringForToken(
  input: string,
  highlightItems: boolean,
  highlightBuildTags: boolean,
): (JSX.Element | string)[] | null {
  const escapeRegExp = (string: string) =>
    string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string

  let allTokens: string[] = [...DESCRIPTION_TAGS.map((tag) => tag.token)]

  if (highlightItems) {
    allTokens = [
      ...allTokens,
      ...allItems
        .filter((i) => i.category !== 'relicfragment')
        .map((item) => item.name.toLowerCase()),
    ]
  }

  if (highlightBuildTags) {
    allTokens = [...allTokens, ...ALL_BUILD_TAGS.map((tag) => tag.label)]
  }

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
  highlightItems: boolean
  highlightBuildTags: boolean
}

export function DescriptionWithTags({
  description,
  highlightItems,
  highlightBuildTags,
}: Props) {
  return (
    <>
      <span className="sr-only">{stripUnicode(description)}</span>
      <div className="" aria-hidden="true">
        {parseStringForToken(description, highlightItems, highlightBuildTags)}
      </div>
    </>
  )
}
