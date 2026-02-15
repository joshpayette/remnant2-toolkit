'use client';

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
        '[&>*+[data-slot=control]]:mt-2 [&>[data-slot=text]]:mt-1'
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
        'text-base/6 font-semibold text-surface-solid data-[disabled]:opacity-50 sm:text-sm/6'
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
      className={cn(className, 'space-y-8')}
      data-slot="control"
    />
  );
}

export function BaseField({ className, ...props }: HeadlessFieldProps) {
  return (
    <HeadlessField
      className={cn(
        className,
        '[&>[data-slot=label]+[data-slot=control]]:mt-3',
        '[&>[data-slot=label]+[data-slot=description]]:mt-1',
        '[&>[data-slot=description]+[data-slot=control]]:mt-3',
        '[&>[data-slot=control]+[data-slot=description]]:mt-3',
        '[&>[data-slot=control]+[data-slot=error]]:mt-3',
        '[&>[data-slot=label]]:font-medium'
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
        'select-none text-base/6 text-surface-solid data-[disabled]:opacity-50 sm:text-sm/6'
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
        'text-base/6 text-zinc-400 data-[disabled]:opacity-50 sm:text-sm/6'
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
        'text-base/6 text-accent3-500 data-[disabled]:opacity-50 sm:text-sm/6'
      )}
      data-slot="error"
    />
  );
}
