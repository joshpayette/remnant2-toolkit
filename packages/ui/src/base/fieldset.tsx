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
        '[&>*+[data-slot=control]]:ui-mt-2 [&>[data-slot=text]]:ui-mt-1',
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
        'ui-text-surface-solid ui-text-base/6 ui-font-semibold data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
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
      className={clsx(className, 'ui-space-y-8')}
    />
  )
}

export function BaseField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      className={clsx(
        className,
        '[&>[data-slot=label]+[data-slot=control]]:ui-mt-3',
        '[&>[data-slot=label]+[data-slot=description]]:ui-mt-1',
        '[&>[data-slot=description]+[data-slot=control]]:ui-mt-3',
        '[&>[data-slot=control]+[data-slot=description]]:ui-mt-3',
        '[&>[data-slot=control]+[data-slot=error]]:ui-mt-3',
        '[&>[data-slot=label]]:ui-font-medium',
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
        'ui-text-surface-solid ui-select-none ui-text-base/6 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
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
        'ui-text-base/6 ui-text-zinc-400 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
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
        'ui-text-base/6 ui-text-red-500 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
      )}
    />
  )
}
