import { components, type MultiValueGenericProps } from 'react-select';
import { cn } from '../../../utils/classnames';
import { CheckIcon } from '../../icons/check';
import { XIcon } from '../../icons/x';
import type { FilterOption } from './types';

export function MultiValueLabel(props: MultiValueGenericProps<FilterOption>) {
  const data = props.data as FilterOption;

  let icon = <CheckIcon className={cn('w-3 h-3 text-accent2-500')} />;

  if (data.state === 'excluded') {
    icon = <XIcon className={cn('w-3 h-3 text-accent3-500')} />;
  }

  return (
    <div
      className={cn(
        'bg-background-solid text-xs text-surface-solid flex flex-row justify-start items-center p-1 mb-1',
      )}
    >
      <div className="bg-background-solid flex items-center justify-center mr-0.5">
        {icon}
      </div>
      <components.MultiValueLabel {...props} />
    </div>
  );
}
