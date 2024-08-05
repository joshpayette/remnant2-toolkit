import { getBuild } from '@/app/(features)/builds/actions/get-build'
import { isErrorResponse } from '@/app/(utils)/is-error-response'
import { PageClient } from '@/app/builder/[buildId]/page.client'

export default async function Page({
  params: { buildId },
}: {
  params: { buildId: string }
}) {
  const buildData = await getBuild(buildId)

  if (isErrorResponse(buildData)) {
    console.info(buildData.errors)
    return (
      <p className="text-red text-center">
        There was an error loading this build. It may have been removed.
      </p>
    )
  }
  const { build } = buildData

  return <PageClient build={build} />
}
