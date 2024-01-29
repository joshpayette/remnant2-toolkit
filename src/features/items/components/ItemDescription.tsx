import { cn } from '@/lib/classnames'
import { ARCHTYPE_COLORS, MODIFIERS } from '../constants'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import Tooltip from '@/features/ui/Tooltip'

type ColorKeyword =
  | 'BLEEDING'
  | 'BURNING'
  | 'OVERLOADED'
  | 'CORRODED'
  | 'ALCHEMIST'
  | 'ARCHON'
  | 'CHALLENGER'
  | 'ENGINEER'
  | 'EXPLORER'
  | 'GUNSLINGER'
  | 'HANDLER'
  | 'HUNTER'
  | 'MEDIC'
  | 'INVADER'
  | 'SUMMONER'
  | 'RITUALIST'
  | 'SHIELD'
  | 'FRENZIED'
  | 'MARKED'
  | 'BULWARK'

export const colorKeywords: ColorKeyword[] = [
  'BLEEDING',
  'BURNING',
  'OVERLOADED',
  'CORRODED',
  'ALCHEMIST',
  'ARCHON',
  'CHALLENGER',
  'ENGINEER',
  'EXPLORER',
  'GUNSLINGER',
  'HANDLER',
  'HUNTER',
  'MEDIC',
  'INVADER',
  'SUMMONER',
  'RITUALIST',
  'SHIELD',
  'FRENZIED',
  'MARKED',
  'BULWARK',
]

export const colorKeywordMap: Record<ColorKeyword, string> = {
  FRENZIED: ARCHTYPE_COLORS.ALCHEMIST.text,
  MARKED: ARCHTYPE_COLORS.GUNSLINGER.text,
  ALCHEMIST: ARCHTYPE_COLORS.ALCHEMIST.text,
  ARCHON: ARCHTYPE_COLORS.ARCHON.text,
  CHALLENGER: ARCHTYPE_COLORS.CHALLENGER.text,
  ENGINEER: ARCHTYPE_COLORS.ENGINEER.text,
  EXPLORER: ARCHTYPE_COLORS.EXPLORER.text,
  GUNSLINGER: ARCHTYPE_COLORS.GUNSLINGER.text,
  HANDLER: ARCHTYPE_COLORS.HANDLER.text,
  HUNTER: ARCHTYPE_COLORS.HUNTER.text,
  MEDIC: ARCHTYPE_COLORS.MEDIC.text,
  INVADER: ARCHTYPE_COLORS.INVADER.text,
  SUMMONER: ARCHTYPE_COLORS.SUMMONER.text,
  RITUALIST: ARCHTYPE_COLORS.RITUALIST.text,
  BLEEDING: 'text-[#a63838]',
  BURNING: 'text-[#b65d30]',
  OVERLOADED: 'text-[#7676af]',
  CORRODED: 'text-[#30b65d]',
  SHIELD: 'text-[#f1f1cf]',
  BULWARK: ARCHTYPE_COLORS.CHALLENGER.text,
}

function highlightKeywords(text: string) {
  const parts = text.split(new RegExp(`(${colorKeywords.join('|')})`, 'g')) // split text into parts by keyword

  const highlightedParts = parts.map((part, index) => {
    const color = colorKeywordMap[part as ColorKeyword] // find the color for this part

    if (color) {
      // if this part is a keyword, replace it with a span
      return (
        <span key={index} className={`${color} font-semibold`}>
          {part}
        </span>
      )
    } else {
      // if this part is not a keyword, return it as is
      return part
    }
  })

  return highlightedParts // return array of parts
}

function highlightModifierTokens(parts: (string | JSX.Element)[]) {
  return parts.flatMap((part, index) => {
    if (typeof part === 'string') {
      const tokenParts = part.split(/(\[[^\]]+\])/) // split part into token parts

      return tokenParts.map((tokenPart, tokenIndex) => {
        const modifier = MODIFIERS.find(({ token }) => token === tokenPart) // find the modifier for this token part

        if (modifier) {
          // if this token part is a token, replace it with a Tippy component
          return (
            <Tooltip
              content={modifier.description}
              key={`${index}-${tokenIndex}`}
            >
              <button className={cn('font-semibold', modifier.color)}>
                {tokenPart}
              </button>
            </Tooltip>
          )
        } else {
          // if this token part is not a token, return it as is
          return tokenPart
        }
      })
    } else {
      // if part is not a string, return it as is
      return part
    }
  })
}

interface Props {
  description: string
}

export default function ItemDescription({ description }: Props) {
  const keywordParts = highlightKeywords(description)
  const finalParts = highlightModifierTokens(keywordParts)

  return finalParts
}
