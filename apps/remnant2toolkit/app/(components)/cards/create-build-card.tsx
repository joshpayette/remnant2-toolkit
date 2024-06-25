import Image from 'next/image'

import { Link } from '@repo/ui/base/link'
import { cn } from '@/app/(utils)/classnames'
import { getImageUrl } from '@/app/(utils)/get-image-url'

export function CreateBuildCard() {
  return (
    <Link
      className={cn(
        'border-primary-500 bg-background-solid hover:border-primary-300 col-span-1 flex h-full min-h-[362px] flex-col items-center justify-center rounded-lg border-4 text-center shadow hover:scale-[1.05]',
      )}
      href="/builder/create"
    >
      <Image
        width={100}
        height={102}
        src={getImageUrl(`/toolkit/plus-icon.png`)}
        alt="Create a New Build"
        className="mb-4"
      />
      <p className="text-surface-solid text-2xl font-bold">
        Create a New Build
      </p>
    </Link>
  )
}
