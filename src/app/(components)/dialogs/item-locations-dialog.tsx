import { Item } from '@/app/(data)/items/types'
import { groupBy } from '@/app/(utils)/object-utils'
import { BaseDialog, BaseDialogBody, BaseDialogTitle } from '../_base/dialog'
import { getCategoryProgressStats } from '../filters/item-tracker/utils'

interface Props {
  open: boolean
  onClose: () => void
  filteredItems: Item[]
  discoveredItemIds: string[]
}

export function ItemLocationsDialog({
  open,
  onClose,
  filteredItems,
  discoveredItemIds,
}: Props) {
  const categoryItemsByLocation = groupBy(
    filteredItems,
    (item) => `${item.location?.world}`,
  )
  const undefinedItems = categoryItemsByLocation.undefined
  if (undefinedItems) {
      if (categoryItemsByLocation.Any) {
          categoryItemsByLocation.Any.concat(undefinedItems)
      } else {
          categoryItemsByLocation.Any = undefinedItems
      }
  }
  delete categoryItemsByLocation.undefined

  let total = 0
  const categoryStats = Object.entries(categoryItemsByLocation).map(
    ([locationName, items]) => {
      const progressStats = getCategoryProgressStats({
        filteredItems: items,
        discoveredItemIds,
      })
      total += progressStats.undiscoveredCount
      return {
        locationName,
        locationStats: `Missing ${progressStats.undiscoveredCount} of ${progressStats.filteredItemsCount}`,
      }
    },
  )
  categoryStats.sort((a, b) => a.locationName.localeCompare(b.locationName))

  return (
    <BaseDialog open={open} onClose={onClose} size="sm">
      <BaseDialogTitle>Missing Item Locations</BaseDialogTitle>
      <BaseDialogBody>
        <div className="text-left text-sm">
          <ol>
            {categoryStats.map((entry) => (
              <div
                key={entry.locationName}
                className="col-auto ml-8 grid grid-cols-2"
              >
                <li className="list-disc text-gray-300">
                  {entry.locationName}
                </li>
                <li className="list-none text-gray-300">
                  {entry.locationStats}
                </li>
              </div>
            ))}
          </ol>
          <h3 className="text-md col-span-full my-2 font-semibold text-surface-solid">
            Total:{' '}
            <span className="text-md font-bold text-surface-solid">
              {total.toFixed(0)}
            </span>
          </h3>
        </div>
      </BaseDialogBody>
    </BaseDialog>
  )
}
