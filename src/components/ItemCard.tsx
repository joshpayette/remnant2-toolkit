import Image from 'next/image'
import { capitalize, cn } from '@/lib/utils'
import type { Item, ItemType, LoadoutItem } from '@/types'

export interface ItemCardProps {
  item: Item | LoadoutItem | LoadoutItem[] | null
  type?: ItemType
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'blue'
}

export default function ItemCard({
  item,
  type,
  size = 'md',
  variant = 'default',
}: ItemCardProps) {
  if (Array.isArray(item)) {
    throw new Error('ItemCard does not support arrays')
  }

  return (
    <div
      className={cn(
        'flex w-full min-w-full flex-col items-center justify-center',
      )}
    >
      <div
        className={cn(
          "w-full bg-[url('/card-title-bg.jpg')] p-2 text-center",
          size === 'sm' && 'h-[48px]',
          size === 'md' && 'h-[80px]',
          size === 'lg' && 'h-[80px]',
        )}
      >
        <h3
          className={cn(
            'text-white',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-md',
            size === 'lg' && 'text-lg',
          )}
        >
          {item?.name}
        </h3>
        <p
          className={cn(
            'text-[#ff9900]',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-md',
          )}
        >
          {item?.type ? capitalize(item.type) : capitalize(type ?? '')}
        </p>
      </div>
      <div
        className={cn(
          'relative w-full grow',
          variant === 'default'
            ? "bg-[url('/card-body-bg.jpg')]"
            : "bg-[url('/card-body-bg-blue.jpg')]",
          size === 'sm' && 'h-[96px]',
          size === 'md' && 'h-[128px]',
          size === 'lg' && 'h-[164px]',
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
