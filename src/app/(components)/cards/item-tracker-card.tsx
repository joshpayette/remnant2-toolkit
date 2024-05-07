import { ItemButton } from '@/app/(components)/buttons/item-button'
import { Item } from '@/app/(data)/items/types'

interface Props {
  item: Item & { discovered: boolean }
  tooltipDisabled: boolean
  onClick: (itemId: string) => void
  onShowItemInfo: (itemId: string) => void
}

export function ItemTrackerCard({
  item,
  tooltipDisabled,
  onClick,
  onShowItemInfo,
}: Props) {
  return (
    <ItemButton
      item={item}
      isEditable={false}
      isToggled={item.discovered}
      onClick={() => onClick(item.id)}
      onItemInfoClick={() => onShowItemInfo(item.id)}
      size="lg"
      tooltipDisabled={tooltipDisabled}
      loadingType="lazy"
    />
  )
}
