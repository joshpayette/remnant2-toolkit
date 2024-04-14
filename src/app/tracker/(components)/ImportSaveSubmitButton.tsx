'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@/app/(components)/_base/button'
import { Skeleton } from '@/features/ui/Skeleton'

export function ImportSaveSubmitButton({
  className,
  disabled = false,
  label,
}: {
  className: string
  disabled?: boolean
  label: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      color="cyan"
      type="submit"
      aria-label="Submit Form"
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
      className={className}
    >
      {!pending ? label : <Skeleton className="h-8 w-8" />}
    </Button>
  )
}
