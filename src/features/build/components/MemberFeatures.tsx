'use client'

import { signIn, useSession } from 'next-auth/react'

import { DescriptionWithTags } from '@/features/items/components/DescriptionWithTags'
import { Skeleton } from '@/features/ui/Skeleton'
import { Textarea } from '@/features/ui/Textarea'
import { Toggle } from '@/features/ui/Toggle'
import { cn } from '@/lib/classnames'

import { MAX_BUILD_DESCRIPTION_LENGTH } from '../constants'

type Props = {
  description: string | null
  isEditable: boolean
  isPublic: boolean | null
  isScreenshotModeActive: boolean
  onChangeDescription: (description: string) => void
  onChangeIsPublic: (isPublic: boolean) => void
}

export function MemberFeatures({
  description,
  isEditable,
  isPublic,
  isScreenshotModeActive,
  onChangeDescription,
  onChangeIsPublic,
}: Props) {
  const { data: session, status } = useSession()

  if (status === 'loading') return <Loading />

  return (
    <div className="relative h-[300px] pt-4">
      {status === 'unauthenticated' && !isScreenshotModeActive && (
        <>
          <div
            id="disabled-overlay"
            className="absolute inset-0 z-20 h-[310px] bg-black/90"
          />
          <div className="absolute z-30 mb-2 flex h-full w-full flex-col items-center justify-center text-2xl font-bold text-red-500">
            Sign in required to save additional build details.
            <button
              className="rounded-lg bg-green-500 p-2 text-lg text-black"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        </>
      )}
      {!isEditable || isScreenshotModeActive ? (
        <div className="flex flex-col">
          {description && description.length > 0 && (
            <>
              <h3 className="text-md mb-2 font-bold text-green-500">
                Build Description
              </h3>
              <div
                className={cn(
                  'h-[200px] max-h-[200px] overflow-auto whitespace-pre-wrap text-sm text-gray-200',
                  isScreenshotModeActive && 'max-h-none',
                )}
              >
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
            className="h-[215px]"
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
  )
}

function Loading() {
  return <Skeleton className="h-[300px] w-full" />
}
