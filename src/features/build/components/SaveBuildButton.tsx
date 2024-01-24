'use client'

import { signIn, useSession } from 'next-auth/react'
import { buttonClasses } from './ActionButton'
import { cn } from '@/lib/utils'
import Skeleton from '@/components/Skeleton'
import {
  BuildActionResponse,
  createBuild,
  updateBuild,
} from '../../../app/builder/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { isErrorResponse } from '@/types'
import { useState } from 'react'
import LoadingIndicator from '@/components/LoadingIndicator'
import { BuildState } from '@/features/build/types'

interface Props {
  buildState: BuildState
  editMode: boolean
}

export default function SaveBuildButton({ buildState, editMode }: Props) {
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
