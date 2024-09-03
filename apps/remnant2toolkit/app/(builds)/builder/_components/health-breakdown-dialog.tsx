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

function getHealthStepLabel(
  item: TraitItem,
  equippedHealthStepItems: TraitItem[],
) {
  const traitAmount =
    equippedHealthStepItems.find((t) => t.name === item.name)?.amount ?? 0;

  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">{`(${
        traitAmount * (item.healthStep ?? 0)
      })`}</span>
    </>
  );
}

function getHealthIncreaseLabel(item: Item) {
  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">({item.health})</span>
    </>
  );
}

function getHealthPercentLabel(item: Item) {
  return (
    <>
      <span className="text-surface-solid font-bold">
        {item.category === 'relicfragment'
          ? `Mythic ${item.name} Relic Fragment`
          : item.name}
      </span>{' '}
      <span className="text-gray-300">
        ({((item.healthPercent ?? 0) * 100).toFixed(2)}%)
      </span>
    </>
  );
}

function ggetHealthStepPercentLabel(
  item: TraitItem,
  equippedHealthStepPercentItems: TraitItem[],
) {
  const traitAmount =
    equippedHealthStepPercentItems.find((t) => t.name === item.name)?.amount ??
    0;

  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">
        {`(${traitAmount * (item.healthStepPercent ?? 0) * 100}%)`}
      </span>
    </>
  );
}

function getHealthCapLabel(item: Item) {
  return (
    <>
      <span className="text-surface-solid font-bold">{item.name}</span>{' '}
      <span className="text-gray-300">
        ({(item.healthCap ?? 0) * 100 * -1}%)
      </span>
    </>
  );
}

interface Props {
  open: boolean;
  breakdown: {
    equippedHealthIncreaseItems: Item[];
    equippedHealthPercentItems: Item[];
    equippedHealthStepItems: TraitItem[];
    equippedHealthStepPercentItems: TraitItem[];
    equippedHealthCapItems: Item[];
    totalHealthCapReduction: number;
    totalHealthIncrease: number;
    totalHealthPercent: number;
    totalHealthStep: number;
    totalHealthStepPercent: number;
  };
  onClose: () => void;
}

export function HealthBreakdownDialog({ open, breakdown, onClose }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="sm">
      <BaseDialogTitle>Health Breakdown</BaseDialogTitle>
      <BaseDialogDescription>
        View a breakdown of items contributing to this health total.
      </BaseDialogDescription>

      <BaseDialogBody>
        <div className="text-left text-sm">
          <h3 className="text-md text-surface-solid col-span-full my-2 font-semibold">
            Base Health{' '}
            <span className="text-md text-surface-solid font-bold">100</span>
          </h3>

          {(breakdown.equippedHealthIncreaseItems.length > 0 ||
            breakdown.equippedHealthStepItems.length > 0) && (
            <StatsSection
              total={breakdown.totalHealthIncrease + breakdown.totalHealthStep}
              listItems={
                <>
                  {breakdown.equippedHealthIncreaseItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getHealthIncreaseLabel(item)}
                    </StatsListItem>
                  ))}
                  {breakdown.equippedHealthStepItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getHealthStepLabel(
                        item,
                        breakdown.equippedHealthStepItems,
                      )}
                    </StatsListItem>
                  ))}
                </>
              }
            />
          )}

          {(breakdown.equippedHealthPercentItems.length > 0 ||
            breakdown.equippedHealthStepPercentItems.length > 0) && (
            <StatsSection
              isPercent={true}
              total={
                (breakdown.totalHealthPercent +
                  breakdown.totalHealthStepPercent) *
                100
              }
              listItems={
                <>
                  {breakdown.equippedHealthPercentItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getHealthPercentLabel(item)}
                    </StatsListItem>
                  ))}
                  {breakdown.equippedHealthStepPercentItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {ggetHealthStepPercentLabel(
                        item,
                        breakdown.equippedHealthStepPercentItems,
                      )}
                    </StatsListItem>
                  ))}
                </>
              }
            />
          )}

          {breakdown.equippedHealthCapItems.length > 0 && (
            <StatsSection
              isPercent={true}
              total={breakdown.totalHealthCapReduction * 100}
              listItems={
                <>
                  {breakdown.equippedHealthCapItems.map((item) => (
                    <StatsListItem key={item.id}>
                      {getHealthCapLabel(item)}
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
