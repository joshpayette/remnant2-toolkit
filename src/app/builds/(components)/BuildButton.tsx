import { cn } from '@/lib/utils'
import { Fragment } from 'react'

export default function BuildButton({
  onClick,
  children,
  itemName,
  showLabels,
  size = 'lg',
}: {
  onClick: () => void
  children: React.ReactNode
  itemName: string | null
  showLabels: boolean
  size?: 'sm' | 'lg'
}) {
  return (
    <div
      className={cn(
        'flex items-start justify-start',
        size === 'lg' && 'flex-col',
        size === 'sm' && 'flex-row',
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          'flex items-center justify-center border-2 border-gray-700 hover:border-purple-500',
          `bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')]`,
          size === 'lg' && 'min-h-[66px] w-[66px]',
          size === 'sm' && 'min-h-[22px] w-[22px]',
        )}
      >
        {children}
      </button>
      {showLabels && (
        <div
          className={cn(
            'flex grow items-center justify-center text-center text-[10px] text-white',
            itemName && 'bg-purple-950',
            size === 'lg' && 'mb-4 w-[66px] p-1',
            size === 'sm' &&
              'mb-0 min-h-[22px] min-w-[22px] border border-black px-1',
          )}
        >
          {itemName}
        </div>
      )}
    </div>
  )
}
