import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from '@headlessui/react'
import React from 'react'

import { cn } from '../classnames'
import { TouchTarget } from './button'
import { BaseLink } from './link'

type AvatarProps = {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
}

export function BaseAvatar({
  src = null,
  square = false,
  initials,
  alt = '',
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="avatar"
      className={cn(
        className,

        // Basic layout
        '*:col-start-1 *:row-start-1 inline-grid align-middle',

        // Add the correct border radius
        square
          ? '*:rounded-[20%] rounded-[20%]'
          : '*:rounded-full rounded-full',
      )}
      {...props}
    >
      {initials && (
        <svg
          className="select-none fill-current text-[48px] font-medium uppercase"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : 'true'}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
          >
            {initials}
          </text>
        </svg>
      )}
      {src && <img src={src} alt={alt} />}
      {/* Add an inset border that sits on top of the image */}
      <span
        className="ring-surface-solid/5 forced-colors:outline ring-1 ring-inset"
        aria-hidden="true"
      />
    </span>
  )
}

export const BaseAvatarButton = React.forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    ...props
  }: AvatarProps &
    (HeadlessButtonProps | React.ComponentPropsWithoutRef<typeof BaseLink>),
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classes = cn(
    className,
    square ? 'rounded-lg' : 'rounded-full',
    'relative focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
  )

  return 'href' in props ? (
    <BaseLink
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>
        <BaseAvatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </BaseLink>
  ) : (
    <HeadlessButton {...props} className={classes} ref={ref}>
      <TouchTarget>
        <BaseAvatar src={src} square={square} initials={initials} alt={alt} />
      </TouchTarget>
    </HeadlessButton>
  )
})
