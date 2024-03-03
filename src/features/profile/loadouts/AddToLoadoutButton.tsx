export function AddToLoadoutButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="text-purple-500 hover:text-purple-300"
      aria-label="Add to your pinned loadouts"
      onClick={onClick}
    >
      Add To Loadout
    </button>
  )
}
