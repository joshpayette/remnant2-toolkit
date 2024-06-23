import {
  Description as HeadlessDescription,
  type DescriptionProps as HeadlessDescriptionProps,
  Field as HeadlessField,
  type FieldProps as HeadlessFieldProps,
  Fieldset as HeadlessFieldset,
  type FieldsetProps as HeadlessFieldsetProps,
  Label as HeadlessLabel,
  type LabelProps as HeadlessLabelProps,
  Legend as HeadlessLegend,
  type LegendProps as HeadlessLegendProps,
} from '@headlessui/react'
import clsx from 'clsx'
import type React from 'react'

export function BaseFieldset({
  className,
  ...props
}: { disabled?: boolean } & HeadlessFieldsetProps) {
  return (
    <HeadlessFieldset
      {...props}
      className={clsx(
        className,
        '[&>*+[data-slot=control]]:mt-2 [&>[data-slot=text]]:mt-1',
      )}
    />
  )
}

export function BaseLegend({ ...props }: HeadlessLegendProps) {
  return (
    <HeadlessLegend
      {...props}
      data-slot="legend"
      className={clsx(
        props.className,
        'text-surface-solid text-base/6 font-semibold data-[disabled]:opacity-50 sm:text-sm/6',
      )}
    />
  )
}

export function BaseFieldGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      data-slot="control"
      className={clsx(className, 'space-y-8')}
    />
  )
}

export function BaseField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      className={clsx(
        className,
        '[&>[data-slot=label]+[data-slot=control]]:mt-3',
        '[&>[data-slot=label]+[data-slot=description]]:mt-1',
        '[&>[data-slot=description]+[data-slot=control]]:mt-3',
        '[&>[data-slot=control]+[data-slot=description]]:mt-3',
        '[&>[data-slot=control]+[data-slot=error]]:mt-3',
        '[&>[data-slot=label]]:font-medium',
      )}
      {...props}
    />
  )
}

export function BaseLabel({
  className,
  ...props
}: { className?: string } & HeadlessLabelProps) {
  return (
    <HeadlessLabel
      {...props}
      data-slot="label"
      className={clsx(
        className,
        'text-surface-solid select-none text-base/6 data-[disabled]:opacity-50 sm:text-sm/6',
      )}
    />
  )
}

export function BaseDescription({
  className,
  disabled: _disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      data-slot="description"
      className={clsx(
        className,
        'text-base/6 text-zinc-400 data-[disabled]:opacity-50 sm:text-sm/6',
      )}
    />
  )
}

export function BaseErrorMessage({
  className,
  disabled: _disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      data-slot="error"
      className={clsx(
        className,
        'text-base/6 text-red-500 data-[disabled]:opacity-50 sm:text-sm/6',
      )}
    />
  )
}
