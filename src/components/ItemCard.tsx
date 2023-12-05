import { capitalize, cn } from '@/lib/utils'
import type { Item, ItemType, LoadoutItem } from '@/types'
import Image from 'next/image'

export interface ItemCardProps {
  actions?: React.ReactNode
  item: Item | LoadoutItem | null
  type?: ItemType
  size?: 'sm' | 'md' | 'lg'
  showFooter?: boolean
  variant?: 'default' | 'blue'
}

export default function ItemCard({
  actions,
  item,
  type,
  size = 'md',
  showFooter = true,
  variant = 'default',
}: ItemCardProps) {
  return (
    <div className="relative w-full min-w-full">
      <div
        className={cn(
          'flex w-full min-w-full flex-col items-center justify-center',
        )}
      >
        <div
          className={cn(
            "w-full bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-title-bg.jpg')] p-2 text-center",
            size === 'sm' && 'h-[48px]',
            size === 'md' && 'h-[80px]',
            size === 'lg' && 'h-[80px]',
          )}
        >
          <h3
            className={cn(
              'text-purple-400',
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
            {item?.type ? capitalize(item.type) : capitalize(type || '')}
          </p>
        </div>
        <div
          className={cn(
            'relative flex w-full grow items-center justify-center',
            variant === 'default'
              ? "bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-body-bg.jpg')]"
              : "bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-body-bg-blue.jpg')]",
            size === 'sm' && 'h-[64px]',
            size === 'md' && 'h-[128px]',
            size === 'lg' && 'h-[164px]',
          )}
        >
          {item && (
            <Image
              src={`https://d2sqltdcj8czo5.cloudfront.net${item.path}`}
              alt={item.name}
              className="pointer-events-none h-full max-h-full w-auto max-w-full"
              data-testid="item-image"
              width={64}
              height={64}
            />
          )}
        </div>
        {actions && showFooter && (
          <div className="flex w-full items-center justify-center bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-footer-bg-darker.jpg')] p-1">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
