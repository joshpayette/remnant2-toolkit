'use client'

import Image from 'next/image'

import { Enemy, isEnemy } from '@/app/(data)/enemies/types'
import { Item } from '@/features/items/types'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import {
  MANUAL_ITEM_NAME_BREAKS,
  MANUAL_ITEM_NAME_TEXT_TRANSFORMS,
} from '../constants'

type Props = {
  isToggled?: boolean
  isEditable?: boolean
  isScreenshotMode?: boolean
  item: Item | Enemy | null
  loadingType?: 'lazy' | 'eager'
  manualWordBreaks?: boolean // If true, will use the manual word breaks for item names from MANUAL_ITEM_NAME_BREAKS constant
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'wide'
  tooltipDisabled?: boolean
  unoptimized?: boolean
  onClick?: () => void
  onItemInfoClick?: (item: Item) => void
}

export function ItemButton({
  isEditable = true,
  isScreenshotMode = false,
  isToggled,
  item,
  loadingType = 'eager',
  manualWordBreaks = false,
  size = 'md',
  tooltipDisabled = true,
  unoptimized = false,
  onClick,
  onItemInfoClick,
}: Props) {
  let tooltipDescription = item && !isEnemy(item) ? item.description : null
  // Truncate text at 150 characters
  if (tooltipDescription && tooltipDescription.length > 150) {
    tooltipDescription = `${tooltipDescription.substring(0, 150)}...`
  }

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
    case 'xl':
      imageSize = {
        height: 200,
        width: 200,
      }
      break
    case 'wide':
      imageSize = {
        height: 66,
        width: 149,
      }
      break
  }

  return (
    <div
      className={cn(
        'relative flex items-start justify-center',
        size === 'sm' && 'mb-0 flex-row justify-start',
        size === 'md' && 'mb-2 w-[66px] flex-col',
        size === 'lg' && 'mb-2 w-[99px] flex-col',
        size === 'xl' && 'mb-2 w-[200px] flex-col',
        size === 'wide' && 'mb-2 w-[149px] flex-col',
        isToggled === true && 'grayscale-0',
        isToggled === false && 'grayscale',
      )}
      suppressHydrationWarning
    >
      {!isScreenshotMode && item && onItemInfoClick && (
        <Tooltip
          content={tooltipDescription}
          trigger="mouseenter"
          interactive={false}
          disabled={tooltipDisabled}
        >
          <button
            className={cn(
              'absolute right-0 top-0 z-[5]',
              size === 'sm' && 'right-[-20px]',
            )}
            onClick={() =>
              onItemInfoClick && !isEnemy(item) && onItemInfoClick(item)
            }
            aria-label="Item Information"
          >
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/info-yellow.png`}
              alt="Info icon"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </button>
        </Tooltip>
      )}
      <button
        onClick={onClick}
        className={cn(
          'relative flex items-center justify-center overflow-hidden border-2 border-gray-700',
          `bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-body-bg.jpg')]`,
          isEditable && 'border-gray-700 hover:border-secondary-500',
          size === 'sm' && 'h-[22px] w-[22px]',
          size === 'md' && 'h-[66px] w-[66px]',
          size === 'lg' && 'h-[99px] w-[99px]',
          size === 'xl' && 'h-[200px] w-[200px]',
          size === 'wide' && 'h-[99px] w-[149px]',
          isToggled === true && 'border-primary-500',
          isToggled === false && 'border-gray-700',
        )}
        aria-label="Remnant 2 Item Button"
        suppressHydrationWarning
      >
        {item && (
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
            alt={`${item.name} icon`}
            loading={loadingType}
            width={imageSize.width}
            height={imageSize.height}
            quality={74}
            unoptimized={unoptimized}
          />
        )}
      </button>

      {item?.name && (
        <div
          className={cn(
            'z-[5] flex items-center justify-center bg-secondary-900 px-1 py-0.5 text-center text-[10px] text-gray-100',
            MANUAL_ITEM_NAME_TEXT_TRANSFORMS.some(
              (i) => i.name === item.name,
            ) && 'text-[9px]',
            size === 'sm' &&
              'min-h-[22px] min-w-[22px] border border-black text-left',
            size === 'md' && 'min-h-[49px] w-[66px]',
            size === 'lg' && 'min-h-[40px] w-[99px]',
            size === 'xl' && 'text-md min-h-[40px] w-[200px]',
            size === 'wide' && 'min-h-[22px] w-[149px]',
          )}
        >
          {manualWordBreaks
            ? MANUAL_ITEM_NAME_BREAKS.find((b) => b.name === item.name)
                ?.break || item.name
            : item.name}
        </div>
      )}
    </div>
  )
}
