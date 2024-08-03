const TOOLKIT_USER_ID = 'clql3zq8k0000a6m41vtnvldq'

/**
 * Determines if quality builds are enabled for the given user.
 * If the feature flag is disabled, quality builds are only enabled for the toolkit user if requested.
 * If the feature flag is enabled, quality builds are enabled for everyone if requested.
 */
export function areQualityBuildsEnabled({
  userId,
  withQuality,
}: {
  userId: string | undefined
  withQuality: boolean
}): boolean {
  // Disable quality build toggle for everyone except the toolkit user
  // when the feature flag is not enabled
  if (process.env.NEXT_PUBLIC_ENABLE_QUALITY_BUILDS !== 'true') {
    if (userId === TOOLKIT_USER_ID) {
      return withQuality
    }
    return false
  }

  // Enable quality builds for everyone when the feature flag is enabled
  // and the user has requested quality builds
  return withQuality
}
