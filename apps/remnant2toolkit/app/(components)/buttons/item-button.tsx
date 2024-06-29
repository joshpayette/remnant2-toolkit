'use client'

import { cn } from '@repo/ui/classnames'
import { getImageUrl } from '@repo/ui/utils/get-image-url'
import { ZINDEXES } from '@repo/ui/zindexes'
import Image from 'next/image'
import { IoInformationCircleSharp } from 'react-icons/io5'
import { TbHttpOptions } from 'react-icons/tb'

import { Tooltip } from '@/app/(components)/tooltip'
import { Enemy, isEnemy } from '@/app/(data)/enemies/types'
import { Item } from '@/app/(data)/items/types'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'

/**
 * Some words are too long to fit in the item label on the builder
 * and need to be manually broken up
 */
const MANUAL_ITEM_NAME_BREAKS: Array<{ name: string; break: string }> = [
  { name: 'Hyperconductor', break: 'Hyper-conductor' },
  { name: 'Microcompressor', break: 'Micro-compressor' },
]

/**
 * Some labels are too long to fit the label, but can't be broken up
 * and need to be manually transformed to a smaller text size
 */
const MANUAL_ITEM_NAME_TEXT_TRANSFORMS: Array<{
  name: string
  transform: string
}> = [{ name: "Nightweaver's Grudge", transform: 'text-[9px]' }]

type Props = {
  // Whether the button is in edit mode or not
  // Controls buttons and controls that are shown
  isEditable?: boolean
  // Used to control the look of buttons during image export
  isScreenshotMode?: boolean
  // Used for item tracker and boss tracker to toggle grayscale
  isToggled?: boolean
  item: Item | Enemy | null
  // Used to toggle off lazy loading so that image export doesn't break on Safari
  loadingType?: 'lazy' | 'eager'
  // If true, will use the manual word breaks for item names from MANUAL_ITEM_NAME_BREAKS constant
  manualWordBreaks?: boolean
  // If true, will disable the image info tooltip on the button
  tooltipDisabled?: boolean
  // Used to toggle off image optimization so that image export doesn't break on Safari
  unoptimized?: boolean
  variant?: 'default' | 'large' | 'boss-tracker' | 'relic-fragment' | 'weapon'
  onClick?: () => void
  onItemInfoClick?: (item: Item) => void
  onToggleOptional?: (selectedItem: Item, optional: boolean) => void
}

