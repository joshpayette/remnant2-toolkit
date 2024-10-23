import { components, type MultiValueGenericProps } from 'react-select';
import { cn } from '../../../utils/classnames';
import type { FilterOption } from './types';

export function MultiValueLabel(props: MultiValueGenericProps<FilterOption>) {
  return (
    <div className={cn('ui-bg-black ui-text-surface-solid')}>
      <components.MultiValueLabel {...props} />
    </div>
  );
}
