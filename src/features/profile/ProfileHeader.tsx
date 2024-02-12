'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { LoadingIndicator } from '@/features/ui/LoadingIndicator'

import { getUserBio } from '../../app/profile/actions'
import { getTotalBuildFavorites } from '../build/actions/getTotalBuildFavorites'
import { Bio } from './Bio'
import { DEFAULT_DISPLAY_NAME } from './constants'
import { DisplayName } from './DisplayName'

interface Props {
  editable: boolean
  image?: string | null
  userId: string
}

export function ProfileHeader({ editable, userId, image }: Props) {
  const [userProfile, setUserProfile] = useState<{
    bio?: string
    displayName: string
  }>({
    bio: '',
    displayName: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [totalFavorites, setTotalFavorites] = useState<number>(0)

  useEffect(() => {
    async function getTotalFavoritesAsync() {
      const totalVoteCount = await getTotalBuildFavorites()
      setTotalFavorites(totalVoteCount)
    }
    getTotalFavoritesAsync()
  }, [])

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
