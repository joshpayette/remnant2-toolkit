import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { PageHeader } from '@/features/ui/PageHeader'

import { getBuild } from '../../actions'
import BuildPage from './page'

export default async function Layout({
  params: { buildId },
}: {
  params: { buildId: string }
}) {
  const buildData = await getBuild(buildId)
  if (isErrorResponse(buildData)) {
    console.error(buildData.errors)
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Something went wrong!"
          subtitle="The build either can't be found or is marked private."
        />
      </div>
    )
  }
  const { build } = buildData

  return <BuildPage params={{ initialBuildState: build }} />
}
