import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import {
  ALL_DESCRIPTION_TOKENS,
  DescriptionWithTokens,
} from '@/app/(components)/description-with-tokens'

interface Props {
  open: boolean
  onClose: () => void
}

export default function DescriptionTokenDialog({ open, onClose }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>All Description Tokens</BaseDialogTitle>
      <BaseDialogDescription>Tokens are case-sensitive!</BaseDialogDescription>
      <BaseDialogBody>
        <div className="flex w-full flex-col items-start justify-center gap-y-4 text-left text-sm">
          <DescriptionWithTokens
            description={ALL_DESCRIPTION_TOKENS.join(' ')}
            highlightBuildTokens={true}
            highlightExternalTokens={false}
            highlightItems={true}
          />
        </div>
      </BaseDialogBody>
    </BaseDialog>
  )
}
