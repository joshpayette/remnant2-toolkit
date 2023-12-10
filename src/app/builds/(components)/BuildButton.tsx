import { cn } from '@/lib/utils'

export default function BuildButton({
  onClick,
  children,
  itemName,
  showLabels,
  size = 'md',
}: {
  onClick: () => void
  children: React.ReactNode
  itemName: string | null
  showLabels: boolean
  size?: 'sm' | 'md' | 'lg' | 'wide'
}) {
  return (
    <div
      className={cn(
        'flex items-start justify-center',
        size === 'sm' && 'mb-0 flex-row',
        size === 'md' && 'mb-2 flex-col',
        size === 'lg' && 'mb-2 flex-col',
        size === 'wide' && 'mb-2 flex-col',
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          'flex items-center justify-center border-2 border-gray-700 hover:border-purple-500',
          `bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')]`,
          size === 'sm' && 'min-h-[22px] w-[22px]',
          size === 'md' && 'min-h-[66px] w-[66px]',
          size === 'lg' && 'min-h-[99px] w-[99px]',
          size === 'wide' && 'min-h-[66px] w-[150px]',
        )}
      >
        {children}
      </button>

      {showLabels && (
        <div
          className={cn(
            'flex items-center justify-center text-center text-[10px] text-white',
            itemName && 'bg-purple-950',
            size === 'sm' &&
              'min-h-[22px] min-w-[22px] border border-black px-1',
            size === 'md' && 'min-h-[22px] w-[66px] p-1',
            size === 'lg' && 'min-h-[40px] w-[99px] p-1',
            size === 'wide' && 'min-h-[22px] w-[150px] p-1',
          )}
        >
          {itemName}
        </div>
      )}
    </div>
  )
}
