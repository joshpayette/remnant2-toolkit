/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/button-has-type */
import type { ClearIndicatorProps } from 'react-select';
import { components } from 'react-select';
import type { FilterOption } from './types';

export function ClearIndicator(props: ClearIndicatorProps<FilterOption, true>) {
  return (
    <button
      onClick={() => {
        // @ts-expect-error Need to pass a custom prop to the option component
        props.selectProps.onResetOptions();
      }}
    >
      <components.ClearIndicator {...props} />
    </button>
  );
}
