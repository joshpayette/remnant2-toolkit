import { components, type MultiValueGenericProps } from 'react-select';
import { cn } from '../../../utils/classnames';
import { CheckIcon } from '../../icons/check';
import { XIcon } from '../../icons/x';
import type { FilterOption } from './types';

export function MultiValueLabel(props: MultiValueGenericProps<FilterOption>) {
  const { data } = props;

  let icon = <CheckIcon className={cn('ui-w-3 ui-h-3 text-green-500')} />;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (data.state === 'excluded') {
    icon = <XIcon className={cn('ui-w-3 ui-h-3 text-red-500')} />;
  }

  return (
    <div
      className={cn(
        'ui-bg-black ui-text-xs ui-text-surface-solid ui-flex ui-flex-row ui-justify-start ui-items-center',
      )}
    >
      <div className="ui-bg-black ui-flex ui-items-center ui-justify-center">
        {icon}
      </div>
      <components.MultiValueLabel {...props} />
    </div>
  );
}
