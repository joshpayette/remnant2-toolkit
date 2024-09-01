import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@repo/ui';

import { StatsListItem } from '@/app/(builds)/builder/_components/stats-list-item';
import { StatsSection } from '@/app/(builds)/builder/_components/stats-section';
import { type Item } from '@/app/(items)/_types/item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';

function getArmorStepLabel(
  item: TraitItem,
  equippedArmorStepItems: TraitItem[],
) {
  const traitAmount =
    equippedArmorStepItems.find((t) => t.name === item.name)?.amount ?? 0;

  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">
        {`(${traitAmount * (item.armorStep ?? 0)})`}
      </span>
    </>
  );
}

function getArmorIncreaseLabel(item: Item) {
  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">({item.armor})</span>
    </>
  );
}

function getArmorPercentLabel(item: Item) {
  return (
    <>
      <span className="text-surface-solid font-bold">
        {item.name}{' '}
        {item.category === 'relicfragment' && 'Mythic Relic Fragment'}
      </span>{' '}
      <span className="text-gray-300">
        ({((item.armorPercent ?? 0) * 100).toFixed(2)}%)
      </span>
    </>
  );
}

function getArmorStepPercentLabel(
  item: TraitItem,
  equippedArmorStepPercentItems: TraitItem[],
) {
  const traitAmount =
    equippedArmorStepPercentItems.find((t) => t.name === item.name)?.amount ??
    0;

  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">
        {`(${traitAmount * (item.armorStepPercent ?? 0) * 100}%)`}
      </span>
    </>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  breakdown: {
    equippedArmorIncreaseItems: Item[];
    equippedArmorPercentItems: Item[];
    equippedArmorStepItems: TraitItem[];
    equippedArmorStepPercentItems: TraitItem[];
    totalArmorIncrease: number;
    totalArmorPercent: number;
    totalArmorStep: number;
    totalArmorStepPercent: number;
  };
}

export function ArmorBreakdownDialog({ open, breakdown, onClose }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="sm">
      <BaseDialogTitle>Armor Breakdown</BaseDialogTitle>
      <BaseDialogDescription>
        View a breakdown of items contributing to this armor total.<br></br>
        ArmorDR = Armor / (Armor+200)
      </BaseDialogDescription>
      <BaseDialogBody>
        <div className="text-left text-sm">
          {(breakdown.equippedArmorIncreaseItems.length > 0 ||
            breakdown.equippedArmorStepItems.length > 0) && (
            <StatsSection
              total={breakdown.totalArmorIncrease + breakdown.totalArmorStep}
              listItems={
                <>
                  {breakdown.equippedArmorIncreaseItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getArmorIncreaseLabel(item)}
                    </StatsListItem>
                  ))}
                  {breakdown.equippedArmorStepItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getArmorStepLabel(
                        item,
                        breakdown.equippedArmorStepItems,
                      )}
                    </StatsListItem>
                  ))}
                </>
              }
            />
          )}

          {(breakdown.equippedArmorPercentItems.length > 0 ||
            breakdown.equippedArmorStepPercentItems.length > 0) && (
            <StatsSection
              isPercent={true}
              total={
                (breakdown.totalArmorPercent +
                  breakdown.totalArmorStepPercent) *
                100
              }
              listItems={
                <>
                  {breakdown.equippedArmorPercentItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getArmorPercentLabel(item)}
                    </StatsListItem>
                  ))}
                  {breakdown.equippedArmorStepPercentItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getArmorStepPercentLabel(
                        item,
                        breakdown.equippedArmorStepPercentItems,
                      )}
                    </StatsListItem>
                  ))}
                </>
              }
            />
          )}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  );
}
