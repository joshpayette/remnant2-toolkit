import { Suspense } from 'react'

import { Skeleton } from '@/features/ui/Skeleton'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center text-center">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  )
}

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Skeleton className="h-8 w-8" />
    </div>
  )
}
