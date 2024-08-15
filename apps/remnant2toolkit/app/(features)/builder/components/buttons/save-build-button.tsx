'use client'

import { BaseButton } from '@repo/ui/base/button'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { LoadingButton } from '@/app/(features)/builder/components/buttons/loading-button'
import { createBuild } from '@/app/(features)/builds/actions/create-build'
import { updateBuild } from '@/app/(features)/builds/actions/update-build'
import { BuildActionResponse, BuildState } from '@/app/(types)/builds'
import { isErrorResponse } from '@/app/(utils)/is-error-response'

interface Props {
  buildState: BuildState
  editMode: boolean
}

export function SaveBuildButton({ buildState, editMode }: Props) {
  const router = useRouter()

  const [saveInProgress, setSaveInProgress] = useState(false)

  const { status } = useSession()

  if (status === 'loading') return <LoadingButton />
  if (status === 'unauthenticated') {
    return (
      <BaseButton
        type="submit"
        className="sm:w-full"
        aria-label="Sign In to Save Build"
        color="red"
        onClick={() => signIn()}
      >
        Sign In to Save Build
      </BaseButton>
    )
  }

  function handleResponse(response: BuildActionResponse) {
    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error(`Error saving build. ${response.errors?.join(' ')}`)
      setSaveInProgress(false)
    } else {
      toast.success(response.message)
      setSaveInProgress(false)
      router.push(`/builder/${response.buildId}`)
    }
  }

  // If the build is being edited by the owner, show a save edit button
  if (editMode) {
    return saveInProgress ? (
      <LoadingButton />
    ) : (
      <BaseButton
        color="green"
        aria-label="Save Edits"
        className="sm:w-full"
        onClick={async () => {
          setSaveInProgress(true)
          const response = await updateBuild(JSON.stringify(buildState))
          handleResponse(response)
        }}
      >
        Save Edits
      </BaseButton>
    )
  }

  return (
    <>
      {saveInProgress ? (
        <LoadingButton />
      ) : (
        <BaseButton
          color="green"
          aria-label="Save Build"
          className="sm:w-full"
          onClick={async () => {
            setSaveInProgress(true)
            const response = await createBuild(JSON.stringify(buildState))
            handleResponse(response)
          }}
        >
          Save Build
        </BaseButton>
      )}
    </>
  )
}
