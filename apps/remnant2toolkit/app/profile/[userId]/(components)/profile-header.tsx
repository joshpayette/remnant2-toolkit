'use client';

import { BaseButton } from '@repo/ui';
import { BaseField } from '@repo/ui';
import { BaseInput } from '@repo/ui';
import { BaseTextarea } from '@repo/ui';
import { EditIcon } from '@repo/ui';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { AvatarSelectDialog } from '@/app/(components)/dialogs/avatar-select-dialog';
import { saveProfile } from '@/app/profile/[userId]/(actions)/save-profile';
import { AvatarBox } from '@/app/profile/[userId]/(components)/avatar-box';
import { getAvatarById } from '@/app/profile/[userId]/(lib)/get-avatar-by-id';

interface Props {
  avatarId: string;
  bio: string;
  displayName: string;
  isEditable: boolean;
  userId: string;
}

export function ProfileHeader({
  avatarId,
  bio,
  displayName,
  isEditable,
  userId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(displayName);
  const [newBio, setNewBio] = useState(bio);

  const [newAvatarId, setNewAvatarId] = useState(avatarId);
  const avatar = getAvatarById(newAvatarId);

  const [isAvatarSelectDialogOpen, setIsAvatarSelectDialogOpen] =
    useState(false);

  function resetForm() {
    setNewDisplayName(displayName);
    setNewBio(bio);
    setNewAvatarId(avatarId);
    setIsEditing(false);
  }

  return (
    <>
      <AvatarSelectDialog
        open={isAvatarSelectDialogOpen}
        onClose={() => setIsAvatarSelectDialogOpen(false)}
        onSelect={(avatarId) => {
          setNewAvatarId(avatarId);
          setIsAvatarSelectDialogOpen(false);
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
              <span className="text-surface-solid font-semibold">
                {newDisplayName}
              </span>
            </h1>
          )}
        </div>
        {isEditable && isEditing ? (
          <BaseField>
            <BaseTextarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              className="h-[150px] w-full"
            />
          </BaseField>
        ) : (
          <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-400">
            {newBio}
          </p>
        )}
        {isEditable && !isEditing && (
          <BaseButton
            plain
            className="mt-4 flex items-center justify-center underline"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon className="h-4 w-4" /> Edit Profile
          </BaseButton>
        )}
        {isEditable && isEditing && (
          <div className="mt-4 flex items-center justify-start gap-x-2">
            <BaseButton
              color="red"
              className="flex items-center justify-center"
              onClick={resetForm}
            >
              Cancel
            </BaseButton>
            <BaseButton
              color="green"
              className="flex items-center justify-center"
              onClick={async () => {
                const response = await saveProfile({
                  userId,
                  newDisplayName,
                  newBio,
                  newAvatarId,
                });

                if (!response.success) {
                  toast.error(response.message);
                } else {
                  toast.success(response.message);
                  setNewDisplayName(newDisplayName);
                  setNewBio(newBio);
                  setIsEditing(false);
                }
              }}
            >
              Save Changes
            </BaseButton>
          </div>
        )}
      </div>
    </>
  );
}
