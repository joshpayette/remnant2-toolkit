import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@repo/ui/base/dialog'

import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { INLINE_TOKENS } from '@/app/(types)/tokens'

interface Props {
  open: boolean
  onClose: () => void
}

// Start with all description tokens, which are always included
export const allDescriptionTokens: string[] = [
  ...INLINE_TOKENS.map((tag) => tag.token).sort((a, b) => b.length - a.length), // Sort in descending order of length,
]

export default function DescriptionTokenDialog({ open, onClose }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>All Description Tokens</BaseDialogTitle>
      <BaseDialogDescription>Tokens are case-sensitive!</BaseDialogDescription>
      <BaseDialogBody>
        <div className="flex w-full flex-col items-start justify-center gap-y-4 text-left text-sm">
          <DescriptionWithTokens
            description={allDescriptionTokens.join(' ')}
            highlightBuildTokens={true}
            highlightExternalTokens={false}
            highlightItems={true}
          />
        </div>
      </BaseDialogBody>
    </BaseDialog>
  )
}
