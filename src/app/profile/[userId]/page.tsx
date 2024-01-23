import PageHeader from '@/app/(components)/PageHeader'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return (
    <>
      <PageHeader title="Profile" />
    </>
  )
}
