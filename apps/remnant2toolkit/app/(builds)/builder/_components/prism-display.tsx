'use client';

import {
  BaseButton,
  BaseFieldset,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
  cn,
} from '@repo/ui';
import { getArrayOfLength } from '@repo/utils';
import { useMemo, useState } from 'react';

import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { ComboButton } from '@/app/(items)/_components/combo-button';
import { ItemButton } from '@/app/(items)/_components/item-button';
import { comboItems } from '@/app/(items)/_constants/combo-items';
import { type ComboItem, isComboItem } from '@/app/(items)/_types/combo-item';
import { type Item } from '@/app/(items)/_types/item';
import { type RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';

/**
 * Checks all relic fragments in the 'bonus' slots to see if they can
 * form a combo. If so, returns the combo.
 */
function detectComboPossibilities(buildState: BuildState): Array<{
  comboItem: ComboItem;
  fragmentNames: string[];
}> {
  const bonusFragments = buildState.items.relicfragment.slice(3, 8);

  const matchedCombos: ComboItem[] = [];

  // Loop over each fragment, and check if it can form a combo
  // with any other equipped fragment
  for (const fragment of bonusFragments) {
    for (const combo of comboItems) {
      if (
        combo.fragments.some(
          (comboFragment) => comboFragment === fragment?.id,
        ) &&
        combo.fragments.every((comboFragment) =>
          bonusFragments.some(
            (bonusFragment) => bonusFragment?.id === comboFragment,
          ),
        )
      ) {
        matchedCombos.push(combo);
      }
    }
  }

  const dedupedCombos = matchedCombos.filter(
    (combo, index, self) =>
      index ===
      self.findIndex(
        (otherCombo) =>
          otherCombo.name === combo.name &&
          otherCombo.fragments.every((fragment) =>
            combo.fragments.some((otherFragment) => otherFragment === fragment),
          ),
      ),
  );

  const returnedCombos: Array<{
    comboItem: ComboItem;
    fragmentNames: string[];
  }> = dedupedCombos.map((combo) => {
    const fragmentNames = combo.fragments.map((fragmentId) => {
      const fragment = buildState.items.relicfragment.find(
        (item) => item?.id === fragmentId,
      );
      return fragment?.name ?? '';
    });
    return { comboItem: combo, fragmentNames };
  });

  return returnedCombos;
}

function getExistingCombos(buildState: BuildState): Array<{
  comboItem: ComboItem;
  fragmentSlot: number;
}> {
  const bonusFragments = buildState.items.relicfragment.slice(3, 8);

  const matchedCombos: ComboItem[] = [];

  // Loop over each fragment, and check if it can form a combo
  // with any other equipped fragment
  for (const fragment of bonusFragments) {
    for (const combo of comboItems) {
      if (
        combo.fragments.some(
          (comboFragment) => comboFragment === fragment?.id,
        ) &&
        combo.fragments.every((comboFragment) =>
          bonusFragments.some(
            (bonusFragment) => bonusFragment?.id === comboFragment,
          ),
        )
      ) {
        matchedCombos.push(combo);
      }
    }
  }

  const dedupedCombos = matchedCombos.filter(
    (combo, index, self) =>
      index ===
      self.findIndex(
        (otherCombo) =>
          otherCombo.name === combo.name &&
          otherCombo.fragments.every((fragment) =>
            combo.fragments.some((otherFragment) => otherFragment === fragment),
          ),
      ),
  );

  const returnedCombos: Array<{
    comboItem: ComboItem;
    fragmentSlot: number;
  }> = dedupedCombos.map((combo) => {
    const fragmentSlot = bonusFragments.findIndex((fragment) =>
      combo.fragments.some((comboFragment) => comboFragment === fragment?.id),
    );
    return { comboItem: combo, fragmentSlot };
  });

  return returnedCombos;
}

interface Props {
  buildState: BuildState;
  isEditable: boolean;
  isScreenshotMode: boolean;
  itemInfoOpen: boolean;
  itemOwnershipPreference: boolean;
  onCreateCombo: (fragmentToMerge: RelicFragmentItem, newIndex: number) => void;
  onItemSelect: (category: ItemCategory, index?: number) => void;
  onShowInfo: (item: Item) => void;
  onToggleOptional: (selectedItem: Item, optional: boolean) => void;
}

export function PrismDisplay({
  buildState,
  isEditable,
  isScreenshotMode,
  itemInfoOpen,
  itemOwnershipPreference,
  onCreateCombo,
  onItemSelect,
  onShowInfo,
  onToggleOptional,
}: Props) {
  // TODO is automatically applying combo before it's selected
  const bonusSlots: Array<RelicFragmentItem | ComboItem | null> =
    useMemo(() => {
      const existingCombos = getExistingCombos(buildState);
      const bonusSlots: Array<RelicFragmentItem | ComboItem | null> = [];
      const bonusFragmentCount = 5;

      for (let i = 0; i < bonusFragmentCount; i++) {
        const existingCombo = existingCombos.find(
          (combo) => combo.fragmentSlot === i,
        );
        if (existingCombo) {
          bonusSlots.push(existingCombo.comboItem);
        } else {
          const fragment = buildState.items.relicfragment[i + 3];
          if (fragment?.index !== i + 3 || !fragment) {
            bonusSlots.push(null);
            continue;
          }
          bonusSlots.push(fragment);
        }
      }

      return bonusSlots;
    }, [buildState]);

  // const existingCombos = getExistingCombos(buildState);

  const detectedComboPossibilities = useMemo(
    () => detectComboPossibilities(buildState),
    [buildState],
  );

  const [selectedComboPossibility, setSelectedComboPossibility] = useState<
    string | null
  >(null);

  function handleCreateCombo() {
    const selectedComboItem = comboItems.find(
      (comboItem) => comboItem.name === selectedComboPossibility,
    );

    if (!selectedComboItem) {
      console.error('Could not find selected combo', selectedComboPossibility);
      return;
    }

    const firstFragment = buildState.items.relicfragment.find(
      (item) => item?.id === selectedComboItem.fragments[0],
    );
    const secondFragment = buildState.items.relicfragment.find(
      (item) => item?.id === selectedComboItem.fragments[1],
    );

    if (!firstFragment || !secondFragment) {
      console.error('Could not find fragments for combo', selectedComboItem);
      return;
    }

    const firstFragmentIndex = buildState.items.relicfragment.findIndex(
      (item) => item?.id === selectedComboItem.fragments[0],
    );
    const secondFragmentIndex = buildState.items.relicfragment.findIndex(
      (item) => item?.id === selectedComboItem.fragments[1],
    );

    if (!firstFragmentIndex || !secondFragmentIndex) {
      console.error(
        'Could not find index for fragments for combo',
        selectedComboItem,
      );
      return;
    }

    // Change the index of the secondFragment to be the same index as the firstFragment
    onCreateCombo(secondFragment, firstFragmentIndex);
  }

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center justify-center gap-x-1 gap-y-0',
        isScreenshotMode && 'justify-start',
      )}
    >
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Prism</span>
          </BaseLabel>
        ) : null}
        <ItemButton
          item={buildState.items.prism}
          isEditable={isEditable}
          isScreenshotMode={isScreenshotMode}
          manualWordBreaks={true}
          onClick={() => onItemSelect('prism')}
          onItemInfoClick={onShowInfo}
          onToggleOptional={onToggleOptional}
          showOwnership={itemOwnershipPreference}
          tooltipDisabled={itemInfoOpen}
          unoptimized={isScreenshotMode}
        />
      </BaseFieldset>
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable && !isScreenshotMode ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Fragments</span>
          </BaseLabel>
        ) : null}
        <div className="flex w-full flex-wrap items-start justify-start gap-x-1">
          {getArrayOfLength(3).map((fragmentIndex) => (
            <ItemButton
              key={
                buildState.items.relicfragment[fragmentIndex]?.id ||
                fragmentIndex
              }
              item={buildState.items.relicfragment[fragmentIndex] || null}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              manualWordBreaks={true}
              onClick={() => onItemSelect('relicfragment', fragmentIndex)}
              onItemInfoClick={onShowInfo}
              onToggleOptional={onToggleOptional}
              showOwnership={itemOwnershipPreference}
              tooltipDisabled={itemInfoOpen}
              unoptimized={isScreenshotMode}
            />
          ))}
        </div>
      </BaseFieldset>
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable && !isScreenshotMode ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Bonuses</span>
          </BaseLabel>
        ) : null}
        <div className="flex w-full flex-wrap items-start justify-start gap-x-1">
          {bonusSlots.map((bonusSlot, index) => {
            // Account for the first 3 slots being the main fragments
            const relicFragmentOffset = 3;

            if (isComboItem(bonusSlot)) {
              return (
                <ComboButton
                  key={bonusSlot.name}
                  comboItem={bonusSlot}
                  isEditable={isEditable}
                  isScreenshotMode={isScreenshotMode}
                  unoptimized={isScreenshotMode}
                />
              );
            }

            return (
              <ItemButton
                key={bonusSlot?.id ?? index}
                item={bonusSlot}
                isEditable={isEditable}
                isScreenshotMode={isScreenshotMode}
                manualWordBreaks={true}
                onClick={() =>
                  onItemSelect('relicfragment', index + relicFragmentOffset)
                }
                onItemInfoClick={onShowInfo}
                onToggleOptional={onToggleOptional}
                showOwnership={itemOwnershipPreference}
                tooltipDisabled={itemInfoOpen}
                unoptimized={isScreenshotMode}
              />
            );
          })}
        </div>
      </BaseFieldset>
      <BaseFieldset className="flex max-w-full flex-col items-start justify-start gap-y-2 border border-transparent p-1">
        {isEditable && !isScreenshotMode ? (
          <BaseLabel className="w-full text-center">
            <span className="text-sm">Legendary</span>
          </BaseLabel>
        ) : null}
        <ItemButton
          item={buildState.items.relicfragment[8] || null}
          isEditable={isEditable}
          isScreenshotMode={isScreenshotMode}
          manualWordBreaks={true}
          onClick={() => onItemSelect('relicfragment', 8)}
          onItemInfoClick={onShowInfo}
          onToggleOptional={onToggleOptional}
          showOwnership={itemOwnershipPreference}
          tooltipDisabled={itemInfoOpen}
          unoptimized={isScreenshotMode}
        />
      </BaseFieldset>
      {detectedComboPossibilities.length > 0 ? (
        <BaseFieldset className="mt-4 flex w-full items-center justify-center">
          <BaseLabel>Apply Combos:</BaseLabel>
          <BaseListbox
            name="combos"
            defaultValue={detectedComboPossibilities[0]?.comboItem.name}
            onChange={(e) => setSelectedComboPossibility(e)}
            value={selectedComboPossibility}
          >
            {detectedComboPossibilities.map((comboPossibility) => (
              <BaseListboxOption
                key={comboPossibility.comboItem.name}
                value={comboPossibility.comboItem.name}
              >
                <BaseListboxLabel>
                  {comboPossibility.comboItem.name} (
                  {comboPossibility.fragmentNames.join(',')})
                </BaseListboxLabel>
              </BaseListboxOption>
            ))}
          </BaseListbox>
          <BaseButton color="green" onClick={handleCreateCombo}>
            Apply
          </BaseButton>
        </BaseFieldset>
      ) : null}
    </div>
  );
}
