'use client'

import PlaceHolderIcon from '@/features/ui/PlaceholderIcon'
import DisplayName from './DisplayName'
import Bio from './Bio'
import { getUserBio } from '../../app/profile/actions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LoadingIndicator from '@/features/ui/LoadingIndicator'
import { DEFAULT_DISPLAY_NAME } from './constants'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'

interface Props {
  editable: boolean
  image?: string | null
  userId: string
}

export default function ProfileHeader({ editable, userId, image }: Props) {
  const [userProfile, setUserProfile] = useState<{
    bio?: string
    displayName: string
  }>({
    bio: '',
    displayName: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUserBioAsync = async () => {
      setIsLoading(true)
      const response = await getUserBio(userId)
      if (!response) return
      if (isErrorResponse(response)) {
        console.error(response.errors)
        return
      }

      setUserProfile(response)
      setIsLoading(false)
    }
    getUserBioAsync()
  }, [userId])

  const { displayName } = userProfile

  if (isLoading) return <LoadingIndicator />

  return (
    <div className="max-w-xl">
      <div className="mb-8 flex w-full items-center justify-center">
        <div className="flex flex-col items-center gap-x-8 gap-y-4 sm:flex-row sm:gap-y-0">
          {/* {image ? (
            <img
              src={image}
              alt={`Profile picture of ${displayName}`}
              className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
            />
          ) : (
            <span className="h-24 w-24 flex-none rounded-lg bg-gray-100 object-cover">
              <PlaceHolderIcon />
            </span>
          )} */}
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
          onChangeBio={(newBio) =>
            setUserProfile({ ...userProfile, bio: newBio })
          }
        />
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
