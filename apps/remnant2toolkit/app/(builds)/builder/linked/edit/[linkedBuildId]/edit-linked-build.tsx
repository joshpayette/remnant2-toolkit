'use client';

import {
  BaseButton,
  BaseField,
  BaseInput,
  BaseLabel,
  BaseTextarea,
} from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUnlink } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';
import { toast } from 'react-toastify';

import { Tooltip } from '@/app/_components/tooltip';
import { usePagination } from '@/app/_hooks/use-pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { OrderByFilter } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter';
import { useOrderByFilter } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { TimeRangeFilter } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { MAX_LINKED_BUILD_DESCRIPTION_LENGTH } from '@/app/(builds)/builder/linked/_constants/max-linked-build-description-length';
import { MAX_LINKED_BUILD_ITEMS } from '@/app/(builds)/builder/linked/_constants/max-linked-build-items';
import { MAX_LINKED_BUILD_LABEL_LENGTH } from '@/app/(builds)/builder/linked/_constants/max-linked-build-label-length';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';
import { type LinkedBuildState } from '@/app/(builds)/builder/linked/_types/linked-build-state';
import { getUserCreatedBuilds } from '@/app/(builds)/builder/linked/create/[buildId]/_actions/get-user-created-builds';
import { updateLinkedBuild } from '@/app/(builds)/builder/linked/edit/[linkedBuildId]/_actions/update-linked-build';

const ITEMS_PER_PAGE = 16;

interface Props {
  currentLinkedBuildState: LinkedBuildState;
  userId: string;
}

