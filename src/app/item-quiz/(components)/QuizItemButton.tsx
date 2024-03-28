import { ArrowUpIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

import { ARROW_TO_INDEX } from '@/app/item-quiz/constants'
import { QuizItem } from '@/app/item-quiz/types'
import { cn } from '@/lib/classnames'

interface Props {
  item: QuizItem
  itemIndex: number
  onClick?: () => void
}

export function QuizItemButton({ item, itemIndex, onClick }: Props) {
  const wrapperClasses =
    'flex h-[150px] max-h-[150px] w-[150px] max-w-[150px] flex-col items-center justify-center overflow-hidden border border-secondary-500 bg-secondary-900 p-2 text-lg hover:bg-secondary-700'

  if (!onClick) {
    return (
      <div className={wrapperClasses} key={uuidv4()}>
        <Image
          src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
          width={150}
          height={150}
          alt={`Image of the correct item, ${item.name}`}
          loading="eager"
        />
      </div>
    )
  }

  let arrowIcon = null
  let numberLabel = ''
  const arrowIndex = itemIndex + 1

  switch (arrowIndex) {
    case ARROW_TO_INDEX.ArrowUp:
      arrowIcon = <ArrowUpIcon className="h-3 w-3 text-black" />
      numberLabel = '1'
      break
    case ARROW_TO_INDEX.ArrowRight:
      arrowIcon = (
        <ArrowUpIcon className="h-3 w-3 rotate-90 transform text-black" />
      )
      numberLabel = '3'
      break
    case ARROW_TO_INDEX.ArrowDown:
      arrowIcon = (
        <ArrowUpIcon className="h-3 w-3 rotate-180 transform text-black" />
      )
      numberLabel = '4'
      break
    case ARROW_TO_INDEX.ArrowLeft:
      arrowIcon = (
        <ArrowUpIcon className="h-3 w-3 -rotate-90 transform text-black" />
      )
      numberLabel = '2'
      break
    default:
      break
  }

  return (
    <button
      className={cn(wrapperClasses, 'sm:relative')}
      onClick={onClick}
      key={uuidv4()}
    >
      <div className="absolute bottom-0 right-0 hidden sm:flex sm:gap-x-0.5">
        <div className="flex h-4 w-4 items-center justify-center bg-secondary-200 text-xs text-black">
          {numberLabel}
        </div>
        <div className="flex h-4 w-4 items-center justify-center bg-secondary-200 text-xs text-black">
          {arrowIcon}
        </div>
      </div>
      <Image
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
        width={150}
        height={150}
        alt={`Item Selection #${itemIndex + 1}`}
      />
    </button>
  )
}
