import { XCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { IoInformationCircleSharp } from 'react-icons/io5'
import { TbHttpOptions } from 'react-icons/tb'

import { Tooltip } from '@/app/(components)/tooltip'
import {
  DEFAULT_TRAIT_AMOUNT,
  MAX_TRAIT_AMOUNT,
} from '@/app/(data)/builds/constants'
import { Item } from '@/app/(data)/items/types'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { BuildState } from '@/app/(types)/builds'
import { cn } from '@/app/(utils)/classnames'

export function Traits({
  buildState,
  isEditable,
  isScreenshotMode,
  showControls,
  tooltipDisabled,
  onAddTrait,
  onItemInfoClick,
  onRemoveTrait,
  onUpdateAmount,
}: {
  buildState: BuildState
  isEditable: boolean
  isScreenshotMode: boolean
  showControls: boolean
  tooltipDisabled: boolean
  onAddTrait?: () => void
  onItemInfoClick?: (item: Item) => void
  onRemoveTrait: (traitItem: TraitItem) => void
  onUpdateAmount: (traitItem: TraitItem) => void
}) {
  const { trait: traitItems, archetype: archetypeItems } = buildState.items

  const [editingTraitItem, setEditingTraitItem] = useState<TraitItem | null>(
    null,
  )

  const totalTraitAmount = traitItems.reduce(
    (total, traitItem) => total + traitItem.amount,
    0,
  )

  function shouldAllowEdit(traitItem: TraitItem) {
    const primaryArchetype = archetypeItems[0]
    const isLinkedPrimaryArchetypeTraitMaxed =
      primaryArchetype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    if (isLinkedPrimaryArchetypeTraitMaxed) {
      return false
    }

    const secondaryArchetype = archetypeItems[1]
    const isLinkedSecondaryArchetypeTraitMaxed =
      secondaryArchetype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    if (isLinkedSecondaryArchetypeTraitMaxed) {
      return false
    }

    return true
  }

  function shouldAllowDelete(traitItem: TraitItem) {
    // Default values based on editable and wheisEditable && showControlsther controls are shown
    let shouldAllowDelete = isEditable && showControls

    // If the trait is linked to an archtype, it should not be deletable
    if (isArchetypeTrait(traitItem)) {
      shouldAllowDelete = false
    }

    return shouldAllowDelete
  }

  function isArchetypeTrait(traitItem: TraitItem) {
    // If the trait is linked to an archtype, it should not be deletable
    const primaryArchtype = archetypeItems[0]
    if (
      primaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) => linkedTraitItem.name === traitItem.name,
      )
    ) {
      return true
    }

    // If the trait is linked to the secondary archtype, it should not be deletable
    // but only if it's the main archtype trait, i.e. amount is 10
    const secondaryArchtype = archetypeItems[1]
    if (
      secondaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return true
    }
  }

  function isArchetypeCoreTrait(traitItem: TraitItem) {
    // If the trait is linked to an archtype, it should not be deletable
    const primaryArchtype = archetypeItems[0]
    if (
      primaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return true
    }

    // If the trait is linked to the secondary archtype, it should not be deletable
    // but only if it's the main archtype trait, i.e. amount is 10
    const secondaryArchtype = archetypeItems[1]
    if (
      secondaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return true
    }
  }

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 gap-2 sm:grid-cols-2',
          isScreenshotMode && 'grid-cols-2',
        )}
      >
        {!isScreenshotMode && (
          <div className="col-span-full mx-auto mb-2 max-w-[300px] border border-secondary-800 p-2 text-center text-xs text-gray-300">
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
                : 'border-transparent border-b-surface-solid',
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
            <div className="mr-4 flex items-center text-lg font-bold ">
              {traitItem.name === editingTraitItem?.name &&
              isEditable &&
              shouldAllowEdit(editingTraitItem) ? (
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={editingTraitItem.amount}
                  // Update the parent state when the user presses enter
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onUpdateAmount(editingTraitItem)
                      setEditingTraitItem(null)
                    }
                  }}
                  // Select the text when the input is focused
                  onFocus={(e) => e.target.select()}
                  // Update the local state when the user types
                  onChange={(e) => {
                    const { value } = e.target

                    if (value.trim() === '') return

                    let amount = Number(value)

                    setEditingTraitItem(
                      new TraitItem({
                        ...traitItem,
                        amount: isNaN(amount) ? 0 : amount,
                      }),
                    )
                  }}
                  // Update the parent state when the input is blurred
                  onBlur={() => {
                    onUpdateAmount(editingTraitItem)
                    setEditingTraitItem(null)
                  }}
                  autoFocus
                  className="w-12 border border-primary-500 bg-transparent p-1 text-center"
                />
              ) : (
                <button
                  onClick={() => setEditingTraitItem(traitItem)}
                  aria-label="Edit Trait Amount"
                  className={cn(
                    'min-w-[30px] text-left',
                    !isScreenshotMode &&
                      isEditable &&
                      'border border-dashed border-gray-400 p-1',
                  )}
                >
                  {traitItem.amount ?? DEFAULT_TRAIT_AMOUNT}
                </button>
              )}
            </div>
            <button
              className="relative flex items-center justify-start gap-x-2 text-sm"
              aria-label="Trait Information"
              onClick={() => onItemInfoClick && onItemInfoClick(traitItem)}
            >
              <div>{traitItem.name}</div>
              {!isScreenshotMode && onItemInfoClick && (
                <Tooltip
                  content={traitItem.description}
                  trigger="mouseenter"
                  interactive={false}
                  disabled={tooltipDisabled}
                >
                  <span>
                    <IoInformationCircleSharp className="h-4 w-4 rounded-full border-transparent bg-black text-accent1-500" />
                  </span>
                </Tooltip>
              )}
            </button>
            {!isScreenshotMode &&
              isEditable &&
              showControls &&
              shouldAllowEdit(traitItem) && (
                <Tooltip
                  content={`Toggle item as optional`}
                  trigger="mouseenter"
                  interactive={false}
                  disabled={tooltipDisabled}
                >
                  <button
                    className={cn(
                      'z-[1] ml-2 rounded-full border-transparent bg-black',
                    )}
                    onClick={() =>
                      onUpdateAmount({
                        ...traitItem,
                        optional: !traitItem.optional,
                      })
                    }
                    aria-label="Toggle item as optional"
                  >
                    <TbHttpOptions className="h-4 w-4 text-accent1-500" />
                  </button>
                </Tooltip>
              )}
            {shouldAllowDelete(traitItem) && (
              <button
                onClick={() => onRemoveTrait(traitItem)}
                aria-label="Remove Trait"
                className="flex grow items-end justify-end text-red-500"
              >
                <XCircleIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
      </div>
      {showControls && isEditable && (
        <button
          onClick={onAddTrait}
          aria-label="Add Trait"
          className="mx-auto mt-4 flex max-w-[250px] items-center justify-center rounded border border-secondary-700 px-4 py-2 text-xs font-bold text-surface-solid hover:border-secondary-400 hover:bg-secondary-500"
        >
          Add Trait
        </button>
      )}
    </>
  )
}
