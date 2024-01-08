'use client'

import PageHeader from '@/app/(components)/PageHeader'

export default function Page({
  params: { buildId },
}: {
  params: { buildId: string }
}) {
  console.info('buildId', buildId)

  return (
    <>
      <PageHeader title="Authenticated User Build Editing" />
    </>
  )
}
