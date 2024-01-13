'use client'

import { isErrorResponse } from '@/app/(types)'
import { createBuild } from '@/app/builder/actions'
import { extendedBuildToBuildState } from '@/app/(lib)/build'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ExtendedBuild } from '@/app/(types)/build'

export default function DuplicateBuildButton({
  build,
}: {
  build: ExtendedBuild
}) {
  const router = useRouter()

  async function handleDuplicateBuild() {
    const buildState = extendedBuildToBuildState(build)
    const newBuildName = `${build.name} (copy)`
    const newBuildState = { ...buildState, name: newBuildName }
    const response = await createBuild(JSON.stringify(newBuildState))
    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error duplicating build. Please try again later.')
    } else {
      toast.success(response.message)
      router.push(`/builder/${response.buildId}`)
    }
  }

  return (
    <button
      className="text-yellow-500 hover:text-yellow-300"
      onClick={handleDuplicateBuild}
    >
      Duplicate Build
    </button>
  )
}
