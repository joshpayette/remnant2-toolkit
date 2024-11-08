import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogTitle,
  BaseText,
} from '@repo/ui';

import { isBuildBaseGameBuild } from '@/app/(builds)/_libs/is-build-base-game-build';
import type { BuildState } from '@/app/(builds)/_types/build-state';

interface Props {
  buildState: BuildState;
  open: boolean;
  onClose: () => void;
}

export function BaseGameBuildCheckDialog({ buildState, open, onClose }: Props) {
  const baseGameBuildCheck = isBuildBaseGameBuild(buildState);

  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>Base Game Build Check</BaseDialogTitle>
      <BaseDialogBody>
        <BaseText>
          Your build does not meet the base game build conditions. The Base Game
          build tag will be removed.
        </BaseText>
        <BaseText>
          Below is a list of what you can adjust to meet the Base Game build
          conditions:
        </BaseText>
        <ul className="text-md mt-4 list-disc">
          {baseGameBuildCheck.nonBaseGameItems.map((result, index) => (
            <li key={index} className="mb-1 ml-4">
              {result.name} ({result.dlc})
            </li>
          ))}
        </ul>
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton onClick={onClose}>Close</BaseButton>
      </BaseDialogActions>
    </BaseDialog>
  );
}
