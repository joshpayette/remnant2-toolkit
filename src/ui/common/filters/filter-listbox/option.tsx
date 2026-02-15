/* eslint-disable @typescript-eslint/no-unsafe-call */
import { components, type OptionProps } from 'react-select';
import { cn } from '../../../utils/classnames';
import { FilterSwitch } from './filter-switch';
import type { FilterOption } from './types';

export function Option(props: OptionProps<FilterOption, true>) {
  return (
    <div
      className={cn(
        'bg-zinc-800/75 gap-2 py-1 hover:bg-surface-solid/20 backdrop-blur-xl text-surface-solid w-full flex-row flex items-center justify-start',
      )}
    >
      <div className="flex items-center justify-center">
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
      <div className="flex flex-col">
        <components.Option {...props} />
        {props.data.subLabel ? (
          <span className="text-xs text-gray-400">
            {props.data.subLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
