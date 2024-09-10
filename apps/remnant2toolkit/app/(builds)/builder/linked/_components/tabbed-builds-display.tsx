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
import { type LinkedBuildState } from '@/app/(builds)/builder/linked/_types/linked-build-state';

interface Props {
  buildInfo: LinkedBuildItem;
  onChangeCurrentLinkedBuild: (linkedBuildItem: LinkedBuildItem) => void;
  linkedBuildState: LinkedBuildState;
}

export function TabbedBuildsDisplay({
  buildInfo,
  onChangeCurrentLinkedBuild,
  linkedBuildState,
}: Props) {
  const { linkedBuildItems } = linkedBuildState;

  return (
    <div className="mb-8 w-full max-w-lg">
      <h2 className="border-b-primary-500 mb-2 border-b pb-2 text-center text-2xl font-bold">
        {linkedBuildState.name}
      </h2>
      <div className="mb-2 flex flex-col">
        {linkedBuildState.description &&
          linkedBuildState.description.length > 0 && (
            <div
              className={cn(
                'text-md overflow-x-auto overflow-y-auto whitespace-pre-wrap text-gray-200',
              )}
            >
              <DescriptionWithTokens
                description={linkedBuildState.description}
                highlightBuildTokens={true}
                highlightExternalTokens={false}
                highlightItems={true}
              />
            </div>
          )}
      </div>

      <BaseDivider className="my-4 sm:my-0 sm:hidden" />

      <BaseField className="sm:hidden">
        <BaseLabel>
          <div className="mb-2 w-full text-center">Linked Builds</div>
        </BaseLabel>
        <BaseListbox
          name="linkedBuilds"
          value={buildInfo.label}
          onChange={(value) => {
            const linkedBuild = linkedBuildItems.find(
              (linkedBuildItem) => linkedBuildItem.label === value,
            );
            if (linkedBuild) {
              onChangeCurrentLinkedBuild(linkedBuild);
            }
          }}
        >
          {linkedBuildItems.map((linkedBuildItem) => (
            <BaseListboxOption
              key={linkedBuildItem.id}
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
          {linkedBuildItems.map((linkedBuildItem, tabIdx) => (
            <button
              key={linkedBuildItem.build.id}
              onClick={() => onChangeCurrentLinkedBuild(linkedBuildItem)}
              className={cn(
                linkedBuildItem.build.id === buildInfo.build.id
                  ? 'text-gray-300'
                  : 'text-gray-400 hover:text-gray-300',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === linkedBuildItems.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-gray-900 px-4 py-4 text-center text-sm font-medium hover:bg-gray-800 focus:z-10',
              )}
            >
              <span>{linkedBuildItem.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  linkedBuildItem.build.id === buildInfo.build.id
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
  );
}
