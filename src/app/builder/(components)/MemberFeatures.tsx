'use client'

import Textarea from '@/app/(components)/Textarea'
import Toggle from '@/app/(components)/Toggle'
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(lib)/constants'
import { useSession } from 'next-auth/react'

type Props = {
  description: string | null
  isEditable: boolean
  isPublic: boolean | null
  isScreenshotModeActive: boolean
  onChangeDescription: (description: string) => void
  onChangeIsPublic: (isPublic: boolean) => void
}

export default function MemberFeatures({
  description,
  isEditable,
  isPublic,
  isScreenshotModeActive,
  onChangeDescription,
  onChangeIsPublic,
}: Props) {
  const { data: session } = useSession()

  // If the screenshot mode is active and the user is not signed in,
  // don't render this component
  if (isScreenshotModeActive && !session) return null

  return (
    <>
      <hr className="border-green-900 py-2" />
      {!session && (
        <p className="mb-2 text-sm text-red-500">
          In order to save additional build data, please sign in.
        </p>
      )}
      <div className="relative">
        {!session && (
          <div id="disabled-overlay" className="absolute inset-0 bg-black/60" />
        )}
        {isScreenshotModeActive || !isEditable ? (
          <div className="flex flex-col">
            <h3 className="text-md mb-2 font-bold text-green-500">
              Build Description
            </h3>
            <div className="text-sm text-gray-200">{description}</div>
          </div>
        ) : (
          <div className="mb-4">
            <Textarea
              label={`Build Description (${
                description?.length ?? 0
              }/${MAX_BUILD_DESCRIPTION_LENGTH})`}
              name="description"
              placeholder=""
              onChange={(e) => onChangeDescription(e.target.value)}
              value={description ?? ''}
              maxLength={MAX_BUILD_DESCRIPTION_LENGTH}
              rows={3}
            />
          </div>
        )}

        {isScreenshotModeActive || !isEditable ? (
          <div className="flex flex-col">
            <div className="text-md my-2 font-bold text-green-500">
              Build Visibility
            </div>
            <div className="text-sm text-gray-200">
              {isPublic ? 'Public' : 'Private'}
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-start text-sm text-green-500">
            <div className="mr-4">Public Build</div>
            <div className="">
              <Toggle
                enabled={Boolean(isPublic)}
                setEnabled={onChangeIsPublic}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
