import { getBuild } from '@/app/(actions)/builds/actions/get-build'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { PageHeader } from '@/features/ui/PageHeader'

export default async function Layout({
  params: { buildId },
  children,
}: {
  params: { buildId: string }
  children: React.ReactNode
}) {
  const buildData = await getBuild(buildId)
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors)
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Something went wrong!"
          subtitle="The build either can't be found or is marked private."
        />
      </div>
    )
  }

  return <>{children}</>
}
