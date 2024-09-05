import { AVATARS } from '@/app/(user)/profile/_constants/avatars';
import { DEFAULT_AVATAR_ID } from '@/app/(user)/profile/_constants/default-avatar-id';
import { type Avatar } from '@/app/(user)/profile/_types';

export function getAvatarById(avatarId: string): Avatar {
  const avatar = AVATARS.find((avatar) => avatar.id === avatarId);
  return avatar ?? AVATARS.find((avatar) => avatar.id === DEFAULT_AVATAR_ID)!;
}
