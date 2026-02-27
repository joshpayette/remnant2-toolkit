import { isBuildBaseGameBuild } from '@/app/(builds)/_libs/is-build-base-game-build';
import type { BuildState } from '@/app/(builds)/_types/build-state';
import { BaseButton } from '@/ui/base/button';
import {
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogTitle,
} from '@/ui/base/dialog';
import { BaseText } from '@/ui/base/text';

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
