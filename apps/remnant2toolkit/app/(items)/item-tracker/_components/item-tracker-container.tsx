'use client';

import { BaseButton } from '@repo/ui';
import { capitalize } from '@repo/utils';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useIsClient } from 'usehooks-ts';

import { ItemTrackerFilters } from '@/app/(items)/_components/filters/item-tracker/item-tracker-filters';
import { ImportCsvDialog } from '@/app/(items)/_components/import-csv-dialog';
import { ImportItemsDialog } from '@/app/(items)/_components/import-items-dialog';
import { useDiscoveredItems } from '@/app/(items)/_hooks/use-discovered-items';
import { ItemList } from '@/app/(items)/item-tracker/_components/item-list';
import { ALL_TRACKABLE_ITEMS } from '@/app/(items)/item-tracker/_constants/trackable-items';
import { useCsvFileUpload } from '@/app/(items)/item-tracker/_hooks/use-csv-file-upload';
import { useSaveFileUpload } from '@/app/(items)/item-tracker/_hooks/use-save-file-upload';
import { type ItemTrackerCategory } from '@/app/(items)/item-tracker/_types/item-tracker-category';
import { getTrackerProgressLabel } from '@/app/(items)/item-tracker/_utils/get-tracker-progress-label';

import { DeleteTrackedItemsDialog } from '../../_components/delete-tracked-items-dialog';
import { deleteTrackedItems } from '../_actions/delete-tracked-items';

/**
 * ----------------------------------------------
 * Get the item categories
 * ----------------------------------------------
 */
const subCategories: ItemTrackerCategory[] = [
  'Long Gun',
  'Hand Gun',
  'Melee',
  'Mutator (Gun)',
  'Mutator (Melee)',
];

let itemCategories = ALL_TRACKABLE_ITEMS
  // Remove the categories that will be replaced by subcategories
  .reduce((acc, item) => {
    if (acc.includes(capitalize(item.category))) return acc;
    return [...acc, capitalize(item.category)];
  }, [] as string[]);
// Add the subcategories
itemCategories.push(...subCategories);
// Sort alphabetically
itemCategories = itemCategories.sort();
itemCategories = itemCategories.filter(
  (category) => category !== 'Weapon' && category !== 'Mutator',
);

export const ItemTrackerContainer = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const userId = sessionData?.user?.id;

  const isClient = useIsClient();
  const { discoveredItemIds, handleSetDiscoveredItems } = useDiscoveredItems();

  const [deleteTrackedItemsDialogOpen, setDeleteTrackedItemsDialogOpen] =
    useState(false);

  const {
    importSaveDialogOpen,
    saveFileInputRef,
    saveFileFormAction,
    setImportSaveDialogOpen,
  } = useSaveFileUpload({
    handleSetDiscoveredItems,
  });

  const {
    csvFileInputRef,
    csvItems,
    importCsvDialogOpen,
    handleCsvFileSubmit,
    setImportCsvDialogOpen,
  } = useCsvFileUpload({
    discoveredItemIds,
    handleSetDiscoveredItems,
  });

  // Provide the tracker progress
  const totalProgress = getTrackerProgressLabel({
    items: ALL_TRACKABLE_ITEMS,
    discoveredItemIds,
  });

  // #region Render
  // TODO Convert this to a grid of skeleton loaders
  if (sessionStatus === 'loading') return null;

  async function handleDeleteTrackedItems() {
    // Delete tracked items from the database
    if (userId) {
      const response = await deleteTrackedItems();
      if (!response.success) {
        toast.error('Failed to delete tracked items');
      }
    }
    // Delete tracked items from local storage
    handleSetDiscoveredItems([]);

    toast.success(`Tracked items deleted`);
  }

  return (
    <>
      <div className="text-primary-400 mb-2 flex flex-col items-center justify-center text-2xl font-bold">
        <h2 className="text-2xl font-bold">Progress</h2>
        <div className="text-surface-solid text-xl font-bold">
          {isClient ? totalProgress : 'Calculating...'}
        </div>
        <div className="w-full max-w-3xl">
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-x-4 gap-y-4 sm:flex-row sm:gap-y-0">
            <ImportItemsDialog
              open={importSaveDialogOpen}
              onClose={() => setImportSaveDialogOpen(false)}
              onSubmit={saveFileFormAction}
              fileInputRef={saveFileInputRef}
            />
            <ImportCsvDialog
              items={csvItems}
              open={importCsvDialogOpen}
              onClose={() => setImportCsvDialogOpen(false)}
              onSubmit={handleCsvFileSubmit}
              fileInputRef={csvFileInputRef}
            />
            <DeleteTrackedItemsDialog
              open={deleteTrackedItemsDialogOpen}
              onClose={() => setDeleteTrackedItemsDialogOpen(false)}
              onConfirm={handleDeleteTrackedItems}
            />

            <BaseButton
              color="cyan"
              onClick={() => setImportSaveDialogOpen(true)}
              aria-label="Import Save File"
              className="w-[200px]"
            >
              Import Save File
            </BaseButton>
            <BaseButton
              color="cyan"
              onClick={() => setImportCsvDialogOpen(true)}
              aria-label="Import/Export CSV File"
              className="w-[250px]"
            >
              Import/Export CSV
            </BaseButton>
            <BaseButton
              color="red"
              onClick={() => setDeleteTrackedItemsDialogOpen(true)}
              aria-label="Delete tracked items"
              className="w-[250px]"
            >
              Delete Tracked Items
            </BaseButton>
          </div>
          <hr className="mt-4 w-full max-w-3xl border-gray-700" />
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="mb-8 flex w-full flex-col items-center">
          <div className="w-full max-w-4xl">
            <ItemTrackerFilters />
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <ItemList
            discoveredItemIds={discoveredItemIds}
            handleSetDiscoveredItems={handleSetDiscoveredItems}
          />
        </div>
      </div>
    </>
  );
};
