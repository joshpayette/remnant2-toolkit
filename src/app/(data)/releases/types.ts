import { RELEASE_TO_NAME } from '@/app/(data)/releases/constants'

export type ReleaseKey = keyof typeof RELEASE_TO_NAME
export type ReleaseName = (typeof RELEASE_TO_NAME)[ReleaseKey]
