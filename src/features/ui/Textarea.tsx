import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/classnames'

interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function Textarea({
  label,
  name,
  className,
  contentEditable,
  onChange,
  value,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-primary"
        >
          {label}
        </label>
      ) : null}
      <div className="mt-2">
        <textarea
          className={cn(
            'block w-full resize-none rounded-md border-2 border-secondary bg-white/5 py-1.5 text-sm text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-secondary',
            className,
          )}
          onChange={onChange}
          name={name}
          value={value}
          {...rest}
        />
      </div>
    </div>
  )
}
