import { cn, getImageUrl, InfoCircleIcon, ZINDEXES } from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/_components/tooltip';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';
import { type ComboItem } from '@/app/(items)/_types/combo-item';

/**
 * Checks all relic fragments in the bonus slots to see if they can
 */

function getComboImagePath(comboItem: ComboItem) {
  const basePath = '/misc/prism-icons';

  const fragmentItem1 = relicFragmentItems.find(
    (f) => f.id === comboItem.fragments[0],
  );
  const fragmentItem2 = relicFragmentItems.find(
    (f) => f.id === comboItem.fragments[1],
  );

  return `${basePath}/${fragmentItem1?.color}-${fragmentItem2?.color}.png`;
}

interface Props {
  /** The combo item to display */
  comboItem: ComboItem;
  /** Whether a button is able to be edited, i.e. can change the item, toggle optional, etc. */
  isEditable?: boolean;
  /** Whether the button is in screenshot mode, i.e. for image export */
  isScreenshotMode?: boolean;
  /** Used primarily to disable lazy loading for image export, as that breaks on Safari */
  loadingType?: 'lazy' | 'eager';
  /** Used primarily to disable image optimization for image export, as that breaks on Safari */
  unoptimized?: boolean;
}

export function ComboButton({
  comboItem,
  isEditable = true,
  isScreenshotMode = false,
  loadingType = 'eager',
  unoptimized = false,
}: Props) {
  const imageDimensions = {
    height: 66,
    width: 66,
  };

  return (
    <div
      className={cn(
        'relative flex items-start justify-center',
        'mb-2 w-[66px] flex-col',
      )}
      suppressHydrationWarning
    >
      {!isScreenshotMode && (
        <Tooltip content={'TODO'} trigger="mouseenter" interactive={false}>
          <button
            className={cn(
              'absolute right-0 top-0 rounded-full border-transparent bg-black',
              ZINDEXES.ITEM_BUTTON,
            )}
            onClick={() => {}} // TODO
            aria-label="Item Information"
          >
            <InfoCircleIcon className={cn('text-accent1-500 h-4 w-4')} />
          </button>
        </Tooltip>
      )}

      <button
        onClick={() => {}} // TODO
        className={cn(
          'border-secondary-900 relative z-0 flex items-center justify-center overflow-hidden border-2',
          `bg-background-solid`,
          // if the button is editable, give it a hover effect
          isEditable && 'border-secondary-900 hover:border-secondary-500',
        )}
        aria-label="Remnant 2 Item Button"
        suppressHydrationWarning
      >
        <Image
          src={`${getImageUrl(getComboImagePath(comboItem))}`}
          alt={``} // TODO
          loading={loadingType}
          width={imageDimensions.width}
          height={imageDimensions.height}
          quality={74}
          unoptimized={unoptimized}
        />
      </button>

      <div
        className={cn(
          'border-secondary-900 bg-secondary-900 flex items-center justify-center border-2 px-1 py-0.5 text-center text-[10px] text-gray-100',
          'min-h-[55px] w-[66px] rounded-b-lg',
        )}
      >
        {comboItem.name}
      </div>
    </div>
  );
}
