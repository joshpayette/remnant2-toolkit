import { Button } from '@/app/(components)/base/button'

interface Props {
  onClick: () => void
  upvoted: boolean
}

export function FavoriteBuildButton({ onClick, upvoted }: Props) {
  return (
    <Button
      color={upvoted ? 'red' : 'orange'}
      aria-label={upvoted ? 'Remove favorite build' : 'Favorite build'}
      onClick={onClick}
      className="sm:w-full"
    >
      {upvoted ? 'Remove Favorite' : 'Favorite Build'}
    </Button>
  )
}
