import { type TraitItem } from '@/types'
import { useState } from 'react'

export default function TraitItemSelect({
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
    <div className="flex flex-col">
      {traitItems.map((traitItem) => (
        <div
          key={traitItem.name}
          className="flex items-center border border-transparent border-b-green-500 text-sm"
        >
          <div className="mr-4 flex items-center text-lg font-bold text-green-400">
            {traitItem.name === editingTraitItem?.name ? (
              <input
                type="text"
                value={editingTraitItem?.amount ?? traitItem.amount ?? 1}
                onChange={(e) => {
                  let amount = parseInt(e.target.value)

                  if (isNaN(amount)) amount = 1
                  if (amount < 1) amount = 1
                  if (amount > 10) amount = 10

                  setEditingTraitItem({
                    ...traitItem,
                    amount,
                  })
                }}
                onBlur={() => {
                  onChangeAmount(editingTraitItem)
                  setEditingTraitItem(null)
                }}
                autoFocus
                className="w-12 border border-green-500 bg-transparent p-1 text-center text-green-400"
              />
            ) : (
              <button onClick={() => setEditingTraitItem(traitItem)}>
                {traitItem.amount ?? 1}
              </button>
            )}
          </div>
          <div className="flex items-center text-gray-200">
            {traitItem.name}
          </div>
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
      {showControls && (
        <button
          onClick={onAddTrait}
          className="mt-4 flex items-center justify-center rounded border border-purple-700 px-4 py-2 text-xs font-bold text-white hover:border-purple-400 hover:bg-purple-500"
        >
          Add Trait
        </button>
      )}
    </div>
  )
}
