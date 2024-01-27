import { ARCHTYPE_COLORS, MODIFIERS } from '../constants'

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
  let highlightedText = text

  colorKeywords.forEach((keyword) => {
    const regex = new RegExp(`(${keyword})`, 'g')
    highlightedText = highlightedText.replace(
      regex,
      `<span class="${colorKeywordMap[keyword]} font-semibold">$1</span>`,
    )
  })

  return highlightedText
}

function highlightModifierTokens(text: string) {
  let highlightedText = text

  MODIFIERS.forEach((modifier) => {
    const escapedToken = modifier.token.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&',
    )
    const regex = new RegExp(`(${escapedToken})`, 'g')
    highlightedText = highlightedText.replace(
      regex,
      `<span class="${modifier.color} font-semibold">$1</span>`,
    )
  })

  return highlightedText
}

interface Props {
  description: string
}

export default function ItemDescription({ description }: Props) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: highlightModifierTokens(highlightKeywords(description)),
      }}
    />
  )
}
