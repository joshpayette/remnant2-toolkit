'use client'

import { useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { isErrorResponse } from '@/app/(types)'
import { updateUserDisplayName } from '../actions'

type Props = {
  name: string
}

export default function DisplayName({ name }: Props) {
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
          className="w-full border border-green-500 bg-transparent p-1 text-left text-green-400"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
          onBlur={handleSaveDisplayName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSaveDisplayName()
          }}
        />
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-green-500">{name}</h2>
          <button onClick={() => setIsEditing(true)}>
            <PencilIcon
              className="h-4 w-4 text-green-500 hover:text-green-300"
              aria-hidden="true"
            />
          </button>
        </>
      )}
    </div>
  )
}
