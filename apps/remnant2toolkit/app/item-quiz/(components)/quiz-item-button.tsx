import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { BaseButton } from '@repo/ui/base/button'
import { cn } from '@repo/ui/classnames'
import { getImageUrl } from '@repo/ui/utils/get-image-url'
import Image from 'next/image'

import { ARROW_TO_INDEX } from '@/app/item-quiz/constants'
import { QuizItem } from '@/app/item-quiz/types'

interface Props {
  item: QuizItem
  itemIndex: number
  onClick?: () => void
}

export function QuizItemButton({ item, itemIndex, onClick }: Props) {
  const wrapperClasses =
    'flex h-[150px] max-h-[150px] w-[150px] max-w-[150px] md:h-[225px] md:max-h-[225px] md:w-[225px] md:max-w-[225px] flex-col items-center justify-center overflow-hidden border border-secondary-500 bg-secondary-900 p-2 text-lg hover:bg-secondary-700'

  if (!onClick) {
    return (
      <div className={wrapperClasses} key={item.id}>
        <Image
          src={getImageUrl(item.imagePath)}
          width={200}
          height={200}
          alt={`Image of the correct item, ${item.name}`}
        />
      </div>
    )
  }

  let arrowIcon = null
  let numberLabel = ''
  const arrowIndex = itemIndex + 1

  switch (arrowIndex) {
    case ARROW_TO_INDEX.ArrowUp:
      arrowIcon = (
        <ArrowUpIcon className="text-background-solid h-3 w-3 md:h-4 md:w-4" />
      )
      numberLabel = '1'
      break
    case ARROW_TO_INDEX.ArrowRight:
      arrowIcon = (
        <ArrowUpIcon className="text-background-solid h-3 w-3 rotate-90 transform md:h-4 md:w-4" />
      )
      numberLabel = '3'
      break
    case ARROW_TO_INDEX.ArrowDown:
      arrowIcon = (
        <ArrowUpIcon className="text-background-solid h-3 w-3 rotate-180 transform md:h-4 md:w-4" />
      )
      numberLabel = '4'
      break
    case ARROW_TO_INDEX.ArrowLeft:
      arrowIcon = (
        <ArrowUpIcon className="text-background-solid h-3 w-3 -rotate-90 transform md:h-4 md:w-4" />
      )
      numberLabel = '2'
      break
    default:
      break
  }

  return (
    <BaseButton
      className={cn(wrapperClasses, 'sm:relative')}
      onClick={onClick}
      key={item.id}
      plain
    >
      <div className="absolute bottom-0 right-0 hidden sm:flex sm:gap-x-0.5">
        <div className="md:text-md bg-secondary-200 text-background-solid flex h-4 w-4 items-center justify-center text-xs md:h-6 md:w-6">
          {numberLabel}
        </div>
        <div className="md:text-md bg-secondary-200 text-background-solid flex h-4 w-4 items-center justify-center text-xs md:h-6 md:w-6">
          {arrowIcon}
        </div>
      </div>
      <Image
        src={getImageUrl(item.imagePath)}
        width={200}
        height={200}
        alt={`Item Selection #${itemIndex + 1}`}
      />
    </BaseButton>
  )
}
