import {
  BaseButton,
  BaseInput,
  CloseCircleIcon,
  cn,
  OptionalOffIcon,
  OptionalOnIcon,
  OwnershipIcon,
  Tooltip,
  ZINDEXES,
} from '@repo/ui';
import { useState } from 'react';

import { DEFAULT_TRAIT_AMOUNT } from '@/app/(builds)/_constants/default-trait-amount';
import { getTraitCount } from '@/app/(builds)/_libs/get-trait-count';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type Item } from '@/app/(items)/_types/item';
import { TraitItem } from '@/app/(items)/_types/trait-item';

export function TraitsContainer({
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

  /**
   * Whether the trait should be an input box that can change
   */
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

  /**
   * Whether the trait should be deletable
   */
  function shouldAllowDelete(traitItem: TraitItem) {
    // Default values based on editable and wheisEditable && showControlsther controls are shown
    let shouldAllowDelete = isEditable && showControls;

    // If the trait is linked to an archtype, it should not be deletable
    if (isArchetypeTrait(traitItem)) {
      shouldAllowDelete = false;
    }

    return shouldAllowDelete;
  }

  /**
   * Whether the trait is linked to an archetype
   * Used primarily in shouldAllowDelete
   */
  function isArchetypeTrait(traitItem: TraitItem) {
    // If the trait is linked to an archetype, it should not be deletable
    const primaryArchtype = archetypeItems[0];
    if (
      primaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) => linkedTraitItem.name === traitItem.name,
      )
    ) {
      return true;
    }

    // If the trait is linked to the secondary archetype, it should not be deletable
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

  /**
   * Whether the trait is a core trait of an archetype
   * Used primarily in shouldAllowDelete
   */
  function isArchetypeCoreTrait(traitItem: TraitItem) {
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
                totalTraitAmount > getTraitCount(buildState) && 'text-red-500',
              )}
            >
              {totalTraitAmount}
            </span>
            /<span className="font-bold">{getTraitCount(buildState)}</span>{' '}
            Trait Points
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
                  {traitItem.optional ? (
                    <OptionalOffIcon className="text-accent1-500 h-4 w-4" />
                  ) : (
                    <OptionalOnIcon className="text-accent1-500 h-4 w-4" />
                  )}
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
        <div className="mt-4 flex w-full items-center justify-center">
          <BaseButton onClick={onAddTrait} color="purple">
            Add Trait
          </BaseButton>
        </div>
      )}
    </>
  );
}
