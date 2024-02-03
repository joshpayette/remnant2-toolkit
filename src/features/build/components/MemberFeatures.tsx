'use client'

import Textarea from '@/features/ui/Textarea'
import Toggle from '@/features/ui/Toggle'
import { signIn, useSession } from 'next-auth/react'
import { MAX_BUILD_DESCRIPTION_LENGTH } from '../constants'
import DescriptionWithTags from '@/features/items/components/DescriptionWithTags'

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

  return (
    <div className="pt-4">
      {!session && !isScreenshotModeActive && (
        <p className="mb-2 text-sm text-red-500">
          In order to save additional build data, please{' '}
          <button className="underline" onClick={() => signIn()}>
            sign in.
          </button>
        </p>
      )}
      <div className="relative">
        {!session && !isScreenshotModeActive && (
          <div
            id="disabled-overlay"
            className="absolute inset-0 z-20 bg-black/60"
          />
        )}
        {!isEditable || isScreenshotModeActive ? (
          <div className="flex flex-col">
            {description && description.length > 0 && (
              <>
                <h3 className="text-md mb-2 font-bold text-green-500">
                  Build Description
                </h3>
                <div className="whitespace-pre-wrap text-sm text-gray-200">
                  <DescriptionWithTags description={description} />
                </div>
              </>
            )}
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
              rows={6}
            />
          </div>
        )}
        {isScreenshotModeActive ? null : (
          <>
            {isEditable ? (
              <div className="flex flex-row items-center justify-start text-sm text-green-500">
                <div className="mr-4">Public Build</div>
                <div className="flex items-center justify-start">
                  <Toggle
                    enabled={Boolean(isPublic)}
                    setEnabled={onChangeIsPublic}
                  />
                  <a
                    href="https://github.com/joshpayette/remnant2-toolkit/blob/main/CODE_OF_CONDUCT.md"
                    target="_blank"
                    className="ml-2 text-xs text-purple-500 underline"
                  >
                    Code of Conduct
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="text-md my-2 font-bold text-green-500">
                  Build Visibility
                </div>
                <div className="text-sm text-gray-200">
                  {isPublic ? 'Public' : 'Private'}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
