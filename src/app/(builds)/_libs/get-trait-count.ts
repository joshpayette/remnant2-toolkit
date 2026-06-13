import { MAX_TRAIT_AMOUNT } from '@/app/(builds)/_constants/max-trait-amount';
import { type BuildState } from '@/app/(builds)/_types/build-state';

// TODO Update for new prism fragments

export function getTraitCount(_buildState: BuildState): number {
  return MAX_TRAIT_AMOUNT;
}
