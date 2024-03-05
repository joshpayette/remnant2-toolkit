import { cn } from '@/lib/classnames'

interface Props {
  label: string
  showHover: boolean
}

export function EmptyLoadoutCard({ label, showHover }: Props) {
  return (
    <div
      className={cn(
        'col-span-1 flex h-full min-h-[362px] flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-500 bg-black text-center shadow',
        showHover && 'hover:scale-[1.05] hover:border-gray-300',
      )}
    >
      <p className="mt-8 p-4 text-2xl font-semibold text-gray-700">{label}</p>
    </div>
  )
}
