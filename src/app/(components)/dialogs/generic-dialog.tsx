import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'

interface Props {
  children: React.ReactNode
  title: string
  open: boolean
  size?: 'sm' | 'md' | 'lg'
  onClose: () => void
}

export default function GenericDialog({
  children,
  open,
  size = 'md',
  title,
  onClose,
}: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>{title}</BaseDialogTitle>
      <BaseDialogBody>
        <div className="flex w-full flex-col items-start justify-center gap-y-4 text-left text-sm">
          {children}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  )
}
