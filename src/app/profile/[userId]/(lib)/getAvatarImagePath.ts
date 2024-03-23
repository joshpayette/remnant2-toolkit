import {
  AVATARS,
  DEFAULT_AVATAR_ID,
} from '@/app/profile/[userId]/(lib)/constants'

export function getAvatarImagePath(avatarId: string) {
  const avatar = AVATARS.find((avatar) => avatar.id === avatarId)
  return avatar ? avatar.imagePath : DEFAULT_AVATAR_ID
}
