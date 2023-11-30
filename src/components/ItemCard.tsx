import Image from 'next/image'
import { capitalize, cn } from '@/lib/utils'
import type { Item, LoadoutItemType } from '@/types'

interface CardProps {
  item: Item | null
  type?: LoadoutItemType
  variant?: 'default' | 'blue'
}

export default function ItemCard({
  item,
  type,
  variant = 'default',
}: CardProps) {
  return (
    <div className="relative flex w-full min-w-[150px] flex-col items-stretch justify-center">
      <div className="h-[64px] w-full bg-[url('/card-title-bg.jpg')] p-2 text-center">
        <h3 className="text-md text-white">{item?.name}</h3>
        <p className="text-sm text-[#ff9900]">
          {item?.type ? capitalize(item.type) : capitalize(type ?? '')}
        </p>
      </div>
      <div
        className={cn(
          'relative h-[125px] w-full grow',
          variant === 'default'
            ? "bg-[url('/card-body-bg.jpg')]"
            : "bg-[url('/card-body-bg-blue.jpg')]",
        )}
      >
        {item && (
          <Image
            src={item.path}
            alt={item.name}
            fill={true}
            className="pointer-events-none object-contain group-hover:opacity-75"
            data-testid="item-image"
          />
        )}
      </div>
    </div>
  )
}
