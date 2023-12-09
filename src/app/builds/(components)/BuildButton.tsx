import { cn } from '@/lib/utils'

export default function BuildButton({
  onClick,
  children,
  itemName,
  showLabels,
}: {
  onClick: () => void
  children: React.ReactNode
  itemName: string | null
  showLabels: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-4 h-auto min-h-[64px] w-[64px] gap-2 bg-[url('https://${process.env.NEXT_PUBLIC_IMAGE_URL}/card-body-bg.jpg')] flex flex-col items-center justify-center border-2 border-gray-700 hover:border-purple-500`}
    >
      {children}
      {showLabels && (
        <div
          className={cn(
            'p-1 text-[10px] text-white',
            itemName && 'bg-purple-950',
          )}
        >
          {itemName}
        </div>
      )}
    </button>
  )
}
