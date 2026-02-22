import { components, type MultiValueGenericProps } from 'react-select';
import { cn } from '../../../../utils/classnames';
import { CheckIcon } from '../../icons/check';
import { XIcon } from '../../icons/x';
import type { FilterOption } from './types';

export function MultiValueLabel(props: MultiValueGenericProps<FilterOption>) {
  const data = props.data as FilterOption;

  let icon = <CheckIcon className={cn('text-accent2-500 h-3 w-3')} />;

  if (data.state === 'excluded') {
    icon = <XIcon className={cn('text-accent3-500 h-3 w-3')} />;
  }

  return (
    <div
      className={cn(
        'bg-background-solid text-surface-solid mb-1 flex flex-row items-center justify-start p-1 text-xs'
      )}
    >
      <div className="bg-background-solid mr-0.5 flex items-center justify-center">
        {icon}
      </div>
      <components.MultiValueLabel {...props} />
    </div>
  );
}
