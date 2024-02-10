import { Boss, BossCategory } from '@/features/bosses/types'
import { GenericItem } from '@/features/items/types/GenericItem'
import { cn } from '@/lib/classnames'
import Image from 'next/image'

export interface BossCardProps {
  boss?: Boss
  category?: BossCategory
  onClick?: () => void
}

function CardImage({ boss }: { boss: BossCardProps['boss'] }) {
  const imageSize = {
    width: 64,
    height: 64,
  }

  return (
    <div className="relative flex h-[96px] w-full grow items-center justify-center overflow-hidden bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-body-bg.jpg')]">
      {boss && (
        <Image
          src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${boss.imagePath}`}
          alt={boss.name}
          width={imageSize.width}
          height={imageSize.height}
          loading="eager"
          className="h-[96px] w-[96px]"
        />
      )}
    </div>
  )
}

export default function BossCard({ boss, onClick }: BossCardProps) {
  return (
    <div className="relative w-full min-w-full">
      <div className="flex w-full min-w-full flex-col items-center justify-center">
        <div className="h-[64px] w-full bg-[url('https://d2sqltdcj8czo5.cloudfront.net/card-title-bg.jpg')] p-2 text-center ">
          <h3 className="text-sm text-purple-400">{boss?.name}</h3>
        </div>
        {onClick ? (
          <button
            onClick={onClick}
            className="h-full max-h-full w-full max-w-full"
          >
            <CardImage boss={boss} />
          </button>
        ) : (
          <CardImage boss={boss} />
        )}
      </div>
    </div>
  )
}
