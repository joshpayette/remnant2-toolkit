'use client'

import { PencilIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { isErrorResponse } from '@/features/error-handling/isErrorResponse'

import { updateUserDisplayName } from '../../../app/profile/actions'

type Props = {
  editable: boolean
  name: string
}

export function DisplayName({ editable, name }: Props) {
  const router = useRouter()

  const [newDisplayName, setNewDisplayName] = useState(name)
  const [isEditing, setIsEditing] = useState(false)

  async function handleSaveDisplayName() {
    const response = await updateUserDisplayName(
      JSON.stringify({ displayName: newDisplayName }),
    )
    if (!response) return

    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error saving display name. Please try again later.')
      return
    }

    toast.success(response.message)
    setIsEditing(false)
    setNewDisplayName(response.updatedDisplayName ?? '')
    router.refresh()
  }

  return (
    <div className="flex flex-row items-center justify-start gap-x-2">
      {isEditing ? (
        <input
          type="text"
          autoFocus
          className="border-primary-500 text-primary-400 w-full border bg-transparent p-1 text-left"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
          onBlur={handleSaveDisplayName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSaveDisplayName()
          }}
        />
      ) : (
        <>
          <h2 className="text-primary-500 text-4xl font-semibold">{name}</h2>
          {editable && (
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Edit display name"
            >
              <PencilIcon
                className="text-primary-500 hover:text-primary-300 h-4 w-4"
                aria-hidden="true"
              />
            </button>
          )}
        </>
      )}
    </div>
  )
}
