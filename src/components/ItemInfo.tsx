import { Item, LoadoutItem } from '@/types'
import Dialog from './Dialog'
import Image from 'next/image'

interface ItemInfoProps {
  item: Item | LoadoutItem | null
  open: boolean
  onClose: () => void
}

export default function ItemInfo({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  return (
    <Dialog open={open} onClose={onClose} title={'Item Info'}>
      <div className="grid grid-cols-2 gap-2">
        <Image
          src={item.path}
          width={128}
          height={128}
          alt={item.name}
          className="shrink-0"
        />
        <div className="flex flex-col items-start justify-start">
          <h3 className="text-xl font-bold text-purple-500">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.type}</p>
          {/* <p className="text-sm text-gray-500">{item.description}</p> */}
        </div>
      </div>
    </Dialog>
  )
}
