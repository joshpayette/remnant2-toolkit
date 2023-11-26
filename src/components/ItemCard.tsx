import Image from 'next/image'
import { capitalize, cn } from '@/lib/utils'
import type { Item } from '@/types'

interface CardProps {
  item: Item
  variant?: 'default' | 'blue'
}

function CardFooter({ button }: { button: React.ReactNode }) {
  return (
    <div className="w-full bg-[url('/card-footer-bg.jpg')] p-2 text-center">
      {button}
    </div>
  )
}

export default function ItemCard({ item, variant = 'default' }: CardProps) {
  return (
    <div className="relative flex w-full flex-col items-stretch justify-center p-4">
      <div className="h-[96px] w-full bg-[url('/card-title-bg.jpg')] p-2 text-center">
        <h3 className="text-xl text-white">{item.name}</h3>
        <p className="text-md text-[#ff9900]">{capitalize(item.type)}</p>
      </div>
      <div
        className={cn(
          'relative h-[150px] w-full grow',
          variant === 'default'
            ? "bg-[url('/card-body-bg.jpg')]"
            : "bg-[url('/card-body-bg-blue.jpg')]",
        )}
      >
        <Image
          src={item.path}
          alt={item.name}
          fill={true}
          className="pointer-events-none object-contain group-hover:opacity-75"
          data-testid="item-image"
        />
      </div>
    </div>
  )
}
