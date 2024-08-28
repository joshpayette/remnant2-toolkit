import { BaseButton } from '@repo/ui';
import { BaseInput } from '@repo/ui';
import { cn } from '@repo/ui';
import { ZINDEXES } from '@repo/ui';
import { CloseCircleIcon } from '@repo/ui';
import { useState } from 'react';
import { PiBagSimpleFill as OwnershipIcon } from 'react-icons/pi';
import { TbHttpOptions } from 'react-icons/tb';

import { Tooltip } from '@/app/(components)/tooltip';
import { Item } from '@/app/(data)/items/types';
import { TraitItem } from '@/app/(data)/items/types/TraitItem';
import { DEFAULT_TRAIT_AMOUNT } from '@/app/(features)/builder/constants/default-trait-amount';
import { MAX_TRAIT_AMOUNT } from '@/app/(features)/builder/constants/max-trait-amount';
import { BuildState } from '@/app/(features)/builds/types/build-state';

export function Traits({
  buildState,
  isEditable,
  isScreenshotMode,
  showControls,
  showOwnership,
  tooltipDisabled,
  onAddTrait,
  onItemInfoClick,
  onRemoveTrait,
  onUpdateAmount,
}: {
  buildState: BuildState;
  isEditable: boolean;
  isScreenshotMode: boolean;
  showControls: boolean;
  showOwnership: boolean;
  tooltipDisabled: boolean;
  onAddTrait?: () => void;
  onItemInfoClick?: (item: Item) => void;
  onRemoveTrait: (traitItem: TraitItem) => void;
  onUpdateAmount: (traitItem: TraitItem) => void;
}) {
  const { trait: traitItems, archetype: archetypeItems } = buildState.items;

  const [editingTraitItem, setEditingTraitItem] = useState<TraitItem | null>(
    null,
  );

  const totalTraitAmount = traitItems.reduce(
    (total, traitItem) => total + traitItem.amount,
    0,
  );

  function shouldAllowEdit(traitItem: TraitItem) {
    const primaryArchetype = archetypeItems[0];
    const isLinkedPrimaryArchetypeTraitMaxed =
      primaryArchetype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      );
    if (isLinkedPrimaryArchetypeTraitMaxed) {
      return false;
    }

    const secondaryArchetype = archetypeItems[1];
    const isLinkedSecondaryArchetypeTraitMaxed =
      secondaryArchetype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      );
    if (isLinkedSecondaryArchetypeTraitMaxed) {
      return false;
    }

    return true;
  }

  function shouldAllowDelete(traitItem: TraitItem) {
    // Default values based on editable and wheisEditable && showControlsther controls are shown
    let shouldAllowDelete = isEditable && showControls;

    // If the trait is linked to an archtype, it should not be deletable
    if (isArchetypeTrait(traitItem)) {
      shouldAllowDelete = false;
    }

    return shouldAllowDelete;
  }

  function isArchetypeTrait(traitItem: TraitItem) {
    // If the trait is linked to an archtype, it should not be deletable
    const primaryArchtype = archetypeItems[0];
    if (
      primaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) => linkedTraitItem.name === traitItem.name,
      )
    ) {
      return true;
    }

    // If the trait is linked to the secondary archtype, it should not be deletable
    // but only if it's the main archtype trait, i.e. amount is 10
    const secondaryArchtype = archetypeItems[1];
    if (
      secondaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return true;
    }
  }

  function isArchetypeCoreTrait(traitItem: TraitItem) {
    // If the trait is linked to an archtype, it should not be deletable
    const primaryArchtype = archetypeItems[0];
    if (
      primaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return true;
    }

    // If the trait is linked to the secondary archtype, it should not be deletable
    // but only if it's the main archtype trait, i.e. amount is 10
    const secondaryArchtype = archetypeItems[1];
    if (
      secondaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return true;
    }
  }

  const showItemOwnership =
    !isScreenshotMode && !isEditable && showControls && showOwnership;

  /**
   * Optional toggle should be shown if:
   * - The button is not in screenshot mode
   * - The button is editable
   * - The button should show controls
   */
  const showOptionalToggle = !isScreenshotMode && isEditable && showControls;

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 gap-2 sm:grid-cols-2',
          isScreenshotMode && 'grid-cols-2',
        )}
      >
        {!isScreenshotMode && (
          <div className="border-secondary-800 col-span-full mx-auto mb-2 max-w-[300px] border p-2 text-center text-xs text-gray-300">
            <span
              className={cn(
                'text-lg font-bold',
                totalTraitAmount > MAX_TRAIT_AMOUNT && 'text-red-500',
              )}
            >
              {totalTraitAmount}
            </span>
            /<span className="font-bold">{MAX_TRAIT_AMOUNT}</span> Trait Points
            <p className="text-primary-500">
              5 Core + 20 Archetype + 85 Player Choice
            </p>
          </div>
        )}

        {traitItems.map((traitItem) => (
          <div
            key={traitItem.name}
            className={cn(
              'flex items-center border text-sm',
              traitItem.optional
                ? 'border-dashed'
                : 'border-b-surface-solid border-l-transparent border-r-transparent border-t-transparent',
              isArchetypeTrait(traitItem) && 'border-b-accent1-500',
              isArchetypeTrait(traitItem) &&
                traitItem.optional &&
                'border-accent1-500',
              isArchetypeTrait(traitItem) &&
                !isArchetypeCoreTrait(traitItem) &&
                'border-b-secondary-500',
              isArchetypeTrait(traitItem) &&
                !isArchetypeCoreTrait(traitItem) &&
                traitItem.optional &&
                'border-secondary-500',
            )}
          >
            <div className="flex items-center text-lg font-bold">
              {traitItem.name === editingTraitItem?.name &&
              isEditable &&
              shouldAllowEdit(editingTraitItem) ? (
                <BaseInput
                  type="number"
                  min={1}
                  max={10}
                  value={editingTraitItem.amount}
                  // Update the parent state when the user presses enter
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onUpdateAmount(editingTraitItem);
                      setEditingTraitItem(null);
                    }
                  }}
                  // Select the text when the input is focused
                  onFocus={(e) => e.target.select()}
                  // Update the local state when the user types
                  onChange={(e) => {
                    const { value } = e.target;

                    if (value.trim() === '') return;

                    const amount = Number(value);

                    setEditingTraitItem(
                      new TraitItem({
                        ...traitItem,
                        amount: isNaN(amount) ? 0 : amount,
                      }),
                    );
                  }}
                  // Update the parent state when the input is blurred
                  onBlur={() => {
                    onUpdateAmount(editingTraitItem);
                    setEditingTraitItem(null);
                  }}
                  autoFocus
                  style={{ width: '60px' }}
                />
              ) : (
                <BaseButton
                  outline
                  onClick={() => setEditingTraitItem(traitItem)}
                  aria-label="Edit Trait Amount"
                  className={cn(
                    'min-w-[47px] text-left',
                    !isScreenshotMode &&
                      isEditable &&
                      'border-dashed border-zinc-500',
                  )}
                >
                  {traitItem.amount ?? DEFAULT_TRAIT_AMOUNT}
                </BaseButton>
              )}
            </div>
            <Tooltip
              content={traitItem.description}
              trigger="mouseenter"
              interactive={false}
              disabled={tooltipDisabled}
            >
              <button
                className="relative ml-2 flex min-w-[100px] items-center justify-start text-sm"
                aria-label="Trait Information"
                onClick={() => onItemInfoClick && onItemInfoClick(traitItem)}
              >
                {traitItem.name}
              </button>
            </Tooltip>
            {showOptionalToggle && shouldAllowEdit(traitItem) && (
              <Tooltip
                content={`Toggle item as optional`}
                trigger="mouseenter"
                interactive={false}
                disabled={tooltipDisabled}
              >
                <BaseButton
                  plain
                  className={cn(ZINDEXES.ITEM_BUTTON)}
                  onClick={() =>
                    onUpdateAmount({
                      ...traitItem,
                      optional: !traitItem.optional,
                    })
                  }
                  aria-label="Toggle item as optional"
                >
                  <TbHttpOptions className="text-accent1-500 h-5 w-5" />
                </BaseButton>
              </Tooltip>
            )}
            {showItemOwnership && (
              <Tooltip
                content={
                  traitItem.isOwned
                    ? `You own this item`
                    : `You do not own this item`
                }
                trigger="mouseenter"
                interactive={false}
                disabled={tooltipDisabled}
              >
                <button
                  aria-label={traitItem.isOwned ? 'Item Owned' : 'Item Unowned'}
                >
                  <OwnershipIcon
                    className={cn(
                      'h-3 w-3',
                      traitItem.isOwned ? 'text-green-500' : 'text-red-500',
                    )}
                  />
                </button>
              </Tooltip>
            )}
            {shouldAllowDelete(traitItem) && (
              <div className="flex grow items-end justify-end">
                <BaseButton
                  plain
                  onClick={() => onRemoveTrait(traitItem)}
                  aria-label="Remove Trait"
                >
                  <CloseCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </BaseButton>
              </div>
            )}
          </div>
        ))}
      </div>
      {showControls && isEditable && (
        <button
          onClick={onAddTrait}
          aria-label="Add Trait"
          className="border-secondary-700 text-surface-solid hover:border-secondary-400 hover:bg-secondary-500 mx-auto mt-4 flex max-w-[250px] items-center justify-center rounded border px-4 py-2 text-xs font-bold"
        >
          Add Trait
        </button>
      )}
    </>
  );
}
