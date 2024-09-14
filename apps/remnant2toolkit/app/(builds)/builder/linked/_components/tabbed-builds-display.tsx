'use client';

import {
  BaseDivider,
  BaseField,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
  cn,
} from '@repo/ui';

import { DescriptionWithTokens } from '@/app/_components/description-with-tokens';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

interface Props {
  activeBuild: LinkedBuildItem;
  onChangeActiveBuild: (linkedBuildItem: LinkedBuildItem) => void;
  linkedBuild: {
    linkedBuilds: LinkedBuildItem[];
    name?: string | null;
    description?: string | null;
  };
  title: string;
}

export function TabbedBuildsDisplay({
  activeBuild,
  onChangeActiveBuild,
  linkedBuild,
  title,
}: Props) {
  const { linkedBuilds } = linkedBuild;

  return (
    <div className="mb-8 w-full max-w-lg">
      {linkedBuild.name && (
        <h2 className="border-b-primary-500 mb-2 border-b pb-2 text-center text-2xl font-bold">
          {linkedBuild.name}
        </h2>
      )}

      {linkedBuild.description && linkedBuild.description.length > 0 && (
        <div className="mb-2 flex flex-col">
          <div
            className={cn(
              'text-md overflow-x-auto overflow-y-auto whitespace-pre-wrap text-gray-200',
            )}
          >
            <DescriptionWithTokens
              description={linkedBuild.description}
              highlightBuildTokens={true}
              highlightExternalTokens={false}
              highlightItems={true}
            />
          </div>
        </div>
      )}

      <BaseDivider
        className={cn(
          'my-4 sm:my-0 sm:hidden',
          linkedBuilds.length === 0 && 'hidden',
        )}
      />

      {linkedBuilds.length > 0 && (
        <>
          <BaseField className="sm:hidden">
            <BaseLabel>
              <div className="mb-2 w-full text-center">{title}</div>
            </BaseLabel>
            <BaseListbox
              name="linkedBuilds"
              value={activeBuild.label}
              onChange={(value) => {
                const linkedBuild = linkedBuilds.find(
                  (linkedBuildItem) => linkedBuildItem.label === value,
                );
                if (linkedBuild) {
                  onChangeActiveBuild(linkedBuild);
                }
              }}
            >
              {linkedBuilds.map((linkedBuildItem) => (
                <BaseListboxOption
                  key={linkedBuildItem.build.buildId}
                  value={linkedBuildItem.label}
                >
                  <BaseListboxLabel>{linkedBuildItem.label}</BaseListboxLabel>
                </BaseListboxOption>
              ))}
            </BaseListbox>
          </BaseField>
          <div className="hidden sm:block">
            <nav
              className="isolate flex divide-x divide-gray-700 rounded-lg shadow"
              aria-label="Tabs"
            >
              {linkedBuilds.map((linkedBuildItem, tabIdx) => (
                <button
                  key={linkedBuildItem.build.buildId}
                  onClick={() => onChangeActiveBuild(linkedBuildItem)}
                  className={cn(
                    linkedBuildItem.build.buildId === activeBuild.build.buildId
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:text-gray-300',
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === linkedBuilds.length - 1 ? 'rounded-r-lg' : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-gray-900 px-4 py-4 text-center text-sm font-medium hover:bg-gray-800 focus:z-10',
                  )}
                >
                  <span>{linkedBuildItem.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      linkedBuildItem.build.buildId ===
                        activeBuild.build.buildId
                        ? 'bg-purple-500'
                        : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5',
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
