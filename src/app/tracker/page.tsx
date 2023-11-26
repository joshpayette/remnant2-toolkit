import ItemCard from '@/components/ItemCard'
import { remnantItems } from '@/data/items'

const items = remnantItems
  .filter((item) => item.type === 'ring')
  .map((item) => <ItemCard key={item.name} item={item} />)

export default function TrackerPage() {
  return <div className="grid grid-cols-7 gap-1">{items}</div>
}
