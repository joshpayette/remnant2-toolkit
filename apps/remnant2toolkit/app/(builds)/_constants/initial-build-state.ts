import { DEFAULT_BUILD_NAME } from '@/app/(builds)/_constants/default-build-name';
import { type BuildState } from '@/app/(builds)/_types/build-state';

/**
 * The default empty BuildState
 */
export const INITIAL_BUILD_STATE: BuildState = {
  name: DEFAULT_BUILD_NAME,
  description: null,
  isPublic: true,
  isMember: false,
  isFeaturedBuild: false,
  isBeginnerBuild: false,
  isBaseGameBuild: false,
  isGimmickBuild: false,
  dateFeatured: null,
  isPatchAffected: false,
  isModeratorApproved: false,
  isModeratorLocked: false,
  isVideoApproved: false,
  thumbnailUrl: null,
  videoUrl: null,
  buildLinkUpdatedAt: null,
  buildTags: null,
  buildLink: null,
  buildId: null,
  createdAt: new Date(),
  updatedAt: null,
  createdByDisplayName: null,
  createdById: null,
  upvoted: false,
  totalUpvotes: 0,
  viewCount: 0,
  validatedViewCount: 0,
  duplicateCount: 0,
  variantIndex: 0,
  percentageOwned: 0,
  items: {
    helm: null,
    torso: null,
    legs: null,
    gloves: null,
    relic: null,
    amulet: null,
    weapon: [],
    ring: [],
    archetype: [],
    skill: [],
    concoction: [],
    consumable: [],
    mod: [],
    mutator: [],
    relicfragment: [],
    fusion: [],
    trait: [],
    perk: [],
    prism: null,
    pylon: [],
  },
};
