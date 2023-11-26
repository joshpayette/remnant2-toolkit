'use client'

import dynamic from 'next/dynamic'

const NoSSR = dynamic(() => import('./TrackerContainer'), { ssr: false })

export default function TrackerPage() {
  return (
    <div>
      <NoSSR />
    </div>
  )
}
