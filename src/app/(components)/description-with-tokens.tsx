'use client'

import { ReactNode, useState } from 'react'
import reactStringReplace from 'react-string-replace'
import { v4 as uuidv4 } from 'uuid'

import { ALL_BUILD_TAGS } from '@/app/(components)/builder/build-tags/constants'
import { ItemInfoDialog } from '@/app/(components)/dialogs/item-info-dialog'
import { Tooltip } from '@/app/(components)/tooltip'
import { allItems } from '@/app/(data)/items/all-items'
import { Item } from '@/app/(data)/items/types'
import { EXTERNAL_TOKENS, INLINE_TOKENS } from '@/app/(types)/tokens'
import { cn } from '@/app/(utils)/classnames'
import { stripUnicode } from '@/app/(utils)/strip-unicode'
import { ItemCategory } from '../(types)/builds'

const tooltipSupportedCategories: ItemCategory[] = [
  'amulet', 'concoction', 'consumable', 'ring', 'relic', 'trait'
]

function parseStringForToken({
  description,
  highlightBuildTags,
  highlightItems,
  handleShowItemInfo,
}: {
  description: string
  highlightItems: boolean
  highlightBuildTags: boolean
  handleShowItemInfo: (itemName: string | undefined) => void
}): ReactNode[] {
  // Escape special characters in the tokens
  const escapeRegExp = (string: string) =>
    string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string

  // Start with all description tokens, which are always included
  const allDescriptionTokens: string[] = [
    ...INLINE_TOKENS.map((tag) => tag.token).sort(
      (a, b) => b.length - a.length,
    ), // Sort in descending order of length,
    ...EXTERNAL_TOKENS.map((tag) => tag.token).sort(
      (a, b) => b.length - a.length,
    ), // Sort in descending order of length,
  ]
  const allDescriptionTokensRegex = new RegExp(
    `(${allDescriptionTokens.map((token) => escapeRegExp(token)).join('|')})`,
    'g',
  )

  let replacedText = reactStringReplace(
    description,
    allDescriptionTokensRegex,
    (match, i) => {
      const inlineToken = INLINE_TOKENS.find((tag) => tag.token === match)
      const externalToken = EXTERNAL_TOKENS.find((tag) => tag.token === match)

      const key = uuidv4()

      if (inlineToken) {
        if (inlineToken.description) {
          return (
            <Tooltip key={key} content={inlineToken.description}>
              {/** not changing this to new button */}
              <button
                className={cn('font-semibold', inlineToken.color)}
                aria-label={inlineToken.description}
              >
                {inlineToken.token}
              </button>
            </Tooltip>
          )
        } else {
          return (
            <span key={key} className={cn('font-semibold', inlineToken.color)}>
              {inlineToken.token}
            </span>
          )
        }
      } else if (externalToken) {
        if (externalToken.description) {
          return (
            <Tooltip key={key} content={externalToken.description}>
              {/** not changing this to new button */}
              <button
                className={cn('font-semibold', externalToken.color)}
                aria-label={externalToken.description}
              >
                {externalToken.token}
              </button>
            </Tooltip>
          )
        }
      } else {
        return match
      }
    },
  )

  if (highlightItems) {
    const allItemNames = allItems
      .filter((item) => item.category !== 'relicfragment')
      .map((item) => item.name)
      .sort((a, b) => b.length - a.length) // Sort in descending order of length

    const allItemNamesRegex = new RegExp(
      `(${allItemNames.map((token) => escapeRegExp(token)).join('|')})`,
      'gi',
    )

    replacedText = reactStringReplace(
      replacedText,
      allItemNamesRegex,
      (match, i) => {
        const itemName = allItemNames.find(
          (itemName) => itemName.toLowerCase() === match.toLowerCase(),
        )
        const item = allItems.find((item) => item.name === itemName)
        const itemNameButton = (
          <button
            key={uuidv4()}
            className="p-0 font-bold"
            onClick={() => handleShowItemInfo(itemName)}
          >
            {itemName}
          </button>
        )

        return item && item.description && tooltipSupportedCategories.includes(item.category)
          ? <Tooltip key={uuidv4()} content={item.description}>
              {itemNameButton}
            </Tooltip>
          : itemNameButton
      },
    )
  }

  if (highlightBuildTags) {
    const allBuildTags = ALL_BUILD_TAGS.map((tag) => tag.label).sort(
      (a, b) => b.length - a.length,
    ) // Sort in descending order of length
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

export function DescriptionWithTokens({
  description,
  highlightItems,
  highlightBuildTags,
}: Props) {
  const [item, setItem] = useState<Item | null>(null)
  const isItemInfoOpen = Boolean(item)

  function handleShowItemInfo(itemName: string | undefined) {
    if (!itemName) return
    const item = allItems.find((item) => item.name === itemName)
    if (!item) return
    setItem(item)
  }

  return (
    <>
      <ItemInfoDialog
        item={item}
        open={isItemInfoOpen}
        onClose={() => setItem(null)}
      />
      <span className="sr-only">{stripUnicode(description)}</span>
      <div className="" aria-hidden="true">
        {parseStringForToken({
          description,
          highlightItems,
          highlightBuildTags,
          handleShowItemInfo,
        })}
      </div>
    </>
  )
}
