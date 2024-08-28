import {
  Textarea as HeadlessTextarea,
  type TextareaProps as HeadlessTextareaProps,
} from '@headlessui/react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

export const BaseTextarea = forwardRef<
  HTMLTextAreaElement,
  { resizable?: boolean; textareaClassName?: string } & HeadlessTextareaProps
>(function Textarea(
  { className, textareaClassName, resizable = true, ...props },
  ref,
) {
  return (
    <span
      className={clsx([
        className,

        // Basic layout
        'ui-relative ui-grid ui-h-full ui-w-full',

        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:ui-bg-surface-solid before:ui-absolute before:ui-inset-px before:ui-rounded-[calc(theme(borderRadius.lg)-1px)] before:ui-shadow',

        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'before:ui-hidden',

        // Focus ring
        'after:ui-pointer-events-none after:ui-absolute after:ui-inset-0 after:ui-rounded-lg after:ui-ring-inset after:ui-ring-transparent sm:after:focus-within:ui-ring-2 sm:after:focus-within:ui-ring-blue-500',

        // Disabled state
        'has-[[data-disabled]]:ui-opacity-50 before:has-[[data-disabled]]:ui-bg-zinc-950/5 before:has-[[data-disabled]]:ui-shadow-none',
      ])}
      data-slot="control"
    >
      <HeadlessTextarea
        className={clsx([
          textareaClassName,

          // Basic layout
          'ui-relative ui-block ui-h-full ui-box-border ui-w-full ui-appearance-none ui-rounded-lg ui-px-[calc(theme(spacing[3.5])-1px)] ui-py-[calc(theme(spacing[2.5])-1px)] sm:ui-px-[calc(theme(spacing.3)-1px)] sm:ui-py-[calc(theme(spacing[1.5])-1px)]',

          // Typography
          'ui-text-surface-solid ui-text-base/6 placeholder:ui-text-zinc-500 sm:ui-text-sm/6',

          // Border
          'ui-border-surface-solid/10 ui-data-[hover]:border-surface-solid/20 ui-border',

          // Background color
          'ui-bg-surface-solid/5',

          // Hide default focus styles
          'focus:ui-outline-none',

          // Invalid state
          'data-[invalid]:ui-border-red-600 data-[invalid]:data-[hover]:ui-border-red-600',

          // Disabled state
          'disabled:ui-border-surface-solid/15 disabled:ui-bg-surface-solid/[2.5%] data-[hover]:disabled:ui-border-surface-solid/15',

          // Resizable
          resizable ? 'ui-resize-y' : 'ui-resize-none',
        ])}
        ref={ref}
        {...props}
      />
    </span>
  );
});
