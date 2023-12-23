'use client'

import { signIn, useSession } from 'next-auth/react'
import useBuildSearchParams from '../(hooks)/useBuildSearchParams'
import { buttonClasses } from './Button'
import { cn } from '@/app/(lib)/utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function SaveBuildButton() {
  const router = useRouter()
  const { status } = useSession()
  const { currentBuildState } = useBuildSearchParams()

  async function handleSaveBuild() {
    const response = await fetch('/api/build', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentBuildState),
    })
    const data = await response.json()
    toast.success(data.message)
    router.push(`/builder/${data.buildId}`)
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

  return (
    <button
      type="submit"
      className={cn(buttonClasses, 'border-green-500 hover:bg-green-700')}
      onClick={handleSaveBuild}
    >
      Save Build
    </button>
  )
}
