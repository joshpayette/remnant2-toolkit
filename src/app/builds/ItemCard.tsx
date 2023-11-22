import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Item } from '@/types'

interface CardProps {
  item: Item
  variant?: 'default' | 'blue'
}

function CardTitle({ name, slot }: { name: string; slot: string }) {
  // Capitalize first letter of slot
  const slotCapitalized = slot.charAt(0).toUpperCase() + slot.slice(1)

  return (
    <div className="w-full bg-[url('/card-title-bg.jpg')] p-2 text-center">
      <h3 className="text-2xl text-white">{name}</h3>
      <p className="text-lg text-[#ff9900]">{slotCapitalized}</p>
    </div>
  )
}

function CardBody({
  name,
  path,
  variant = 'default',
}: {
  name: string
  path: string
  variant?: CardProps['variant']
}) {
  return (
    <div
      className={cn(
        'relative h-[150px] w-full',
        variant === 'default'
          ? "bg-[url('/card-body-bg.jpg')]"
          : "bg-[url('/card-body-bg-blue.jpg')]",
      )}
    >
      <Image
        src={path}
        alt={name}
        fill={true}
        className="pointer-events-none object-contain group-hover:opacity-75"
      />
    </div>
  )
}

function CardFooter() {
  return (
    <div className="w-full bg-[url('/card-footer-bg.jpg')] p-2 text-center">
      <p className="text-lg text-white">Footer</p>
    </div>
  )
}

export default function ItemCard({ item, variant = 'default' }: CardProps) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center p-4">
      <CardTitle name={item.name} slot={item.slot} />
      <CardBody name={item.name} path={item.path} variant={variant} />
    </div>
  )
}
