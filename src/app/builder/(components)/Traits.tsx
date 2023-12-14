import { type TraitItem } from '@/app/types'
import { useState } from 'react'
import { DEFAULT_TRAIT_AMOUNT } from '../(hooks)/useBuilder'

export default function Traits({
  showControls,
  traitItems,
  onAddTrait,
  onRemoveTrait,
  onChangeAmount,
}: {
  showControls: boolean
  traitItems: TraitItem[]
  onAddTrait: () => void
  onRemoveTrait: (traitItem: TraitItem) => void
  onChangeAmount: (traitItem: TraitItem) => void
}) {
  const [editingTraitItem, setEditingTraitItem] = useState<TraitItem | null>(
    null,
  )

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {traitItems.map((traitItem) => (
          <div
            key={traitItem.name}
            className="flex items-center border border-transparent border-b-green-500 text-sm"
          >
            <div className="mr-4 flex items-center text-lg font-bold text-green-400">
              {traitItem.name === editingTraitItem?.name ? (
                <input
                  type="text"
                  value={
                    editingTraitItem.amount ??
                    traitItem.amount ??
                    DEFAULT_TRAIT_AMOUNT
                  }
                  // Update the parent state when the user presses enter
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onChangeAmount(editingTraitItem)
                      setEditingTraitItem(null)
                    }
                  }}
                  // Select the text when the input is focused
                  onFocus={(e) => e.target.select()}
                  // Update the local state when the user types
                  onChange={(e) => {
                    const { value } = e.target

                    if (value.trim() === '') return

                    let amount = parseInt(value)

                    if (isNaN(amount)) amount = DEFAULT_TRAIT_AMOUNT
                    if (amount < 1) amount = DEFAULT_TRAIT_AMOUNT
                    if (amount > 10) amount = DEFAULT_TRAIT_AMOUNT

                    setEditingTraitItem({
                      ...traitItem,
                      amount,
                    })
                  }}
                  // Update the parent state when the input is blurred
                  onBlur={() => {
                    onChangeAmount(editingTraitItem)
                    setEditingTraitItem(null)
                  }}
                  autoFocus
                  className="w-12 border border-green-500 bg-transparent p-1 text-center text-green-400"
                />
              ) : (
                <button onClick={() => setEditingTraitItem(traitItem)}>
                  {traitItem.amount ?? DEFAULT_TRAIT_AMOUNT}
                </button>
              )}
            </div>
            <div className="text-sm text-gray-200">{traitItem.name}</div>
            {showControls && (
              <button
                onClick={() => onRemoveTrait(traitItem)}
                className="flex grow items-end justify-end text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      {showControls && (
        <button
          onClick={onAddTrait}
          className="mx-auto mt-4 flex max-w-[250px] items-center justify-center rounded border border-purple-700 px-4 py-2 text-xs font-bold text-white hover:border-purple-400 hover:bg-purple-500"
        >
          Add Trait
        </button>
      )}
    </div>
  )
}
