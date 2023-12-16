'use client'

import copy from 'clipboard-copy'
import ToCsvButton from '@/app/(components)/ToCsvButton'
import { cn, itemToCsvItem } from '@/app/utils'
import { remnantItemCategories } from '@/app/(data)'
import useQueryString from '@/app/builder/(components)/useBuilder'
import { type TraitItem } from '@/app/(types)/main'

export default function Actions({
  showControls,
  showLabels,
  onExportAsImage,
  onToggleControls,
  onToggleLabels,
}: {
  showControls: boolean
  showLabels: boolean
  onExportAsImage: () => void
  onToggleControls: () => void
  onToggleLabels: () => void
}) {
  const { currentBuild } = useQueryString()

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = remnantItemCategories
    .map((category) => {
      const itemOrItems = currentBuild.items[category]

      if (!itemOrItems)
        return {
          name: '',
          category,
          description: '',
          howToGet: '',
          wikiLinks: '',
        }

      if (Array.isArray(itemOrItems)) {
        // If the category is a trait, we need to add the trait amount to the name
        if (category === 'trait') {
          return itemOrItems.map((item) => {
            const traitItem = item as TraitItem
            const { name, ...csvItem } = itemToCsvItem(traitItem)
            return {
              name: `${name} - ${traitItem.amount}`,
              ...csvItem,
            }
          })
        }

        return itemOrItems.map((item) => itemToCsvItem(item))
      }

      if (itemOrItems.category === 'trait') {
        if (!Array.isArray(itemOrItems)) {
          return {
            name: '',
            category,
            description: '',
            howToGet: '',
            wikiLinks: '',
          }
        }
        return itemOrItems.map((item) => itemToCsvItem(item.item))
      }
    })
    .flat()

  return (
    <div id="actions" className="flex flex-col gap-2">
      <button
        id="show-labels-button"
        className={cn(
          'flex flex-col items-center rounded border px-4 py-2 font-bold text-white hover:bg-green-700',
          showLabels
            ? 'border-transparent bg-green-500'
            : 'border-green-500 bg-black',
        )}
        onClick={onToggleLabels}
      >
        <span className="text-sm">
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </span>
      </button>

      <button
        id="show-controls-button"
        className={cn(
          'flex flex-col items-center rounded border px-4 py-2 font-bold text-white hover:bg-green-700',
          showControls
            ? 'border-transparent bg-green-500'
            : 'border-green-500 bg-black',
        )}
        onClick={onToggleControls}
      >
        <span className="text-sm">
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </span>
      </button>

      <button
        className="flex flex-col items-center rounded border border-red-500 bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
        onClick={() => {
          window.location.href = '/builder'
        }}
      >
        New Build
      </button>

      <hr className="my-4 border-gray-900" />

      <button
        className="flex flex-col items-center rounded border border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
        onClick={() => {
          copy(window.location.href)
          alert('Copied to clipboard!')
        }}
      >
        Copy Build URL
      </button>

      <button
        className="flex flex-col items-center rounded border border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
        onClick={onExportAsImage}
      >
        Export to Image
      </button>

      <ToCsvButton
        data={csvBuildData.filter((item) => item?.name !== '')}
        filename={`remnant2_builder_${currentBuild.name}`}
      />
    </div>
  )
}
