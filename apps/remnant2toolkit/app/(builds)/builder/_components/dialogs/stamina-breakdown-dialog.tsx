import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@repo/ui';

import { ListItem } from '@/app/(builds)/builder/_components/stats/list-item';
import { Section } from '@/app/(builds)/builder/_components/stats/section';
import { type Item } from '@/app/(items)/_types/item';
import { type TraitItem } from '@/app/(items)/_types/trait-item';

function getStaminaStepLabel(
  item: TraitItem,
  equippedStaminaStepItems: TraitItem[],
) {
  const traitAmount =
    equippedStaminaStepItems.find((t) => t.name === item.name)?.amount ?? 0;

  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">
        {`(${traitAmount * (item.staminaStep ?? 0)})`}
      </span>
    </>
  );
}

function getStaminaIncreaseLabel(item: Item) {
  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">({item.stamina})</span>
    </>
  );
}

function getStaminaPercentLabel(item: Item) {
  return (
    <>
      <span className="text-surface-solid font-bold">
        {item.name}{' '}
        {item.category === 'relicfragment' && 'Mythic Relic Fragment'}
      </span>{' '}
      <span className="text-gray-300">
        ({((item.staminaPercent ?? 0) * 100).toFixed(2)}%)
      </span>
    </>
  );
}

function getStaminaStepPercentLabel(
  item: TraitItem,
  equippedStaminaStepPercentItems: TraitItem[],
) {
  const traitAmount =
    equippedStaminaStepPercentItems.find((t) => t.name === item.name)?.amount ??
    0;

  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">
        {`(${traitAmount * (item.staminaStepPercent ?? 0) * 100}%)`}
      </span>
    </>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  breakdown: {
    equippedStaminaIncreaseItems: Item[];
    equippedStaminaPercentItems: Item[];
    equippedStaminaStepItems: TraitItem[];
    equippedStaminaStepPercentItems: TraitItem[];
    totalStaminaIncrease: number;
    totalStaminaPercent: number;
    totalStaminaStep: number;
    totalStaminaStepPercent: number;
  };
}

export function StaminaBreakdownDialog({ open, breakdown, onClose }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="sm">
      <BaseDialogTitle>Stamina Breakdown</BaseDialogTitle>
      <BaseDialogDescription>
        View a breakdown of items contributing to this stamina total.
      </BaseDialogDescription>
      <BaseDialogBody>
        <div className="text-left text-sm">
          <h3 className="text-md text-surface-solid col-span-full my-2 font-semibold">
            Base Stamina{' '}
            <span className="text-md text-surface-solid font-bold">100</span>
          </h3>
          {(breakdown.equippedStaminaIncreaseItems.length > 0 ||
            breakdown.equippedStaminaStepItems.length > 0) && (
            <Section
              total={
                breakdown.totalStaminaIncrease + breakdown.totalStaminaStep
              }
              listItems={
                <>
                  {breakdown.equippedStaminaIncreaseItems.map((item) => (
                    <ListItem key={item.id}>
                      {getStaminaIncreaseLabel(item)}
                    </ListItem>
                  ))}
                  {breakdown.equippedStaminaStepItems.map((item) => (
                    <ListItem key={item.id}>
                      {getStaminaStepLabel(
                        item,
                        breakdown.equippedStaminaStepItems,
                      )}
                    </ListItem>
                  ))}
                </>
              }
            />
          )}

          {(breakdown.equippedStaminaPercentItems.length > 0 ||
            breakdown.equippedStaminaStepPercentItems.length > 0) && (
            <Section
              isPercent={true}
              total={
                (breakdown.totalStaminaPercent +
                  breakdown.totalStaminaStepPercent) *
                100
              }
              listItems={
                <>
                  {breakdown.equippedStaminaPercentItems.map((item) => (
                    <ListItem key={item.id}>
                      {getStaminaPercentLabel(item)}
                    </ListItem>
                  ))}
                  {breakdown.equippedStaminaStepPercentItems.map((item) => (
                    <ListItem key={item.id}>
                      {getStaminaStepPercentLabel(
                        item,
                        breakdown.equippedStaminaStepPercentItems,
                      )}
                    </ListItem>
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
