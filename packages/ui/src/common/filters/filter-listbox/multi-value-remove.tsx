import { components, type MultiValueRemoveProps } from 'react-select';
import { XIcon } from '../../icons/x';
import type { FilterOption } from './types';

export function MultiValueRemove(props: MultiValueRemoveProps<FilterOption>) {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{
        ...props.innerProps,
        onClick: (e) => {
          e.stopPropagation();
          e.preventDefault();
          // @ts-expect-error Need to pass a custom prop to the option component
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          props.selectProps.onOptionChange('default', props.data.value);
        },
        onTouchEnd: (e) => {
          e.stopPropagation();
          e.preventDefault();
          // @ts-expect-error Need to pass a custom prop to the option component
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          props.selectProps.onOptionChange('default', props.data.value);
        },
      }}
    >
      <div className="ui-bg-red-600 dark:ui-bg-red-900 ui-w-3 ui-h-6 ui-flex ui-items-center ui-justify-center ui-mr-2 ui-p-1 ui-mb-1">
        <XIcon className="ui-w-2 ui-h-2 ui-text-surface-solid" />
      </div>
    </components.MultiValueRemove>
  );
}
