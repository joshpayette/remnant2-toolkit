import { BuildPage } from '@/app/builder/[buildId]/BuildPage'
import { getBuild } from '@/features/build/actions/getBuild'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'

export default async function Page({
  params: { buildId },
}: {
  params: { buildId: string }
}) {
  const buildData = await getBuild(buildId)
  if (isErrorResponse(buildData)) {
    console.error(buildData.errors)
    return (
      <p className="text-red text-center">
        There was an error loading this build. It may have been removed.
      </p>
    )
  }
  const { build } = buildData
  const buildState = dbBuildToBuildState(build)

  return <BuildPage buildState={buildState} />
}
