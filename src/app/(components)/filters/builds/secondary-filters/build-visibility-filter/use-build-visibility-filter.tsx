import { useState } from 'react'

export type BuildVisibility = 'all' | 'public' | 'private'

export function useBuildVisibilityFilter(
  defaultVisibilityFilter: BuildVisibility = 'all',
) {
  const [buildVisibility, setBuildVisibility] = useState<BuildVisibility>(
    defaultVisibilityFilter,
  )
  const buildVisibilityOptions: Array<{
    label: BuildVisibility
    value: string
  }> = [
    { label: 'all', value: 'all' },
    { label: 'public', value: 'public' },
    { label: 'private', value: 'private' },
  ]
  function handleBuildVisibilityChange(visibility: string) {
    setBuildVisibility(visibility as BuildVisibility)
  }

  return {
    buildVisibility,
    buildVisibilityOptions,
    handleBuildVisibilityChange,
  }
}
