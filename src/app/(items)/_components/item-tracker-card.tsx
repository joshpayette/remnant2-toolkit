import { ItemButton } from '@/app/(items)/_components/item-button';
import { type Item } from '@/app/(items)/_types/item';

interface Props {
  item: Item & { discovered: boolean };
  tooltipDisabled: boolean;
  onClick: (itemId: string) => void;
  onShowItemInfo: (itemId: string) => void;
}

export function ItemTrackerCard({
  item,
  tooltipDisabled,
  onClick,
  onShowItemInfo,
}: Props) {
  return (
    <ItemButton
      item={item}
      isEditable={false}
      isToggled={item.discovered}
      loadingType="lazy"
      onClick={() => onClick(item.id)}
      onItemInfoClick={() => onShowItemInfo(item.id)}
      tooltipDisabled={tooltipDisabled}
      variant="large"
    />
  );
}
