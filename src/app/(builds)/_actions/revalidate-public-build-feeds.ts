import { revalidateTag } from 'next/cache';

import { PUBLIC_BUILD_FEEDS_CACHE_TAG } from '@/app/(builds)/_features/filters/_libs/queries/feed-cache';

/**
 * Invalidate the cached default views of the public build feeds.
 *
 * Called from any action that changes what a logged-out visitor sees on a
 * feed's first page:
 *   - build create/update/delete
 *   - visibility changes
 *   - vote changes
 *   - feature/beginner/base-game/gimmick flag toggles
 */
export function revalidatePublicBuildFeeds() {
  revalidateTag(PUBLIC_BUILD_FEEDS_CACHE_TAG);
}
