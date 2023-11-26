import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Item } from '@/types'

interface CardProps {
  item: Item
  variant?: 'default' | 'blue'
  button?: React.ReactNode
}

function CardTitle({ name, type }: { name: string; type: string }) {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div className="w-full bg-[url('/card-title-bg.jpg')] p-2 text-center">
      <h3 className="text-xl text-white">{name}</h3>
      <p className="text-md text-[#ff9900]">{capitalizedType}</p>
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
        'relative h-[150px] w-full grow',
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
        data-testid="item-image"
      />
    </div>
  )
}

function CardFooter({ button }: { button: React.ReactNode }) {
  return (
    <div className="w-full bg-[url('/card-footer-bg.jpg')] p-2 text-center">
      {button}
    </div>
  )
}

export default function ItemCard({
  item,
  button,
  variant = 'default',
}: CardProps) {
  return (
    <div className="relative flex w-full flex-col items-stretch justify-center p-4">
      <CardTitle name={item.name} type={item.type} />
      <CardBody name={item.name} path={item.path} variant={variant} />
      {button && <CardFooter button={button} />}
    </div>
  )
}