export function EditLinkedBuild({ currentLinkedBuildState, userId }: Props) {
  const router = useRouter();

  const [name, setName] = useState(currentLinkedBuildState.name);
  const [description, setDescription] = useState(
    currentLinkedBuildState.description,
  );

  const [linkedBuildItems, setLinkedBuildItems] = useState<LinkedBuildItem[]>(
    currentLinkedBuildState.linkedBuildItems.map(
      (linkedBuildItem) => linkedBuildItem,
    ),
  );

  const { buildListState, setBuildListState } = useBuildListState();
  const { builds, totalBuildCount, isLoading } = buildListState;

  const [saveInProgress, setSaveInProgress] = useState(false);

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');

  const {
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    pageNumbers,
    totalPages,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = usePagination({
    totalItemCount: totalBuildCount,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    const getItemsAsync = async () => {
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }));
      const response = await getUserCreatedBuilds({
        itemsPerPage: ITEMS_PER_PAGE,
        orderBy,
        pageNumber: currentPage,
        timeRange,
        userId,
      });
      setBuildListState((prevState) => ({
        ...prevState,
        isLoading: false,
        builds: response.builds,
        totalBuildCount: response.totalBuildCount,
      }));
    };
    getItemsAsync();
  }, [currentPage, orderBy, setBuildListState, timeRange, userId]);

  function handleAddLinkedBuildItem(buildToAdd: DBBuild) {
    // If the build is already linked, don't add it again
    if (
      linkedBuildItems.some(
        (linkedBuildItem) => linkedBuildItem.build.id === buildToAdd.id,
      )
    ) {
      toast.error('Build is already linked.');
      return;
    }

    // If the max number of linked builds has been reached, don't add another
    if (linkedBuildItems.length >= MAX_LINKED_BUILD_ITEMS) {
      toast.error('Maximum linked builds reached.');
      return;
    }

    const newLinkedBuildItems = [
      ...linkedBuildItems,
      { label: `Variation #${linkedBuildItems.length + 1}`, build: buildToAdd },
    ];
    toast.success('Build added.');
    setLinkedBuildItems(newLinkedBuildItems);
  }

  function handleRemoveLinkedBuildItem(buildToRemove: DBBuild) {
    // If only one build remaining, don't remove it
    if (linkedBuildItems.length === 1) {
      toast.error('At least one build must be linked.');
      return;
    }

    const newLinkedBuildItems = linkedBuildItems.filter(
      (linkedBuildItem) => linkedBuildItem.build.id !== buildToRemove.id,
    );
    toast.success('Build removed.');
    setLinkedBuildItems(newLinkedBuildItems);
  }

  async function handleSaveLinkedBuild() {
    setSaveInProgress(true);

    const response = await updateLinkedBuild({
      name,
      description: description ?? '',
      id: currentLinkedBuildState.id,
      createdById: userId,
      isModeratorLocked: currentLinkedBuildState.isModeratorLocked,
      linkedBuildItems: linkedBuildItems.map((linkedBuildItem) => ({
        label: linkedBuildItem.label,
        buildId: linkedBuildItem.build.id,
      })),
    });

    if (response.status === 'error') {
      setSaveInProgress(false);
      toast.error(response.message);
      return;
    }
    if (!response.linkedBuild) {
      setSaveInProgress(false);
      toast.error('An error occurred while updating the linked build.');
      return;
    }
    toast.success(response.message);
    router.push(`/builder/linked/${response.linkedBuild.id}`);
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      <BaseField className="max-w-[500px]">
        <BaseLabel>Linked Build Name</BaseLabel>
        <BaseInput
          name="linked-build-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </BaseField>
      <BaseField>
        <BaseLabel>{`Build Description (${
          description?.length ?? 0
        }/${MAX_LINKED_BUILD_DESCRIPTION_LENGTH})`}</BaseLabel>
        <BaseTextarea
          name="description"
          placeholder="Say a little bit about these linked builds, such as the purpose or theme of the variations."
          onChange={(e) => setDescription(e.target.value)}
          value={description ?? ''}
          maxLength={MAX_LINKED_BUILD_DESCRIPTION_LENGTH}
          className="h-[175px] w-full max-w-[500px]"
        />
      </BaseField>
      <div className="border-b-primary-500 flex w-full flex-col items-start justify-start border-b py-2">
        <ul
          role="list"
          className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {linkedBuildItems.map((linkedBuild) => (
            <div
              key={linkedBuild.build.id}
              className="flex w-full flex-col gap-y-4"
            >
              <BuildCard
                build={linkedBuild.build}
                isLoading={isLoading}
                showBuildVisibility={false}
                footerActions={
                  <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
                    <Tooltip content="Remove Build">
                      <BaseButton
                        color="red"
                        aria-label="Remove Build"
                        onClick={() =>
                          handleRemoveLinkedBuildItem(linkedBuild.build)
                        }
                      >
                        <FaUnlink className="h-4 w-4" />
                      </BaseButton>
                    </Tooltip>
                  </div>
                }
              />
              <BaseField>
                <BaseInput
                  name={`${linkedBuild.build.id}-label`}
                  value={linkedBuild.label}
                  maxLength={MAX_LINKED_BUILD_LABEL_LENGTH}
                  onChange={(e) => {
                    const newLinkedBuildItems = linkedBuildItems.map(
                      (linkedBuildItem) => {
                        if (linkedBuildItem.build.id === linkedBuild.build.id) {
                          return { ...linkedBuildItem, label: e.target.value };
                        }
                        return linkedBuildItem;
                      },
                    );
                    setLinkedBuildItems(newLinkedBuildItems);
                  }}
                />
              </BaseField>
            </div>
          ))}
        </ul>
        <div className="flex w-full items-center justify-end">
          <BaseButton
            color="green"
            onClick={handleSaveLinkedBuild}
            disabled={saveInProgress}
          >
            Save Linked Build
          </BaseButton>
        </div>
      </div>
      <BuildList
        currentPage={currentPage}
        isLoading={isLoading}
        label="Created Builds"
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={
          <div className="flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
            <div className="w-full max-w-[250px]">
              <TimeRangeFilter
                isLoading={isLoading}
                value={timeRange}
                onChange={(value) => {
                  handleTimeRangeChange(value);
                  setBuildListState((prevState) => ({
                    ...prevState,
                    isLoading: true,
                  }));
                }}
              />
            </div>
            <div className="w-full max-w-[250px]">
              <OrderByFilter
                isLoading={isLoading}
                value={orderBy}
                onChange={(value) => {
                  handleOrderByChange(value);
                  setBuildListState((prevState) => ({
                    ...prevState,
                    isLoading: true,
                  }));
                }}
              />
            </div>
          </div>
        }
      >
        <ul
          role="list"
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {builds.map((build) => (
            <div key={build.id} className="w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                showBuildVisibility={false}
                footerActions={
                  <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
                    <Tooltip content="Add Build">
                      <BaseButton
                        color="green"
                        aria-label="Add Build"
                        onClick={() => handleAddLinkedBuildItem(build)}
                      >
                        <FaLink className="h-4 w-4" />
                      </BaseButton>
                    </Tooltip>
                  </div>
                }
              />
            </div>
          ))}
        </ul>
      </BuildList>
    </div>
  );
}
