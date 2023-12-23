'use client'

import Textarea from '@/app/(components)/Textarea'
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

  function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value)
  }

  // If the screenshot mode is active and the user is not signed in,
  // don't render this component
  if (isScreenshotModeActive && !session) return null

  return (
    <>
      {!isScreenshotModeActive && (
        <h3 className="text-md mb-2 font-bold text-green-500">
          Member Features
        </h3>
      )}
      {!session && (
        <p className="mb-2 text-sm text-red-500">
          In order to save additional build data, please sign in.
        </p>
      )}
      <div className="relative">
        {!session && (
          <div id="disabled-overlay" className="absolute inset-0 bg-black/60" />
        )}
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
    </>
  )
}
