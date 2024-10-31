/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { ClearIndicatorProps } from 'react-select';
import { components } from 'react-select';
import type { FilterOption } from './types';

export function ClearIndicator(props: ClearIndicatorProps<FilterOption, true>) {
  return (
    <components.ClearIndicator
      {...props}
      innerProps={{
        ...props.innerProps,
        onClick: (e) => {
          e.stopPropagation();
          e.preventDefault();
          // @ts-expect-error Need to pass a custom prop to the option component
          props.selectProps.onResetOptions();
        },
        onTouchEnd: (e) => {
          e.stopPropagation();
          e.preventDefault();
          // @ts-expect-error Need to pass a custom prop to the option component
          props.selectProps.onResetOptions();
        },
      }}
    />
  );
}
