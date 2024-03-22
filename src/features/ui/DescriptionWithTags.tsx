import { ReactNode } from 'react'
import reactStringReplace from 'react-string-replace'
import { v4 as uuidv4 } from 'uuid'

import { ALL_BUILD_TAGS } from '@/features/build/build-tags/constants'
import { stripUnicode } from '@/features/build/lib/stripUnicode'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import { DESCRIPTION_TAGS } from '../items/constants'
import { allItems } from '../items/data/allItems'

function parseStringForToken(
  input: string,
  highlightItems: boolean,
  highlightBuildTags: boolean,
): ReactNode[] {
  // Escape special characters in the tokens
  const escapeRegExp = (string: string) =>
    string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string

  // Start with all Description Tags, which are always included
  const allDescriptionTokens: string[] = [
    ...DESCRIPTION_TAGS.map((tag) => tag.token),
  ]
  const allDesriptionTokensRegex = new RegExp(
    `(${allDescriptionTokens.map((token) => escapeRegExp(token)).join('|')})`,
    'gi',
  )

  let replacedText = reactStringReplace(
    input,
    allDesriptionTokensRegex,
    (match, i) => {
      const tag = DESCRIPTION_TAGS.find((tag) => tag.token === match)
      if (!tag) return match
      const key = uuidv4()
      if (tag.description) {
        return (
          <Tooltip key={key} content={tag.description}>
            <button
              className={cn('font-semibold', tag.color)}
              aria-label={tag.description}
            >
              {tag.token}
            </button>
          </Tooltip>
        )
      } else {
        return (
          <span key={key} className={cn('font-semibold', tag.color)}>
            {tag.token}
          </span>
        )
      }
    },
  )

  if (highlightItems) {
    const allItemNames = allItems
      .filter((item) => item.category === 'relicfragment')
      .map((item) => item.name.toLowerCase())
    const allItemNamesRegex = new RegExp(
      `(${allItemNames.map((token) => escapeRegExp(token)).join('|')})`,
      'gi',
    )

    replacedText = reactStringReplace(
      replacedText,
      allItemNamesRegex,
      (match, i) => {
        return (
          <span key={uuidv4()} className="font-bold">
            {match}
          </span>
        )
      },
    )
  }

  if (highlightBuildTags) {
    const allBuildTags = ALL_BUILD_TAGS.map((tag) => tag.label)
    const allBuildTagsRegex = new RegExp(
      `(${allBuildTags.map((token) => escapeRegExp(token)).join('|')})`,
      'gi',
    )

    replacedText = reactStringReplace(
      replacedText,
      allBuildTagsRegex,
      (match, i) => {
        const tag = ALL_BUILD_TAGS.find((tag) => tag.label === match)
        if (!tag) return match
        return (
          <span key={uuidv4()} className={cn('font-semibold', tag.colors.text)}>
            {match}
          </span>
        )
      },
    )
  }

  return replacedText
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
