'use client'

import { PencilIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { BaseButton } from '@/app/(components)/_base/button'
import { BaseInput } from '@/app/(components)/_base/input'
import { SelectAvatarDialog } from '@/app/(components)/dialogs/select-avatar-dialog'
import { AvatarBox } from '@/app/profile/[userId]/(components)/AvatarBox'
import { getAvatarById } from '@/app/profile/[userId]/(lib)/getAvatarById'
import { saveProfile } from '@/app/profile/[userId]/saveProfile'
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
  const avatar = getAvatarById(newAvatarId)

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
      <SelectAvatarDialog
        open={isAvatarSelectDialogOpen}
        onClose={() => setIsAvatarSelectDialogOpen(false)}
        onSelect={(avatarId) => {
          setNewAvatarId(avatarId)
          setIsAvatarSelectDialogOpen(false)
        }}
      />
      <div className="flex w-full flex-col items-center justify-center gap-y-2 sm:w-auto sm:items-start">
        <AvatarBox avatar={avatar} />

        {isEditable && isEditing ? (
          <BaseButton
            plain
            className="text-center underline"
            onClick={() => setIsAvatarSelectDialogOpen(true)}
          >
            Change Avatar
          </BaseButton>
        ) : null}
      </div>
      <div className="w-full">
        <div className="flex max-w-md items-center gap-x-3">
          {isEditable && isEditing ? (
            <BaseInput
              onChange={(e) => setNewDisplayName(e.target.value)}
              value={newDisplayName}
            />
          ) : (
            <h1 className="flex gap-x-3 text-2xl leading-7">
              <span className="font-semibold text-on-background">{newDisplayName}</span>
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
          <p className="mt-2 max-w-4xl text-sm leading-6 text-outline">
            {newBio}
          </p>
        )}
        {isEditable && !isEditing && (
          <BaseButton
            plain
            className="mt-4 flex items-center justify-center underline"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="h-4 w-4" /> Edit Profile
          </BaseButton>
        )}
        {isEditable && isEditing && (
          <div className="mt-4 flex items-center justify-start gap-x-2">
            <BaseButton
              plain
              className="flex items-center justify-center"
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
            </BaseButton>
            <BaseButton
              color="red"
              className="flex items-center justify-center"
              onClick={resetForm}
            >
              Cancel
            </BaseButton>
          </div>
        )}
      </div>
    </>
  )
}
