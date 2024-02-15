import { StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { getUserBio } from '@/app/profile/actions'

import { getTotalBuildFavorites } from '../../build/actions/getTotalBuildFavorites'
import { isErrorResponse } from '../../error-handling/isErrorResponse'
import { DEFAULT_DISPLAY_NAME } from '../constants'
import { Bio } from './Bio'
import { DisplayName } from './DisplayName'

interface Props {
  editable: boolean
  userId: string
}

export async function ProfileHeader({ editable, userId }: Props) {
  const [totalFavorites, userProfile] = await Promise.all([
    getTotalBuildFavorites(userId),
    getUserBio(userId),
  ])

  if (isErrorResponse(totalFavorites) || isErrorResponse(userProfile)) {
    throw new Error('Failed to get user profile')
  }

  const { displayName } = userProfile

  return (
    <div className="max-w-xl">
      <div className="mb-8 flex w-full items-center justify-center">
        <div className="flex flex-col items-center gap-x-8 gap-y-4 sm:flex-row sm:gap-y-0">
          <div className="flex flex-col items-start gap-0">
            <DisplayName
              name={displayName ?? DEFAULT_DISPLAY_NAME}
              editable={editable}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Bio
          bio={userProfile.bio ?? 'No bio is set yet.'}
          editable={editable}
        />
      </div>
      <div className="my-4 flex w-full flex-row items-center justify-center gap-1 text-2xl text-yellow-500">
        Total <StarIcon className="h-6 w-6" />: {totalFavorites}
      </div>
      {editable && (
        <div className="my-8 flex items-center justify-center">
          <Link
            className="text-md text-green-500 underline "
            href={`/profile/${userId}`}
          >
            View your public profile
          </Link>
        </div>
      )}
    </div>
  )
}
