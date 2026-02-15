import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export type BuildVisibility = 'all' | 'public' | 'private';

export function useBuildVisibilityFilter(
  defaultVisibilityFilter: BuildVisibility = 'all',
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramBuildVisibility = searchParams.get('buildVisibility');

  const [buildVisibility, setBuildVisibility] = useState<BuildVisibility>(
    paramBuildVisibility
      ? (paramBuildVisibility as BuildVisibility)
      : defaultVisibilityFilter,
  );
  const buildVisibilityOptions: Array<{
    label: BuildVisibility;
    value: string;
  }> = [
    { label: 'all', value: 'all' },
    { label: 'public', value: 'public' },
    { label: 'private', value: 'private' },
  ];
  function handleBuildVisibilityChange(visibility: string) {
    setBuildVisibility(visibility as BuildVisibility);
    const params = new URLSearchParams(searchParams.toString());
    params.set('buildVisibility', visibility);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return {
    buildVisibility,
    buildVisibilityOptions,
    handleBuildVisibilityChange,
  };
}
