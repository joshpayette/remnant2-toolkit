import { cn } from '@/lib/classnames'
import { DESCRIPTION_TAGS } from '../constants'
import Tooltip from '@/features/ui/Tooltip'
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
        <button className={cn('font-semibold', tag.color)}>{token}</button>
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
  const wordsAndSpaces = input.split(/(\s+)/)

  const result = wordsAndSpaces.flatMap((wordOrSpace, index) => {
    if (wordOrSpace.trim() === '') {
      // If it's a space, return it as is
      return wordOrSpace
    } else {
      // If it's a word, check if it contains a tag.token
      const tag = DESCRIPTION_TAGS.find((tag) =>
        wordOrSpace.includes(tag.token),
      )
      if (tag) {
        const parts = wordOrSpace.split(tag.token)
        return parts.flatMap((part, partIndex, array) => {
          if (partIndex < array.length - 1) {
            // If it's not the last part, append the token as a JSX element
            const tagElement = createTagElement(
              tag,
              index,
              partIndex,
              tag.token,
            )
            return [part, tagElement]
          } else {
            // If it's the last part, return it as is
            return part
          }
        })
      } else {
        // If it doesn't contain a tag.token, return it as is
        return wordOrSpace
      }
    }
  })

  return result.length > 0 ? result : null
}

interface Props {
  description: string
}

export default function DescriptionWithTags({ description }: Props) {
  return parseStringForToken(description)
}