export function ItemButton({
  item,
  isEditable = true,
  isScreenshotMode = false,
  isToggled,
  loadingType = 'eager',
  manualWordBreaks = false,
  tooltipDisabled = true,
  unoptimized = false,
  variant = 'default',
  onClick,
  onItemInfoClick,
  onToggleOptional,
}: Props) {
  let tooltipDescription = item && !isEnemy(item) ? item.description : null
  // Truncate text at 150 characters
  if (tooltipDescription && tooltipDescription.length > 150) {
    tooltipDescription = `${tooltipDescription.substring(0, 150)}...`
  }

  let imageDimensions = {
    height: 50,
    width: 50,
  }
  switch (variant) {
    case 'default':
      imageDimensions = {
        height: 66,
        width: 66,
      }
      break
    case 'large':
      imageDimensions = {
        height: 99,
        width: 99,
      }
      break
    case 'boss-tracker':
      imageDimensions = {
        height: 200,
        width: 200,
      }
      break
    case 'relic-fragment':
      imageDimensions = {
        height: 22,
        width: 22,
      }
      break
    case 'weapon':
      imageDimensions = {
        height: 66,
        width: 149,
      }
      break
  }

  const showOptionalToggle =
    item &&
    !isEnemy(item) &&
    !isScreenshotMode &&
    isEditable &&
    onToggleOptional &&
    onClick

  const clickShowsInfo =
    !isEditable &&
    item &&
    onItemInfoClick &&
    !isEnemy(item) &&
    isToggled === undefined

  const buttonClickAction = clickShowsInfo
    ? () => onItemInfoClick(item)
    : onClick

  return (
    <div
      className={cn(
        'relative flex items-start justify-center',
        variant === 'default' && 'mb-2 w-[66px] flex-col',
        variant === 'large' && 'mb-2 w-[99px] flex-col',
        variant === 'boss-tracker' && 'mb-2 w-[200px] flex-col',
        variant === 'relic-fragment' && 'mb-0 flex-row justify-start',
        variant === 'weapon' && 'mb-2 w-[149px] flex-col',
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
              'absolute right-0 top-0 rounded-full border-transparent bg-black',
              ZINDEXES.ITEM_BUTTON,
              variant === 'relic-fragment' && 'right-[-20px]',
            )}
            onClick={() =>
              onItemInfoClick && !isEnemy(item) && onItemInfoClick(item)
            }
            aria-label="Item Information"
          >
            <IoInformationCircleSharp
              className={cn(
                'text-accent1-500 h-4 w-4',
                (variant === 'large' || variant === 'boss-tracker') &&
                  'h-5 w-5',
              )}
            />
          </button>
        </Tooltip>
      )}
      {showOptionalToggle && (
        <Tooltip
          content={`Toggle item as optional`}
          trigger="mouseenter"
          interactive={false}
          disabled={tooltipDisabled}
        >
          <button
            className={cn(
              'absolute left-0 top-0 rounded-full border-transparent bg-black',
              ZINDEXES.ITEM_BUTTON,
              variant === 'relic-fragment' && 'left-auto right-[-40px]',
            )}
            onClick={() => onToggleOptional(item, !item.optional)}
            aria-label="Toggle item as optional"
          >
            <TbHttpOptions className="text-accent1-500 h-4 w-4" />
          </button>
        </Tooltip>
      )}
      <button
        onClick={buttonClickAction}
        className={cn(
          'border-secondary-900 relative z-0 flex items-center justify-center overflow-hidden border-2',
          `bg-background-solid`,
          // if the button is editable, give it a hover effect
          isEditable && 'border-secondary-900 hover:border-secondary-500',
          // if no item is present, give the button a rounded bordoer
          !item && variant !== 'relic-fragment' && 'rounded-b-lg',
          !item && variant === 'relic-fragment' && 'rounded-md',
          // if the item is optional, give it a dashed border
          item &&
            !isEnemy(item) &&
            item.optional &&
            'border-secondary-400 border-b-0 border-dashed',
          // if the item is optional and the size is small, remove the right border and add a bottom border
          item &&
            !isEnemy(item) &&
            item.optional &&
            variant === 'relic-fragment' &&
            'border-b-2 border-r-0',
          // If the item is an archetype item, give it a black background
          item &&
            !isEnemy(item) &&
            ArchetypeItem.isArchetypeItem(item) &&
            'bg-black',
          variant === 'default' && 'h-[66px] w-[66px] rounded-t-lg',
          variant === 'large' && 'h-[99px] w-[99px] rounded-t-lg',
          variant === 'boss-tracker' && 'h-[200px] w-[200px] rounded-t-lg',
          variant === 'relic-fragment' && 'h-[23px] w-[22px] rounded-l-md',
          variant === 'weapon' && 'h-[99px] w-[149px] rounded-t-lg',
          // If the item is toggled, give it a primary border
          isToggled === true && 'border-primary-500',
          isToggled === false && 'border-gray-700',
        )}
        aria-label="Remnant 2 Item Button"
        suppressHydrationWarning
      >
        {item && (
          <Image
            src={getImageUrl(item.imagePath ?? '')}
            alt={`${item.name} icon`}
            loading={loadingType}
            width={imageDimensions.width}
            height={imageDimensions.height}
            quality={74}
            unoptimized={unoptimized}
          />
        )}
      </button>

      {item?.name && (
        <div
          className={cn(
            'border-secondary-900 bg-secondary-900 flex items-center justify-center border-2 px-1 py-0.5 text-center text-[10px] text-gray-100',
            MANUAL_ITEM_NAME_TEXT_TRANSFORMS.some(
              (i) => i.name === item.name,
            ) && 'text-[9px]',
            variant === 'default' && 'min-h-[49px] w-[66px] rounded-b-lg',
            variant === 'large' && 'min-h-[40px] w-[99px] rounded-b-lg',
            variant === 'boss-tracker' &&
              'text-md min-h-[40px] w-[200px] rounded-b-lg',
            variant === 'relic-fragment' &&
              'min-h-[22px] min-w-[22px] rounded-r-lg text-left',
            variant === 'weapon' && 'min-h-[22px] w-[149px] rounded-b-lg',
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
