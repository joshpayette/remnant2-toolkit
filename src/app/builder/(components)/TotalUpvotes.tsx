import MemberBadge from '@/app/(components)/PopularBuildBadge'
import { cn } from '@/app/(lib)/utils'

interface Props {
  totalUpvotes: number
}
export default function TotalUpvotes({ totalUpvotes }: Props) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-2 rounded border border-yellow-300 bg-gradient-to-b from-[#f12711] to-[#f5af19] p-4 sm:bg-gradient-to-br',
      )}
    >
      <div className="text-5xl font-bold text-white drop-shadow-md">
        {totalUpvotes}
      </div>
      <div className="text-md text-gray-800">
        {totalUpvotes === 1 ? 'Favorite' : 'Favorites'}
      </div>
    </div>
  )
}
