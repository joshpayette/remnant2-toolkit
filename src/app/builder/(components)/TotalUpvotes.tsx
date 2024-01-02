import ToolkittenBadge from '@/app/(components)/ToolkittenBadge'
import { cn } from '@/app/(lib)/utils'

interface Props {
  totalUpvotes: number
  isMember: boolean
}
export default function TotalUpvotes({ isMember, totalUpvotes }: Props) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-2 rounded border border-yellow-300 bg-gradient-to-b from-[#f12711] to-[#f5af19] p-4 sm:bg-gradient-to-br',
        isMember && 'border-2',
      )}
    >
      {isMember && (
        <div className="absolute right-[-15px] top-[-15px]">
          <ToolkittenBadge />
        </div>
      )}
      <div className="text-5xl font-bold text-white drop-shadow-md">
        {totalUpvotes}
      </div>
      <div className="text-md text-gray-800">
        {totalUpvotes === 1 ? 'Favorite' : 'Favorites'}
      </div>
    </div>
  )
}
