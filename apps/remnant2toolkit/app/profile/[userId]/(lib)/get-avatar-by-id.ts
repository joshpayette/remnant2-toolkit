import {
  AVATARS,
  DEFAULT_AVATAR_ID,
} from '@/app/profile/[userId]/(lib)/constants'
import { Avatar } from '@/app/profile/[userId]/(lib)/types'

export function getAvatarById(avatarId: string): Avatar {
  const avatar = AVATARS.find((avatar) => avatar.id === avatarId)
  return avatar ?? AVATARS.find((avatar) => avatar.id === DEFAULT_AVATAR_ID)!
}
