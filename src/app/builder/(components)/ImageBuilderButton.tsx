import { cn } from '@/lib/utils'
import { type Item } from '@/types'
import Image from 'next/image'

export default function ImageBuilderButton({
  onClick,
  item,
  showLabels,
  size = 'md',
}: {
  onClick: () => void
  item: Item | null
  showLabels: boolean
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
      imageSize = {
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
        'flex items-start justify-center',
        size === 'sm' && 'mb-0 flex-row',
        size === 'md' && 'mb-2 flex-col',
        size === 'lg' && 'mb-2 flex-col',
        size === 'wide' && 'mb-2 flex-col',
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          'flex items-center justify-center border-2 border-gray-700 hover:border-purple-500',
          `bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')]`,
          size === 'sm' && 'min-h-[22px] w-[22px]',
          size === 'md' && 'min-h-[66px] w-[66px]',
          size === 'lg' && 'min-h-[99px] w-[99px]',
          size === 'wide' && 'min-h-[99px] w-[150px]',
        )}
      >
        {item && (
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
            alt={`${item.name} icon`}
            width={imageSize.width}
            height={imageSize.height}
          />
        )}
      </button>

      {showLabels && (
        <div
          className={cn(
            'flex items-center justify-center text-center text-[10px] text-white',
            item?.name && 'bg-purple-950',
            size === 'sm' &&
              'min-h-[22px] min-w-[22px] border border-black px-1',
            size === 'md' && 'min-h-[40px] w-[66px] p-1',
            size === 'lg' && 'min-h-[40px] w-[99px] p-1',
            size === 'wide' && 'min-h-[22px] w-[150px] p-1',
          )}
        >
          {item?.name}
        </div>
      )}
    </div>
  )
}
