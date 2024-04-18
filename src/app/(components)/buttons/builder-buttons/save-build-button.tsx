'use client'

import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { BaseButton } from '@/app/(components)/_base/button'
import { LoadingButton } from '@/app/(components)/buttons/builder-buttons/loading-button'
import { createBuild } from '@/features/build/actions/createBuild'
import { updateBuild } from '@/features/build/actions/updateBuild'
import { BuildActionResponse, BuildState } from '@/features/build/types'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'

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
