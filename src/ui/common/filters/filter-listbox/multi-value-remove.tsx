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
      <div className="bg-accent3-600 dark:bg-accent3-900 w-3 h-6 flex items-center justify-center mr-2 p-1 mb-1">
        <XIcon className="w-2 h-2 text-surface-solid" />
      </div>
    </components.MultiValueRemove>
  );
}
