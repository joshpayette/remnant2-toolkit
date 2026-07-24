/**
 * Pagination cursor for the "Load more" build feeds.
 *
 * Two shapes, so a single cursor works for both pagination strategies:
 * - `keyset`: the sort-column value + id of the last row already shown, used to
 *   seek the next page via an indexed predicate (the common, fast path).
 * - `offset`: a plain page number, for the sorts that can't keyset cleanly
 *   (`% owned` and `alphabetical`, and any ownership-filtered request).
 */
export type FeedCursor =
  | { type: 'keyset'; value: string | number; id: string }
  | { type: 'offset'; page: number };

export function encodeFeedCursor(cursor: FeedCursor): string {
  return Buffer.from(JSON.stringify(cursor)).toString('base64');
}

export function decodeFeedCursor(
  raw: string | null | undefined,
): FeedCursor | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
    if (
      parsed?.type === 'keyset' &&
      typeof parsed.id === 'string' &&
      (typeof parsed.value === 'string' || typeof parsed.value === 'number')
    ) {
      return { type: 'keyset', value: parsed.value, id: parsed.id };
    }
    if (parsed?.type === 'offset' && typeof parsed.page === 'number') {
      return { type: 'offset', page: parsed.page };
    }
    return null;
  } catch {
    return null;
  }
}
