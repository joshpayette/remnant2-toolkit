'use client'

import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { BuildActionResponse, BuildState } from '@/features/build/types'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { Skeleton } from '@/features/ui/Skeleton'
import { cn } from '@/lib/classnames'

import { createBuild } from '../../actions/createBuild'
import { updateBuild } from '../../actions/updateBuild'
import { DEFAULT_BUILD_NAME } from '../../constants'
import { buttonClasses } from './ActionButton'

interface Props {
  buildState: BuildState
  editMode: boolean
}

export function SaveBuildButton({ buildState, editMode }: Props) {
  const router = useRouter()

  const [saveInProgress, setSaveInProgress] = useState(false)

  const { status } = useSession()

  if (status === 'loading') return <Loading />
  if (status === 'unauthenticated') {
    return (
      <button
        type="submit"
        aria-label="Sign In to Save Build"
        className={cn(
          buttonClasses,
          'bg-red-500 text-black hover:border-red-700 hover:bg-red-300',
        )}
        onClick={() => signIn()}
      >
        Sign In to Save Build
      </button>
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

  function promptForBuildName() {
    if (buildState.name === DEFAULT_BUILD_NAME) {
      const promptResponse = prompt(
        'Naming your build can help it stand out! Want to give it a name?',
      )
      if (promptResponse !== null) {
        buildState.name = promptResponse
      }
    }
  }

  // If the build is being edited by the owner, show a save edit button
  if (editMode) {
    return saveInProgress ? (
      <div
        className={cn(
          buttonClasses,
          'hover:bg-primary-300text-black border-primary-700 bg-primary-500',
        )}
      >
        <Loading />
      </div>
    ) : (
      <button
        className={cn(
          buttonClasses,
          'border-accent2-700 bg-accent2-500 text-black hover:bg-accent2-300',
        )}
        aria-label="Save Edits"
        onClick={async () => {
          promptForBuildName()
          setSaveInProgress(true)
          const response = await updateBuild(JSON.stringify(buildState))
          handleResponse(response)
        }}
      >
        Save Edits
      </button>
    )
  }

  return (
    <>
      {saveInProgress ? (
        <div
          className={cn(
            buttonClasses,
            'border-primary-700 bg-primary-500 hover:bg-primary-300',
          )}
        >
          <Loading />
        </div>
      ) : (
        <button
          className={cn(
            buttonClasses,
            'border-accent2-700 bg-accent2-500 text-black hover:bg-accent2-300',
          )}
          aria-label="Save Build"
          onClick={async () => {
            promptForBuildName()
            setSaveInProgress(true)
            const response = await createBuild(JSON.stringify(buildState))
            handleResponse(response)
          }}
        >
          Save Build
        </button>
      )}
    </>
  )
}

function Loading() {
  return <Skeleton className="h-[40px] w-full sm:h-[60px] sm:w-[100px]" />
}
