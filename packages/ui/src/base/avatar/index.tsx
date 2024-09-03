import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from '@headlessui/react';
import { forwardRef } from 'react';
import { cn } from '../../utils/classnames';
import { TouchTarget } from '../button';
import { BaseLink } from '../link';

interface AvatarProps {
  src?: string | null;
  square?: boolean;
  initials?: string;
  alt?: string;
  className?: string;
}

export function BaseAvatar({
  src = null,
  square = false,
  initials,
  alt = '',
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<'span'>): React.ReactNode {
  return (
    <span
      className={cn(
        className,

        // Basic layout
        '*:col-start-1 *:row-start-1 inline-grid align-middle',

        // Add the correct border radius
        square
          ? '*:rounded-[20%] rounded-[20%]'
          : '*:rounded-full rounded-full',
      )}
      data-slot="avatar"
      {...props}
    >
      {initials ? (
        <svg
          aria-hidden={alt ? undefined : 'true'}
          className="select-none fill-current text-[48px] font-medium uppercase"
          viewBox="0 0 100 100"
        >
          {alt ? <title>{alt}</title> : null}
          <text
            alignmentBaseline="middle"
            dominantBaseline="middle"
            dy=".125em"
            textAnchor="middle"
            x="50%"
            y="50%"
          >
            {initials}
          </text>
        </svg>
      ) : null}
      {src ? <img alt={alt} src={src} /> : null}
      {/* Add an inset border that sits on top of the image */}
      <span
        aria-hidden="true"
        className="ring-surface-solid/5 forced-colors:outline ring-1 ring-inset"
      />
    </span>
  );
}

export const BaseAvatarButton = forwardRef(function AvatarButton(
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
  );

  return 'href' in props ? (
    <BaseLink
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>
        <BaseAvatar alt={alt} initials={initials} square={square} src={src} />
      </TouchTarget>
    </BaseLink>
  ) : (
    <HeadlessButton {...props} className={classes} ref={ref}>
      <TouchTarget>
        <BaseAvatar alt={alt} initials={initials} square={square} src={src} />
      </TouchTarget>
    </HeadlessButton>
  );
});
