'use client'

import { signIn, useSession } from 'next-auth/react'
import { buttonClasses } from './ActionButton'
import { cn } from '@/app/(lib)/utils'
import { BuildState } from '../../(types)/build-state'
import useBuildActions from '../(hooks)/useBuildActions'
import Skeleton from '@/app/(components)/Skeleton'

export default function SaveBuildButton({
  buildState,
}: {
  buildState: BuildState
}) {
  const { data: session, status } = useSession()
  const { handleSaveBuild } = useBuildActions()

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

  // If the build is being edited by the owner, show a save edit button
  if (buildState.createdById === session?.user?.id) {
    return (
      <button
        type="submit"
        className={cn(
          buttonClasses,
          'border-yellow-700 bg-yellow-500 text-black hover:bg-yellow-300',
        )}
        onClick={() => handleSaveBuild({ buildState, byOwner: true })}
      >
        Save Edits
      </button>
    )
  }

  return (
    <button
      type="submit"
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
      onClick={() => handleSaveBuild({ buildState, byOwner: false })}
    >
      Save Build
    </button>
  )
}
