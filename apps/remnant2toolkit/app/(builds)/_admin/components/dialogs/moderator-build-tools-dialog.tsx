import {
  BaseButton,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
  BaseDivider,
  BaseField,
  BaseInput,
  BaseLabel,
  BaseTextarea,
} from '@repo/ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import approveVideo from '@/app/(builds)/_admin/actions/approve-video';
import featureBuild from '@/app/(builds)/_admin/actions/feature-build';
import lockBuild from '@/app/(builds)/_admin/actions/lock-build';
import privateBuild from '@/app/(builds)/_admin/actions/private-build';
import setBaseGameBuild from '@/app/(builds)/_admin/actions/set-base-game-build';
import setBeginnerBuild from '@/app/(builds)/_admin/actions/set-beginner-build';
import setGimmickBuild from '@/app/(builds)/_admin/actions/set-gimmick-build';
import unapproveVideo from '@/app/(builds)/_admin/actions/unapprove-video';
import unfeatureBuild from '@/app/(builds)/_admin/actions/unfeature-build';
import unlockBuild from '@/app/(builds)/_admin/actions/unlock-build';
import unsetBaseGameBuild from '@/app/(builds)/_admin/actions/unset-base-game-build';
import unsetBeginnerBuild from '@/app/(builds)/_admin/actions/unset-beginner-build';
import unsetGimmickBuild from '@/app/(builds)/_admin/actions/unsetGimmickBuild';
import updateBuild from '@/app/(builds)/_admin/actions/update-build';
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/max-build-description-length';
import { type BuildState } from '@/app/(builds)/_types/build-state';

interface Props {
  open: boolean;
  onClose: () => void;
  buildToModerate: BuildState;
}

export function ModeratorBuildToolsDialog({
  buildToModerate,
  open,
  onClose,
}: Props) {
  // Allows us to reflect changes without reloading the page
  const [localBuild, setLocalBuild] = useState<BuildState>(buildToModerate);

  const [buildName, setBuildName] = useState(localBuild.name);
  const [buildDescription, setBuildDescription] = useState(
    localBuild.description,
  );
  const [buildReferenceLink, setBuildReferenceLink] = useState(
    localBuild.buildLink ?? '',
  );

  const { data: sessionData } = useSession();
  if (sessionData?.user?.role !== 'admin') {
    return null;
  }

  const saveButtonDisabled =
    buildName === buildToModerate.name &&
    buildDescription === buildToModerate.description &&
    buildReferenceLink === buildToModerate.buildLink;

  return (
    <BaseDialog open={open} onClose={onClose}>
      <BaseDialogTitle>Moderator Tools</BaseDialogTitle>
      <BaseDialogDescription>
        Moderation tools for build:{' '}
        <strong className="text-primary-500">{localBuild.name}</strong>
      </BaseDialogDescription>
      <BaseDialogBody>
        <BaseDialogTitle>Build Name</BaseDialogTitle>

        <BaseInput
          value={buildName}
          onChange={(e) => setBuildName(e.target.value)}
          className="mt-2"
        />
        <BaseDivider className="my-4" />
        <BaseDialogTitle>Build Reference Link</BaseDialogTitle>
        <BaseInput
          value={buildReferenceLink}
          onChange={(e) => setBuildReferenceLink(e.target.value)}
          className="mt-2"
        />
        <BaseDivider className="my-4" />
        <BaseDialogTitle>Build Description</BaseDialogTitle>
        <BaseField>
          <BaseLabel>{`(${
            buildDescription?.length ?? 0
          }/${MAX_BUILD_DESCRIPTION_LENGTH})`}</BaseLabel>
          <BaseTextarea
            name="description"
            onChange={(e) => setBuildDescription(e.target.value)}
            value={buildDescription ?? ''}
            maxLength={MAX_BUILD_DESCRIPTION_LENGTH}
            className="h-[215px] w-full"
          />
        </BaseField>
      </BaseDialogBody>
      <BaseDialogActions>
        <BaseButton
          onClick={async () => {
            const response = await updateBuild(
              localBuild.buildId,
              buildName,
              buildDescription ?? '',
              buildReferenceLink,
            );
            if (response.status === 'error') {
              toast.error(response.message);
              return;
            }
            setLocalBuild({
              ...localBuild,
              name: buildName,
              description: buildDescription,
            });
            toast.success(response.message);
          }}
          disabled={saveButtonDisabled}
        >
          Save Changes
        </BaseButton>
      </BaseDialogActions>
      <BaseDivider className="my-4" />
      <BaseDialogBody>
        <BaseDialogTitle>Other Actions</BaseDialogTitle>

        <div className="mt-2 flex flex-wrap items-start justify-start gap-2">
          {localBuild.isModeratorLocked ? (
            <BaseButton
              onClick={async () => {
                const response = await unlockBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isModeratorLocked: false });
                toast.success(response.message);
              }}
            >
              Unlock Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await lockBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isModeratorLocked: true });
                toast.success(response.message);
              }}
            >
              Lock Build
            </BaseButton>
          )}
          <BaseButton
            onClick={async () => {
              const response = await privateBuild(localBuild.buildId);
              if (response.status === 'error') {
                toast.error(response.message);
                return;
              }
              toast.success(response.message);
            }}
          >
            Make Private
          </BaseButton>
          {localBuild.isFeaturedBuild ? (
            <BaseButton
              onClick={async () => {
                const response = await unfeatureBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isFeaturedBuild: false });
                toast.success(response.message);
              }}
            >
              Unfeature Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await featureBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isFeaturedBuild: true });
                toast.success(response.message);
              }}
            >
              Feature Build
            </BaseButton>
          )}
          {localBuild.isBeginnerBuild ? (
            <BaseButton
              onClick={async () => {
                const response = await unsetBeginnerBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isBeginnerBuild: false });
                toast.success(response.message);
              }}
            >
              Unset Beginner Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await setBeginnerBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isBeginnerBuild: true });
                toast.success(response.message);
              }}
            >
              Set Beginner Build
            </BaseButton>
          )}
          {localBuild.isBaseGameBuild ? (
            <BaseButton
              onClick={async () => {
                const response = await unsetBaseGameBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isBaseGameBuild: false });
                toast.success(response.message);
              }}
            >
              Unset Base Game Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await setBaseGameBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isBaseGameBuild: true });
                toast.success(response.message);
              }}
            >
              Set Base Game Build
            </BaseButton>
          )}
          {localBuild.isGimmickBuild ? (
            <BaseButton
              onClick={async () => {
                const response = await unsetGimmickBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isGimmickBuild: false });
                toast.success(response.message);
              }}
            >
              Unset Gimmick Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await setGimmickBuild(localBuild.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isGimmickBuild: true });
                toast.success(response.message);
              }}
            >
              Set Gimmick Build
            </BaseButton>
          )}
          {localBuild.isModeratorApproved ? (
            <BaseButton
              onClick={async () => {
                const response = await unapproveVideo(buildToModerate.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isModeratorApproved: false });
                toast.success(response.message);
              }}
            >
              Unapprove Video
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await approveVideo(buildToModerate.buildId);
                if (response.status === 'error') {
                  toast.error(response.message);
                  return;
                }
                setLocalBuild({ ...localBuild, isModeratorApproved: true });
                toast.success(response.message);
              }}
            >
              Approve Video
            </BaseButton>
          )}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  );
}