import { cn } from '@repo/ui';

import { type BuildTag } from '@/app/(builds)/_types/build-tag';

function itemClasses({
  tag,
  isActive,
  isEditable,
}: {
  tag: BuildTag;
  isActive: boolean;
  isEditable: boolean;
}) {
  return cn(
    'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400',
    isEditable && !isActive && 'hover:bg-gray-400/20',
    isActive && `${tag.colors.text} ${tag.colors.bg}`,
    isActive && isEditable && `${tag.colors.hover}`,
  );
}

interface Props {
  isActive: boolean;
  isEditable: boolean;
  isScreenshotMode: boolean;
  tag: BuildTag;
}

export function BuildTagItem({
  isActive,
  isEditable,
  isScreenshotMode,
  tag,
}: Props) {
  if (!isActive && isScreenshotMode) {
    return null;
  }

  return (
    <div
      className={itemClasses({
        tag,
        isActive,
        isEditable,
      })}
    >
      {tag.label}
    </div>
  );
}
