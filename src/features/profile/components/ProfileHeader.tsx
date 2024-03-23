'use client'

import { PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { saveProfile } from '@/app/profile/[userId]/saveProfile'
import { Avatar } from '@/features/profile/components/Avatar'
import { AvatarSelectDialog } from '@/features/profile/components/AvatarSelectDialog'
import { getAvatarImagePath } from '@/features/profile/lib/getAvatarImagePath'
import { Input } from '@/features/ui/Input'
import { Textarea } from '@/features/ui/Textarea'

interface Props {
  avatarId: string
  bio: string
  displayName: string
  isEditable: boolean
  userId: string
}

export function ProfileHeader({
  avatarId,
  bio,
  displayName,
  isEditable,
  userId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState(displayName)
  const [newBio, setNewBio] = useState(bio)

  const [newAvatarId, setNewAvatarId] = useState(avatarId)
  const avatarImage = getAvatarImagePath(newAvatarId)

  const [isAvatarSelectDialogOpen, setIsAvatarSelectDialogOpen] =
    useState(false)

  function resetForm() {
    setNewDisplayName(displayName)
    setNewBio(bio)
    setNewAvatarId(avatarId)
    setIsEditing(false)
  }

  return (
    <>
      <AvatarSelectDialog
        open={isAvatarSelectDialogOpen}
        onClose={() => setIsAvatarSelectDialogOpen(false)}
        onSelect={(avatarId) => {
          setNewAvatarId(avatarId)
          setIsAvatarSelectDialogOpen(false)
        }}
      />
      <div className="flex w-full flex-col items-center justify-center gap-y-2 sm:w-auto sm:items-start">
        <Avatar imagePath={avatarImage} alt={`${newDisplayName}'s avatar`} />

        {isEditable && isEditing ? (
          <button
            className="text-center text-primary-400 underline hover:text-primary-300"
            onClick={() => setIsAvatarSelectDialogOpen(true)}
          >
            Change Avatar
          </button>
        ) : null}
      </div>
      <div className="w-full">
        <div className="flex max-w-md items-center gap-x-3">
          {isEditable && isEditing ? (
            <Input
              onChange={(e) => setNewDisplayName(e.target.value)}
              value={newDisplayName}
            />
          ) : (
            <h1 className="flex gap-x-3 text-2xl leading-7">
              <span className="font-semibold text-white">{newDisplayName}</span>
            </h1>
          )}
        </div>
        {isEditable && isEditing ? (
          <Textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="h-[150px] w-full"
          />
        ) : (
          <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-400">
            {newBio}
          </p>
        )}
        {isEditable && !isEditing && (
          <button
            className="mt-4 flex items-center justify-center text-sm font-medium text-primary-400 underline hover:text-primary-300"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="mr-2 h-4 w-4" /> Edit Profile
          </button>
        )}
        {isEditable && isEditing && (
          <div className="mt-4 flex items-center justify-start gap-x-2">
            <button
              className="flex items-center justify-center rounded-md border border-primary-500 bg-primary-700 p-2 text-sm font-medium hover:bg-primary-500"
              onClick={async () => {
                const response = await saveProfile({
                  userId,
                  newDisplayName,
                  newBio,
                  newAvatarId,
                })

                if (!response.success) {
                  toast.error(response.message)
                } else {
                  toast.success(response.message)
                  setIsEditing(false)
                }
              }}
            >
              Save Changes
            </button>
            <button
              className="flex items-center justify-center p-2 text-red-400 hover:text-red-300"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  )
}
