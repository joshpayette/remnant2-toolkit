'use client';

import {
  BaseButton,
  BaseField,
  BaseInput,
  BaseTextarea,
  EditIcon,
  SubscribeIcon,
  UnsubscribeIcon,
} from '@repo/ui';
import { useRouter } from 'next/navigation';
import { startTransition, useOptimistic, useState } from 'react';
import { toast } from 'react-toastify';

import { Tooltip } from '@/app/_components/tooltip';
import { saveProfile } from '@/app/(user)/profile/_actions/save-profile';
import { subscribeToUser } from '@/app/(user)/profile/_actions/subscribe-to-user';
import { unsubscribeFromUser } from '@/app/(user)/profile/_actions/unsubscribe-from-user';
import { AvatarBox } from '@/app/(user)/profile/_components/avatar-box';
import { AvatarSelectDialog } from '@/app/(user)/profile/_components/avatar-select-dialog';
import { getAvatarById } from '@/app/(user)/profile/_utils/get-avatar-by-id';

interface Props {
  avatarId: string;
  bio: string;
  displayName: string;
  isEditable: boolean;
  isUserFollowing: boolean;
  profileId: string;
  showNotifications: boolean;
}

export function ProfileHeader({
  avatarId,
  bio,
  displayName,
  isEditable,
  isUserFollowing,
  profileId,
  showNotifications,
}: Props) {
  const router = useRouter();

  const [optimisticSubscription, setOptimisticSubscription] = useOptimistic<
    boolean,
    boolean
  >(isUserFollowing, (_state, newSubscriptionStatus) => newSubscriptionStatus);

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

  async function onSaveChanges() {
    const response = await saveProfile({
      userId: profileId,
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
  }

  async function onSubscribe() {
    startTransition(async () => {
      setOptimisticSubscription(true);
      const response = await subscribeToUser({ userId: profileId });
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.refresh();
      }
    });
  }

  async function onUnsubscribe() {
    startTransition(async () => {
      setOptimisticSubscription(false);
      const response = await unsubscribeFromUser({ userId: profileId });
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.refresh();
      }
    });
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
        <div className="mt-4 flex items-center">
          {isEditable && !isEditing && (
            <BaseButton
              className="flex items-center justify-center"
              onClick={() => setIsEditing(true)}
            >
              <EditIcon className="h-4 w-4" /> Edit Profile
            </BaseButton>
          )}
          {isEditable && isEditing && (
            <div className="flex items-center justify-start gap-x-2">
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
                onClick={onSaveChanges}
              >
                Save Changes
              </BaseButton>
            </div>
          )}
          {optimisticSubscription && showNotifications && (
            <Tooltip content="Unsubscribe from this user to stop receiving notifications when they post new builds.">
              <BaseButton
                color="red"
                className="ml-4 flex items-center justify-center"
                onClick={onUnsubscribe}
              >
                <UnsubscribeIcon className="h-4 w-4" /> Unsubscribe
              </BaseButton>
            </Tooltip>
          )}
          {!optimisticSubscription && showNotifications && (
            <Tooltip content="Subscribe to this user to receive notifications when they post new builds.">
              <BaseButton
                color="green"
                className="ml-4 flex items-center justify-center"
                onClick={onSubscribe}
              >
                <SubscribeIcon className="h-4 w-4" /> Subscribe
              </BaseButton>
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
}
