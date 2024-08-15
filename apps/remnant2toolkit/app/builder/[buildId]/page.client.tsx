'use client'

import type { BuildItems } from '@repo/db'
import { urlNoCache } from '@repo/utils/url-no-cache'
import copy from 'clipboard-copy'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button'
import type { Item } from '@/app/(data)/items/types'
import type { BaseItem } from '@/app/(data)/items/types/BaseItem'
import { BuilderContainer } from '@/app/(features)/builder/components/builder-container'
import { DeleteBuildButton } from '@/app/(features)/builder/components/buttons/delete-build-button'
import { DetailedViewButton } from '@/app/(features)/builder/components/buttons/detailed-view-button'
import { DuplicateBuildButton } from '@/app/(features)/builder/components/buttons/duplicate-build-button'
import { EditBuildButton } from '@/app/(features)/builder/components/buttons/edit-build-button'
import { FavoriteBuildButton } from '@/app/(features)/builder/components/buttons/favorite-build-button'
import { GenerateBuildImageButton } from '@/app/(features)/builder/components/buttons/generate-build-image'
import { ItemOwnershipPreferenceButton } from '@/app/(features)/builder/components/buttons/item-ownership-preference-button'
import { LoadoutManagementButton } from '@/app/(features)/builder/components/buttons/loadout-management-button'
import { ModeratorToolsButton } from '@/app/(features)/builder/components/buttons/moderator-tools-button'
import { NewLinkedBuildButton } from '@/app/(features)/builder/components/buttons/new-linked-build-button'
import { ShareBuildButton } from '@/app/(features)/builder/components/buttons/share-build-button'
import { ViewLinkedBuildButton } from '@/app/(features)/builder/components/buttons/view-linked-builds'
import { DetailedBuildDialog } from '@/app/(features)/builder/components/dialogs/detailed-build-dialog'
import { FavoriteBuildDialog } from '@/app/(features)/builder/components/dialogs/favorite-build-dialog'
import { ImageDownloadInfoDialog } from '@/app/(features)/builder/components/dialogs/image-download-info-dialog'
import { VideoThumbnail } from '@/app/(features)/builder/components/video-thumbnail'
import { incrementViewCount } from '@/app/(features)/builds/actions/increment-view-count'
import { ModeratorBuildToolsDialog } from '@/app/(features)/builds/admin/components/dialogs/moderator-build-tools-dialog'
import { LoadoutDialog } from '@/app/(features)/loadouts/components/dialogs/loadout-dialog'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { useDiscoveredItems } from '@/app/(hooks)/use-discovered-items'
import { DBBuild } from '@/app/(types)/builds'
import {
  ItemOwnershipPreference,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { buildStateToCsvData } from '@/app/(utils)/builds/build-state-to-csv-data'
import { cleanUpBuildState } from '@/app/(utils)/builds/clean-up-build-state'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'

interface Props {
  build: DBBuild
}

export function PageClient({ build }: Props) {
  const buildState = cleanUpBuildState(dbBuildToBuildState(build))
  const { data: session, status: sessionStatus } = useSession()
  const { discoveredItemIds } = useDiscoveredItems()

  // If user is not logged in, determine item ownership preference based on the localstorage
  if (sessionStatus === 'unauthenticated') {
    if (buildState.items.helm) {
      buildState.items.helm.isOwned = discoveredItemIds.includes(
        buildState.items.helm.id,
      )
    }
    if (buildState.items.torso) {
      buildState.items.torso.isOwned = discoveredItemIds.includes(
        buildState.items.torso.id,
      )
    }

    if (buildState.items.legs) {
      buildState.items.legs.isOwned = discoveredItemIds.includes(
        buildState.items.legs.id,
      )
    }

    if (buildState.items.gloves) {
      buildState.items.gloves.isOwned = discoveredItemIds.includes(
        buildState.items.gloves.id,
      )
    }

    if (buildState.items.amulet) {
      buildState.items.amulet.isOwned = discoveredItemIds.includes(
        buildState.items.amulet.id,
      )
    }

    if (buildState.items.relic) {
      buildState.items.relic.isOwned = discoveredItemIds.includes(
        buildState.items.relic.id,
      )
    }

    if (buildState.items.ring) {
      buildState.items.ring.map((ring) => {
        if (!ring) return null
        ring.isOwned = discoveredItemIds.includes(ring.id)
      })
    }

    if (buildState.items.archetype) {
      buildState.items.archetype.map((archetype) => {
        if (!archetype) return null
        archetype.isOwned = discoveredItemIds.includes(archetype.id)
      })
    }

    if (buildState.items.concoction) {
      buildState.items.concoction.map((concoction) => {
        if (!concoction) return null
        concoction.isOwned = discoveredItemIds.includes(concoction.id)
      })
    }

    if (buildState.items.consumable) {
      buildState.items.consumable.map((consumable) => {
        if (!consumable) return null
        consumable.isOwned = discoveredItemIds.includes(consumable.id)
      })
    }

    if (buildState.items.mod) {
      buildState.items.mod.map((mod) => {
        if (!mod) return null
        mod.isOwned = discoveredItemIds.includes(mod.id)
      })
    }

    if (buildState.items.mutator) {
      buildState.items.mutator.map((mutator) => {
        if (!mutator) return null
        mutator.isOwned = discoveredItemIds.includes(mutator.id)
      })
    }

    if (buildState.items.relicfragment) {
      buildState.items.relicfragment.map((fragment) => {
        if (!fragment) return null
        fragment.isOwned = discoveredItemIds.includes(fragment.id)
      })
    }

    if (buildState.items.trait) {
      buildState.items.trait.map((trait) => {
        if (!trait) return null
        trait.isOwned = discoveredItemIds.includes(trait.id)
      })
    }

    if (buildState.items.weapon) {
      buildState.items.weapon.map((weapon) => {
        if (!weapon) return null
        weapon.isOwned = discoveredItemIds.includes(weapon.id)
      })
    }
  }

  const [showModeratorTooling, setShowModeratorTooling] = useState(false)

  const [itemOwnershipPreference, setItemOwnershipPreference] =
    useLocalStorage<ItemOwnershipPreference>(
      LOCALSTORAGE_KEY.ITEM_OWNERSHIP_PREFERENCE,
      false,
      { initializeWithValue: false },
    )

  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false)
  const [loadoutDialogOpen, setLoadoutDialogOpen] = useState(false)

  const router = useRouter()

  const [signInRequiredDialogOpen, setSignInRequiredDialogOpen] =
    useState(false)

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleDuplicateBuild,
    handleFavoriteBuild,
    handleImageExport,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function asyncViewCountUpdate() {
      const response = await incrementViewCount({ buildId: build.id })
      if (response.viewCount !== -1) {
        build.viewCount = response.viewCount
        buildState.viewCount = response.viewCount
      }
    }
    asyncViewCountUpdate()
  })

  // Need to convert the build data to a format that the BuildPage component can use
  if (!session?.user) {
    buildState.upvoted = false
    buildState.reported = false
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildStateToCsvData(buildState)

  // #region RENDER

  return (
    <div className="flex w-full flex-col items-center">
      <DetailedBuildDialog
        buildState={buildState}
        open={detailedBuildDialogOpen}
        onClose={() => setDetailedBuildDialogOpen(false)}
      />
      <LoadoutDialog
        key={loadoutDialogOpen.toString()}
        buildId={buildState.buildId}
        open={loadoutDialogOpen}
        onClose={() => setLoadoutDialogOpen(false)}
        isEditable={true}
      />
      <ImageDownloadInfoDialog
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />
      <FavoriteBuildDialog
        open={signInRequiredDialogOpen}
        onClose={() => setSignInRequiredDialogOpen(false)}
      />
      <div className="height-full flex w-full flex-col items-center justify-center">
        <VideoThumbnail buildState={buildState} />
        <BuilderContainer
          buildContainerRef={buildContainerRef}
          buildState={buildState}
          isEditable={false}
          isScreenshotMode={isScreenshotMode}
          itemOwnershipPreference={itemOwnershipPreference}
          showControls={showControls}
          builderActions={
            <>
              {session &&
                session.user?.id !== buildState.createdById &&
                session.user?.role === 'admin' && (
                  <>
                    <ModeratorBuildToolsDialog
                      open={showModeratorTooling}
                      onClose={() => setShowModeratorTooling(false)}
                      buildToModerate={buildState}
                    />
                    <ModeratorToolsButton
                      onClick={() => setShowModeratorTooling(true)}
                    />
                  </>
                )}
              {session && session.user?.id === buildState.createdById && (
                <EditBuildButton
                  onClick={() =>
                    router.push(`/builder/edit/${buildState.buildId}`)
                  }
                />
              )}

              {session && session.user?.id === buildState.createdById && (
                <NewLinkedBuildButton
                  onClick={() =>
                    router.push(`/builder/linked/create/${buildState.buildId}`)
                  }
                />
              )}

              <GenerateBuildImageButton
                imageExportLoading={imageExportLoading}
                onClick={() =>
                  handleImageExport(
                    buildContainerRef.current,
                    `${buildState.name}`,
                  )
                }
              />

              <ShareBuildButton
                onClick={() => {
                  const url = urlNoCache(window.location.href)
                  copy(url)
                  toast.success('Copied Build URL to clipboard.')
                }}
              />

              {session?.user?.id && (
                <LoadoutManagementButton
                  buildId={buildState.buildId}
                  onClick={() => setLoadoutDialogOpen(true)}
                />
              )}

              {buildState.createdById !== session?.user?.id && (
                <FavoriteBuildButton
                  upvoted={buildState.upvoted}
                  onClick={() => {
                    // if user is not signed in, let them know signin is required
                    if (!session?.user?.id) {
                      setSignInRequiredDialogOpen(true)
                      return
                    }
                    handleFavoriteBuild(buildState, session?.user?.id)
                  }}
                />
              )}

              {session &&
                session.user?.id === buildState.createdById &&
                buildState.buildId && (
                  <DeleteBuildButton buildId={buildState.buildId} />
                )}

              <DetailedViewButton
                onClick={() => setDetailedBuildDialogOpen(true)}
              />

              <ItemOwnershipPreferenceButton
                onClick={() =>
                  setItemOwnershipPreference(!itemOwnershipPreference)
                }
              />

              <ViewLinkedBuildButton
                onClick={() =>
                  router.push(
                    `/profile/${buildState.createdById}/linked-builds/${buildState.buildId}`,
                  )
                }
              />

              <DuplicateBuildButton
                onClick={() => handleDuplicateBuild(buildState)}
              />

              <ToCsvButton
                data={csvBuildData.filter((item) => item?.name !== '')}
                filename={`remnant2_builder_${buildState.name}`}
                label="Export to CSV"
              />
            </>
          }
        />
      </div>
    </div>
  )
}
