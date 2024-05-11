'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { getIsLoadoutPublic } from '@/app/(actions)/loadouts/get-is-loadout-public'
import { setIsLoadoutPublic } from '@/app/(actions)/loadouts/set-is-loadout-public'
import { Skeleton } from '@/app/(components)/skeleton'
import { Checkbox } from '@/features/ui/Checkbox'

interface Props {
  userId: string | undefined
}

export function LoadoutVisibilityToggle({ userId }: Props) {
  const [isLoadoutVisible, setIsLoadoutVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLoadoutVisibility() {
      if (!userId) return setIsLoading(false)
      const response = await getIsLoadoutPublic(userId)
      setIsLoadoutVisible(response)
      setIsLoading(false)
    }
    fetchLoadoutVisibility()
  }, [userId])

  async function handleTogglePublic() {
    const response = await setIsLoadoutPublic(!isLoadoutVisible)
    if (response.success) {
      setIsLoadoutVisible(!isLoadoutVisible)
      toast.success(
        `Loadout visibility set to ${!isLoadoutVisible ? 'public' : 'private'}`,
      )
    } else {
      toast.error(response.message)
    }
  }

  if (isLoading) {
    return <Skeleton className="h-[43px] w-[212px]" />
  }

  return (
    <div className="rounded-md border border-gray-500 bg-gray-900 px-4 py-2">
      <Checkbox
        label="Make loadouts public?"
        name="isLoadoutPublic"
        checked={isLoadoutVisible}
        onChange={handleTogglePublic}
      />
    </div>
  )
}
