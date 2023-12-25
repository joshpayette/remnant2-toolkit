'use client'

import { signIn, useSession } from 'next-auth/react'
import { buttonClasses } from './Button'
import { cn } from '@/app/(lib)/utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { BuildState } from '../(types)'

export default function SaveBuildButton({
  buildState,
}: {
  buildState: BuildState
}) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  async function handleSaveBuild({ byOwner }: { byOwner: boolean }) {
    const response = await fetch('/api/build', {
      method: byOwner ? 'PATCH' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildState),
    })
    const data = await response.json()

    if (!response.ok) {
      toast.error(data.message)
      return
    }
    toast.success(data.message)
    setBuilderStorage({
      ...builderStorage,
      tempDescription: null,
      tempIsPublic: null,
      tempBuildId: null,
      tempCreatedById: null,
    })
    router.push(`/builder/${data.buildId}`)
    router.refresh()
  }

  if (status === 'loading') return null

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
        onClick={() => handleSaveBuild({ byOwner: true })}
      >
        Save Edits
      </button>
    )
  }

  return (
    <button
      type="submit"
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
      onClick={() => handleSaveBuild({ byOwner: false })}
    >
      Save Build
    </button>
  )
}
