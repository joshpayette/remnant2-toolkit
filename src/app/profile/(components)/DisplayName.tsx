'use client'

import { useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Props = {
  name: string
}

export default function DisplayName({ name }: Props) {
  const router = useRouter()

  const [newDisplayName, setNewDisplayName] = useState(name)
  const [isEditing, setIsEditing] = useState(false)

  async function handleSave() {
    const response = await fetch('/api/user/edit', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ displayName: newDisplayName }),
    })
    const data = await response.json()

    if (!response.ok) {
      toast.error(data.message)
      return
    }
    toast.success(data.message)
    setIsEditing(false)
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
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
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
