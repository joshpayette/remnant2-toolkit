import { StarIcon as StarIconOff } from '@heroicons/react/24/outline'
import { StarIcon as StarIconOn } from '@heroicons/react/24/outline'

export default function VoteButton({
  active,
  onClick,
}: {
  active: boolean
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="border-red-500 hover:bg-red-700">
      {active ? <StarIconOn /> : <StarIconOff />}
    </button>
  )
}
