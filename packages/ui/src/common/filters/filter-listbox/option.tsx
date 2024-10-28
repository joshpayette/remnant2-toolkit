/* eslint-disable @typescript-eslint/no-unsafe-call */
import { components, type OptionProps } from 'react-select';
import { cn } from '../../../utils/classnames';
import { FilterSwitch } from './filter-switch';
import type { FilterOption } from './types';

export function Option(props: OptionProps<FilterOption, true>) {
  return (
    <div
      className={cn(
        'ui-bg-zinc-800/75 ui-gap-2 ui-py-1 hover:ui-bg-surface-solid/20 ui-backdrop-blur-xl ui-text-surface-solid ui-w-full ui-flex-row ui-flex ui-items-center ui-justify-start',
      )}
    >
      <div className="ui-flex ui-items-center ui-justify-center">
        <FilterSwitch
          // @ts-expect-error Need to pass a custom prop to the option component
          disabledStates={props.selectProps.disabledStates}
          onChange={(newState) => {
            // @ts-expect-error Need to pass a custom prop to the option component
            props.selectProps.onOptionChange(newState, props.data.value);
          }}
          state={props.data.state}
        />
      </div>
      <components.Option {...props} />
    </div>
  );
}
