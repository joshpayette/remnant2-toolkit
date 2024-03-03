export function EmptyBuildCard() {
  return (
    <div className="col-span-1 flex h-full min-h-[350px] flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-500 bg-black text-center shadow hover:border-gray-300">
      <p className="mt-8 p-4 text-2xl font-semibold text-gray-700">
        Click to add build to this loadout slot.
      </p>
    </div>
  )
}
