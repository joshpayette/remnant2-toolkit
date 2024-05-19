import { Item } from "@/app/(data)/items/types"
import { BaseDialog, BaseDialogTitle, BaseDialogBody } from "../_base/dialog"
import { getCategoryProgressStats } from "../filters/item-tracker/utils"

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
    const categoryItemsByLocation = Object.groupBy(filteredItems, (item) => `${item.location?.world}`)
    let total = 0
    const categoryStats = Object.entries(categoryItemsByLocation).map(([locationName, items]) => {
        const progressStats = getCategoryProgressStats({filteredItems: items, discoveredItemIds})
        total += progressStats.undiscoveredCount
        return {
            locationName,
            locationStats: `Missing ${progressStats.undiscoveredCount} of ${progressStats.filteredItemsCount}`
        }
    })
    categoryStats.sort((a, b) => a.locationName.localeCompare(b.locationName))
  
    return (
        <BaseDialog open={open} onClose={onClose} size="sm">
          <BaseDialogTitle>Missing Item Locations</BaseDialogTitle>
          <BaseDialogBody>
            <div className="text-left text-sm">
                <ol className="ml-8 grid col-auto grid-cols-2">
                    {categoryStats.map((entry) => (<>
                        <li className="text-gray-300 list-disc">
                            {entry.locationName}
                        </li>
                        <li className="text-gray-300 list-none">
                            {entry.locationStats}
                        </li>
                    </>))}
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