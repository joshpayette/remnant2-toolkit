import { BaseButton } from '@repo/ui/base/button'
import {
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@repo/ui/base/dialog'
import { BaseDivider } from '@repo/ui/base/divider'
import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import { BaseInput } from '@repo/ui/base/input'
import { BaseTextarea } from '@repo/ui/base/textarea'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(data)/builds/constants'
import approveVideo from '@/app/(features)/builds/admin/actions/approve-video'
import featureBuild from '@/app/(features)/builds/admin/actions/feature-build'
import lockBuild from '@/app/(features)/builds/admin/actions/lock-build'
import privateBuild from '@/app/(features)/builds/admin/actions/private-build'
import setBaseGameBuild from '@/app/(features)/builds/admin/actions/set-base-game-build'
import setBeginnerBuild from '@/app/(features)/builds/admin/actions/set-beginner-build'
import unapproveVideo from '@/app/(features)/builds/admin/actions/unapprove-video'
import unfeatureBuild from '@/app/(features)/builds/admin/actions/unfeature-build'
import unlockBuild from '@/app/(features)/builds/admin/actions/unlock-build'
import unsetBaseGameBuild from '@/app/(features)/builds/admin/actions/unset-base-game-build'
import unsetBeginnerBuild from '@/app/(features)/builds/admin/actions/unset-beginner-build'
import updateBuild from '@/app/(features)/builds/admin/actions/update-build'
import type { BuildState } from '@/app/(types)/builds'

interface Props {
  open: boolean
  onClose: () => void
  buildToModerate: BuildState
}

export function ModeratorBuildToolsDialog({
  buildToModerate,
  open,
  onClose,
}: Props) {
  // Allows us to reflect changes without reloading the page
  const [localBuild, setLocalBuild] = useState<BuildState>(buildToModerate)

  const [buildName, setBuildName] = useState(localBuild.name)
  const [buildDescription, setBuildDescription] = useState(
    localBuild.description,
  )
  const [buildReferenceLink, setBuildReferenceLink] = useState(
    localBuild.buildLink ?? '',
  )

  const { data: sessionData } = useSession()
  if (sessionData?.user?.role !== 'admin') {
    return null
  }

  const saveButtonDisabled =
    buildName === buildToModerate.name &&
    buildDescription === buildToModerate.description &&
    buildReferenceLink === buildToModerate.buildLink

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
            )
            if (response.status === 'error') {
              toast.error(response.message)
              return
            }
            setLocalBuild({
              ...localBuild,
              name: buildName,
              description: buildDescription,
            })
            toast.success(response.message)
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
                const response = await unlockBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isModeratorLocked: false })
                toast.success(response.message)
              }}
            >
              Unlock Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await lockBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isModeratorLocked: true })
                toast.success(response.message)
              }}
            >
              Lock Build
            </BaseButton>
          )}
          <BaseButton
            onClick={async () => {
              const response = await privateBuild(localBuild.buildId)
              if (response.status === 'error') {
                toast.error(response.message)
                return
              }
              toast.success(response.message)
            }}
          >
            Make Private
          </BaseButton>
          {localBuild.isFeaturedBuild ? (
            <BaseButton
              onClick={async () => {
                const response = await unfeatureBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isFeaturedBuild: false })
                toast.success(response.message)
              }}
            >
              Unfeature Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await featureBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isFeaturedBuild: true })
                toast.success(response.message)
              }}
            >
              Feature Build
            </BaseButton>
          )}
          {localBuild.isBeginnerBuild ? (
            <BaseButton
              onClick={async () => {
                const response = await unsetBeginnerBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isBeginnerBuild: false })
                toast.success(response.message)
              }}
            >
              Unset Beginner Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await setBeginnerBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isBeginnerBuild: true })
                toast.success(response.message)
              }}
            >
              Set Beginner Build
            </BaseButton>
          )}
          {localBuild.isBaseGameBuild ? (
            <BaseButton
              onClick={async () => {
                const response = await unsetBaseGameBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isBaseGameBuild: false })
                toast.success(response.message)
              }}
            >
              Unset Base Game Build
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await setBaseGameBuild(localBuild.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isBaseGameBuild: true })
                toast.success(response.message)
              }}
            >
              Set Base Game Build
            </BaseButton>
          )}
          {localBuild.isModeratorApproved ? (
            <BaseButton
              onClick={async () => {
                const response = await unapproveVideo(buildToModerate.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isModeratorApproved: false })
                toast.success(response.message)
              }}
            >
              Unapprove Video
            </BaseButton>
          ) : (
            <BaseButton
              onClick={async () => {
                const response = await approveVideo(buildToModerate.buildId)
                if (response.status === 'error') {
                  toast.error(response.message)
                  return
                }
                setLocalBuild({ ...localBuild, isModeratorApproved: true })
                toast.success(response.message)
              }}
            >
              Approve Video
            </BaseButton>
          )}
        </div>
      </BaseDialogBody>
    </BaseDialog>
  )
}
