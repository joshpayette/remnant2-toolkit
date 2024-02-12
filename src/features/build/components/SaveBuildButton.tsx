'use client'

import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  BuildActionResponse,
  createBuild,
  updateBuild,
} from '@/app/builder/actions'
import { BuildState } from '@/features/build/types'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { LoadingIndicator } from '@/features/ui/LoadingIndicator'
import { Skeleton } from '@/features/ui/Skeleton'
import { cn } from '@/lib/classnames'

import { buttonClasses } from './ActionButton'

interface Props {
  buildState: BuildState
  editMode: boolean
}

export function SaveBuildButton({ buildState, editMode }: Props) {
  const router = useRouter()

  const [saveInProgress, setSaveInProgress] = useState(false)

  const { status } = useSession()

  if (status === 'loading') return <Skeleton />
  if (status === 'unauthenticated') {
    return (
      <button
        type="submit"
        className={cn(buttonClasses, 'border-red-500 hover:bg-red-700')}
        onClick={() => signIn()}
      >
        Sign In to Save Build
      </button>
    )
  }

  function handleResponse(response: BuildActionResponse) {
    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error saving build. Please try again later.')
    } else {
      toast.success(response.message)
      setSaveInProgress(false)
      router.push(`/builder/${response.buildId}`)
    }
  }

  // If the build is being edited by the owner, show a save edit button
  if (editMode) {
    return saveInProgress ? (
      <div
        className={cn(
          buttonClasses,
          'border-yellow-700 bg-yellow-500 text-black hover:bg-yellow-300',
        )}
      >
        <LoadingIndicator />
      </div>
    ) : (
      <button
        className={cn(
          buttonClasses,
          'border-yellow-700 bg-yellow-500 text-black hover:bg-yellow-300',
        )}
        onClick={async () => {
          setSaveInProgress(true)
          const response = await updateBuild(JSON.stringify(buildState))
          handleResponse(response)
        }}
      >
        Save Edits
      </button>
    )
  }

  return saveInProgress ? (
    <div
      className={cn(
        buttonClasses,
        'border-transparent bg-green-500 hover:bg-green-700',
      )}
    >
      <LoadingIndicator />
    </div>
  ) : (
    <button
      className={cn(
        buttonClasses,
        'border-transparent bg-green-500 text-black hover:bg-green-700 hover:text-white',
      )}
      onClick={async () => {
        setSaveInProgress(true)
        const response = await createBuild(JSON.stringify(buildState))
        handleResponse(response)
      }}
    >
      Save Build
    </button>
  )
}
