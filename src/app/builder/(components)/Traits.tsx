import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { cn } from '@/app/(lib)/utils'
import { TraitItem } from '@/app/(types)/items/TraitItem'
import { DEFAULT_TRAIT_AMOUNT, MAX_TRAIT_AMOUNT } from '@/app/(data)/constants'
import { BuildState } from '@/app/(types)/build'

export default function Traits({
  buildState,
  isEditable,
  isScreenshotMode,
  showControls,
  onAddTrait,
  onRemoveTrait,
  onUpdateAmount,
}: {
  buildState: BuildState
  isEditable: boolean
  isScreenshotMode: boolean
  showControls: boolean
  onAddTrait?: () => void
  onRemoveTrait: (traitItem: TraitItem) => void
  onUpdateAmount: (traitItem: TraitItem) => void
}) {
  const { trait: traitItems, archtype: archtypeItems } = buildState.items

  const [editingTraitItem, setEditingTraitItem] = useState<TraitItem | null>(
    null,
  )

  const totalTraitAmount = traitItems.reduce(
    (total, traitItem) => total + traitItem.amount,
    0,
  )

  function shouldAllowEdit(traitItem: TraitItem) {
    // if the trait being edited is the linked archtype with an amount of 10,
    // it should not be editable
    const primaryArchtype = archtypeItems[0]
    if (
      primaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return false
    }

    const secondaryArchtype = archtypeItems[1]
    if (
      secondaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      return false
    }

    return true
  }

  function shouldAllowDelete(traitItem: TraitItem) {
    // Default values based on editable and wheisEditable && showControlsther controls are shown
    let shouldAllowDelete = isEditable && showControls

    // If the trait is linked to an archtype, it should not be deletable
    const primaryArchtype = archtypeItems[0]
    if (
      primaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) => linkedTraitItem.name === traitItem.name,
      )
    ) {
      shouldAllowDelete = false
    }

    // If the trait is linked to the secondary archtype and has an amount of 10,
    // it should not be deletable
    const secondaryArchtype = archtypeItems[1]
    if (
      secondaryArchtype?.linkedItems?.traits?.some(
        (linkedTraitItem) =>
          linkedTraitItem.name === traitItem.name &&
          linkedTraitItem.amount === 10,
      )
    ) {
      shouldAllowDelete = false
    }

    return shouldAllowDelete
  }

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 gap-2 sm:grid-cols-2',
          isScreenshotMode && 'grid-cols-2',
        )}
      >
        <div className="col-span-full mx-auto mb-2 max-w-[300px] border border-gray-500 p-2 text-center text-xs text-gray-300">
          <span
            className={cn(
              'text-lg font-bold',
              totalTraitAmount > MAX_TRAIT_AMOUNT && 'text-red-500',
            )}
          >
            {totalTraitAmount}
          </span>
          /<span className="font-bold">{MAX_TRAIT_AMOUNT}</span> Trait Points
          <p className="text-cyan-500">
            5 Core + 20 Archtype + 85 Player Choice
          </p>
        </div>
        {traitItems.map((traitItem) => (
          <div
            key={traitItem.name}
            className="flex items-center border border-transparent border-b-green-500 text-sm"
          >
            <div className="mr-4 flex items-center text-lg font-bold text-green-400">
              {traitItem.name === editingTraitItem?.name &&
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
                  className="w-12 border border-green-500 bg-transparent p-1 text-center text-green-400"
                />
              ) : (
                <button
                  onClick={() => setEditingTraitItem(traitItem)}
                  className="min-w-[30px] text-left"
                >
                  {traitItem.amount ?? DEFAULT_TRAIT_AMOUNT}
                </button>
              )}
            </div>
            <div className="text-sm text-gray-200">{traitItem.name}</div>
            {shouldAllowDelete(traitItem) && (
              <button
                onClick={() => onRemoveTrait(traitItem)}
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
          className="mx-auto mt-4 flex max-w-[250px] items-center justify-center rounded border border-purple-700 px-4 py-2 text-xs font-bold text-white hover:border-purple-400 hover:bg-purple-500"
        >
          Add Trait
        </button>
      )}
    </>
  )
}
