import { getPermittedBuilder } from '@/app/(builds)/_libs/permitted-builders';
import { AVATARS } from '@/app/(user)/profile/_constants/avatars';
import { DEFAULT_AVATAR_ID } from '@/app/(user)/profile/_constants/default-avatar-id';
import { type Avatar } from '@/app/(user)/profile/_types';

export function getAvatarById(
  avatarId: string,
  userId: string | undefined,
): Avatar {
  if (userId) {
    const permittedBuilder = getPermittedBuilder(userId);
    if (avatarId === userId && permittedBuilder) {
      if (permittedBuilder && permittedBuilder.avatar) {
        return {
          id: permittedBuilder.userId,
          name: permittedBuilder.name,
          imagePath: permittedBuilder.avatar,
          bgColor: permittedBuilder.avatarBgColor,
        };
      }
    }
  }

  const avatar = AVATARS.find((avatar) => avatar.id === avatarId);
  return avatar ?? AVATARS.find((avatar) => avatar.id === DEFAULT_AVATAR_ID)!;
}
