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
import { useMemo } from 'react';

import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { ItemButton } from '@/app/(items)/_components/item-button';
import { type Item } from '@/app/(items)/_types/item';
import {
  type Combo,
  COMBOS,
} from '@/app/(items)/item-lookup/_constants/combos';

/**
 * Checks all relic fragments in the 'bonus' slots to see if they can
 * form a combo. If so, returns the combo.
 */
function detectComboPossibilities(buildState: BuildState): Array<{
  combo: Combo;
  fragmentNames: string[];
}> {
  const bonusFragments = buildState.items.relicfragment.slice(3, 8);

  const matchedCombos: Combo[] = [];

  // Loop over each fragment, and check if it can form a combo
  // with any other equipped fragment
  for (const fragment of bonusFragments) {
    for (const combo of COMBOS) {
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
    combo: Combo;
    fragmentNames: string[];
  }> = dedupedCombos.map((combo) => {
    const fragmentNames = combo.fragments.map((fragmentId) => {
      const fragment = buildState.items.relicfragment.find(
        (item) => item?.id === fragmentId,
      );
      return fragment?.name ?? '';
    });
    return { combo, fragmentNames };
  });

  return returnedCombos;
}

interface Props {
  buildState: BuildState;
  isEditable: boolean;
  isScreenshotMode: boolean;
  itemInfoOpen: boolean;
  itemOwnershipPreference: boolean;
  onPrismSelect: (category: ItemCategory, index?: number) => void;
  onShowInfo: (item: Item) => void;
  onToggleOptional: (selectedItem: Item, optional: boolean) => void;
}

export function PrismDisplay({
  buildState,
  isEditable,
  isScreenshotMode,
  itemInfoOpen,
  itemOwnershipPreference,
  onPrismSelect,
  onShowInfo,
  onToggleOptional,
}: Props) {
  const detectedComboPossibilities = useMemo(
    () => detectComboPossibilities(buildState),
    [buildState],
  );

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
          onClick={() => onPrismSelect('prism')}
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
              item={buildState.items.relicfragment[fragmentIndex] || null}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              manualWordBreaks={true}
              onClick={() => onPrismSelect('relicfragment', fragmentIndex)}
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
          {getArrayOfLength(5).map((fragmentIndex) => (
            <ItemButton
              item={buildState.items.relicfragment[fragmentIndex + 3] || null}
              isEditable={isEditable}
              isScreenshotMode={isScreenshotMode}
              manualWordBreaks={true}
              onClick={() => onPrismSelect('relicfragment', fragmentIndex + 3)}
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
            <span className="text-sm">Legendary</span>
          </BaseLabel>
        ) : null}
        <ItemButton
          item={buildState.items.relicfragment[8] || null}
          isEditable={isEditable}
          isScreenshotMode={isScreenshotMode}
          manualWordBreaks={true}
          onClick={() => onPrismSelect('relicfragment', 8)}
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
            defaultValue={detectedComboPossibilities[0]?.combo.name}
          >
            {detectedComboPossibilities.map((comboPossibility) => (
              <BaseListboxOption
                key={comboPossibility.combo.name}
                value={comboPossibility.combo.name}
              >
                <BaseListboxLabel>
                  {comboPossibility.combo.name} (
                  {comboPossibility.fragmentNames.join(',')})
                </BaseListboxLabel>
              </BaseListboxOption>
            ))}
          </BaseListbox>
          <BaseButton color="green">Apply</BaseButton>
        </BaseFieldset>
      ) : null}
    </div>
  );
}
