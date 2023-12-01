import { Item, LoadoutItem } from '@/types'
import type { ItemCardProps } from './ItemCard'
import ItemCard from './ItemCard'

interface ItemCardButtonProps extends ItemCardProps {
  item: Item | LoadoutItem | null
  onClick: () => void
}

export default function ItemCardButton({
  onClick,
  ...itemCardProps
}: ItemCardButtonProps) {
  return (
    <button
      key={itemCardProps.item?.id}
      className="w-full border-2 border-transparent hover:border-green-400 focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
      onClick={onClick}
    >
      <ItemCard {...itemCardProps} />
    </button>
  )
}
