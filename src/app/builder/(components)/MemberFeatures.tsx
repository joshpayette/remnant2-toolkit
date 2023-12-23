'use client'

import Textarea from '@/app/(components)/Textarea'
import Toggle from '@/app/(components)/Toggle'
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(lib)/constants'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function MemberFeatures({
  isScreenshotModeActive,
}: {
  isScreenshotModeActive: boolean
}) {
  const { data: session } = useSession()

  // form fields
  const [description, setDescription] = useState('')
  const [buildPublic, setBuildPublic] = useState(false)

  function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value)
  }

  // If the screenshot mode is active and the user is not signed in,
  // don't render this component
  if (isScreenshotModeActive && !session) return null

  return (
    <>
      {!session && (
        <p className="mb-2 text-sm text-red-500">
          In order to save additional build data, please sign in.
        </p>
      )}
      <div className="relative">
        {!session && (
          <div id="disabled-overlay" className="absolute inset-0 bg-black/60" />
        )}
        {isScreenshotModeActive ? (
          <div className="flex flex-col">
            <h3 className="text-md mb-2 font-bold text-green-500">
              Build Description
            </h3>
            <div className="text-sm text-gray-200">{description}</div>
          </div>
        ) : (
          <div className="mb-4">
            <Textarea
              label={`Build Description (${description.length}/${MAX_BUILD_DESCRIPTION_LENGTH})`}
              name="description"
              placeholder=""
              onChange={handleChangeDescription}
              value={description}
              maxLength={MAX_BUILD_DESCRIPTION_LENGTH}
              rows={3}
            />
          </div>
        )}

        {!isScreenshotModeActive && (
          <div className="flex flex-row items-center justify-start text-sm text-green-500">
            <div className="mr-4">Public Build</div>
            <div className="">
              <Toggle enabled={buildPublic} setEnabled={setBuildPublic} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
