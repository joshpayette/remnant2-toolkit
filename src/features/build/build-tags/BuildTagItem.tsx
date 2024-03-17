import { cn } from '@/lib/classnames'

import { BuildTag } from './types'

function itemClasses({
  tag,
  isActive,
  isEditable,
  isScreenshotMode,
}: {
  tag: BuildTag
  isActive: boolean
  isEditable: boolean
  isScreenshotMode: boolean
}) {
  return cn(
    'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400',
    isEditable && !isActive && 'hover:bg-gray-400/20',
    isActive && `${tag.colors.text} ${tag.colors.bg} ${tag.colors.ring}`,
    isActive && isEditable && `${tag.colors.hover}`,
    isScreenshotMode
      ? `ring-0 ring-transparent border-0`
      : `ring-1 ring-inset ring-gray-400/20`,
  )
}

interface Props {
  isActive: boolean
  isEditable: boolean
  isScreenshotMode: boolean
  tag: BuildTag
}

export function BuildTagItem({
  isActive,
  isEditable,
  isScreenshotMode,
  tag,
}: Props) {
  return (
    <div
      className={itemClasses({
        tag,
        isActive,
        isEditable,
        isScreenshotMode,
      })}
    >
      {tag.label}
    </div>
  )
}
