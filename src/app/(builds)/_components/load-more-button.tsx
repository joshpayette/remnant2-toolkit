interface Props {
  hasMore: boolean;
  isLoading: boolean;
  onClick: () => void;
}

/**
 * Used in the cursor paginated build feeds.
 * Renders nothing if no more items
 */
export function LoadMoreButton({ hasMore, isLoading, onClick }: Props) {
  if (!hasMore) return null;

  return (
    <div className="flex w-full items-center justify-center py-8">
      <button
        type="button"
        onClick={onClick}
        disabled={isLoading}
        aria-label="Load more builds"
        className="border-primary-300 bg-primary-500 text-surface-solid hover:bg-primary-300 relative inline-flex items-center rounded-md border px-6 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Loading…' : 'Load more'}
      </button>
    </div>
  );
}
