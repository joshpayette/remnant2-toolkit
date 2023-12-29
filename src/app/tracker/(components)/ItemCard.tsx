import { GenericItem } from '@/app/(types)/items/GenericItem'
import Image from 'next/image'

export interface ItemCardProps {
  item?: GenericItem
  category?: GenericItem['category']
  onClick?: () => void
}

function CardImage({ item }: { item: ItemCardProps['item'] }) {
  return (
    <div className="relative flex h-[64px] w-full grow items-center justify-center overflow-hidden bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-body-bg.jpg')]">
      {item && (
        <Image
          src={`https://d2sqltdcj8czo5.cloudfront.net${item.imagePath}`}
          alt={item.name}
          width={64}
          height={64}
        />
      )}
    </div>
  )
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <div className="relative w-full min-w-full">
      <div className="flex w-full min-w-full flex-col items-center justify-center">
        <div className="h-[48px] w-full bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-title-bg.jpg')] p-2 text-center ">
          <h3 className="text-sm text-purple-400">{item?.name}</h3>
        </div>
        {onClick ? (
          <button
            onClick={onClick}
            className="h-full max-h-full w-full max-w-full"
          >
            <CardImage item={item} />
          </button>
        ) : (
          <CardImage item={item} />
        )}
      </div>
    </div>
  )
}
