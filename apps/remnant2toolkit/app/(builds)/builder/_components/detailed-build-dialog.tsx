'use client';

import { BaseDialog, BaseDialogBody, BaseDialogTitle } from '@repo/ui';
import { useState } from 'react';

import { buildStateToItemList } from '@/app/(builds)/_libs/build-state-to-item-list';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { ItemCard } from '@/app/(items)/_components/item-card';
import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { ItemListGrid } from '@/app/(items)/_components/item-list-grid';
import { type Item } from '@/app/(items)/_types/item';

interface Props {
  open: boolean;
  buildState: BuildState;
  onClose: () => void;
}

export function DetailedBuildDialog({ open, buildState, onClose }: Props) {
  const itemList = buildStateToItemList(buildState);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const isItemInfoOpen = Boolean(selectedItem);

  return (
    <BaseDialog open={open} onClose={onClose} size="7xl">
      <ItemInfoDialog
        open={isItemInfoOpen}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
      <BaseDialogTitle>Detailed Build View</BaseDialogTitle>
      <BaseDialogBody>
        <ItemListGrid items={itemList} />
      </BaseDialogBody>
    </BaseDialog>
  );
}
