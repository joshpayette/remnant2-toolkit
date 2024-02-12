export function Skeleton() {
  return (
    <div
      role="status"
      className="flex h-auto w-full max-w-sm animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
    >
      &nbsp;
      <span className="sr-only">Loading...</span>
    </div>
  )
}
