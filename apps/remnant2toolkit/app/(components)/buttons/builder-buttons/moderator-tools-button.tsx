import { BaseButton } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function ModeratorToolsButton({ onClick }: Props) {
  return (
    <BaseButton
      color="orange"
      aria-label="Moderator Tools"
      onClick={onClick}
      className="sm:w-full"
    >
      Moderator Tools
    </BaseButton>
  )
}
