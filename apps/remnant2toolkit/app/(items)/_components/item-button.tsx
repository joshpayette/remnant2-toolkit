'use client';

import {
  cn,
  getImageUrl,
  InfoCircleIcon,
  OptionalOffIcon,
  OptionalOnIcon,
  OwnershipIcon,
  ZINDEXES,
} from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/_components/tooltip';
import { type Enemy, isEnemy } from '@/app/(enemies)/_types';
import { ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { type Item } from '@/app/(items)/_types/item';
import { SKIPPED_ITEM_TRACKER_CATEGORIES } from '@/app/(items)/item-tracker/_constants/trackable-items';

/**
 * Some words are too long to fit in the item label on the builder
 * and need to be manually broken up
 */
const MANUAL_ITEM_NAME_BREAKS: Array<{ name: string; break: string }> = [
  { name: 'Hyperconductor', break: 'Hyper-conductor' },
  { name: 'Microcompressor', break: 'Micro-compressor' },
];

/**
 * Some labels are too long to fit the label, but can't be broken up
 * and need to be manually transformed to a smaller text size
 */
const MANUAL_ITEM_NAME_TEXT_TRANSFORMS: Array<{
  name: string;
  transform: string;
}> = [{ name: "Nightweaver's Grudge", transform: 'text-[9px]' }];

type Props = {
  /** Whether a button is able to be edited, i.e. can change the item, toggle optional, etc. */
  isEditable?: boolean;
  /** Whether the button is in screenshot mode, i.e. for image export */
  isScreenshotMode?: boolean;
  /** Whether the button is toggled on or off, i.e. for item tracker or boss tracker */
  isToggled?: boolean;
  /** The item to display on the button */
  item: (Item & { isOwned?: boolean }) | Enemy | null;
  /** Used primarily to disable lazy loading for image export, as that breaks on Safari */
  loadingType?: 'lazy' | 'eager';
  /**
   * If true, will add manual word breaks for item names from MANUAL_ITEM_NAME_BREAKS constant.
   * This is because some item names are too long to wrap in the ItemButton label
   */
  manualWordBreaks?: boolean;
  /** If true, will show the item ownership icon on the button */
  showOwnership?: boolean;
  /** If true, will disable the image info tooltip on the button */
  tooltipDisabled?: boolean;
  /** Used primarily to disable image optimization for image export, as that breaks on Safari */
  unoptimized?: boolean;
  /** The variant of the button to display */
  variant?: 'default' | 'large' | 'boss-tracker' | 'weapon';
  /** The function to run when the button is clicked */
  onClick?: () => void;
  /** The function to run when the info icon button is clicked */
  onItemInfoClick?: (item: Item) => void;
  /** The function to run when the optional toggle icon button is clicked */
  onToggleOptional?: (selectedItem: Item, optional: boolean) => void;
};

export function ItemButton({
  isEditable = true,
  isScreenshotMode = false,
  isToggled,
  item,
  loadingType = 'eager',
  manualWordBreaks = false,
  showOwnership = false,
  tooltipDisabled = true,
  unoptimized = false,
  variant = 'default',
  onClick,
  onItemInfoClick,
  onToggleOptional,
}: Props) {
  let tooltipDescription = item && !isEnemy(item) ? item.description : null;
  // Truncate text at 150 characters
  if (tooltipDescription && tooltipDescription.length > 150) {
    tooltipDescription = `${tooltipDescription.substring(0, 150)}...`;
  }

  let imageDimensions = {
    height: 50,
    width: 50,
  };
  switch (variant) {
    case 'default':
      imageDimensions = {
        height: 66,
        width: 66,
      };
      break;
    case 'large':
      imageDimensions = {
        height: 99,
        width: 99,
      };
      break;
    case 'boss-tracker':
      imageDimensions = {
        height: 200,
        width: 200,
      };
      break;
    case 'weapon':
      imageDimensions = {
        height: 66,
        width: 149,
      };
      break;
  }

  /**
   * Item ownership should be shown if:
   * - The item is not an enemy
   * - The button is not in screenshot mode
   * - The button is not editable
   * - The item is owned
   * - The item is not in SKIPPED_ITEM_TRACKER_CATEGORIES
   */
  const showItemOwnership =
    item &&
    !isEnemy(item) &&
    !isScreenshotMode &&
    !isEditable &&
    showOwnership &&
    SKIPPED_ITEM_TRACKER_CATEGORIES.includes(item.category) === false;

  /**
   * Optional toggle should be shown if:
   * - The item is not an enemy
   * - The button is not in screenshot mode
   * - The button is editable
   * - The `onToggleOptional` function is provided
   * - The `onClick` function is provided
   */
  const showOptionalToggle =
    item &&
    !isEnemy(item) &&
    !isScreenshotMode &&
    isEditable &&
    onToggleOptional &&
    onClick;

  /**
   * Clicking should show item info if:
   * - The button is not an enemy
   * - The button is not editable
   * - The `onItemInfoClick` function is provided
   * - The `isToggled` prop is not provided
   */
  const clickShowsInfo =
    item &&
    !isEnemy(item) &&
    !isEditable &&
    onItemInfoClick &&
    isToggled === undefined;

  /**
   * The button click action should be:
   * - If `clickShowsInfo` is true, run the onItemInfoClick function
   * - If `clickShowsInfo` is false, run the onClick function
   */
  const buttonClickAction = clickShowsInfo
    ? () => onItemInfoClick(item)
    : onClick;

  return (
    <div
      className={cn(
        'relative flex items-start justify-center',
        variant === 'default' && 'mb-2 w-[66px] flex-col',
        variant === 'large' && 'mb-2 w-[99px] flex-col',
        variant === 'boss-tracker' && 'mb-2 w-[200px] flex-col',
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
            )}
            onClick={() =>
              onItemInfoClick && !isEnemy(item) && onItemInfoClick(item)
            }
            aria-label="Item Information"
          >
            <InfoCircleIcon
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
            )}
            onClick={() => onToggleOptional(item, !item.optional)}
            aria-label="Toggle item as optional"
          >
            {item.optional ? (
              <OptionalOffIcon className="text-accent1-500 h-4 w-4" />
            ) : (
              <OptionalOnIcon className="text-accent1-500 h-4 w-4" />
            )}
          </button>
        </Tooltip>
      )}

      {showItemOwnership && (
        <Tooltip
          content={
            item.isOwned ? `You own this item` : `You do not own this item`
          }
          trigger="mouseenter"
          interactive={false}
          disabled={tooltipDisabled}
        >
          <button
            className={cn(
              'absolute left-0 top-0 rounded-full border-transparent bg-black',
              ZINDEXES.ITEM_BUTTON,
            )}
            aria-label={item.isOwned ? 'Item Owned' : 'Item Unowned'}
          >
            <OwnershipIcon
              className={cn(
                'h-3 w-3',
                item.isOwned ? 'text-green-500' : 'text-red-500',
              )}
            />
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
          // if the item is optional, give it a dashed border
          item &&
            !isEnemy(item) &&
            item.optional &&
            'border-secondary-400 border-b-0 border-dashed',
          // If the item is an archetype item, give it a black background
          item &&
            !isEnemy(item) &&
            ArchetypeItem.isArchetypeItem(item) &&
            'bg-black',
          variant === 'default' && 'h-[66px] w-[66px] rounded-t-lg',
          variant === 'large' && 'h-[99px] w-[99px] rounded-t-lg',
          variant === 'boss-tracker' && 'h-[200px] w-[200px] rounded-t-lg',
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
            variant === 'default' && 'min-h-[55px] w-[66px] rounded-b-lg',
            variant === 'large' && 'min-h-[40px] w-[99px] rounded-b-lg',
            variant === 'boss-tracker' &&
              'text-md overflow:hidden min-h-[40px] w-[200px] whitespace-normal break-all rounded-b-lg',
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
  );
}
