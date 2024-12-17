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
} from '@headlessui/react';
import React from 'react';
import { cn } from '../../utils/classnames';

export function BaseFieldset({
  className,
  ...props
}: { disabled?: boolean } & HeadlessFieldsetProps) {
  return (
    <HeadlessFieldset
      {...props}
      className={cn(
        className,
        '[&>*+[data-slot=control]]:ui-mt-2 [&>[data-slot=text]]:ui-mt-1',
      )}
    />
  );
}

export function BaseLegend({ ...props }: HeadlessLegendProps) {
  return (
    <HeadlessLegend
      {...props}
      className={cn(
        props.className,
        'ui-text-surface-solid ui-text-base/6 ui-font-semibold data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
      )}
      data-slot="legend"
    />
  );
}

export function BaseFieldGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(className, 'ui-space-y-8')}
      data-slot="control"
    />
  );
}

export function BaseField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      className={cn(
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
  );
}

export function BaseLabel({
  className,
  ...props
}: { className?: string } & HeadlessLabelProps) {
  return (
    <HeadlessLabel
      {...props}
      className={cn(
        className,
        'ui-text-surface-solid ui-select-none ui-text-base/6 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
      )}
      data-slot="label"
    />
  );
}

export function BaseDescription({
  className,
  disabled: _disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      className={cn(
        className,
        'ui-text-base/6 ui-text-zinc-400 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
      )}
      data-slot="description"
    />
  );
}

export function BaseErrorMessage({
  className,
  disabled: _disabled,
  ...props
}: { className?: string; disabled?: boolean } & HeadlessDescriptionProps) {
  return (
    <HeadlessDescription
      {...props}
      className={cn(
        className,
        'ui-text-base/6 ui-text-accent3-500 data-[disabled]:ui-opacity-50 sm:ui-text-sm/6',
      )}
      data-slot="error"
    />
  );
}
