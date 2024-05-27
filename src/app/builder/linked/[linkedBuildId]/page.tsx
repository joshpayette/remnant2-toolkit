import getLinkedBuild from '@/app/(actions)/builds/get-linked-build'
import { isErrorResponse } from '@/app/(utils)/is-error-response'
import { PageClient } from '@/app/builder/linked/[linkedBuildId]/page.client'

export default async function Page({
  params: { linkedBuildId },
}: {
  params: { linkedBuildId: string }
}) {
  const buildData = await getLinkedBuild(linkedBuildId)
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors)
    return (
      <p className="text-red text-center">
        There was an error loading this linked build. It may have been removed.
      </p>
    )
  }
  const { linkedBuildState } = buildData

  if (!linkedBuildState) {
    return (
      <p className="text-red text-center">
        There was an error loading this linked build. It may have been removed.
      </p>
    )
  }

  // return <PageClient build={build} />
  return <PageClient linkedBuildState={linkedBuildState} />
}
