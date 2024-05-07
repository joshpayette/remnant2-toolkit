import Image from 'next/image'

import { Link } from '@/app/(components)/_base/link'
import { cn } from '@/lib/classnames'

export function CreateBuildCard() {
  return (
    <Link
      className={cn(
        'col-span-1 flex h-full min-h-[362px] flex-col items-center justify-center rounded-lg border-4 border-primary bg-background text-center shadow hover:scale-[1.05] hover:border-primary-inverse',
      )}
      href="/builder/create"
    >
      <Image
        width={100}
        height={102}
        src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/plus-icon.png`}
        alt="Create a New Build"
        className="mb-4"
      />
      <p className="text-2xl font-bold text-on-background">Create a New Build</p>
    </Link>
  )
}
