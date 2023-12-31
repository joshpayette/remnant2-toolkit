'use client'

import { signIn, useSession } from 'next-auth/react'
import { buttonClasses } from './ActionButton'
import { cn } from '@/app/(lib)/utils'
import { BuildState } from '../../(types)/build-state'
import Skeleton from '@/app/(components)/Skeleton'
import { BuildActionResponse, createBuild, updateBuild } from '../actions'
import { toast } from 'react-toastify'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useRouter } from 'next/navigation'
import { isErrorResponse } from '@/app/(types)'

export default function SaveBuildButton({
  buildState,
}: {
  buildState: BuildState
}) {
  const router = useRouter()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  const { data: session, status } = useSession()

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
      setBuilderStorage({
        ...builderStorage,
        tempDescription: null,
        tempIsPublic: null,
        tempBuildId: null,
        tempCreatedById: null,
      })
      router.push(`/builder/${response.buildId}`)
    }
  }

  // If the build is being edited by the owner, show a save edit button
  if (buildState.createdById === session?.user?.id) {
    return (
      <button
        type="submit"
        className={cn(
          buttonClasses,
          'border-yellow-700 bg-yellow-500 text-black hover:bg-yellow-300',
        )}
        onClick={async () => {
          const response = await updateBuild(JSON.stringify(buildState))
          handleResponse(response)
        }}
      >
        Save Edits
      </button>
    )
  }

  return (
    <button
      type="submit"
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
      onClick={async () => {
        const response = await createBuild(JSON.stringify(buildState))
        handleResponse(response)
      }}
    >
      Save Build
    </button>
  )
}
