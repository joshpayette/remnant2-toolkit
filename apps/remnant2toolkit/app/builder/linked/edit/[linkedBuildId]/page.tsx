import getLinkedBuild from '@/app/(actions)/builds/get-linked-build'
import { PageHeader } from '@/app/(components)/page-header'
import { getServerSession } from '@/app/(features)/auth'
import { isErrorResponse } from '@/app/(utils)/is-error-response'
import PageClient from '@/app/builder/linked/edit/[linkedBuildId]/page.client'

export default async function Page({
  params: { linkedBuildId },
}: {
  params: { linkedBuildId: string }
}) {
  if (!linkedBuildId) {
    return (
      <p className="text-center text-red-500">
        No build ID was provided to link.
      </p>
    )
  }

  const buildData = await getLinkedBuild(linkedBuildId)
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors)
    return (
      <p className="text-red text-center">
        There was an error loading this linked build.
      </p>
    )
  }

  const session = await getServerSession()
  if (!session || !session.user) {
    return (
      <p className="text-red text-center">
        You must be logged in to link builds.
      </p>
    )
  }

  const userId = session.user.id
  const { linkedBuildState } = buildData

  if (!linkedBuildState) {
    return (
      <p className="text-red text-center">
        This linked build could not be found.
      </p>
    )
  }

  if (session.user?.id !== linkedBuildState.createdById) {
    return (
      <p className="text-red text-center">
        You must be the creator of the build to link it to other builds.
      </p>
    )
  }

  return (
    <>
      <PageHeader
        title="Link Builds"
        subtitle="Link multiple variations of a build together in one convenient URL."
      />
      <PageClient currentLinkedBuildState={linkedBuildState} userId={userId} />
    </>
  )
}
