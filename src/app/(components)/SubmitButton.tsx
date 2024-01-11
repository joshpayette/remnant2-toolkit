'use client'

import { useFormStatus } from 'react-dom'
import LoadingIndicator from './LoadingIndicator'

export function SubmitButton({
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
    <button
      type="submit"
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
      className={className}
    >
      {!pending ? label : <LoadingIndicator />}
    </button>
  )
}
