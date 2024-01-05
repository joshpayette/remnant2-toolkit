import { cn } from '@/app/(lib)/utils'
import { Item } from '@/app/(types)'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export default function BuilderButton({
  onClick,
  onItemInfoClick,
  isEditable = true,
  isScreenshotMode = false,
  item,
  size = 'md',
}: {
  onClick?: () => void
  onItemInfoClick?: (item: Item) => void
  isEditable?: boolean
  isScreenshotMode?: boolean
  item: GenericItem | null
  size?: 'sm' | 'md' | 'lg' | 'wide'
}) {
  let imageSize = {
    height: 50,
    width: 50,
  }
  switch (size) {
    case 'sm':
      imageSize = {
        height: 22,
        width: 22,
      }
      break
    case 'md':
      imageSize = {
        height: 66,
        width: 66,
      }
      break
    case 'lg':
      imageSize =
        item?.category === 'trait'
          ? {
              height: 188,
              width: 95,
            }
          : {
              height: 99,
              width: 99,
            }
      break
    case 'wide':
      imageSize = {
        height: 66,
        width: 150,
      }
      break
  }

  return (
    <div
      className={cn(
        'relative flex items-start justify-center',
        size === 'sm' && 'mb-0 flex-row',
        size === 'md' && 'mb-2 flex-col',
        size === 'lg' && 'mb-2 flex-col',
        size === 'wide' && 'mb-2 flex-col',
      )}
    >
      {!isScreenshotMode && item && onItemInfoClick && (
        <button
          className={cn(
            'absolute right-0 top-0 bg-black',
            size === 'sm' && 'right-[-20px]',
          )}
          onClick={() => onItemInfoClick && onItemInfoClick(item)}
        >
          <InformationCircleIcon className="h-5 w-5 text-green-500 sm:h-4 sm:w-4" />
        </button>
      )}
      <button
        onClick={onClick}
        className={cn(
          'flex items-center justify-center border-2 border-gray-700 ',
          `bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')]`,
          isEditable && 'hover:border-purple-500',
          size === 'sm' && 'min-h-[22px] w-[22px]',
          size === 'md' && 'min-h-[66px] w-[66px]',
          size === 'lg' && 'min-h-[99px] w-[99px]',
          size === 'wide' && 'min-h-[99px] w-[150px]',
        )}
      >
        {item && (
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}?width=${imageSize.width}&height=${imageSize.height}`}
            alt={`${item.name} icon`}
            width={imageSize.width}
            height={imageSize.height}
            priority={true}
          />
        )}
      </button>

      {item?.name && (
        <div
          className={cn(
            'flex items-center justify-center bg-purple-950 px-1 py-0.5 text-center text-[10px] text-white',
            size === 'sm' && 'min-h-[22px] min-w-[22px] border border-black',
            size === 'md' && 'min-h-[40px] w-[66px]',
            size === 'lg' && 'min-h-[40px] w-[99px]',
            size === 'wide' && 'min-h-[22px] w-[150px]',
          )}
        >
          {item?.name}
        </div>
      )}
    </div>
  )
}
