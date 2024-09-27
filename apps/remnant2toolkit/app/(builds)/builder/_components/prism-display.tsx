'use client';

import { BaseFieldset, BaseLabel, cn } from '@repo/ui';
import { getArrayOfLength } from '@repo/utils';
import { useState } from 'react';

import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { FragmentOrFusionDialog } from '@/app/(builds)/builder/_components/fragment-or-fusion-dialog';
import { ItemButton } from '@/app/(items)/_components/item-button';
import { type Item } from '@/app/(items)/_types/item';

import {
  MAX_BONUS_RELIC_FRAGMENT_COUNT,
  MAX_RELIC_FRAGMENT_COUNT,
} from '../../_constants/max-relic-fragment-count';

interface Props {
  buildState: BuildState;
  isEditable: boolean;
  isScreenshotMode: boolean;
  itemInfoOpen: boolean;
  itemOwnershipPreference: boolean;
  onItemSlotClick: (category: ItemCategory, index?: number) => void;
  onShowInfo: (item: Item) => void;
  onToggleOptional: (selectedItem: Item, optional: boolean) => void;
}

export function PrismDisplay({
  buildState,
  isEditable,
  isScreenshotMode,
  itemInfoOpen,
  itemOwnershipPreference,
  onItemSlotClick,
  onShowInfo,
  onToggleOptional,
}: Props) {
  // Tracks the index of which button was pressed, and opens the dialog
  const [whichSlotClicked, setWhichSlotClicked] = useState<number | null>(null);
  const isDialogOpen = whichSlotClicked !== null && isEditable;

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center justify-center gap-x-1 gap-y-0',
        isScreenshotMode && 'justify-start',
      )}
    >
      <FragmentOrFusionDialog
        isOpen={isDialogOpen}
        onClose={() => setWhichSlotClicked(null)}
        onSelect={(isFragment) => {
          if (whichSlotClicked !== null) {
            onItemSlotClick(
              isFragment ? 'relicfragment' : 'fusion',
              whichSlotClicked,
            );
          }
          setWhichSlotClicked(null);
        }}
      />
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Prism</span>
          </BaseLabel>
        ) : null}
        <ItemButton
          item={buildState.items.prism}
          isEditable={isEditable}
          isScreenshotMode={isScreenshotMode}
          manualWordBreaks={true}
          onClick={() => onItemSlotClick('prism')}
          onItemInfoClick={onShowInfo}
          onToggleOptional={onToggleOptional}
          showOwnership={itemOwnershipPreference}
          tooltipDisabled={itemInfoOpen}
          unoptimized={isScreenshotMode}
        />
      </BaseFieldset>
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable && !isScreenshotMode ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Fragments</span>
          </BaseLabel>
        ) : null}
        <div className="flex w-full flex-wrap items-start justify-start gap-x-1">
          {getArrayOfLength(MAX_RELIC_FRAGMENT_COUNT).map((fragmentIndex) => (
            <ItemButton
              key={
                buildState.items.relicfragment[fragmentIndex]?.id ||
                fragmentIndex
              }
              item={buildState.items.relicfragment[fragmentIndex] || null}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              manualWordBreaks={true}
              onClick={() => onItemSlotClick('relicfragment', fragmentIndex)}
              onItemInfoClick={onShowInfo}
              onToggleOptional={onToggleOptional}
              showOwnership={itemOwnershipPreference}
              tooltipDisabled={itemInfoOpen}
              unoptimized={isScreenshotMode}
            />
          ))}
        </div>
      </BaseFieldset>
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable && !isScreenshotMode ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Bonuses</span>
          </BaseLabel>
        ) : null}
        <div className="flex w-full flex-wrap items-start justify-start gap-x-1">
          {getArrayOfLength(MAX_BONUS_RELIC_FRAGMENT_COUNT).map((index) => {
            // Account for the first 3 slots being the main fragments
            const slotOffset = MAX_RELIC_FRAGMENT_COUNT;

            const fusionInSlot = buildState.items.fusion[index + slotOffset];
            const fragmentInSlot =
              buildState.items.relicfragment[index + slotOffset];

            const itemToDisplay = fusionInSlot || fragmentInSlot;

            return (
              <ItemButton
                key={itemToDisplay?.id ?? index}
                item={itemToDisplay || null}
                isEditable={isEditable}
                isScreenshotMode={isScreenshotMode}
                manualWordBreaks={true}
                onClick={() => {
                  if (!isEditable) {
                    return setWhichSlotClicked(null);
                  }
                  if (!fusionInSlot && !fragmentInSlot) {
                    setWhichSlotClicked(index + slotOffset);
                    return;
                  }
                  if (fragmentInSlot) {
                    onItemSlotClick('relicfragment', index + slotOffset);
                  }
                  if (fusionInSlot) {
                    onItemSlotClick('fusion', index + slotOffset);
                  }
                }}
                onItemInfoClick={onShowInfo}
                onToggleOptional={onToggleOptional}
                showOwnership={itemOwnershipPreference}
                tooltipDisabled={itemInfoOpen}
                unoptimized={isScreenshotMode}
              />
            );
          })}
        </div>
      </BaseFieldset>
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable && !isScreenshotMode ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Legendary</span>
          </BaseLabel>
        ) : null}
        <ItemButton
          item={buildState.items.relicfragment[8] || null}
          isEditable={isEditable}
          isScreenshotMode={isScreenshotMode}
          manualWordBreaks={true}
          onClick={() => onItemSlotClick('relicfragment', 8)}
          onItemInfoClick={onShowInfo}
          onToggleOptional={onToggleOptional}
          showOwnership={itemOwnershipPreference}
          tooltipDisabled={itemInfoOpen}
          unoptimized={isScreenshotMode}
        />
      </BaseFieldset>
    </div>
  );
}
