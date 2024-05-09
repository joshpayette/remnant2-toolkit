import { ArrowUpIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

import { BaseButton } from '@/app/(components)/_base/button'
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
    'flex h-[150px] max-h-[150px] w-[150px] max-w-[150px] md:h-[225px] md:max-h-[225px] md:w-[225px] md:max-w-[225px] flex-col items-center justify-center overflow-hidden border border-secondary bg-secondary-container p-2 text-lg hover:bg-secondary'

  if (!onClick) {
    return (
      <div className={wrapperClasses} key={item.id}>
        <Image
          src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
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
      arrowIcon = <ArrowUpIcon className="h-3 w-3 md:h-4 md:w-4" />
      numberLabel = '1'
      break
    case ARROW_TO_INDEX.ArrowRight:
      arrowIcon = (
        <ArrowUpIcon className="h-3 w-3 rotate-90 transform md:h-4 md:w-4" />
      )
      numberLabel = '3'
      break
    case ARROW_TO_INDEX.ArrowDown:
      arrowIcon = (
        <ArrowUpIcon className="h-3 w-3 rotate-180 transform md:h-4 md:w-4" />
      )
      numberLabel = '4'
      break
    case ARROW_TO_INDEX.ArrowLeft:
      arrowIcon = (
        <ArrowUpIcon className="h-3 w-3 -rotate-90 transform md:h-4 md:w-4" />
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
      plain // TODO: All of these styles need a pass
    >
      <div className="absolute bottom-0 right-0 hidden sm:flex sm:gap-x-0.5">
        <div className="md:text-md flex h-4 w-4 items-center justify-center bg-on-secondary text-xs text-background md:h-6 md:w-6">
          {numberLabel}
        </div>
        <div className="md:text-md flex h-4 w-4 items-center justify-center bg-on-secondary text-xs text-background md:h-6 md:w-6">
          {arrowIcon}
        </div>
      </div>
      <Image
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
        width={200}
        height={200}
        alt={`Item Selection #${itemIndex + 1}`}
      />
    </BaseButton>
  )
}
