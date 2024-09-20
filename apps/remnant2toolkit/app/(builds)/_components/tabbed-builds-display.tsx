'use client';

import {
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
  cn,
} from '@repo/ui';

import { type BuildState } from '@/app/(builds)/_types/build-state';

type Props = {
  activeBuild: BuildState;
  onChangeActiveBuild: (build: BuildState) => void;
  buildVariants: BuildState[];
  title: string;
};

export function TabbedBuildsDisplay({
  activeBuild,
  onChangeActiveBuild,
  buildVariants,
  title,
}: Props) {
  return (
    buildVariants.length > 0 && (
      <div className="mb-4 flex w-full items-center justify-center">
        <BaseField className="sm:hidden">
          <BaseLabel>
            <div className="mb-2 w-full text-center">{title}</div>
          </BaseLabel>
          <BaseListbox
            name="buildVariants"
            value={activeBuild.name}
            onChange={(value) => {
              const linkedBuild = buildVariants.find(
                (build) => build.name === value,
              );
              if (linkedBuild) {
                onChangeActiveBuild(linkedBuild);
              }
            }}
          >
            {buildVariants.map((build) => (
              <BaseListboxOption key={build.buildId} value={build.name}>
                <BaseListboxLabel>{build.name}</BaseListboxLabel>
              </BaseListboxOption>
            ))}
          </BaseListbox>
        </BaseField>
        <div className="hidden sm:flex sm:w-full sm:max-w-2xl sm:flex-col sm:items-center sm:justify-center">
          <div className="mb-2 w-full text-center text-lg font-bold">
            {title}
          </div>
          <nav
            className="isolate flex w-full divide-x divide-gray-700 rounded-lg shadow"
            aria-label="Tabs"
          >
            {buildVariants.map((build, tabIdx) => (
              <button
                key={build.buildId}
                onClick={() => onChangeActiveBuild(build)}
                className={cn(
                  build.buildId === activeBuild.buildId
                    ? 'text-gray-300'
                    : 'text-gray-400 hover:text-gray-300',
                  tabIdx === 0 ? 'rounded-l-lg' : '',
                  tabIdx === buildVariants.length - 1 ? 'rounded-r-lg' : '',
                  'group relative min-w-0 flex-1 overflow-hidden bg-gray-900 px-4 py-4 text-center text-sm font-medium hover:bg-gray-800 focus:z-10',
                )}
              >
                <span>{build.name}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    build.buildId === activeBuild.buildId
                      ? 'bg-purple-500'
                      : 'bg-transparent',
                    'absolute inset-x-0 bottom-0 h-0.5',
                  )}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
    )
  );
}
