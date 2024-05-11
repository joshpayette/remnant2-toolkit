import { getBuild } from '@/app/(actions)/builds/get-build'
import { isErrorResponse } from '@/app/(utils)/is-error-response'
import { BuildPage } from '@/app/builder/[buildId]/BuildPage'

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

  return <BuildPage build={build} />
}
